//@ts-nocheck

import { getNativeRequest } from '../native_http_requests';
import { API_URL } from '../../constants';

export const fakeModule = {
  myGetFakeMethod: async () => await getNativeRequest({ url: `${API_URL}/user/all`})
}
