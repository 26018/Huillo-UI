import axios from "axios";

export function publish(dataList) {
    axios({
        method: "post",
        url: "http://localhost/question/push",
        data: dataList,
    });
}

export function pullData(questionId) {
    return axios({
        method: "get",
        url: "http://localhost/question/pull/" + questionId,
    });
}

// 待上传的文件列表     自动上传
export function pushFile(fileList, autoUpload) {
    let formDatas = new FormData();
    if (fileList == null) {
        return new axios();
    }
    fileList.forEach((file) => {
        formDatas.append("files", autoUpload ? file : file.raw);
    });
    return axios({
        url: "http://localhost/user/file/push",
        method: "post",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: formDatas,
    });
}

export function QuestionList() {
    return axios({
        url: "http://localhost/question/list",
        method: "get",
    });
}


export function getList(pageNumber) {
    return axios({
        url: "http://localhost/question/list",
        method: "get",
        params:{
            "pageNumber": pageNumber,
        }
    })
}