<template>
  <div class="home">
    <div class="main">
      <ProjectList />
    </div>
  </div>
</template>
<script>
import ProjectList from "./ProjectList";
export default {
  components: { ProjectList },
};
</script>

<style lang="less">
.home {
  position: fixed;
  top: 51px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(247, 248, 250);
  overflow-y: scroll;
}
</style>
