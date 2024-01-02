function sayHelo() {
    console.log("helo")
}

var intervalID = setInterval(sayHelo, 2000);

setTimeout(function () {
    clearInterval(intervalID);
    console.log("interval stopped after 10s")
},10000)