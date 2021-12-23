import { ServerStub } from '../../index.js'
import { Human } from './Human.js';


let stub = new ServerStub('localhost', 3000, true);
let human = new Human('Amir', 17, 67, 1.73);

stub.bind('/human', human);
