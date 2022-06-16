import http from 'renderer/helpers/http';
import config from 'renderer/config';
import { UpdateProfile, Profile } from 'renderer/types/profile';
import { ResponseData } from 'renderer/types/response';
import { AxiosResponse } from 'axios';

const profileService = {
  show: (): Promise<AxiosResponse<ResponseData<Profile>>> => {
    return http.get<ResponseData<Profile>>({
      url: config.API.END_POINT.PROFILE,
    });
  },
  update: (
    data: UpdateProfile
  ): Promise<AxiosResponse<ResponseData<Profile>>> => {
    return http.put<ResponseData<Profile>>({
      url: config.API.END_POINT.PROFILE,
      data: data,
    });
  },
};

export default profileService;
