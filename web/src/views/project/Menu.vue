<template>
  <div class="menu-box">
    <a-menu mode="inline" v-model:selectedKeys="selectedKeys" @select="selectMenu">
      <a-menu-item key="all" class="all">全部接口</a-menu-item>
      <div class="none" v-if="interfaceList.length < 1">无数据</div>
      <a-menu-item v-for="item in interfaceList" :key="item._id">
        <span>{{ item.name }}</span>
      </a-menu-item>
    </a-menu>
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
      selectedKeys: [""],
    };
  },
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
}
</style>
