import React from "react";
import { Form, Button, Select } from "antd";
import { User } from "../interfaces/api";

const { Option } = Select;

export type FormValues = {
  idToDelete: number;
};

type DeleteConnectionFormProps = {
  userFrom: User;
  onSubmit: (values: FormValues) => void;
};

export default function DeleteConnectionForm({
  userFrom,
  onSubmit,
}: DeleteConnectionFormProps) {
  const [form] = Form.useForm();

  const onFinish = (values: FormValues) => {
    console.log(values);
    const val = values as FormValues;
    onSubmit(val);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      {userFrom.connections ? (
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="idToDelete" label="Delect connection">
            <Select placeholder="Select user delete connection">
              {userFrom.connections.map((user, index) => (
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
      ) : (
        <p>No connections to delete</p>
      )}
    </div>
  );
}
