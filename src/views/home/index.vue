<template>
  <div class="home-container">
    <el-row :gutter="20">
      <!-- 欢迎卡片 -->
      <el-col :span="24">
        <el-card class="welcome-card">
          <div class="welcome-header">
            <h2>欢迎使用 CCX CLI 脚手架</h2>
            <p>基于 Vue 3 + Element Plus + Vite 的中后台管理系统模板</p>
          </div>
          <el-divider />
          <div class="feature-list">
            <el-row :gutter="20">
              <el-col
                :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                v-for="(feature, index) in features"
                :key="index"
              >
                <div class="feature-item">
                  <el-icon><component :is="feature.icon" /></el-icon>
                  <div class="feature-info">
                    <h3>{{ feature.title }}</h3>
                    <p>{{ feature.desc }}</p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 数据统计 -->
    <el-row :gutter="20" class="dashboard-row">
      <el-col
        :xs="24"
        :sm="12"
        :md="6"
        v-for="(item, index) in statistics"
        :key="index"
      >
        <el-card shadow="hover" class="statistic-card">
          <div class="statistic-content">
            <el-icon class="statistic-icon" :style="{ color: item.color }">
              <component :is="item.icon" />
            </el-icon>
            <div class="statistic-info">
              <p class="statistic-title">{{ item.title }}</p>
              <h2 class="statistic-value">{{ item.value }}</h2>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 更多内容 -->
    <el-row :gutter="20" class="dashboard-row">
      <el-col :xs="24" :sm="24" :md="12">
        <el-card class="data-card" header="最近项目">
          <el-table :data="projectList" style="width: 100%" :stripe="true">
            <el-table-column prop="name" label="项目名称" />
            <el-table-column prop="date" label="创建日期" width="180" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="scope">
                <el-tag
                  :type="scope.row.status === '完成' ? 'success' : 'primary'"
                >
                  {{ scope.row.status }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12">
        <el-card class="data-card" header="操作日志">
          <div class="time-line">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :type="activity.type"
                :color="activity.color"
                :timestamp="activity.timestamp"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Document,
  Setting,
  Opportunity,
  CreditCard,
  Refresh,
  User,
  DataLine,
  Brush,
  Bell,
  Key,
} from "@element-plus/icons-vue";

// 功能特点
const features = ref([
  {
    icon: "Document",
    title: "Vue 3 组合式 API",
    desc: "使用最新的 Vue 3 Composition API 开发",
  },
  {
    icon: "Setting",
    title: "Element Plus",
    desc: "基于 Element Plus 组件库的优雅界面",
  },
  {
    icon: "Refresh",
    title: "Vite 构建",
    desc: "基于 Vite 极速的开发体验",
  },
  {
    icon: "DataLine",
    title: "Pinia 状态管理",
    desc: "使用 Pinia 进行高效的状态管理",
  },
]);

// 统计数据
const statistics = ref([
  {
    title: "访问量",
    value: "12,845",
    icon: "Opportunity",
    color: "#40c9c6",
  },
  {
    title: "消息",
    value: "14",
    icon: "Bell",
    color: "#36a3f7",
  },
  {
    title: "用户",
    value: "234",
    icon: "User",
    color: "#f4516c",
  },
  {
    title: "权限",
    value: "6",
    icon: "Key",
    color: "#34bfa3",
  },
]);

// 项目列表
const projectList = ref([
  {
    name: "管理系统模板",
    date: "2023-12-20",
    status: "完成",
  },
  {
    name: "数据可视化平台",
    date: "2023-12-15",
    status: "进行中",
  },
  {
    name: "移动端应用",
    date: "2023-12-10",
    status: "计划中",
  },
]);

// 活动日志
const activities = ref([
  {
    content: "登录系统",
    timestamp: "10分钟前",
    type: "primary",
    color: "#409EFF",
  },
  {
    content: "更新了系统配置",
    timestamp: "30分钟前",
    type: "warning",
    color: "#E6A23C",
  },
  {
    content: "创建了新项目",
    timestamp: "1小时前",
    type: "success",
    color: "#67C23A",
  },
  {
    content: "新增用户",
    timestamp: "2小时前",
    type: "info",
    color: "#909399",
  },
]);
</script>

<style scoped>
.home-container {
  padding: 10px;
}

.dashboard-row {
  margin-top: 20px;
}

.welcome-card {
  margin-bottom: 10px;
}

.welcome-header {
  text-align: center;
  padding: 10px 0;
}

.welcome-header h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.feature-list {
  margin-top: 20px;
}

.feature-item {
  display: flex;
  padding: 15px;
  border-radius: 4px;
  transition: all 0.3s;
  margin-bottom: 15px;
  background-color: #f9fafc;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.feature-item .el-icon {
  font-size: 32px;
  margin-right: 15px;
  color: #409eff;
}

.feature-info h3 {
  font-size: 16px;
  margin: 0 0 5px 0;
}

.feature-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.statistic-card {
  height: 100px;
}

.statistic-content {
  display: flex;
  align-items: center;
  height: 60px;
}

.statistic-icon {
  font-size: 48px;
  margin-right: 15px;
}

.statistic-info {
  flex: 1;
}

.statistic-title {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.statistic-value {
  font-size: 24px;
  margin: 5px 0 0 0;
}

.data-card {
  height: 380px;
}

.time-line {
  height: 320px;
  overflow-y: auto;
  padding-right: 10px;
}
</style>
