<!-- 配件列表 组件 -->
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
      :data-source="getAccessoriesListTableDatas.data"
      :scroll="{ x: 600, y: tableHeight }"
      :pagination="{
        showQuickJumper: true,
        defaultPageSize: defaultPageSize,
        pageSizeOptions: pageSizeOptions,
        total: getAccessoriesListTableDatas.total,
        current: getAccessoriesListTableDatas.activePage,
        onChange: handleQueryAccessoriesListList,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <a-space>
            <a-button
              type="primary"
              size="small"
              @click="modifyModalShow(record.id, record.sparepartname)"
              >编辑</a-button
            >
            <a-popconfirm
              title="确定移除当前配件嘛?"
              @confirm="inventoryAlarmSettingsTableRowDelete(record.id)"
            >
              <a-button danger size="small">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>

  <!-- 新增 & 编辑 配件 -->
  <a-modal
    v-model:visible="modifyModalVisible"
    :title="'配件列表 ' + modalType"
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
      :model="getAccessoriesListDetail"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item name="sparepartname" label="配件名称">
        <a-input
          v-model:value="getAccessoriesListDetail.sparepartname"
          placeholder="请填写配件名称"
        />
      </a-form-item>
      <a-form-item name="sparepartmodel" label="配件型号">
        <a-input
          v-model:value="getAccessoriesListDetail.sparepartmodel"
          placeholder="请填写配件型号"
        />
      </a-form-item>
      <a-form-item name="spareparttypeid" label="配件类型">
        <a-select
          ref="select"
          v-model:value="getAccessoriesListDetail.spareparttypeid"
        >
          <a-select-option
            v-for="item in getProductClassificationList"
            :key="item.id"
            :value="item.id"
            >{{ item.typename }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item name="supplierid" label="供应商">
        <a-select
          ref="select"
          v-model:value="getAccessoriesListDetail.supplierid"
          placeholder="请选择供应商"
        >
          <a-select-option
            v-for="item in getSupplyChannelList"
            :key="item.supplierid"
            :value="item.supplierid"
            >{{ item.suppliername }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item name="unitid" label="单位">
        <a-select ref="select" v-model:value="getAccessoriesListDetail.unitid">
          <a-select-option
            v-for="item in getUnitOfMeasurementList"
            :key="item.id"
            :value="item.id"
            >{{ item.unitname }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item name="specialflag" label="配件标识">
        <a-select
          ref="select"
          v-model:value="getAccessoriesListDetail.specialflag"
          placeholder="请选择配件标识"
        >
          <a-select-option
            v-for="item in sparepartFlag"
            :key="item.key"
            :value="item.key"
            >{{ item.label }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item name="sparepartpriceamount" label="配件单价">
        <a-input
          v-model:value="getAccessoriesListDetail.sparepartpriceamount"
          placeholder="请填写配件单价"
        />
      </a-form-item>
      <a-form-item name="remark" label="备注">
        <a-input
          v-model:value="getAccessoriesListDetail.remark"
          placeholder="请填写备注"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { defineComponent, ref } from "vue";
  import CONSTANT_ACCESSORIES from "../utils/constantAccessoriesList";
  import ACTION_TYPES from "../store/constantActionTypes";
  import CONSTANT_DATA from "../utils/constantData";

  export default defineComponent({
    data() {
      const formRef = ref();
      const modifyModalVisible = ref(false);

      return {
        formRef,
        modifyModalVisible,
        columns: CONSTANT_ACCESSORIES.TABLE_COLUMNS,
        labelCol: { style: { width: "120px", textAlign: "left" } },
        wrapperCol: { span: 24 },
        rules: {
          sparepartname: {
            required: true,
            message: "配件名称为必填项",
          },
          sparepartmodel: {
            required: true,
            message: "配件型号为必填项",
          },
          spareparttypeid: {
            required: true,
            message: "配件类型为必选项",
          },
          supplierid: {
            required: true,
            message: "供应商为必选项",
          },
          unitid: {
            required: true,
            message: "单位为必选项",
          },
          specialflag: {
            required: true,
            message: "配件标识为必选项",
          },
          sparepartpriceamount: {
            required: true,
            message: "配件单价为必填项",
          },
        },
        modalType: "",
        defaultPageSize: CONSTANT_ACCESSORIES.TABLE_SHOW_SIZE,
        pageSizeOptions: CONSTANT_ACCESSORIES.TABLE_SHOW_SIZE_ARRAY,
        warnTypeList: CONSTANT_DATA.WARN_TYPE,
        sparepart: CONSTANT_DATA.SPAREPART_FLAG,
        sparepartFlag: CONSTANT_DATA.SPAREPART_FLAG,
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
      getAccessoriesListTableDatas() {
        return this.$store.state.moduleAccessoriesList.tableData;
      },
      getAccessoriesListDetail() {
        return this.$store.state.moduleAccessoriesList.accessoriesListDetail;
      },
      getProductClassificationList() {
        return this.$store.state.moduleAccessoriesList
          .productClassificationList;
      },
      getUnitOfMeasurementList() {
        return this.$store.state.moduleAccessoriesList.unitOfMeasurementList;
      },
      getAccessoryList() {
        return this.$store.state.moduleAccessoriesList.accessoryList;
      },
      getSupplyChannelList() {
        return this.$store.state.moduleAccessoriesList.supplyChannelList;
      },
    },
    methods: {
      modifyModalSubmit() {
        let _this = this;
        this.$refs.formRef
          .validate()
          .then(res => {
            _this.$data.modifyModalVisible = false;

            _this.$store.dispatch(ACTION_TYPES.ACCESSORY_MODIFY, {
              ...res,
              actionFailure: _this.actionFailure,
              actionSuccess: _this.actionSuccess,
              actionCallback: _this.handleQueryAccessoriesListList,
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
      handleQueryAccessoriesListList(currentPage, showPageSize) {
        currentPage = currentPage
          ? currentPage
          : this.$store.state.moduleAccessoriesList.tableData.activePage;
        showPageSize = showPageSize
          ? showPageSize
          : CONSTANT_ACCESSORIES.TABLE_SHOW_SIZE;

        this.$store.dispatch(ACTION_TYPES.ACCESSORY_LIST_QUERY, {
          actionFailure: this.actionFailure,
          currentPage,
          showPageSize,
        });
      },
      actionFailure(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.ERROR,
          message: "配件" + this.modalType,
          description: description,
        });
      },
      actionSuccess(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.SUCCESS,
          message: "配件" + this.modalType,
          description: description,
        });
      },
      modifyModalShow(id, name) {
        let _this = this;
        this.modifyModalVisible = true;

        if (name && name.length > 0) {
          this.modalType = "编辑";

          // 查询配件详情
          this.handleQueryAccessoriesListDetail(id);
        } else {
          this.$store.commit(ACTION_TYPES.ACCESSORY_DETAIL_CLEAR);
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
        this.$store.dispatch(ACTION_TYPES.ACCESSORY_DELETE, {
          id,
          actionFailure: _this.actionFailure,
          actionSuccess: _this.actionSuccess,
          actionCallback: _this.handleQueryAccessoriesListList,
        });
      },
      handleQueryAccessoriesListDetail(id) {
        this.$store.dispatch(ACTION_TYPES.ACCESSORY_DETAIL, id);
      },
      handleQueryProductClassificationList() {
        this.$store.dispatch(
          ACTION_TYPES.ACCESSORY_PAGE_ACCESSORY_CLASSIFICATION_LIST
        );
      },
      handleQueryUnitOfMeasurementList() {
        this.$store.dispatch(
          ACTION_TYPES.ACCESSORY_PAGE_UNIT_OF_MEASUREMENT_LIST
        );
      },
      handleQuerySupplyChannelList() {
        this.$store.dispatch(ACTION_TYPES.ACCESSORY_PAGE_SUPPLY_CHANNEL_LIST);
      },
      handleAccessoryListOnSelect(accessoryId, bomsListId) {
        this.$store.commit(ACTION_TYPES.ACCESSORY_PAGE_ACCESSORY_UNIT_MATCHED, {
          accessoryId,
          bomsListId,
        });
      },
      handleAddDevice(deviceTypeId, unit) {
        this.$store.commit(ACTION_TYPES.ACCESSORY_DETAIL_DEVICE_BOMLIST_ADD, {
          deviceTypeId,
          unit,
        });
      },
      handleRemoveDevice(bomItem) {
        this.$store.commit(
          ACTION_TYPES.ACCESSORY_DETAIL_DEVICE_BOMLIST_REMOVE,
          bomItem.id
        );
      },
    },
    mounted() {
      // 配件列表查询初始化
      this.handleQueryAccessoriesListList();

      // 配件分类列表初始化
      this.handleQueryProductClassificationList();

      // 计量单位列表初始化
      this.handleQueryUnitOfMeasurementList();

      // 供应商列表初始化
      this.handleQuerySupplyChannelList();
    },
  });
</script>

<style scoped>
  .demo-page-header :deep(tr:last-child td) {
    padding-bottom: 0;
  }
</style>
