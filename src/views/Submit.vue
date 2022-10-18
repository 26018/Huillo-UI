<template>
  <div>
    <co-card class="submit">
      <template v-slot:content>
        <div>
          <div class="item"
               v-for="(element, index) in templateData"
               :key="index">
            <div style="margin: 0px 8px 8px 8px">
              <components :ref="'jh' + index"
                          :is="element.key"
                          :idx="index"
                          :params="getElementValue(element.value, index)"
                          :key="index"></components>
            </div>
          </div>
          <co-card style="margin: 0px 10px 10px 10px">
            <template v-slot:content>
              <el-button @click="submitCollect"
                         type="primary">提交</el-button>
            </template>
          </co-card>
        </div>
      </template>
    </co-card>
  </div>
</template>

<script>
import coCard from '@/components/co-components/co-card.vue'
import jhHead from '@/components/co-components/jh-head.vue'
import jhFile from '@/components/co-components/jh-file.vue'
import jhInput from '@/components/co-components/jh-input.vue'
import jhRadio from '@/components/co-components/jh-radio.vue'
import jhMulti from '@/components/co-components/jh-multi.vue'
import { pullData, QuestionList } from '@/api/request'
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
    pullData(1).then((res) => {
      let dataList = res.data.data
      let result = []
      dataList.forEach((data) => {
        if (data.options != null) {
          data.options = JSON.parse(data.options)
        }
        result.push({
          key: data.componentName,
          value: data,
        })
      })
      this.templateData = result
      console.log(this.templateData)
      console.log("Test here!")
    })

    QuestionList().then(res=>{
        console.log("List:")
        console.log(res.data)
    });
  },
}
</script>
<style lang="css" scoped>
.submit {
  width: 60%;
  margin: 0 auto;
  background-color: rgb(246, 246, 249);
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
</style>
