<template>
    <div>
        <div class="group-card">
            <div class="group-title">{{ data.title }}</div>
            <div class="row">
                <div>成员</div>
                <div class="group-member">{{ data.member }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "group-card",
    data() {
        return {}
    },
    props: ['data']
}
</script>

<style scoped>
.group-card {
    border-radius: 8px;
    box-sizing: border-box;
    cursor: pointer;
    padding: 8px;
    margin: 0 8px 8px 0px;
    box-shadow: 0 0 2px 0 rgb(0, 0, 0, .2);
}

.group-title {
    font-size: 18px;
}

.group-member {
    font-size: 24px;
    margin-left: auto;
}

.row {
    display: flex;
    align-items: baseline;
    user-select: none;
    margin-top: 16px;
}

.row :first-child{
    font-size: 14px;
}
.row :last-child{
    color: slateblue;
}

@media screen and (max-width: 600px) {

}

</style>