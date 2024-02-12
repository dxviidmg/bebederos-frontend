import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createDocumentoConvocatoria } from "../apis/documento_convocatoria";

const CustomModal = ({ show, handleClose, updateDocumentos, id }) => {
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
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0], // Use the first file for simplicity
    }));
  };

  const handleCreate = async () => {
    let aux = formData;
    aux['entidad_convocatoria'] = id;
    setFormData(aux);
  
    try {
      let documento = await createDocumentoConvocatoria(formData);  
      // Aquí puedes continuar con el resto del código que depende de documento
  
      updateDocumentos(documento);
      setFormData({ nombre: "", archivo: "" });
      handleClose();
    } catch (error) {
      // Manejar errores si la operación asíncrona falla
      console.error('Error al crear el documento:', error);
    }
  };
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Documento</Modal.Title>
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
