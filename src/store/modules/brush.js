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
    matchedData:[],
    originFlood:[],
    matchedFlood:[]

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
    },
    changeOriginFlood:(state,data)=>{
      state.originFlood = data
    },
    changeMatchedFlood:(state,data)=>{
      state.matchedFlood = data
    }
  },
  actions: {

  },
  getters:{
  }
}

export default brush
