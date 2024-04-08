const webPush = require('web-push');
const vapidKeys = webPush.generateVAPIDKeys();
console.log('VAPID 公钥:', vapidKeys.publicKey);
console.log('VAPID 私钥:', vapidKeys.privateKey);
