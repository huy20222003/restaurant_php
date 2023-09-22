import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
//@mui
import { Box, Stack, Typography } from '@mui/material';

const ProductFormImage = ({ setProductData }) => {
  const [previewImg, setPreviewImg] = useState([]);
  const fileInputRef = useRef(null);

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };
  console.log(previewImg);

  const handleChangeFile = (e) => {
    const files = e.target.files;
    const imageFiles = Array.from(files);
  
    const promises = imageFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          const base64Data = e.target.result;
          resolve(base64Data);
        };
  
        reader.readAsDataURL(file);
      });
    });
  
    Promise.all(promises)
      .then((base64Images) => {
        setPreviewImg((prevImages) => [...prevImages, ...base64Images]);
        setProductData((prevData) => ({
          ...prevData,
          image_url: [...prevData.image_url, ...base64Images],
        }));
      })
      .catch((error) => {
        console.error('Error converting images to base64:', error);
      });
  };
  

  return (
    <>
      <Stack sx={{ gap: '12px', p: '1rem' }}>
        <Typography variant="subtitle2">Images</Typography>
        <Box
          sx={{ width: '100%', position: 'relative' }}
          onClick={handleChooseFile}
        >
          <Box
            sx={{
              padding: '40px',
              outline: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: 'rgba(145, 158, 171, 0.08)',
              border: '1px dashed rgba(145, 158, 171, 0.2)',
              transition:
                'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, padding 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            }}
          >
            <input
              accept="image/*"
              multiple
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleChangeFile}
            />
            <Stack
              sx={{
                flexFlow: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component={'img'}
                sx={{ width: '100%', height: '100%', maxWidth: '200px' }}
                src="/assets/images/chooseFile.svg"
              ></Box>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography variant="h6">Drop or Select file</Typography>
                <Typography variant="body2">
                  Drop files here or click browse through your machine
                </Typography>
              </Stack>
            </Stack>
          </Box>
          {previewImg.length > 0 ? (
            <Box sx={{ my: '24px' }}>
              <Stack
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '4px',
                  width: '80px',
                  height: '80px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid rgba(145, 158, 171, 0.16)',
                }}
              >
                {previewImg.map((image, index) => (
                  <Stack
                    key={index}
                    component={'span'}
                    sx={{
                      flexShrink: 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      component={'img'}
                      src={image}
                      sx={{
                        width: '100%',
                        height: '100%',
                        flexShrink: 0,
                        objectFit: 'cover',
                        position: 'absolute',
                      }}
                    ></Box>
                  </Stack>
                ))}
              </Stack>
            </Box>
          ) : (
            ''
          )}
        </Box>
      </Stack>
    </>
  );
};

ProductFormImage.propTypes = {
  productData: PropTypes.object.isRequired,
  setProductData: PropTypes.func.isRequired,
};

export default ProductFormImage;
