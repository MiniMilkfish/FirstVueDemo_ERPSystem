<!-- 产品分类 组件 -->
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
      :data-source="getProductClassificationTableDatas.data"
      :scroll="{ x: 600, y: tableHeight }"
      :pagination="{
        showQuickJumper: true,
        defaultPageSize: defaultPageSize,
        pageSizeOptions: pageSizeOptions,
        total: getProductClassificationTableDatas.total,
        current: getProductClassificationTableDatas.activePage,
        onChange: handleQueryProductClassificationList,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <a-space>
            <a-button
              type="primary"
              size="small"
              @click="modifyModalShow(record.id, record.typename)"
              >编辑</a-button
            >
            <a-popconfirm
              title="确定移除当前产品类别嘛?"
              @confirm="inventoryAlarmSettingsTableRowDelete(record.id)"
            >
              <a-button danger size="small">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>

  <!-- 新增 & 编辑 产品类别 -->
  <a-modal
    v-model:visible="modifyModalVisible"
    :title="'产品类别 ' + modalType"
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
      :model="getProductClassificationDetail"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item name="typename" label="产品类别名称">
        <a-input
          v-model:value="getProductClassificationDetail.typename"
          placeholder="请填写产品类别名称"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { defineComponent, ref } from "vue";
  import CONSTANT_PRODUCT_CLASSIFICATION from "../utils/constantProductClassification";
  import ACTION_TYPES from "../store/constantActionTypes";
  import CONSTANT_DATA from "../utils/constantData";

  export default defineComponent({
    data() {
      const formRef = ref();
      const modifyModalVisible = ref(false);

      return {
        formRef,
        modifyModalVisible,
        columns: CONSTANT_PRODUCT_CLASSIFICATION.TABLE_COLUMNS,
        labelCol: { style: { width: "120px", textAlign: "left" } },
        wrapperCol: { span: 24 },
        rules: {
          typename: {
            required: true,
            message: "产品类别名称为必填项",
          },
        },
        modalType: "",
        defaultPageSize: CONSTANT_PRODUCT_CLASSIFICATION.TABLE_SHOW_SIZE,
        pageSizeOptions: CONSTANT_PRODUCT_CLASSIFICATION.TABLE_SHOW_SIZE_ARRAY,
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
      getProductClassificationTableDatas() {
        return this.$store.state.moduleProductClassification.tableData;
      },
      getProductClassificationDetail() {
        return this.$store.state.moduleProductClassification
          .productClassificationDetail;
      },
    },
    methods: {
      modifyModalSubmit() {
        let _this = this;
        this.$refs.formRef
          .validate()
          .then(res => {
            _this.$data.modifyModalVisible = false;

            _this.$store.dispatch(ACTION_TYPES.PRODUCT_CLASSIFICATION_MODIFY, {
              ...res,
              actionFailure: _this.actionFailure,
              actionSuccess: _this.actionSuccess,
              actionCallback: _this.handleQueryProductClassificationList,
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
      handleQueryProductClassificationList(currentPage, showPageSize) {
        currentPage = currentPage
          ? currentPage
          : this.$store.state.moduleProductClassification.tableData.activePage;
        showPageSize = showPageSize
          ? showPageSize
          : CONSTANT_PRODUCT_CLASSIFICATION.TABLE_SHOW_SIZE;

        this.$store.dispatch(ACTION_TYPES.PRODUCT_CLASSIFICATION_LIST_QUERY, {
          actionFailure: this.actionFailure,
          currentPage,
          showPageSize,
        });
      },
      actionFailure(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.ERROR,
          message: "产品类别" + this.modalType,
          description: description,
        });
      },
      actionSuccess(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.SUCCESS,
          message: "产品类别" + this.modalType,
          description: description,
        });
      },
      modifyModalShow(id, name) {
        let _this = this;
        this.modifyModalVisible = true;

        if (name && name.length > 0) {
          this.modalType = "编辑";

          // 查询产品类别详情
          this.handleQueryProductClassificationDetail(id);
        } else {
          this.$store.commit(ACTION_TYPES.PRODUCT_CLASSIFICATION_DETAIL_CLEAR);
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
        this.$store.dispatch(ACTION_TYPES.PRODUCT_CLASSIFICATION_DELETE, {
          id,
          actionFailure: _this.actionFailure,
          actionSuccess: _this.actionSuccess,
          actionCallback: _this.handleQueryProductClassificationList,
        });
      },
      handleQueryProductClassificationDetail(id) {
        this.$store.dispatch(ACTION_TYPES.PRODUCT_CLASSIFICATION_DETAIL, id);
      },
    },
    mounted() {
      // 产品类别列表查询初始化
      this.handleQueryProductClassificationList();
    },
  });
</script>

<style scoped>
  .demo-page-header :deep(tr:last-child td) {
    padding-bottom: 0;
  }
</style>
