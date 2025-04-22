<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1 class="error-code">404</h1>
      <h2 class="error-message">页面未找到</h2>
      <p class="error-desc">抱歉，您访问的页面不存在或已被移除。</p>
      <div class="actions">
        <el-button type="primary" @click="goBack">返回上一页</el-button>
        <el-button @click="goHome">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

// 返回上一页
const goBack = () => {
  router.go(-1);
};

// 返回首页
const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7f9;
}

.not-found-content {
  text-align: center;
  padding: 30px;
  max-width: 500px;
}

.error-code {
  font-size: 80px;
  color: #409eff;
  margin: 0;
  line-height: 1;
}

.error-message {
  font-size: 28px;
  color: #303133;
  margin: 20px 0;
}

.error-desc {
  font-size: 16px;
  color: #606266;
  margin-bottom: 30px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>
