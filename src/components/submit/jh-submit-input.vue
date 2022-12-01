<template>
    <div>
        <div>
            <co-card v-if="!params.deleted">
                <template v-slot:header>
                    <co-text simple size="medium">{{params.title}}</co-text>
                </template>
                <template v-slot:content>
                    <co-text simple>{{ params.description }}</co-text>
                    <el-input placeholder="请填写"></el-input>
                </template>
            </co-card>
        </div>
    </div>
</template>

<script>
import {closeComponent} from '@/api/util'
import CoCard from '../co-card.vue'
import CoTip from "@/components/co-tip";
import CoText from "@/components/co-text";

export default {
    props: {
        params: {

        },
    },
    data() {
        return {}
    },

    components: {CoText, CoTip, CoCard},

    methods: {

    },
}
</script>
<style lang="css" scoped>


</style>
