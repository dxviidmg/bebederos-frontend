import { Container, Row, Col, Image } from "react-bootstrap";
import './list.css'

const List = ({ data }) => {
  return (
      <Container id="list">
        <Row>
          {data.map((item, index) => (
            <Col key={index}>
              {" "}
              <Image src={item.image} rounded />
              <h1>{item.texto}</h1>
              <h2>{item.nombre}</h2>
            </Col>
          ))}
        </Row>
      </Container>
  );
};

export default List;
