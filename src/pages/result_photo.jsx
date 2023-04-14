
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { FormControl, Button, Typography, Chip, Grid, Card, Stack } from '@mui/material';
import Image from 'next/image';


export default function ResultPhoto() {
  const router = useRouter();
  const [myFoto, setMyFoto] = useState("");
  const [fileImage, setFileImage] = useState(null);

  useEffect(() => {
    setMyFoto(localStorage.getItem('myPhoto'));
    urltoFile(localStorage.getItem('myPhoto'), "myPhotos.jpeg", "image/jpeg").then(
      function (file) {
        setFileImage(file);
      }
    );
  }, [myFoto]);


  //convert from base64 format to image file
  function urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }

  function reSelfie() {
    router.push({
      pathname: "/"
    });
  }

  //css
  const imageResult = {
    "border-radius": "50%",
    "object-fit": "cover"
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
      <Grid container sx={{ backgroundImage: 'url(/green-backdrop.jpeg)', p: 2 }}>
        <Typography sx={{ color: '#566573', fontSize: 14 }}>
          A Simple Duck
        </Typography>
        <Box>
          <Typography sx={{ color: '#212F3D', fontSize: 30 }}>
            96%
          </Typography>
          <Typography sx={{ color: '#0B5345', fontSize: 16 }}>
            Sustainable
          </Typography>
          <Box>
            <Chip label="Feathers" color="primary" sx={{ m: 1 }} />
            <Chip label="Muscles" color="primary" sx={{ m: 1 }} />
            <Chip label="Bones" color="primary" sx={{ m: 1 }} />
          </Box>
        </Box>
        <Image
          alt="what"
          src="/rubber-duck.png"
          width={80} height={80}
        />


      </Grid>
      <Card sx={{ backgroundColor: '#F7DC6F', m: 2, p: 2 }}>
        <Typography sx={{ color: '#7D6608', fontSize: 14 }}>
          Disposal
        </Typography>
        <Stack direction="row">
          <Typography>
            Dispose off in your nearest Yellow Lid Dustbin
          </Typography>
          <Image src="/yellow-dustbin.png" alt="A Yellow Dustbin" height={60} width={60}></Image>
        </Stack>
      </Card>
    </Box>
  );
}