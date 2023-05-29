<!-- 运维时间 组件 -->
<template>
  <div class="page_control_container">
    <div class="page_condition">
      <a-space>
        <a-range-picker
          v-model:value="searchCondition.installRangeDate"
          :placeholder="['安装开始时间', '安装结束时间']"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
        <a-input
          v-model:value="searchCondition.projectName"
          placeholder="项目名称"
          allow-clear
        />
      </a-space>
    </div>
    <div class="page_condition_controler">
      <a-button
        type="primary"
        @click="handleQueryOperationAndMaintenanceTimeList"
        >搜索</a-button
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
      :data-source="getOperationAndMaintenanceTimeListTableDatas.data"
      :scroll="{ x: 600, y: tableHeight }"
      :pagination="{
        showQuickJumper: true,
        defaultPageSize: defaultPageSize,
        pageSizeOptions: pageSizeOptions,
        total: getOperationAndMaintenanceTimeListTableDatas.total,
        current: getOperationAndMaintenanceTimeListTableDatas.activePage,
        onChange: handleQueryOperationAndMaintenanceTimeList,
      }"
    >
      <template #bodyCell="{ text, column, record }">
        <template v-if="column.key === 'remark'">
          <template v-if="text && text.length > 20">
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
              >编辑</a-button
            >
            <a-popconfirm
              title="确定移除当前运维安排嘛?"
              @confirm="categoryOfMeasurementTableRowDelete(record.id)"
            >
              <a-button danger size="small">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>

  <!-- 运维时间 新增 & 编辑 -->
  <a-modal
    v-model:visible="modifyModalVisible"
    :title="'运维时间 ' + modalType"
    width="600px"
    :keyboard="modalClosableExtra"
    :maskClosable="modalClosableExtra"
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
      :model="getOperationAndMaintenanceTimeDetail"
      layout="horizontal"
      name="form_in_modal"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item name="projectname" label="项目名称">
        <a-select
          v-model:value="getOperationAndMaintenanceTimeDetail.salescontractid"
          show-search
          placeholder="请填写项目名称"
          :options="getMarketingContractList"
          @change="handleProjectSelect"
        ></a-select>
      </a-form-item>
      <a-form-item name="installRangeDate" label="和客户沟通的安装时间">
        <a-range-picker
          v-model:value="getOperationAndMaintenanceTimeDetail.installRangeDate"
          style="width: 100%"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </a-form-item>
      <a-form-item name="planSurveryRangeDate" label="计划现场勘察时间">
        <a-range-picker
          v-model:value="
            getOperationAndMaintenanceTimeDetail.planSurveryRangeDate
          "
          style="width: 100%"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </a-form-item>
      <a-form-item name="onsideSurveryRangeDate" label="实际现场勘察时间">
        <a-range-picker
          v-model:value="
            getOperationAndMaintenanceTimeDetail.onsideSurveryRangeDate
          "
          style="width: 100%"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </a-form-item>
      <a-form-item name="surverysitefiles" label="实际现场勘察情况">
        <a-upload
          :fileList="fileList"
          name="file"
          list-type="picture-card"
          class="avatar-uploader"
          :multiple="true"
          :beforeUpload="handleBeforeUpload"
          :remove="handleFileRemove"
          @preview="handleImagePreviewModalVisible"
        >
          <div v-if="fileList.length < 9">
            <plus-outlined />
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item name="info" label="备注">
        <a-textarea
          v-model:value="getOperationAndMaintenanceTimeDetail.info"
          placeholder="请填写备注说明"
          auto-size
          style="width: 100%"
        />
      </a-form-item>
    </a-form>
  </a-modal>

  <!-- 图片预览 -->
  <a-modal
    :visible="previewVisible"
    :footer="null"
    @cancel="handleImagePreviewModalVisible"
  >
    <img alt="example" style="width: 100%" :src="previewImage" />
  </a-modal>
</template>

