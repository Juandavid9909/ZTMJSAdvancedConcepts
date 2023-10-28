// Exercise 1
let view;

function initialize() {
  let called = 0;

  return function() {
    if (called > 0) {
      return;
    } else {
      view = '🏔';
      called = true;
      console.log('view has been set!');
    }

  }
}

const start = initialize();
start();
start();
start();
console.log(view);

// Exercise 2
// const array = [1,2,3,4];
// for(let i=0; i < array.length; i++) {
//   setTimeout(function(){
//     console.log('I am at index ' + array[i])
//   }, 3000)
// }


const array = [1,2,3,4];

for(var i=0; i < array.length; i++) {
  (function(closureI) {
    setTimeout(function(){
      console.log('I am at index ' + array[closureI])
    }, 3000);
  })(i);
}