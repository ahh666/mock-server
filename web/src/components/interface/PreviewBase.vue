<template>
  <div class="base">
    <p>
      <strong>接口名称：</strong>
      <span>{{ info.name }}</span>
    </p>
    <p>
      <strong>接口路径：</strong>
      <span>
        <a-tag :color="$utils.tagColor(info.reqMethod)">{{ info.reqMethod }}</a-tag>
        {{ info.path }}
      </span>
    </p>
    <p>
      <strong>mock地址：</strong>
      <a :href="info.mockUrl" target="_blank">{{ info.mockUrl }}</a>
    </p>
  </div>
</template>

<script>
import interfaceInfoMixins from "@/mixins/interfaceInfo";
export default {
  mixins: [interfaceInfoMixins],
};
</script>

<style lang="less" scoped>
p {
  line-height: 30px;
}
strong {
  margin-right: 20px;
}
</style>
