/* eslint-disable no-unused-vars */
import _ from 'lodash';
import './style.css';

const components = [
  {
    description: 'complete to Do list project',
    completed: false,
    index: 1,
  },
  {
    description: 'wash the dishes',
    completed: false,
    index: 0,
  },
];

const showComponents = () => {
  const container = document.querySelector('.to-do-list');

  // Sort components array based on index property
  components.sort((a, b) => a.index - b.index);

  components.forEach((component) => {
    const items = document.createElement('li');
    items.className = 'list-item';
    items.innerHTML = `<input class="check-box" type="checkbox">${component.description}`;
    container.appendChild(items);
  });
};

window.addEventListener('load', showComponents);