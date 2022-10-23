var io = require('socket.io-client');
let puppeteer = require('puppeteer');
var socket = io.connect("http://localhost:3000", {
    reconnection: true,
});

socket.on('connect', function () {
    console.log('connected to localhost:3000');
    socket.on('tests', async function (data) {
        console.log('message from the server:', data);
        const browser = await puppeteer.launch({
            headless: false,
            product: 'firefox',
            defaultViewport: null,
        });
        const page = await browser.newPage();
      
        await page.goto('https://developers.google.com/web/');
    });
});