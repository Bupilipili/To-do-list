/* eslint-disable no-unused-vars */
import _ from 'lodash';
import './style.css';
import bin from './bin.svg';

const addNewComponent = (componentDesc, componentsLength) => {
    const newComponent = {
      description: componentDesc,
      completed: false,
      index: componentsLength,
    };
  
    return newComponent;
  };
  
  const showComponents = (components) => {
    const container = document.querySelector('.to-do-list');
    container.innerHTML = ''; // Clear the container
  
    // Sort components array based on index property
    components.sort((a, b) => a.index - b.index);
  
    components.forEach((component) => {
      const items = document.createElement('li');
      items.className = 'list-item';
      items.innerHTML = `
        <input class="check-box" type="checkbox">
        <span class="description">${component.description}</span>
        <a class="delete-icon"><img class="delete-img" src="${bin}" alt="bin"></a>
      `;
      container.appendChild(items);
    });
  };

  const removeComponents = (components, index) => {
    components.splice(index, 1);
    let i = index;
    while (i < components.length) {
      components[i].index = i;
      i += 1;
    }
  };
  
  const editTask = (components, index, componentDesc) => {
    components[index].description = componentDesc;
  };
  
  const components = JSON.parse(localStorage.getItem('toDoList')) || [];
  const addList = document.querySelector('.input');
  addList.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("pressed");
    if (event.key === 'Enter' && addList.value !== '') {
      const componentDesc = addList.value;
      components.push(addNewComponent(componentDesc, components.length));
      showComponents(components);
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
      }
    });
  
    // Edit case
    const descriptions = document.querySelectorAll('.list-item');
    descriptions.forEach((component, index) => {
      if (event.target === component) {
        const list = event.target.parentNode;
        list.classList.add('edit-bg');
        const previous = components[index].description;
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.className = 'list-item edit-bg';
        inputField.value = previous;
        component.innerHTML = '';
        component.appendChild(inputField);
        inputField.focus();
  
        inputField.addEventListener('blur', () => {
          const newComponent = inputField.value;
          component.removeChild(inputField);
          component.innerText = newComponent;
          editTask(components, index, newComponent);
          showComponents(components);
        });
      }
    });
  });
  
  localStorage.setItem('toDoList', JSON.stringify(components));
  window.addEventListener('load', () => showComponents(components));
  