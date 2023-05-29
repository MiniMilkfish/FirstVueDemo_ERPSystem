<!-- 库存概况 组件 -->
<template>
  <div class="page_result">
    <div class="result_extra_control">
      <a-descriptions title="现有库存" />
    </div>
    <a-table
      :columns="columns"
      :data-source="getStockSummaryTableDatas.data"
      :scroll="{ x: 1200, y: tableHeight }"
      :pagination="{
        showQuickJumper: true,
        defaultPageSize: defaultPageSize,
        pageSizeOptions: pageSizeOptions,
        total: getStockSummaryTableDatas.total,
        current: getStockSummaryTableDatas.activePage,
        onChange: handleQueryStockSummaryList,
      }"
    />
  </div>
</template>

<script>
  import { defineComponent } from "vue";
  import CONSTANT_STOCK_SUMMARY from "../utils/constantStockSummary";
  import ACTION_TYPES from "../store/constantActionTypes";
  import CONSTANT_DATA from "../utils/constantData";

  export default defineComponent({
    data() {
      return {
        columns: CONSTANT_STOCK_SUMMARY.TABLE_COLUMNS,
        defaultPageSize: CONSTANT_STOCK_SUMMARY.TABLE_SHOW_SIZE,
        pageSizeOptions: CONSTANT_STOCK_SUMMARY.TABLE_SHOW_SIZE_ARRAY,
      };
    },
    computed: {
      tableHeight() {
        return (
          this.$store.state.moduleLogin.LoginFormDimensions.pageContentHeight -
          75 -
          64 -
          40
        );
      },
      getStockSummaryTableDatas() {
        return this.$store.state.moduleStockSummary.tableData;
      },
    },
    methods: {
      actionFailure(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.ERROR,
          message: "现有库存",
          description: description,
        });
      },
      handleQueryStockSummaryList(currentPage, showPageSize) {
        currentPage = currentPage
          ? currentPage
          : this.$store.state.moduleStockSummary.tableData.activePage;
        showPageSize = showPageSize
          ? showPageSize
          : CONSTANT_STOCK_SUMMARY.TABLE_SHOW_SIZE;

        this.$store.dispatch(ACTION_TYPES.STOCK_SUMMARY_LIST_QUERY, {
          actionFailure: this.actionFailure,
          currentPage,
          showPageSize,
        });
      },
    },
    mounted() {
      // 现有库存列表查询初始化
      this.handleQueryStockSummaryList();
    },
  });
</script>

<style scoped>
  .demo-page-header :deep(tr:last-child td) {
    padding-bottom: 0;
  }
</style>
