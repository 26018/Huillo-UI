<template>
  <div>
    <div>
      <co-card v-if="!params.deleted">
        <template v-slot:header>
          <div class="noselect font-title">{{ params.title }}</div>
          <div class="operation-frame">
            <div style="float: right;color: red;user-select: none" v-if="!params.required">
              *
            </div>
          </div>
        </template>

          <el-input type="textarea" :autosize="{minRows: 1}" class="description" v-model="params.description" placeholder="添加选项描述"></el-input>
          <template v-slot:content>
          <el-upload drag
                     action="fakeURL"
                     :auto-upload="params.autoUpload"
                     :on-change="getList"
                     :file-list="params.fileList"
                     name="files"
                     :http-request="uploadWithParams"
                     multiple>
            <div class="abc">
              <i class="el-icon-upload uploadIcon"></i>
            </div>
            <div class="el-upload__text uploadIcon">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>

          <div>
            <el-button style="margin-right: 20px"
                       v-if="!params.autoUpload"
                       size="small"
                       type="primary"
                       @click="uploadFile()">上传
            </el-button>
            <el-select v-if="params.type"
                       style="margin-top: 8px"
                       class="name-rule"
                       v-model="params.selected"
                       multiple
                       placeholder="请选择文件命名规则">
              <el-option v-for="item in params.list"
                         :key="item.value"
                         :label="item"
                         :value="item"></el-option>
            </el-select>
          </div>
        </template>
      </co-card>
    </div>
  </div>
</template>

<script>
import CoCard from '../co-card.vue'
import {closeComponent} from '@/api/util'
import {pushFile} from '@/api/request'
import axios from 'axios'

export default {
  props: {
    params: {
      title: String,
      need: Boolean,
      type: true, // 附件上传类型 || 附件下发类型
      list: Array,
      selected: Array,
      deleted: false,
      autoUpload: false,
      optional: Boolean // 选填
    },
  },
  data() {
    return {
      data: {},
    }
  },
  components: {CoCard},
  computed: {
    getType() {
      return this.params.type
    },
  },
  watch: {
    getType(n, o) {

    },
  },
  methods: {
    closeComponent,
    pushFile,
    getList(file, fileList) {
      // console.log("on-change:"+fileList)
      this.params.fileList = fileList
    },
    uploadFile() {
      pushFile(this.params.fileList, false).then((res) => {
        console.log('文件上传状态：')
        console.log(res)
      })
    },

    // 覆盖elementUI 上传组件的默认行为
    uploadWithParams(param) {
      console.log('自动上传...')
      pushFile([param.file], true).then((res) => {
        console.log('文件上传状态：')
        console.log(res)
      })
    },
  },

  created() {
    console.log(this.params.autoUpload)
  },
}
</script>
<style lang="css" scoped>
@import url('@/common/style/font.css');

</style>
