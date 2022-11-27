<template>
    <div>
        <div class="head">
            <co-card>
                <template v-slot:header>
                    <div class="create-header">
                        <co-text simple size="large">{{ params.title }}</co-text>
                        <co-text simple>结束时间：{{ new Date(params.dueDate).toLocaleDateString() }}</co-text>
                    </div>
                </template>
                <template v-slot:content>
                    <div>
                        <co-text simple>收集人：{{ params.author }}周杰伦</co-text>
                        <co-text simple>详细说明:</co-text>
                        <co-text>{{ params.description }}</co-text>
                    </div>
                </template>
            </co-card>
        </div>
    </div>
</template>

<script>
import CoCard from '../co-card.vue'
import {getFeature} from '@/api/util'
import CoTip from "@/components/co-tip";
import CoIcon from "@/components/co-icon";
import CoText from "@/components/co-text";

export default {
    props: {
        params: {
            editorValue: "",
        }
    },
    data() {
        return {

        }
    },
    methods: {},
    components: {CoText, CoIcon, CoTip, CoCard},
    created() {

    },
}
</script>
<style lang="css" scoped>
.create-header {
    display: flex;
    align-items: center;
    width: 100%;
}

.create-header > :last-child {
    margin-left: auto;
}
</style>
