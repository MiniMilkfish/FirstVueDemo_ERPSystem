<template>
  <div class="logo">内部运维系统平台</div>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    theme="dark"
    mode="horizontal"
    :style="{ lineHeight: '64px', flex: 'auto' }"
    @select="headerTabSelect"
  >
    <a-menu-item v-for="item in menuItems" :key="item.join('_')">{{
      item[0]
    }}</a-menu-item>
  </a-menu>
  <div class="heder_control">
    <div class="control_message">
      <MailOutlined
        style="font-size: 24px; margin-right: 50px; color: #ffffff"
      />
    </div>
    <div class="control_avatar">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          Admin&nbsp;
          <a-avatar
            style="background-color: #87d068; margin-right: 5px"
            size="small"
          >
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          <CaretDownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0"> 用户中心 </a-menu-item>
            <a-menu-item key="1"> 系统设置 </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3" @click="goBackLogin"> 退出</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from "vue";
  import FAKE_DATE from "../utils/fakeDate";
  import MOTATION_TYPES from "../store/constantMotationTypes";
  import {
    CaretDownOutlined,
    UserOutlined,
    MailOutlined,
  } from "@ant-design/icons-vue";

  export default defineComponent({
    data(){
      return {
        selectedKeys: [
            `${this.$store.state.moduleMasterHeader.currentHeaderTabTag}_${this.$store.state.moduleMasterHeader.currentHeaderTabDashboardPageUrl}`,
          ]
      }
    },
    components: {
      CaretDownOutlined,
      UserOutlined,
      MailOutlined,
    },
    computed: {
      menuItems() {
        return Object.values(FAKE_DATE.routeList).map(function (item) {
          return [item.title, item.url];
        });
      },
      getCurrentHeaderTabTag: {
        get() {
          return [
            `${this.$store.state.moduleMasterHeader.currentHeaderTabTag}_${this.$store.state.moduleMasterHeader.currentHeaderTabDashboardPageUrl}`,
          ];
        }
      },
    },
    watch: {
      getCurrentHeaderTabTag(newValue) {
        this.selectedKeys = newValue;
      }
    },
    methods: {
      headerTabSelect({ key }) {
        let splitWords = key.split("_");
        this.$store.commit(MOTATION_TYPES.MASTER_HEADER_TAB_ON_SELECT, {
          key: splitWords[0],
          url: splitWords[1] || "",
        });
      },
      goBackLogin() {
        this.$store.commit(MOTATION_TYPES.MASTER_EXIST_PLATFORM);
      },
    },
  });
</script>
<style>
  #components-layout-demo-top-side-2 .logo {
    line-height: 64px;
    float: left;
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    padding: 0;
    margin: 0 50px 0 0;
  }

  .heder_control {
    display: flex;
  }

  .control_message {
    line-height: 75px;
  }
</style>
