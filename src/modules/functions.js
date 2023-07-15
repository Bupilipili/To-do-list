export const addNewComponent = (componentDesc, componentsLength) => {
  const newComponent = {
    description: componentDesc,
    completed: false,
    index: componentsLength + 1,
  };

  return newComponent;
};

export const removeComponents = (components, index) => {
  components.splice(index, 1);
  let i = index;
  while (i < components.length) {
    components[i].index = i + 1;
    i += 1;
  }
};