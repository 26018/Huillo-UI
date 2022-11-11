<template>
    <div>
        <div>
            <co-card class="head">
                <template v-slot:header class="header">
                    <div class="km">
                        <el-input class="create-title" v-model="params.title"/>
                        <el-date-picker class="date-end" v-model="params.dueDate" placeholder="截止日期"/>
                    </div>
                </template>
                <template v-slot:content>
                    <div class="mobile">
                        <el-input class="self" v-model="params.author">
                            <template slot="prepend">
                                <co-tip>收集人:</co-tip>
                            </template>
                        </el-input>

                        <div style="display: flex;align-items: center;">
                            <co-tip style="border-bottom: 2px solid rgb(234, 241, 253);">结束时间:</co-tip>
                            <el-date-picker class="self" v-model="params.dueDate">
                            </el-date-picker>
                        </div>

                        <co-tip>简要说明:</co-tip>
                        <el-input class="self" type="textarea" v-show="params.editorValue != 'MD编辑器'"
                                  v-model="params.description" :autosize="{ minRows: 2}"/>
                        <mavon-editor
                            :boxShadow="false" v-model="params.description"
                            v-show="params.editorValue == 'MD编辑器'">
                        </mavon-editor>
                    </div>

                    <div class="pc">
                        <el-input v-model="params.author" class="author" placeholder="请填写">
                            <template slot="prepend">收集人:</template>
                        </el-input>
                        <div style="width: 100%;height: fit-content;display: flex;border: 0px solid red;align-items: center">
                            <co-tip>详细说明</co-tip>
                            <el-select v-model="params.editorValue"
                                       class="create-select"
                                       placeholder="切换编辑器">
                                <el-option v-for="editorOption in editorOptions"
                                           :key="editorOption.value"
                                           :label="editorOption.value"
                                           :value="editorOption.value"></el-option>
                            </el-select>
                        </div>
                        <el-input type="textarea" v-show="params.editorValue != 'MD编辑器'"
                                  v-model="params.description" :autosize="{ minRows: 2}"/>
                        <mavon-editor :boxShadow="false" v-model="params.description"
                                      v-show="params.editorValue == 'MD编辑器'"></mavon-editor>

                    </div>

                </template>
            </co-card>
        </div>
    </div>
</template>

<script>
import CoCard from '../co-card.vue'
import {getFeature} from '@/api/util'
import CoTip from "@/components/co-components/co-tip";
import CoIcon from "@/components/co-components/co-icon";

export default {
    props: {
        params: {
            editorValue: "",
        }
    },
    data() {
        return {

            editorOptions: [{
                value: "MD编辑器",
                label: "MD编辑器"
            }, {
                value: "纯文本编辑器",
                label: "纯文本编辑器"
            }],
        }
    },
    methods: {},
    components: {CoIcon, CoTip, CoCard},
    created() {
        this.params.dueDate = getFeature(7)
    },
}
</script>
<style lang="css" scoped>
@import url('@/common/style/co-item.css');

>>> .el-textarea__inner {
    background-color: transparent;
}

>>> .el-input__inner {
    background-color: transparent;
}

>>> .el-textarea__inner {
    padding: 4px;
}

.self >>> .el-input__inner {
    border: 0;
    padding: 0;
    border-bottom: 2px solid rgb(234, 241, 253);
    border-radius: 0;
}

.self >>> .el-input-group__prepend {
    padding: 0;
    border: 0;
    border-bottom: 2px solid rgb(234, 241, 253);
    background-color: transparent;
}

.self >>> .el-input__prefix {
    display: none;
}

.self {
    width: 100%;
}

.el-select >>> .el-input__inner {
    border: 0px;
    max-width: 130px;
    min-width: 130px;
}


/*设定字体大小，以免被co-card统一限定*/
.date-end >>> .el-input__inner {
    border: 0;
    padding: 0 40px;
    font-size: 16px;
    max-width: 200px;
    min-width: 180px;
    background-color: #f7fcfe;
}


.author >>> .el-input__inner {
    outline: none;
    border: 0px;
    padding-left: 8px;
    background-color: transparent;
    min-width: 150px;
}

.author >>> .el-input-group__prepend {
    background-color: transparent;
    border: 0px;
    padding: 0px;
    font-size: 16px;
}

.km {
    display: flex;
    width: 100%;
}

.mobile {
    display: none;
}


@media screen and (max-width: 992px) {
    .km {
        display: flex;
        flex-direction: column;
    }

    .km > .date-end >>> .el-input__icon {
        padding-left: 0;
        width: auto;
        margin-left: 0;
    }

    .km > .date-end >>> .el-input__inner {
        padding: 0 30px;
    }

    .date-end {
        display: none;
    }

    .mobile {
        display: unset;
    }

    .pc {
        display: none;
    }
}

</style>
