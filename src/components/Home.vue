<template>
  <div>
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header>
        <div>
          <img src="../assets/logo.png" alt="" />
          <span>电商后台管理系统</span>
        </div>
        <a><router-link to="bigscreen">数据大屏</router-link> </a>
        <el-button type="info" @click="logout">退出</el-button></el-header
      >
      <!-- 页面主体区域 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="chageisCollapse">|||</div>
          <!-- 侧边栏菜单区域 -->
          <el-menu
            background-color="#323743"
            text-color="#fff"
            active-text-color="#3696EA"
            :unique-opened="true"
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="savePath"

          >
            <!-- 一级菜单 -->
            <el-submenu
              :index="'/'+ item.path "
              v-for="item in menulist"
              :key="item.id"
            >
              <!-- 一级菜单模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconsObg[item.id]"></i>
                <!-- 文本 -->
                <span>{{ item.authName }}</span>
              </template>

              <!-- 二级菜单 -->
              <el-menu-item
                :index="'/'+ itemchildren.path"
                v-for="itemchildren in item.children"
                :key="itemchildren.id"
                @click="saveIndex('/'+ itemchildren.path)"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 文本 -->
                  <span>{{ itemchildren.authName }}</span>
                </template></el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menulist: "",
      iconsObg: {
        125: "el-icon-s-tools",
        103: "el-icon-s-tools",
        101: "el-icon-s-tools",
        102: "el-icon-s-tools",
        145: "el-icon-setting",
      },
      isCollapse: false,
      // 被激活的菜单空地址
      savePath:""
    };
  },
  created() {
    this.getMenuList();
    this.savePath = window.sessionStorage.getItem("activePath")
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取所有菜单
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) {this.$message.error("获取菜单列表失败");}
      this.menulist = res.data;
    }, 
    // 点击按钮，切换菜单折叠与展开
chageisCollapse(){
  this.isCollapse = !this.isCollapse
},
saveIndex(index){
  window.sessionStorage.setItem('activePath',index)
  this.savePath = index
}
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d3f;
  // 两端对齐，子元素之间有间隙
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  align-items: center;
  color: white;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #323743;
  .el-menu {
    border: 0px;
  }
}
.el-main {
  background-color: #e9edf0;
}
.home-container {
  height: 10000px;
}
img {
  width: 50px;
  height: 50px;
}
.toggle-button {
  background-color: #475163;
  text-align: center;
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>