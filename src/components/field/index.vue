<template>
    <div class="ui-field">
        <div class="ui-field-icon" v-if="icon || $slots.icon">
            <slot name="icon">
                <i v-if="icon" class="iconfont" :class="'icon-' + icon"></i>
            </slot>
        </div>
        <div class="ui-field-value">
            <input class="ui-field-input"
                   :type="type"
                   :disabled="disabled"
                   :readonly="readonly"
                   :placeholder="placeholder"
                   :value="currentValue"
                   :pattern="pattern"
                   :maxLength="max"
                   @input="handleInput">
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ui-field',
        props: {
            icon: String,
            disabled: Boolean,
            nativeType: String,
            readonly: Boolean,
            placeholder: String,
            pattern: String,
            max: {},
            type: {
                type: String,
                default: 'text'
            },
            value: {}
        },
        data(){
            return {
                currentValue: this.value
            }
        },
        methods: {
            handleInput(evt) {
                this.currentValue = evt.target.value;
            }
        },
        watch: {
            value(val) {
                this.currentValue = val;
            },
            currentValue(val) {
                if(this.type === 'number' || this.type === 'tel'){
                    val = val.replace(/[^\d]/g,'')
                }
                this.currentValue = val;
                this.$emit('input', val);
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .ui-field{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: .8rem;
        width: 100%;
        padding: 0 .26rem;
        border: .02rem solid #ccc;
        border-radius: .06rem;
        background-color: #fff;
        .ui-field-icon{
            flex: 0;
            width: .45rem;
            color: #bdbdbd;
            font-size: .38rem;
            .iconfont{
                display: block;
            }
        }
        .ui-field-value{
            flex: 1;
            font-size: .28rem;
        }
        .ui-field-input{
            appearance: none;
            border-radius: 0;
            border: 0;
            outline: 0;
            line-height: 1.6;
            font-size: inherit;
            width: 100%;
            &:-moz-placeholder {
                color: #ccc;
            }
            &::-moz-placeholder {
                color: #ccc;
            }
            &::-webkit-input-placeholder {
                color: #ccc;
            }
            &:-ms-input-placeholder {
                color: #ccc;
            }
        }
    }

</style>