import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './list.css'

const List = ({ data, type }) => {
  return (
      <Container id="list">
        <Row>
          {data.map((item, index) => (
            <Col key={index}>
              <Link to={`/${type}/${item.slug}`}>              <Image src={item.image} rounded />
              <h1>{item.texto}</h1>
              <h2>{item.nombre}</h2></Link>
            </Col>
          ))}
        </Row>
      </Container>
  );
};

export default List;
