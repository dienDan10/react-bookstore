import { Col, Row } from "antd";
import FilterBar from "./FilterBar";
import Products from "./Products";

function HomeLayout() {
  return (
    <Row>
      <Col span={4} className="px-3 pt-5">
        <FilterBar />
      </Col>
      <Col span={20} className="px-3 pt-5">
        <Products />
      </Col>
    </Row>
  );
}

export default HomeLayout;
