import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({ columns, rows }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows.map((row) => ({ ...row, id: row.id }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
        sx={{fontSize: '1rem'}}
      />
    </div>
  );
};

export default DataTable;
