import { PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs';

const saveImage = async (imageUri: string, fileName: string): Promise<string> => {
    const folderPath = `${RNFS.DocumentDirectoryPath}/StudentImages`;

    // Check for permissions on Android
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            throw new Error('Storage permission not granted');
        }
    }

    // Create the folder if it doesn't exist
    await RNFS.mkdir(folderPath);

    const filePath = `${folderPath}/${fileName}.jpg`;

    // Save the image
    await RNFS.copyFile(imageUri, filePath);

    return filePath;
};

export { saveImage };