<template>
  <div>
    <draggable v-model="templateData" :move="onMove" handle=".move" animation="500">
      <transition-group>
        <div class="item" v-for="(element, index) in templateData" :key="index">
          <div style="margin: 0px 48px 0px 48px">
            <components :ref="'jh' + index" :is="element.componentName" :idx="index" id="test"
                        :params="getParams(element, index)" :key="index"></components>
          </div>
        </div>
      </transition-group>
    </draggable>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <h2>发布成功！快去分享吧</h2>
      <h4>复制以下链接或扫描二维码参与</h4>
      <div class="urlString">
        <div>http://fixyou.top</div>
        <el-button type="text" @click="copyUrl('http://fixyou.top')">快速复制</el-button>
      </div>

      <img src="@/assets/fixyou.png" alt="" class="urlImg"/>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import coCard from '@/components/co-components/co-card.vue'
import jhHead from '@/components/co-components/create/jh-head.vue'
import jhFile from '@/components/co-components/create/jh-file.vue'
import jhInput from '@/components/co-components/create/jh-input.vue'
import jhRadio from '@/components/co-components/create/jh-radio.vue'
import jhMulti from '@/components/co-components/create/jh-multi.vue'
import {Message} from 'element-ui'
import {goto} from '@/api/util'
import {publish} from '@/api/request'

export default {
  data() {
    return {
      dialogVisible: false,
    }
  },
  props: {
    templates: [],
  },
  components: {
    draggable,
    jhHead,
    jhFile,
    coCard,
    jhInput,
    jhRadio,
    jhMulti,
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
      // console.log("实时更新")
      localStorage.setItem('template', n)
    },
  },

  methods: {
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
      this.$confirm('确认关闭？')
          .then((_) => {
            done()
          })
          .catch((_) => {
          })
    },
    clearFormData() {
      alert('TODO 还没写')
    },
    onMove(e, originalEvent) {
      return e.relatedContext.index != 0
    },
    getParams(obj, index) {
      obj.number = index
      return obj
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
      publish(ret);

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
          name: '清空数据',
          execute: this.clearFormData,
          param: this,
          colorStyle: {
            color: 'red',
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
          name: '清空所有缓存',
          execute: this.clearCache,
          param: this,
          colorStyle: {
            color: 'rgb(235,181,99)',
          },
        },
        {name: '我的', execute: this.goto, param: '/user'},
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
  border-left: 2px solid gainsboro;
  border-right: 2px solid gainsboro;
}

.urlString {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
}

.urlString > * {
  /* border: 1px solid red; */
  margin-right: 20px;
}

.urlImg {
  width: 200px;
  /* border: 1px solid red; */
  margin-top: 8px;
  box-shadow: 0px 2px 5px #888888;
}

#test:deep(.item-main:hover) {
  /*background-color: rgb(255, 255, 255);*/
  /*transform: scale(1.001);*/
  /*transition-duration: 200ms;*/
  /*box-shadow: 0 1px 4px rgba(104, 105, 155, 0.3),*/
  /*  0 0 40px rgba(104, 105, 155, 0.1) inset;*/
}
</style>
