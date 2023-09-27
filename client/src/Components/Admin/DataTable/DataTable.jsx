import { useState } from 'react';
import PropTypes from 'prop-types';
//@mui
import { DataGrid } from '@mui/x-data-grid';
//------------------------------------------------------------

const DataTable = ({ columns, rows }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection.rows);
  };

  return (
    <DataGrid
      rows={rows.map((row) => ({ ...row, id: row.id }))}
      columns={columns}
      onSelectionModelChange={handleSelectionChange}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 30 },
        },
      }}
      pageSizeOptions={[10, 20, 30]}
      checkboxSelection
      scrollbarSize={100000}
      density='comfortable'
      cellStyle={(params) =>
        params.field === 'status' ? { color: 'red', fontWeight: 'bold' } : {}
      }
    />
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
};

export default DataTable;
