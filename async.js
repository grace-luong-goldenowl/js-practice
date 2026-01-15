
// let promise = new Promise(function (resolve, reject) {
//   setTimeout(() => resolve("done!"), 1000);
// });


// let promise = new Promise(function (resolve, reject) {
//   setTimeout(() => reject(new Error("Whoops!")), 1000);
// })
// .finally(() => console.log("Promise ready"));


// let promise = new Promise(function (resolve, reject) {
//   setTimeout(() => reject(new Error("Whoops!")), 1000);
// }).finally(() => new Error("Ignored")) // finally doesn't get the result or the error
// .catch(console.log)
// .catch(console.log); // not catch finally's error


// let promise = new Promise(function (resolve, reject) {
//   setTimeout(() => resolve("done!"), 1000);
// }).finally(() => new Error("Ignored"));
// promise.then(
//   (result) => console.log(result),
//   (error) => console.log(error)
// );

// promise.then(console.log);
// promise.catch(console.log);

// exercise
// delay
// function delay(ms) {
//   return new Promise (function (resolve) {
//     setTimeout(resolve, ms);
//   });
// }

// delay(3000).then(() => console.log("runs after 3 seconds"));


//------- chaining promises -------//
// new Promise(function(resolve, reject) {

//   setTimeout(() => resolve(1), 1000); // (*)

// }).then(function(result) { // (**)

//   console.log(result); // 1
//   return result * 2;

// }).then(function(result) { // (***)

//   console.log(result); // 2
//   return result * 2;

// }).then(function(result) {

//   console.log(result); // 4
//   return result * 2;
// });

// let promise = new Promise(function(resolve, reject){
//   setTimeout(() => resolve(1), 1000);
// })

// promise.then(function(result){
//   console.log(result);
//   return result * 2;
// })

// promise.then(function(result){
//   console.log(result);
//   return result * 2;
// })

// promise.then(function(result){
//   console.log(result);
//   return result * 2;
// })

// fetch("/user.json")
//   .then((response) => response.json())
//   .then((user) => console.log(user.username));


// the execution: catch -> then
// new Promise((resolve, reject) => {

//   // resolve(1);
//   throw new Error("Whoops!"); // the same as reject(new Error("Whoops!"));

// }).then(function(result) {
//   console.log("first then", result);
//   return 10;
// }).catch(function(error) {

//   result = 2;
//   console.log("catch error",error);
//   return result;

// }).then((result) => console.log("second then after catch", result));


// new Promise(function () {
//   return new Error("Whoops!");
// }).then(() => {
//   console.log("Promise resolved"); // don't run bc error handled in function's catch
// }).catch(console.log);


// new Promise(function(resolve, reject) {
//   setTimeout(() => {
//     throw new Error("Whoops!");
//   }, 1000);
// }).catch(console.log); // still catches the error

//------- Promise all -------//
// let urls = [
//   'https://api.github.com/users/iliakan',
//   'https://api.github.com/users/remy',
//   'https://api.github.com/users/jeresig'
// ];

// // map every url to the promise of the fetch
// let requests = urls.map(url => fetch(url));
// console.log(requests); // array of promises: [ Promise { <pending> }, Promise { <pending> }, Promise { <pending> } ]
// // Promise.all waits until all jobs are resolved
// Promise.all(requests)
//   .then(responses => responses.forEach(
//     response => console.log(`${response.url}: ${response.status}`)
//   ));

// Promise.all([
//   new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
//   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
//   new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
// ]).catch(console.log); // Error: Whoops!

// Promise.allSettled
// let urls = [
//     'https://api.github.com/users/remy',
//   'https://no-such-url',
//   'https://api.github.com/users/iliakan',

// ];

// Promise.allSettled(urls.map(url => fetch(url)))
//   .then(results => { // (*)
//     results.forEach((result, num) => {
//       if (result.status == "fulfilled") {
//         console.log(`${urls[num]}: ${result.value.status}`);
//       }
//       if (result.status == "rejected") {
//         console.log(`${urls[num]}: ${result.reason}`);
//       }
//     });
//   });
  //Result: [
  // {status: 'fulfilled', value: ...response...},
//   {status: 'rejected', reason: ...error object...},
//   {status: 'fulfilled', value: ...response...},
// ]

//------- Promise.race -------// first settled promise wins (fulfill or reject) others ignored
// Promise.race([
//   new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
//   new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
//   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
// ]).then(console.log); // 1

//------- Promise.any -------// first fulfilled promise wins, ignores rejected ones. 
// when all fail, return AggregateError (error object containing list of errors)
// Promise.any([
//   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
//   new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
//   new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
// ]).then(alert); // 1