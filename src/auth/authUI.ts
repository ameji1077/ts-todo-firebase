import { login, register } from "./authService";
import type { AuthFormInput } from "../types";
import router from "../router";

export function setupAuthUI(mode: 'login' | 'register') {

  const loginForm = document.getElementById('login-form') as HTMLFormElement;
  const registerForm = document.getElementById('register-form') as HTMLFormElement;
  const todoApp = document.getElementById('todo-app') as HTMLFormElement;

  if (loginForm && registerForm) {
    todoApp.classList.add('is-none');

    if (mode === 'login') {
      loginForm.classList.remove('is-none');
      registerForm.classList.add('is-none');
    } else if (mode === 'register') {
      loginForm.classList.add('is-none');
      registerForm.classList.remove('is-none');
    }
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData: AuthFormInput = {
        email: (document.getElementById('login-email') as HTMLInputElement).value,
        password: (document.getElementById('login-password') as HTMLInputElement).value
      };

      try {
        await login(formData);
        router.navigate('/');
      } catch (error) {
        console.error(error);
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData: AuthFormInput = {
        email: (document.getElementById('register-email') as HTMLInputElement).value,
        password: (document.getElementById('register-password') as HTMLInputElement).value
      };

      try {
        await register(formData);
        router.navigate('/');
      } catch (error) {
        console.error(error);
      }
    });
  }
}