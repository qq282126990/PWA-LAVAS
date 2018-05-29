<template>
    <div class="app_right_menu">
        <!--列表内容-->
        <div class="app_right_menu_list">
            <v-icon class="app_right_menu_list__icon">publish</v-icon>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style lang="stylus" scoped>
    .app_right_menu {
        position: fixed;
        right: 0;
        bottom: 15px;
        padding: 0 2.5%;
        width: 10%;
        height: 10%;
    }

    .app_right_menu_list {
        max-width :60px;
        max-height :60px;
        background: #fff;
    }

    .app_right_menu_list__icon {
        font-size: 30px;
        color: #f2923b;
    }
</style>
