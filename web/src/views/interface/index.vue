<template>
  <div>
    <a-tabs v-model:activeKey="activeKey" :animated="false">
      <a-tab-pane key="1" tab="预览"><Preview /></a-tab-pane>
      <a-tab-pane key="2" tab="编辑" force-render><Edit @getInterfaceList="getInterfaceList" /></a-tab-pane>
      <a-tab-pane key="3" tab="More" disabled></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Preview from "./Preview";
import Edit from "./Edit";
export default {
  components: { Preview, Edit },
  data() {
    return {
      activeKey: "1",
    };
  },
  computed: {
    routeParamsIid() {
      return this.$route.params.iid;
    },
  },
  watch: {
    routeParamsIid: {
      handler(val) {
        this.activeKey = "1";
        this.getInterfaceList({ _id: val });
      },
      immediate: true,
    },
  },
  methods: {
    getInterfaceList(params = {}) {
      this.$api.interfaceList(params).then((res) => {
        if (res.error_no === null) {
          Object.assign(this.$store.state.interfaceModule.interfaceData, res.data[0]);
        }
      });
    },
  },
};
</script>

<style></style>
