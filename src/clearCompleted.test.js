import clearCompletedTasks from './modules/clearCompletedTasks.js';

describe('clearCompletedTasks', () => {
  test('should clear completed tasks and update indexes and localStorage', () => {
    // Mock components data as needed for your test case
    const components = [
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: true, index: 2 },
      { description: 'Task 3', completed: false, index: 3 },
    ];

    // Call the function with the mocked data
    const result = clearCompletedTasks(components);

    // Assert that the function has updated components and localStorage accordingly
    // You can use expect statements to check if the function has behaved as expected
    // For example, you can expect the result to have filtered out completed tasks
    expect(result).toEqual([
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 3', completed: false, index: 2 },
    ]);
  });
});
