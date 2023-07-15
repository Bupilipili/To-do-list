import './style.css';
import { addNewComponent, removeComponents } from './modules/functions.js';
import updateComponents from './modules/updateComponents.js';
import showComponents from './modules/showComponents.js';
import clearCompletedTasks from './modules/clearCompletedTasks.js';

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

  // Checkbox status
  const checkBoxes = document.querySelectorAll('.check-box');
  checkBoxes.forEach((checkBox, index) => {
    checkBox.addEventListener('change', () => {
      updateComponents(components, index);
      showComponents(components);
    });
  });

  // Clear completed tasks
  const clearBtn = document.querySelector('.clear');
  clearBtn.addEventListener('click', () => {
    components = clearCompletedTasks(components);
    showComponents(components);
  });
});

window.addEventListener('load', () => showComponents(components));