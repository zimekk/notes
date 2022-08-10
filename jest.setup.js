import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
jest.mock('@react-native-community/push-notification-ios', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  requestPermissions: jest.fn(() => Promise.resolve({})),
  // configure: jest.fn()
}));
jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn().mockResolvedValueOnce(),
  getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
}));
