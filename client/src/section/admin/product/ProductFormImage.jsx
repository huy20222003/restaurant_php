import { useState } from 'react';
import PropTypes from 'prop-types';
//@mui
import { Box, Stack, Typography } from '@mui/material';
//dropzone
import { useDropzone } from 'react-dropzone';
//--------------------------------------------------

const ProductFormImageItem = ({ imageUrl }) => {
  return (
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
      <Stack
        component={'span'}
        sx={{
          flexShrink: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component={'img'}
          src={imageUrl}
          sx={{
            width: '100%',
            height: '100%',
            flexShrink: 0,
            objectFit: 'cover',
            position: 'absolute',
          }}
        ></Box>
      </Stack>
    </Stack>
  );
};

const ProductFormImage = ({ formik }) => {
  const { values, setFieldValue } = formik;
  const [imageUrls, setImageUrls] = useState([]);

  const createImageUrls = (files) => {
    const promises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = () => {
          const base64Data = reader.result;
          resolve(base64Data);
        };

        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then((base64Images) => {
        setFieldValue('image_url', [...values.image_url, ...base64Images]);
      })
      .catch((error) => {
        console.error('Error converting images to base64:', error);
      });

    const validFiles = files.filter((file) => file.type.startsWith('image/'));
    const urls = validFiles.map((file) => URL.createObjectURL(file));
    setImageUrls((prevImageUrls) => [...prevImageUrls, ...urls]);
  };

  const onDrop = (acceptedFiles) => {
    createImageUrls(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
  });

  return (
    <>
      <Stack sx={{ gap: '12px', p: '1rem' }}>
        <Typography variant="subtitle2">Images</Typography>
        <Box sx={{ width: '100%', position: 'relative' }}>
          <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
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
          </div>
          {imageUrls.length > 0 ? (
            <Box
              sx={{
                my: '1.5rem',
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                flex: 1,
              }}
            >
              {imageUrls.map((imageUrl) => (
                <ProductFormImageItem key={imageUrl} imageUrl={imageUrl} />
              ))}
            </Box>
          ) : (
            ''
          )}
        </Box>
      </Stack>
    </>
  );
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '8px',
  padding: '40px',
  outline: 'none',
  cursor: 'pointer',
  backgroundColor: 'rgba(145, 158, 171, 0.08)',
  transition:
    'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, padding 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
};

ProductFormImage.propTypes = {
  formik: PropTypes.object,
};

ProductFormImageItem.propTypes = {
  imageUrl: PropTypes.string,
};

export default ProductFormImage;
