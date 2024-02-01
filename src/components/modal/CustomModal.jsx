import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createDocumentoConvocatoria } from "../apis/documento_convocatoria";


const CustomModal = ({ show, handleClose, createRecord, id }) => {
  const [formData, setFormData] = useState({nombre: undefined,
    archivo: undefined

  });

  const handleInputChange = (e) => {
    console.log('id', id)
    console.log('e', e.target.value)
    setFormData(e.target.value);


    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };




  const handleCreate = () => {
    createDocumentoConvocatoria(formData)    
//    createRecord(newRecord);
    setFormData({nombre: undefined,
      archivo: undefined
  
    });
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

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Documento</Form.Label>
            <Form.Control type="file" name="archivo" value={formData.archivo}/>
          </Form.Group>
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
