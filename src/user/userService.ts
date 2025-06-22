import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { getSessionItem } from '../utils/sessionStorage';
import type { User } from '../types';

/**
 * Firestoreからユーザー名（displayName）を取得し、sessionStorageにキャッシュします
 * @param userId - Firebase AuthenticationのUID
 * @returns ユーザー名または null
 */
export async function fetchDisplayName(userId: string): Promise<string | null> {
  const cachedUser = getSessionItem<string>('displayName');
  if (cachedUser) return cachedUser;

  try {
    const userDocRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      const userData = userSnap.data() as User;
      return userData.displayName;
    }
  } catch (error) {
    console.error('ユーザー名の取得に失敗しました:', error);
  }
  return null;
}
