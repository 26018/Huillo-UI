<template>
    <div>
        <div class="collect"
             ref="content">
            <div class="left">
                <collect-left :componentList="moduleData" :mostUse="mostUseModuleData"></collect-left>
            </div>
            <div class="mid">
                <collect-mid :templates="templateData"></collect-mid>
            </div>
            <div class="right">
                <collect-right></collect-right>
            </div>

        </div>
    </div>
</template>

<script>
import CollectLeft from '@/views/pages/create/collect-page/collect-left.vue'
import CollectMid from '@/views/pages/create/collect-page/collect-mid.vue'
import CollectRight from '@/views/pages/create/collect-page/collect-right.vue'

export default {
    components: {CollectLeft, CollectMid, CollectRight},
    data() {
        return {}
    },
    computed: {
        templateData() {
            return this.$store.state.template
        },
        moduleData() {
            return this.$store.state.module
        },
        mostUseModuleData() {
            return this.$store.state.mostUseModule
        },
    },
    created() {
    }
}
</script>

<style lang="css" scoped>
.collect {
    display: flex;
    width: 100%;
    height: 100%;
}

.left, .right {
    flex: 2;
    height: auto;
    background-color: transparent;
    overflow: auto;
}

.mid {
    flex: 5;
    overflow: auto;
    height: 100%;
    border-left: 2px solid gainsboro;
    border-right: 2px solid gainsboro;
}

@media screen and (max-width: 600px) {
    .left, .right {
        display: none;
    }
}

</style>
