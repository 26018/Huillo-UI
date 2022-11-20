<template>
  <div>
    <div class="component-main">
      <div class="component-container ">

        <div class="component-header">
          <slot name="header"></slot>
        </div>

        <div class="component-content">
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
@import "@/common/style/co-card.css";
</style>
