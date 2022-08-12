import { useMemo } from "react";

import ExpandCard from "./components/ExpandCard/index";

import usePagingList from "./hooks/usePagingList";

import useVirtualList from "./hooks/useVirtualList";

import { getList } from "./api";

import "./style.css";

const PageList = () => {
  const {
    loading,
    dataSource,
    onScroll: onPageScroll,
    hasMore,
  } = usePagingList(getList);

  /** create_time => Set<GetListReponseItem> */
  const dataSourceMap = useMemo(() => {
    const map = new Map<number, Set<typeof dataSource[0]>>();
    dataSource.forEach((item) => {
      const { create_time } = item;
      let set = map.get(create_time);
      if (!set) map.set(create_time, (set = new Set()));
      map.set(create_time, set?.add(item));
    });
    return map;
  }, [dataSource]);

  const { list, onScroll, updateItemHeight, scrollBarHeight, scrollTop } =
    useVirtualList(
      { estimatedItemHeight: 109.6, showNumber: 10, loading, bufferCount: 4 },
      dataSourceMap
    );

  const handleScroll = async (event: any) => {
    onPageScroll(event);
    onScroll(event);
  };

  /** 渲染 listItem */
  const RenderListItem = () => {
    return list.map((item, index) => {
      return (
        <div
          key={item[0]}
          className="card"
          style={{ transform: `translate3d(0,${scrollTop}px,0)` }}
        >
          <ExpandCard
            index={index}
            updateItemHeight={updateItemHeight}
            title={item[0] + ""}
            list={[...item[1]]}
          />
        </div>
      );
    });
  };

  return (
    <div className="page-list-container">
      <h1 className="title">Meeting Notes {scrollBarHeight}</h1>

      <div className="page-list" onScroll={handleScroll}>
        <div className="placeholder" style={{ height: scrollBarHeight }}>
          {RenderListItem()}
        </div>
      </div>
      {loading && <div className="loading">loading....</div>}

      {!hasMore && <div className="loading">没有更多数据了</div>}
    </div>
  );
};

export default PageList;
