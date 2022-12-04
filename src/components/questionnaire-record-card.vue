<template>
    <div>
        <div class="record-card">
            <div style="display: flex">
                <div class="title" @click="$emit('detail')">{{ data.title }}</div>
            </div>
            <div class="times">
                <co-text simple>收集者：{{ data.author }}</co-text>
                <co-text simple>状态：<span :style="{color: statusColor }">{{ questionnaireStatus }}</span></co-text>
            </div>

            <div class="times">
                <co-text simple>创建时间: {{ DateFormatter(data.startTime, '/') }}</co-text>
                <co-text simple>截止时间: {{ DateFormatter(data.endTime, '/') }}</co-text>
            </div>
            <div class="options">
                <el-button type="text" @click.stop="$emit('delete')">删除收集</el-button>
                <el-button type="text" style="color: red" @click="$emit('close')">结束收集</el-button>
                <el-button type="text" style="color: sandybrown" @click="$emit('share')">分享</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {DateFormatter} from "@/api/time";
import CoText from "@/components/co-text";

export default {
    name: "questionnaire-record-card",
    components: {CoText},
    props: ['data'],
    computed: {
        questionnaireStatus() {
            if (new Date(this.data.endTime) < Date.now()) {
                this.statusColor = 'red'
                return "已结束"
            }
            this.statusColor = 'green'
            return "收集中"
        }
    },
    methods: {
        DateFormatter,
    },
    data() {
        return {
            statusColor: ""
        }
    }
}
</script>

<style scoped>
.record-card {
    border-radius: 8px;
    padding: 16px;
    margin: 8px auto 0;
    background-color: white;
    box-sizing: border-box;
    box-shadow: 0 0 2px 0 rgb(0, 0, 0, .2);
    pointer-events: auto;
}

.tags {
    display: flex;
    margin-left: auto;
    align-items: center;
}

.tags > * {
    margin-left: 8px;
}

.options {
    display: flex;
    flex-direction: row-reverse;
}

.options > * {
    margin-left: 16px;
    pointer-events: auto;
}

.title {
    font-size: 26px;
    cursor: pointer;
}

.description {
    color: #888888;
}

.times {
    display: flex;
    color: lightslategray;
}

.times :last-child {
    margin-left: auto;
}

.times > * {
    /*margin: 4px 0;*/
}


</style>