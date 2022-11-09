<template>
  <div>

<!--    <div v-show="!bigDevice"-->
<!--         @click="goto('/')"-->
<!--         style="width: 100%;-->
<!--    display: flex;justify-content: center;-->
<!--    height: 40px;-->
<!--    align-items: center;">Huillo-->
<!--    </div>-->

    <draggable class="create-mid" v-model="templateData" :move="onMove" handle=".move" animation="500">
      <transition-group>
        <div class="item" v-for="(element, index) in templateData" :key="index">
          <div>
            <components :ref="'jh' + index" :is="element.componentName"
                        :idx="index"
                        :params="element" :key="index"></components>
          </div>
        </div>
      </transition-group>
    </draggable>


    <div style="display: flex;
    justify-content:center;
    width: 100%;
    padding-bottom: 20px;
    border: 0px solid red">
      <el-button size="small" @click="addComponent">添加组件</el-button>
    </div>


    <el-dialog title="选择组件" v-show="!bigDevice" :visible.sync="dialogVisible" width="90%"
               :before-close="handleClose">
      <!--      <h2>发布成功！快去分享吧</h2>-->
      <!--      <h4>复制以下链接或扫描二维码参与</h4>-->
      <!--      <div class="urlString">-->
      <!--        <div>http://fixyou.top</div>-->
      <!--        <el-button type="text" @click="copyUrl('http://fixyou.top')">快速复制</el-button>-->
      <!--      </div>-->

      <!--      <img src="@/assets/fixyou.png" alt="" class="urlImg"/>-->

      <!--      <span slot="footer" class="dialog-footer">-->
      <!--            <el-button @click="dialogVisible = false">取 消</el-button>-->
      <!--            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
      <!--          </span>-->

      <div class="items-container kk font-text">
        <h3>基础组件</h3>
        <div class="items">
          <div class="item-choice"
               v-for="(item,index) in componentList"
               :key="index"
               @click="change(item)">{{ item.title }}
          </div>
        </div>

        <h3>常用组件</h3>
        <div class="items">
          <div v-for="(item, index) in mostUse"
               class="item-choice"
               :key="index"
               @click="change(item)">
            <!--          <co-icon :imgSrc="src[index % src.length]"></co-icon>-->
            <span v-html="'\u00a0'"></span>
            {{ item.title }}
          </div>
        </div>
      </div>
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
      bigDevice: true,
      componentList: this.$store.state.module,
      mostUse: this.$store.state.mostUseModule
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
      // this.$confirm('确认关闭？')
      //     .then((_) => {
      //       done()
      //     })
      //     .catch((_) => {
      //     })
    },
    clearFormData() {
      alert('TODO 还没写')
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
  created() {
    this.bigDevice = document.body.clientWidth > 992
    this.initMenus()
    console.log(this.templateData)
  },
}
</script>
<style lang="css" scoped>

.create-mid {
  /*height: calc(100% - 60px);*/
  /*height: 100%;*/
  /*overflow: auto;*/
  /*border: 1px solid red;*/
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

.items-container {
  width: 100%;
  max-height: 600px;
  overflow: auto;
  /*position: sticky;*/
}

.items {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}

.item-choice {
  background-color: #e8ecef;
  color: black;
  width: 100px;
  height: 40px;
  margin: 16px;
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

.kk {
  height: 400px;
  overflow: scroll;
}

</style>
