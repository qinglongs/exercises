import { useEffect, useRef, useState } from "react"

import type { BasePageRequestParams, BasePagingReponse } from '../api';

const usePagingList = <T>(getList: (params: BasePageRequestParams,) => Promise<BasePagingReponse<T>>, options?: { totalHeight: number }) => {

	const [dataSource, setDataSource] = useState<T[]>([]);

	const [loading, setLoading] = useState(false);

	const pageParams = useRef({ current: 1, pageSize: 10, hasMore: true });

	const [offset, setOffset] = useState(0);

	/** 滚动事件 */
	const onScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
		const target = event.target as HTMLDivElement;
		const scrollHeigth = target.scrollHeight;
		const clientHeight = target.clientHeight;
		const scrollTop = target.scrollTop;
		setOffset(scrollTop);

		// 触底
		if (clientHeight + scrollTop >= scrollHeigth - 1) {
			onTouchBottom();
		}

	}

	/** 滚动触底时触发 */
	const onTouchBottom = () => {
		fetchList()
	}

	const fetchList = async (refresh?: boolean) => {
		if (loading || !pageParams.current.hasMore) return;

		if (refresh) {
			pageParams.current.current = 1;
			pageParams.current.pageSize = 10;
		} else {
			pageParams.current.current += 1;
		}

		try {
			setLoading(true);
			const res = await getList({ page_now: pageParams.current.current, page_size: pageParams.current.pageSize });
			const tmp = refresh ? res.list : dataSource.concat(res.list)
			setDataSource(tmp);
			pageParams.current.hasMore = dataSource.length < res.page.total_num
		} finally {
			setLoading(false)
		}
	}

	/** 初始化调用 */
	useEffect(() => {
		fetchList(true)
	}, [])


	return { loading, dataSource, onScroll, hasMore: pageParams.current.hasMore, offset }
}

export default usePagingList;