<!-- 供应渠道 组件 -->
<template>
  <div class="page_result">
    <div class="result_extra_control">
      <a-button type="primary" size="small" @click="modifyModalShow"
        >添加</a-button
      >
    </div>
    <a-table
      :columns="[
        ...columns,
        {
          title: '操作',
          width: 150,
          key: 'operation',
          align: 'center',
          dataIndex: 'operation',
        },
      ]"
      :data-source="getSupplyChannelTableDatas.data"
      :scroll="{ x: 600, y: tableHeight }"
      :pagination="{
        showQuickJumper: true,
        defaultPageSize: defaultPageSize,
        pageSizeOptions: pageSizeOptions,
        total: getSupplyChannelTableDatas.total,
        current: getSupplyChannelTableDatas.activePage,
        onChange: handleQuerySupplyChannelList,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <a-space>
            <a-button
              type="primary"
              size="small"
              @click="modifyModalShow(record.supplierid, record.suppliername)"
              >编辑</a-button
            >
            <a-popconfirm
              title="确定移除当前供应渠道嘛?"
              @confirm="inventoryAlarmSettingsTableRowDelete(record.supplierid)"
            >
              <a-button danger size="small">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>

  <!-- 新增 & 编辑 供应渠道 -->
  <a-modal
    v-model:visible="modifyModalVisible"
    :title="'供应渠道 ' + modalType"
    width="600px"
    @ok="modifyModalSubmit"
  >
    <template #footer>
      <a-button key="back" @click="modifyModalClose">关闭</a-button>
      <a-button key="submit" type="primary" @click="modifyModalSubmit"
        >提交</a-button
      >
    </template>
    <a-form
      ref="formRef"
      layout="horizontal"
      name="form_in_modal"
      :rules="rules"
      :model="getSupplyChannelDetail"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item name="suppliername" label="供应商名称">
        <a-input
          v-model:value="getSupplyChannelDetail.suppliername"
          placeholder="请填写供应商名称"
        />
      </a-form-item>
      <a-form-item name="shortcode" label="供应商简码">
        <a-input
          v-model:value="getSupplyChannelDetail.shortcode"
          placeholder="请填写供应商简码"
        />
      </a-form-item>
      <a-form-item name="level" label="等级">
        <a-input-number
          style="width: 100%"
          v-model:value="getSupplyChannelDetail.level"
          placeholder="请填写等级"
        />
      </a-form-item>
      <a-form-item name="remark" label="备注">
        <a-input
          v-model:value="getSupplyChannelDetail.remark"
          placeholder="请填写备注"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { defineComponent, ref } from "vue";
  import CONSTANT_SUPPLY_CHANNEL from "../utils/constantSupplyChannel";
  import ACTION_TYPES from "../store/constantActionTypes";
  import CONSTANT_DATA from "../utils/constantData";

  export default defineComponent({
    data() {
      const formRef = ref();
      const modifyModalVisible = ref(false);

      return {
        formRef,
        modifyModalVisible,
        columns: CONSTANT_SUPPLY_CHANNEL.TABLE_COLUMNS,
        labelCol: { style: { width: "120px", textAlign: "left" } },
        wrapperCol: { span: 24 },
        rules: {
          suppliername: {
            required: true,
            message: "供应商名称为必填项",
          },
          shortcode: {
            required: true,
            message: "简写编码为必填项",
          },
        },
        modalType: "",
        defaultPageSize: CONSTANT_SUPPLY_CHANNEL.TABLE_SHOW_SIZE,
        pageSizeOptions: CONSTANT_SUPPLY_CHANNEL.TABLE_SHOW_SIZE_ARRAY,
        warnTypeList: CONSTANT_DATA.WARN_TYPE,
      };
    },
    computed: {
      tableHeight() {
        return (
          this.$store.state.moduleLogin.LoginFormDimensions.pageContentHeight -
          14 -
          12 -
          55 -
          64 -
          40
        );
      },
      getSupplyChannelTableDatas() {
        return this.$store.state.moduleSupplyChannel.tableData;
      },
      getSupplyChannelDetail() {
        return this.$store.state.moduleSupplyChannel.supplyChannelDetail;
      },
      getSupplyChannelProductList() {
        return this.$store.state.moduleSupplyChannel.productList;
      },
      getSupplyChannelAccessoriesList() {
        return this.$store.state.moduleSupplyChannel.accessoriesList;
      },
      getSupplyChannelWarehouseList() {
        return this.$store.state.moduleSupplyChannel.warehouseList;
      },
    },
    methods: {
      modifyModalSubmit() {
        let _this = this;
        this.$refs.formRef
          .validate()
          .then(res => {
            _this.$data.modifyModalVisible = false;

            _this.$store.dispatch(ACTION_TYPES.SUPPLY_CHANNEL_MODIFY, {
              ...res,
              actionFailure: _this.actionFailure,
              actionSuccess: _this.actionSuccess,
              actionCallback: _this.handleQuerySupplyChannelList,
            });
          })
          .catch(({ errorFields }) => {
            if (errorFields && errorFields.length > 0) {
              let description = errorFields[0].errors[0];
              _this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
                type: CONSTANT_DATA.NOTIFICATION_TYPES.ERROR,
                message: "验证错误",
                description: description,
              });
            }
          });
      },
      handleQuerySupplyChannelList(currentPage, showPageSize) {
        currentPage = currentPage
          ? currentPage
          : this.$store.state.moduleSupplyChannel.tableData.activePage;
        showPageSize = showPageSize
          ? showPageSize
          : CONSTANT_SUPPLY_CHANNEL.TABLE_SHOW_SIZE;

        this.$store.dispatch(ACTION_TYPES.SUPPLY_CHANNEL_LIST_QUERY, {
          actionFailure: this.actionFailure,
          currentPage,
          showPageSize,
        });
      },
      actionFailure(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.ERROR,
          message: "供应渠道" + this.modalType,
          description: description,
        });
      },
      actionSuccess(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.SUCCESS,
          message: "供应渠道" + this.modalType,
          description: description,
        });
      },
      modifyModalShow(id, name) {
        let _this = this;
        this.modifyModalVisible = true;

        if (name && name.length > 0) {
          this.modalType = "编辑";

          // 查询供应渠道详情
          this.handleQuerySupplyChannelDetail(id);
        } else {
          this.$store.commit(ACTION_TYPES.SUPPLY_CHANNEL_DETAIL_CLEAR);
          this.modalType = "新增";
          setTimeout(() => {
            _this.$refs.formRef.resetFields();
          });
        }
      },
      modifyModalClose() {
        this.modifyModalVisible = false;
      },
      inventoryAlarmSettingsTableRowDelete(id) {
        let _this = this;
        this.$store.dispatch(ACTION_TYPES.SUPPLY_CHANNEL_DELETE, {
          id,
          actionFailure: _this.actionFailure,
          actionSuccess: _this.actionSuccess,
          actionCallback: _this.handleQuerySupplyChannelList,
        });
      },
      handleQuerySupplyChannelDetail(id) {
        this.$store.dispatch(ACTION_TYPES.SUPPLY_CHANNEL_DETAIL, id);
      },
    },
    mounted() {
      // 供应渠道列表查询初始化
      this.handleQuerySupplyChannelList();
    },
  });
</script>

<style scoped>
  .demo-page-header :deep(tr:last-child td) {
    padding-bottom: 0;
  }
</style>
