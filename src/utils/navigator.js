export const getCurrentPositionWithAddress = (apiKey) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`);
          const data = await response.json();
          if (data.status === 'OK') {
            const address = data.results[0].formatted_address;
            resolve({ latitude, longitude, address });
          } else {
            reject('Geocoding failed due to: ' + data.status);
          }
        } catch (error) {
          console.error('Geocoding error:', error);
          reject(error);
        }
      },
      (err) => {
        console.error(err.message);
        reject(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
};
