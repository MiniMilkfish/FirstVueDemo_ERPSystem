<template>
  <div
    class="login-body"
    :style="{
      width: formDimensions.sWidth + 'px',
      height: formDimensions.sHeight + 'px',
    }"
  >
    <div
      class="login-container"
      :style="{
        width: formDimensions.mWidth + 'px',
        height: formDimensions.mHeight + 'px',
      }"
    >
      <div id="login_mask"></div>
      <div
        id="login_panel"
        :style="{
          width: formDimensions.mWidth + 'px',
          height: formDimensions.mHeight + 'px',
        }"
      >
        <div id="left_panel">
          <span class="panel_title">welcome</span>
          <div class="title_divider"></div>
          <span class="pannel_name">龙象环保<br />内部信息系统管理平台</span>
        </div>
        <div id="login_form">
          <div class="pannel_name">登录</div>
          <div>
            <a-form
              layout="vertical"
              ref="formRef"
              :model="formState"
              :rules="rules"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              hideRequiredMark
            >
              <a-form-item
                label="用户名"
                has-feedback
                name="name"
                placeholder="请输入用户名"
              >
                <a-input
                  class="form_control"
                  v-model:value="formState.name"
                  autocomplete="off"
                />
              </a-form-item>
              <a-form-item
                label="密码"
                has-feedback
                name="pass"
                placeholder="请输入密码"
              >
                <a-input-password
                  class="form_control"
                  v-model:value="formState.pass"
                  type="password"
                  autocomplete="off"
                />
              </a-form-item>

              <a-form-item>
                <a-button
                  class="form_control"
                  type="primary"
                  @click="onSubmit"
                  block
                  style="margin-top: 60px"
                  >登录</a-button
                >
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <commonCompNotification
    :message="notification.message"
    :description="notification.description"
    :type="notification.type"
    :tick="notification.tick"
  />
</template>
<script>
  import { defineComponent, reactive, ref } from "vue";
  // import { useRouter } from "vue-router";
  import MOTATION_TYPES from "../store/constantMotationTypes";
  import commonCompNotification from "./commonCompNotification.vue";
  import CONSTANT_DATA from "../utils/contantData";

  export default defineComponent({
    components: {
      commonCompNotification,
    },
    data() {
      const formRef = ref(),
        formState = reactive({
          name: undefined,
          pass: undefined,
        }),
        rules = {
          name: {
            required: true,
            message: "用户名为必填项",
          },
          pass: [
            {
              required: true,
              message: "密码为必填项",
            },
            {
              min: 6,
              message: "密码最短为6位",
            },
            {
              max: 20,
              message: "密码最长为20位",
            },
          ],
        },
        labelCol = {
          span: 8,
        },
        wrapperCol = {
          span: 24,
        };

      return {
        formRef,
        formState,
        rules,
        labelCol,
        wrapperCol,
        valve: true,
        notification: {
          message: "",
          description: "",
          type: CONSTANT_DATA.NOTIFICATION_TYPES.ERROR,
          tick: 1,
        },
      };
    },
    mounted() {
      let _this = this;
      _this.windowOnResize();

      this.$nextTick(function () {
        window.onresize = function () {
          _this.windowOnResize();
        };
      });
    },
    methods: {
      windowOnResize() {
        const w = window,
          d = document,
          documentElement = d.documentElement,
          body = d.getElementsByTagName("body")[0],
          width =
            w.innerWidth || documentElement.clientWidth || body.clientWidth,
          height =
            w.innerHeight || documentElement.clientHeight || body.clientHeight;

        this.$store.commit(MOTATION_TYPES.WINDOWS_ON_RESIZE, { width, height });
      },
      onSubmit() {
        // const router = useRouter();
        const _this = this;
        this.$refs.formRef
          .validate()
          .then(res => {
            _this.$store.dispatch(MOTATION_TYPES.LOGIN_FORM_SUBMIT, res);

            // 路由跳转
            _this.$router.push("home");
          })
          .catch(({ errorFields }) => {
            if (errorFields && errorFields.length > 0) {
              let description = errorFields[0].errors[0];
              this.notification.tick = Math.random();
              this.notification.type = CONSTANT_DATA.NOTIFICATION_TYPES.ERROR;
              this.notification.message = "登录错误";
              this.notification.description = description;
            }
          });
      },
    },
    computed: {
      formDimensions() {
        let formDimensions = this.$store.state.moduleLogin.LoginFormDimensions;
        let sWidth = formDimensions.sWidth,
          sHeight = formDimensions.sHeight;
        return {
          sWidth,
          sHeight,
          mWidth: sWidth * 0.625,
          mHeight: sHeight * 0.71,
        };
      },
    },
  });
</script>

<style>
  .login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(../assets/img/login_backdrop.png);
    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;
    margin: 0 auto;
    position: fixed;
    overflow: hidden;
  }
  .login-container {
    border-radius: 4px;
    border: 2px solid rgba(101, 187, 255, 0.19);
    box-shadow: 0px 4px 20px 0px rgb(0 41 78 / 11%);
    position: absolute;
    margin-bottom: 132px;
  }
  #login_mask {
    height: 100%;
    width: 100%;
    background-image: url(/img/login_backdrop.3f18fa67.png);
    background-position: center;
    background-size: inherit;
    background-repeat: no-repeat;
    -webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }

  #login_panel {
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  #left_panel {
    padding: 0 102px;
  }
  #left_panel .panel_title {
    font-size: 60px;
    font-weight: 800;
    color: #333333;
    line-height: 90px;
  }

  #left_panel .title_divider {
    width: 60px;
    height: 10px;
    background: #333333;
    border-radius: 5px;
    margin: 26px 0 50px;
  }

  #left_panel .pannel_name {
    font-size: 42px;
    font-weight: 500;
    color: #333333;
    line-height: 60px;
  }

  #login_panel #login_form {
    width: 450px;
    padding: 0 50px;
  }

  #login_form .pannel_name {
    font-size: 36px;
    font-weight: 600;
    color: #333333;
    line-height: 36px;
    margin-bottom: 54px;
  }

  #login_form .form_control {
    width: 350px;
    height: 50px;
    border-radius: 8px;
    font-size: 16px;
  }
</style>
