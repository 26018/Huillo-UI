<template>
  <div>
    <div>
      <co-card>
        <template v-slot:header>
          <div class="row">
            <div class="submit-title">{{ params.title }}</div>
            <div class="submit-dueDate">截止时间: {{ new Date(params.dueDate).toLocaleDateString() }}</div>
          </div>
        </template>

        <template v-slot:content>
          <div class="content">
            <div class="submit-collector">收集人:{{ params.author }}</div>
            <div v-if="params.description != null">
              <div class="submit-description-title">详细说明</div>
              <pre class="submit-description-content">{{ params.description }}</pre>
            </div>
          </div>
        </template>
      </co-card>
    </div>
  </div>
</template>

<script>
import CoCard from '../co-card.vue'
import {getFeature} from '@/api/util'
import {JhHead} from '@/common/data/ComponentProps'

export default {
  props: {
    params: JhHead(),
  },
  data() {
    return {
      data: {},
    }
  },
  methods: {
    getFeature,
  },
  components: {CoCard},
  created() {
    this.params.dueDate = getFeature(7)
    this.params.author = "周杰伦";
    // this.params.description = null;
  },
}
</script>
<style lang="css" scoped>

.header {
  font-size: 2px;
}

pre {
  margin: 0;
}

.input >>> * {
  font-size: 32px;
  border: 0px;
  outline: none;
  padding-left: 0;
  border-radius: 0;
  background-color: transparent;
}

.row {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.content >>> * {
  margin-top: 8px;
  /*border: 1px solid red;*/
}

.submit-description-title {
  color: gray;
}

.submit-description-content {
  background-color: #e8ecef;
  padding: 10px;
  border-radius: 4px;
  white-space: pre-wrap; /*css-3*/
  white-space: -moz-pre-wrap; /*Mozilla,since1999*/
  white-space: -pre-wrap; /*Opera4-6*/
  white-space: -o-pre-wrap; /*Opera7*/
  word-wrap: break-word; /*InternetExplorer5.5+*/
}

.submit-collector {

}

.submit-dueDate {
  font-size: 14px;
  margin-left: auto;
  display: flex;
  align-items: center;
  background-color: #e8ecef;
  padding: 10px;
  border-radius: 4px;
}


</style>
