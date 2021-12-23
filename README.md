# RMI

Implementation of RMI in Node.js

## Run the example

-   Make sure [Node.js](https://nodejs.org/en/download/) has been installed on your machine.
-   Download the repository as [ZIP](https://github.com/geraked/js-rmi/archive/refs/heads/master.zip) or use the following command:

```
git clone https://github.com/geraked/js-rmi.git
```

-   Go to directory where the file `package.json` exists:

```
cd js-rmi
```

-   Execute the following command to run the example:

```
npm run example
```

## Use the library

-   Install:

```
npm i https://github.com/geraked/js-rmi.git
```

-   Define an abstract class (interface) and share between the client and server:

[IHuman.js](example/shared/IHuman.js)

-   Implement the interface on the server:

[Human.js](example/server/Human.js)

-   Create an object on the `server` and bind it:

```js
import { ServerStub } from "rmi";
import { Human } from "./Human.js";

let stub = new ServerStub("localhost", 3000);
let human = new Human("Amir", 17, 67, 1.73);

stub.bind("/human", human);
```

-   Lookup the remote object from the `client` and use it:

```js
import { IHuman } from "../shared/IHuman.js";
import { ClientStub } from "rmi";

let stub = new ClientStub("localhost", 3000);
let human = stub.lookup("/human", IHuman);

console.log("toJSON:", await human.toJSON());
console.log("BMI:", await human.bmi());

// Manipulate
await (human.name = "Reza");
await (human.height = 1.8);
await (human.age = (await human.age) + 3);
await human.looseWeight(5);
```

## Author

**Rabist** - view on [LinkedIn](https://www.linkedin.com/in/rabist)

## Details

-   **Course:** Distributed Systems - MS
-   **Teacher:** [Dr. Amir Kalbasi](https://aut.ac.ir/cv/2241/AMIR-KALBASI?slc_lang=en)
-   **Univ:** Amirkabir University of Technology - Tehran Polytechnic
-   **Semester:** Fall 1400

The exercise and report documents are available in [`docs`](https://github.com/geraked/js-rmi/tree/docs) branch.

View the [Exercise PDF](https://github.com/geraked/js-rmi/blob/docs/exercise.pdf).

View the [Report PDF](https://github.com/geraked/js-rmi/blob/docs/report.pdf).

## License

Licensed under [MIT](LICENSE).
