
  import { useRouter } from "next/router";
  import { useState, useEffect } from "react";
  import Box from '@mui/material/Box';
  import { FormControl, Button } from '@mui/material';
  import Image from 'next/image';
  
  
  export default function ResultPhoto() {
    const router = useRouter();
    const [myFoto, setMyFoto] = useState("");
    const [fileImage, setFileImage] = useState(null);
  
    useEffect(() => {
      setMyFoto(localStorage.getItem('myPhoto'));
      urltoFile(localStorage.getItem('myPhoto'),  "myPhotos.jpeg", "image/jpeg").then(
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
  
    function reSelfie(){
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
      <Box>
        <Box>
          <Box>         
            <Box>
              <Box>
                <Box>
                  <Box>
                    {/* <img src="" width="80px" height="80px" alt="Logo" /> */}
                  </Box>
                </Box>
                <Box mt={10}>
                  <Box>
                    <Image
                    
                      alt="what"
                      src={myFoto.replace("data:image/jpeg;base64,:", "")}
                      width={80} height={80}
                     
                    />
                  </Box>
                </Box>
                <FormControl >
                  <Box>
                    <p >Check your selfies photos.</p>
                  </Box>
                </FormControl>
                <FormControl>
                  <Box >
                    <p >Make sure your photos are not blurry,</p>
                    <p >enough light and not wearing a mask.</p>
                   </Box>
                </FormControl>
                <FormControl  >
                  <Box>
                      <Button >
                          Take Re-Selfie
                      </Button>
                  </Box>
                </FormControl>
                <FormControl  >
                  <Box>
                      <Button>
                          Save Photo
                      </Button>
                  </Box>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }