<template>
    <div class="user-attention">

    </div>
</template>

<script>
    export default {};
</script>

<style lang="stylus" scoped>
    .user-attention {
        position: relative;
        margin-top: 15px;
        width: 100%;
        height: 50px;
        border-bottom: 4px solid #ebebeb;
        background: #f5f5f5;
        &:after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -4px;
            width: 50%;
            height: 0;
            border-bottom: 4px solid #3472e2;
        }
    }
</style>
