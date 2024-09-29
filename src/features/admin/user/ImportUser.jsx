import { Button, Modal, Table } from "antd";
import { FaCloudArrowUp } from "react-icons/fa6";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
import * as xlsx from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  openModal,
  removeFile,
  setFileList,
  setTableData,
  uploadUserBulk,
} from "../../../redux/admin/user/importUserSlice";
import templateFile from "./template.xlsx?url";

const columns = [
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
];

function ImportUser() {
  const dispatch = useDispatch();
  const { isModalOpen, tableData, fileList, isLoading } = useSelector(
    (state) => state.importUser
  );

  const handleOk = () => {
    dispatch(uploadUserBulk());
  };

  const customRequest = ({ file, onSuccess, onProgress, onError }) => {
    console.log(file);
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  const onChange = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = xlsx.read(data, { type: "array" });
        const sheet = workbook.Sheets["Sheet1"];

        // convert to json
        const jsonData = xlsx.utils.sheet_to_json(sheet, {
          header: ["fullName", "email", "phone"],
          range: 1,
        });

        dispatch(setTableData(jsonData));
      };

      reader.readAsArrayBuffer(info.file.originFileObj);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }

    // Update the file list to show the uploaded file
    dispatch(setFileList(info.fileList));
  };

  return (
    <>
      <Button
        icon={<FaCloudArrowUp />}
        className="flex items-center gap-2 justify-center"
        type="primary"
        onClick={() => dispatch(openModal())}
      >
        Import
      </Button>
      <Modal
        title="Import data users"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => dispatch(closeModal())}
        centered={true}
        width={700}
        okButtonProps={{
          disabled: tableData.length < 1,
          loading: isLoading,
        }}
        okText="Import excel"
      >
        <Dragger
          name="file"
          multiple={false}
          maxCount={1}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          customRequest={customRequest}
          onChange={onChange}
          onRemove={() => dispatch(removeFile())}
          fileList={fileList}
          disabled={isLoading}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for only single file upload. Only accept .csv, .xls, .xlsx
            file. or{"  "}
            <a
              className="text-blue-500 italic"
              href={templateFile}
              download
              onClick={(e) => e.stopPropagation()}
            >
              Download template
            </a>
          </p>
        </Dragger>
        <div className="text-base mt-5 mb-2 font-semibold">Upload data</div>
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{
            pageSize: 3,
          }}
        ></Table>
      </Modal>
    </>
  );
}

export default ImportUser;
