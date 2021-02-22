import {
  APP_CASE,
  ENV,
  AT_SPOT_PUSHER_KEY,
  pusherEnabled,
  EXPO_PUSHER_KEY,
} from '../app';
import Pusher from 'pusher-js/react-native';
const isLocal = __DEV__;
const appUrl = () => {
  switch (APP_CASE) {
    case 'DESIGNERAT':
      return 'http://myexpo.live/';
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
      return EXPO_PUSHER_KEY;
    default:
      return pusherEnabled ? AT_SPOT_PUSHER_KEY : '';
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
export {appUrlIos, appUrlAndroid, isLocal, channel};
