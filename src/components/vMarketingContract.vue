<!-- 销售合同组件 -->
<template>
  <div class="page_result">
    <div class="result_extra_control">
      <a-space>
        <a-button type="primary" size="small" @click="modifyModalShow"
          >添加</a-button
        >
        <a-button
          type="primary"
          size="small"
          @click="marketingContractInvoiceApply"
          :disabled="selectedRowKeys.length === 0"
          >开票申请</a-button
        >
      </a-space>
    </div>
    <a-table
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: marketingContractTableRowOnChange,
      }"
      :rowKey="record => record.id"
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
      :data-source="getMarketingContractListTableDatas.data"
      :scroll="{ x: 2000, y: tableHeight }"
      :pagination="{
        showQuickJumper: true,
        defaultPageSize: defaultPageSize,
        pageSizeOptions: pageSizeOptions,
        total: getMarketingContractListTableDatas.total,
        current: getMarketingContractListTableDatas.activePage,
        onChange: handleQueryMarketingContractList,
      }"
    >
      <template #bodyCell="{ text, column, record }">
        <template v-if="column.key === 'remark'">
          <template v-if="text.length > 20">
            <a-tooltip color="blue">
              <template #title>{{ text }}</template>
              {{ text.slice(0, 20) + "..." }}
            </a-tooltip>
          </template>
        </template>
        <template v-if="column.key === 'operation'">
          <a-space>
            <a-button
              type="primary"
              size="small"
              @click="modifyModalShow(record.id, record.projectname)"
              >查看</a-button
            >
            <a-popconfirm
              title="确定移除当前销售合同嘛?"
              @confirm="marketingContractTableRowDelete(record.id)"
            >
              <a-button danger size="small">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>

  <!--  销售合同 新增 && 编辑 -->
  <a-modal
    v-model:visible="modifyModalVisible"
    :title="'销售合同 ' + modalType"
    width="1000px"
    @ok="modifyModalSubmit"
  >
    <template #footer>
      <a-button key="back" @click="modifyModalClose">返回</a-button>
      <a-button key="submit" type="primary" @click="modifyModalSubmit"
        >提交</a-button
      >
    </template>
    <a-form
      ref="formRef"
      name="marketingContractModifyModal"
      :model="getMarketingContractDetail"
      layout="horizontal"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-row :gutter="[24, 8]">
        <a-col :span="12">
          <a-form-item name="projectcode" label="工地编号">
            <a-input v-model:value="getMarketingContractDetail.projectcode" />
          </a-form-item>
          <a-form-item name="projectname" label="工地项目名称">
            <a-input v-model:value="getMarketingContractDetail.projectname" />
          </a-form-item>
          <a-form-item name="projectlinkman" label="联系人">
            <a-input
              v-model:value="getMarketingContractDetail.projectlinkman"
            />
          </a-form-item>
          <a-form-item name="contractstatus" label="合同状态">
            <a-select
              ref="select"
              v-model:value="getMarketingContractDetail.contractstatus"
            >
              <a-select-option
                v-for="item in marketingContractStatusList"
                :key="item.key"
                :value="item.key"
                >{{ item.label }}</a-select-option
              >
            </a-select>
          </a-form-item>
          <a-form-item name="returnstatus" label="回访状态">
            <a-select
              ref="select"
              v-model:value="getMarketingContractDetail.returnstatus"
            >
              <a-select-option
                v-for="item in marketingContractReturnStatusList"
                :key="item.key"
                :value="item.key"
                >{{ item.label }}</a-select-option
              >
            </a-select>
          </a-form-item>
          <a-form-item name="customcategoryid" label="客户分类">
            <a-select
              ref="select"
              v-model:value="getMarketingContractDetail.customcategoryid"
            >
              <a-select-option
                v-for="item in getCustomerClassficationList"
                :key="item.id"
                :value="item.id"
                >{{ item.categoryname }}</a-select-option
              >
            </a-select>
          </a-form-item>
          <a-form-item name="settlementdate" label="代理商结算日期">
            <a-date-picker
              v-model:value="getMarketingContractDetail.settlementdate"
              style="width: 100%"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="contractparty" label="合同签定方">
            <a-input v-model:value="getMarketingContractDetail.contractparty" />
          </a-form-item>
          <a-form-item name="projectaddress" label="地址">
            <a-input
              v-model:value="getMarketingContractDetail.projectaddress"
            />
          </a-form-item>
          <a-form-item name="contractdate" label="签订日期">
            <a-date-picker
              v-model:value="getMarketingContractDetail.contractdate"
              style="width: 100%"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </a-form-item>
          <a-form-item name="billingstatus" label="开票状态">
            <a-select
              ref="select"
              v-model:value="getMarketingContractDetail.billingstatus"
            >
              <a-select-option
                v-for="item in invoiceStatusList"
                :key="item.key"
                :value="item.key"
                >{{ item.label }}</a-select-option
              >
            </a-select>
          </a-form-item>
          <a-form-item name="contractamount" label="合同金额">
            <a-input
              v-model:value="getMarketingContractDetail.contractamount"
            />
          </a-form-item>
          <a-form-item name="settlementamount" label="代理商结算金额">
            <a-input
              v-model:value="getMarketingContractDetail.settlementamount"
            />
          </a-form-item>
          <a-form-item name="remark" label="备注">
            <a-textarea
              v-model:value="getMarketingContractDetail.remark"
              placeholder="填写备注"
              auto-size
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-divider orientation="left">设备列表</a-divider>
          <a-row
            type="flex"
            style="
              margin-bottom: 8px;
              text-align: center;
              background: #fafafa;
              border-bottom: 1px solid #f0f0f0;
              height: 50px;
              align-items: center;
            "
          >
            <a-col :span="4" :order="1">产品类别</a-col>
            <a-col :span="6" :order="2">设备类别</a-col>
            <a-col :span="6" :order="3">设备数量</a-col>
            <a-col :span="3" :order="4">设备等级</a-col>
            <a-col :span="3" :order="5">租买方式</a-col>
            <a-col :span="2" :order="6">操作</a-col>
          </a-row>
          <a-row
            type="flex"
            v-for="(
              deviceItem, index
            ) in getMarketingContractDetail.salesdevices"
            :key="deviceItem.id"
            style="text-align: center"
          >
            <a-col :span="4" :order="1">
              <a-form-item
                :name="['salesdevices', index, 'devicetypeid']"
                :rules="{
                  required: true,
                  message: '请选择产品分类',
                }"
              >
                <a-select
                  ref="select"
                  v-model:value="deviceItem.devicetypeid"
                  placeholder="请选择产品品类"
                  style="width: 120px"
                  @change="marketingContractDeviceTypeOnSelect"
                >
                  <a-select-option
                    v-for="productTypeItem in getProductTypeList"
                    :key="productTypeItem.id"
                    :value="parseInt(productTypeItem.id)"
                    >{{ productTypeItem.typename }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6" :order="2">
              <a-form-item
                :name="['salesdevices', index, 'deviceid']"
                :rules="{
                  required: true,
                  message: '请选择设备类别',
                }"
              >
                <a-select
                  ref="select"
                  v-model:value="deviceItem.deviceid"
                  placeholder="请选择设备类别"
                  style="width: 180px"
                >
                  <a-select-option
                    v-for="deviceTypeItem in getDeviceTypeList[
                      deviceItem.devicetypeid
                    ]"
                    :key="deviceTypeItem.deviceid"
                    :value="deviceTypeItem.deviceid"
                    >{{ deviceTypeItem.devicename }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6" :order="3">
              <a-form-item
                :name="['salesdevices', index, 'devicecount']"
                :rules="{
                  required: true,
                  message: '请填写设备数量',
                }"
              >
                <a-input
                  v-model:value="deviceItem.devicecount"
                  style="width: 180px"
                  placeholder="请填写设备数量"
              /></a-form-item>
            </a-col>
            <a-col :span="3" :order="4">
              <a-form-item
                :name="['salesdevices', index, 'devicelevel']"
                :rules="{
                  required: true,
                  message: '请选择设备等级',
                }"
              >
                <a-select
                  ref="select"
                  v-model:value="deviceItem.devicelevel"
                  placeholder="请选择设备等级"
                  style="width: 80px"
                >
                  <a-select-option
                    v-for="deviceLevelItem in getDeviceLevel"
                    :key="deviceLevelItem.value"
                    :value="deviceLevelItem.value"
                    >{{ deviceLevelItem.text }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="3" :order="5">
              <a-form-item
                :name="['salesdevices', index, 'salestype']"
                :rules="{
                  required: true,
                  message: '请选择租买方式',
                }"
              >
                <a-select
                  ref="select"
                  v-model:value="deviceItem.salestype"
                  placeholder="请选择租买方式"
                  style="width: 80px"
                >
                  <a-select-option
                    v-for="devicesSales in devicesSalesType"
                    :key="devicesSales.key"
                    :value="devicesSales.key"
                    >{{ devicesSales.label }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="2" :order="6" style="padding-top: 6px">
              <MinusCircleOutlined @click="handleRemoveDevice(deviceItem)" />
            </a-col>
          </a-row>
          <a-form-item>
            <a-button
              type="dashed"
              block
              @click="handleAddDevice(getProductTypeList[0].id)"
            >
              <PlusOutlined />
              添加设备
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
  import { defineComponent, ref } from "vue";
  import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
  import CONSTANT_MARKETING_CONTRACT from "../utils/constantMarketingContract";
  import ACTION_TYPES from "../store/constantActionTypes";
  import CONSTANT_DATA from "../utils/constantData";

  export default defineComponent({
    components: {
      MinusCircleOutlined,
      PlusOutlined,
    },
    data() {
      const formRef = ref();
      const modifyModalVisible = ref(false);
      const selectedRowKeys = ref([]);

      return {
        formRef,
        modifyModalVisible,
        labelCol: { style: { width: "180px", textAlign: "right" } },
        wrapperCol: { span: 24 },
        rules: {
          projectcode: {
            required: true,
            message: "工地编号为必填项",
          },
          projectname: {
            required: true,
            message: "工地项目名称为必填项",
          },
          projectlinkman: {
            required: true,
            message: "联系人为必填项",
          },
          contractstatus: {
            required: true,
            message: "合同状态为必选项",
          },
          projectaddress: {
            required: true,
            message: "地址为必填项",
          },
          devicecount: {
            required: true,
            message: "数量为必填项",
          },
          contractparty: {
            required: true,
            message: "合同签定方为必填项",
          },
          contractdate: {
            required: true,
            message: "合同签订日期为必填项",
          },
          contractamount: {
            required: true,
            message: "合同金额为必填项",
          },
          billingstatus: {
            required: true,
            message: "合同状态为必选项",
          },
          returnstatus: {
            required: true,
            message: "合同回访状态为必选项",
          },
        },
        modalType: "",
        defaultPageSize: CONSTANT_MARKETING_CONTRACT.TABLE_SHOW_SIZE,
        pageSizeOptions: CONSTANT_MARKETING_CONTRACT.TABLE_SHOW_SIZE_ARRAY,
        columns: CONSTANT_MARKETING_CONTRACT.TABLE_COLUMNS,
        marketingContractStatusList: CONSTANT_DATA.MARKETING_CONTRACT_STATUS,
        marketingContractReturnStatusList:
          CONSTANT_DATA.MARKETING_CONTRACT_RETURN_STATUS,
        invoiceStatusList: CONSTANT_DATA.INVOICE_STATUS,
        devicesSalesType: CONSTANT_DATA.DEVICES_SALES_TYPE,
        selectedRowKeys,
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
      getMarketingContractListTableDatas() {
        return this.$store.state.moduleMarketingContract.tableData;
      },
      getMarketingContractDetail() {
        return this.$store.state.moduleMarketingContract
          .marketingContractDetail;
      },
      getCustomerClassficationList() {
        return this.$store.state.moduleMarketingContract.customerClassification;
      },
      getDeviceLevel() {
        return this.$store.state.moduleGlobal.deviceLevelList;
      },
      getProductTypeList() {
        return this.$store.state.moduleGlobal.productTypeList;
      },
      getDeviceTypeList() {
        return this.$store.state.moduleMarketingContract
          .deviceTypeListWithProductType;
      },
    },
    methods: {
      handleQueryMarketingContractList(currentPage, showPageSize) {
        currentPage = currentPage
          ? currentPage
          : this.$store.state.moduleMarketingContract.tableData.activePage;
        showPageSize = showPageSize
          ? showPageSize
          : CONSTANT_MARKETING_CONTRACT.TABLE_SHOW_SIZE;

        this.$store.dispatch(ACTION_TYPES.MARKETING_CONTRACT_LIST_QUERY, {
          actionFailure: this.actionFailure,
          currentPage,
          showPageSize,
        });
      },
      actionFailure(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.ERROR,
          message: "销售合同" + this.modalType,
          description: description,
        });
      },
      actionSuccess(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.SUCCESS,
          message: "销售合同" + this.modalType,
          description: description,
        });
      },
      modifyModalSubmit() {
        let _this = this;
        this.$refs.formRef
          .validate()
          .then(res => {
            _this.$data.modifyModalVisible = false;
            res.id =
              _this.$store.state.moduleMarketingContract.marketingContractDetail.id;

            _this.$store.dispatch(ACTION_TYPES.MARKETING_CONTRACT_MODIFY, {
              ...res,
              actionFailure: _this.actionFailure,
              actionSuccess: _this.actionSuccess,
              actionCallback: _this.handleQueryMarketingContractList,
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
        let _this = this;
        this.$data.modifyModalVisible = true;

        if (name && name.length > 0) {
          this.$data.modalType = "编辑";

          // 查询合同详情
          this.handleQueryMarketingContractDetail(id);
        } else {
          this.$store.commit(ACTION_TYPES.MARKETING_CONTRACT_DETAIL_CLEAR);
          this.$data.modalType = "新增";
          setTimeout(() => {
            _this.$refs.formRef.resetFields();
          });
        }
      },
      modifyModalClose() {
        this.modifyModalVisible = false;
      },
      handleQueryCustomerClassificationList() {
        this.$store.dispatch(
          ACTION_TYPES.MARKETING_CONTRACT_CUSTOMER_CLASSIFICATION_LIST
        );
      },
      handleQueryDeviceLevelList() {
        this.$store.dispatch(ACTION_TYPES.GLOBAL_DICTS_BY_TYPE_ID, {
          typeid: CONSTANT_DATA.DICT_TYPE_ID_LIST.DEVICE_LEVEL.key,
        });
      },
      handleQueryProductTypeList() {
        let _this = this;
        this.$store.dispatch(ACTION_TYPES.GLOBAL_PRODUCT_TYPE_LIST, {
          actionCallback: this.handleQueryDeviceTypeList,
          actionFailure: _this.actionFailure,
          actionSuccess: _this.actionSuccess,
        });
      },
      handleQueryDeviceTypeList(typeid) {
        let _this = this;
        this.$store.dispatch(ACTION_TYPES.MARKETING_CONTRACT_DEVICE_TYPE_LIST, {
          typeid,
          actionFailure: _this.actionFailure,
          actionSuccess: _this.actionSuccess,
        });
      },
      handleAddDevice(deviceTypeId) {
        this.$store.commit(
          ACTION_TYPES.MARKETING_CONTRACT_DETAIL_SALESDEVICES_ADD,
          deviceTypeId
        );
      },
      handleRemoveDevice(deviceItem) {
        this.$store.commit(
          ACTION_TYPES.MARKETING_CONTRACT_DETAIL_SALESDEVICES_REMOVE,
          deviceItem.id
        );
      },
      handleQueryMarketingContractDetail(id) {
        this.$store.dispatch(ACTION_TYPES.MARKETING_CONTRACT_DETAIL_QUERY, id);
      },
      marketingContractTableRowDelete(id) {
        let _this = this;
        this.$store.dispatch(ACTION_TYPES.MARKETING_CONTRACT_DELETE, {
          id,
          actionCallback: _this.handleQueryMarketingContractList,
          actionFailure: _this.actionFailure,
          actionSuccess: _this.actionSuccess,
        });
      },
      marketingContractDeviceTypeOnSelect(devicetypeid) {
        this.handleQueryDeviceTypeList(devicetypeid);
      },
      marketingContractTableRowOnChange(selectedRowKeys) {
        this.$data.selectedRowKeys = selectedRowKeys;
      },
      marketingContractInvoiceApply() {
        let _this = this;
        this.$store.dispatch(ACTION_TYPES.MARKETING_CONTRACT_INVOICE_APPLY, {
          salescontracts: this.$data.selectedRowKeys,
          actionFailure: _this.actionFailure,
          actionSuccess: _this.actionSuccess,
          actionCallback: _this.handleQueryMarketingContractList,
        });
      },
    },
    mounted() {
      // 销售合同列表初始化
      this.handleQueryMarketingContractList();

      // 客户分类列表初始化
      this.handleQueryCustomerClassificationList();

      // 设备等级列表初始化
      if (
        this.$store.state.moduleGlobal.deviceLevelList &&
        this.$store.state.moduleGlobal.deviceLevelList.length === 0
      ) {
        this.handleQueryDeviceLevelList();
      }

      // 产品类别列表初始化
      if (
        this.$store.state.moduleGlobal.productTypeList &&
        this.$store.state.moduleGlobal.productTypeList.length === 0
      ) {
        this.handleQueryProductTypeList();
      }
    },
  });
</script>

<style scoped>
  .demo-page-header :deep(tr:last-child td) {
    padding-bottom: 0;
  }
</style>
