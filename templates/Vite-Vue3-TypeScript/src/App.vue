<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./components/HelloWorld.vue";
import { useUserStore } from "./store/user";
import RequestTest from "./RequestTest.vue";
import ToDoList from "./ToDoList.vue";
import { cancelRequest, cancelAllRequest } from "./service";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

const { t } = useI18n()
const userStore = useUserStore();
userStore.updateName(t('xin-zi-shi'));
const count = (value: number) => {
  console.log("``value", value);
};

// 创建i18n对象
const i18n = useI18n();

// 获取当前语言
const currentLanguage = computed(() => i18n.locale.value);

// 切换语言
const changeLanguage = (language: string) => {
  localStorage.setItem("language", language);
  i18n.locale.value = language;
};
</script>

<template>
  <el-button type="primary" @click="changeLanguage('zh')">中</el-button>
  <el-button type="primary" @click="changeLanguage('en')">英</el-button>

  <img alt="$t('vue-logo')" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" @count="count" />
  <div>{{ userStore.fullName }}</div>
  <RequestTest />
  <el-button @click="cancelRequest('/api/common/weather/get15DaysWeatherByArea')"> 取消请求
  </el-button>
  <el-button @click="cancelAllRequest">取消全部请求</el-button>
  <ToDoList />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
