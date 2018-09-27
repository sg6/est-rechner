const connect = require('connect');
const serveStatic = require('serve-static');
connect().use(serveStatic(__dirname + "/dist")).listen(3010, function(){
    console.log('Server running on 3010...');
});