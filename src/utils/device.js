// export const getDeviceDirection = () => {
//   return new Promise(function (resolve, reject) {
//     if ("DeviceOrientationEvent" in window) {
//       window.addEventListener("deviceorientation", handleOrientation, false);
//     } else {
//       reject("This device does not support device orientation.");
//     }

//     function handleOrientation(event) {
//       let alpha = event.alpha;
//       let beta = event.beta;
//       let gamma = event.gamma;

//       window.removeEventListener("deviceorientation", handleOrientation, false);

//       let directionData = {
//         alpha: alpha,
//         beta: beta,
//         gamma: gamma,
//         direction: `alpha: ${alpha},beta: ${beta},gamma: ${gamma} `,
//       };
//       resolve(directionData);
//     }
//   });
// };

export const getDeviceDirection = () => {
  return new Promise(function (resolve, reject) {
    try {
      if ("DeviceOrientationEvent" in window) {
        window.addEventListener("deviceorientation", handleOrientation, false);
      } else {
        reject("This device does not support device orientation.");
      }
    } catch (error) {
      reject("Failed to register device orientation event listener.");
    }

    function handleOrientation(event) {
      try {
        let alpha = event.alpha;
        let beta = event.beta;
        let gamma = event.gamma;

        window.removeEventListener("deviceorientation", handleOrientation, false);

        if (alpha !== null && beta !== null && gamma !== null) {
          let directionData = {
            alpha: alpha,
            beta: beta,
            gamma: gamma,
            direction: `alpha: ${alpha}, beta: ${beta}, gamma: ${gamma}`,
          };
          resolve(directionData);
        } else {
          reject("Failed to get device orientation data.");
        }
      } catch (error) {
        reject("Error while handling device orientation event.");
      }
    }
  });
};



// export const getDeviceTilt = () => {
//   return new Promise(function (resolve, reject) {
//     const handleMotion = (event) => {
//       const g = event.accelerationIncludingGravity;
      
//       // 直接使用加速度IncludingGravity的值来判断设备是否垂直
//       const isVerticallyUp = g.z < -8; // 设备朝上
//       const isVerticallyDown = g.z > 8; // 设备朝下
      
//       const tiltData = {
//         isVerticallyUp,
//         isVerticallyDown,
//         x: g.x,
//         y: g.y,
//         z: g.z,
//         tilt: `x: ${g.x}, y: ${g.y}, z: ${g.z}`,
//       };

//       console.log(tiltData);
//       resolve(tiltData);

//       // 移除监听器以避免重复监听
//       window.removeEventListener("devicemotion", handleMotion, false);
//     };

//     // 添加事件监听
//     if ("DeviceMotionEvent" in window) {
//       window.addEventListener('devicemotion', handleMotion, false);
//     } else {
//       reject("This device does not support device motion.");
//     }
//   });
// };

export const getDeviceTilt = () => {
  return new Promise(function (resolve, reject) {
    try {
      const handleMotion = (event) => {
        try {
          const g = event.accelerationIncludingGravity;

          // Calculate tilt angle
          const tiltAngle = Math.atan2(g.y, g.x) * (180 / Math.PI);

          // Determine device tilt direction
          let tiltDirection = '';
          if (tiltAngle > 45) {
            tiltDirection = 'tilted to the right';
          } else if (tiltAngle < -45) {
            tiltDirection = 'tilted to the left';
          } else if (tiltAngle > 5) {
            tiltDirection = 'tilted downward';
          } else if (tiltAngle < -5) {
            tiltDirection = 'tilted upward';
          } else {
            tiltDirection = 'stable';
          }

          const tiltData = {
            tiltAngle,
            tiltDirection,
            x: g.x,
            y: g.y,
            z: g.z,
            tilt: `x: ${g.x}, y: ${g.y}, z: ${g.z}`,
          };

          console.log(tiltData);
          resolve(tiltData);

          // Remove the listener to avoid duplicate listening
          window.removeEventListener("devicemotion", handleMotion, false);
        } catch (error) {
          reject("Error while handling device motion data.");
        }
      };

      // Add event listener
      if ("DeviceMotionEvent" in window) {
        window.addEventListener('devicemotion', handleMotion, false);
      } else {
        reject("This device does not support device motion.");
      }
    } catch (error) {
      reject("Error while registering device motion event listener.");
    }
  });
};
