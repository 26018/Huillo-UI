<template>
  <div style="background-color: rgb(243,246,249)">
    <div class="submit">
      <div v-for="(component, index) in templateData" class="gg"
           :key="index">
        <components :ref="'jh' + index" :is="component.componentName" :idx="index" :params="component"
                    :key="index"></components>
      </div>

    </div>
    <div class="submitBtn">
      <el-button @click="submitCollect" style="width: 30%;height: 40px" type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
import coCard from '@/components/co-components/co-card.vue'
import jhHead from '@/components/co-components/submit/jh-submit-head.vue'
import jhFile from '@/components/co-components/submit/jh-submit-file.vue'
import jhInput from '@/components/co-components/submit/jh-submit-input.vue'
import jhRadio from '@/components/co-components/submit/jh-submit-radio.vue'
import jhMulti from '@/components/co-components/submit/jh-submit-multi.vue'
import {pullData, QuestionList} from '@/api/request'

export default {
  data() {
    return {
      templateData: [],
    }
  },

  components: {
    jhHead,
    jhFile,
    coCard,
    jhInput,
    jhRadio,
    jhMulti,
  },

  computed: {},

  methods: {
    getElementValue(obj, index) {
      obj.number = index
      return obj
    },
    submitCollect() {
      alert('截止了')
    },
  },
  created() {
    // TODO 获取服务器数据，动态生成页面
    let id = this.$route.params.id
    pullData(id).then((res) => {
      let dataList = res.data.data.components
      let result = []
      dataList.forEach((data) => {
        if (data.options != null) {
          data.options = JSON.parse(data.options)
        }
        result.push(data)
      })
      this.templateData = result
      console.log(this.templateData)
      console.log("Test here!")
    })

    // QuestionList().then(res=>{
    //     console.log("List:")
    //     console.log(res.data)
    // });
  },
}
</script>
<style lang="css" scoped>

.gg{
  border-bottom: 2px dashed rgb(238,238,238);
}

.submit {
  width: 60%;
  height: 100vh;
  margin: 0 auto;
  height: calc(100% - 59px);
  overflow: auto;
  background-color: white;
}

.submitBtn {
  display: flex;
  justify-content: center;
  position: sticky;
  width: 60%;
  margin: 0 auto;
  height: 60px;
  background-color: white;
  display: flex;
  border-top: 1px solid gainsboro;
  align-items: center;
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

@media screen and (max-width: 992px) {
  .submit {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    height: calc(100% - 59px);
    overflow: auto;
    background-color: white;
  }

  .submitBtn {
    display: flex;
    justify-content: center;
    position: sticky;
    margin: 0 auto;
    height: 60px;
    background-color: white;
    display: flex;
    border-top: 1px solid gainsboro;
    align-items: center;
    width: 100%;
  }
}
</style>
