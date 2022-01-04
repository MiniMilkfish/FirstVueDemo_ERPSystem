<!-- 路径 面包屑组件 -->
<template>
  <a-breadcrumb v-if="breadShow" style="margin-bottom: 20px;">
    <a-breadcrumb-item v-for="(title, index) in breadCrumbs" :key="index">{{title}}</a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script>
  import { defineComponent } from "vue";
  import FAKE_DATE from "../utils/fakeDate";

  export default defineComponent({
    computed: {
      breadCrumbs: function(){
        let keyPaths = this.$store.state.moduleMasterLeftMenu;
        return keyPaths.menuRoot.concat(keyPaths.menuRootPath)
      },
      breadShow(){
        return FAKE_DATE.routeList.filter(item => item.title === this.$store.state.moduleMasterHeader.currentHeaderTabTag && item.sub.length > 0)[0]
      }
    }
  });
</script>
<style></style>
