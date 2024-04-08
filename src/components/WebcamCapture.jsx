import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import "./WebcamCapture.css";
import { Button } from "antd-mobile";

const WebcamCapture = ({ url, onCapture, onClose }) => {
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("");
  const [facingMode, setFacingMode] = useState("user"); // 默认使用前置摄像头

  useEffect(() => {
    setImageSrc(url);
  }, [url]);

  const captureImage = () => {
    const capturedImage = webcamRef.current.getScreenshot();
    setImageSrc(capturedImage);
    onCapture && onCapture(capturedImage);
    setShowWebcam(false);
  };

  const handleClose = () => {
    setShowWebcam(false);
    onClose && onClose();
  };

  const handleShowWebcam = () => {
    setShowWebcam(true);
  };

  const switchCamera = () => {
    setFacingMode(facingMode === "user" ? "environment" : "user");
  };

  return (
    <>
      {showWebcam && (
        <div className="fullscreen">
          <Webcam
            className="webcom"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode }}
          />
          <div className="btnbox">
          <Button onClick={switchCamera}>Flip</Button>
          <Button onClick={captureImage}>Take Photo</Button>
          <Button onClick={handleClose}>Close</Button>
          </div>
        </div>
      )}

      <div className="camimg" onClick={handleShowWebcam}>
        {imageSrc ? <img className="img" src={imageSrc} alt="" /> : "+"}
      </div>
    </>
  );
};

export default WebcamCapture;
