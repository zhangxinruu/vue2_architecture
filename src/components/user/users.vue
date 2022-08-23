<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="12">
          <!-- 搜索框 -->
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUsersList()"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUsersList()"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="8"
          ><el-button type="primary" @click="addDialogvisible = true"
            >添加用户</el-button
          ></el-col
        >
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="chageStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editDialog(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deletebtn(scope.row.id)"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-s-tools"
                size="mini"
                @click="setRolesDialogBtn(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- size-change和current-change事件来处理页码大小和当前页变动时候触发的事件。 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogvisible"
      width="70%"
      @close="addclosedDialog"
    >
      <el-form
        :model="addDialogForm"
        :rules="addDialogFormrules"
        ref="addDialogFormRef"
        label-width="90px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addDialogForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addDialogForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addDialogForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model="addDialogForm.tel"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogvisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogbtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="70%"
      @close="editDialogClose"
    >
      <el-form
        :model="editDialogForm"
        :rules="editDialogFormrules"
        ref="editDialogFormRef"
        label-width="90px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editDialogForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editDialogForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editDialogForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editbtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRolesDialogVisible"
      width="70%"
      @close="setRolesDialogclosed"
    >
      <p>当前用户名：{{ this.setRolesName }}<br /></p>
      <p>当前角色：{{ this.setRolesrole_name }}<br /></p>
      <!-- 通过v-model把用户选中的值传递到data中 value是用户真正选中的值-->
      <p>
        当前分配的新角色：
        <el-select v-model="selectRoleid" placeholder="请选择">
          <el-option
            v-for="item in rolelist"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRolesDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setNewroles"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    //   自定义校验规则
    // 验证邮箱的规则
    var checkEmail = (rule, value, cd) => {
      // 验证邮箱的正则表达式
      const regEmail =
        /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      if (regEmail.test(value)) {
        // 合法的邮箱
        return cd();
      }
      cd(new Error("请输入合法的邮箱"));
    };
    // 验证手机号的规则
    var checkTel = (rule, value, cd) => {
      //验证手机号的正则表达式
      const regtel =
        /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
      if (regtel.test(value)) {
        //合法的手机号
        return cd();
      }
      cd(new Error("请输入合法的手机号"));
    };
    return {
      // 获取用户列表参数
      queryInfo: {
        query: "",
        //当前页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 2,
      },
      userlist: [],
      total: 1,
      addDialogvisible: false,
      editDialogVisible: false,
      addDialogForm: {
        username: "",
        password: "",
        email: "",
        tel: "",
      },
      addDialogFormrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            validator: checkEmail,
            trigger: "blur",
          },
        ],
        tel: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur",
          },
          {
            validator: checkTel,
            trigger: "blur",
          },
        ],
      },
      editDialogForm: {},
      editDialogFormrules: {
        editeamil: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            validator: checkEmail,
            trigger: "blur",
          },
        ],
        edittel: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur",
          },
          {
            validator: checkTel,
            trigger: "blur",
          },
        ],
      },
      setRolesDialogVisible: false,
      // 分配角色对话框当前用户名
      setRolesName: "",
      // 分配角色对话框当前角色
      setRolesrole_name: "",
      //用户id
      setUserid:"",
      //角色列表
      rolelist: [],
      //下拉框选中的id值
      selectRoleid: "",
    };
  },
  created() {
    this.getUsersList();
  },
  methods: {
    async getUsersList() {
      const { data: res } = await this.$http.get("users",{params:this.queryInfo});
      if (res.meta.status !== 200)
        return this.$message.error("获取用户列表失败");
      this.userlist = res.data.users;
      this.total = res.data.total;
    },
    // 监听每页多少条pagesize改变的事件
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize;
      this.getUsersList();
    },
    //监听当前页码值改变的事件
    handleCurrentChange(newpage) {
      this.queryInfo.pagenum = newpage;
      this.getUsersList();
    },
    async chageStatus(userInfo) {
      const { data: res } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      );
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state;
        return this.$$message.error("状态修改失败");
      }
    },
    // 监听添加用户对话框关闭时出发的事件
    addclosedDialog() {
      this.$refs.addDialogFormRef.resetFields();
    },
    //添加用户之前表单的预校验操作
    addDialogbtn() {
      this.$refs.addDialogFormRef.validate(async (valid) => {
        if (!valid) return;
        //可以发起添加用户网络请求
        const { data: res } = await this.$http.post(
          "users",
          this.addDialogForm
        );
        if (res.meta.status !== 201) return this.$message.error("用户创建失败");
        this.$message.success("用户创建成功");
        this.addDialogvisible = false;
        this.getUsersList();
      });
    },
    //修改对话框
    async editDialog(id) {
      this.editDialogVisible = true;
      const { data: res } = await this.$http.get("users/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户信息失败");
      }
      this.editDialogForm = res.data;
    },
    //修改对话框点击确定时触发的事件
    editbtn() {
      this.$refs.editDialogFormRef.validate(async (valid) => {
        if (!valid) return "";
        //   发起修改用户信息的数据请求
        const { data: res } = await this.$http.put(
          "users/" + this.editDialogForm.id,
          {
            email: this.editDialogForm.email,
            mobile: this.editDialogForm.mobile,
          }
        );
        if (res.meta.status !== 200)
          return this.$message.error("更新用户信息失败");
        this.editDialogVisible = false;
        this.$message.success("更新用户信息成功");
        this.getUsersList();
      });
    },
    // 监听修改用户对话框关闭时出发的事件
    editDialogClose() {
      this.$refs.editDialogFormRef.resetFields();
    },
    //根据id删除对应的用户信息
    async deletebtn(id) {
      const confirm = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        err;
      });
      if (confirm !== confirm) {
        this.$message.error("用户取消了删除");
      }
      const { data: res } = await this.$http.delete("users/" + id);
      if (res.meta.status !== 200) return this.$message.error("删除用户失败");
      this.$message.success("删除用户成功");
      this.getUsersList();
    },
    //分配角色对话框
    async setRolesDialogBtn(row) {
      this.setRolesDialogVisible = true;
      this.setRolesName = row.username;
      this.setRolesrole_name = row.role_name;
      this.setUserid = row.id
      const { data: res } = await this.$http.get("roles");
      this.rolelist = res.data;
    },
    //分配新角色
    async setNewroles(){
      const {data:res} = await this.$http.put(`users/${this.setUserid}/role`,{rid:this.selectRoleid})
      if(res.meta.status!==200)return this.$message.error(res.meta.msg)
      this.$message.success("分配新角色成功")
      this.setRolesDialogVisible = false
      this.getUsersList()
    },
    //监听分配新角色对话框关闭
    setRolesDialogclosed(){
      this.selectRoleid = ""
    }
  },
};
</script>
<style lang="less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
.el-pagination {
  margin-top: 15px;
}
</style>