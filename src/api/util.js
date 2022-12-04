import router from '@/router';
import store from '@/store';
import vhCheck from "vh-check";
import {Message} from "element-ui";
import {getImage} from "@/api/request";


// 路由跳转
export function goto(path) {
    let currentPath = router.history.current.fullPath;
    if (currentPath !== path) {
        router.push(path);
    }
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
    if (params.number == null) {
        Message({
            message: "无Number定位",
            type: "error",
            duration: 3000,
            showClose: true,
        })
        return;
    }
    store.commit('removeTemplateItem', params.number);
}


export function isMobile() {
    return window.innerWidth < 600;
}

export function viewHeight(headerHeight) {
    let object = vhCheck();
    return object.vh - object.offset - headerHeight + 'px';
}

export function addOption(options) {
    if (options == null) {
        options = [];
    }
    let length = options.length + 1;
    options.push('新选项' + length);
    return options;
}

// 删除选项，同步删除已选择中的选项
export function removeOption(options, selects, optionValue) {
    if (options == null) {
        options = [];
    }
    for (let i = 0; i < options.length; i++) {
        if (options[i] == optionValue) {
            options.splice(i, 1);
            break;
        }
    }
    for (let i = 0; i < selects.length; i++) {
        if (selects[i] == optionValue) {
            selects.splice(i, 1);
            break;
        }
    }
}

