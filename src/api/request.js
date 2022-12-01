import axios from "axios";

export function publish(dataList) {
    return axios({
        method: "post",
        url: "/api/question/create",
        data: dataList,
    });
}

export function pullData(questionId) {
    return axios({
        method: "get",
        url: "/api/question/query/" + questionId,
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
        url: "/api/user/file/push",
        method: "post",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: formDatas,
    });
}

export function QuestionList() {
    return axios({
        url: "/api/question/list",
        method: "get",
    });
}


export function getList(pageNumber) {
    return axios({
        url: "/api/question/queryPage",
        method: "get",
        params: {
            "pageNumber": pageNumber,
        }
    })
}

export function getImage(id, size) {
    return axios({
        url: '/api/question/qrcode/' + id + "/" + size,
        method: 'get',
        responseType: 'blob'
    })
}

export function questionnaireDetail(id) {
    return axios({
        url: "/api/question/queryDetailInfo/" + id,
        method: 'get'
    })
}

export function shareQuestionnairePath(quesId) {
    return axios({
        url: "/api/question/shareQuestionPath/" + quesId,
        method: "get"
    })
}

export function closeQuestionnaire(quesId) {
    return axios({
        url: "/api/question/close/" + quesId,
        method:"get"
    })
}