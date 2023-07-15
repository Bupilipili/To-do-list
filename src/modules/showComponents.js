export default (components) => {
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
}
