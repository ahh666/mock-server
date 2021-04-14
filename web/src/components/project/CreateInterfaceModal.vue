<template>
  <a-modal :visible="showCreateModal" title="添加接口" @cancel="closeCreateModal">
    <template #footer>
      <a-button key="back" @click="closeCreateModal">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="createInterface">确定</a-button>
    </template>
    <a-form ref="newInterfaceForm" :model="newInterfaceForm" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
      <a-form-item label="接口名称" required name="name">
        <a-input v-model:value="newInterfaceForm.name" placeholder="项目名称"></a-input>
      </a-form-item>
      <a-form-item label="接口路径" required name="path">
        <a-input v-model:value="newInterfaceForm.path" placeholder="/path">
          <template #addonBefore>
            <a-select v-model:value="newInterfaceForm.reqMethod">
              <a-select-option value="get">get</a-select-option>
              <a-select-option value="post">post</a-select-option>
            </a-select>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="注">
        <p>后续可进入详情页进行编辑</p>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  props: {
    showCreateModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      newInterfaceForm: {
        reqMethod: "get",
      },
    };
  },
  created() {
    console.log(6, this.showCreateModal);
  },
  methods: {
    closeCreateModal() {
      this.$emit("update:showCreateModal", !this.showCreateModal);
    },
    createInterface() {
      this.$refs.newInterfaceForm
        .validate()
        .then(() => {
          this.loading = true;
          const params = {
            ...this.newInterfaceForm,
            pid: this.$route.params.pid,
          };
          this.$api.createInterface(params).then((res) => {
            if (res.error_no === null) {
              this.getInterfaceList();
              this.closeCreateModal();
            }
            this.loading = false;
          });
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
  },
};
</script>

<style lang="less" scoped></style>
