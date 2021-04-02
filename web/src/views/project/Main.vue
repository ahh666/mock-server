<template>
  <div class="project-main">
    <div class="head">
      <h3>接口列表</h3>
      <a-button type="primary" @click="addInterface">添加接口</a-button>
    </div>
    <div class="content">
      <!-- 表格 -->
      <a-table :dataSource="interfaceList" :columns="columns" rowKey="_id">
        <template #path="{ record, text }">
          <span>
            <a-tag :color="$utils.tagColor(record.reqMethod)">{{ record.reqMethod }}</a-tag>
            {{ text }}
          </span>
        </template>
      </a-table>
      <!-- 添加接口弹窗 -->
      <a-modal v-model:visible="showCreateModal" title="添加接口">
        <template #footer>
          <a-button key="back" @click="closeCreateModal">取消</a-button>
          <a-button key="submit" type="primary" :loading="loading" @click="createInterface">确定</a-button>
        </template>
        <a-form ref="newInterfaceForm" :model="newInterfaceForm" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
          <a-form-item label="接口名称" required name="name">
            <a-input v-model:value="newInterfaceForm.name" placeholder="项目名称"></a-input>
          </a-form-item>
          <a-form-item label="接口路径" required name="path">
            <a-input v-model:value="newInterfaceForm.path" placeholder="/path">
              <template #addonBefore>
                <a-select v-model:value="newInterfaceForm.reqMethod">
                  <a-select-option value="get">get</a-select-option>
                  <a-select-option value="post">post</a-select-option>
                </a-select>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item label="注">
            <p>后续可进入详情页进行编辑</p>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    interfaceList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      showCreateModal: false,
      newInterfaceForm: {
        reqMethod: "get",
      },
      columns: [
        {
          title: "接口名称",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "接口路径",
          dataIndex: "path",
          key: "path",
          slots: {
            customRender: "path",
          },
        },
        {
          title: "操作",
          dataIndex: "reqMethod",
          key: "reqMethod",
        },
      ],
    };
  },
  methods: {
    getInterfaceList() {
      this.$emit("getInterfaceList");
    },
    addInterface() {
      this.openCreateModal();
    },
    openCreateModal() {
      this.showCreateModal = true;
    },
    closeCreateModal() {
      this.showCreateModal = false;
    },
    createInterface() {
      this.$refs.newInterfaceForm
        .validate()
        .then(() => {
          this.loading = true;
          const params = {
            ...this.newInterfaceForm,
            pid: this.$route.params.pid,
          };
          this.$api.createInterface(params).then((res) => {
            if (res.error_no === null) {
              this.getInterfaceList();
              this.closeCreateModal();
            }
            this.loading = false;
          });
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.project-main {
  padding: 20px;
}
.head {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  h3 {
    padding-left: 6px;
    border-left: 3px solid #2395f1;
  }
}
</style>
