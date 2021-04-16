<template>
  <div @click="handleClickCard">
    <a-card :title="cardInfo.name" class="card-style">
      <template #title>
        <span class="title cursor-pointer" @click="handleClickCard">{{ cardInfo.name }}</span>
      </template>
      <template #extra>
        <EditOutlined class="option-icon-style" title="编辑" @click.stop="handleEdit" />
        <DeleteOutlined class="option-icon-style" title="删除" @click.stop="handleDel" />
      </template>
      {{ cardInfo.desc }}
    </a-card>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: { EditOutlined, DeleteOutlined },
  props: {
    cardInfo: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handleClickCard() {
      this.$emit("handleClickCard");
    },
    handleEdit() {
      this.$emit("handleEdit");
    },
    handleDel() {
      this.$emit("handleDel");
    },
  },
});
</script>
<style lang="less" scoped>
.card-style {
  border: 2px solid #fff;
  width: 300px;
  height: 200px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
  &:hover {
    border: 2px solid #1890ff;
  }
}
.option-icon-style {
  cursor: pointer;
  color: #999898;
  font-size: 16px;
  margin-left: 12px;
  &:hover {
    color: #1890ff;
  }
}
</style>
