import DataTable from 'react-data-table-component';

export default function Table(props) {
  return (
    <DataTable
      pagination
      highlightOnHover
      responsive
      striped
      theme="light"
      {...props}
    />
  );
};