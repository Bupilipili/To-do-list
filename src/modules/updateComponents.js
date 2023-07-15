export default (components, index) => {
  components[index].completed = !components[index].completed;
  localStorage.setItem('toDoList', JSON.stringify(components));
};