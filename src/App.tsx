import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import Routes from './router/routes';

import { store } from './store';

function App() {
	return (
		<BrowserRouter>
			<Toaster position="top-right" />
			<Provider store={store}>
				<Routes />
			</Provider>
		</BrowserRouter>
	);
}

export default App;
