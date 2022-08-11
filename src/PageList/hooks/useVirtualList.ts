import { useState, useRef, useMemo, useEffect } from "react";

/** 虚拟滚动，支持不定高 元素的偏移度计算还有点误差需要优化 */
const useVirtualList = (
  params: {
    estimatedItemHeight: number;
    showNumber: number;
    loading: boolean;
  },
  dataSource: Map<any, any>
) => {
  const { estimatedItemHeight, showNumber, loading } = params;

  /** 每个元素距离顶部的高度 */
  const itemTopCache = useRef<Array<number>>([]);

  /** 每个元素的高度 */
  const itemHeightCache = useRef<Array<number>>([]);

  const [scrollBarHeight, setscrollBarHeight] = useState(0);

  const [start, setStart] = useState(0);

  const [end, setEnd] = useState(showNumber);

  const [scrollTop, setScrollTop] = useState(0);

  const list = useMemo(
    () => [...dataSource].slice(start, end),
    [start, end, dataSource]
  );

  /** 给每个元素设置高度并计算出总高度 */
  const generateEstimatedItemData = () => {
    const estimatedTotalHeight = [...dataSource].reduce((pre, _, index) => {
      // 给每一项一个虚拟高度
      itemHeightCache.current[index] = estimatedItemHeight;
      // 给每一项距顶部的虚拟高度
      itemTopCache.current[index] =
        index === 0 ? 0 : itemTopCache.current[index - 1] + estimatedItemHeight;
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
    itemHeightCache.current[index] = height;
    // 重新确定列表的实际总高度
    setscrollBarHeight(
      itemHeightCache.current.reduce((pre, current) => {
        return pre + current;
      }, 0)
    );

    let newItemTopCache = [0];
    for (let i = 1, l = itemHeightCache.current.length; i < l; i++) {
      // 虚拟每项距顶部高度 + 实际每项高度
      newItemTopCache[i] =
        itemTopCache.current[i - 1] + itemHeightCache.current[i - 1];
    }

    // 获得每一项距顶部的实际高度
    itemTopCache.current = newItemTopCache;
  };

	/** 查找到开始的元素位置 */
  const getStartIndex = (scrollTop: number) => {
    // 每一项距顶部的距离
    let arr = itemTopCache.current;
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
		console.log(index);
		
    index = left;
    return index;
  };

  const onScroll = (event: any) => {
    if (loading) return;
    const target = event.target as HTMLDivElement;
    const scrollTop = target.scrollTop;

    let startIndex = getStartIndex(scrollTop);

    // 如果是奇数开始，就取其前一位偶数
    if (startIndex % 2 !== 0) {
      setStart(startIndex - 1);
    } else {
      setStart(startIndex);
    }

    setEnd(startIndex + showNumber);

    setScrollTop(itemTopCache.current[startIndex] || 0);
  };

  useEffect(() => {
    generateEstimatedItemData();
  }, [dataSource]);

  return { onScroll, updateItemHeight, scrollBarHeight, scrollTop, list };
};

export default useVirtualList;
