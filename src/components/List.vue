<template>
<div class="skipbox">
  <div class="asider" :class="className" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" >
            <div v-for="(val,key) in listData" :key="key" class="asiderCars">
                    <p>{{val.GroupName}}</p>
                    <ul class="asilder_list">
                        <router-link :to="{path:'/detail',query:{id:item.SerialID}}" v-for="(item,ind) in val.GroupList" :key="ind">
                            <img :src="item.Picture"/>
                            <div class="carders">
                                <p>{{item.AliasName}}</p>
                                <small>{{item.DealerPrice}}</small>
                            </div>   
                        </router-link>
                    </ul>
            </div>
    </div>
</div>
        
</template>

<script>
export default {
  name: "",
  props: {
    listData: {
      type: Array
    },
    className: {
      type: String
    },
    hideAsider: {
      type: Function
    }
  },
  methods: {
    touchstart(e) {
      this.startX = e.touches[0].pageX;
    },
    touchmove(e) {
      this.moveX = e.touches[0].pageX;
      let pageX = this.moveX - this.startX;
      this.asider = document.querySelector(".asider");
      if (pageX > 0) {
        this.hideAsider();
        this.asider.style.transform = `translateX(${pageX}px)`;
      }
    },
    touchend(e) {
      this.asider = document.querySelector(".asider");
      this.asider.style.transform = "";
      if (this.pageX > 100) {
        this.hideAsider();
      }
    }
  }
};
</script>

<style lang="">
.skipbox{
  width:100%;
}

</style>