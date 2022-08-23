<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary">添加角色</el-button>
      <el-table :data="rolesTableData" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 一级权限 -->
            <el-row
              v-for="(item, i1) in scope.row.children"
              :key="i1"
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '']"
            >
              <el-col :span="5"
                ><el-tag closable @close="tagClose(scope.row, item.id)">{{
                  item.authName
                }}</el-tag
                ><i class="el-icon-caret-right"></i
              >
              </el-col>
              <!-- 二级三级权限 -->
              <el-col :span="19">
                <el-row
                  v-for="(itemchildren, i2) in item.children"
                  :key="i2"
                  :class="[i2 === 0 ? '' : 'bdtop']"
                >
                  <el-col :span="6"
                    ><el-tag
                      type="success"
                      closable
                      @close="tagClose(scope.row, itemchildren.id)"
                      >{{ itemchildren.authName }}</el-tag
                    ><i class="el-icon-caret-right"></i
                  ></el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="itemchildrenchildren in itemchildren.children"
                      :key="itemchildrenchildren.id"
                      type="warning"
                      closable
                      @close="tagClose(scope.row, itemchildrenchildren.id)"
                    >
                      {{ itemchildrenchildren.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editDialog(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deletebtn(scope.row.id)"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-s-tools"
              size="mini"
              @click="setRightsDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setDialogVisible"
      width="60%"
      @close="setRightsDialogClosed"
    >
      <el-tree
        :data="Rightslist"
        :props="RightslistProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKey"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightsDialogbtn()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesTableData: [],
      //分配权限对话框显示与隐藏
      setDialogVisible: false,
      //   获取权限对话框的数据源
      Rightslist: [],
      //   树形控件的属性绑定对象
      RightslistProps: {
        children: "children",
        label: "authName",
      },
      //默认勾选的数组
      defKey: [],
      //角色id
      roleid: '',
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    //获取用户角色列表
    async getRolesList() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200)
        return this.$message.error("获取角色列表失败");
      this.rolesTableData = res.data;
    },
    //删除角色权限
    async tagClose(roleid, rightsid) {
      const re = await this.$confirm(
        "此操作将永久删除该权限, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        err;
      });
      if (re !== "confirm") {
        return this.$message.error("用户取消了删除");
      }
      const { data: res } = await this.$http.delete(
        `roles/${roleid.id}/rights/${rightsid}`
      );
      console.log(res);
      roleid.children = res.data;
    },
    //设置分配权限对话框
    async setRightsDialog(role) {
      this.setDialogVisible = true;
      const { data: res } = await this.$http.get("rights/tree");
      if (res.meta.status !== 200) return this.$message.error("获取权限失败");
      this.Rightslist = res.data;
      this.getDefKeys(role, this.defKey);
      this.roleid = role.id;
    },
    //用递归获取三级节点,将
    getDefKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }
      //这个foreach相当于一个驱动，推动这个递归算法向前
      node.children.forEach((item) => {
        this.getDefKeys(item, arr);
      });
    },
    //获取权限对话框关闭，清空默认勾选的数组id
    setRightsDialogClosed() {
      this.defKey = [];
    },
    //在分配按钮面板中为角色授权
    async setRightsDialogbtn() {
      const rightsKey = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];
      const newrightsKey = rightsKey.join(",")
      const {data:res} =  await this.$http.post(`roles/${this.roleid}/rights`,{rids:newrightsKey});
      if(res.meta.status !== 200) return this.$message.error("分配权限失败")
      this.$message.success("分配权限成功")
      this.getRolesList()
      this.setDialogVisible = false
    },
  },
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
.el-tag {
  margin-left: 6px;
  margin-bottom: 6px;
}
.el-col {
  margin-top: 6px;
}
.el-row {
  display: flex;
  align-items: center;
}
.bdtop {
  border-top: 1px #f0f3f0 solid;
}

.bdbottom {
  border-bottom: 1px #f0f3f0 solid;
}
</style>