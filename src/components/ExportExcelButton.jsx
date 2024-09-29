import { Button } from "antd";
import { TiExport } from "react-icons/ti";
import { useSelector } from "react-redux";
import * as xlsx from "xlsx";

function ExportExcelButton({ data, fileName }) {
  const exportFile = (data) => {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    xlsx.writeFile(workbook, fileName);
  };

  return (
    <Button
      icon={<TiExport />}
      className="flex items-center gap-2 justify-center"
      type="primary"
      onClick={() => exportFile(data)}
    >
      Export
    </Button>
  );
}

export default ExportExcelButton;
