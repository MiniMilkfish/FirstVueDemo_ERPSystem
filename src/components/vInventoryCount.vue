<!-- 库存盘点 组件 -->
<template>
  <div class="page_control_container">
    <div class="page_condition">
      <a-space>
        <a-date-picker v-model:value="formState.e" style="width: 100%" />
        <a-select
          ref="select"
          v-model:value="formState.a"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="a">全部仓库</a-select-option>
          <a-select-option value="b">主仓库</a-select-option>
          <a-select-option value="c">杭州仓库</a-select-option>
        </a-select>
        <a-select
          ref="select"
          v-model:value="formState.c"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="a">类别</a-select-option>
        </a-select>
        <a-input v-model:value="formState.b" placeholder="产品/配件名称" />
      </a-space>
    </div>
    <div class="page_condition_controler">
      <a-button type="primary">查询</a-button>
    </div>
  </div>
  <div class="page_result">
    <div class="result_extra_control">
      <a-space>
        <a-button type="primary" size="small" @click="showStockInModal"
          >保存盘点结果</a-button
        >
        <a-button type="primary" size="small" @click="showStockOutModal"
          >导出系统库存</a-button
        >
        <a-button type="primary" size="small" @click="showEditModal"
          >导入库存盘点</a-button
        >
        <a-button type="primary" size="small" @click="showEditModal"
          >生成盘点数据</a-button
        >
      </a-space>
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
              >查看</a-button
            >
            <a-button danger size="small">删除</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>

  <!-- 入库 -->
  <a-modal
    v-model:visible="stockInModalVisible"
    title="入库"
    width="1000px"
    @ok="stockInModalSubmit"
  >
    <template #footer>
      <a-button key="back" @click="stockInModalClose">关闭</a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="stockInModalSubmit"
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
      <a-form-item name="a" label="类别">
        <a-radio-group v-model:value="formState.a">
          <a-radio :value="1">配件</a-radio>
          <a-radio :value="2">产品</a-radio>
          <a-radio :value="3">定制加工件</a-radio>
          <a-radio :value="4">半成品</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item name="c" label="仓库">
        <a-select
          ref="select"
          v-model:value="formState.a"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="a">全部仓库</a-select-option>
          <a-select-option value="b">主仓库</a-select-option>
          <a-select-option value="c">杭州仓库</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="c" label="所属分类">
        <a-select
          ref="select"
          v-model:value="formState.g"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="1">1</a-select-option>
          <a-select-option value="2">2</a-select-option>
          <a-select-option value="3">3</a-select-option>
          <a-select-option value="4">4</a-select-option>
          <a-select-option value="5">5</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="c" label="配件状态">
        <a-select
          ref="select"
          v-model:value="formState.g"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="1">全新</a-select-option>
          <a-select-option value="2">返修</a-select-option>
          <a-select-option value="3">报废</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="c" label="型号">
        <a-select
          ref="select"
          v-model:value="formState.g"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="1">1</a-select-option>
          <a-select-option value="2">2</a-select-option>
          <a-select-option value="3">3</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="a" label="产品/配件名称">
        <a-input
          v-model:value="formState.a"
          placeholder="请填写产品/配件名称"
        />
      </a-form-item>
      <a-form-item name="c" label="供应商">
        <a-select
          ref="select"
          v-model:value="formState.g"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="1">1</a-select-option>
          <a-select-option value="2">2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="e" label="标签">
        <a-textarea
          v-model:value="formState.e"
          placeholder="逐行输入，一行一台设备"
          auto-size
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item name="b" label="质保范围">
        <a-range-picker v-model:value="formState.b" style="width: 100%" />
      </a-form-item>
      <a-form-item name="a" label="数量">
        <a-input-group compact>
          <a-input
            v-model:value="formState.a"
            style="width: 20%"
            placeholder="工地编号"
          />
          <a-select
            ref="select"
            v-model:value="formState.g"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="1">单位</a-select-option>
          </a-select>
        </a-input-group>
      </a-form-item>
      <a-form-item name="a" label="批次">
        <a-input v-model:value="formState.a" placeholder="请填写批次" />
      </a-form-item>
      <a-form-item name="e" label="入库时间">
        <a-date-picker v-model:value="formState.e" style="width: 100%" />
      </a-form-item>
      <a-form-item name="e" label="备注">
        <a-textarea
          v-model:value="formState.e"
          placeholder="备注"
          auto-size
          style="width: 100%"
        />
      </a-form-item>
    </a-form>
  </a-modal>

  <!-- 出库 -->
  <a-modal
    v-model:visible="stockOutModalVisible"
    title="出库"
    width="1000px"
    @ok="stockOutModalSubmit"
  >
    <template #footer>
      <a-button key="back" @click="stockOutModalClose">关闭</a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="stockOutModalSubmit"
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
      <a-form-item name="a" label="类别">
        <a-radio-group v-model:value="formState.a">
          <a-radio :value="1">配件</a-radio>
          <a-radio :value="2">产品</a-radio>
          <a-radio :value="3">定制加工件</a-radio>
          <a-radio :value="4">半成品</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item name="c" label="仓库">
        <a-select
          ref="select"
          v-model:value="formState.a"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="a">全部仓库</a-select-option>
          <a-select-option value="b">主仓库</a-select-option>
          <a-select-option value="c">杭州仓库</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="c" label="所属分类">
        <a-select
          ref="select"
          v-model:value="formState.g"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="1">1</a-select-option>
          <a-select-option value="2">2</a-select-option>
          <a-select-option value="3">3</a-select-option>
          <a-select-option value="4">4</a-select-option>
          <a-select-option value="5">5</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="c" label="型号">
        <a-select
          ref="select"
          v-model:value="formState.g"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="1">1</a-select-option>
          <a-select-option value="2">2</a-select-option>
          <a-select-option value="3">3</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="a" label="产品/配件名称">
        <a-input
          v-model:value="formState.a"
          placeholder="请填写产品/配件名称"
        />
      </a-form-item>
      <a-form-item name="c" label="供应商">
        <a-select
          ref="select"
          v-model:value="formState.g"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="1">1</a-select-option>
          <a-select-option value="2">2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="e" label="标签">
        <a-textarea
          v-model:value="formState.e"
          placeholder="逐行输入，一行一台设备"
          auto-size
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item name="b" label="质保范围">
        <a-range-picker v-model:value="formState.b" style="width: 100%" />
      </a-form-item>
      <a-form-item name="a" label="数量">
        <a-input-group compact>
          <a-input
            v-model:value="formState.a"
            style="width: 20%"
            placeholder="工地编号"
          />
          <a-select
            ref="select"
            v-model:value="formState.g"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="1">单位</a-select-option>
          </a-select>
        </a-input-group>
      </a-form-item>
      <a-form-item name="a" label="批次">
        <a-input v-model:value="formState.a" placeholder="请填写批次" />
      </a-form-item>
      <a-form-item name="e" label="入库时间">
        <a-date-picker v-model:value="formState.e" style="width: 100%" />
      </a-form-item>
      <a-form-item name="e" label="备注">
        <a-textarea
          v-model:value="formState.e"
          placeholder="备注"
          auto-size
          style="width: 100%"
        />
      </a-form-item>
    </a-form>
  </a-modal>

  <!-- 仓库设置 -->
  <a-modal
    v-model:visible="editModalVisible"
    title="仓库设置"
    width="1000px"
    @ok="stockInModalSubmit"
  >
    <template #footer>
      <a-button key="back" @click="editModalClose">关闭</a-button>
    </template>
    <a-table
      :columns="[
        {
          title: '序号',
          width: 200,
          key: 'a',
          dataIndex: 'a',
          align: 'center',
        },
        {
          title: '仓库名称',
          width: 200,
          key: 'b',
          dataIndex: 'b',
        },
        {
          title: '操作',
          width: 150,
          key: 'operation',
          align: 'center',
          dataIndex: 'operation',
          fixed: 'right',
        },
      ]"
      :data-source="[]"
      :scroll="{ x: 600 }"
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
  </a-modal>
