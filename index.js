'use strict';

const fs           = require('fs');
const readline     = require('readline');
const EventEmitter = require('events');

module.exports = function (path) {

    class LineEvents extends EventEmitter {};

    const stream      = fs.createReadStream(path);
    const lines       = readline.createInterface({ input: stream });
    const lineEmitter = new LineEvents;

    
    let header;
    lines.on('line', (line) => {

        if (!header) {
            header = line.split(',');
            return;
        }

        let obj  = {};
        let data = line.split(',');
        let index, title;

        for (index = 0; index < data.length; index++) {
            title = header[index];
            obj[title] = data[index];
        }

        lineEmitter.emit('data', obj);
    });

    lines.on('close', () => {
        lineEmitter.emit('done');
    });

    return lineEmitter;
 }
