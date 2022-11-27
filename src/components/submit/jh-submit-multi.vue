<template>
    <div>
        <div class="multi">
            <co-card>
                <template v-slot:header>
                    <co-text simple size="medium">{{params.title}}</co-text>
                </template>
                <template v-slot:content>
                    <co-text simple>{{params.description}}</co-text>
                    <el-checkbox-group v-model="params.answer">
                        <div class="checkbox-container" v-for="(option,index) in params.options">
                            <el-checkbox :key="index" :label="option.value"></el-checkbox>
                        </div>
                    </el-checkbox-group>
                </template>
            </co-card>
        </div>
    </div>
</template>

<script>
import CoCard from '../co-card.vue'
import {closeComponent, updateTemplate} from '@/api/util'
import CoText from "@/components/co-text";

export default {
    data() {
        return {}
    },
    props: {
        params: {
            title: String,
            need: Boolean,
            options: Array,
            selected: Array,
            answer: [],
            details: String,
            deleted: false,
            required: Boolean,// 选填
        },
    },
    components: {CoText, CoCard},
    methods: {

    },
    created() {

    }
}
</script>
<style lang="css" scoped>
.el-checkbox-group {
    box-sizing: border-box;
    padding: 4px 0;
}

.checkbox-container{
    margin: 0 0 8px 0;
}
</style>
