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
        <template #options="{ record }">
          <a-popconfirm v-if="interfaceList.length" title="Sure to delete?" @confirm="delInterface(record._id)">
            <a>Delete</a>
          </a-popconfirm>
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
          dataIndex: "options",
          key: "options",
          slots: { customRender: "options" },
        },
      ],
    };
  },
  inject: ["getInterfaceList"],
  methods: {
    addInterface() {
      this.showCreateInterfaceModal = true;
    },
    delInterface(id) {
      console.log(id);
      this.$api.delInterface({ id }).then((res) => {
        if (res.error_no === null) {
          this.$msg.success("删除成功！");
          this.getInterfaceList();
        }
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
