import http from 'renderer/helpers/http';
import config from 'renderer/config';
import { ResponseData } from 'renderer/types/response';
import { Image, UploadImage } from 'renderer/types/image';
import { AxiosResponse } from 'axios';

const imageService = {
  upload: (files: UploadImage): Promise<AxiosResponse<ResponseData<Image>>> => {
    return http.upload<ResponseData<Image>>({
      url: config.API.END_POINT.UPLOAD_IMAGE,
      files: files,
    });
  },
};

export default imageService;
