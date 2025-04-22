<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-bind="$attrs"
  />
  <svg v-else class="svg-icon" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { computed } from "vue";
import { isExternal as isExternalFunc } from "@/utils/validate";

const props = defineProps({
  // 图标名称或外部链接
  icon: {
    type: String,
    required: true,
  },
  // 图标颜色
  color: {
    type: String,
    default: "",
  },
  // 图标大小
  size: {
    type: [Number, String],
    default: 16,
  },
});

// 是否外部图标
const isExternal = computed(() => isExternalFunc(props.icon));

// 外部图标样式
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  "-webkit-mask": `url(${props.icon}) no-repeat 50% 50%`,
  "mask-size": "contain",
  "-webkit-mask-size": "contain",
  "background-color": props.color || "currentColor",
  display: "inline-block",
  width: `${props.size}px`,
  height: `${props.size}px`,
}));

// 内部图标名称
const iconName = computed(() => `#icon-${props.icon}`);
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: contain;
  display: inline-block;
}
</style>
