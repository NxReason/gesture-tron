export const DEFAULT_BUTTON_VALUES = [
  { duration: 30, interval: 's' },
  { duration: 45, interval: 's' },
  { duration: 60, interval: 's' },
  { duration: 2, interval: 'm' },
  { duration: 3, interval: 'm' },
  { duration: 5, interval: 'm' },
  { duration: 10, interval: 'm' },
];

export function createTimerButtonData(duration, interval) {
  let mult = 1;
  switch (interval) {
    case 's':
      mult = 1;
      break;
    case 'm':
      mult = 60;
      break;
    default:
      return null;
  }

  return { duration, interval, seconds: 1 * duration * mult };
}

export function createTimerButton(tbData) {
  const li = document.createElement('li');
  li.classList.add('timer-button');

  const durationSpan = document.createElement('span');
  durationSpan.textContent = tbData.duration;
  const intervalSpan = document.createElement('span');
  intervalSpan.classList.add('timer-button-interval');
  intervalSpan.textContent = tbData.interval;

  li.append(durationSpan, intervalSpan);

  return li;
}

export function createTimerButtons(values = DEFAULT_BUTTON_VALUES) {
  const dataSet = values.map(v =>
    createTimerButtonData(v.duration, v.interval)
  );
  const validData = dataSet.filter(isValidData);
  // log invalid input values
  if (dataSet.length !== validData.length) {
    const invalidData = dataSet.filter(rec => !isValidData(rec));
    console.error(
      'createTimerButton(values): must receive duration (Number) and interval (Char {m|s}), received:'
    );
    console.error(invalidData);
  }
  // build button from valid ones
  const buttons = validData.map(data => ({
    node: createTimerButton(data),
    data,
  }));

  return buttons;
}

export function isValidData(buttonValues) {
  if (buttonValues === null) return false;
  if (Number.isNaN(+buttonValues.duration)) return false;
  return true;
}

// Custom timer input
export function createCustomTimerInput() {
  const li = document.createElement('li');
  li.classList.add('timer-button');

  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.classList.add('custom-timer-input');

  li.appendChild(input);

  return { node: li, input };
}
