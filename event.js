const EventEmitter = require('events');

const myEmitter = new EventEmitter();

someFunction = function () {
    console.log('Something has happened');
}
myEmitter.on('some event', someFunction);

myEmitter.emit('some event');
