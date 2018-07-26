<template>
  <div class="wrap">
       <div ref="listwrap" class="listwrap">
          <div class="list" v-for="(item,ind) in carData" :key="ind" :id="item.letter">
              <h2 v-html="item.letter"></h2>
                  <ul class="cartype">
                    <li v-for="(val,ind) in item.carList" :key="ind"  @click="changeHandle(val.MasterID)">
                          <img :data-src="val.CoverPhoto"/>
                          <span v-html="val.Name"></span>
                    </li>
                </ul> 
          </div>
       </div>
      <Letter :carData="carData"  :scrollChange="scrollChange"/>
      <List :listData="listData" :className="className" :hideAsider="hideAsider"/>
  </div>
</template>
<script>
import Letter from "./Letter";
import List from "./List";
import { debounce, lazyLoad, throttle } from "../util/util";

export default {
  name: "",
  data() {
    return {
      carData: [],
      listData: [],
      className: ""
    };
  },
  mounted() {
    let scroll = throttle(() => {
      lazyLoad.loadImg();
    }, 500);
    fetch("https://baojia.chelun.com/v2-car-getMasterBrandList.html")
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.code == 1) {
          this.carlist = res.data;
          this.getCarType(res.data);
        } else {
          alert(res.msg);
        }
      });
    this.$refs.listwrap.onscroll = () => {
      scroll();
    };
  },
  methods: {
    getCarType(data) {
      let letters = [];
      data.forEach((item, ind) => {
        letters.push(item.Spelling.slice(0, 1));
      });
      let newArr = [];
      letters.forEach((v, i) => {
        if (newArr.indexOf(v) == -1) {
          return newArr.push(v);
        }
      });
      newArr.map((items, ind) => {
        let obj = {
          id: ind,
          letter: items,
          carList: []
        };
        data.forEach((item, ind) => {
          if (item.Spelling.startsWith(items)) {
            return obj.carList.push(item);
          }
        });
        this.carData.push(obj);
      });
      setTimeout(() => lazyLoad.init(), 10);
    },
    changeHandle($id) {
      fetch(
        "https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?MasterID=" +
          $id
      )
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.code == 1) {
            this.listData = res.data;
            this.className = "active";
          } else {
            alert(res.msg);
          }
        });
    },
    hideAsider() {
      this.className = "";
    },
    scrollChange(Letter) {
      let offsetTops = document.querySelector(`#${Letter}`).offsetTop;
      this.$refs.listwrap.scrollTop = offsetTops;
    }
  },
  components: {
    Letter,
    List
  }
};
</script>
<style lang="">
@import url("../../static/css/style.css");
@import url("../../static/css/reset.css");
</style>
