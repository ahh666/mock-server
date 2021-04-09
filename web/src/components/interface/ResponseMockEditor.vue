<template>
  <div class="mock-editor">
    <a-button type="primary" style="margin-bottom: 8px" @click="HandleMockFormula">执行公式</a-button>
    <div class="mock-editor-box">
      <a-textarea v-model:value="mockFormula" :auto-size="{ minRows: 15 }" placeholder="输入mock公式" />
      <a-textarea :value="mockData" :auto-size="{ minRows: 15 }" placeholder="点击执行mock预览数据" />
    </div>
  </div>
</template>

<script>
import Mock from "mockjs";
export default {
  data() {
    return {
      mockFormula: "",
      mockData: "",
    };
  },
  methods: {
    HandleMockFormula() {
      const mockObj = Mock.mock(JSON.parse(this.mockFormula));
      this.mockData = JSON.stringify(mockObj, null, "\t");
    },
  },
};
</script>

<style lang="less" scoped>
.mock-editor-box {
  display: flex;
}
</style>
