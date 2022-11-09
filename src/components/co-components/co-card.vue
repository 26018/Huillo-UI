<template>
  <div>
    <div class="item-main ">
      <div class="item-container ">

        <div class="header">
          <slot name="header"></slot>
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
    return {};
  },
  methods: {},
};
</script>
<style lang="css" scoped>
@import url("@/common/style/co-item.css");
@import url("@/common/style/font.css");

.header {
  display: flex;
  align-items: center;
  margin-left: auto;
  /*border: 1px solid red;*/
}

/*统一设置标题的文字大小*/
.header > * {
  font-size: 18px;
}

.content {

}
</style>
