const msg = require("./file2"); //returned value is assigned to variable, as it was a single export, we do not get an object
const { note, note1 } = require("./file3"); // returned value is an object, and we do object destructuring, ass we have multiple exports
const file4 = require("./file4"); // the entire returned object is put in the variable called as file4
const file5 = require("./file5");

console.log(msg);
console.log(note, note1);
console.log(file4.info, file4.anotherInfo); // as file4 is an object, we can call the properties
console.log(file5.info);
