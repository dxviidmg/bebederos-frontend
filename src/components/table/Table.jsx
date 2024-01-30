import React, { useState } from "react";
import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";

const Table = ({ columns, data }) => {
  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <Container>
      <input
        type="text"
        placeholder="Filter by name or age..."
        value={filterText}
        onChange={handleFilterChange}
      />
      <DataTable columns={columns} data={filteredData} pagination />
    </Container>
  );
};

export default Table;
