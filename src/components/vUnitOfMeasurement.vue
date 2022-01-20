<!-- 计量单位 组件 -->
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
      :data-source="getUnitOfMeasurementTableDatas.data"
      :scroll="{ x: 600, y: tableHeight }"
      :pagination="{
        showQuickJumper: true,
        defaultPageSize: defaultPageSize,
        pageSizeOptions: pageSizeOptions,
        total: getUnitOfMeasurementTableDatas.total,
        current: getUnitOfMeasurementTableDatas.activePage,
        onChange: handleQueryUnitOfMeasurementList,
        onShowSizeChange: handleQueryUnitOfMeasurementList,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <a-space>
            <a-button
              type="primary"
              size="small"
              @click="modifyModalShow(record.id, record.unitname)"
              >编辑</a-button
            >
            <a-popconfirm
              title="确定移除当前计量单位嘛?"
              @confirm="unitOfMeasurementTableRowDelete(record.id)"
            >
              <a-button danger size="small">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>

  <!-- 新增 & 编辑 计量单位 -->
  <a-modal
    v-model:visible="modifyModalVisible"
    :title="'计量单位 ' + modalType"
    width="600px"
    @ok="addModalSubmit"
  >
    <template #footer>
      <a-button key="back" @click="modifyModalClose">关闭</a-button>
      <a-button key="submit" type="primary" @click="addModalSubmit"
        >提交</a-button
      >
    </template>
    <a-form
      ref="formRef"
      :rules="rules"
      :model="unitFormState"
      layout="horizontal"
      name="form_in_modal"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item name="unitName" label="计量单位名称">
        <a-input
          v-model:value="unitFormState.unitName"
          placeholder="请填写计量单位名称"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { defineComponent, reactive, ref } from "vue";
  import CONSTANT_UNIT_OF_MEASUREMENT from "../utils/constantUnitOfMeasurement";
  import ACTION_TYPES from "../store/constantActionTypes";
  import CONSTANT_DATA from "../utils/contantData";

  export default defineComponent({
    data() {
      const formRef = ref();
      const unitFormState = reactive({
        unitId: 0,
        unitName: "",
      });
      const modifyModalVisible = ref(false);

      return {
        formRef,
        unitFormState,
        modifyModalVisible,
        contractId: "",
        columns: CONSTANT_UNIT_OF_MEASUREMENT.TABLE_COLUMNS,
        labelCol: { style: { width: "120px", textAlign: "left" } },
        wrapperCol: { span: 24 },
        rules: {
          unitName: {
            required: true,
            message: "计量单位为必填项",
          },
        },
        modalType: "",
        defaultPageSize: CONSTANT_UNIT_OF_MEASUREMENT.TABLE_SHOW_SIZE,
        pageSizeOptions: CONSTANT_UNIT_OF_MEASUREMENT.TABLE_SHOW_SIZE_ARRAY,
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
      getUnitOfMeasurementTableDatas() {
        return this.$store.state.moduleUnitOfMeasurement.tableData;
      },
    },
    methods: {
      addModalSubmit() {
        let _this = this;
        this.$refs.formRef
          .validate()
          .then(res => {
            _this.$data.modifyModalVisible = false;
            res.unitId = _this.unitFormState.unitId;

            _this.$store.dispatch(ACTION_TYPES.UNIT_OF_MEASUREMENT_MODIFY, {
              ...res,
              actionFailure: _this.actionFailure,
              actionSuccess: _this.actionSuccess,
              actionCallback: _this.handleQueryUnitOfMeasurementList,
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
      handleQueryUnitOfMeasurementList(currentPage, showPageSize) {
        this.$store.dispatch(ACTION_TYPES.UNIT_OF_MEASUREMENT_LIST_QUERY, {
          actionFailure: this.actionFailure,
          currentPage,
          showPageSize,
        });
      },
      actionFailure(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.ERROR,
          message: "计量单位" + this.modalType,
          description: description,
        });
      },
      actionSuccess(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.SUCCESS,
          message: "计量单位" + this.modalType,
          description: description,
        });
      },
      modifyModalShow(id, name) {
        this.modifyModalVisible = true;

        if (name && name.length > 0) {
          this.unitFormState.unitId = id;
          this.unitFormState.unitName = name;
          this.modalType = "编辑";
        } else {
          this.unitFormState.unitId = 0;
          this.unitFormState.unitName = "";
          this.modalType = "新增";
        }
      },
      modifyModalClose() {
        this.modifyModalVisible = false;
      },
      unitOfMeasurementTableRowDelete(id) {
        let _this = this;
        this.$store.dispatch(ACTION_TYPES.UNIT_OF_MEASUREMENT_DELETE, {
          id,
          actionFailure: _this.actionFailure,
          actionSuccess: _this.actionSuccess,
          actionCallback: _this.handleQueryUnitOfMeasurementList,
        });
      },
    },
    mounted() {
      // 销售合同列表初始化
      this.handleQueryUnitOfMeasurementList();
    },
  });
</script>

<style scoped>
  .demo-page-header :deep(tr:last-child td) {
    padding-bottom: 0;
  }
</style>

<style>
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  .edit_modal_filelist {
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    padding: 0 6px 10px;
  }
</style>
