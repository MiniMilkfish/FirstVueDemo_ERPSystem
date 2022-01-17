<!-- 库存概况 组件 -->
<template>
  <div class="page_result">
    <div class="result_extra_control">
      <a-descriptions title="现有库存" />
    </div>
    <a-table
      :columns="columns"
      :data-source="data"
      :scroll="{ x: 1200, y: tableHeight }"
      :pagination="{ showQuickJumper: true }"
    />
  </div>
</template>

<script>
  import { defineComponent, reactive, ref, toRaw } from "vue";
  import CONSTANT_STOCK_SUMMARY from "../utils/constantStockSummary";

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
        columns: CONSTANT_STOCK_SUMMARY.TABLE_COLUMNS,
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
        labelCol: { style: { width: "180px", textAlign: "right" } },
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
          75 -
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
