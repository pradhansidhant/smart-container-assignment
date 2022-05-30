import DataTable from 'react-data-table-component';

const Table = ({columns, data, pagination})=> {
    return (
        <DataTable
            columns={columns}
            data={data}
            pagination={pagination}
        />
    );
};

Table.defaultProps = {
    data: [],
    columns: [],
    pagination: true
}
export default Table