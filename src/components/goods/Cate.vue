<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog"
            >添加分类</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格 -->
      <tree-table
        :data="cateTableData"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
        class="treetable"
      >
        //是否有效模板
        <template slot="youxiao" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: green"
          ></i>
          <i class="el-icon-error" v-else></i>
        </template>
        //排序模板
        <template slot="paixu" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag v-else-if="scope.row.cat_level === 1" type="success"
            >二级</el-tag
          >
          <el-tag v-else type="warning">三级</el-tag>
        </template>
        //操作模板
        <template slot="caozuo">
          <el-button type="primary" icon="el-icon-edit" size="mini"
            >编辑</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </template>
      </tree-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="70%"
    >
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="addCateForm.name"></el-input>
        </el-form-item>
        <!-- 级联选择器 -->
        <el-form-item label="父级分类" prop="name">
          <el-cascader
            v-model="selectKeys"
            :options="parentCatedata"
            expandTrigger="hover"
            @change="parentSelecthandleChange"
            :prop="parentCateprop"
          ></el-cascader>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateDialogVisible = false"
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
      cateTableData: [],
      queryInfo: {
        type: 3,
        //当前页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 5,
      },
      total: 0,
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          prop: "cat_deleted",
          //   表示当前列定义为模板列
          type: "template",
          // 指定当前模板列的名称
          template: "youxiao",
        },
        {
          label: "排序",
          prop: "cat_level",
          //   表示当前列定义为模板列
          type: "template",
          // 指定当前模板列的名称
          template: "paixu",
        },
        {
          label: "操作",
          type: "template",
          template: "caozuo",
        },
      ],
      // 控制添加分类对话框得显示与隐藏
      addCateDialogVisible: false,
      // 添加商品分类对话框父级商品分类数据
      addCateForm: {
        // 分类名称
        cat_name: "",
        // 父级分类id
        cat_pid: 0,
        // 分类层级
        cat_level: 0,
      },
      // 父级分类数据源
      parentCatedata: "",
      // 父级分类选中数组
      selectKeys: [],
      // 父级分类prop配置项
      parentCateprop: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
    };
  },
  created() {
    this.getCatelist();
  },
  methods: {
    //   监听每页多少条
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize;
      this.getCatelist();
    },
    // 监听当前页码
    handleCurrentChange(newpage) {
      this.queryInfo.pagenum = newpage;
      this.getCatelist();
    },
    // 获取商品分类列表
    async getCatelist() {
      const { data: res } = await this.$http.get("categories", {
        params: this.queryInfo,
      });
      this.cateTableData = res.data.result;
      this.total = res.data.total;
      console.log(res);
    },
    // 点击按钮展示添加分类对话框
    showAddCateDialog() {
      this.addCateDialogVisible = true;
    },
    // 级联选择框父级分类选择更改事件
    parentSelecthandleChange() {
      console.log(selectKeys);
    },
  },
};
</script>

<style lang="less" scoped>
.treetable {
  margin-top: 15px;
}
.el-cascader {
  width: 100%;
}
</style>