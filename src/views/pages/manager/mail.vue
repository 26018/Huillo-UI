<template>
    <div>
        <div class="mail">
           <div v-for="i in 100">
               <div class="mail-row">
                   <div>欢迎使用Huillo，点击查看Huillo公约</div>

                   <div>2022-02-03
                       <el-badge is-dot class="item"></el-badge>
                   </div>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
@import "@/common/style/views/mail.css";
</style>