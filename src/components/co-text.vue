<template>
    <div>
        <div :class="text_style">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "co-text",
    props: {
        simple: Boolean,
        size: ""
    },
    computed: {
        text_style() {
            let retStyle = "";
            if (this.size) {
                retStyle += this.size + " ";
            }
            if (this.simple) {
                retStyle += 'co-text-origin '
            } else {
                retStyle += 'co-text';
            }
            return retStyle;
        }
    },
}
</script>

<style scoped>
* {
    font-size: 14px;
    color: gray;
    height: 40px;
    /*width: 100%;*/
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0;
}

.co-text {
    box-shadow: 0 0 2px 0 rgb(0, 0, 0, .2);
    padding: 8px;
    margin-top: 4px;
    border-radius: 4px;
}

.co-text-origin {
    padding: 4px 0 4px 0;
}

.medium {
    font-size: 20px;
    color: gray;
}

.large {
    font-size: 26px;
    color: black;
}

</style>