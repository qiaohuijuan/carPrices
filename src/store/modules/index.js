import {getImgList, getCategoryImageList} from '../../api/index';

const state = {
    list: [],
    categoryList: [],
    showDetail: false,
    isShow:false,
    id: '',    // 当前选图片目录id
    page: 1,
}

const mutations = {
    updateList(state, {list}){
        state.list = state.list.concat(list);
    },
    updateCategoryList(state, {list}){
        state.page++;
        state.categoryList = state.categoryList.concat(list);
    },
    showAll(state, payload){
        state.showDetail = true;
        state.id = payload;
    },
    showSwiper(state,payload){
        state.isShow = payload;
    }
}

const actions = {
    getImgList({commit}, payload){
        getImgList()
        .then(res=>{
            return res.json();
        })
        .then(body=>{
            if (body.code == 1){
                commit('updateList', {list: body.data});
            }else{
                alert(body.msg);
            }
        })
    },
    getCategoryImageList({commit, state}, payload){
        getCategoryImageList(state.id, state.page)
        .then(res=>{
            return res.json()
        })
        .then(body=>{
            if (payload && payload.cb){
                payload.cb();
            }
            if (body.code == 1){
                commit('updateCategoryList', {list: body.data.List});
            }else{
                alert(body.msg);
            }
        })
    },

}

export default {
    state,
    mutations,
    actions
}