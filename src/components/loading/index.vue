<template>

</template>
<script>
    import {Indicator} from 'mint-ui';
    export default {
        data(){
            return {
                pageLoading: true
            }
        },
        created(){
            Indicator.open();
        },
        methods: {
            $finish(){
                this.pageLoading = false;
                this.$nextTick(()=>{
                    Indicator.close();
                })
            }
        }
    }
</script>