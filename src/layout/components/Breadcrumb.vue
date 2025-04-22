<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="
            item.redirect === 'noRedirect' || index === levelList.length - 1
          "
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 面包屑层级列表
const levelList = ref([]);

// 获取面包屑层级
const getBreadcrumb = () => {
  // 过滤掉没有meta.title属性的路由
  let matched = route.matched.filter((item) => item.meta && item.meta.title);

  // 如果一级路由不是首页，则添加首页为第一级
  const first = matched[0];
  if (first && first.path !== "/home" && first.path !== "/") {
    matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
  }

  levelList.value = matched;
};

// 处理链接跳转
const handleLink = (item) => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect);
    return;
  }
  router.push(path);
};

// 监听路由变化
watch(
  () => route.path,
  () => {
    getBreadcrumb();
  },
  { immediate: true }
);
</script>

<style lang="css" scoped>
.app-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  color: #97a8be;
}

.app-breadcrumb .no-redirect {
  color: #97a8be;
  cursor: text;
}

/* 面包屑动画 */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
