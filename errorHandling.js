// let json = '{ "age": 30 }'; // incomplete data

// try {

//   let user = JSON.parse(json); // <-- no errors

//   if (!user.name) {
//     throw new SyntaxError("Incomplete data: no name"); // (*)
//   }

//   console.log( user.name );

// } catch (err) {
//   console.log( "JSON Error: " + err.message ); // JSON Error: Incomplete data: no name
// }

// let json = '{ "age": 30 }'; // incomplete data
// try {

//   let user = JSON.parse(json);

//   if (!user.name) {
//     throw new SyntaxError("Incomplete data: no name");
//   }

//   blabla(); // unexpected error

//   console.log( user.name );

// } catch (err) {

//   if (err instanceof SyntaxError) {
//     console.log( "JSON Error: " + err.message );
//   } else {
//     throw err; // rethrow (*)
//   }

// }

// function readData() {
//   let json = '{ "age": 30 }';

//   try {
//     // ...
//     blabla(); // error!
//   } catch (err) {
//     // ...
//     if (!(err instanceof SyntaxError)) {
//       throw err; // rethrow (don't know how to deal with it)
//     }
//   }
// }

// try {
//   readData();
// } catch (err) {
//   console.log( "External catch got: " + err ); // caught it!
// }

// let num = '-35s'

// let diff, result;

// function fib(n) {
//   if (n < 0 || Math.trunc(n) != n) {
//     throw new Error("Must not be negative, and also an integer.");
//   }
//   return n <= 1 ? n : fib(n - 1) + fib(n - 2);
// }

// let start = Date.now();

// try {
//   result = fib(num);
// } catch (err) {
//   result = 0;
// } finally {
//   diff = Date.now() - start;
// }

// console.log(result || "error occurred");

// console.log( `execution took ${diff}ms` );


// class ValidationError extends Error {
//   constructor(message) {
//     super(message); // (1)
//     this.name = "ValidationError"; // (2)
//   }
// }

// function readUser(json) {
//   let user = JSON.parse(json);

//   if (!user.age) {
//     throw new ValidationError("No field: age");
//   }
//   if (!user.name) {
//     throw new ValidationError("No field: name");
//   }

//   return user;
// }


// try {
//   let user = readUser('{ "age": 25 }');
// } catch (err) {
//   if (err instanceof ValidationError) {
//     console.log("Invalid data: " + err.message); // Invalid data: No field: name
//   } else if (err instanceof SyntaxError) { // (*)
//     console.log("JSON Syntax Error: " + err.message);
//   } else {
//     throw err; // unknown error, rethrow it (**)
//   }
// }


class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
    validateUser(user);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
  }

  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
  }

}

try {
  readUser('{ "age": 25 }');
} catch (e) {
  if (e instanceof ReadError) {
    console.log(e);
    console.log("Original error: " + e.cause);
  } else {
    throw e;
  }
}