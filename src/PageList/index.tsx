import { useMemo } from 'react';

import ExpandCard from './components/ExpandCard/index';

import usePagingList from './hooks/usePagingList';

import useVirtualList from './hooks/useVirtualList';

import { getList, GetListReponseItem } from './api'

import './style.css';

/** 渲染 listItem */
const RenderListItem = (map: Map<number, Set<GetListReponseItem>>) => {
	const keys = [...map.keys()]

	return keys.map(key => {
		return <div key={key} className="card">
			<ExpandCard title={key + ''} list={[...map.get(key)!]} />
		</div>
	})
}


const PageList = () => {
	const { loading, dataSource, onScroll, hasMore, offset } = usePagingList(getList);



	const dataSourceMap = useMemo(() => {
		const map = new Map<number, Set<typeof dataSource[0]>>();

		dataSource.forEach(item => {
			const { create_time } = item;

			let set = map.get(create_time);

			if (!set) map.set(create_time, set = new Set());

			map.set(create_time, set?.add(item));

		})
		return map;
	}, [dataSource]);



	const totalHeight = useMemo(() => {
		let tmp = 0;
		[...dataSourceMap.keys()].forEach(key => {
			tmp += 29 + 20;
			const item = dataSourceMap.get(key)!;
			tmp += item.size * 59
		})
		return tmp ? tmp - 20 : 0
	}, [dataSourceMap])

	const { position, dataSource: list } = useVirtualList(dataSource, { totalHeight, screenHeight: 820, showNumber: 10, offset })


console.log(position);

	return (
		<div className="page-list-container">
			<h1 className='title'>Meeting Notes</h1>

			<div className="page-list" onScroll={onScroll}>
				{RenderListItem(dataSourceMap)}
				{loading &&
					<div className="loading">
						loading....
					</div>
				}

				{
					!hasMore &&
					<div className="loading">
						没有更多数据了
					</div>
				}
			</div>


		</div>
	)
}

export default PageList;