<script>
  import { defineComponent, ref } from "vue";
  import CONSTANT_OPERATION_AND_MAINTENANCE_TIME from "../utils/constantOperationAndMaintenanceTime";
  import ACTION_TYPES from "../store/constantActionTypes";
  import CONSTANT_DATA from "../utils/constantData";
  import { PlusOutlined } from "@ant-design/icons-vue";
  import ServerConfig from "../config/urlConfig";
  import { isNumber } from "../utils/common";

  export default defineComponent({
    data() {
      const formRef = ref();
      const modifyModalVisible = ref(false);

      return {
        formRef,
        modifyModalVisible,
        fileList: [],
        labelCol: { style: { width: "160px", textAlign: "right" } },
        wrapperCol: { span: 24 },
        rules: {
          customname: {
            required: true,
            message: "客户名称为必填项",
          },
          categoryid: {
            required: true,
            message: "运维时间为必选项",
          },
        },
        modalType: "",
        defaultPageSize:
          CONSTANT_OPERATION_AND_MAINTENANCE_TIME.TABLE_SHOW_SIZE,
        pageSizeOptions:
          CONSTANT_OPERATION_AND_MAINTENANCE_TIME.TABLE_SHOW_SIZE_ARRAY,
        columns: CONSTANT_OPERATION_AND_MAINTENANCE_TIME.TABLE_COLUMNS,
        uploadReqUrl: `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.UPLOAD_FILE}`,
        previewVisible: false,
        previewImage: "",
        modalClosableExtra: false,
        searchCondition: {
          installRangeDate: [],
          projectName: "",
        },
      };
    },
    components: {
      PlusOutlined,
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
      getOperationAndMaintenanceTimeListTableDatas() {
        return this.$store.state.moduleOperationAndMaintenanceTime.tableData;
      },
      getOperationAndMaintenanceTimeDetail() {
        return this.$store.state.moduleOperationAndMaintenanceTime
          .operationAndMaintenanceTimeDetail;
      },
      getMarketingContractList() {
        return this.$store.state.moduleGlobal.marketingContractList.map(
          function (item, index) {
            return {
              label: item.projectname,
              value: item.salescontractid,
              key: index,
            };
          }
        );
      },
    },
    methods: {
      handleQueryOperationAndMaintenanceTimeList(currentPage, showPageSize) {
        currentPage =
          currentPage && isNumber(currentPage)
            ? currentPage
            : this.$store.state.moduleOperationAndMaintenanceTime.tableData
                .activePage;
        showPageSize =
          showPageSize && isNumber(showPageSize)
            ? showPageSize
            : CONSTANT_OPERATION_AND_MAINTENANCE_TIME.TABLE_SHOW_SIZE;

        let installRangeDate = this.$data.searchCondition.installRangeDate,
          projectName = this.$data.searchCondition.projectName;

        this.$store.dispatch(
          ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_LIST_QUERY,
          {
            actionFailure: this.actionFailure,
            currentPage,
            showPageSize,
            installRangeDate,
            projectName,
          }
        );
      },
      handleQueryOperationAndMaintenanceTimeDetail(id) {
        this.$store.dispatch(
          ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_DETAIL,
          {
            id,
            handleBuildImageFileList: this.handleBuildImageFileList,
          }
        );
      },
      handleBuildImageFileList(fileList) {
        let currentFileList = this.$data.fileList;
        if (fileList && fileList.length > 0)
          currentFileList = currentFileList.concat(fileList);
        this.$data.fileList = currentFileList.map(function (file, index) {
          return {
            uid: index,
            name: file.filename || file.name,
            status: "done",
            url: file.filepath || file.url,
          };
        });
      },
      actionFailure(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.ERROR,
          message: "运维时间" + this.modalType,
          description: description,
        });
      },
      actionSuccess(description) {
        this.$store.commit(ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW, {
          type: CONSTANT_DATA.NOTIFICATION_TYPES.SUCCESS,
          message: "运维时间" + this.modalType,
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
              _this.$store.state.moduleOperationAndMaintenanceTime.operationAndMaintenanceTimeDetail.id;

            _this.$store.dispatch(
              ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_MODIFY,
              {
                ...res,
                actionFailure: _this.actionFailure,
                actionSuccess: _this.actionSuccess,
                actionCallback:
                  _this.handleQueryOperationAndMaintenanceTimeList,
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
      modifyModalShow(id, name) {
        this.$data.modifyModalVisible = true;
        this.$data.fileList = [];

        if (name && name.length > 0) {
          this.$data.modalType = "编辑";

          // 查询客户详情
          this.handleQueryOperationAndMaintenanceTimeDetail(id);
        } else {
          this.$store.commit(
            ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_DETAIL_CLEAR
          );
          this.$data.modalType = "新增";
        }
      },
      modifyModalClose() {
        this.modifyModalVisible = false;
      },
      categoryOfMeasurementTableRowDelete(id) {
        let _this = this;
        this.$store.dispatch(
          ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_DELETE,
          {
            id,
            actionFailure: _this.actionFailure,
            actionSuccess: _this.actionSuccess,
            actionCallback: _this.handleQueryOperationAndMaintenanceTimeList,
          }
        );
      },
      handleBeforeUpload(file) {
        this.$store.dispatch(ACTION_TYPES.GLOBAL_UPLOAD_FILE, {
          file,
          motationType:
            ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_COMBINE_FILES,
          handleBuildImageFileList: this.handleBuildImageFileList,
        });
        return false;
      },
      handleFileRemove(file) {
        const index = this.$data.fileList.indexOf(file);
        const newFileList = this.$data.fileList.slice();
        newFileList.splice(index, 1);
        this.$data.fileList = newFileList;

        this.$store.commit(
          ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_REMOVE_FILE,
          file.name
        );
      },
      handleQueryMarketingContractList() {
        this.$store.dispatch(ACTION_TYPES.GLOBAL_MARKETING_CONTRACT_SHORT_LIST);
      },
      handleProjectSelect(value, option) {
        this.$store.commit(
          ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_CONTRACT_SELECT,
          {
            value,
            option,
          }
        );
      },
      handleImagePreviewModalVisible(file) {
        if (this.$data.previewVisible) {
          this.$data.previewVisible = false;
          return;
        }

        if (file && file.url) {
          this.$data.previewImage = file.url;
        }

        this.$data.previewVisible = true;
      },
    },
    mounted() {
      // 运维时间列表初始化
      this.handleQueryOperationAndMaintenanceTimeList();

      // 销售合同列表初始化
      this.handleQueryMarketingContractList();
    },
  });
</script>

<style scoped>
  .demo-page-header :deep(tr:last-child td) {
    padding-bottom: 0;
  }
</style>
