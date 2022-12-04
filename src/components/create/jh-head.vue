<template>
    <div>
        <div class="head">
            <pc-view>
                <co-card>
                    <template v-slot:header>
                        <div class="row-start-end">
                            <el-input class="pc-create-title" clearable v-model="params.title"/>
                            <el-date-picker class="pc-create-endTime" value-format="yyyy-MM-dd" v-model="params.endTime"
                                            placeholder="截止日期"/>
                        </div>
                    </template>
                    <template v-slot:content>
                        <div class="row-start-end pc-create-line">
                            <el-input v-model="params.author" clearable class="pc-create-author" placeholder="请填写">
                                <template slot="prepend">收集人:</template>
                            </el-input>
                            <el-select
                                class="pc-create-group"
                                v-model="value"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                placeholder="通知群组内的朋友填写">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>

                        <div class="row-start-end pc-create-line">
                            <co-text simple>详细说明</co-text>
                            <el-select v-model="params.editorValue" class="pc-create-editor"
                                       placeholder="切换编辑器">
                                <el-option v-for="editorOption in editorOptions" :key="editorOption"
                                           :label="editorOption" :value="editorOption"></el-option>
                            </el-select>
                        </div>

                        <el-input type="textarea" v-show="!MDEditor"
                                  v-model="params.description"
                                  :autosize="{ minRows: 2}"/>

                        <mavon-editor :boxShadow="false" v-show="MDEditor"
                                      v-model="params.description"/>

                    </template>
                </co-card>
            </pc-view>

            <mobile-view>
                <co-card>
                    <template v-slot:header>
                        <div class="mobile-create-header">
                            <el-input class="mobile-create-title" clearable v-model="params.title"/>
                        </div>
                    </template>
                    <template v-slot:content>
                        <div class="row-start-end mobile-row-line">
                            <el-input class="mobile-create-author" v-model="params.author" clearable
                                      placeholder="默认为问卷发布人">
                                <template slot="prepend">收集人:</template>
                            </el-input>
                            <el-date-picker
                                class="mobile-create-endTime"
                                value-format="yyyy-MM-dd"
                                v-model="params.endTime"
                                placeholder="截止日期"/>
                        </div>

                        <div>
                            <el-select
                                class="mobile-create-group mobile-row-line"
                                v-model="value"
                                multiple
                                filterable
                                placeholder="通知群组内的朋友填写">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <co-text simple class="mobile-create-description">简要说明</co-text>
                        <el-input type="textarea" v-model="params.description" :autosize="{ minRows: 2}"/>
                    </template>
                </co-card>
            </mobile-view>

        </div>
    </div>
</template>

<script>
import CoCard from '../co-card.vue'
import {getFeature} from '@/api/time'
import CoTip from "@/components/co-tip";
import CoIcon from "@/components/co-icon";
import MobileView from "@/components/mobile-view";
import PcView from "@/components/pc-view";
import CoText from "@/components/co-text";

export default {
    props: {
        params: {
            editorValue: String,
        }
    },
    data() {
        return {
            editorOptions: ["MD编辑器", "纯文本编辑器"],
            options: [{
                value: 'HTML',
                label: 'HTML'
            }, {
                value: 'CSS',
                label: 'CSS'
            }, {
                value: 'JavaScript',
                label: 'JavaScript'
            },{
                value: 'Java',
                label: 'Java'
            },{
                value: 'golang',
                label: 'golang'
            }],
            value: []
        }
    },
    computed: {
        MDEditor() {
            return this.params.editorValue === 'MD编辑器'
        }
    },
    components: {
        CoText,
        PcView,
        MobileView,
        CoIcon, CoTip, CoCard
    }
    ,
    created() {
        this.params.startTime = new Date();
        this.params.endTime = getFeature(7)
    }
    ,
}
</script>
<style lang="css" scoped>
@import "@/common/style/components/create/pc-create-head.css";
@import "@/common/style/components/create/mobile-create-head.css";
</style>
