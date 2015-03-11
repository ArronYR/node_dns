/* dns½âÎöÄ£¿é */
var querystring = require("querystring"),
	url = require("url"),
	dns = require('dns');
exports.parseDns = function(res, req){
	var postData = "";
    postData = querystring.parse(url.parse(req.url).query);
	getDns(postData,function(domain,addresses){
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(JSON.stringify({  
	        domain: domain,
	        addresses: addresses.join(',')
	    }));
	});
}

function getDns(postData,callback){
	var domain = '',
		url_get = url.parse(postData.search_dns);
	if ( url_get.host ) {
		domain = url_get.host;
	}else{
		url_get = url.parse( 'http://' + postData.search_dns);
		domain = url_get.host;
	}
	dns.resolve(domain, function(err, addresses){
		if(!addresses){
			addresses=['Not Exist !']
		}
		callback(domain, addresses);
	});
}