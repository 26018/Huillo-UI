<template>
    <div>
        <div style="display: flex;justify-content: center;align-items: center">
            <img class="co-icon" :src="imgSrc" :style="{width:size}"/>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: ['imgSrc', 'size'],
    data() {
        return {};
    },
}
</script>
<style lang='css' scoped>
.co-icon {
    width: 15px;
    aspect-ratio: 1/1;
}
</style>