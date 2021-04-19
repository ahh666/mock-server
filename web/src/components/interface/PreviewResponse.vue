<template>
  <div class="preview-response">
    <pre>{{ mockData }}</pre>
  </div>
</template>

<script>
import interfaceInfoMixins from "@/mixins/interfaceInfo";
import { mock } from "mockjs";
export default {
  mixins: [interfaceInfoMixins],
  computed: {
    mockData() {
      const mockObj = mock(this.info.mockFormula);
      return JSON.stringify(mockObj, null, 4);
    },
  },
};
</script>

<style lang="less" scoped>
.preview-response {
  background: #efefef;
  padding: 8px;
}
</style>
