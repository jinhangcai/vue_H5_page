<template>
    <button
        :type="nativeType"
        class="ui-button"
        :class="['ui-button--' + type, 'ui-button--' + size, {
            'is-disabled': disabled,
            'is-plain': plain
        }]"
        @click="handleClick"
        :disabled="disabled">
        <span class="ui-button-icon" v-if="icon || $slots.icon">
            <slot name="icon">
                <i v-if="icon" class="iconfont" :class="'icon-' + icon"></i>
            </slot>
        </span>
        <label class="ui-button-text"><slot></slot></label>
    </button>
</template>
<script>
    export default {
        name: 'ui-button',
        methods: {
            handleClick(evt) {
                this.$emit('click', evt);
            }
        },
        props: {
            icon: String,
            disabled: Boolean,
            nativeType: String,
            plain: Boolean,
            type: {
                type: String,
                default: 'default',
                validator(value) {
                    return [
                        'default',
                        'link',
                        'primary'
                    ].indexOf(value) > -1;
                }
            },
            size: {
                type: String,
                default: 'normal',
                validator(value) {
                    return [
                        'small',
                        'normal',
                        'middle',
                        'large'
                    ].indexOf(value) > -1;
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .ui-button {
        appearance: none;
        border-radius: .06rem;
        border: 0;
        box-sizing: border-box;
        color: inherit;
        display: block;
        font-size: .32rem;
        height: .8rem;
        outline: 0;
        overflow: hidden;
        position: relative;
        text-align: center;
        &::after {
            background-color: #000;
            content: " ";
            opacity: 0;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            position: absolute
        }
        &:not(.is-disabled):active::after {
            opacity: .4
        }
        &.is-disabled {
            opacity: .6
        }

    }
    .ui-button--default {
        color: #656b79;
        background-color: #f6f8fa;
        box-shadow: 0 0 1px #b8bbbf;
        &.is-plain {
            border: 1px solid #5a5a5a;
            background-color: transparent;
            box-shadow: none;
            color: #5a5a5a
        }
    }
    .ui-button--link {
        color: #007aff;
        background-color: transparent;
        border: 0;
        &.is-plain {
            border: 1px solid #007aff;
            background-color: transparent;
            color: #007aff
        }
    }
    .ui-button--primary {
        color: #fff;
        background-color: #f35343;
        &.is-plain {
            border: 1px solid #f35343;
            background-color: transparent;
            color: #f35343
        }
    }
    .ui-button--large {
        display: block;
        width: 100%
    }
    .ui-button--normal {
        display: inline-block;
        padding: 0 .12rem
    }
    .ui-button--middle {
        display: inline-block;
        padding: 0 .12rem;
        font-size: .28rem;
    }
    .ui-button--small {
        display: inline-block;
        font-size: .14rem;
        padding: 0 .12rem;
        height: .33rem
    }

</style>