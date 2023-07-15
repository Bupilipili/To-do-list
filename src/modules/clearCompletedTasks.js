export default (components) => {
    components = components.filter((item) => item.completed === false);
    let i = 1;
    components.forEach((component) => {
      component.index = i;
      i += 1;
    });
    localStorage.setItem('toDoList', JSON.stringify(components));
    return components;
}
