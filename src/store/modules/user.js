import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter,anyRoutes,asyncRoutes,constantRoutes } from '@/router'
import router from '@/router';
import cloneDeep from 'lodash/cloneDeep'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    //服务器返回的菜单信息【根据不同的角色：返回的标记信息，数组里面的元素是字符串】        
    routes:[],
    //角色信息
    roles:[],
    //按钮权限的信息
    buttons:[],
    //对比之后【项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的理由】
    resultAsyncRoutes:[],
    //用户最终需要展示全部路由
    resultAllRputes:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  //存储用户信息
  SET_USERINFO:(state,userInfo)=>{
    //用户名
     state.name = userInfo.name;
     //用户头像
     state.avatar = userInfo.avatar;
     //菜单权限标记
     state.routes = userInfo.routes;
     //按钮权限标记
     state.buttons = userInfo.buttons;
     //角色
     state.roles = userInfo.roles;
  },
  SET_RESULTASYNCROUTES:(state,asyncRoutes)=>{
     //vuex保存当前用户的异步路由，注意，一个用户需要展示完成路由：常量、异步、任意路由
     state.resultAsyncRoutes = asyncRoutes;
     //计算出当前用户需要展示所有路由
     state.resultAllRputes = constantRoutes.concat(state.resultAsyncRoutes,anyRoutes);
     //给路由器添加新的路由
      router.addRoutes(state.resultAllRputes)
  }
}

//定义一个函数：两个数组进行对比，对比出当前用户到底显示哪些异步路由
const computedAsyncRoutes = (asyncRoutes,routes)=>{

  console.log('@',asyncRoutes);
  //过滤出当前用户【超级管理|普通员工】需要展示的异步路由
 return asyncRoutes.filter(item=>{
      //数组当中没有这个元素返回索引值-1，如果有这个元素返回的索引值一定不是-1 
     if(routes.indexOf(item.name)!=-1){
       //递归:别忘记还有2、3、4、5、6级路由
       if(item.children&&item.children.length){
           item.children = computedAsyncRoutes(item.children,routes);
       }
       return true;
     }
  })
}

const actions = {
  // user login
  async login({commit}, userInfo) {
        const { username, password } = userInfo
        let result = await login({username: username.trim(), password: password })
        if(result.code === 20000){
          commit('SET_TOKEN', result.data.token)
          setToken(result.data.token)
          return "ok"
        }else{
          console.log("here");
          return Promise.reject(new Error("falied"))
        }
  },


  getInfo({ commit, state }) {

    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        //获取用户信息:返回数据包含：用户名name、用户头像avatar、routes[返回的标志:不同的用户应该展示哪些菜单的标记]、roles（用户角色信息）、buttons【按钮的信息：按钮权限用的标记】
        const { data } = response;
        //vuex存储用户全部的信息
        console.log(data.routes);
        commit('SET_USERINFO',data);
        let asyncRoutes111 = computedAsyncRoutes(cloneDeep(asyncRoutes),data.routes)
        console.log(asyncRoutes111);
        commit('SET_RESULTASYNCROUTES',asyncRoutes111);
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  async logout({ commit, state }) {

        let result = await logout(state.token)
        if(result.code === 20000){
          removeToken() // must remove  token  first
          resetRouter()
          commit('RESET_STATE')
          return "ok"
        }else{
          return Promise.reject(new Error('falied'))
        }        
        
        

  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

