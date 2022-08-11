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

	const { loading, dataSource, onScroll: onPageScroll, hasMore, offset } = usePagingList(getList);

	const { list, totalHeight, offsetTop, onScroll, contentNode } = useVirtualList({ containerHeight: 820, itemHeight: 100 }, dataSource)

	/**  create_time => Set<GetListReponseItem> */
	const renderDataSourceMap = useMemo(() => {
		const map = new Map<number, Set<typeof dataSource[0]>>();

		list.forEach(item => {
			const { create_time } = item;
			let set = map.get(create_time);
			if (!set) map.set(create_time, set = new Set());
			map.set(create_time, set?.add(item));
		})
		
		return map;
	}, [list]);

	const handleScroll = (event: any) => {
		onScroll(event);
		onPageScroll(event);
	}

	return (
		<div className="page-list-container">
			<h1 className='tit	le'>Meeting Notes</h1>

			<div ref={node => contentNode.current = node} className="page-list" onScroll={handleScroll}>
				<div className="placeholder" style={{ height: totalHeight }}></div>

				<div style={{ position: 'absolute', top: offsetTop, left: 0, width: '100%' }}>
					{RenderListItem(renderDataSourceMap)}
				</div>

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