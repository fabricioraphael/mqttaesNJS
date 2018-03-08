var mqtt = require('mqtt');
var aes256 = require('nodejs-aes256');

var client  = mqtt.connect('mqtt://localhost');

var key = "39ee2184c70ab02a6d42c8a5f69c79dd";
 
client.on('connect', function () {
  client.subscribe('/intr/swt');
  client.subscribe('/intr/schd');
  // client.publish('test/topic', 'Hello mqtt');
});

// mosquitto
// mosquitto_sub -t '/intr/swt' -v
// mosquitto_pub -t '/intr/swt' -m 'xWdat42V//poaeTP+JpAf6wc0cFTkhoiq6yEeh3VNCJRHrp6IyXLmJaBoLYt/BXvlA==' -h localhost
// mosquitto_pub -t '/intr/schd' -m 'xWdat42V//poaeTP+JpAf6wc0cFTkhoiq6yEeh3VNCJRHrp6IyXLmJaBoLYt/BXvlA==' -h localhost
 
client.on('message', function (topic, message) {

	var decodeMsg = decodeMessage(message.toString());
  
	console.log("Topic: " + topic.toString() + 
		"\nEncrypted-Message: " + message.toString() + 
		"\nDecrypted-Message: " + decodeMsg + 
		"\n-----------------------------------------------------------");

  // client.end()
});


function decodeMessage(message){
	return aes256.decrypt(key, message);
}

function encodeMessage(message){
	return aes256.encrypt(key, message);
}