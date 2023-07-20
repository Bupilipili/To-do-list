import { addNewComponent, removeComponents } from './modules/functions.js';

describe('addNewComponent', () => {
  test('should add a new component to the list correctly', () => {
    const componentDesc = 'New Component';
    const componentsLength = 3;
    const expectedComponent = {
      description: componentDesc,
      completed: false,
      index: componentsLength + 1,
    };

    const result = addNewComponent(componentDesc, componentsLength);
    expect(result).toEqual(expectedComponent);
  });
});

describe('removeComponents', () => {
  test('should remove a component from the list correctly', () => {
    const components = [
      { description: 'Component 1', completed: false, index: 1 },
      { description: 'Component 2', completed: false, index: 2 },
      { description: 'Component 3', completed: false, index: 3 },
    ];
    const indexToRemove = 1;
    const expectedComponents = [
      { description: 'Component 1', completed: false, index: 1 },
      { description: 'Component 3', completed: false, index: 2 },
    ];

    removeComponents(components, indexToRemove);
    expect(components).toEqual(expectedComponents);
  });
});
