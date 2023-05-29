<!-- 产品列表 组件 -->
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
      :data-source="getProductListTableDatas.data"
      :scroll="{ x: 600, y: tableHeight }"
      :pagination="{
        showQuickJumper: true,
        defaultPageSize: defaultPageSize,
        pageSizeOptions: pageSizeOptions,
        total: getProductListTableDatas.total,
        current: getProductListTableDatas.activePage,
        onChange: handleQueryProductListList,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <a-space>
            <a-button
              type="primary"
              size="small"
              @click="modifyModalShow(record.id, record.devicename)"
              >编辑</a-button
            >
            <a-popconfirm
              title="确定移除当前产品嘛?"
              @confirm="inventoryAlarmSettingsTableRowDelete(record.id)"
            >
              <a-button danger size="small">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>

  <!-- 新增 & 编辑 产品 -->
  <a-modal
    v-model:visible="modifyModalVisible"
    :title="'产品结构清单 ' + modalType"
    width="1000px"
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
      :model="getProductListDetail"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-row :gutter="[24, 8]">
        <a-col :span="12">
          <a-form-item name="devicetypeid" label="所属分类">
            <a-select
              ref="select"
              v-model:value="getProductListDetail.devicetypeid"
            >
              <a-select-option
                v-for="item in getProductClassificationList"
                :key="item.id"
                :value="item.id"
                >{{ item.typename }}</a-select-option
              >
            </a-select>
          </a-form-item>
          <a-form-item name="devicemodel" label="规格/型号">
            <a-input
              v-model:value="getProductListDetail.devicemodel"
              placeholder="请填写规格/型号"
            />
          </a-form-item>
          <a-form-item name="supplierid" label="供应商">
            <a-select
              ref="select"
              v-model:value="getProductListDetail.supplierid"
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
          <a-form-item name="devicepriceamount" label="单价">
            <a-input
              v-model:value="getProductListDetail.devicepriceamount"
              placeholder="请填写产品单价"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="devicename" label="产品名称">
            <a-input
              v-model:value="getProductListDetail.devicename"
              placeholder="请填写产品名称"
            />
          </a-form-item>
          <a-form-item name="unitid" label="单位">
            <a-select ref="select" v-model:value="getProductListDetail.unitid">
              <a-select-option
                v-for="item in getUnitOfMeasurementList"
                :key="item.id"
                :value="item.id"
                >{{ item.unitname }}</a-select-option
              >
            </a-select>
          </a-form-item>
          <a-form-item name="specialflag" label="产品标识">
            <a-select
              ref="select"
              v-model:value="getProductListDetail.specialflag"
              placeholder="请选择产品标识"
            >
              <a-select-option
                v-for="item in productFlag"
                :key="item.key"
                :value="item.key"
                >{{ item.label }}</a-select-option
              >
            </a-select>
          </a-form-item>
          <a-form-item name="remark" label="备注">
            <a-input
              v-model:value="getProductListDetail.remark"
              placeholder="请填写备注"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-divider orientation="left">配件清单</a-divider>
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
            <a-col :span="2" :order="1">编号</a-col>
            <a-col :span="6" :order="2">配件名称</a-col>
            <a-col :span="6" :order="3">数量</a-col>
            <a-col :span="2" :order="4">单位</a-col>
            <a-col :span="6" :order="5">配件标识</a-col>
            <a-col :span="2" :order="6">操作</a-col>
          </a-row>
          <a-row
            type="flex"
            v-for="(bomItem, index) in getProductListDetail.bomslist"
            :key="bomItem.sparepartid"
            :k="index"
            style="text-align: center"
          >
            <a-col :span="2" :order="1"> {{ index + 1 }} </a-col>
            <a-col :span="6" :order="2">
              <a-form-item
                :name="['bomslist', index, 'sparepartid']"
                :rules="{
                  required: true,
                  message: '请选择配件',
                }"
              >
                <a-select
                  ref="select"
                  v-model:value="bomItem.sparepartid"
                  placeholder="请选择配件"
                  style="width: 180px"
                  @change="handleAccessoryListOnSelect($event, bomItem.id)"
                >
                  <a-select-option
                    v-for="accessoryItem in getAccessoryList"
                    :key="accessoryItem.id"
                    :value="parseInt(accessoryItem.id)"
                    >{{ accessoryItem.sparepartname }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6" :order="3">
              <a-form-item
                :name="['bomslist', index, 'sparepartcount']"
                :rules="{
                  required: true,
                  message: '请填写配件数量',
                }"
              >
                <a-input
                  v-model:value="bomItem.sparepartcount"
                  style="width: 180px"
                  placeholder="请填写配件数量"
              /></a-form-item>
            </a-col>
            <a-col :span="2" :order="4">{{ bomItem.unit }}</a-col>
            <a-col :span="6" :order="5">
              <a-form-item
                :name="['bomslist', index, 'coreflag']"
                :rules="{
                  required: true,
                  message: '请选择配件标识',
                }"
              >
                <a-select
                  ref="select"
                  v-model:value="bomItem.coreflag"
                  placeholder="请选择配件标识"
                  style="width: 180px"
                >
                  <a-select-option
                    v-for="accessoryItem in sparepartFlag"
                    :key="accessoryItem.key"
                    :value="accessoryItem.key"
                    >{{ accessoryItem.label }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="2" :order="6" style="padding-top: 6px">
              <MinusCircleOutlined @click="handleRemoveDevice(bomItem)" />
            </a-col>
          </a-row>
          <a-form-item>
            <a-button
              type="dashed"
              block
              @click="
                handleAddDevice(
                  getAccessoryList[0].id,
                  getAccessoryList[0].unit
                )
              "
            >
              <PlusOutlined />
              添加配件
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
  import CONSTANT_PRODUCT from "../utils/constantProductList";
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

      return {
        formRef,
        modifyModalVisible,
        columns: CONSTANT_PRODUCT.TABLE_COLUMNS,
        labelCol: { style: { width: "120px", textAlign: "left" } },
        wrapperCol: { span: 24 },
        rules: {
          devicetypeid: {
            required: true,
            message: "所属分类为必选项",
          },
          devicemodel: {
            required: true,
            message: "规格/型号为必填项",
          },
          devicename: {
            required: true,
            message: "产品名称为必填项",
          },
          unitid: {
            required: true,
            message: "单位为必选项",
          },
          supplierid: {
            required: true,
            message: "供应商为必选项",
          },
          specialflag: {
            required: true,
            message: "产品标识为必选项",
          },
        },
        modalType: "",
        defaultPageSize: CONSTANT_PRODUCT.TABLE_SHOW_SIZE,
        pageSizeOptions: CONSTANT_PRODUCT.TABLE_SHOW_SIZE_ARRAY,
        warnTypeList: CONSTANT_DATA.WARN_TYPE,
        productFlag: CONSTANT_DATA.PRODUCT_FLAG,
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
      getProductListTableDatas() {
        return this.$store.state.moduleProductList.tableData;
      },
      getProductListDetail() {
        return this.$store.state.moduleProductList.productListDetail;
      },
      getProductClassificationList() {
        return this.$store.state.moduleProductList.productClassificationList;
      },
      getUnitOfMeasurementList() {
        return this.$store.state.moduleProductList.unitOfMeasurementList;
      },
      getAccessoryList() {
        return this.$store.state.moduleProductList.accessoryList;
      },
      getSupplyChannelList() {
        return this.$store.state.moduleProductList.supplyChannelList;
      },
    },
    methods: {
      modifyModalSubmit() {
        let _this = this;
        this.$refs.formRef
          .validate()
          .then(res => {
            _this.$data.modifyModalVisible = false;

            _this.$store.dispatch(ACTION_TYPES.PRODUCT_MODIFY, {
              ...res,
              actionFailure: _this.actionFailure,
              actionSuccess: _this.actionSuccess,
              actionCallback: _this.handleQueryProductListList,
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
      handleQueryProductListList(currentPage, showPageSize) {
        currentPage = currentPage
          ? currentPage
          : this.$store.state.moduleProductList.tableData.activePage;
        showPageSize = showPageSize
          ? showPageSize
          : CONSTANT_PRODUCT.TABLE_SHOW_SIZE;

        this.$store.dispatch(ACTION_TYPES.PRODUCT_LIST_QUERY, {
          actionFailure: this.actionFailure,
          currentPage,
          showPageSize,
        });
      },
      actionFailure(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.ERROR,
          message: "产品" + this.modalType,
          description: description,
        });
      },
      actionSuccess(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.SUCCESS,
          message: "产品" + this.modalType,
          description: description,
        });
      },
      modifyModalShow(id, name) {
        let _this = this;
        this.modifyModalVisible = true;

        if (name && name.length > 0) {
          this.modalType = "编辑";

          // 查询产品详情
          this.handleQueryProductListDetail(id);
        } else {
          this.$store.commit(ACTION_TYPES.PRODUCT_DETAIL_CLEAR);
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
        this.$store.dispatch(ACTION_TYPES.PRODUCT_DELETE, {
          id,
          actionFailure: _this.actionFailure,
          actionSuccess: _this.actionSuccess,
          actionCallback: _this.handleQueryProductListList,
        });
      },
      handleQueryProductListDetail(id) {
        this.$store.dispatch(ACTION_TYPES.PRODUCT_DETAIL, id);
      },
      handleQueryProductClassificationList() {
        this.$store.dispatch(
          ACTION_TYPES.PRODUCT_PAGE_PRODUCT_CLASSIFICATION_LIST
        );
      },
      handleQueryUnitOfMeasurementList() {
        this.$store.dispatch(
          ACTION_TYPES.PRODUCT_PAGE_UNIT_OF_MEASUREMENT_LIST
        );
      },
      handleQueryAccessoryList() {
        this.$store.dispatch(ACTION_TYPES.PRODUCT_PAGE_ACCESSORY_LIST);
      },
      handleQuerySupplyChannelList() {
        this.$store.dispatch(ACTION_TYPES.PRODUCT_PAGE_SUPPLY_CHANNEL_LIST);
      },
      handleAccessoryListOnSelect(accessoryId, bomsListId) {
        this.$store.commit(ACTION_TYPES.PRODUCT_PAGE_ACCESSORY_UNIT_MATCHED, {
          accessoryId,
          bomsListId,
        });
      },
      handleAddDevice(deviceTypeId, unit) {
        this.$store.commit(ACTION_TYPES.PRODUCT_DETAIL_DEVICE_BOMLIST_ADD, {
          deviceTypeId,
          unit,
        });
      },
      handleRemoveDevice(bomItem) {
        this.$store.commit(
          ACTION_TYPES.PRODUCT_DETAIL_DEVICE_BOMLIST_REMOVE,
          bomItem.id
        );
      },
    },
    mounted() {
      // 产品列表查询初始化
      this.handleQueryProductListList();

      // 产品分类列表初始化
      this.handleQueryProductClassificationList();

      // 计量单位列表初始化
      this.handleQueryUnitOfMeasurementList();

      // 配件列表初始化
      this.handleQueryAccessoryList();

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
