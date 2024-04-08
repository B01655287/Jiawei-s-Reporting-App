function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
  
export const subscribeToPushNotifications = () => {
  return new Promise(async (resolve, reject) => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.log("Not supported by Service Worker or Push API");
      reject("Not supported by Service Worker or Push API");
      return;
    }

    try {
      const permissionResult = await Notification.requestPermission();
      if (permissionResult !== "granted") {
        console.log("No permission to get push notifications");
        reject("No permission to get push notifications");
        return;
      }

      console.log('status', navigator.serviceWorker.ready);
      const registration = await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BCO3T2ey_oxiPT7INGO6ZRtMnFVSr_KWWnf1pZKwlCDeWilm831LoVw_6-wER9cPsvpfjpIJfheqqY6Z8ymPT2U"),
      });      

      console.log("Push subscription success:", subscription);

      resolve(subscription);
    } catch (err) {
      console.error("Push subscription failed:", err);
      reject(err);
    }
  });
}
