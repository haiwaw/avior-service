var http = require('http');
var toClient = require('../../toClient.js');


var restCall = function(apiMethod,apiPath){
        //var self = this;
        return function(options,cb){
                if (options.args){
                        for (arg in options.args){
                                apiPath = apiPath.replace(/:[A-Za-z]+:/, options.args[arg]);
                        }
                }
                if(sails.controllers.main.hostname){
                  var host = sails.controllers.main.hostname;
                }
                else{
                  var host = '10.11.17.40';
                }
                opts = {method:apiMethod,hostname:host,port:8080,path:apiPath};
                
                req = http.request(opts, toClient(this,options.call,options.data,cb));
                if (options.data) {
                        req.write(JSON.stringify(options.data));
                        console.log("DATA: " + options);
                        console.log("Got here");
                }
                req.end();
                
        }
};


module.exports = {
    identity: 'alterflow',
    
    
    /*find: function(req, res){
        restCall('GET','/wm/staticflowentrypusher/list/:arg:/json');
    },*/
    
    create: function(req, res) {
        var floodlight = require('../adapters/FloodlightAdapter');
        var opendaylight = require('../adapters/OpenDaylightAdapter');
        var helium = require('../adapters/OpenDaylightHelium');
        if(sails.controllers.main.sdncontroller === 'floodlight'){
            var Adapter = floodlight;    
        }
        else if(sails.controllers.main.sdncontroller === 'opendaylight' && sails.controllers.main.opendaylight_version === 'hydrogen'){
            var Adapter = opendaylight;
        }
        else if(sails.controllers.main.sdncontroller === 'opendaylight' && sails.controllers.main.opendaylight_version === 'helium'){
            var Adapter = helium;
        }
        else{
            console.log("Flow push error: No controller specified at localhost:1337");
            return;
        }
        Adapter.create(sails.controllers.main.sdncontroller, 'flow', {data: req.body, response: res}, null);
        
        /*console.log("POSTED DATA: " + JSON.stringify(req.body) + '\n')

        flowData = req.body;
        resp = res;
        if(sails.controllers.main.hostname){
                  var host = sails.controllers.main.hostname;
                }
                else{
                  var host = '10.11.17.40';
                }
        opts = {method:'POST',hostname:host,port:8080,path:'/wm/staticflowentrypusher/json'};
        var opts = {method:'POST',hostname:'10.11.17.40',port:8080,path:'/wm/staticflowentrypusher/json'};
        var requ = http.request(opts,  function(res) {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            resp.send(chunk);
          });
        });
        console.log(JSON.stringify(flowData));
        requ.write(JSON.stringify(flowData));
        requ.end();*/
    },

    /*destroy: function(req, res) {

        console.log('Check');

        //restCall('DELETE','/wm/staticflowentrypusher/json');
        console.log("DELETED DATA: ")
        console.log(req.body);
        flowData = req.body;
        resp = res;
        if(sails.controllers.main.hostname){
                  var host = sails.controllers.main.hostname;
                }
                else{
                  var host = '10.11.17.40';
                }
        opts = {method:'DELETE',hostname:host,port:8080,path:'/wm/staticflowentrypusher/json'};
        req = http.request(opts,  function(res) {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
          resp.send(chunk);
          });
        });
        console.log(JSON.stringify(flowData));

        
        console.log(realData);
        req.write(realData);
        req.end();
        

    },*/

    destroy: function(req, res) {
        var floodlight = require('../adapters/FloodlightAdapter');
        var opendaylight = require('../adapters/OpenDaylightAdapter');
        var helium = require('../adapters/OpenDaylightHelium');
        if(sails.controllers.main.sdncontroller === 'floodlight'){
            var Adapter = floodlight;    
        }
        else if(sails.controllers.main.sdncontroller === 'opendaylight' && sails.controllers.main.opendaylight_version === 'hydrogen'){
            var Adapter = opendaylight;
        }
        else if(sails.controllers.main.sdncontroller === 'opendaylight' && sails.controllers.main.opendaylight_version === 'helium'){
            var Adapter = helium;
        }
        else{
            console.log("Flow delete error: No controller specified at localhost:1337");
            return;
        }
        Adapter.destroy(sails.controllers.main.sdncontroller, 'flow', {data: req.body, response: res}, null);
        
        //needs further work / controller choice
        
    },

    tag: function(req, res) {

    },

    like: function(req, res) {

    },
}