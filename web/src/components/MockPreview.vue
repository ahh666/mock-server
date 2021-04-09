<template>
  <a-modal :visible="showMockPreviewModal" width="65%" title="返回数据预览" @cancel="closeModel">
    <template #footer>
      <a-button type="primary" @click="closeModel">知道了</a-button>
    </template>
    <div class="reload">
      <a-button @click="reloadPreview"
        >重新加载
        <template #icon>
          <SyncOutlined />
        </template>
      </a-button>
    </div>
    <a-textarea v-model:value="mockPreviewString" :auto-size="{ minRows: 2, maxRows: 40 }" placeholder="预览" />
  </a-modal>
</template>

<script>
import Mock from "mockjs";
import { SyncOutlined } from "@ant-design/icons-vue";
export default {
  components: { SyncOutlined },
  props: {
    showMockPreviewModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mockPreviewString: "",
    };
  },
  created() {
    this.reloadPreview();
  },
  methods: {
    reloadPreview() {
      const mockdata = this.$utils.initPreviewData(this.$store.state.interfaceModule.interfaceData.resBody[0].items);
      this.mockPreviewString = JSON.stringify(Mock.mock(mockdata), null, "\t");
    },
    closeModel() {
      this.$emit("update:showMockPreviewModal", !this.showMockPreviewModal);
    },
  },
};
</script>
<style lang="less" scoped>
.reload {
  margin-bottom: 8px;
  text-align: right;
}
</style>
