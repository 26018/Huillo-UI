<template>
    <div>
        <div class="radio">
            <co-card>
                <template v-slot:header>
                    <el-input class="title" v-model="params.title"></el-input>
                    <div class="operation-frame">
                        <el-checkbox v-model="params.required">选填</el-checkbox>
                        <i class="el-icon-sort move" title="点击拖动排序"></i>
                        <i class="el-icon-circle-close" @click="closeComponent(params)"></i>
                    </div>
                </template>

                <template v-slot:content>
                    <el-input type="textarea" :autosize="{minRows: 1}" class="description" v-model="params.description"
                              placeholder="添加选项描述"></el-input>
                    <el-radio-group v-model="params.answer">
                        <div class="radio-container" v-for="option in params.options">
                            <el-radio :label="option.id">
                                <el-input v-model="option.value"></el-input>
                            </el-radio>
                            <el-button type="text" @click="removeOption(params.options,params.answer,option.value)">
                                <i class="el-icon-close"></i>
                            </el-button>
                        </div>
                    </el-radio-group>
                    <el-button @click="addOption" size="small">新增选项</el-button>
                </template>
            </co-card>
        </div>
    </div>
</template>

<script>
import coCard from '../co-card.vue'
import {closeComponent} from '@/api/util'

export default {
    components: {coCard},
    props: {
        params: {
            required: Boolean,// 选填
            description: String,
            answer: "",
            mode: String // 模式 [ 创建模式(create) | 提交模式(submit) ]
        }
    },
    data() {
        return {}
    },

    computed: {
        observerParams() {
            return JSON.stringify(this.params)
        },
    },
    watch: {
        observerParams(n, o) {
            console.log(JSON.parse(n).data, JSON.parse(o).data)
        },
    },

    methods: {
        closeComponent,
        addOption() {
            // todo id根据length来确定有bug
            let options = this.params.options
            if (options === undefined || options == null) {
                this.params.options = []
            }
            this.params.options.push({
                id: Date.now(),
                value: '新选项',
            })
        },

        removeOption(options, answers, targetName) {
            // 根据下标删除有bug
            // option的id是options数组的下标
            // splice删除后，options下表变化，但option的id却没有变
            // @old options.splice(targetId-1, 1);

            if (answers == undefined) {
                answers = "";
            }

            if (options == undefined) {
                options = [];
            }

            let length = options.length;
            for (let index = 0; index < length; index++) {
                if (options[index].value == targetName) {
                    // Tip 删除在answer列表中废弃的答案

                    // 单选的answers是字符串 多选的是数组
                    let type = typeof answers;
                    console.log(typeof answers)
                    if (type == 'string') {

                    } else {
                        let ansLength = answers.length;
                        for (let ansIndex = 0; ansIndex < ansLength; ansIndex++) {
                            if (answers[ansIndex] == options[index].id) {
                                answers.splice(ansIndex, 1);
                                break;
                            }
                        }
                    }
                    options.splice(index, 1);
                    break;
                }
            }
        }


    },


}
</script>
<style lang="css" scoped>
@import "@/common/style/co-card.css";
@import "@/common/style/create/create-radio.css";
</style>
