import './style.css';
import router from "./router";
import { logout } from './auth/authService';

const toRegisterLink = document.getElementById('to-register') as HTMLAnchorElement;
const toLoginLink = document.getElementById('to-login') as HTMLAnchorElement;
const toIndexLink = document.getElementById('to-index') as HTMLElement;
const logoutButton = document.getElementById('logout-button') as HTMLButtonElement;
const clickEvent = new Event('click');

toRegisterLink?.addEventListener('click', (e) => {
  e.preventDefault();
  router.navigate('/register');
});

toLoginLink?.addEventListener('click', (e) => {
  e.preventDefault();
  router.navigate('/login');
});

toIndexLink?.addEventListener('click', (e) => {
  e.preventDefault();
  router.navigate('/');
});

logoutButton?.addEventListener('click', async () => {
  try {
    menuCloseButton.dispatchEvent(clickEvent);
    await logout();
    router.navigate('/login');
  } catch (error) {
    console.error(error);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  router.resolve();
});

const menuOpenButton = document.getElementById('menu-open') as HTMLButtonElement;
const menuCloseButton = document.getElementById('menu-close') as HTMLButtonElement;
const sideMenu = document.getElementById('side-menu') as HTMLElement;

menuOpenButton?.addEventListener('click', () => {
  sideMenu?.classList.add('todo-app__side-menu--active');
});

menuCloseButton?.addEventListener('click', () => {
  sideMenu?.classList.remove('todo-app__side-menu--active');
});

sideMenu?.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.tagName === 'A') {
    e.preventDefault();
    const route = target.dataset.route;
    if (route) {
      router.navigate(route);
      sideMenu.classList.remove('todo-app__side-menu--active');
    }
  }
});