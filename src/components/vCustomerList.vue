<!-- 客户列表组件 -->
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
      :data-source="getCustomerListTableDatas.data"
      :scroll="{ x: 600, y: tableHeight }"
      :pagination="{
        showQuickJumper: true,
        defaultPageSize: defaultPageSize,
        pageSizeOptions: pageSizeOptions,
        total: getCustomerListTableDatas.total,
        current: getCustomerListTableDatas.activePage,
        onChange: handleQueryCustomerList,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <a-space>
            <a-button
              type="primary"
              size="small"
              @click="modifyModalShow(record.id, record.customname)"
              >编辑</a-button
            >
            <a-popconfirm
              title="确定移除当前客户嘛?"
              @confirm="categoryOfMeasurementTableRowDelete(record.id)"
            >
              <a-button danger size="small">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>

  <!-- 客户 新增 & 编辑 -->
  <a-modal
    v-model:visible="modifyModalVisible"
    :title="'客户 ' + modalType"
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
      :model="getCustomerDetail"
      layout="horizontal"
      name="form_in_modal"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item name="customname" label="名称">
        <a-input
          v-model:value="getCustomerDetail.customname"
          placeholder="请填写客户名称"
        />
      </a-form-item>
      <a-form-item name="categoryid" label="分类">
        <a-select
          ref="select"
          v-model:value="getCustomerDetail.categoryid"
          placeholder="请选择客户分类"
          @change="handleCategoryIdSelect"
        >
          <a-select-option
            v-for="item in getCustomerClassificationList"
            :key="item.id"
            :value="parseInt(item.id)"
            >{{ item.categoryname }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item name="customlevel" label="等级">
        <a-input
          v-model:value="getCustomerDetail.customlevel"
          placeholder="请填写客户等级"
        />
      </a-form-item>
      <a-form-item name="linkman" label="联系人">
        <a-input
          v-model:value="getCustomerDetail.linkman"
          placeholder="请填写联系人名称"
        />
      </a-form-item>
      <a-form-item name="linkmanphone" label="电话">
        <a-input
          v-model:value="getCustomerDetail.linkmanphone"
          placeholder="请填写联系人电话"
        />
      </a-form-item>
      <a-form-item name="remark" label="备注">
        <a-textarea
          v-model:value="getCustomerDetail.remark"
          placeholder="备注"
          auto-size
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { defineComponent, ref } from "vue";
  import CONSTANT_CUSTOMER_LIST from "../utils/constantCustomerList";
  import ACTION_TYPES from "../store/constantActionTypes";
  import CONSTANT_DATA from "../utils/constantData";

  export default defineComponent({
    data() {
      const formRef = ref();
      const modifyModalVisible = ref(false);

      return {
        formRef,
        modifyModalVisible,
        labelCol: { style: { width: "80px", textAlign: "right" } },
        wrapperCol: { span: 24 },
        rules: {
          customname: {
            required: true,
            message: "客户名称为必填项",
          },
          categoryid: {
            required: true,
            message: "客户列表为必选项",
          },
        },
        modalType: "",
        defaultPageSize: CONSTANT_CUSTOMER_LIST.TABLE_SHOW_SIZE,
        pageSizeOptions: CONSTANT_CUSTOMER_LIST.TABLE_SHOW_SIZE_ARRAY,
        columns: CONSTANT_CUSTOMER_LIST.TABLE_COLUMNS,
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
      getCustomerListTableDatas() {
        return this.$store.state.moduleCustomerList.tableData;
      },
      getCustomerClassificationList() {
        return this.$store.state.moduleCustomerList.customerClassificationList;
      },
      getCustomerDetail() {
        return this.$store.state.moduleCustomerList.customerDetail;
      },
    },
    methods: {
      handleQueryCustomerList(currentPage, showPageSize) {
        currentPage = currentPage
          ? currentPage
          : this.$store.state.moduleCustomerList.tableData.activePage;
        showPageSize = showPageSize
          ? showPageSize
          : CONSTANT_CUSTOMER_LIST.TABLE_SHOW_SIZE;

        this.$store.dispatch(ACTION_TYPES.CUSTOMER_LIST_QUERY, {
          actionFailure: this.actionFailure,
          currentPage,
          showPageSize,
        });
      },
      handleQueryCustomerClassificationList() {
        this.$store.dispatch(ACTION_TYPES.CUSTOMER_CLASSIFICATION_LIST);
      },
      handleQueryCustomerDetail(id) {
        this.$store.dispatch(ACTION_TYPES.CUSTOMER_DETAIL, { id });
      },
      actionFailure(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.ERROR,
          message: "客户列表" + this.modalType,
          description: description,
        });
      },
      actionSuccess(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.SUCCESS,
          message: "客户列表" + this.modalType,
          description: description,
        });
      },
      modifyModalSubmit() {
        let _this = this;
        this.$refs.formRef
          .validate()
          .then(res => {
            _this.$data.modifyModalVisible = false;
            res.id = _this.$store.state.moduleCustomerList.customerDetail.id;

            _this.$store.dispatch(ACTION_TYPES.CUSTOMER_MODIFY, {
              ...res,
              actionFailure: _this.actionFailure,
              actionSuccess: _this.actionSuccess,
              actionCallback: _this.handleQueryCustomerList,
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
          this.modalType = "编辑";

          // 查询客户详情
          this.handleQueryCustomerDetail(id);
        } else {
          this.$store.commit(ACTION_TYPES.CUSTOMER_DETAIL_CLEAR);
          this.modalType = "新增";
        }
      },
      modifyModalClose() {
        this.modifyModalVisible = false;
      },
      categoryOfMeasurementTableRowDelete(id) {
        let _this = this;
        this.$store.dispatch(ACTION_TYPES.CUSTOMER_DELETE, {
          id,
          actionFailure: _this.actionFailure,
          actionSuccess: _this.actionSuccess,
          actionCallback: _this.handleQueryCustomerList,
        });
      },
      handleCategoryIdSelect(id) {
        this.$store.commit(ACTION_TYPES.CUSTOMER_CATEGORY_ID_SELECT, { id });
      },
    },
    mounted() {
      // 客户列表列表初始化
      this.handleQueryCustomerList();

      // 初始化客户分类列表
      this.handleQueryCustomerClassificationList();
    },
  });
</script>

<style scoped>
  .demo-page-header :deep(tr:last-child td) {
    padding-bottom: 0;
  }
</style>
