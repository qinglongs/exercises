import { useState, useRef, useMemo, useLayoutEffect } from "react";

import type { GetListReponseItem } from "../api";

const itemHeightCache:number[] = [];

let itemTopCache:number[] = [];
/**
 * 支持不定高元素的虚拟滚动hooks
 */
const useVirtualList = (
  params: {
    estimatedItemHeight: number;
    showNumber: number;
    loading: boolean;
    bufferCount: number;
  },
  // 先写死 dataSource 的类型
  dataSource: Map<number, Set<GetListReponseItem>>
) => {
  const { estimatedItemHeight, showNumber, loading, bufferCount } = params;


  /** 滚动高度 */
  const [scrollBarHeight, setscrollBarHeight] = useState(0);

  /** 可渲染数组的起始位置 */
  const [start, setStart] = useState(0);

  /** 元素距离滚动容器顶部的距离 */
  const [scrollTop, setScrollTop] = useState(0);

  /** 可渲染的数据 */
  const list = useMemo(() => {
    return [...dataSource].slice(start, start + showNumber + bufferCount);
  }, [start, dataSource, showNumber, bufferCount]);

  /** 给每个元素设置高度并计算出总高度 */
  const generateEstimatedItemData = () => {
    const estimatedTotalHeight = [...dataSource].reduce((pre, _, index) => {
      // 给每一项一个虚拟高度
      itemHeightCache[index] = estimatedItemHeight;
      // 给每一项距顶部的虚拟高度
      itemTopCache[index] =
        index === 0 ? 0 : itemTopCache[index - 1] + estimatedItemHeight;
      return pre + estimatedItemHeight;
    }, 0);

    // 列表总高
    setscrollBarHeight(estimatedTotalHeight);
  };

  /** 按每个元素的实际高度更新 */
  const updateItemHeight = ({
    index,
    height,
  }: {
    index: number;
    height: number;
  }) => {
    // dom元素加载后得到实际高度 重新赋值回去
    itemHeightCache[index] = height;
 
    
    const scrollBarHeight = itemHeightCache.reduce((pre, current) => {
      return pre + current;
    }, 0);

    // 重新确定列表的实际总高度
    setscrollBarHeight(scrollBarHeight);

    let newItemTopCache = [0];
    for (let i = 1, l = itemHeightCache.length; i < l; i++) {
      // 虚拟每项距顶部高度 + 实际每项高度
      newItemTopCache[i] =
        itemTopCache[i - 1] + itemHeightCache[i - 1];
    }
    // 获得每一项距顶部的实际高度
    itemTopCache = newItemTopCache;
    
  };

  /** 找到最接近scrollTop的元素位置 */
  const getStartIndex = (scrollTop: number) => {
    // 每一项距顶部的距离
    let arr = itemTopCache;
    
    let index = -1;
    let left = 0,
      right = arr.length - 1,
      mid = Math.floor((left + right) / 2);
    // 判断 有可循环项时进入
    while (right - left > 1) {
      /*
			  二分法：拿每一次获得到的 距顶部距离 scrollTop 同 获得到的模拟每个列表据顶部的距离作比较。
			  arr[mid] 为虚拟列高度的中间项 
			  不断while 循环，利用二分之一将数组分割，减小搜索范围
			  直到最终定位到 目标index 值
			*/
      // 目标数在左侧
      if (scrollTop < arr[mid]) {
        right = mid;
        mid = Math.floor((left + right) / 2);
      } else if (scrollTop > arr[mid]) {
        // 目标数在右侧
        left = mid;
        mid = Math.floor((left + right) / 2);
      } else {
        index = mid;
        return index;
      }
    }

    index = left;

    return index;
  };

  const onScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
    if (loading) return;
      const target = event.target as HTMLDivElement;
      const top = target.scrollTop;
      let startIndex = getStartIndex(top);
      setStart(startIndex);
      setScrollTop(itemTopCache[startIndex]);
  };

  useLayoutEffect(() => {
    if (!dataSource.size) return;
    generateEstimatedItemData();
  }, [dataSource]);

  return { scrollBarHeight, scrollTop, list, onScroll, updateItemHeight };
};

export default useVirtualList;
