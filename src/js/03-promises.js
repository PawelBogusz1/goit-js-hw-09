import Notiflix, { Notify } from "notiflix";

const formDelay = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name=delay]'),
  inputDelayStep: document.querySelector('input[name=step]'),
  inputAmount: document.querySelector('input[name=amount]'),
};

formDelay.form.addEventListener('submit', submitForm);

function createPromise(position, delay) {
  const resolvePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return resolvePromise;
}

function submitForm(event) {
  event.preventDefault();

  let waitDelay = Number(formDelay.inputDelay.value);
  let amount = Number(formDelay.inputAmount.value);
  let waitStep = Number(formDelay.inputDelayStep.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, waitDelay)
      .then(({ position, delay }) => {
        console.log(position);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
          waitDelay += waitStep;
  }
}
