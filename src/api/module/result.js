import server from "@/api/request";
const baseURL = "/db";

//获取本体
export function getOntology(neoId) {
  return server({
    method: "get",
    url: `${baseURL}/load-ontology`,
    params: { neoId },
  });
}
//获取实例
export function getEntity(neoId) {
  return server({
    method: "post",
    url: `${baseURL}/load-instance`,
    params: {
      neoId,
    },
  });
}
