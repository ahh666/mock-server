<template>
  <div class="project-home">
    <Menu :interfaceList="interfaceList" />
    <div class="main">
      <Main v-show="showMain" :interfaceList="interfaceList" />
      <div class="main-view"><router-view></router-view></div>
    </div>
  </div>
</template>

<script>
import Menu from "./Menu";
import Main from "./Main";

export default {
  components: { Menu, Main },
  data() {
    return {
      interfaceList: [],
    };
  },
  computed: {
    showMain() {
      return this.$route.path === "/project/" + this.$route.params.pid;
    },
  },
  provide() {
    return {
      getInterfaceList: this.getInterfaceList,
    };
  },
  created() {
    this.getInterfaceList();
  },
  methods: {
    getInterfaceList() {
      this.$api.interfaceList({ pid: this.$route.params.pid }).then((res) => {
        if (res.error_no === null) {
          this.interfaceList = res.data;
        }
      });
    },
  },
};
</script>

<style lang="less">
.project-home {
  position: fixed;
  top: 51px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(247, 248, 250);
  overflow-y: scroll;
  .main {
    background: #fff;
    position: fixed;
    top: 58px;
    left: 268px;
    right: 0;
    bottom: 0;
    min-width: 900px;
    overflow-y: scroll;
  }
}
</style>
