import {PermissionsAndroid, Alert, Platform} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';

const path = Platform.select({
  ios: RNFetchBlob.fs.dirs.DocumentDir,
  android: RNFetchBlob.fs.dirs.DownloadDir,
});

export const requestPermissionCamera = async () => {
  if (Platform.OS == 'ios') {
    return true;
  }

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: 'Camera Permission',
      message: 'App needs access to your camera to take photo.',
    },
  );
  if (
    granted['android.permission.READ_EXTERNAL_STORAGE'] === 'never_ask_again' &&
    granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'never_ask_again'
  ) {
    Alert.alert(
      'Camera Permission',
      "You have to enable access to camera in the settings panel to upload chat's photos.",
    );
    return false;
  }
  if (
    granted['android.permission.READ_EXTERNAL_STORAGE'] === 'denied' &&
    granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'denied'
  ) {
    return false;
  }
  return true;
};
