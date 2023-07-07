<template>
  <RouterView />
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  font-family: "微软雅黑";
  box-sizing: border-box;
  word-break: break-all;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
  }

  text-overflow: ellipsis;
  white-space: nowrap;
}

#app {
  max-width: 100vw;
  width: 100vw;
  height: 100vh;
  padding: 0;
  background-color: #e4e4e4;
}
</style>
