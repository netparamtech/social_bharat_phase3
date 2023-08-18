import React from 'react';
import DataTable from 'react-data-table-component';

class DataTableComponent extends React.Component {
  render() {
    const data = [
      { id: 1, name: 'John Doe', age: 28, city: 'New York' },
      { id: 2, name: 'Jane Smith', age: 32, city: 'Los Angeles' },
      // Add more data rows here...
    ];

    const columns = [
      { name: 'ID', selector: 'id', sortable: true },
      { name: 'Name', selector: 'name', sortable: true },
      { name: 'Age', selector: 'age', sortable: true },
      { name: 'City', selector: 'city', sortable: true },
    ];

    return (
      <div>
        <DataTable
          title="User Data"
          columns={columns}
          data={data}
          pagination
        />
      </div>
    );
  }
}

export default DataTableComponent;
