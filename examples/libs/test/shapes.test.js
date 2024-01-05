
const { Triangle, Square, Circle } = require('./shapes');

test('Triangle render method', () => {
  const triangle = new Triangle('blue');
  expect(triangle.render()).toEqual('<polygon points="150,18 244,182 56,182" fill="blue" />');
});

test('Square render method', () => {
  const square = new Square('red');
  expect(square.render()).toEqual('<rect width="200" height="200" fill="red" />');
});

test('Circle render method', () => {
  const circle = new Circle('green');
  expect(circle.render()).toEqual('<circle cx="150" cy="100" r="80" fill="green" />');
});
