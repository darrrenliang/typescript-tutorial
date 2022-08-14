"use strict";
let myName = 'Darren';
let age = 27;
let hasPet = false;
let nothing = undefined;
let nothingLiterally = null;
console.log(myName);
// Type Annotation: TS 會限制這兩個變數，不被其他型別取代。
var absoluteNothing = undefined;
var literallyAbsoluteNothing = null;
absoluteNothing = 123;
literallyAbsoluteNothing = "I can't live in this variable now...";
