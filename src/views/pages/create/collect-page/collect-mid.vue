<template>
    <div>
        <div class="collect-mid">
            <draggable class="create-mid" :style="{height: viewHeight(100)}" handle=".move"
                       v-model="templateData" :move="onMove" animation="500">
                <transition-group>
                    <div class="item" v-for="(element, index) in templateData" :key="index">
                        <div>
                            <components :ref="'jh' + index" :is="element.componentName" :idx="index" :params="element"
                                        :key="index"></components>
                        </div>
                    </div>
                </transition-group>
            </draggable>

            <div class="addComponent">
                <el-button size="small" @click="addComponent">添加组件</el-button>
            </div>

            <el-dialog title="选择组件" append-to-body :visible.sync="dialogVisible" :before-close="handleClose">
                <div class="context">
                    <h3>基础组件</h3>
                    <div class="items">
                        <div class="item-choice"
                             v-for="(item,index) in componentList" :key="index" @click="change(item)">{{ item.title }}
                        </div>
                    </div>

                    <h3>常用组件</h3>
                    <div class="items">
                        <div v-for="(item, index) in mostUse" class="item-choice" :key="index" @click="change(item)">
                            {{ item.title }}
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import coCard from '@/components/co-card.vue'
import jhHead from '@/components/create/jh-head.vue'
import jhFile from '@/components/create/jh-file.vue'
import jhInput from '@/components/create/jh-input.vue'
import jhRadio from '@/components/create/jh-radio.vue'
import jhMulti from '@/components/create/jh-multi.vue'
import {Message} from 'element-ui'
import {goto, viewHeight} from '@/api/util'
import {publish} from '@/api/request'
import vhCheck from "vh-check";

export default {
    data() {
        return {
            dialogVisible: false,
            componentList: this.$store.state.module,
            mostUse: this.$store.state.mostUseModule
        }
    },
    props: {
        templates: [],
    },
    components: {
        draggable, jhHead, jhFile, coCard, jhInput, jhRadio, jhMulti,
    },
    computed: {
        templateData: {
            get() {
                return this.templates
            },
            set(val) {
                this.$store.commit('clearTemplateAll')
                this.$store.commit('templatePush', val)
            },
        },
        templateDataString() {
            return JSON.stringify(this.templates)
        },
    },
    watch: {
        templateDataString(n, o) {
            localStorage.setItem('template', n)
        },
    },
    methods: {
        viewHeight,
        change(data) {
            console.log(data)
            let idx = this.$store.state.template.length
            data.number = idx
            // 使用JSON是为了拷贝对象，不这样做会导致左边组件和中间组件使用同一个对象而发送数据同步变化
            // 例如：点击左边组件，修改中间刚刚添加的组件值，会发现左边的组件值也同步发生了变化
            // 旧的写法： this.$store.commit('templatePush',data);
            this.$store.commit('templatePush', JSON.parse(JSON.stringify(data)));
            Message({
                message: "添加成功",
                type: 'success',
                showClose: true
            })
        },
        addComponent() {
            this.dialogVisible = !this.dialogVisible
        },
        copyUrl(url) {
            if (navigator.clipboard === undefined) {
                Message({
                    message: '浏览器不支持',
                    type: 'error',
                })
                return
            }
            navigator.clipboard.writeText(url)
            Message({
                message: '复制成功',
                type: 'success',
            })
        },
        goto,
        handleClose(done) {
            done()
        },

        onMove(e, originalEvent) {
            return e.relatedContext.index != 0
        },
        // 清空模板（除head之外）
        clearTemplate(that) {
            that.$store.commit('clearTemplate')
            Message({
                message: '已清除模板',
                type: 'success',
            })
        },
        clearCache() {
            localStorage.clear()
            location.reload()
        },
        // 发布模板
        publish(that) {
            let ret = []
            for (let i = 0; i < that.templates.length; i++) {
                let dom = that.$refs['jh' + i][0]
                dom._props.params.componentName = dom.$options._componentTag
                let data = dom._props.params
                if (
                    data.deleted == null ||
                    data.deleted == false
                )
                    ret.push(data)
            }
            // 测试代码
            let idx = 1
            ret.forEach((ele) => {
                let str = '\n'
                for (let each in ele) {
                    str = str + each + ':' + ele[each] + ',\n'
                }
                console.log(idx + ':' + str)
                idx++
            })


            // TODO 上传数据，接收二维码和链接地址
            publish(ret).then(ret => {
                Message({
                    message: '发布成功',
                    type: "success",
                    showClose: true,
                })
            });

            //   that.dialogVisible = true
        },
        initMenus() {
            let menus = this.$parent.$parent.$children[0].menus
            let options = [
                {
                    name: '发布',
                    execute: this.publish,
                    param: this,
                    colorStyle: {
                        color: 'rgb(102,177,255)',
                    },
                },
                {
                    name: '清空模板',
                    execute: this.clearTemplate,
                    param: this,
                    colorStyle: {
                        color: 'rgb(103,194,58)',
                    },
                },
                {
                    name: '清空缓存',
                    execute: this.clearCache,
                    param: this,
                    colorStyle: {
                        color: 'rgb(235,181,99)',
                    },
                },
                {name: '我的', execute: this.goto, param: '/manager'},
            ]
            menus.length = 0
            options.forEach((option) => {
                menus.push(option)
            })
        },
    },
    mounted() {
        this.initMenus()
    },
}
</script>
<style lang="css" scoped>

.item {
    border-bottom: 2px dashed rgb(238, 238, 238);
}

img {
    width: 100px;
}

/*-----------------------------*/

h3 {
    height: 50px;
    margin-top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    color: rgb(36, 37, 37);
}


/*.items {*/
/*    display: grid;*/
/*    grid-gap: 10px;*/
/*    grid-template-columns: repeat(auto-fill, 100px);*/
/*    justify-content: space-around;*/
/*}*/

.item-choice {
    background-color: #e8ecef;
    color: black;
    /*width: 100px;*/
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    user-select: none;
    cursor: pointer;
}

.item-choice > * {
    display: flex;
    justify-content: center;
    align-items: center;
}

.item-choice:hover {
    color: dodgerblue;
    transition-duration: 200ms;
}

.addComponent {
    display: none;
}

>>> .el-dialog {
    width: 100%;
    height: 80%;
    margin: 0;
    position: absolute;
    bottom: 0px;
}

>>> .el-dialog__body {
    position: absolute;
    left: 0;
    top: 54px;
    bottom: 0;
    right: 0;
    padding: 0;
    overflow: auto;
}

.collect-mid {

}

@media screen and (max-width: 600px) {
    .addComponent {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        bottom: 0;
        position: absolute;
        overflow: hidden;
        box-shadow: 0 0 2px 0 rgb(0, 0, 0, .2);
    }

    .addComponent >>> .el-button {
        background-color: #409EFF;
        color: white;
    }

    .create-mid {
        /*co-header: 50px, button: 50px*/
        /* TODO */
        /*height: calc(100vh - var(--vh-offset, 100px));*/
        overflow: auto;
        /*border: 1px solid red;*/
        z-index: 999;
    }

    .items {
        display: grid;
        gap: 16px;
        padding: 0 8px;
        grid-template-columns: repeat(auto-fit, minmax(100px, 2fr));
        justify-content: space-between;
    }
}
</style>
