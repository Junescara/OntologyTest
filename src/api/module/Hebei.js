import request from "@/api/requestHebei";


//获取本体
export function getHebeiKG() {
  return request({
    method: "post",
    headers: {
        "Content-Type": "application/json",
      },
    url: `/db/query-watershed-overview-map`,
    data: {

    }
  });
}

//获取流域概化图
export function getWaterHebeiKG(pointNeoId,rels) {
  return request({
    method: "post",
    headers: {
        "Content-Type": "application/json",
      },
    url: `/db/query-watershed-overview-map`,
    data: {pointNeoId:pointNeoId,rels:rels
    }
  });
}

//获取neoid
export function getHebeiNeoid(stcd) {
  return request({
    method: "post",
    headers: {
        "Content-Type": "application/json",
      },
    url: `/hbsw/stcd/neoid`,
    data: {stcd:stcd}
  });
}

//获取关联对象
export function getHebeiLink(neoId,rel) {
  return request({
    method: "post",
    headers: {
        "Content-Type": "application/json",
      },
    url: `/db/query-adjust-instance`,
    data: {neoId:neoId,
      rel:rel
    }
  });
}

//获取调度规则
export function getHebeiRegulation(neoId) {
  return request({
    method: "post",
    headers: {
        "Content-Type": "application/json",
      },
    url: `/hbsw/query/flood-schema`,
    data: {neoId:neoId
    }
  });
}

