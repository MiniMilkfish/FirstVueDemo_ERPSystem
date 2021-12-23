<template #icon>
  <a-menu
    v-model:selectedKeys="selectedKeys2"
    style="width: 256px"
    mode="inline"
    :open-keys="openKeys"
    @openChange="onOpenChange"
    @click="onRootItemClick"
  >
    <a-sub-menu v-for="menuItem in matchedMenulist" :key="menuItem.title">
      <template #icon><SettingOutlined /></template>
      <template #title>{{ menuItem.title }}</template>
      <a-menu-item v-for="item in menuItem.sub" :key="item.title">{{
        item.title
      }}</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
<script>
  import { defineComponent, ref } from "vue";
  import { SettingOutlined } from "@ant-design/icons-vue";
  import FAKE_DATE from "../utils/fakeDate";
  import MOTATION_TYPES from "../store/constantMotationTypes";

  export default defineComponent({
    data() {
      const rootSubmenuKeys = [];
      FAKE_DATE.routeList.slice(1).map(function (item) {
        return item.sub.map(function (_item) {
          _item.title && _item.title.length > 0
            ? rootSubmenuKeys.push(_item.title)
            : "";
          return true;
        });
      });
      return {
        rootSubmenuKeys,
        openKeys: ref([]),
        selectedKeys2: ref([]),
      };
    },
    components: {
      SettingOutlined,
    },
    methods: {
      onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(
          key => this.openKeys.indexOf(key) === -1
        );

        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.openKeys = openKeys;
        } else {
          this.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
      },
      onRootItemClick({ keyPath }) {
        this.$store.commit(MOTATION_TYPES.MASTER_LEFT_MENU_ITEM_ON_CLICK, {
          keyPath,
          rootKey: [this.$store.state.moduleMasterHeader.currentHeaderTabTag]
        });
      },
    },
    computed: {
      matchedMenulist() {
        let currentHeaderTabTag =
          this.$store.state.moduleMasterHeader.currentHeaderTabTag;

        let matchedMenu = FAKE_DATE.routeList.slice(1).filter(function (item) {
          return currentHeaderTabTag === item.title;
        });

        if (matchedMenu && matchedMenu.length > 0) {
          return matchedMenu[0].sub;
        } else {
          return [];
        }
      },
    },
  });
</script>
<style></style>
