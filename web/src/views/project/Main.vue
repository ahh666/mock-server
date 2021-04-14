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
      <CreateInterfaceModal v-if="showCreateInterfaceModal" v-model:showCreateModal="showCreateInterfaceModal" />
    </div>
  </div>
</template>

<script>
import CreateInterfaceModal from "@/components/project/CreateInterfaceModal";
export default {
  components: {
    CreateInterfaceModal,
  },
  props: {
    interfaceList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showCreateInterfaceModal: false,
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
    addInterface() {
      this.showCreateInterfaceModal = true;
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
