<template>
  <div class="interface-preview">
    <h3 class="title">基本信息</h3>
    <PreviewBase class="base" />

    <h3 class="title">请求参数</h3>
    <PreviewRequest />

    <h3 class="title">返回参数</h3>
    <PreviewResponse />
  </div>
</template>

<script>
import PreviewBase from "@/components/interface/PreviewBase";
import PreviewRequest from "@/components/interface/PreviewRequest";
import PreviewResponse from "@/components/interface/PreviewResponse";
export default {
  components: {
    PreviewBase,
    PreviewRequest,
    PreviewResponse,
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
    & ~ h3 {
      margin-top: 25px;
    }
  }
  .base {
    padding: 0 20px;
  }
}
</style>
