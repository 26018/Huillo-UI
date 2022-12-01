<template>
    <div>
        <div>
            <co-card v-if="!params.deleted">
                <template v-slot:header>
                    <el-input class="title" v-model="params.title"></el-input>
                    <div class="operation-frame">
                        <el-checkbox v-model="params.optional">选填</el-checkbox>
                        <i class="el-icon-sort move" title="点击拖动排序"></i>
                        <i class="el-icon-circle-close" @click="closeComponent(params)"></i>
                    </div>
                </template>
                <template v-slot:content>
                    <el-input type="textarea" :autosize="{minRows: 1}" class="description" v-model="params.description"
                              placeholder="添加选项描述"></el-input>
                    <el-input style="margin-top: 4px" disabled placeholder="此处由提交者填写"></el-input>
                </template>
            </co-card>
        </div>
    </div>
</template>

<script>
import {closeComponent} from '@/api/util'
import CoCard from '../co-card.vue'
import CoTip from "@/components/co-tip";

export default {
    props: {
        params: {

        },
    },
    data() {
        return {}
    },

    components: {CoTip, CoCard},

    methods: {
        closeComponent,
    },
}
</script>
<style lang="css" scoped>


</style>