</template>

<script>
  import { defineComponent, reactive, ref, toRaw } from "vue";
  import CONSTANT_INVENTORY_COUNT from "../utils/constantInventoryCount";

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
        columns: CONSTANT_INVENTORY_COUNT.TABLE_COLUMNS,
      };
    },
    setup() {
      const formRef = ref();
      const loading = ref(false);
      const stockInModalVisible = ref(false);
      const stockOutModalVisible = ref(false);
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
        a: "a",
        b: "",
        c: "a",
        d: "",
        e: "",
        f: "",
        g: "",
        h: "",
        i: "",
        modifier: "public",
      });

      const showStockInModal = () => {
        stockInModalVisible.value = true;
      };

      const showStockOutModal = () => {
        stockOutModalVisible.value = true;
      };

      const stockInModalSubmit = () => {
        formRef.value
          .validateFields()
          .then(values => {
            loading.value = true;
            setTimeout(() => {
              loading.value = false;
              stockInModalVisible.value = false;
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

      const stockOutModalSubmit = () => {
        formRef.value
          .validateFields()
          .then(values => {
            loading.value = true;
            setTimeout(() => {
              loading.value = false;
              stockOutModalVisible.value = false;
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

      const stockInModalClose = () => {
        stockInModalVisible.value = false;
      };

      const stockOutModalClose = () => {
        stockOutModalVisible.value = false;
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
        stockInModalVisible,
        stockOutModalVisible,
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
        showStockInModal,
        stockInModalSubmit,
        stockInModalClose,
        showStockOutModal,
        stockOutModalSubmit,
        stockOutModalClose,
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
