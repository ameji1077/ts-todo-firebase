import Navigo from "navigo";
import { setupAuthUI } from "./auth/authUI";
import { setupTodoUI } from "./todos/create/todoCreateUI";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const router = new Navigo('/', {hash: false});

function checkAuthAndRoute(routeHandler: () => void) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      routeHandler();
    } else {
      router.navigate('/login');
    }
  });
}

router
  .on('/login', () => {
    setupAuthUI('login');
  })
  .on('/register', () => {
    setupAuthUI('register');
  })
  .on('/', () => {
    checkAuthAndRoute(() => {
      setupTodoUI();
    });
  })
  .notFound(() => {
    setupAuthUI('login');
  });

export default router;