import './style.css';

import { addNewComponent, removeComponents } from './modules/functions.js';

const showComponents = (components) => {
  const container = document.querySelector('.to-do-list');
  container.innerHTML = ''; // Clears the container

  // Sort components array based on index property
  components.sort((a, b) => a.index - b.index);

  components.forEach((component) => {
    const items = document.createElement('li');
    items.className = 'list-item';
    items.dataset.index = component.index - 1;
    items.innerHTML = `
    <div class="listboxflex">
        <input class="check-box" type="checkbox" ${component.completed ? 'checked' : ''}>
        <input class="description" value="${component.description}" readonly>
        <a><i class="fa-solid fa-trash delete-icon"></i></a>
    </div>
    `;
    container.appendChild(items);
  });
};

let components = JSON.parse(localStorage.getItem('toDoList')) || [];
const addList = document.querySelector('.input');
addList.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.key === 'Enter' && addList.value !== '') {
    const componentDesc = addList.value;
    components.push(addNewComponent(componentDesc, components.length));
    showComponents(components);
    localStorage.setItem('toDoList', JSON.stringify(components));
    addList.value = '';
  }
});

const container = document.querySelector('.to-do-list');
container.addEventListener('click', (event) => {
  const remove = document.querySelectorAll('.delete-icon');
  remove.forEach((icon, index) => {
    if (event.target === icon) {
      removeComponents(components, index);
      showComponents(components);
      localStorage.setItem('toDoList', JSON.stringify(components));
    }
  });

  // Edit case
  const tasksInput = document.querySelectorAll('.description');
  tasksInput.forEach((input) => {
    input.addEventListener('input', (event) => {
      const { index } = event.target.closest('.list-item').dataset;
      if (components[index]) {
        components[index].description = event.target.value;
        localStorage.setItem('toDoList', JSON.stringify(components));
      }
    });
    input.addEventListener('click', () => {
      if (input.hasAttribute('readonly')) {
        input.removeAttribute('readonly');
      } else {
        input.setAttribute('readonly', 'true');
      }
    });
  });

  // interactive section
  const updateComponents = (components, index) => {
    components[index].completed = !components[index].completed;
    localStorage.setItem('toDoList', JSON.stringify(components));
  };

  // Checkbox status
  const checkBoxes = document.querySelectorAll('.check-box');
  checkBoxes.forEach((checkBox, index) => {
    checkBox.addEventListener('change', () => {
      updateComponents(components, index);
      showComponents(components);
    });
  });

  const clearCompletedTasks = () => {
    components = components.filter((item) => item.completed === false);
    let i = 1;
    components.forEach((component) => {
      component.index = i;
      i += 1;
    });
    localStorage.setItem('toDoList', JSON.stringify(components));
    showComponents(components);
  };

  // Clear completed tasks
  const clearBtn = document.querySelector('.clear');
  clearBtn.addEventListener('click', () => {
    clearCompletedTasks();
  });
});

window.addEventListener('load', () => showComponents(components));