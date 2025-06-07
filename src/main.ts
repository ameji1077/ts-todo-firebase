import './style.css';
import router from "./router";
import { logout } from './auth/authService';

const toRegisterLink = document.getElementById('to-register') as HTMLAnchorElement;
const toLoginLink = document.getElementById('to-login') as HTMLAnchorElement;
const logoutButton = document.getElementById('logout-button') as HTMLButtonElement;

toRegisterLink?.addEventListener('click', (e) => {
  e.preventDefault();
  router.navigate('/register');
});

toLoginLink?.addEventListener('click', (e) => {
  e.preventDefault();
  router.navigate('/login');
});

logoutButton?.addEventListener('click', async () => {
  try {
    await logout();
    router.navigate('/login');
  } catch (error) {
    console.error(error);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  router.resolve();
});