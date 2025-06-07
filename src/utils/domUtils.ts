export function showElement(el: HTMLElement) {
  el.classList.remove('is-none');
}

export function hideElement(el: HTMLElement) {
  el.classList.add('is-none');
}

export function toggleElement(el: HTMLElement) {
  el.classList.toggle('is-none');
}