import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MemoryRouter as Router } from 'react-router-dom';
import store from 'renderer/store';
import RootRouter from './router';
import 'renderer/styles/index.scss';
import 'react-toastify/dist/ReactToastify.min.css';

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
