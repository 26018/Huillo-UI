import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    template: localStorage.getItem('template') == null ? require('@/common/data/InitComponent.json') : JSON.parse(localStorage.getItem('template')),
    module: require('@/common/data/Components.json'),
    mostUseModule: require('@/common/data/MostUse.json'),
};

const getters = {};

const mutations = {
    // 存
    templatePush(state, ...value) {
        let data = value[0];
        // 单个数据
        if (data.length == null) {
            state.template.push(data);
        } else {
            // 一个数组
            for (let index in data) {
                state.template.push(data[index]);
            }
        }
        localStorage.setItem('template', JSON.stringify(state.template));
    },
    // 按下标取
    getTemplateObject(index) {
        return state.template[index];
    },
    // 按下表删
    removeTemplateItem(state, index) {
        state.template.splice(index, 1);
        localStorage.setItem('template', JSON.stringify(state.template));
    },
    // 除了head之外，删除全部元素
    clearTemplate(state) {
        let length = state.template.length;
        state.template.splice(1, length - 1);
        localStorage.setItem('template', JSON.stringify(state.template));
    },
    
    clearTemplateAll(state) {
        let length = state.template.length;
        state.template.splice(0, length);
    },
};

const actions = {};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
});
