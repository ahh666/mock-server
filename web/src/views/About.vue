<template>
  <div class="about" v-html="mdContent"></div>
</template>

<script>
import marked from "marked";
export default {
  data() {
    return {
      mdContent: "",
    };
  },
  created() {
    this.getMdString();
  },
  methods: {
    getMdString() {
      this.$api.about().then((res) => {
        if (res.error_no === null) {
          this.mdContent = marked(res.data);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.about {
  margin: 70px;
}
</style>
