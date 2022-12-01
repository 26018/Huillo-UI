<template>
    <div>
        <div class="radio">
            <co-card>
                <template v-slot:header>
                    <co-text simple size="medium">{{ params.title }}</co-text>
                </template>

                <template v-slot:content>
                    <co-text simple>{{ params.description }}</co-text>
                    <el-radio-group v-model="params.answer">
                        <div class="radio-container" v-for="option in params.options">
                            <el-radio :label="option"></el-radio>
                        </div>
                    </el-radio-group>
                </template>
            </co-card>
        </div>
    </div>
</template>

<script>
import coCard from '../co-card.vue'
import {closeComponent} from '@/api/util'
import CoText from "@/components/co-text";

export default {
    components: {CoText, coCard},
    props: {
        params: {

        }
    },
    data() {
        return {}
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
        this.params.answer = "";
    }
}
</script>
<style lang="css" scoped>
.el-radio-group {
    /*box-sizing: border-box;*/
    padding: 4px 0;
    width: 100%;
}

.radio-container {
    margin: 0 0 8px 0;
}

.el-radio {
    width: 100%;
}

.el-radio-group {
    margin-top: 4px;
}

</style>
