import type { Todo } from "../../types";

export function addTodoToDOM(todo: Todo, listElement: HTMLUListElement): void {
  const li = document.createElement('li');
  li.textContent = todo.title;
  listElement.appendChild(li);
}