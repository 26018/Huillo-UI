<template>
    <div>
        <div class="home">
            <CoHeader :menus="menus"></CoHeader>
            <router-view class="content" name="content"></router-view>
        </div>
    </div>
</template>

<script>
import CoHeader from '@/components/co-header.vue'
import {goto} from '@/api/util'

export default {
    data() {
        return {
            menus: [],
        }
    },

    methods: {

    },

    components: {CoHeader},
}
</script>
<style lang="css" scoped>
.home {
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-direction: column;
}

.content {
    /* 设置剩余的部分全部填充 */
    /*border: 1px solid red;*/
    height: calc(100% - 50px);
    overflow: auto;
}
</style>
