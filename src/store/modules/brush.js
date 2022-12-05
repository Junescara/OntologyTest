/**
 * @author: Lin j
 * @date: 2022/11/30 22:50
 * @description：
 */

const brush = {
  state: {
    currentID:1,
    matchID:1,
    originData:[],
    matchedData:[]

  },
  mutations: {
    changeCurrentID:(state,id)=>{
      state.currentID = id
    },
    changeMatchID:(state,id)=>{
      state.matchID = id
    },
    changeOriginData:(state,data)=>{
      state.originData = data
    },
    changeMatchedData:(state,data)=>{
      state.matchedData = data
    }
  },
  actions: {

  },
  getters:{
  }
}

export default brush
