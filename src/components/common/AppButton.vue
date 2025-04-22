<template>
  <el-button
    :type="type"
    :size="size"
    :icon="icon ? (iconPosition === 'left' ? icon : '') : undefined"
    :loading="loading"
    :disabled="disabled"
    :plain="plain"
    :round="round"
    :circle="circle"
    :color="color"
    :class="[
      'app-button',
      `app-button--${type}`,
      {
        'is-block': block,
        'is-animated': animated,
        [`app-button--${size}`]: size,
      },
    ]"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
    <el-icon
      v-if="icon && iconPosition === 'right'"
      class="app-button-icon-right"
    >
      <component :is="icon" />
    </el-icon>
  </el-button>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  // 按钮类型
  type: {
    type: String,
    default: "default",
    validator: (value) =>
      [
        "primary",
        "success",
        "warning",
        "danger",
        "info",
        "default",
        "text",
      ].includes(value),
  },
  // 按钮尺寸
  size: {
    type: String,
    default: "default",
    validator: (value) => ["large", "default", "small"].includes(value),
  },
  // 图标
  icon: {
    type: String,
    default: "",
  },
  // 图标位置
  iconPosition: {
    type: String,
    default: "left",
    validator: (value) => ["left", "right"].includes(value),
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false,
  },
  // 禁用状态
  disabled: {
    type: Boolean,
    default: false,
  },
  // 朴素按钮
  plain: {
    type: Boolean,
    default: false,
  },
  // 圆角按钮
  round: {
    type: Boolean,
    default: false,
  },
  // 圆形按钮
  circle: {
    type: Boolean,
    default: false,
  },
  // 按钮颜色
  color: {
    type: String,
    default: "",
  },
  // 块级按钮
  block: {
    type: Boolean,
    default: false,
  },
  // 动画效果
  animated: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["click"]);

// 处理点击事件
const handleClick = (event) => {
  if (props.loading || props.disabled) return;
  emits("click", event);
};
</script>

<style lang="scss" scoped>
.app-button {
  &.is-block {
    display: block;
    width: 100%;
  }

  &.is-animated {
    transition: all 0.3s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .app-button-icon-right {
    margin-left: 5px;
  }
}
</style>
