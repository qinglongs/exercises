import { formatResquestParamsToQuery } from "../utils/shared";

/** 分页分页请求参数 */
export type BasePageRequestParams = {
  page_now: number;
  page_size: number;
};

/** 分页请返回数据结构 */
export type BasePagingReponse<ListItem> = {
  list: ListItem[];
  page: {
    page_now: number;
    page_size: number;
    page_total: number;
    total_num: number;
  };
};

/** list 中每一项的字段 */
export type GetListReponseItem = {
  create_time: number;
  duration: number;
  id: string;
  title: string;
  height?: number;
};

enum Api {
  GetList = "https://6cxx9pggi4.execute-api.us-east-1.amazonaws.com/prod/mock/meeting-c/list",
}

export const getList = async (params: BasePageRequestParams) => {
  const response = await fetch(
    Api.GetList + formatResquestParamsToQuery(params),
    { method: "GET", mode: "cors" }
  );

  // 做一个建议的请求拦截
  if (response.status === 200) {
    const { data } = await response.json();

    return data as BasePagingReponse<GetListReponseItem>;
  }

  return Promise.reject();
};

