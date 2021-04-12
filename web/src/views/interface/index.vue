<template>
  <div>
    <a-tabs v-model:activeKey="activeKey" :animated="false">
      <a-tab-pane key="1" tab="预览"><Preview v-if="activeKey === '1'" /></a-tab-pane>
      <a-tab-pane key="2" tab="编辑" force-render
        ><Edit v-if="activeKey === '2'" @getInterfaceList="getInterfaceList"
      /></a-tab-pane>
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
      const interfaceData = {
        reqBody: [],
        resBody: [],
      };
      this.$api.interfaceList(params).then((res) => {
        if (res.error_no === null) {
          this.$store.state.interfaceModule.interfaceData = Object.assign(interfaceData, res.data[0]);
        }
      });
    },
  },
};
</script>

<style></style>
