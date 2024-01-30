import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./list.css";

const List = ({ data, type, title }) => {
  return (
    <Container id="list">
      <Row className="justify-content-center">
        <h1>{title}</h1>
        {data.map((item, index) => (
          <Col md={3} key={index}>
            <Link to={`/${type}/${item.slug}`}>
              {" "}
              <Image src={item.image} className="img-fluid" rounded />
              <h2>{item.texto}</h2>
              <h3>{item.nombre}</h3>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default List;
