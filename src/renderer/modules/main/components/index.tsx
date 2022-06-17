import classNames from 'classnames';
import { Fragment } from 'react';

import FooterComponent from './footer';
import NavbarComponent from './navbar';
import MainRouter from './router';
import SidebarComponent from './sidebar';
import useAppSelector from 'renderer/hooks/useAppSelector';
import { selectAppSidebar } from 'renderer/store/app/selectors';
import { selectAuthCurrent } from 'renderer/store/auth/selectors';

type Props = {};

const MainComponent: React.FC<Props> = () => {
	const appSidebar = useAppSelector(selectAppSidebar);
	const authCurrent = useAppSelector(selectAuthCurrent);
	console.log('MainComponent');

	return (
		<Fragment>
			<NavbarComponent />
			<SidebarComponent />
			<main
				className={classNames('transition-all ease-in-out duration-500', appSidebar ? 'lg:ml-64' : 'ml-0', {
					'mt-14': authCurrent.data?.setting.navbar === 'fixed',
					'mt-0': authCurrent.data?.setting.navbar === 'static'
				})}
			>
				<div className="xl:container mx-auto px-0 sm:px-4 py-4">
					<MainRouter />
				</div>
			</main>
			<FooterComponent />
		</Fragment>
	);
};

export default MainComponent;
