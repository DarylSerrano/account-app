import React, { useState, useEffect } from "react";
import { Form, Button, Select } from "antd";
import { User, ResponseOk } from "../interfaces/api";
import fetcher from "../service/fetcher";

const { Option } = Select;

export type FormValues = {
  idTo: number;
};

type ConnectionFormProps = {
  idFrom: number;
  onSubmit: (values: FormValues) => void;
};

export default function ConnectionForm({
  idFrom,
  onSubmit,
}: ConnectionFormProps) {
  const [form] = Form.useForm();

  const [users, setUsers] = useState<User[]>([]);

  const getAllUsers = async () => {
    let response = await fetcher.makeFetch<ResponseOk<User[]>>(
      `${fetcher.BASE_URL}/users/`
    );
    console.log("Fetch users");
    setUsers(response.data);
  };

  const onFinish = (values: FormValues) => {
    console.log(values);
    const val = values as FormValues;
    onSubmit(val);
  };

  const onReset = () => {
    form.resetFields();
  };

  const filterNotConnected = (user: User) => {
    if (user.connections) {
      return (
        user.id !== idFrom &&
        user.connections?.every((user) => user.id !== idFrom)
      );
    } else {
      return user.id !== idFrom;
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="idTo" label="Connect to User">
          <Select placeholder="Select usert to connect">
            {users.filter(filterNotConnected).map((user, index) => (
              <Option key={`${user.id}${index}`} value={user.id}>
                {user.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
