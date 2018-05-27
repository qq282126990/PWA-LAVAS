<template>
    <div class="loading">
        <!--图片-->
        <img class="loading_img" src="../assets/img/loading.png"/>
        <!--文字-->
        <p class="loading_txt">加载中...</p>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    .loading {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding-top: 30%
        .loading_img {
            display: inline-block;
            margin: auto 0;
            width: 100px;
            height: 100px;
            animation: rotate 1s infinite linear
        }
        .loading_txt {
            margin: 0;
            padding-left: 20px;
            font-size: 36px;
        }
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

</style>
