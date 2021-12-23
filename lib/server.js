import { createServer, IncomingMessage } from 'http';


/**
 * The stub to be used on the server and communicate with the client.
 * 
 * @class
 */
export class ServerStub {

    /**
     * Create the stub for the server.
     * 
     * @param {string} host - IP or hostname of the server
     * @param {number} port - Port of the server to listen on 
     * @param {boolean} [showlogMsg=false] - Log receiving messages or not
     */
    constructor(host, port, showlogMsg = false) {
        this.host = host;
        this.port = port;
        this.showlogMsg = showlogMsg;
        this.objects = {};
        this.listen();
    }


    /**
     * Bind the object on the server.
     * 
     * @param {string} name - A unique name for the object
     * @param {object} object - An instance of the class implemented the shared interface
     */
    bind(name, object) {
        this.objects[name] = object;
    }


    /**
     * Start the server and handle the requests.
     * 
     * @private
     */
    listen() {
        let server = createServer(async (req, res) => {
            if (req.url in this.objects && req.method === 'POST') {
                let reply;

                try {
                    let msg = await ServerStub.getReqData(req);
                    let object = this.objects[req.url];

                    this.logMsg(req, msg);

                    if (msg.type === 'get') {
                        reply = object[msg.name];
                    } else if (msg.type === 'set') {
                        object[msg.name] = msg.value;
                        reply = object[msg.name];
                    } else if (msg.type === 'method') {
                        reply = object[msg.name](...msg.args) || 0;
                    }
                } catch (error) {
                    reply = { type: 'error', message: error.message };
                } finally {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(reply));
                }
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Route not found' }));
            }
        });

        server.listen(this.port, this.host, () => {
            console.log(`Server running at http://${this.host}:${this.port}/`, '\n');
        });
    }


    /**
     * Get data of the request as Json and parse it.
     * 
     * @async
     * @static
     * @private
     * @param {IncomingMessage} req 
     * @returns {Promise<object>}
     */
    static getReqData(req) {
        return new Promise((resolve, reject) => {
            try {
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    resolve(JSON.parse(body));
                });
            } catch (error) {
                reject(error);
            }
        });
    }


    /**
     * Show message on the console.
     * 
     * @private
     * @param {IncomingMessage} req 
     * @param {object} msg 
     */
    logMsg(req, msg) {
        if (!this.showlogMsg) return;
        let p = req.socket.remotePort;
        let a = req.socket.remoteAddress;
        console.log('\x1b[44m', a, ':', p, '\x1b[0m');
        console.log(msg);
    }

}