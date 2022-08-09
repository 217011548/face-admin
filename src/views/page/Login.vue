<template>
  <div class="login-container">
    <div id="login" class="login-layer"></div>
    <div class="bottom"></div>
    <div
      class="login-box df-center"
      :class="{ success: loginSuccess, init: loginInit }"
    >
      <img class="pz" src="~@/assets/pz.png" />
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        class="login-form flex-one"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title text-primary">Mask Detect CMS</h3>
          <!-- <h5 class="subTitle text-primary">{{ subTitle }}</h5> -->
        </div>

        <el-form-item prop="userName">
          <span class="svg-container">
            <i class="el-icon-user"></i>
          </span>
          <el-input
            ref="userName"
            v-model="ruleForm.username"
            placeholder="Please insert Username"
            name="userName"
            type="text"
            tabindex="1"
            auto-complete="on"
            class="flex-one"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <i class="el-icon-lock"></i>
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="ruleForm.password"
            :type="passwordType"
            placeholder="Please insert Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="submitForm('ruleForm')"
            class="flex-one"
          />
          <span class="show-pwd" @click="showPwd">
            <i
              :class="`el-icon-${
                passwordType === 'password' ? 'more' : 'view'
              }`"
            ></i>
          </span>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          class="login-button"
          @click.native.prevent="submitForm('ruleForm')"
        >
          Login
        </el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import bus from "../common/bus";
import log from "../../utils/log";
import * as Cookie from "../../utils/auth";
import { clearToken, getToken } from "../../utils/auth";

export default {
  data: function () {
    return {
      ruleForm: {
        username: "",
        password: "",
      },

      loginSuccess: false,
      loginInit: false,
      loading: false,
      animateTimeout: null,
      passwordType: "password",
      rules: {
        username: [
          { required: true, message: "Please insert Username", trigger: "blur" },
        ],
        password: [{ required: true, message: "Please insert Password", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.animateTimeout = setTimeout(() => {
      this.loginInit = true;
    }, 100);
  },
  beforeDestroy() {
    this.animateTimeout = null;
  },
  methods: {
    submitForm(formName) {
      const self = this;
      clearToken();
      console.log("Login");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          self.loginRequest();
        } else {
          console.log(`error submit ${formName}!`);
          return false;
        }
      });
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    loginRequest() {
      localStorage.removeItem("Authorization-Token");
      let data = {
        username: this.ruleForm.username,
        password: this.ruleForm.password,
        // rememberMe: 0,
      };
      const self = this;
      self.$api
        .post(self.$urls.login, data, {
          hideLoading: true,
        })
        .then((res) => {
          this.loginSuccess = true;
          this.animateTimeout = setTimeout(() => {
            this.$router.push({ path: "/" });
          }, 300);
  
          Cookie.setToken(res.data);
          console.log(res);
          self.userMenuRequest();
          this.loading = false;
        })
        .catch(() => {
          this.loginSuccess = false;
          this.loading = false;
        });
    },
    userMenuRequest() {


      bus.$emit("user_role_list", [
        "/",
        "/useradmin",
        "/model/financial",
        "/model/banner",
        "/model/contact",
        "/model/bottomimg",
        "/model/finacialpage",
        "/dashboard",
      ]);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.login-bottom {
  width: 50%;
  margin: 100px auto;

  .form-title {
    margin-bottom: 20px;
  }
}
</style>
<style lang="scss">
$bg: #283443;
$light_gray: #666;
$cursor: #666;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  display: flex;
  flex-direction: column;
  .bottom {
    height: 25%;
    background: #fff;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: #dee9fc;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      font-size: 16px !important;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        color: #666;
        -webkit-text-fill-color: $cursor !important;
        border: 0 !important;
      }
    }
  }
  .login-button {
    width: 100%;
    margin: 20px 0 20px;
  }
  .el-form-item {
    background: #fff;
    border-radius: 5px;
    color: #454545;
    box-shadow: 0 0 3px 1px darken(#dee9fc, 10%);
    .el-form-item__content {
      display: flex;
      align-items: center;
      line-height: inherit;
    }
    .el-form-item__error {
      padding-left: 60px;
    }
  }
}
</style>

<style lang="scss" scoped>
.logo-icon {
  display: block;
  margin: 0 auto;
  width: 25%;
  height: auto;
  margin-bottom: 10px;
}
// @import "~styles/variables";
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-layer {
  position: relative;
  width: 100%;
  flex: 1;
  // background-color: darken($theme-primary, 35%);
  background-color: #fff;
  background-image: url("~@/assets/login-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .login-box {
    box-shadow: 0 0 8px 1px #337ef1;
    .pz {
      width: 270px;
      margin-right: 50px;
    }
    padding: 40px;
    background: #fff;
    position: absolute;
    border-radius: 10px;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    transition: all 0.4s;
    max-width: 100%;
    transform: translate(-50%, -60%) rotate3d(0, 1, 1, 180deg);
    &.init {
      transform: translate(-50%, -60%) rotate3d(0, 1, 1, 0deg);
    }
    &.success {
      transform: translate(-50%, -60%) rotate3d(0, 1, 1, 180deg);
    }
  }
  .login-form {
    position: relative;
    width: 320px;
    overflow: inherit;
    background: #fff;
    border-radius: 20px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 0 15px 0 15px;
    // margin-right:10px;
    color: $dark_gray;
    vertical-align: middle;
    // width: 30px;
    display: inline-block;
    box-sizing: border-box;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 24px;
      color: #409eff;
      margin: 0px auto 20px auto;
      text-align: center;
    }
    .subTitle {
      font-size: 14px;
      color: #409eff;
      margin: 0px auto 30px auto;
      text-align: center;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
    line-height: 47px;
  }
}
</style>
