<template>
  <div class="interface-preview">
    <div class="save-btn">
      <a-button type="primary" @click="saveInterface">保存</a-button>
    </div>
    <h3 class="title">基本设置</h3>
    <a-form ref="newInterfaceForm" :model="newInterfaceForm" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14 }">
      <a-form-item label="接口名称" required name="name">
        <a-input v-model:value="newInterfaceForm.name" placeholder="项目名称"></a-input>
      </a-form-item>
      <a-form-item label="接口路径" required name="path">
        <a-input v-model:value="newInterfaceForm.path" placeholder="/path">
          <template #addonBefore>
            <a-select v-model:value="newInterfaceForm.reqMethod">
              <a-select-option v-for="item in requestMethods" :key="item" :value="item">{{ item }}</a-select-option>
            </a-select>
          </template>
        </a-input>
      </a-form-item>
    </a-form>
    <h3 class="title">请求参数设置</h3>
    <div class="request">
      <a-button class="margin-b-8" type="primary" @click="addRequestQuery">添加参数</a-button>
      <RequestEditor
        class="margin-b-8"
        v-for="(req, index) in interfaceRequest"
        :key="req.name"
        :query="req"
        @delQuery="delRequestItem(index)"
      />
    </div>
    <h3 class="title">返回参数设置</h3>
    <div class="response">
      <a-button class="margin-b-8" type="primary" @click="showImportJsonModal = true">导入json</a-button>
      <ResponseEditor :responseEditorData="interfaceResponse" />
    </div>
    <a-modal v-model:visible="showImportJsonModal" width="65%" title="导入json" @ok="importJson">
      <a-textarea v-model:value="jsonString" :auto-size="{ minRows: 15 }" placeholder="输入json串" />
    </a-modal>
  </div>
</template>

<script>
import { requestMethods } from "@/utils/dictionary/interface";
import RequestEditor from "@/components/interface/RequestEditor";
import ResponseEditor from "@/components/interface/ResponseEditor";
import interfaceInfoMixins from "@/mixins/interfaceInfo";
export default {
  mixins: [interfaceInfoMixins],
  components: { RequestEditor, ResponseEditor },
  data() {
    return {
      requestMethods: requestMethods,
      newInterfaceForm: {},
      interfaceRequest: [{}],
      interfaceResponse: [{}],
      showImportJsonModal: false,
      jsonString: "",
    };
  },
  watch: {
    info: {
      handler(val) {
        this.newInterfaceForm = val;
        const { reqBody, resBody } = val;
        this.interfaceRequest = reqBody;
        this.interfaceResponse = resBody;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    importJson() {
      const json = JSON.parse(this.jsonString);
      const formatData = this.responseJsonFormat(json);
      this.$store.state.interfaceModule.interfaceData.resBody = [
        {
          name: "root",
          type: "Object",
          note: "",
          items: formatData,
          nameDisabled: true,
        },
      ];
      this.showImportJsonModal = false;
      this.jsonString = "";
    },
    responseJsonFormat(json) {
      let formatData = [];
      for (let key in json) {
        const type = this.$utils.dataTypeValidator(json[key]);
        let properties = {
          name: key,
          type,
        };
        if (type === "Object") {
          properties.items = this.responseJsonFormat(json[key]);
        }
        if (type === "Array") {
          let type = this.$utils.dataTypeValidator(json[key][0]);
          let arrItems = [];
          if (type === "Object") {
            arrItems = this.responseJsonFormat(json[key][0]);
          }
          properties.items = [
            {
              name: "items",
              type,
              note: "",
              items: arrItems,
              nameDisabled: true,
            },
          ];
        }
        formatData.push(properties);
      }
      return formatData;
    },
    saveInterface() {
      console.log(this.$store.state.interfaceModule.interfaceData);
      // const params = {
      //   ...this.newInterfaceForm,
      //   reqBody: this.interfaceRequest,
      //   res: this.interfaceRequest,
      //   // resPreview: // 待定
      // };
      // this.$api.updateInterface(params).then((res) => {
      //   if (res.error_no === null) {
      //     this.$emit("getInterfaceList");
      //     this.$msg.success("保存成功");
      //   }
      // });
    },
    addRequestQuery() {
      this.interfaceRequest.push({});
    },
    delRequestItem(index) {
      this.interfaceRequest.splice(index, 1);
    },
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
  .request {
    margin-bottom: 40px;
  }
  .response {
    // background: #efeff0;
    // padding: 10px;
    margin-bottom: 80px;
  }
  .save-btn {
    background: #efeff0;
    position: fixed;
    bottom: 0;
    left: 268px;
    right: 0;
    height: 60px;
    line-height: 60px;
    text-align: center;
    z-index: 19;
  }
}
.margin-b-8 {
  margin-bottom: 8px;
}
</style>
