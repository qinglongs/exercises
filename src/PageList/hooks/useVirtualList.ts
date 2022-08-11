import { useState, useRef, useMemo, useEffect } from 'react';
import useDeepCompareEffect from './useDeepComparison';


/**
 * @method 虚拟滚动(可自动轮播)自定义hooks
 * @param params 固定的参数
 * @param {number} params.itemHeight 每一个元素的高度
 * @param {number} params.containerHeight 滚动容器的高度
 * @param dataSource 需要渲染的数组
 */
const useVirtualList = <T>(params: { itemHeight: number, containerHeight: number }, dataSource: T[]) => {
	const { itemHeight, containerHeight } = params;

	// 可视窗口
	const contentNode = useRef<HTMLElement | null>(null)
	// 偏移度
	const offest = useRef<number>(0);
	// 自动轮播frame
	const autoScrollReFrame = useRef<number>(0);
	// 自动轮播定时器
	const autoScrollTimer = useRef<any>();
	// 鼠标滚动定时器
	const mouseScrollTimer = useRef<any>();
	// 容器高度
	const containerHeightRef = useRef<number>(0);

	// 屏幕展示最下面的一个元素的值
	const lastIndex = useRef<number>(1);

	// 单屏可展示的元素个数
	const itemNumber = useRef<number>(0);

	// 数据总数
	const total = useMemo<number>(() => dataSource.length, [dataSource]);

	// 列表展示的数据
	const [list, setList] = useState<T[]>([]);

	// 列表总高度
	const totalHeight = useMemo(() => itemHeight * total, [total, itemHeight]);

	// 滚动条到顶部的高度
	const [offsetTop, setOffsetTop] = useState<number>(0);

	if (!itemHeight) {
		console.error('place enter a vaild itemHeight');
	}

	if (!Array.isArray(dataSource)) {
		console.error('dataSource must be an array')
	}

	/**
	 * @method 容器滚动事件
	 * @param scrollTop 滚动条到顶部的距离
	 */
	const onScroll: React.UIEventHandler<HTMLDivElement> = (e) => {

		// 滚动条到顶部的距离
		const scrollTop = (e.target as any).scrollTop;
		// offest.current = scrollTop;

		// 计算当前应该展示到的元素
		const activeIndex = ((scrollTop / itemHeight) >> 0);

		// 屏幕可见区域中，最后一个元素索引
		lastIndex.current = activeIndex;
		setList(dataSource.slice(lastIndex.current, lastIndex.current + itemNumber.current));
		setOffsetTop(activeIndex * itemHeight);
	};

	/**
	 * @method 鼠标滚动事件
	 */
	const mouseScroll = () => {
		(document as any).onmousewheel = function () {
			clearAutoScroll();
			offest.current = +(contentNode.current as HTMLElement).scrollTop.toFixed(0)
			clearTimeout(mouseScrollTimer.current);
		}
	}

	/**
	 * @method 清除无缝滚动
	 */
	const clearAutoScroll = () => {
		clearTimeout(autoScrollTimer.current);
		cancelAnimationFrame(autoScrollReFrame.current)
	}

	useEffect(() => {
		if (!total || !dataSource.length) return;
		// 可见区域的高度
		containerHeightRef.current = containerHeight;

		// 可见区域可以展示的元素个数
		itemNumber.current = ((containerHeight / itemHeight) >> 0) + 1;

		setList(dataSource.slice(0,itemNumber.current))

		mouseScroll();

	}, [containerHeight, dataSource, itemHeight, total])

	return { list, totalHeight, offsetTop, onScroll, contentNode };
};

export default useVirtualList;