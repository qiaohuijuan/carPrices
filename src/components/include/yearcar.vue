<template>
    <div>
        <div class="c_detail" v-for="(val,key) in yearData" :key="key">
            <p>{{val.exhaust_str}}/{{val.max_power_str}}{{val.inhale_type}}</p> 
            <ul class="c_list">
                <li>
                        <p>{{val.market_attribute.year}}款{{val.car_name}}</p> 
                        <p>{{val.horse_power}}马力{{val.gear_num}}档</p> 
                        <p>
                            <span>指导价{{val.market_attribute.official_refer_price}}</span> 
                            <span>{{val.market_attribute.dealer_price_min}}起</span>
                        </p> 
                        <button data-id="126282" data-hover="hover">询问底价</button>
                </li>
            </ul>
       </div>
    </div>
</template>

<script>
export default {
  name: "",
  props: {
    yearData: {
      type: Array
    },
    toggle: {
      type: Function
    }
  }
};
</script>

<style lang="">
@import url("../../../static/css/detail.css");
</style>