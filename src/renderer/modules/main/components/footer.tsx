import classNames from 'classnames';

import ImageComponent from 'renderer/components/Image/components';
import config from 'renderer/config';
import useAppSelector from 'renderer/hooks/useAppSelector';
import { selectAppSidebar } from 'renderer/store/app/selectors';

type Props = {};

const FooterComponent: React.FC<Props> = () => {
	const appSidebar = useAppSelector(selectAppSidebar);

	return (
		<footer className={classNames('py-4 bg-gray-200 transition-all ease-in-out duration-500', appSidebar ? 'lg:ml-64' : 'ml-0')}>
			<div className="xl:container mx-auto px-4">
				<div className="flex justify-center items-center">
					<ImageComponent className="rounded-full h-8 w-8 mr-2" src={config.LOGO_URL} alt={config.APP_NAME} />
					<small className="text-gray-500 font-bold">
						Copyright &copy; {new Date().getFullYear()}
						<a target="_blank" rel="noopener noreferrer" href="https://libeyondea.com" className="text-indigo-800 ml-1">
							{config.APP_NAME}
						</a>
					</small>
				</div>
			</div>
		</footer>
	);
};

export default FooterComponent;
