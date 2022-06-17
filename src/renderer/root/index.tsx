import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import RootRouter from './router';
import store from 'renderer/store';
import 'renderer/styles/index.scss';

type Props = {};

const Root: React.FC<Props> = () => {
	return (
		<Provider store={store}>
			<Router>
				<RootRouter />
				<ToastContainer />
			</Router>
		</Provider>
	);
};

export default Root;
