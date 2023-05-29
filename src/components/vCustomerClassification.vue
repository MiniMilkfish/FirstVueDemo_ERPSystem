<!-- 客户分类组件 -->
<template>
  <div class="page_result">
    <div class="result_extra_control">
      <a-space>
        <a-button type="primary" size="small" @click="modifyModalShow"
          >添加</a-button
        >
      </a-space>
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
      :data-source="getCustomerClassificationTableDatas.data"
      :scroll="{ x: 600, y: tableHeight }"
      :pagination="{
        showQuickJumper: true,
        defaultPageSize: defaultPageSize,
        pageSizeOptions: pageSizeOptions,
        total: getCustomerClassificationTableDatas.total,
        current: getCustomerClassificationTableDatas.activePage,
        onChange: handleQueryCustomerClassificationList,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <a-space>
            <a-button
              type="primary"
              size="small"
              @click="modifyModalShow(record.id, record.categoryname)"
              >编辑</a-button
            >
            <a-popconfirm
              title="确定移除当前客户分类嘛?"
              @confirm="categoryOfMeasurementTableRowDelete(record.id)"
            >
              <a-button danger size="small">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>

  <!-- 产品分类 新增 & 编辑 -->
  <a-modal
    v-model:visible="modifyModalVisible"
    :title="'产品分类' + modalType"
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
      :model="categoryFormState"
      layout="horizontal"
      name="form_in_modal"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item name="categoryName" label="客户分类名称">
        <a-input
          v-model:value="categoryFormState.categoryName"
          placeholder="请填写客户分类名称"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { defineComponent, reactive, ref } from "vue";
  import CONSTANT_CUSTOMER_CLASSIFICATION from "../utils/constantCustomerClassification";
  import ACTION_TYPES from "../store/constantActionTypes";
  import CONSTANT_DATA from "../utils/constantData";

  export default defineComponent({
    data() {
      const formRef = ref();
      const categoryFormState = reactive({
        categoryId: 0,
        categoryName: "",
      });
      const modifyModalVisible = ref(false);

      return {
        formRef,
        categoryFormState,
        modifyModalVisible,
        labelCol: { style: { width: "120px", textAlign: "left" } },
        wrapperCol: { span: 24 },
        rules: {
          categoryName: {
            required: true,
            message: "客户分类名称为必填项",
          },
        },
        modalType: "",
        defaultPageSize: CONSTANT_CUSTOMER_CLASSIFICATION.TABLE_SHOW_SIZE,
        pageSizeOptions: CONSTANT_CUSTOMER_CLASSIFICATION.TABLE_SHOW_SIZE_ARRAY,
        columns: CONSTANT_CUSTOMER_CLASSIFICATION.TABLE_COLUMNS,
      };
    },
    computed: {
      tableHeight() {
        return (
          this.$store.state.moduleLogin.LoginFormDimensions.pageContentHeight -
          104 -
          12 -
          55 -
          64 -
          40
        );
      },
      getCustomerClassificationTableDatas() {
        return this.$store.state.moduleCustomerClassification.tableData;
      },
    },
    methods: {
      handleQueryCustomerClassificationList(currentPage, showPageSize) {
        currentPage = currentPage
          ? currentPage
          : this.$store.state.moduleCustomerClassification.tableData.activePage;
        showPageSize = showPageSize
          ? showPageSize
          : CONSTANT_CUSTOMER_CLASSIFICATION.TABLE_SHOW_SIZE;

        this.$store.dispatch(ACTION_TYPES.CUSTOMER_CLASSIFICATION_LIST_QUERY, {
          actionFailure: this.actionFailure,
          currentPage,
          showPageSize,
        });
      },
      actionFailure(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.ERROR,
          message: "客户分类" + this.modalType,
          description: description,
        });
      },
      actionSuccess(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.SUCCESS,
          message: "客户分类" + this.modalType,
          description: description,
        });
      },
      modifyModalSubmit() {
        let _this = this;
        this.$refs.formRef
          .validate()
          .then(res => {
            _this.$data.modifyModalVisible = false;
            res.categoryId = _this.categoryFormState.categoryId;

            _this.$store.dispatch(ACTION_TYPES.CUSTOMER_CLASSIFICATION_MODIFY, {
              ...res,
              actionFailure: _this.actionFailure,
              actionSuccess: _this.actionSuccess,
              actionCallback: _this.handleQueryCustomerClassificationList,
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
      modifyModalShow(id, name) {
        this.modifyModalVisible = true;

        if (name && name.length > 0) {
          this.categoryFormState.categoryId = id;
          this.categoryFormState.categoryName = name;
          this.modalType = "编辑";
        } else {
          this.categoryFormState.categoryId = 0;
          this.categoryFormState.categoryName = "";
          this.modalType = "新增";
        }
      },
      modifyModalClose() {
        this.modifyModalVisible = false;
      },
      categoryOfMeasurementTableRowDelete(id) {
        let _this = this;
        this.$store.dispatch(ACTION_TYPES.CUSTOMER_CLASSIFICATION_DELETE, {
          id,
          actionFailure: _this.actionFailure,
          actionSuccess: _this.actionSuccess,
          actionCallback: _this.handleQueryCustomerClassificationList,
        });
      },
    },
    mounted() {
      // 客户分类列表初始化
      this.handleQueryCustomerClassificationList();
    },
  });
</script>

<style scoped>
  .demo-page-header :deep(tr:last-child td) {
    padding-bottom: 0;
  }
</style>
