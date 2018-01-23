<template>
    <svg :width="w+'px'" :height="h+'px'" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle :cx="rx" :cy="ry" :r="r" stroke="#ffd2d2" :stroke-width="borderWidth" fill-opacity="0"/>
        <path :d="d" stroke="#f35343" :stroke-width="borderWidth" fill-opacity="0"/>
    </svg>
</template>
<style>

</style>
<script>
    export default {
        props: {
            width: {
                type: Number,
                default: 0
            },
            height: {
                type: Number,
                default: 0
            },
            progress: {
                type: Number,
                default: 0
            },
            strokeWidth: {
                type: Number,
                default: 0.07
            }
        },
        data(){
            return {
                w: 0,
                h: 0,
                fontSize: 0,
                borderWidth: 0,
                rx: 0,
                ry: 0,
                r: 0,
                d: '',

                timer: null
            }
        },
        watch:{
            progress: function() {
                this.resizeFontSize();
            }
        },
        created(){
            this.getFontSize();
            this.initCircle();
            window.addEventListener("resize", this.resizeFontSize, false);
        },
        beforeDestroy(){
            window.removeEventListener("resize", this.resizeFontSize, false);
        },
        methods: {
            resizeFontSize(){
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.getFontSize();
                    this.initCircle();
                }, 300);
            },
            getFontSize(){
                this.fontSize = parseFloat(document.documentElement.style.fontSize);
            },
            initCircle(){
                let fontSize = this.fontSize;
                this.w = fontSize * this.width;
                this.h = fontSize * this.height;
                this.borderWidth = fontSize * this.strokeWidth;
                let ow = this.w - this.borderWidth*2,
                    oh = this.h - this.borderWidth*2,
                    rx = ow/2 + this.borderWidth,
                    ry = oh/2 + this.borderWidth,
                    r = ow/2,
                    progress = this.progress * 360,
                    sReg = Math.PI/180 * -90,
                    eReg = Math.PI/180 * (progress - 90);

                let sy = r * Math.sin(sReg) + rx,
                    sx = r * Math.cos(sReg) + ry,
                    ey = r * Math.sin(eReg) + rx,
                    ex = r * Math.cos(eReg) + ry,
                    largeArcFlag = progress >= 180 ? 1 : 0;

                this.rx = rx;
                this.ry = ry;
                this.r = r;
                this.d = `M ${sx} ${sy} A ${r} ${r} 0 ${largeArcFlag} 1 ${ex} ${ey}`
            }
        }
    }
</script>