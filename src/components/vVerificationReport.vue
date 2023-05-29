<!-- 检验报告 组件 -->
<template>
  <div class="page_control_container">
    <div class="page_condition">
      <a-space>
        <a-input v-model:value="contractId" placeholder="报告编号" />
      </a-space>
    </div>
    <div class="page_condition_controler">
      <a-button type="primary">搜索</a-button>
    </div>
  </div>
  <div class="page_result">
    <div class="result_extra_control">
      <a-button type="primary" size="small" @click="showAddModal"
        >新增</a-button
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
      :data-source="data"
      :scroll="{ x: 2000, y: tableHeight }"
      :pagination="{ showQuickJumper: true }"
    >
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'operation'">
          <a-space>
            <a-button type="primary" size="small" @click="showEditModal"
              >编辑</a-button
            >
            <a-button danger size="small">删除</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>

  <!--  新增 -->
  <a-modal
    v-model:visible="addModalVisible"
    title="校验报告 - 新增"
    @ok="addModalSubmit"
  >
    <template #footer>
      <a-button key="back" @click="addModalClose">关闭</a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="addModalSubmit"
        >提交</a-button
      >
    </template>
    <a-form
      ref="formRef"
      :model="formState"
      layout="horizontal"
      name="form_in_modal"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item
        name="a"
        label="产品/配件名称"
        :rules="[{ required: true, message: '必填项!' }]"
      >
        <a-input v-model:value="formState.a" />
      </a-form-item>
      <a-form-item name="b" label="质检编号">
        <a-input v-model:value="formState.b" />
      </a-form-item>
      <a-form-item name="c" label="有效期">
        <a-range-picker v-model:value="formState.c" style="width: 100%" />
      </a-form-item>
      <a-form-item name="d" label="状态">
        <a-select
          ref="select"
          v-model:value="formState.d"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="jack">申请中</a-select-option>
          <a-select-option value="lucy">已申请</a-select-option>
          <a-select-option value="Yiminghe">已过期</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="e" label="文件上传">
        <a-upload
          v-model:file-list="fileList"
          name="file"
          list-type="picture-card"
          class="avatar-uploader"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :headers="headers"
          @change="handleChange"
        >
          <div>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
          </div>
        </a-upload>
      </a-form-item>
    </a-form>
  </a-modal>

  <!--  修改 -->
  <a-modal
    v-model:visible="editModalVisible"
    title="校验报告 - 编辑"
    width="1000px"
    @ok="addModalSubmit"
  >
    <template #footer>
      <a-button key="back" @click="editModalClose">返回</a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="editModalSubmit"
        >提交</a-button
      >
    </template>
    <a-form
      ref="formRef"
      :model="formState"
      layout="horizontal"
      name="form_in_modal"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-descriptions title="XXXX 项目">
        <a-descriptions-item label="合同签定方">XXXXXXXXXX</a-descriptions-item>
        <a-descriptions-item label="工地项目名称"
          >XXXXXXXXXX</a-descriptions-item
        >
      </a-descriptions>
      <a-form-item
        name="a"
        label="报建编号"
        :rules="[{ required: true, message: '必填项!' }]"
      >
        <a-input v-model:value="formState.a" />
      </a-form-item>
      <a-form-item name="b" label="收款">
        <a-input v-model:value="formState.b" />
      </a-form-item>
      <a-form-item name="c" label="未收款">
        <a-input v-model:value="formState.c" />
      </a-form-item>
      <a-form-item name="e" label="质保/运维期">
        <a-range-picker v-model:value="formState.e" style="width: 100%" />
      </a-form-item>
      <a-form-item name="f" label="续运维期">
        <a-range-picker v-model:value="formState.f" style="width: 100%" />
      </a-form-item>
      <a-form-item name="g" label="收款日期">
        <a-date-picker v-model:value="formState.g" style="width: 100%" />
      </a-form-item>
      <a-form-item name="k" label="文件上传">
        <div class="edit_modal_filelist">
          <a-upload
            v-model:file-list="editModalFileList"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          >
          </a-upload>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { defineComponent, reactive, ref, toRaw } from "vue";
  import CONSTANT_VERIFICATION_REPORT from "../utils/constantVerificationReport";
  import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";

  let data = [];
  for (let i = 0; i < 120; i++) {
    let rowObj = { key: i };

    for (let j = 0; j < 26; j++) {
      rowObj[String.fromCharCode(97 + j)] = "占位";
    }
    data.push(rowObj);
  }

  export default defineComponent({
    data() {
      return {
        contractId: "",
        data,
        columns: CONSTANT_VERIFICATION_REPORT.TABLE_COLUMNS,
      };
    },
    components: {
      PlusOutlined,
      LoadingOutlined,
    },
    setup() {
      const formRef = ref();
      const loading = ref(false);
      const addModalVisible = ref(false);
      const editModalVisible = ref(false);
      const fileList = ref([]);
      const editModalFileList = ref([
        {
          uid: "1",
          name: "xxxxxxxxxxxxxxxxxxx.pdf",
          status: "done",
          response: "Server Error 500",
          // custom error message to show
          url: "http://www.baidu.com/xxx.png",
        },
        {
          uid: "2",
          name: "xxxxxxxxxxxxxxxxxxxxxxxxxx.zip",
          status: "done",
          url: "http://www.baidu.com/yyy.png",
        },
        {
          uid: "3",
          name: "xxxxxxxxxxxxxxxxxxxxxxxxxx.png",
          status: "error",
          response: "Server Error 500",
          // custom error message to show
          url: "http://www.baidu.com/zzz.png",
        },
      ]);

      const formState = reactive({
        a: "",
        b: "",
        c: "",
        d: "jack",
        e: "",
        f: "",
        g: "",
        k: "",
        modifier: "public",
      });

      const showAddModal = () => {
        addModalVisible.value = true;
      };

      const addModalSubmit = () => {
        formRef.value
          .validateFields()
          .then(values => {
            loading.value = true;
            setTimeout(() => {
              loading.value = false;
              addModalVisible.value = false;
            }, 2000);

            console.log("Received values of form: ", values);
            console.log("formState: ", toRaw(formState));
            formRef.value.resetFields();
            console.log("reset formState: ", toRaw(formState));
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      };

      const addModalClose = () => {
        addModalVisible.value = false;
      };

      const showEditModal = () => {
        editModalVisible.value = true;
      };

      const editModalSubmit = () => {
        formRef.value
          .validateFields()
          .then(values => {
            loading.value = true;
            setTimeout(() => {
              loading.value = false;
              editModalVisible.value = false;
            }, 2000);

            console.log("Received values of form: ", values);
            console.log("formState: ", toRaw(formState));
            formRef.value.resetFields();
            console.log("reset formState: ", toRaw(formState));
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      };

      const editModalClose = () => {
        editModalVisible.value = false;
      };

      const handleChange = value => {
        console.log(`selected ${value}`);
      };

      const focus = () => {
        console.log("focus");
      };

      return {
        loading,
        addModalVisible,
        editModalVisible,
        formState,
        formRef,
        labelCol: { style: { width: "120px" } },
        wrapperCol: { span: 24 },
        fileList,
        headers: {
          authorization: "authorization-text",
        },
        editModalFileList,
        showAddModal,
        addModalSubmit,
        addModalClose,
        showEditModal,
        editModalSubmit,
        editModalClose,
        handleChange,
        focus,
      };
    },
    computed: {
      tableHeight() {
        return (
          this.$store.state.moduleLogin.LoginFormDimensions.pageContentHeight -
          104 -
          32 -
          55 -
          64 -
          20
        );
      },
    },
  });
</script>

<style scoped>
  .demo-page-header :deep(tr:last-child td) {
    padding-bottom: 0;
  }
</style>
