import { addTodoToDOM } from './todoCreate';
import type { Todo } from '../../types';
import { fetchTodos, saveTodo } from '../todoService';
import { getAuth } from 'firebase/auth';
import { getSessionItem, setSessionItem } from '../../utils/sessionStorage';

const input = document.getElementById('todo-input') as HTMLInputElement;
const form = document.getElementById('todo-form') as HTMLFormElement;
const todayList = document.getElementById('todo-today-list') as HTMLUListElement;
let todoAppInitialized = getSessionItem<boolean>('todoAppInitialized');

export async function  setupTodoUI() {
  const loginForm = document.getElementById('login-form') as HTMLFormElement;
  const registerForm = document.getElementById('register-form') as HTMLFormElement;
  const todoApp = document.getElementById('todo-app') as HTMLFormElement;

  if (loginForm && registerForm && todoApp) {
    loginForm.classList.add('is-none');
    registerForm.classList.add('is-none');
    todoApp.classList.remove('is-none');
  }

  let todos = await fetchTodos();
  todayList.innerHTML = '';
  todos.forEach((todo) => addTodoToDOM(todo, todayList));

  if (!todoAppInitialized) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const title = input.value.trim();
      if (!title) return;

      const newTodo: Todo = {
        id: Date.now().toString(),
        title,
        completed: false,
        userId: user.uid,
      };

      addTodoToDOM(newTodo, todayList);
      await saveTodo(newTodo);
      input.value = '';
    });

    setSessionItem('todoAppInitialized', true);
    todoAppInitialized = true;
  }
}