function Display(x) { 
    console.log(x);
};

function ValidateJSON(jsonMessage, jsonSchema) {
    /*
     * This function will validate a json against a json schema
     * 
     * @param  jsonMessage a valid json message as an object
     * @param  jsonSchema  a valid json schema as a file
     * @return             the result of the json validated against the schema 
     */
	
	var Validator = require('jsonschema').Validator;
    var validator = new Validator();
    fs = require('fs');
    let instance = jsonMessage;
    rawdata = fs.readFileSync(jsonSchema);
    let schema = JSON.parse(rawdata);
    let result = validator.validate(instance, schema);
	return result;
};

function ValidateJSONFile(jsonMessage, jsonSchema) {
    /*
     * This function will validate a json against a json schema
     * 
     * @param  jsonMessage a valid json message as a file
     * @param  jsonSchema  a valid json schema as a file
     * @return             the result of the json validated against the schema 
     */
	
	var Validator = require('jsonschema').Validator;
    var validator = new Validator();
    fs = require('fs');
    let rawdata = fs.readFileSync(jsonMessage);
    let instance = JSON.parse(rawdata);
    rawdata = fs.readFileSync(jsonSchema);
    let schema = JSON.parse(rawdata);
    let result = validator.validate(instance, schema);
	return result;
};

var http = require('http');
http.createServer(function handler(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Starting to Parse\n');
    const fs = require('fs');
    
    //var Validator = require('jsonschema').Validator;
    //var v = new Validator();
    //var instance = 4;
    //var schema = {"type": "number"};
    //console.log(v.validate(instance, schema));
    
    //const fs = require('fs');

    //let rawdata = fs.readFileSync('baxter.cycler.schema.json');
    //let schema = JSON.parse(rawdata);
    
    //rawdata = fs.readFileSync('baxter.sample.message.json');
    //let instance = JSON.parse(rawdata);
    //console.log(instance.Vitals);
    //console.log(instance);
    //for (i = 0; i < instance['Actual Therapy'].length; i++) {
    //	console.log(instance['Actual Therapy'][i]);
    //	}
    //
    //let result = v.validate(instance, schema);
    
    let result = ValidateJSONFile('baxter.sample.message.json', 'baxter.cycler.schema.json');
    
    if (result.valid) {
    	console.log("The message is valid\n");
        res.write('The message is valid!\n');
    }
    else {
    	console.log("The message is NOT valid\n");
        res.write('The message is NOT valid!\n');
    }
    console.log(result['errors']);
    
    
    //fs = require('fs');
    let rawdata = fs.readFileSync('baxter.sample.message.json');
    let instance = JSON.parse(rawdata);
    
    for (i = 0; i < instance['Actual Therapy'].length; i++) {
    	result = ValidateJSON(instance['Actual Therapy'][i], 'baxter.cycler.therapy.schema.json');
        if (result.valid) {
        	console.log('The actual therapy message is valid\n');
            res.write('The actual therapy message is valid\n');
            console.log(result['errors']);
        }
        else {
        	console.log('The actual therapy message is valid\n');
            res.write('The actual therapy message is NOT valid\n');
            console.log(result['errors']);
        }
    }
    /*
    result = ValidateJSON(instance['Actual Therapy'][i], 'baxter.cycler.therapy.schema.json');
    rawdata = fs.readFileSync('baxter.cycler.therapy.schema.json');
    let schema2 = JSON.parse(rawdata);
    result = v.validate(instance['Actual Therapy'], schema2);
    for (i = 0; i < instance['Actual Therapy'].length; i++) {
    	console.log(instance['Actual Therapy'][i]);
    	result = v.validate(instance['Actual Therapy'][i], schema2);
        if (result.valid) {
        	console.log("The actual therapy message is valid\n");
            res.write('The actual therapy message is valid!\n');
        }
        else {
        	console.log("The  actual therapy message is NOT valid\n");
            res.write('The  actual therapy message is NOT valid!\n');
        }
        console.log(result);
        //res.write(result);
        
    	}
  
    rawdata = fs.readFileSync('baxter.cycler.actual.therapy.schema.json');
    let schema1 = JSON.parse(rawdata);
    result = v.validate(instance['Actual Therapy'], schema1);
   
    console.log(result);	
    
    if (result.valid) {
    	console.log("The actual therapy message is valid\n");
        res.write('The actual therapy message is valid!\n');
    }
    else {
    	console.log("The  actual therapy message is NOT valid\n");
        res.write('The  actual therapy message is NOT valid!\n');
    }
    */
    
    //console.log(result);
    res.end('End of Parsing');
    
    //console.log(cycler);
    
    
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
Display("This is using a function");



