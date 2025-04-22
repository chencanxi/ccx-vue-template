<template>
  <div class="app-container">
    <el-container class="layout-container">
      <!-- 侧边栏 -->
      <el-aside
        :width="sidebarCollapsed ? '64px' : '220px'"
        class="sidebar-container"
      >
        <div class="logo-container">
          <img
            src="../assets/images/logo.png"
            alt="Logo"
            v-if="!sidebarCollapsed"
          />
          <span v-if="!sidebarCollapsed">CCX CLI</span>
        </div>

        <!-- 侧边菜单 -->
        <el-scrollbar>
          <el-menu
            :default-active="activeMenu"
            :collapse="sidebarCollapsed"
            :collapse-transition="false"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409EFF"
            router
          >
            <sidebar-item
              v-for="route in routes"
              :key="route.path"
              :item="route"
              :base-path="route.path"
            />
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-container class="main-container">
        <!-- 头部 -->
        <el-header class="header-container">
          <div class="header-left">
            <el-icon class="toggle-sidebar" @click="toggleSidebar">
              <component :is="sidebarCollapsed ? 'Expand' : 'Fold'" />
            </el-icon>
            <breadcrumb class="breadcrumb" />
          </div>
          <div class="header-right">
            <el-dropdown trigger="click">
              <div class="avatar-container">
                <el-avatar size="small" :src="avatarUrl" />
                <span class="username">{{ username }}</span>
                <el-icon><ArrowDown /></el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="goToProfile"
                    >个人中心</el-dropdown-item
                  >
                  <el-dropdown-item @click="handleThemeChange">
                    {{ theme === "dark" ? "浅色模式" : "深色模式" }}
                  </el-dropdown-item>
                  <el-dropdown-item divided @click="handleLogout"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>

        <!-- 主体内容 -->
        <el-main class="content-container">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </el-main>

        <!-- 底部 -->
        <el-footer class="footer-container" height="40px">
          <div class="footer-content">
            <span>© {{ currentYear }} CCX CLI. All Rights Reserved.</span>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ArrowDown, Fold, Expand } from "@element-plus/icons-vue";
import { useAppStore, useUserStore } from "@/store";
import SidebarItem from "./components/SidebarItem.vue";
import Breadcrumb from "./components/Breadcrumb.vue";

const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const userStore = useUserStore();

// 用户信息
const avatarUrl = ref(
  "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
);
const username = computed(() => userStore.userInfo.username || "用户");

// 当前年份
const currentYear = new Date().getFullYear();

// 路由菜单
const routes = computed(() => {
  return router.options.routes.filter((route) => !route.hidden);
});

// 激活菜单
const activeMenu = computed(() => {
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});

// 侧边栏状态
const sidebarCollapsed = computed(() => appStore.sidebarCollapsed);

// 切换侧边栏
const toggleSidebar = () => {
  appStore.toggleSidebar();
};

// 主题切换
const theme = computed(() => appStore.theme);
const handleThemeChange = () => {
  const newTheme = theme.value === "dark" ? "light" : "dark";
  appStore.setTheme(newTheme);
};

// 个人中心
const goToProfile = () => {
  router.push("/profile");
};

// 退出登录
const handleLogout = async () => {
  try {
    userStore.logout();
    router.push("/login");
  } catch (error) {
    console.error("登出失败:", error);
  }
};
</script>

<style scoped>
.app-container {
  height: 100vh;
  width: 100%;
}

.layout-container {
  height: 100%;
}

/* 侧边栏样式 */
.sidebar-container {
  background-color: #304156;
  transition: width 0.28s;
  overflow: hidden;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #263445;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
}

.logo-container img {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}

/* 头部样式 */
.header-container {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.header-left {
  display: flex;
  align-items: center;
}

.toggle-sidebar {
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
}

.breadcrumb {
  margin-left: 8px;
}

.header-right {
  display: flex;
  align-items: center;
}

.avatar-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.username {
  margin: 0 8px;
  color: #333;
}

/* 主体内容样式 */
.content-container {
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f7f9;
}

/* 底部样式 */
.footer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #eee;
  color: #666;
  font-size: 12px;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
