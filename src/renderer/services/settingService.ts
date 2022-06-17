import { AxiosResponse } from 'axios';

import config from 'renderer/config';
import http from 'renderer/helpers/http';
import { ResponseData } from 'renderer/types/response';
import { Setting, UpdateSetting } from 'renderer/types/setting';

const settingService = {
	show: (): Promise<AxiosResponse<ResponseData<Setting>>> => {
		return http.get<ResponseData<Setting>>({
			url: config.API.END_POINT.SETTING
		});
	},
	update: (data: UpdateSetting): Promise<AxiosResponse<ResponseData<Setting>>> => {
		return http.put<ResponseData<Setting>>({
			url: config.API.END_POINT.SETTING,
			data: data
		});
	}
};

export default settingService;
