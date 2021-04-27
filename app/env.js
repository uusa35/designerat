import {
  APP_CASE,
  ENV,
  pusherEnabled,
  DESIGNERAT_PUSHER_ID,
  DESIGNERAT_PUSHER_KEY,
  EXPO_ONE_SIGNAL_APP_ID,
  DESIGNERAT_ONE_SIGNAL_APP_ID,
  ABATI_ONE_SIGNAL_APP_ID,
} from '../app';
import Pusher from 'pusher-js/react-native';
const isLocal = __DEV__;
const appUrl = () => {
  switch (APP_CASE) {
    case 'DESIGNERAAT':
      // return 'http://mallr.test/';
      return 'https://designeraat.com/';
    case 'MYEXPO':
      return 'http://myexpo.live/';
    case 'IORDER':
      return 'http://iorder.iads-kw.com/';
    case 'ABATI':
      return 'http://abatiapp.com/';
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
    case 'MYEXPO':
      return EXPO_ONE_SIGNAL_APP_ID;
    case 'ABATI':
      return ABATI_ONE_SIGNAL_APP_ID;
  }
};
const oneSignalId = oneSignalAppId();
export {appUrlIos, appUrlAndroid, isLocal, channel, oneSignalId};
