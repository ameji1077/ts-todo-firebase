import type { Todo } from '../types';
import { collection, getDocs, addDoc, query, where} from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import { getSessionItem, setSessionItem } from '../utils/sessionStorage';

const todosCollection = collection(db, 'todos');
const cacheKey = 'todos';

export async function fetchTodos(): Promise<Todo[]> {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return [];

  const cached = getSessionItem<Todo[]>(cacheKey);
  if (cached) {
    return cached;
  };

  try {
    const q = query(todosCollection, where('userId', '==', user.uid));
    const snapshot = await getDocs(q);
    const todos: Todo[] = snapshot.docs.map((doc) => doc.data() as Todo);

    setSessionItem(cacheKey, todos);
    return todos;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function saveTodo(todo: Todo) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return;

  try {
    const docRef = await addDoc(todosCollection, {
      ...todo,
      userId: user.uid,
    });

    const currentTodos = getSessionItem<Todo[]>(cacheKey) || [];
    const newTodoWithId = {
      ...todo,
      id: docRef.id,
      userId:user.uid
    };
    setSessionItem(cacheKey, [...currentTodos, newTodoWithId]);
  } catch (error) {
    console.error(error);
  }
}