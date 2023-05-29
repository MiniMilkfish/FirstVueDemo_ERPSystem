<!-- 生产计划表 组件 -->
<template>
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
    title="生产计划 - 新增"
    width="1000px"
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
      <a-form-item name="a" label="生产类型">
        <a-radio-group v-model:value="formState.a">
          <a-radio :value="1">合同项目</a-radio>
          <a-radio :value="2">日常生产</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        name="b"
        label="项目名称"
        :rules="[{ required: true, message: '必填项!' }]"
      >
        <a-input v-model:value="formState.b" />
      </a-form-item>
      <a-form-item name="c" label="产品名称">
        <a-input v-model:value="formState.c" />
      </a-form-item>
      <a-form-item name="e" label="交付日期">
        <a-date-picker v-model:value="formState.e" style="width: 100%" />
      </a-form-item>
      <a-form-item name="f" label="产品型号">
        <a-input v-model:value="formState.f" />
      </a-form-item>
      <a-form-item name="i" label="配件清单">
        <a-table
          :columns="[
            {
              title: '序号',
              key: 'a',
              dataIndex: 'a',
              width: 80,
              align: 'center',
            },
            {
              title: '名称',
              key: 'b',
              dataIndex: 'b',
              width: 80,
            },
            {
              title: '型号',
              key: 'c',
              dataIndex: 'c',
              width: 80,
            },
            {
              title: '类别',
              key: 'd',
              dataIndex: 'd',
              width: 80,
            },
            {
              title: '数量',
              key: 'e',
              dataIndex: 'e',
              width: 80,
            },
            {
              title: '单位',
              key: 'f',
              dataIndex: 'f',
              width: 80,
            },
          ]"
          :data-source="[]"
          :scroll="{ x: 800, y: 180 }"
          size="small"
          style="width: 832px"
        >
        </a-table>
      </a-form-item>
      <a-form-item name="g" label="装配数量">
        <a-space size="middle">
          <a-input-number
            id="inputNumber"
            v-model:value="formState.g"
            :min="1"
            :max="10"
          />
          <a-button type="primary" style="width: 120px" @click="stockModalShow"
            >仓库余量统计</a-button
          >
        </a-space>
      </a-form-item>
      <a-form-item name="h" label="计划排期">
        <a-range-picker v-model:value="formState.h" style="width: 100%" />
      </a-form-item>
      <a-form-item name="d" label="状态">
        <a-select
          ref="select"
          v-model:value="formState.d"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="jack">可执行</a-select-option>
          <a-select-option value="lucy">待确认</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>

  <!--  编辑 -->
  <a-modal
    v-model:visible="editModalVisible"
    title="生产计划表 - 编辑"
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
      <a-descriptions title="XXXX 项目"> </a-descriptions>
    </a-form>
  </a-modal>

  <!-- 仓库余量统计 -->
  <a-modal
    v-model:visible="stockModalVisible"
    title="生产计划表 - 仓库余量统计"
    width="800px"
  >
    <template #footer>
      <a-button key="back" @click="stockModalClose">关闭</a-button>
    </template>
    <a-form
      ref="formRef"
      :model="formState"
      layout="horizontal"
      name="form_in_modal"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item name="g" label="现有成品">
        <a-space size="middle">
          <a-input-number
            id="inputNumber"
            v-model:value="formState.g"
            :min="1"
            :max="10"
          />
          套
        </a-space>
      </a-form-item>
       <a-form-item name="g" label="尚需装配">
        <a-space size="middle">
          <a-input-number
            id="inputNumber"
            v-model:value="formState.g"
            :min="1"
            :max="10"
          />
          套
        </a-space>
      </a-form-item>
      <a-form-item name="i" label="配件情况说明">
        <a-table
          :columns="[
            {
              title: '序号',
              key: 'a',
              dataIndex: 'a',
              align: 'center',
            },
            {
              title: '名称',
              key: 'b',
              dataIndex: 'b'
            },
            {
              title: '型号',
              key: 'c',
              dataIndex: 'c'
            },
            {
              title: '类别',
              key: 'd',
              dataIndex: 'd'
            },
            {
              title: '现有库存数量',
              key: 'e',
              dataIndex: 'e'
            },
            {
              title: '单位',
              key: 'f',
              dataIndex: 'f'
            },
          ]"
          :data-source="[]"
          :scroll="{ y: 180 }"
          size="small"
          style="width: 630px"
        >
        </a-table>
      </a-form-item>
      <a-form-item name="i" label="尚需采购">
        <a-table
          :columns="[
            {
              title: '序号',
              key: 'a',
              dataIndex: 'a',
              align: 'center',
            },
            {
              title: '名称',
              key: 'b',
              dataIndex: 'b'
            },
            {
              title: '型号',
              key: 'c',
              dataIndex: 'c'
            },
            {
              title: '类别',
              key: 'd',
              dataIndex: 'd'
            },
            {
              title: '数量',
              key: 'e',
              dataIndex: 'e'
            },
            {
              title: '单位',
              key: 'f',
              dataIndex: 'f'
            },
          ]"
          :data-source="[]"
          :scroll="{ y: 180 }"
          size="small"
          style="width: 630px"
        >
        </a-table>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { defineComponent, reactive, ref, toRaw } from "vue";
  import CONSTANT_PRODUCTION_SCHEDULE from "../utils/constantProductionSchedule";

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
        columns: CONSTANT_PRODUCTION_SCHEDULE.TABLE_COLUMNS,
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

      const formState = reactive({
        a: 1,
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
          32 -
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
