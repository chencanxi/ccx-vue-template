<template>
  <div class="login-container">
    <el-card class="login-card">
      <div class="login-header">
        <h2>CCX CLI</h2>
        <p>欢迎使用中后台管理系统模板</p>
      </div>

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-position="top"
      >
        <el-form-item prop="username" label="用户名">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="User"
            clearable
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <el-form-item prop="password" label="密码">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
            clearable
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <el-form-item>
          <el-row :gutter="15">
            <el-col :span="12">
              <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
            </el-col>
            <el-col :span="12" class="text-right">
              <el-link type="primary">忘记密码？</el-link>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            class="login-button"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>

      <div class="login-footer">
        <p>还没有账号？<el-link type="primary">立即注册</el-link></p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue";
import { useUserStore } from "@/store";

const router = useRouter();
const userStore = useUserStore();

// 登录表单
const loginFormRef = ref(null);
const loading = ref(false);
const loginForm = reactive({
  username: "admin",
  password: "123456",
  remember: false,
});

// 表单验证规则
const loginRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
  ],
};

// 处理登录
const handleLogin = () => {
  loginFormRef.value.validate(async (valid) => {
    if (!valid) return;

    try {
      loading.value = true;

      // 调用登录接口
      await userStore.login(loginForm.username, loginForm.password);

      ElMessage({
        message: "登录成功",
        type: "success",
      });

      // 跳转到首页
      router.push({ path: "/" });
    } catch (error) {
      console.error("登录失败:", error);
      ElMessage.error("登录失败，请检查用户名和密码");
    } finally {
      loading.value = false;
    }
  });
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7f9;
  background-image: linear-gradient(to bottom right, #3a8ee6, #7352ff);
}

.login-card {
  width: 400px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 20px;
}

.login-header h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #303133;
}

.login-header p {
  color: #606266;
  font-size: 14px;
}

.login-button {
  width: 100%;
  border-radius: 4px;
}

.login-footer {
  margin-top: 20px;
  text-align: center;
  color: #606266;
  font-size: 14px;
}

.text-right {
  text-align: right;
}

@media screen and (max-width: 500px) {
  .login-card {
    width: 90%;
  }
}
</style>
