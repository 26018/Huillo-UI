<template>
  <div>
    <div>
      <co-card v-if="!params.deleted">
        <template v-slot:header>
          <div class="submit-title">{{params.title}}</div>
          <div class="operation-frame">
            <div style="float: right;color: red;user-select: none" v-if="!params.required">
              *
            </div>
          </div>
        </template>
        <template v-slot:content>
          <el-input class="description" v-model="params.description"
                    placeholder="添加选项描述"></el-input>
          <el-input placeholder="此处由提交者填写" v-model="params.answer"></el-input>
        </template>
      </co-card>
    </div>
  </div>
</template>

<script>
import {closeComponent} from '@/api/util'
import CoCard from '../co-card.vue'

export default {
  props: {
    params: {
      title: String,
      need: Boolean,
      options: Array,
      details: String,
      selected: Array,
      answer:String,
      optional:Boolean // 选填
    },
  },
  data() {
    return {}
  },

  components: {CoCard},

  methods: {
    closeComponent,
  },
}
</script>
<style lang="css" scoped>
@import url('@/common/style/co-item.css');
@import url('@/common/style/font.css');

.input {
}

.input>>>.el-input__inner {
  padding-left: 0;
  border-radius: 0;
  background-color: transparent;
}

.description>>>*{
  padding-left: 0;
}

>>>.el-input {
  border: 0px;
}

>>>.el-input__inner {
  border: 0px;
  padding-left: 0;
}
</style>
