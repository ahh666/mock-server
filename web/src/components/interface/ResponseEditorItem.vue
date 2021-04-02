<template>
  <div class="response-editor-item">
    <div class="editor-item-down-icon">
      <DownOutlined v-show="showFoldBtn" />
    </div>
    <a-input
      v-model:value="field.name"
      class="editor-item-name"
      placeholder="字段名称"
      :disabled="field.nameDisabled"
    ></a-input>
    <div class="editor-item-config">
      <a-select v-model:value="field.type" style="width: 120px" placeholder="字段类型" @change="fieldTypeChange">
        <a-select-option v-for="item in dataType" :key="item" :value="item">{{ item }}</a-select-option>
      </a-select>
      <a-select
        v-model:value="field.mock"
        style="width: 120px; margin-left: 4px"
        placeholder="mock格式"
        :disabled="mockDisabled"
      >
        <a-select-option v-for="item in mockFormat" :key="item" :value="item">{{ item }}</a-select-option>
      </a-select>
      <a-input v-model:value="field.note" placeholder="备注" class="note margin-lf-6"></a-input>
    </div>
    <PlusOutlined style="color: #2395f1" class="editor-item-option-icon" @click="addHandler" />
    <CloseOutlined style="color: #ff561b" class="editor-item-option-icon" @click="delHandler" />
  </div>
</template>

<script>
import { PlusOutlined, CloseOutlined, DownOutlined } from "@ant-design/icons-vue";
import { dataType, mockFormat } from "@/utils/dictionary/interface";
export default {
  components: { PlusOutlined, CloseOutlined, DownOutlined },
  props: {
    fieldData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dataType,
      mockFormat,
      field: {},
    };
  },
  computed: {
    showFoldBtn() {
      return this.field.type === "Object";
    },
    mockDisabled() {
      return this.field.type === "Object" || this.field.type === "Array";
    },
  },
  created() {
    this.field = this.fieldData;
  },
  methods: {
    addHandler() {
      this.$emit("addHandler");
    },
    delHandler() {
      this.$emit("delHandler");
    },
    fieldTypeChange() {
      if (this.field.type === "Array") {
        return (this.field.items = [
          {
            name: "items",
            type: "",
            note: "",
            nameDisabled: true,
          },
        ]);
      }
      if (this.field.type === "Object") {
        return (this.field.items = [
          {
            name: "properties",
            type: "",
            note: "",
          },
        ]);
      }
      if (this.field.type !== "Object") {
        return (this.field.items = []);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.margin-lf-6 {
  margin-left: 4px;
}
.response-editor-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .editor-item-name {
    flex: 1;
    margin: 0 12px 0 6px;
  }
  .note {
    width: 200px;
  }
}
.editor-item-down-icon {
  width: 14px;
  height: 100%;
}
.editor-item-option-icon {
  margin-left: 8px;
  display: none;
}
</style>
