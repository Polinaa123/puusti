import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {app} from './firebase';

export const storage = getStorage(app);
export async function uploadFile(uid: string, file: File): Promise<string> {
    const storageRef = ref(storage, `attachments/${uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
}