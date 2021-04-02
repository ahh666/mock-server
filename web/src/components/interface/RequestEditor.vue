<template>
  <div>
    <a-input-group class="request-item" compact>
      <a-input v-model:value="queryData.name" placeholder="入参字段名" class="input"></a-input>
      <a-select v-model:value="queryData.type" style="width: 120px" placeholder="字段类型">
        <a-select-option v-for="item in dataType" :key="item" :value="item">{{ item }}</a-select-option>
      </a-select>
      <a-select v-model:value="queryData.required" style="width: 120px" placeholder="是否必传">
        <a-select-option value="1">必传</a-select-option>
        <a-select-option value="0">非必传</a-select-option>
      </a-select>
      <a-input v-model:value="queryData.sample" placeholder="示例" class="input"></a-input>
      <a-input v-model:value="queryData.note" placeholder="备注" class="input"></a-input>
      <DeleteOutlined style="font-size: 16px; margin: 8px 0 0 8px" @click="delQuery" />
    </a-input-group>
  </div>
</template>

<script>
import { dataType } from "@/utils/dictionary/interface";
import { DeleteOutlined } from "@ant-design/icons-vue";
export default {
  components: { DeleteOutlined },
  props: {
    query: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dataType: dataType,
      queryData: {},
    };
  },
  mounted() {
    this.queryData = this.query;
  },
  methods: {
    delQuery() {
      this.$emit("delQuery");
    },
  },
};
</script>

<style lang="less" scoped>
.request-item {
  .input {
    width: 22%;
  }
}
</style>
