export default (components, tasksInput) => {
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
  }
  