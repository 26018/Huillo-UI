<template>
    <div>
        <div class="co-header font-text" ref="coHeader">
            <div @click="goto('/index')" class="logo click-able font-text">Huillo</div>
            <div class="text-content click-able space poem" @click="query(current)">{{ current }}</div>
            <div class="menus">
                <div class="logo space click-able font-text" v-for="(menu, index) in menus" @click="execute(menu)"
                     :style="menu.colorStyle"
                     :key="index">
                    {{ menu.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('@/common/style/font.css');

.co-header {
    width: 100%;
    height: 50px;
    padding: 0px 10px;
    top: 0;
    position: sticky;
    box-sizing: border-box;
    display: flex;
    background-color: white;
    box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, .2);
}

.co-header >>> * {
    text-align: justify;
    word-break: break-all;
}

.logo {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.space {
    margin-left: 20px;
}

.text-content {
    display: flex;
    justify-content: center;
    align-items: center;
}

.menus {
    display: flex;
    margin-left: auto;
    justify-content: flex-end;
}

.click-able {
    cursor: pointer;
    user-select: none;
}

/*.click-able > *{*/
/*    -webkit-tap-highlight-color: rgba(255,255,255,0);*/
/*}*/

.click-able:hover {
    cursor: pointer;
    color: dodgerblue;
}

@media screen and (max-width: 600px){
    .poem{
        display: none;
    }
}

</style>
<script>
import {goto} from '@/api/util'

export default {
    props: {
        menus: {
            type: Array,
            name: String,
            execute: Function,
            param: Object,
        },
    },
    data() {
        return {
            poem: [
                '客散酒醒深夜后，更持红烛赏残花。',
                ' 向来万里意，今在一窗间',
                ' 放慵真有味，应俗苦相妨。',
            ],
            current: '',
        }
    },
    methods: {
        goto,
        // 执行传递到导航栏的方法
        execute(v) {
            v.execute(v.param)
        },
        query(value) {
            window.open('https://cn.bing.com/search?q=' + value, '_blank')
        },
    },

    created() {
        let count = localStorage.getItem('idx')
        if (typeof count !== Number) {
            count = 0
        }
        this.current = this.poem[count]
        setInterval(() => {
            this.current = this.poem[count++]
            localStorage.setItem('idx', count)
            count = count % this.poem.length
        }, 5000)
    },
}
</script>
