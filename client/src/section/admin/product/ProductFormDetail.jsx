import PropTypes from 'prop-types';
//@mui
import { Box, Stack, TextField, Typography } from '@mui/material';
//Ckeditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import editorConfig from '../../../config/editorConfig';

//-----------------------------------------------------------

const ProductFormDetail = ({ productData, setProductData }) => {
  return (
    <>
      <Stack sx={{ gap: '24px', padding: '24px' }}>
        <TextField
          required
          name="name"
          label="Product Name"
          fullWidth
          value={productData?.name || ''}
          onChange={(e) => {
            setProductData({ ...productData, name: e.target.value });
          }}
        />
        <TextField
          required
          name="subDescription"
          label="Sub Description"
          fullWidth
          multiline
          rows={4}
          value={productData?.subDescription || ''}
          onChange={(e) => {
            setProductData({ ...productData, subDescription: e.target.value });
          }}
        />
      </Stack>
      <Stack sx={{ gap: '12px', p: '1rem' }}>
        <Typography variant="subtitle2">Content</Typography>
        <Box
          sx={{
            overflow: 'hidden',
            position: 'relative',
            borderRadius: '8px',
            border: '1px solid rgba(145, 158, 171, 0.2)',
          }}
        >
          <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            onReady={(editor) => {
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setProductData({ ...productData, description: data });
            }}
          />
        </Box>
      </Stack>
    </>
  );
};

ProductFormDetail.propTypes = {
  productData: PropTypes.object.isRequired,
  setProductData: PropTypes.func.isRequired,
};

export default ProductFormDetail;
