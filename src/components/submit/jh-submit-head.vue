<template>
    <div>
        <div class="head">
            <co-card>
                <template v-slot:header>
                    <div class="create-header">
                        <co-text simple size="large">{{ params.title }}</co-text>
                        <co-text simple>结束时间：{{ DateFormatter(params.endTime, '/') }}</co-text>
                    </div>
                </template>
                <template v-slot:content>
                    <div>
                        <co-text v-show="params.auth" simple>收集人：{{ params.author }}</co-text>

                        <div v-show="params.description">
                            <co-text simple>详细说明:</co-text>
                            <co-text>{{ params.description }}</co-text>
                        </div>

                    </div>
                </template>
            </co-card>
        </div>
    </div>
</template>

<script>
import CoCard from '../co-card.vue'
import {DateFormatter} from '@/api/time'
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
        return {}
    },
    methods: {
        DateFormatter,
    },
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
