import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const MAX_TIMEOUT_DELAY = 2147483647;
const PROMISE_STATES = ['fulfilled', 'rejected'];

const form = getRequiredElement('.form');

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');
  const isValidDelay = Number.isInteger(delay) && delay > 0 && delay <= MAX_TIMEOUT_DELAY;
  const isValidState = typeof state === 'string' && PROMISE_STATES.includes(state);

  if (!isValidDelay || !isValidState) {
    iziToast.error({
      title: 'Invalid input',
      message: 'Please enter a valid delay and choose a promise state',
      position: 'topRight',
    });
    return;
  }

  createPromise(delay, state)
    .then((value) => {
      console.log(`✅ Fulfilled promise in ${value}ms`);
      iziToast.success({
        title: 'Fulfilled',
        message: `Fulfilled promise in ${value}ms`,
        position: 'topRight',
      });
    })
    .catch((value) => {
      console.log(`❌ Rejected promise in ${value}ms`);
      iziToast.error({
        title: 'Rejected',
        message: `Rejected promise in ${value}ms`,
        position: 'topRight',
      });
    });

  event.currentTarget.reset();
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
        return;
      }

      reject(delay);
    }, delay);
  });
}

function getRequiredElement(selector) {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }

  return element;
}
