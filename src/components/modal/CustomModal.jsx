import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createDocumentoConvocatoria } from "../apis/documento_convocatoria";

const CustomModal = ({ show, handleClose, createRecord, id }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    archivo: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    console.log('entre hfc')
    const { name, files } = e.target;
    console.log('f', files)
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0], // Use the first file for simplicity
    }));
  };

  const handleCreate = () => {
    let aux = formData
    aux['entidad_convocatoria'] = id
    setFormData(aux);
    createDocumentoConvocatoria(formData);
    setFormData({ nombre: "", archivo: "" });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nuevo Registro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formNewRecord">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            name="nombre"
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Documento</Form.Label>
          <Form.Control
            type="file"
            name="archivo"
            onChange={handleFileChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCreate}>
          Crear
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
