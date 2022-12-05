/**
 * @author: Lin j
 * @date: 2022/11/30 22:50
 * @description：
 */

const pattern = {
  state: {
    selectedFlood:1,
    matchID:1,
    matchedSim3:'',//保存最佳三个预测id
    matchedPre:'',//保存匹配道德拟合数据
    matchedCurrent:'',//保存当前请求的数据，减少请求次数
    brushLoadingFlag:false,
  },
  mutations: {
    changeSelectedFlood:(state,code)=>{
      state.selectedFlood = code
    },
    getSeletedFlood:(state)=>{
      return state.selectedFlood
    },
    getMatchID:(state)=>{
      return state.matchID
    },
    changeMatchedSim3:(state,data)=>{
      state.matchedSim3 = data
    },
    changeMatchedPre:(state,data)=>{
      state.matchedPre = data
    },
    changeMatchID:(state,data)=>{
      state.matchID = data
    },
    changeLoadingFlag:(state,data)=>{
      state.brushLoadingFlag = data
    }
  },
  actions: {

  },
  getters:{
  }
}

export default pattern
