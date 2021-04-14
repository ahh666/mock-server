<template>
  <div class="menu-box">
    <a-menu mode="inline" v-model:selectedKeys="selectedKeys" @select="selectMenu">
      <a-menu-item key="all" class="all has-options-btn"
        >全部接口
        <span>
          <a-tooltip>
            <template #title>添加接口</template>
            <PlusSquareOutlined @click="addInterface" />
          </a-tooltip>
        </span>
      </a-menu-item>
      <div class="none" v-if="interfaceList.length < 1">无数据</div>
      <a-menu-item v-for="item in interfaceList" :key="item._id" class="has-options-btn">
        <span>{{ item.name }}</span>
        <span class="del-btn">
          <a-tooltip>
            <template #title>删除此接口</template>
            <MinusSquareOutlined @click.stop="delInterface(item._id)" />
          </a-tooltip>
        </span>
      </a-menu-item>
    </a-menu>
    <!-- 添加接口弹窗 -->
    <CreateInterfaceModal v-if="showCreateInterfaceModal" v-model:showCreateModal="showCreateInterfaceModal" />
  </div>
</template>

<script>
import { PlusSquareOutlined, MinusSquareOutlined } from "@ant-design/icons-vue";
import CreateInterfaceModal from "@/components/project/CreateInterfaceModal";
export default {
  components: { PlusSquareOutlined, MinusSquareOutlined, CreateInterfaceModal },
  props: {
    interfaceList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showCreateInterfaceModal: false,
      selectedKeys: [""],
    };
  },
  inject: ["getInterfaceList"],
  mounted() {
    const iid = this.$route.params.iid;
    this.selectedKeys[0] = iid || "all";
  },
  methods: {
    selectMenu({ key }) {
      if (key === "all") {
        return this.goProjectHome();
      }
      this.selectedKeys[0] = key;
      this.$router.push(`/project/${this.$route.params.pid}/interface/${key}`);
    },
    goProjectHome() {
      this.$router.push(`/project/${this.$route.params.pid}`);
    },
    addInterface() {
      this.showCreateInterfaceModal = true;
    },
    delInterface(id) {
      this.$api.delInterface({ id }).then((res) => {
        if (res.error_no === null) {
          this.$msg.success("删除成功！");
          this.getInterfaceList();
          this.selectedKeys[0] = "all";
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.menu-box {
  position: fixed;
  top: 53px;
  bottom: 0;
  width: 260px;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
  .all {
    font-size: 16px;
  }
  .none {
    padding: 40px 100px;
  }
  .del-btn {
    display: none;
  }
  .has-options-btn {
    display: flex;
    justify-content: space-between;
    &:hover {
      .del-btn {
        display: inline-block;
      }
    }
  }
}
</style>
