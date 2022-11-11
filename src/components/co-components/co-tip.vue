<template>
    <div>
        <div class="tip">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "co-tip"
}
</script>

<style scoped>
.tip {
    color: gray;
    font-size: 14px;
    margin: 4px 0;
    height: 30px;
    display: flex;
    align-items: center;
    padding-right: 15px;
    white-space: nowrap;
    user-select: none;
}
</style>