import { QueryCache, useQuery, useQueryClient } from '@tanstack/react-query';

import { BarChartBox, BigChartBox, ChartBox, PieChartBox, TopBox } from '../../components';

import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from '../../data';

import './home.scss';
export const Home = () => {
  const queryClient = useQueryClient();
  // const queryCache = new QueryCache({
  // 	onError: error => {
  // 		console.log(error)
  // 	},
  // 	onSuccess: data => {
  // 		console.log(data)
  // 	},
  // 	onSettled: (data, error) => {
  // 		console.log(data, error)
  // 	},
  // })
  // const query = queryCache.find({
  // 	queryKey: ['currentUser'],
  // })
  const getCurrentUser = () => {
    console.log('сработал запрос на получения юзера');
    return queryClient.getQueryData(['currentuser']);
  };
  const { isLoading, data } = useQuery({
    queryKey: ['currentuser'],
    queryFn: getCurrentUser,
  });
  console.log(data);

  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox {...chartBoxUser} />
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxProduct} />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="box box5">
        <ChartBox {...chartBoxConversion} />
      </div>
      <div className="box box6">
        <ChartBox {...chartBoxRevenue} />
      </div>
      <div className="box box7">
        <BigChartBox />
      </div>
      <div className="box box8">
        <BarChartBox {...barChartBoxVisit} />
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
    </div>
  );
};
