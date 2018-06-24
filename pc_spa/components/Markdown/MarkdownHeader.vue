<template>
    <div class="markdown-header">
        <!--按钮-->
        <div class="btn-group"
             v-for="(item,index) in headerBtnGroup"
             :key="index"
        >
            <v-btn depressed
                   class="white"
                   v-for="icon in item"
                   :key="icon.name"
                   @click="clickBtnGroup(icon.name)"
            >
                <v-icon>{{icon.name}}</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                /*
                 * 头部按钮组
                 *
                 * @type {Array}
                 * */
                headerBtnGroup: [
                    [
                        {name: 'format_bold'},
                        {name: 'format_italic'},
                        {name: 'title'},
                        {name: 'strikethrough_s'}
                    ],
                    [
                        {name: 'format_list_bulleted'},
                        {name: 'format_list_numbered'},
                        {name: 'border_all'},
                    ],
                    [
                        {name: 'insert_link'},
                        {name: 'insert_photo'},
                    ],
                    [
                        {name: 'code'},
                        {name: 'format_quote'},
                    ],
                    [
                        {name: 'visibility_off'},
                    ]
                ]
            }
        },
        methods: {
            // 点击按钮
            clickBtnGroup (name) {
                this.$emit('clickBtnGroup', name)
            }
        }
    }
</script>

<style lang="scss">
    @import '../../assets/sass/variable';

    /*头部*/
    .markdown-header {
        display: flex;
        padding: 0 calc(50% - 27.834rem);
        margin-top: 10px;
        box-sizing: border-box;
        /*按钮组*/
        .btn-group {
            display: flex;
            border-radius: 2.5px;
            height: 100%;
            &:last-child {
                margin: 0;
            }
            .white {
                height: 40px;
                min-height: 40px;
            }
        }
        .btn__content {
            margin: 0;
        }
        .btn {
            margin: 0;
            min-width: 40px;
            width: 40px;
            height: 100%;
        }
    }



</style>
