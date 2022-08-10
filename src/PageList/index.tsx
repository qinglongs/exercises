import { useMemo } from 'react';

import ExpandCard from './components/ExpandCard/index';

import usePagingList from './hooks/usePagingList';

import { getList } from './api'

import './style.css';


const PageList = () => {

	const { loading, dataSource, onScroll, hasMore } = usePagingList(getList);

	/** 我在考虑这一步是否要内置 usePagingList 中 ，如果内置到这个hooks的话这个hooks就不具有通用性了*/
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


	const RenderListItem = (map: Map<number, Set<typeof dataSource[0]>>) => {
		const keys = [...map.keys()]

		return keys.map(key => {
			return <div key={key} className="card">
				<ExpandCard title={key + ''} list={[...map.get(key)!]} />
			</div>
		})
	}

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