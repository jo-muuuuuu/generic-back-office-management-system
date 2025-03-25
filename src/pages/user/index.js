import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Table,
  Popconfirm,
  Modal,
  InputNumber,
  Select,
  DatePicker,
} from "antd";
import dayjs from "dayjs";

import "./user.css";
import { getUser, createUser, updateUser, deleteUser } from "../../api/index";

const User = () => {
  const [searchParams, setSearchParams] = useState({ name: "" });
  const [userData, setUserData] = useState([]);

  const [modalType, setModalType] = useState("newUser");
  const [modalOpen, setModalOpen] = useState(false);

  const [form] = Form.useForm();

  const handleClick = (type, rowData) => {
    if (type === "newUser") {
      setModalType("newUser");
    } else {
      setModalType("editUser");

      const cloneData = { ...rowData };
      cloneData.birth = dayjs(cloneData.birth);

      // console.log("Edit Row Data:", cloneData);
      form.setFieldsValue(cloneData);

      // form.validateFields().then(() => {
      //   console.log("fill", form.getFieldsValue());
      // });
    }

    setModalOpen(true);
  };

  const handleDelete = (rowData) => {
    deleteUser({ id: rowData.id }).then(() => {
      getTableData();
    });
  };

  const handleFinish = (event) => {
    console.log(event);
    setSearchParams({ name: event.keyword });
  };

  useEffect(() => {
    getTableData();
  }, [searchParams]);

  const handleOk = async () => {
    try {
      const formValues = await form.validateFields();
      formValues.birth = dayjs(formValues.birth).format("YYYY-MM-DD");

      console.log("Submitting form data:", formValues);

      if (modalType === "newUser") {
        createUser(formValues).then(() => {
          getTableData();
        });
      } else {
        updateUser(formValues).then(() => {
          getTableData();
        });
      }

      handleCancel();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    form.resetFields();
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Age", dataIndex: "age" },
    {
      title: "Gender",
      dataIndex: "sex",
      render: (value) => {
        return value === "F" ? "F" : "M";
      },
    },
    { title: "Birthday", dataIndex: "birth" },
    { title: "Address", dataIndex: "addr" },
    {
      title: "Operations",
      render: (rowData) => {
        return (
          <div className="operation-buttons">
            <Button
              style={{ marginRight: "5px" }}
              onClick={() => {
                handleClick("edit", rowData);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Confirm"
              description="Are you sure to delete this user?"
              onConfirm={() => {
                handleDelete(rowData);
              }}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const getTableData = () => {
    getUser(searchParams).then((res) => {
      // console.log(res);

      setUserData(res.data.list);
    });
  };

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <div className="user-container">
      <div className="button-container">
        <Button
          type="primary"
          onClick={() => {
            handleClick("newUser");
          }}
        >
          New User
        </Button>

        <Form layout="inline" onFinish={handleFinish}>
          <Form.Item name="keyword">
            <Input placeholder="Please enter user name" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Search
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Table columns={columns} dataSource={userData} rowKey={"id"} />

      <Modal
        title={modalType === "newUser" ? "New User" : "Edit User"}
        open={modalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign="left"
        >
          {modalType === "editUser" && (
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
          )}

          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter name",
              },
            ]}
          >
            <Input placeholder="Please enter name" />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[
              {
                required: true,
                message: "Please enter age",
              },
              {
                type: "number",
                message: "Please enter a number",
              },
            ]}
          >
            <InputNumber placeholder="Please enter age" />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="sex"
            rules={[
              {
                required: true,
                message: "Please set gender",
              },
            ]}
          >
            <Select
              placeholder="Please set gender"
              options={[
                { value: "M", label: "Male" },
                { value: "F", label: "Female" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Birthday"
            name="birth"
            rules={[
              {
                required: true,
                message: "Please enter birthday",
              },
            ]}
          >
            <DatePicker placeholder="Please select birthday" format="YYYY/MM/DD" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="addr"
            rules={[
              {
                required: true,
                message: "Please enter address",
              },
            ]}
          >
            <Input placeholder="Please enter address" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;
