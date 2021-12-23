import { request } from "http";


/**
 * The stub to be used on the client and communicate with the remote server.
 * 
 * @class
 */
export class ClientStub {

    /**
     * Create a stub on the client.
     * 
     * @param {string} host - Remote server IP or hostname
     * @param {number} port - Remote server port
     */
    constructor(host, port) {
        this.host = host;
        this.port = port;
    }


    /**
     * Create a proxy of the remote object.
     * 
     * @param {string} name - Name of the remote object bound on the server
     * @param {function} iface - The interface shared between server and client
     * @returns {object}
     */
    lookup(name, iface) {

        let instance = new iface();
        let obj = {};

        // Iterate the methods of the class and override them
        Object.getOwnPropertyNames(iface.prototype).forEach(m => {
            if (m === 'constructor') return;
            obj[m] = async (...args) => {
                return await this.sendMessage(name, {
                    type: 'method',
                    name: m,
                    args: args
                });
            };
        });

        // Iterate the properties of the class and override their setters and getters
        for (let p in instance) {
            Object.defineProperty(obj, p, {
                get: async () => {
                    return await this.sendMessage(name, {
                        type: 'get',
                        name: p
                    });
                },
                set: async (val) => {
                    return await this.sendMessage(name, {
                        type: 'set',
                        name: p,
                        value: val
                    });
                }
            });
        }

        return obj;
    }


    /**
     * Post a message to the remote object.
     * 
     * @private
     * @async
     * @param {string} path - Remote object name
     * @param {object} data - Message data
     * @returns {Promise}
     */
    sendMessage(path, data) {
        return new Promise((resolve, reject) => {
            try {
                data = JSON.stringify(data);

                let options = {
                    hostname: this.host,
                    port: this.port,
                    path: path,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': data.length,
                    },
                }

                let req = request(options, (res) => {
                    let body = '';

                    res.on('data', (chunk) => {
                        body += chunk.toString();
                    });

                    res.on('end', () => {
                        body = JSON.parse(body);
                        if (body.type === 'error') {
                            reject(new Error(body.message))
                        } else {
                            resolve(body);
                        }
                    });
                });

                req.on('error', (error) => {
                    reject(error);
                });

                req.write(data);
                req.end();
            } catch (error) {
                reject(error);
            }
        });
    }

}
