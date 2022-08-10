import React from 'react';

import type { GetListReponseItem } from '../../api'

import './style.css';

const CardContent: React.FC<{ data: GetListReponseItem }> = React.memo(({ data }) => {
	return <div className="card-container">
		<span className='content'>
			{data.title}
		</span>
		<span className='time-range'>
			{data.create_time} - {data.create_time + data.duration}
		</span>
	</div>
})

export default CardContent;