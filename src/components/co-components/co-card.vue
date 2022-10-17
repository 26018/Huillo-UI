<template>
  <div>
    <div class="item-main">
      <div class="item-container">
        <div class="header">
          <div class="title font-title">
            <slot name="title"></slot>
          </div>
          <div class="options">
            <slot name="options"></slot>
          </div>
        </div>
        <div>
          <slot></slot>
        </div>
        <div class="content font-text">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menus: Array,
    index: Number,
    need: Boolean,
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="css" scoped>
@import url('@/common/style/co-item.css');
@import url('@/common/style/font.css');
.header {
  display: flex;
  align-items: center;
  margin-left: auto;
  /* border: 1px solid red; */
}
.title {
  height: 100%;
  flex-grow: 1;
}
.title :deep(*) {
  background-color: transparent;
  border: 0px;
  padding: 0px;
}
.options {
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  justify-content: flex-end;
  align-items: center;
}
.options > * {
  margin-left: 16px;
}
.content {
  margin-top: 8px;
}
</style>
