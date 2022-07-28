import { logName } from './utils';

function init() {
  const form = document.querySelector('form');
  form?.addEventListener('submit', submitHandler);
}

function submitHandler(e: Event) {
  e.preventDefault();

  const inputElement = document.querySelector("input[name='name']") as HTMLInputElement;
  const result = logName(inputElement.value);
  const resultElement = document.querySelector('#name-result');

  if (resultElement) {
    resultElement.textContent = result;
  }
}

init();
