<!-- 出入库表 组件 -->
<template>
  <div class="page_control_container">
    <div class="page_condition">
      <a-space>
        <a-select
          ref="select"
          style="width: 200px"
          placeholder="所属仓库"
          v-model:value="searchCondition.warehouseid"
        >
          <a-select-option
            v-for="item in getWareHouseList"
            :key="item.id"
            :value="item.id"
            >{{ item.warehousename }}</a-select-option
          >>
        </a-select>
        <a-input placeholder="产品/配件名称" />
        <a-select ref="select" style="width: 200px" placeholder="出/入库类别">
          <a-select-option
            v-for="item in stockType"
            :key="item.key"
            :value="item.key"
            >{{ item.label }}</a-select-option
          >
        </a-select>
      </a-space>
    </div>
    <div class="page_condition_controler">
      <a-button type="primary" @click="handleQueryStockInAndStockOutList"
        >查询</a-button
      >
    </div>
  </div>
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
          fixed: 'right',
        },
      ]"
      :data-source="getStockInAndStockOutListTableDatas.data"
      :scroll="{ x: 600, y: tableHeight }"
      :pagination="{
        showQuickJumper: true,
        defaultPageSize: defaultPageSize,
        pageSizeOptions: pageSizeOptions,
        total: getStockInAndStockOutListTableDatas.total,
        current: getStockInAndStockOutListTableDatas.activePage,
        onChange: handleQueryStockInAndStockOutList,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <a-space>
            <a-button
              type="primary"
              size="small"
              @click="modifyModalShow(record.id, record.goodsname)"
              >编辑</a-button
            >
            <a-popconfirm
              title="确定移除当前出入库嘛?"
              @confirm="inventoryAlarmSettingsTableRowDelete(record.id)"
            >
              <a-button danger size="small">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>

  <!-- 新增 & 编辑 出入库 -->
  <a-modal
    v-model:visible="modifyModalVisible"
    :title="'出入库列表 ' + modalType"
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
      :model="getStockInAndStockOutListDetail"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item name="sparepartname" label="出入库名称">
        <a-input
          v-model:value="getStockInAndStockOutListDetail.sparepartname"
          placeholder="请填写出入库名称"
        />
      </a-form-item>
      <a-form-item name="sparepartmodel" label="出入库型号">
        <a-input
          v-model:value="getStockInAndStockOutListDetail.sparepartmodel"
          placeholder="请填写出入库型号"
        />
      </a-form-item>
      <a-form-item name="spareparttypeid" label="出入库类型">
        <a-select
          ref="select"
          v-model:value="getStockInAndStockOutListDetail.spareparttypeid"
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
          v-model:value="getStockInAndStockOutListDetail.supplierid"
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
        <a-select
          ref="select"
          v-model:value="getStockInAndStockOutListDetail.unitid"
        >
          <a-select-option
            v-for="item in getUnitOfMeasurementList"
            :key="item.id"
            :value="item.id"
            >{{ item.unitname }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item name="specialflag" label="出入库标识">
        <a-select
          ref="select"
          v-model:value="getStockInAndStockOutListDetail.specialflag"
          placeholder="请选择出入库标识"
        >
          <a-select-option
            v-for="item in sparepartFlag"
            :key="item.key"
            :value="item.key"
            >{{ item.label }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item name="sparepartpriceamount" label="出入库单价">
        <a-input
          v-model:value="getStockInAndStockOutListDetail.sparepartpriceamount"
          placeholder="请填写出入库单价"
        />
      </a-form-item>
      <a-form-item name="remark" label="备注">
        <a-input
          v-model:value="getStockInAndStockOutListDetail.remark"
          placeholder="请填写备注"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { defineComponent, ref } from "vue";
  import CONSTANT_STOCK_IN_AND_STOCK_OUT from "../utils/constantStockInAndStockOut";
  import ACTION_TYPES from "../store/constantActionTypes";
  import CONSTANT_DATA from "../utils/constantData";
  import { isNumber } from "../utils/common";

  export default defineComponent({
    data() {
      const formRef = ref();
      const modifyModalVisible = ref(false);

      return {
        formRef,
        modifyModalVisible,
        columns: CONSTANT_STOCK_IN_AND_STOCK_OUT.TABLE_COLUMNS,
        labelCol: { style: { width: "120px", textAlign: "left" } },
        wrapperCol: { span: 24 },
        rules: {
          sparepartname: {
            required: true,
            message: "出入库名称为必填项",
          },
          sparepartmodel: {
            required: true,
            message: "出入库型号为必填项",
          },
          spareparttypeid: {
            required: true,
            message: "出入库类型为必选项",
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
            message: "出入库标识为必选项",
          },
          sparepartpriceamount: {
            required: true,
            message: "出入库单价为必填项",
          },
        },
        modalType: "",
        defaultPageSize: CONSTANT_STOCK_IN_AND_STOCK_OUT.TABLE_SHOW_SIZE,
        pageSizeOptions: CONSTANT_STOCK_IN_AND_STOCK_OUT.TABLE_SHOW_SIZE_ARRAY,
        warnTypeList: CONSTANT_DATA.WARN_TYPE,
        sparepart: CONSTANT_DATA.SPAREPART_FLAG,
        sparepartFlag: CONSTANT_DATA.SPAREPART_FLAG,
        stockType: CONSTANT_DATA.STOCK_TYPE,
        searchCondition: {
          warehouseid: "",
          goodsid: "",
          stocktype: "",
        },
      };
    },
    computed: {
      tableHeight() {
        return (
          this.$store.state.moduleLogin.LoginFormDimensions.pageContentHeight -
          14 -
          12 -
          55 -
          40
        );
      },
      getStockInAndStockOutListTableDatas() {
        return this.$store.state.moduleStockInAndStockOut.tableData;
      },
      getStockInAndStockOutListDetail() {
        return this.$store.state.moduleStockInAndStockOut
          .stockInAndStockOutListDetail;
      },
      getProductClassificationList() {
        return this.$store.state.moduleStockInAndStockOut
          .productClassificationList;
      },
      getUnitOfMeasurementList() {
        return this.$store.state.moduleStockInAndStockOut.unitOfMeasurementList;
      },
      getAccessoryList() {
        return this.$store.state.moduleStockInAndStockOut.accessoryList;
      },
      getSupplyChannelList() {
        return this.$store.state.moduleStockInAndStockOut.supplyChannelList;
      },
      getWareHouseList() {
        return this.$store.state.moduleStockInAndStockOut.warehouseList;
      },
    },
    methods: {
      modifyModalSubmit() {
        let _this = this;
        this.$refs.formRef
          .validate()
          .then(res => {
            _this.$data.modifyModalVisible = false;

            _this.$store.dispatch(ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_MODIFY, {
              ...res,
              actionFailure: _this.actionFailure,
              actionSuccess: _this.actionSuccess,
              actionCallback: _this.handleQueryStockInAndStockOutList,
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
      handleQueryStockInAndStockOutList(currentPage, showPageSize) {
        currentPage =
          currentPage && isNumber(currentPage)
            ? currentPage
            : this.$store.state.moduleStockInAndStockOut.tableData.activePage;
        showPageSize =
          showPageSize && isNumber(showPageSize)
            ? showPageSize
            : CONSTANT_STOCK_IN_AND_STOCK_OUT.TABLE_SHOW_SIZE;

        let warehouseid = this.$data.searchCondition.warehouseid,
          goodsid = this.$data.searchCondition.goodsid,
          stocktype = this.$data.searchCondition.stocktype;

        this.$store.dispatch(ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_LIST, {
          actionFailure: this.actionFailure,
          currentPage,
          showPageSize,
          warehouseid,
          goodsid,
          stocktype,
        });
      },
      actionFailure(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.ERROR,
          message: "出入库" + this.modalType,
          description: description,
        });
      },
      actionSuccess(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.SUCCESS,
          message: "出入库" + this.modalType,
          description: description,
        });
      },
      modifyModalShow(id, name) {
        let _this = this;
        this.modifyModalVisible = true;

        if (name && name.length > 0) {
          this.modalType = "编辑";

          // 查询出入库详情
          this.handleQueryStockInAndStockOutListDetail(id);
        } else {
          this.$store.commit(ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_DETAIL_CLEAR);
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
        this.$store.dispatch(ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_DELETE, {
          id,
          actionFailure: _this.actionFailure,
          actionSuccess: _this.actionSuccess,
          actionCallback: _this.handleQueryStockInAndStockOutList,
        });
      },
      handleQueryStockInAndStockOutListDetail(id) {
        this.$store.dispatch(ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_DETAIL, id);
      },
      handleQueryProductClassificationList() {
        // this.$store.dispatch(
        //   ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_PAGE_STOCK_IN_AND_STOCK_OUT_CLASSIFICATION_LIST
        // );
      },
      handleQueryUnitOfMeasurementList() {
        this.$store.dispatch(
          ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_PAGE_UNIT_OF_MEASUREMENT_LIST
        );
      },
      handleQuerySupplyChannelList() {
        // this.$store.dispatch(
        //   ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_PAGE_SUPPLY_CHANNEL_LIST
        // );
      },
      handleAccessoryListOnSelect(accessoryId, bomsListId) {
        console.log(accessoryId, bomsListId);
        // this.$store.commit(
        //   ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_PAGE_STOCK_IN_AND_STOCK_OUT_UNIT_MATCHED,
        //   {
        //     accessoryId,
        //     bomsListId,
        //   }
        // );
      },
      handleAddDevice(deviceTypeId, unit) {
        // this.$store.commit(
        //   ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_DETAIL_DEVICE_BOMLIST_ADD,
        //   {
        //     deviceTypeId,
        //     unit,
        //   }
        // );
        console.log(deviceTypeId, unit);
      },
      handleRemoveDevice(bomItem) {
        console.log(bomItem);
        // this.$store.commit(
        //   ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_DETAIL_DEVICE_BOMLIST_REMOVE,
        //   bomItem.id
        // );
      },
      handleQueryWarehouseList() {
        this.$store.dispatch(
          ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_WAREHOUSE_LIST
        );
      },
      handleQueryProductList() {
        this.$store.dispatch(ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_PRODUCT_LIST);
      },
      handleQueryAccessoryList() {
        this.$store.dispatch(
          ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_ACCESSORY_LIST
        );
      },
    },
    mounted() {
      // 出入库列表查询初始化
      this.handleQueryStockInAndStockOutList();

      // 仓库列表
      this.handleQueryWarehouseList();

      // 计量单位列表初始化
      this.handleQueryUnitOfMeasurementList();

      // 产品列表
      this.handleQueryProductList();

      // 配件列表
      this.handleQueryAccessoryList();

      // // 出入库分类列表初始化
      // this.handleQueryProductClassificationList();

      // // 供应商列表初始化
      // this.handleQuerySupplyChannelList();
    },
  });
</script>

<style scoped>
  .demo-page-header :deep(tr:last-child td) {
    padding-bottom: 0;
  }
</style>
