<template>
  <a v-if="isExternalLink" v-bind="externalLinkProps">
    <slot />
  </a>
  <router-link v-else v-bind="internalLinkProps">
    <slot />
  </router-link>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { isExternal } from "@/utils/validate";

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

const route = useRoute();

// 是否为外部链接
const isExternalLink = computed(() => isExternal(props.to));

// 外部链接属性
const externalLinkProps = computed(() => ({
  href: props.to,
  target: "_blank",
  rel: "noopener",
}));

// 内部链接属性
const internalLinkProps = computed(() => {
  // 确保目标路径格式正确
  let path = props.to;

  // 检查当前路径与目标路径是否相同
  const currentPath = route.path;
  const isSamePath =
    path === currentPath ||
    `/${path}` === currentPath ||
    path === `/${currentPath}`;

  return {
    to: path,
    class: { disabled: isSamePath },
  };
});
</script>

<style scoped>
/* 禁用的链接样式 */
.disabled {
  cursor: not-allowed !important;
  pointer-events: none !important;
  color: inherit !important;
  text-decoration: none !important;
}
</style>
