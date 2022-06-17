import { AxiosResponse } from 'axios';

import config from 'renderer/config';
import http from 'renderer/helpers/http';
import { Image, UploadImage } from 'renderer/types/image';
import { ResponseData } from 'renderer/types/response';

const imageService = {
	upload: (files: UploadImage): Promise<AxiosResponse<ResponseData<Image>>> => {
		return http.upload<ResponseData<Image>>({
			url: config.API.END_POINT.UPLOAD_IMAGE,
			files: files
		});
	}
};

export default imageService;
