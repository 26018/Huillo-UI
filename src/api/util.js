import router from '@/router';
import store from '@/store';

// const os = require('os');
// resolve.fallback: { "os": false }


// 路由跳转
export function goto(path) {
    let currentPath = router.history.current.fullPath;
    // console.log(currentPath, path);
    if (currentPath != path) router.push(path);
}

// 保存模板信息至本地
export function updateTemplate(value) {
    localStorage.setItem('template', JSON.stringify(value));
}

// 获取本地存储的模板信息
export function getTemplate() {
    return JSON.parse(localStorage.getItem('template'));
}

// 清空除头部外的模板
export function clearTemplate(thisFunction) {
    let tempList = thisFunction().$store.state.collectList;
    tempList.splice(1, tempList.length - 1);
    updateTemplate(tempList);
}

// 删除组件
export function closeComponent(params) {
    console.log("关闭点击", params)
    store.commit('removeTemplateItem', params.number);
}

/**
 *获取未来时间
 *num number
 */
export function getFeature(num) {
    var t = new Date();
    var iToDay = t.getDate();
    var iToMon = t.getMonth();
    var iToYear = t.getFullYear();
    var newDay = new Date(iToYear, iToMon, iToDay + num);
    return newDay;
}

export function isMobile(){
    return window.innerWidth < 600;
}
