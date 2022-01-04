<!-- 商务 销售合同组件 -->
<template>
  <div class="page_control_container">
    <div class="page_condition">
      <a-space>
        <a-input v-model:value="contractId" placeholder="合同编号" />
        <a-input v-model:value="buildingSiteName" placeholder="工地项目名称" />
      </a-space>
    </div>
    <div class="page_condition_controler">
      <a-button type="primary">搜索</a-button>
    </div>
  </div>
  <div class="page_result">
    <a-table
      :columns="[
        ...columns,
        {
          title: '操作',
          width: 150,
          key: 'operation',
          align: 'center',
          dataIndex: 'operation',
          fixed: 'right',
        },
      ]"
      :data-source="data"
      :scroll="{ x: 2000, y: tableHeight }"
      :pagination="{ showQuickJumper: true }"
    >
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'operation'">
          <a-space>
            <a-button type="primary" size="small">编辑</a-button>
            <a-button danger size="small">删除</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
  import { defineComponent } from "vue";
  import CONSTANT_BUSINESS_MARKETING_CONTRACT from "../utils/constantBusinessMarketingContract";

  let data = [];
  for (let i = 0; i < 120; i++) {
    let rowObj = { key: i };

    for (let j = 0; j < 26; j++) {
      rowObj[String.fromCharCode(97 + j)] = "占位";
    }
    data.push(rowObj);
  }

  export default defineComponent({
    data() {
      return {
        contractId: "",
        buildingSiteName: "",
        data,
        columns: CONSTANT_BUSINESS_MARKETING_CONTRACT.TABLE_COLUMNS,
      };
    },
    computed: {
      tableHeight() {
        return (
          this.$store.state.moduleLogin.LoginFormDimensions.pageContentHeight -
          104 -
          32 -
          55 -
          44
        );
      },
    },
  });
</script>

<style scoped>
  .demo-page-header :deep(tr:last-child td) {
    padding-bottom: 0;
  }
</style>
