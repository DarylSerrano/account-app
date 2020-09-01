import React from "react";
import { Form, Input, Button } from "antd";

export type FormValues = {
  name: string;
};

type UserFormProps = {
  onSubmit: (values: FormValues) => void;
};

export default function UserForm({ onSubmit }: UserFormProps) {
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
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
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
