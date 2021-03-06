import {
  APP_CASE,
  ENV,
  pusherEnabled,
  DESIGNERAT_PUSHER_ID,
  DESIGNERAT_PUSHER_KEY,
} from '../app';
import Pusher from 'pusher-js/react-native';
const isLocal = __DEV__;
const appUrl = () => {
  switch (APP_CASE) {
    case 'DESIGNERAT':
      return 'https://designeraat.com/';
    default:
      return 'http://mallr.test/';
  }
};
const appUrlIos = isLocal && ENV === 'local' ? 'http://mallr.test/' : appUrl();
const appUrlAndroid =
  isLocal && ENV === 'local' ? 'http://mallr.test/' : appUrl();
const pusherInstance = () => {
  switch (APP_CASE) {
    case 'DESIGNERAT':
      return DESIGNERAT_PUSHER_ID;
    default:
      return pusherEnabled ? DESIGNERAT_PUSHER_KEY : '';
  }
};
const pusher = new Pusher(pusherInstance(), {
  cluster: 'ap2',
  forceTLS: true,
});
if (__DEV__) {
  Pusher.logToConsole = pusherEnabled;
}
const channel = pusher.subscribe('my-channel');
const oneSignalAppId = () => {
  switch (APP_CASE) {
    case 'DESIGNERAT':
      return DESIGNERAT_PUSHER_ID;
    default:
      null;
  }
};
const oneSignalId = oneSignalAppId();
export {appUrlIos, appUrlAndroid, isLocal, channel, oneSignalId};
