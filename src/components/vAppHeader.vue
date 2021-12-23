<template>
  <div class="logo">内部运维系统平台</div>
  <a-menu
    v-model:selectedKeys="selectedKeys1"
    theme="dark"
    mode="horizontal"
    :style="{ lineHeight: '64px' }"
    @select="headerTabSelect"
  >
    <a-menu-item v-for="item in menuItems" :key="item.join('_')">{{
      item[0]
    }}</a-menu-item>
  </a-menu>
</template>
<script>
  import { defineComponent, ref } from "vue";
  import FAKE_DATE from "../utils/fakeDate";
  import MOTATION_TYPES from "../store/constantMotationTypes";

  export default defineComponent({
    data() {
      return {
        //
      };
    },
    setup() {
      return {
        selectedKeys1: ref(["首页"]),
        key: "首页",
      };
    },
    computed: {
      menuItems() {
        return Object.values(FAKE_DATE.routeList).map(function (item) {
          return [item.title, item.url];
        });
      },
    },
    methods: {
      headerTabSelect({ key }) {
        let splitWords = key.split("_");
        this.$store.commit(MOTATION_TYPES.MASTER_HEADER_TAB_ON_SELECT, {
          key: splitWords[0],
          url: splitWords[1] || "",
        });
      },
    },
  });
</script>
<style>
  #components-layout-demo-top-side-2 .logo {
    /* background: rgba(255, 255, 255, 0.2); */
    line-height: 64px;
    float: left;
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    padding: 0;
    margin: 0 200px 0 0;
  }
</style>
