import React, { useState, useRef, useEffect } from "react";
import { Camera } from "react-camera-pro";
import { useRouter } from "next/router";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';


export default function Home(props) {
  const router = useRouter();
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);
  const mobileScreen = useMediaQuery('(max-width: 599px)');
  const [ratio, setRatio] = useState(9 / 16);

  useEffect(() => {
    //set ratio camera
    if (mobileScreen) {
      setRatio(9 / 16);
    }
    else {
      setRatio(4 / 3);
    }
  }, [mobileScreen])

  const capture = () => {

    const imageSrc = camera.current?.takePhoto();
    rotateImage(imageSrc, 90, (image) => {
      setImage(image);
      localStorage.setItem('myPhoto', image);
      router.push("/result_photo");
    });

  };

  const errorMessages = {
    noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
    permissionDenied: 'Permission denied. Please refresh and give camera permission.',
    switchCamera:
      'It is not possible to switch camera to different one because there is only one video device accessible.',
    canvas: 'Canvas is not supported.'
  }

  const rotateImage = (imageBase64, rotation, cb) => {
    var img = new Image();
    img.src = imageBase64;
    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0);
      cb(canvas.toDataURL("image/jpeg"));
    };
  };

  //css
  const imageCamera = {
    position: "absolute",
    bottom: "10%",
  };

  const cameraMarking = {
    position: "absolute",
    "width": "100%",
    "height": "100%",
    "top": "0",
  }

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'hidden' }}>
      <Grid container direction="column" sx={{ height: '100%' }}>
        <Grid item xs sx={{ position: 'relative', flexGrow: 1 }}>
          <Camera ref={camera} numberOfCamerasCallback={setNumberOfCameras} facingMode="user" aspectRatio={ratio} errorMessages={errorMessages} />
          {!mobileScreen && (
            <Box sx={cameraMarking}>
              <svg width="100%" height="100%">
                <rect x="0" y="0" width="100%" height="100%" fill="transparent" strokeWidth="2" stroke="white" />
              </svg>
            </Box>
          )}
        </Grid>
        <Grid item sx={{ position: 'relative' }}>
          <Box display="flex" alignItems="center" justifyContent="center" sx={{ position: mobileScreen ? 'fixed' : 'absolute', bottom: mobileScreen ? '20px' : '40px', left: '50%', transform: 'translate' }} />

          <CircleOutlinedIcon onClick={capture} sx={{ height: 60, width: 60, zIndex: 'fab', color: 'black' }} />
        </Grid>
      </Grid>


    </Box>
  );
}