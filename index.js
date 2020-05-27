const https = require('https');

class Options {
    hostname = 'www.missingkids.org';
    port = 443;
    path;
    method = 'GET';
    constructor (path) {
        this.path = path;
    }
}

module.exports = {
    GetAlerts: function(state = ""){
        return new Promise((resolve, reject) => {
            (async function(){
                var req = https.request(new Options(`/bin/ncmecEndpoint?endpoint=en_US&rest=&action=amberAlert&missState=${state}`), (res) => {
                    res.on('data', (data) =>{
                        resolve(JSON.parse(data).persons);
                    });
                });
  
                req.on('error', (err) => {
                    reject(err);
                })
    
                req.end();
            })();

            setTimeout(() =>{
                reject("Timed out!");
            }, 10000);

        });
    },
    GetDetails: function(amberId){
        return new Promise((resolve, reject) => {
            (async function(){
                var req = https.request(new Options(`/bin/ncmecEndpoint?endpoint=en_US&rest=&?action=amberDetail&amberId=${amberId}&LanguageId=en_US`), (res) => {
                    res.on('data', (data) =>{
                        resolve(JSON.parse(data).childBean);
                    });
                });
  
                req.on('error', (err) => {
                    reject(err);
                })
    
                req.end();
            })();

            setTimeout(() =>{
                reject("Timed out!");
            }, 10000);

        });
    }
}