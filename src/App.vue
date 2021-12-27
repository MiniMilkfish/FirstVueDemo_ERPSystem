<template>
  <a-layout id="components-layout-demo-top-side-2" v-if="verified">
    <a-spin :spinning="spinning">
      <a-layout-header class="header">
        <vAppHeader />
      </a-layout-header>
      <a-layout>
        <a-layout-sider
          width="256"
          style="background: #fff"
          v-if="leftMenuShow"
        >
          <vAppLeftMenu />
        </a-layout-sider>
        <a-layout style="padding: 12px 24px">
          <vAppBreadCrumb />
          <a-layout-content
            :style="{
              background: '#fff',
              padding: '24px',
              margin: '12px 0 0',
              minHeight: '280px',
              height: contentHeight + 'px',
            }"
          >
            <router-view></router-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-spin>
  </a-layout>
  <a-layout v-else>
    <vLogin />
  </a-layout>
</template>

<script>
  import vLogin from "./components/vLogin.vue";
  import vAppHeader from "./components/vAppHeader.vue";
  import vAppLeftMenu from "./components/vAppLeftMenu.vue";
  import vAppBreadCrumb from "./components/vAppBreadcrumb.vue";
  import FAKE_DATE from "./utils/fakeDate";
  import MOTATION_TYPES from "./store/constantMotationTypes";

  export default {
    name: "App",
    data() {
      return {
        collapsed: false,
        current: ["mail"],
        openKeys: ["sub1"],
        spinning: false,
      };
    },
    components: { vLogin, vAppHeader, vAppLeftMenu, vAppBreadCrumb },
    watch: {
      openKeys(val) {
        console.log("openKeys", val);
      },
    },
    methods: {
      handleClick(e) {
        console.log("click", e);
      },
      titleClick(e) {
        console.log("titleClick", e);
      },
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
    },
    computed: {
      verified() {
        return this.$store.state.moduleLogin.AuthInfo.validated;
      },
      contentHeight() {
        const topHeaderHeight = 64,
          breadcrumbHeight = 22,
          contentMarginPaddingHeight = 36;

        const breadcrumbShow = FAKE_DATE.routeList.filter(
          item =>
            item.title ===
              this.$store.state.moduleMasterHeader.currentHeaderTabTag &&
            item.sub.length > 0 && this.$store.state.moduleMasterLeftMenu.menuRootPath.length > 0
        )[0];

        return (
          this.$store.state.moduleLogin.LoginFormDimensions.sHeight -
          topHeaderHeight -
          (breadcrumbShow ? breadcrumbHeight : 0) -
          contentMarginPaddingHeight
        );
      },
      leftMenuShow() {
        return FAKE_DATE.routeList.filter(
          item =>
            item.title ===
              this.$store.state.moduleMasterHeader.currentHeaderTabTag &&
            item.sub.length > 0
        )[0];
      },
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
    created() {
      if (sessionStorage.getItem("store")) {
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store,
            JSON.parse(sessionStorage.getItem("store"))
          )
        );
      }

      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state));
      });
    },
  };
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 0px;
    padding: 0px;
    height: 100%;
    width: 100%;
    font-family: "pf";
  }

  .header {
    display: flex;
  }
</style>
