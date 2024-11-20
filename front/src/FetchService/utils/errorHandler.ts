import { EventEmitterAgent, EventsDictionary } from '../../EventEmitter';

export const errorHandler = (response: Response) => {
  if(response.status === 401) {
   EventEmitterAgent.emit(EventsDictionary.unAuthorized)
  } else if(response.status === 403) {
    EventEmitterAgent.emit(EventsDictionary.unAuthorized)
  }

  throw response
};