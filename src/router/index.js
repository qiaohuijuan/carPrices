import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/index';
import Detail from '@/components/include/detail';
import Carphotos from '@/components/include/carphotos';
import Cartype from '@/components/include/children/cartype';
import Colorpage from '@/components/include/children/colorpage';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path:'/carphotos',
      name:'carphoto',
      component:Carphotos
    },
    {
      path:'/cartype',
      name:'cartype',
      component:Cartype
    },
    {
      path:'/colorpage',
      name:'colorpage',
      component:Colorpage
    }
  ]
});
