import { useMemo, useState } from 'react';

import ArrowDownIcon from '../../../assets/svg/arrow-down.svg';
import CardContent from '../CardContent';

import type { GetListReponseItem } from '../../api'

import './style.css'
import dayjs from 'dayjs';

type Props = { list: GetListReponseItem[], title: string }

const ExpandCard: React.FC<Props> = ({ title, list }) => {

	const [expanded, setExpand] = useState(true);

	const onClickExpand = () => {
		setExpand(!expanded);
	};

	/**  控制 arrow-icon 的方向 */
	const iconClassName = useMemo(() => expanded ? '' : 'expanded', [expanded]);

	/** card container 高度 */
	const containerHeight = useMemo(() => expanded ? (list.length * (59 + 12)) - 11 : 0, [list, expanded])

	return <div className="expand-card">

		<div className="card-head" onClick={onClickExpand}>
			<img className={`arrow-icon ${iconClassName}`} src={ArrowDownIcon} alt="arrow-icon" />
			<span className='card-title'>{dayjs(title).format('YYYY-MM-DD HH:mm:ss')}</span>
		</div>

		<div style={{ height: containerHeight }} className={`expand-container ${iconClassName ? 'container-' + iconClassName : ''}`}>
			{
				list.map(item => {
					return <div className='container-item' key={item.id} ><CardContent data={item} /></div>
				})
			}
		</div>


	</div>
}

export default ExpandCard;