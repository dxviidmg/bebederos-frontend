import React, { useState } from "react";
import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";

const CustomTable = ({ columns, data}) => {
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
        <h3>Escuelas</h3>
      <Form.Control
        type="text"
        value={filterText}
        onChange={handleFilterChange}
        placeholder="Buscar..."
      />

      <DataTable columns={columns} data={filteredData} pagination />
    </Container>
  );
};

export default CustomTable;
