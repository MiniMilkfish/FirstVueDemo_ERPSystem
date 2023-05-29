<!-- 库存报警设置 组件 -->
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
      :data-source="getInventoryAlarmSettingsTableDatas.data"
      :scroll="{ x: 600, y: tableHeight }"
      :pagination="{
        showQuickJumper: true,
        defaultPageSize: defaultPageSize,
        pageSizeOptions: pageSizeOptions,
        total: getInventoryAlarmSettingsTableDatas.total,
        current: getInventoryAlarmSettingsTableDatas.activePage,
        onChange: handleQueryInventoryAlarmSettingsList,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <a-space>
            <a-button
              type="primary"
              size="small"
              @click="modifyModalShow(record.id, record.typemodel)"
              >编辑</a-button
            >
            <a-popconfirm
              title="确定移除当前库存报警设置嘛?"
              @confirm="inventoryAlarmSettingsTableRowDelete(record.id)"
            >
              <a-button danger size="small">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>

  <!-- 新增 & 编辑 库存报警设置 -->
  <a-modal
    v-model:visible="modifyModalVisible"
    :title="'库存报警设置 ' + modalType"
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
      :model="getInventoryAlarmSettingsDetail"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item name="warntype" label="报警类型">
        <a-select
          ref="select"
          v-model:value="getInventoryAlarmSettingsDetail.warntype"
          @change="handleWarntypeOnChange"
        >
          <a-select-option
            v-for="item in warnTypeList"
            :key="item.key"
            :value="item.key"
            >{{ item.label }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item name="typeid" label="名称">
        <a-select
          ref="select"
          v-if="getInventoryAlarmSettingsDetail.warntype === 1"
          v-model:value="getInventoryAlarmSettingsDetail.typeid"
          @change="handleTypeidOnChange"
        >
          <a-select-option
            v-for="item in getInventoryAlarmSettingsProductList"
            :key="item.id"
            :model="item.devicemodel"
            :value="item.id"
            >{{ item.devicename }}</a-select-option
          >
        </a-select>
        <a-select
          ref="select"
          v-else
          v-model:value="getInventoryAlarmSettingsDetail.typeid"
          @change="handleTypeidOnChange"
        >
          <a-select-option
            v-for="item in getInventoryAlarmSettingsAccessoriesList"
            :key="item.id"
            :model="item.sparepartmodel"
            :value="item.id"
            >{{ item.sparepartname }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item name="typemodel" label="型号">
        <a-input
          v-model:value="getInventoryAlarmSettingsDetail.typemodel"
          placeholder="请选择对应产品或配件"
          :disabled="disableControl"
        />
      </a-form-item>
      <a-form-item name="warehouseid" label="仓库">
        <a-select
          ref="select"
          v-model:value="getInventoryAlarmSettingsDetail.warehouseid"
          placeholder="请选择所属仓库"
        >
          <a-select-option
            v-for="item in getInventoryAlarmSettingsWarehouseList"
            :key="item.id"
            :value="item.id"
            >{{ item.warehousename }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item name="warnvalue" label="报警限制">
        <a-input-number
          style="width: 100%;"
          v-model:value="getInventoryAlarmSettingsDetail.warnvalue"
          placeholder="请调整报警限制"
        />
      </a-form-item>
      <a-form-item name="remark" label="备注">
        <a-input
          v-model:value="getInventoryAlarmSettingsDetail.remark"
          placeholder="填写一些说明性文字"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { defineComponent, ref } from "vue";
  import CONSTANT_INVENTORY_ALARM_SETTINGS from "../utils/constantInventoryAlarmSettings";
  import ACTION_TYPES from "../store/constantActionTypes";
  import CONSTANT_DATA from "../utils/constantData";

  export default defineComponent({
    data() {
      const formRef = ref();
      const modifyModalVisible = ref(false);

      return {
        formRef,
        modifyModalVisible,
        columns: CONSTANT_INVENTORY_ALARM_SETTINGS.TABLE_COLUMNS,
        labelCol: { style: { width: "120px", textAlign: "left" } },
        wrapperCol: { span: 24 },
        rules: {
          warntype: {
            required: true,
            message: "报警类型为必选项",
          },
          typeid: {
            required: true,
            message: "配件或产品为必选项",
          },
          typemodel: {
            required: true,
            message: "配件或产品为必选项",
          },
          warehouseid: {
            required: true,
            message: "所属仓库为必选项",
          },
          warnvalue: {
            required: true,
            message: "报警限制为必填项",
          }
        },
        modalType: "",
        defaultPageSize: CONSTANT_INVENTORY_ALARM_SETTINGS.TABLE_SHOW_SIZE,
        pageSizeOptions:
          CONSTANT_INVENTORY_ALARM_SETTINGS.TABLE_SHOW_SIZE_ARRAY,
        warnTypeList: CONSTANT_DATA.WARN_TYPE,
        disableControl: true,
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
      getInventoryAlarmSettingsTableDatas() {
        return this.$store.state.moduleInventoryAlarmSettings.tableData;
      },
      getInventoryAlarmSettingsDetail() {
        return this.$store.state.moduleInventoryAlarmSettings
          .inventoryAlarmSettingsDetail;
      },
      getInventoryAlarmSettingsProductList() {
        return this.$store.state.moduleInventoryAlarmSettings.productList;
      },
      getInventoryAlarmSettingsAccessoriesList() {
        return this.$store.state.moduleInventoryAlarmSettings.accessoriesList;
      },
      getInventoryAlarmSettingsWarehouseList() {
        return this.$store.state.moduleInventoryAlarmSettings.warehouseList;
      },
    },
    methods: {
      modifyModalSubmit() {
        let _this = this;
        this.$refs.formRef
          .validate()
          .then(res => {
            _this.$data.modifyModalVisible = false;

            _this.$store.dispatch(
              ACTION_TYPES.INVENTORY_ALARM_SETTINGS_MODIFY,
              {
                ...res,
                actionFailure: _this.actionFailure,
                actionSuccess: _this.actionSuccess,
                actionCallback: _this.handleQueryInventoryAlarmSettingsList,
              }
            );
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
      handleQueryInventoryAlarmSettingsList(currentPage, showPageSize) {
        currentPage = currentPage
          ? currentPage
          : this.$store.state.moduleInventoryAlarmSettings.tableData.activePage;
        showPageSize = showPageSize
          ? showPageSize
          : CONSTANT_INVENTORY_ALARM_SETTINGS.TABLE_SHOW_SIZE;

        this.$store.dispatch(ACTION_TYPES.INVENTORY_ALARM_SETTINGS_LIST_QUERY, {
          actionFailure: this.actionFailure,
          currentPage,
          showPageSize,
        });
      },
      actionFailure(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.ERROR,
          message: "库存报警设置" + this.modalType,
          description: description,
        });
      },
      actionSuccess(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.SUCCESS,
          message: "库存报警设置" + this.modalType,
          description: description,
        });
      },
      modifyModalShow(id, name) {
        let _this = this;
        this.modifyModalVisible = true;

        if (name && name.length > 0) {
          this.modalType = "编辑";

          // 查询库存报警设置详情
          this.handleQueryInventoryAlarmSettingsDetail(id);
        } else {
          this.$store.commit(
            ACTION_TYPES.INVENTORY_ALARM_SETTINGS_DETAIL_CLEAR
          );
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
        this.$store.dispatch(ACTION_TYPES.INVENTORY_ALARM_SETTINGS_DELETE, {
          id,
          actionFailure: _this.actionFailure,
          actionSuccess: _this.actionSuccess,
          actionCallback: _this.handleQueryInventoryAlarmSettingsList,
        });
      },
      handleQueryProductList() {
        this.$store.dispatch(
          ACTION_TYPES.INVENTORY_ALARM_SETTINGS_PRODUCT_LIST
        );
      },
      handleQueryAccessoriesList() {
        this.$store.dispatch(
          ACTION_TYPES.INVENTORY_ALARM_SETTINGS_ACCESSORIES_LIST
        );
      },
      handleQueryWarehouseList() {
        this.$store.dispatch(
          ACTION_TYPES.INVENTORY_ALARM_SETTINGS_WAREHOUSE_LIST
        );
      },
      handleWarntypeOnChange(typeid) {
        this.$store.commit(
          ACTION_TYPES.INVENTORY_ALARM_SETTINGS_WARNTYPE_ONCHANGE,
          typeid
        );
      },
      handleTypeidOnChange(typeid, option) {
        this.$store.commit(
          ACTION_TYPES.INVENTORY_ALARM_SETTINGS_TYPEID_ONCHANGE,
          { typeid, typemodel: option.model }
        );
      },
      handleQueryInventoryAlarmSettingsDetail(id) {
        this.$store.dispatch(ACTION_TYPES.INVENTORY_ALARM_SETTINGS_DETAIL, id);
      },
    },
    mounted() {
      // 库存报警设置列表查询初始化
      this.handleQueryInventoryAlarmSettingsList();

      // 产品列表
      this.handleQueryProductList();

      // 配件列表
      this.handleQueryAccessoriesList();

      // 仓库列表
      this.handleQueryWarehouseList();
    },
  });
</script>

<style scoped>
  .demo-page-header :deep(tr:last-child td) {
    padding-bottom: 0;
  }
</style>
