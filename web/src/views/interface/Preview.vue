<template>
  <div class="interface-preview">
    <h3 class="title">基本信息</h3>
    <PreviewBase />

    <h3 class="title">请求参数</h3>
    <PreviewRequest />

    <h3 class="title">返回参数</h3>
    <div class="response"></div>
  </div>
</template>

<script>
import PreviewBase from "@/components/interface/PreviewBase";
import PreviewRequest from "@/components/interface/PreviewRequest";
export default {
  components: {
    PreviewBase,
    PreviewRequest,
  },
};
</script>

<style lang="less" scoped>
.interface-preview {
  padding: 10px 20px;
  h3 {
    padding-left: 6px;
    margin-bottom: 20px;
    border-left: 3px solid #2395f1;
  }
  .base {
    padding: 0 20px;
    margin-bottom: 40px;
    p {
      line-height: 30px;
    }
    strong {
      margin-right: 20px;
    }
  }
}
</style>
