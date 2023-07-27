<template>
  <div class="container">
    <h1>欢迎进入</h1>
    <p>本体-实例构建平台</p>
    <button @click="router.push('ontology')">构建本体</button>
    <button @click="router.push('instance')">构建实例</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style lang="less" scoped>
.container {
  padding-top: 10vh;
  button {
    margin: 40px;
  }
}

h1 {
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #555;
}

p {
  font-size: 24px;
  font-weight: bold;
  color: #777;
}

button {
  background-color: #25a0c5;
  color: #fff;
  font-size: 24px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  margin-top: 40px;
  cursor: pointer;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: #1a7592;
  transform: translateY(-2px);
}
</style>
