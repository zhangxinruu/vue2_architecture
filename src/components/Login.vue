<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登陆表单区域 -->
      <el-form
        class="login_form"
        :model="loginForm"
        :rules="logiFormRules"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <!-- 用户密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="el-icon-date"
          ></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import {login} from '../request/api/login'
export default {
  data() {
    return {
      // 登陆页面的数据对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      //   这是表单的验证规则对象
      logiFormRules: {
        //   验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //   点击重置按钮，重置表单内容
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) {
          this.$message.error("请按要求输入用户名密码");
        }
        // login(this.loginForm).then(res=>console.log("promise封装请求输出",res))
        const { data: res } = await this.$http.post("login", this.loginForm);
        if (res.meta.status !== 200) return this.$message.error("登陆失败");
        //   登录成功后将token保存到客户端的sessionStorage中。
        this.$message.success("登陆成功");
        window.sessionStorage.setItem("token", res.data.token);
        //   通过编程式导航跳转到后台主页，路由地址是/home
        this.$router.push("/home");
      });

    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  // 绝对定位
  position: absolute;
  left: 50%;
  top: 50%;
  // 参考自己的位置来平移
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #ddd;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    // 加了box-sizing:border-box属性，padding和border的值就不会在影响元素的
    // 宽高，相当于把padding和border的值都算在content里，
    box-sizing: border-box;
  }
  .btns {
    //   弹性盒模型，尾部对其
    display: flex;
    justify-content: flex-end;
  }
  el-input__inner {
    width: 300px;
  }
}
</style>