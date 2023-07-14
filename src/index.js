/* eslint-disable no-unused-vars */
import _ from 'lodash';
import './style.css';
import bin from './bin.svg';

import { addNewComponent, removeComponents } from './modules/functions';

const showComponents = (components) => {
    const container = document.querySelector('.to-do-list');
    container.innerHTML = ''; // Clears the container
  
    // Sort components array based on index property
    components.sort((a, b) => a.index - b.index);
  
    components.forEach((component) => {
      const items = document.createElement('li');
      items.className = 'list-item';
      items.dataset.index = component.index;
      items.innerHTML = `
        <div class="listboxflex">
          <input class="check-box" type="checkbox">
          <input class="description" value="${component.description}" readonly>
          <a class="delete-icon"><img class="delete-img" src="${bin}" alt="bin"></a>
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
    const remove = document.querySelectorAll('.delete-img');
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
          const index = event.target.closest('.list-item').dataset.index;
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
  });
  
  window.addEventListener('load', () => showComponents(components));
  