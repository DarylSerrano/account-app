import React, { useState } from "react";
import UserForm, { FormValues } from "../components/UserForm";
import fetcher from "../service/fetcher";
import { ResponseOk } from "../interfaces/api";
import { useHistory } from "react-router";
import AppLayout from "../components/AppLayout";

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
      setErrMsg(JSON.stringify(err));
    }
  };

  return (
    <AppLayout title="Create user">
      <p>{errMsg}</p>
      <div>
        <UserForm onSubmit={onSubmit} />
      </div>
    </AppLayout>
  );
}
