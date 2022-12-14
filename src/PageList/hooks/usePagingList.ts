/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { useEffect, useRef, useState, useCallback } from "react";

import type { BasePageRequestParams, BasePagingReponse } from "../api";

const PAGE_SIZE = 10;

/** 滚动无限分页加载hooks */
const usePagingList = <T>(
  getList: (params: BasePageRequestParams) => Promise<BasePagingReponse<T>>
) => {
  const [dataSource, setDataSource] = useState<T[]>([]);

  const [loading, setLoading] = useState(false);

  const pageParams = useRef({ current: 1, pageSize: PAGE_SIZE, hasMore: true });

  /** 滚动事件 */
  const onScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
    const target = <HTMLDivElement>(event.target);
    const scrollHeigth = target.scrollHeight;
    const clientHeight = target.clientHeight;
    const scrollTop = target.scrollTop;

    // 触底
    if (clientHeight + scrollTop >= scrollHeigth - 1) {
      return onTouchBottom();
    }
  };

  /** 滚动触底时触发 */
  const onTouchBottom = () => {
    return fetchList();
  };

  const fetchList = async (refresh?: boolean) => {
    if (refresh) pageParams.current.hasMore = true;

    if (loading || !pageParams.current.hasMore) return;
    if (refresh) {
      pageParams.current.current = 1;
      pageParams.current.pageSize = PAGE_SIZE;
    } else {
      pageParams.current.current += 1;
    }

    try {
      setLoading(true);
      const res = await getList({
        page_now: pageParams.current.current,
        page_size: pageParams.current.pageSize,
      });
      const result = res.list.filter((item) => item);
      setDataSource((dataSource) => {
        const tmp = refresh ? result : dataSource.concat(result)
        pageParams.current.hasMore = tmp.length < res.page.total_num;
        return tmp;
      })


    } finally {
      setLoading(false);
    }
  };

  /** 初始化调用 */
  useEffect(() => {
    fetchList(true);
  }, []);

  return {
    loading,
    dataSource,
    hasMore: pageParams.current.hasMore,
    onScroll,
  };
};

export default usePagingList;
