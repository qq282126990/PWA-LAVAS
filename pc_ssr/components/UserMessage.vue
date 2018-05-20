<template>
    <div class="user_message_wrapper">
        <!--用户头像、名称、等级、声望-->
        <div class="user_message">
            <!--头像-->
            <div class="user_avatar">
                <img class="user_avatar_img" src="https://cn.vuejs.org/images/logo.png"/>
            </div>
            <!--用户名称等级-->
            <div class="user_name_level">
                <p class="txt">Luck Man</p>
                <p class="txt">等级：55</p>
                <p class="txt">声望：250</p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{}
</script>

<style lang="stylus" scoped>
    .user_message_wrapper {
        position: relative;
        padding: 15px 15px 20px 15px;
        width: 100%;
        height: 200px;
        background: #6CAECE;
        z-index: 1;
        box-sizing: border-box;
        .user_message {
            display: flex;
        }
        /*头像*/
        .user_avatar {
            flex: 0 0 80px;
            width: 80px;
            height: 80px;
            border: 2px solid #fff;
            border-radius: 50%;
            overflow: hidden;
            background: #D3D7D8;
        }
        /*头像图片*/
        .user_avatar_img {
            width: 100%;
            height: 100%;
        }
        /*头像名称等级声望*/
        .user_name_level {
            padding: 5px 10px;
            flex: 1;
            flex-wrap: wrap;
            flex-direction: column;
            align-items: left;
            display: flex;
            overflow: hidden;
            color: #fff;
            .txt {
                flex: 1;
                margin: 0;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }
</style>
