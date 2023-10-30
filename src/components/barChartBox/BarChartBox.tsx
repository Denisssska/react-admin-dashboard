import { Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts';

import './barChartBox.scss';

type Props = {
	color: string
	title: string
	dataKey: string
	chartData: object[]
}
export const BarChartBox: React.FC<Props> = props => {
	return (
		<div className='barChartBox'>
			<h1>{props.title}</h1>
			<div className='chart'>
				<ResponsiveContainer width='99%' height={150}>
					<BarChart width={150} height={40} data={props.chartData}>
						<Tooltip
							labelStyle={{ display: 'none' }}
							cursor={{ fill: 'none' }}
							contentStyle={{ background: '2a3447', borderRadius: '5px' }}
						/>
						<Bar dataKey={props.dataKey} fill={props.color} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
