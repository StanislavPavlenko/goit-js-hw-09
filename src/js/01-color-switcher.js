function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


const refs = {
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),

};
let timerId = null;

refs.btnStart.addEventListener('click', onStart);
refs.btnStop.addEventListener('click', onStop);

function onStart() {
    refs.btnStop.disabled = '';
    refs.btnStart.disabled = 'disabled';
    document.body.style.backgroundColor = getRandomHexColor();
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}
function onStop() {
    refs.btnStart.disabled = '';
    clearInterval(timerId);
}