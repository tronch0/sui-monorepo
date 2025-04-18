import { utils } from './index';

// Print a default triangle
console.log('Default triangle:');
utils.printTriangle();

// Print a smaller triangle with different character
console.log('\nSmaller triangle with # character:');
utils.printTriangle({
  height: 3,
  character: '#',
});

// Print a left-aligned triangle
console.log('\nLeft-aligned triangle:');
utils.printTriangle({
  height: 4,
  leftAlign: true,
});
