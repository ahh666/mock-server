<template>
  <div class="response-editor-item">
    <div class="editor-item-down-icon">
      <DownOutlined v-show="showFoldBtn" />
    </div>
    <a-input
      v-model:value="field.name"
      class="editor-item-name"
      placeholder="字段名称"
      :disabled="field.nameDisabled || rootDisabled"
    ></a-input>
    <div class="editor-item-config">
      <a-select
        v-model:value="field.type"
        style="width: 120px"
        placeholder="字段类型"
        :disabled="rootDisabled"
        @change="fieldTypeChange"
      >
        <a-select-option v-for="item in dataType" :key="item" :value="item">{{ item }}</a-select-option>
      </a-select>
      <a-radio-group>
        <a-select
          v-model:value="field.mock"
          show-search
          style="width: 120px; margin-left: 4px"
          placeholder="mock格式"
          :disabled="mockDisabled"
        >
          <a-select-option v-for="item in mockSource" :key="item.mock" :value="item.mock">{{
            item.mock
          }}</a-select-option>
        </a-select>
        <a-button class="mock-setting-btn" @click="openMockSetting" :disabled="mockDisabled">
          <template #icon>
            <SettingOutlined />
          </template>
        </a-button>
      </a-radio-group>
      <a-input v-model:value="field.note" placeholder="备注" class="note margin-lf-6" :disabled="rootDisabled">
      </a-input>
    </div>
    <PlusOutlined style="color: #2395f1" class="editor-item-option-icon" @click="addHandler" />
    <CloseOutlined style="color: #ff561b" class="editor-item-option-icon" @click="delHandler" />
    <!-- 自定义mock设置弹窗 -->
    <a-modal v-model:visible="showCustomModal" width="65%" title="自定义mock设置" @ok="saveCustomMock">
      <a-textarea v-model:value="customMock" :auto-size="{ minRows: 2 }" placeholder="自定义mock" />
      <div class="custom-mock-btn">
        <a-button @click="preview"
          >预 览
          <template #icon>
            <SyncOutlined />
          </template>
        </a-button>
      </div>
      <div class="custom-mock-preview">{{ customMockPreview }}</div>
    </a-modal>
  </div>
</template>

<script>
import Mock from "mockjs";
import { PlusOutlined, CloseOutlined, DownOutlined, SettingOutlined, SyncOutlined } from "@ant-design/icons-vue";
import { dataType } from "@/utils/dictionary/interface";
import { MOCK_SOURCE } from "@/utils/dictionary/mockSource";
export default {
  components: { PlusOutlined, CloseOutlined, DownOutlined, SettingOutlined, SyncOutlined },
  props: {
    fieldData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dataType,
      mockSource: MOCK_SOURCE,
      field: {},
      showCustomModal: false,
      // 自定义mock公式
      customMock: "",
      // 自定义mock预览字符
      customMockPreview: "",
    };
  },
  computed: {
    showFoldBtn() {
      return this.field.type === "Object";
    },
    rootDisabled() {
      return this.field.name === "root";
    },
    mockDisabled() {
      return ["Null", "Object", "Array"].includes(this.field.type) || this.rootDisabled;
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
    preview() {
      this.customMockPreview = Mock.mock(this.customMock);
    },
    // 打开设置界面
    openMockSetting() {
      if (!this.customMock) {
        const mock = this.field.mock;
        this.customMock = mock;
      }
      this.showCustomModal = true;
    },
    // 保存自定义mock字段
    saveCustomMock() {
      this.field.customMock = this.customMock;
      this.showCustomModal = false;
    },
    // 字段类型改变后的操作
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
.mock-setting-btn:not(:disabled) {
  background: #efefef;
  color: #666;
}
.custom-mock-btn {
  text-align: right;
  margin: 10px 0;
  button {
    margin-left: 10px;
  }
}
.custom-mock-preview {
  width: 100%;
  min-height: 60px;
  background: #eee;
}
</style>
<style lang="less">
.response-editor-item {
  .ant-btn:not(:disabled):hover,
  .ant-btn:not(:disabled):focus {
    border-color: #eee;
  }
}
</style>
