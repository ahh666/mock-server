<template>
  <div class="response-editor">
    <div v-for="(data, key) in responseEditorData" :key="data.name">
      <ResponseEditorItem
        class="response-editor-item"
        :fieldData="data"
        @addHandler="addResponseEditorItem"
        @delHandler="delResponseEditorItem(key)"
      />
      <div v-if="data.type === 'Object'" class="response-editor-recursion">
        <ResponseEditor :responseEditorData="data.items" />
      </div>
      <div v-if="data.type === 'Array'" class="response-editor-recursion">
        <ResponseEditor :responseEditorData="data.items" />
      </div>
    </div>
  </div>
</template>
<script>
import ResponseEditorItem from "./ResponseEditorItem";
import ResponseEditor from "./RequestEditor";
export default {
  components: { ResponseEditorItem, ResponseEditor },
  props: {
    responseEditorData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      fieldCount: 0,
    };
  },
  methods: {
    recursion(data) {
      return this.isArray(data) || this.isObject(data);
    },
    isArray(data) {
      return Object.prototype.toString.call(data) === "[object Array]";
    },
    isObject(data) {
      return Object.prototype.toString.call(data) === "[object Object]";
    },
    addResponseEditorItem() {
      return this.fieldCount++;
    },
    delResponseEditorItem(key) {
      return key;
    },
  },
};
</script>

<style lang="less" scoped>
.response-editor {
  width: 100%;
}

.response-editor-recursion {
  padding-left: 20px;
}
.response-editor-item {
  margin-bottom: 8px;
}
</style>
