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
    matchedFlood:[],
    allDataLoading:false,
    originStart:0,
    originEnd:0,
    matchEnd:0,
    matchStart:0,
    girdValues:[],
    originalGridValues:[]
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
    },
    changeAllDataLoading:(state,data)=>{
      state.allDataLoading = data
    },
    changeOriginStart:(state,data)=>{
      state.originStart = data
    },
    changeOriginEnd:(state,data)=>{
      state.originEnd = data
    },
    changeMatchEnd:(state,data)=>{
      state.matchEnd = data
    },
    changeMatchStart:(state,data)=>{
      state.matchStart = data
    },
    addGridValues:(state,data)=>{
      state.girdValues.push(data)
    },
    addOriginalGridValues:(state,data)=>{
      state.originalGridValues.push(data)
    },
    clearGrid:(state)=>{
      state.originalGridValues = []
      state.girdValues = []
}
  },
  actions: {
    gridValueAsync(context,value){
        context.commit('addGridValues',value)
    },
    originalGridValueAsync(context,value){
      context.commit('addOriginalGridValues',value)
    }

  },
  getters:{
  }
}

export default brush