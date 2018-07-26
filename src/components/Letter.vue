<template>
    <div class="fixed" @touchstart="touchstart" @touchmove="touchmove">
           <i>#</i>
           <a v-for="(item,ind) in carData" @click="scrollChange(item.letter)" :key="ind">{{item.letter}}</a>
      </div>
</template>

<script>
    export default {
      name:'',
      props:{
          carData:{
              type:Array
          },
          scrollChange:{
              type:Function
          }
      },
      methods:{
        touchstart(){
            this.height = window.innerWidth / 750 *100 * 0.4
            //把#的高度加上
            this.offset = (window.innerHeight-this.height*this.carData.length)/2+this.height
        },
        touchmove(e){
            let touchY = e.touches[0].pageY;
            let index = parseInt((touchY - this.offset)/20)
            //判断下标
            if(index < 0){
               index = 0;
            }else if(index > this.carData.length-1){
               index = this.carData.length-1;
            }
            this.scrollChange(this.carData[index].letter)
        }
      }
    }
</script>

<style lang="">
    
</style>