<template>
    <div>
        <div class="jh-file">
            <co-card v-if="!params.required">
                <template v-slot:header>
                    <co-text simple size="medium">{{ params.title }}</co-text>
                </template>

                <template v-slot:content>
                    <co-text simple size="small">{{ params.description }}</co-text>
                    <el-upload drag action="fakeURL" :auto-upload="params.autoUpload"
                               :file-list="params.fileList" name="files" multiple>
                        <div><i class="el-icon-upload uploadIcon"></i></div>
                        <div class="el-upload__text uploadIcon">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>

                    <div class="options">
                        <el-button v-if="!params.autoUpload" size="small" type="primary"
                        >上传
                        </el-button>
                        <el-select size="small" style="margin-top: 8px" class="name-rule" v-model="params.selected"
                                   multiple placeholder="请选择文件命名规则">
                            <el-option v-for="item in params.list" :key="item.value" :label="item" :value="item"></el-option>
                        </el-select>
                    </div>
                </template>
            </co-card>
        </div>
    </div>
</template>

<script>
import CoCard from '@/components/co-card.vue'
import CoText from "@/components/co-text";

export default {
    props: {
        params: {
            title: String,
            list: Array,
            selected: Array,
            deleted: false,
            autoUpload: false,
            required: Boolean,// 选填

        },
    },
    data() {
        return {
            data: {},
        }
    },
    components: {CoText, CoCard},
    computed: {
        getType() {
            return this.params.type
        },
    },

    methods: {},

    created() {

    },
}
</script>
<style lang="css" scoped>
.jh-file {

}

.jh-file >>> .el-upload {
    width: 100%;
}

.jh-file >>> .el-upload-dragger {
    width: 100%;
}

.options {
    display: flex;
}

.options > * {
    margin-top: 8px;
}

.options .el-button {
    margin-right: 20px;
}

.options :last-child {
    margin-left: auto;
}

.options >>> .el-select {
    flex: 1;
}

</style>
