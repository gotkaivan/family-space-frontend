import React from 'react';
// import ChartFour from '../components/charts/ChartFour';
import ChartOne from '../components/charts/ChartOne';
import ChartTwo from '../components/charts/ChartTwo';
import ChartThree from '../components/charts/ChartThree';

const Home = () => {
	return (
		<div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
			{/* <ChartFour /> */}
			<ChartOne />
			<ChartTwo />
			<ChartThree />
		</div>
	);
};

export default Home;
