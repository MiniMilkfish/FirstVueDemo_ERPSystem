<!-- 首页组件 -->
<template>
  <div id="dashboard_container">
    <div class="left_panel">
      <div id="components-grid-demo-playground">
        <a-row :gutter="[32, 32]">
          <a-col class="col_part" :span="6"><div>Column</div></a-col>
          <a-col class="col_part" :span="6"><div>Column</div></a-col>
          <a-col class="col_part" :span="6"><div>Column</div></a-col>
        </a-row>

        <a-row :gutter="[32, 32]">
          <a-col class="col_part" :span="6"><div>Column</div></a-col>
          <a-col class="col_part" :span="6"><div>Column</div></a-col>
          <a-col class="col_part" :span="6"><div>Column</div></a-col>
        </a-row>
      </div>
    </div>
    <div class="right_panel">123</div>
  </div>
</template>

<script>
  import { defineComponent } from "vue";
  export default defineComponent({
    name: "vMasterDashboard",
  });
</script>

<style scoped>
  #dashboard_container {
    display: flex;
    flex-flow: row;
  }
  #components-grid-demo-playground :deep(.ant-col) {
    background: transparent;
    border: 0;
  }
  #components-grid-demo-playground :deep(.ant-col) > div {
    background: #00a0e9;
    height: 320px;
    width: 300px;
    line-height: 120px;
    font-size: 13px;
    margin: 20px 80px;
    text-align: center;
  }

  .right_panel {
    background: #00a0e9;
    width: 200px;
  }
</style>
