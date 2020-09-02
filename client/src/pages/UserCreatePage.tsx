import React, { useState } from "react";
import UserForm, { FormValues } from "../components/UserForm";
import fetcher from "../service/fetcher";
import { ResponseOk } from "../interfaces/api";
import { useHistory } from "react-router";
import AppLayout from "../components/AppLayout";
import { notification, Descriptions, Button } from "antd";

export default function UserCreatePage() {
  const [errMsg, setErrMsg] = useState("");
  const history = useHistory();

  const onSubmit = async (values: FormValues) => {
    try {
      await fetcher.makeFetch<ResponseOk<{}>>(`${fetcher.BASE_URL}/users/`, {
        method: "POST",
        body: JSON.stringify(values),
      });

      console.log(values);

      history.push("/");
    } catch (err) {
      notification.error({ message: err.message });
      setErrMsg(err.message);
    }
  };

  return (
    <AppLayout title="Create user">
      <Descriptions
        layout="horizontal"
        extra={
          <div>
            <Button onClick={() => history.goBack()}>Go back</Button>
          </div>
        }
      >
        <Descriptions.Item>
          <p>{errMsg}</p>
          <div>
            <UserForm onSubmit={onSubmit} />
          </div>
        </Descriptions.Item>
      </Descriptions>
    </AppLayout>
  );
}
