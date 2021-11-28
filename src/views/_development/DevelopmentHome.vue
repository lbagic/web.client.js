<template>
  <div>
    <router-view></router-view>
    <development-popup>
      <router-link :to="link.to" class="dev-home-nav-link">{{
        link.text
      }}</router-link>
    </development-popup>
  </div>
</template>

<script setup>
import DevelopmentPopup from "./DevelopmentPopup.vue";
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";

const route = useRoute();
const isTestRoute = computed(() => route.path === "/development");
const link = computed(() => ({
  to: isTestRoute.value ? "/development/documentation" : "/development",
  text: isTestRoute.value ? "Go to documentation" : "Go to development",
}));
</script>

<style scoped lang="scss"></style>
