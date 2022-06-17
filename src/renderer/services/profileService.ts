import { AxiosResponse } from 'axios';

import config from 'renderer/config';
import http from 'renderer/helpers/http';
import { Profile, UpdateProfile } from 'renderer/types/profile';
import { ResponseData } from 'renderer/types/response';

const profileService = {
	show: (): Promise<AxiosResponse<ResponseData<Profile>>> => {
		return http.get<ResponseData<Profile>>({
			url: config.API.END_POINT.PROFILE
		});
	},
	update: (data: UpdateProfile): Promise<AxiosResponse<ResponseData<Profile>>> => {
		return http.put<ResponseData<Profile>>({
			url: config.API.END_POINT.PROFILE,
			data: data
		});
	}
};

export default profileService;
