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
    initPreviewData(data) {
      if (!data) {
        return;
      }
      let mock = {};
      data.forEach((item) => {
        let properties = item.name;
        if (item.type === "Array" && item.minRange) {
          properties = `${item.name}|${item.minRange}-${item.maxRange}`;
        }
        mock[properties] = this.mockdataFormat(item);
      });
      return mock;
    },
    mockdataFormat(mockdata) {
      // 数据类型为 null，直接返回null
      if (mockdata.type === "Null") {
        return null;
      }
      // 数据类型为 Object, 则递归
      if (mockdata.type === "Object") {
        return this.initPreviewData(mockdata.items);
      }
      // 数据类型为 Array
      if (mockdata.type === "Array") {
        const arrItem = mockdata.items[0];
        // 数组元素为对象，则需要重新遍历一遍
        if (arrItem.type === "Object") {
          return [this.initPreviewData(arrItem.items)];
        }
        // 为非对象，则正常操作（不考虑为数组的情况）
        return [arrItem.mock || "@string"];
      }
      // 没有mock字段，则默认为 string
      if (!mockdata.mock) {
        return "@string";
      }
      if (mockdata.mock) {
        return mockdata.mock;
      }
    },
    reloadPreview() {
      const mockdata = this.initPreviewData(this.$store.state.interfaceModule.interfaceData.resBody[0].items);
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
