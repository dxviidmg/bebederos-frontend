import React, { useState } from "react";
import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";

const CustomTable = ({ columns, data, title }) => {
  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: localStorage.getItem('color')
      },
    },
  };
  return (
    <Container style={{marginTop: '20px'}}>
      <h2>{title}</h2>

      <Form.Control
        type="text"
        value={filterText}
        onChange={handleFilterChange}
        placeholder="Buscar..."
      />
      <br/>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination={data.length > 10 ? true : false}
        customStyles={customStyles}
      />
    </Container>
  );
};

export default CustomTable;
