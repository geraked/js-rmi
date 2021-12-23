import { IHuman } from "../shared/IHuman.js";
import { ClientStub } from "../../index.js";


let stub = new ClientStub('localhost', 3000);
let human = stub.lookup('/human', IHuman);


// Before manipulation
console.log('\x1b[44m%s\x1b[0m', '*** Before Manipulation ***');
console.log('toJSON:', await human.toJSON());
console.log('BMI:', await human.bmi());
console.log('\n');


// Manipulate
await (human.name = 'Reza');
await (human.height = 1.80);
await (human.age = await human.age + 3);
await human.looseWeight(5);


// After manipulation
console.log('\x1b[44m%s\x1b[0m', '*** After Manipulation ***');
console.log('toJSON:', await human.toJSON());
console.log('BMI:', await human.bmi());
console.log('\n');