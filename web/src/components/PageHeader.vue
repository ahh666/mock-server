<template>
  <div class="home-top">
    <span @click="goHome" class="logo cursor-pointer">Mock Server</span>
    <a-menu class="home-menu" mode="horizontal" v-model:selectedKeys="selectedKeys" @select="selectMenu">
      <a-menu-item key="/home">
        <AppstoreOutlined />
        <span>项目列表</span>
      </a-menu-item>
      <a-menu-item key="/setting">
        <SettingOutlined />
        <span>基本配置</span>
      </a-menu-item>
      <a-menu-item key="/about">
        <InfoCircleOutlined />
        <span>关于</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { AppstoreOutlined, SettingOutlined, InfoCircleOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    AppstoreOutlined,
    SettingOutlined,
    InfoCircleOutlined,
  },
  data() {
    return {
      selectedKeys: ["/home"],
    };
  },
  created() {
    this.selectedKeys[0] = this.$route.path;
  },
  methods: {
    selectMenu({ key }) {
      this.$router.push(key);
    },
    goHome() {
      this.$router.push("/home");
    },
  },
});
</script>
<style lang="less" scoped>
.home-top {
  width: 100%;
  height: 51px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
  position: fixed;
  top: 0;
  z-index: 99;
  background: #fff;
  padding: 0 15px;
  display: flex;
  align-items: center;
}
.home-menu {
  height: 51px;
  margin-left: 100px;
}
.logo:hover {
  color: steelblue;
}
</style>
<style>
.home-menu li {
  height: 51px;
  line-height: 51px;
}
</style>
