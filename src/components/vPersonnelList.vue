<!-- 人员列表 组件 -->
<template>
  <div class="page_control_container">
    <div class="page_condition">
      <a-space>
        <a-input v-model:value="formState.a" placeholder="人员名称" />
      </a-space>
    </div>
    <div class="page_condition_controler">
      <a-button type="primary">搜索</a-button>
    </div>
  </div>
  <div class="page_result">
    <div class="result_extra_control">
      <a-button type="primary" size="small" @click="showAddModal"
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

  <!-- 新增 派单 -->
  <a-modal
    v-model:visible="addModalVisible"
    title="人员 新增"
    width="600px"
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
      <a-form-item name="a" label="工号">
        <a-input v-model:value="formState.c" />
      </a-form-item>
      <a-form-item name="b" label="姓名">
        <a-input v-model:value="formState.c" />
      </a-form-item>
      <a-form-item name="c" label="联系电话">
        <a-input v-model:value="formState.c" />
      </a-form-item>
      <a-form-item name="d" label="入职时间">
        <a-range-picker v-model:value="formState.b" style="width: 100%" />
      </a-form-item>
    </a-form>
  </a-modal>

  <!--  派单 编辑 -->
  <a-modal
    v-model:visible="editModalVisible"
    title="人员 编辑"
    width="600px"
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
      <a-form-item name="a" label="工号">
        <a-input v-model:value="formState.c" />
      </a-form-item>
      <a-form-item name="b" label="姓名">
        <a-input v-model:value="formState.c" />
      </a-form-item>
      <a-form-item name="c" label="联系电话">
        <a-input v-model:value="formState.c" />
      </a-form-item>
      <a-form-item name="d" label="入职时间">
        <a-range-picker v-model:value="formState.b" style="width: 100%" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { defineComponent, reactive, ref, toRaw } from "vue";
  import CONSTANT_PERSONNEL_LIST from "../utils/constantPersonnelList";

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
        columns: CONSTANT_PERSONNEL_LIST.TABLE_COLUMNS,
      };
    },
    setup() {
      const formRef = ref();
      const loading = ref(false);
      const addModalVisible = ref(false);
      const editModalVisible = ref(false);
      const stockModalVisible = ref(false);
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
      const activeKey = ref(["1"]);

      const formState = reactive({
        a: [],
        b: "",
        c: "",
        d: "jack",
        e: "",
        f: "",
        g: "",
        h: "",
        i: "",
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

      const stockModalShow = () => {
        console.log("123123123");
        stockModalVisible.value = true;
      };

      const stockModalClose = () => {
        stockModalVisible.value = false;
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
        stockModalVisible,
        formState,
        formRef,
        labelCol: { style: { width: "120px" } },
        wrapperCol: { span: 24 },
        fileList,
        headers: {
          authorization: "authorization-text",
        },
        editModalFileList,
        activeKey,
        showAddModal,
        addModalSubmit,
        addModalClose,
        showEditModal,
        editModalSubmit,
        editModalClose,
        stockModalShow,
        stockModalClose,
        handleChange,
        focus,
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
