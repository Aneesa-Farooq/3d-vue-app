<template>
  <SideNavigation />
  <router-view></router-view>
</template>

<script>
import SideNavigation from "./components/sideNavigation.vue";

export default {

  name: "App",
  components: {
    SideNavigation
  }
};
</script>