import { Col, Divider, Row } from "antd";
import { FaFilter } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import FilterForm from "./FilterForm";

function FilterBar() {
  return (
    <Row className="bg-gray-100 rounded-md shadow-lg">
      <Col span={24} className="px-4 pt-4 flex items-center justify-between">
        <p className="flex items-center gap-2">
          <FaFilter className="text-indigo-900" />
          <span className="tracking-wide text-[16px] font-semibold">
            Filters
          </span>
        </p>
        <IoReload className="text-lg cursor-pointer" />
      </Col>
      <Divider />
      <Col span={24}>
        <FilterForm />
      </Col>
    </Row>
  );
}

export default FilterBar;
