<template>
  <div v-if="!item.hidden">
    <!-- 没有子菜单的情况 -->
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <el-icon v-if="onlyOneChild.meta.icon"
            ><component :is="onlyOneChild.meta.icon"
          /></el-icon>
          <template #title>{{ onlyOneChild.meta.title }}</template>
        </el-menu-item>
      </app-link>
    </template>

    <!-- 有子菜单的情况 -->
    <el-sub-menu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template #title>
        <el-icon v-if="item.meta && item.meta.icon"
          ><component :is="item.meta.icon"
        /></el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { isExternal } from "@/utils/validate";
import AppLink from "./Link.vue";

const props = defineProps({
  // 菜单项
  item: {
    type: Object,
    required: true,
  },
  // 基础路径
  basePath: {
    type: String,
    default: "",
  },
  // 是否嵌套
  isNest: {
    type: Boolean,
    default: false,
  },
});

// 唯一子项
const onlyOneChild = ref(null);

/**
 * 是否只有一个显示的子项
 */
const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false;
    } else {
      // 设置唯一子项
      onlyOneChild.value = item;
      return true;
    }
  });

  // 当只有一个子路由时，默认显示该子路由
  if (showingChildren.length === 1) {
    return true;
  }

  // 没有子路由则显示父路由
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }

  return false;
};

/**
 * 解析路径
 */
const resolvePath = (routePath) => {
  // 处理外部链接
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }

  // 空路径处理
  if (!routePath) {
    return props.basePath;
  }

  // 规范化路径，确保没有重复的斜杠
  let path = "";

  // 处理basePath
  if (props.basePath) {
    // 确保basePath有头没有尾斜杠
    path = props.basePath.startsWith("/")
      ? props.basePath
      : `/${props.basePath}`;

    path = path.endsWith("/") ? path.slice(0, -1) : path;
  } else {
    path = "";
  }

  // 处理routePath
  if (routePath) {
    // 确保routePath有头没有尾斜杠
    routePath = routePath.startsWith("/") ? routePath : `/${routePath}`;

    routePath = routePath.endsWith("/") ? routePath.slice(0, -1) : routePath;
  }

  // 拼接路径，避免双斜杠
  if (path && routePath) {
    return `${path}${routePath}`;
  } else if (path) {
    return path;
  } else if (routePath) {
    return routePath;
  } else {
    return "/";
  }
};
</script>
