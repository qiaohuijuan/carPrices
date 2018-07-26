<template>
    <div class="dealerList">
       <header>
          <p>可向多个商家咨询最低价，商家及时回复</p> 
          <img src="../../../static/img/icon-help.png">
        </header>
        <div class="content">
            <div data-hover="hover" class="q-info flex-row">
                <img :src="Carprice.details.serial&&Carprice.details.serial.Picture"> 
                <div class="flex-column flex-centerX">
                    <p>{{Carprice.details&&Carprice.details.serial.AliasName}}</p>
                    <p>{{Carprice.details.market_attribute&&Carprice.details.market_attribute.year}}款{{Carprice.details&&Carprice.details.car_name}}</p>
                </div>
            </div> 
            <div class="self-info">
                <p class="tip">个人信息</p> 
                <ul>
                    <li>
                        <span>姓名</span> 
                        <input type="text" placeholder="输入你的真实中文姓名" maxlength="4">
                    </li> 
                    <li>
                        <span>手机</span> 
                        <input type="tel" placeholder="输入你的真实手机号码" maxlength="11">
                    </li> 
                    <li>
                        <span>城市</span> 
                        <span>北京</span>
                    </li>
                </ul> 
                <div class="quotation">
                    <button data-hover="hover">询最低价</button>
                </div>
            </div>
            <div class="dealer-info">
                <p class="tip">选择报价经销商</p> 
                <ul>
                    <li data-hover="hover" v-for="(item,ind) in Carprice.list" :key="ind" @click="checkRadio(ind)" ref="lis">
                        <p>
                            <span>{{item.dealerShortName}}</span> 
                            <span>{{item.promotePrice.replace(/00$/g,'万')}}</span>
                        </p> 
                        <p>
                            <span>{{item.address}}</span> 
                            <span>售{{item.saleRange}}</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'',
    props:['Carprice'],
    methods:{
        checkRadio(i){
            this.$refs.lis[i].className = 'active';
        }
    }
}
</script>

<style lang="css">
@import url('../../../static/css/dealer.css');
</style>