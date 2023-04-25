/** 所有 api 接口的响应数据都应该准守该格式 */
interface IApiResponseData<T> {
  code: number
  data: T
  message: string
}


//list 对象内容
export interface IGetTableData {
  id: string;
  username: string;
  nickname: string;
  phone: string;
  author: string;
  display_time: boolean;
  pageviews: string;
}

//ts泛型 定义形式
export type GetTableResponseData = IApiResponseData<{
  list: IGetTableData[]
  total: number
}>