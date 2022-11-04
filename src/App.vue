<template>
  <div id="app">
    <router-view class="main-view"
                 name="main_view"/>
  </div>
</template>

<style>
@import url('@/common/style/font.css');

* {
  font-family: pingfang;
}

body {
  padding: 0px;
  margin: 0px;
  width: 100vw;
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}

.main-view {
  width: 100%;
  height: 100%;
}

::-webkit-scrollbar {
  width: 0px;
  height: 10px;
}



::-webkit-scrollbar-track {
  width: 6px;
  background: rgba(#101f1c, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(144, 147, 153, 0.5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  transition: background-color 0.3s;
  cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144, 147, 153, 0.3);
}
</style>
