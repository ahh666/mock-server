<template>
  <div>
    <PageHeader v-if="$route.path !== '/'" />
    <router-view />
  </div>
</template>

<script>
import PageHeader from "./components/PageHeader";
export default {
  components: { PageHeader },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
