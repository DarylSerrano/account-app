import React, { useState, useEffect } from "react";
import UserForm, { FormValues } from "../components/UserForm";
import fetcher from "../service/fetcher";
import { ResponseOk, User } from "../interfaces/api";
import { useHistory, useParams } from "react-router";
import AppLayout from "../components/AppLayout";
import { notification } from "antd";

type UserEditPageParams = { id: string };

export default function UserEditPage() {
  const [errMsg, setErrMsg] = useState("");
  const [user, setUser] = useState<User | undefined>(undefined);
  const { id } = useParams<UserEditPageParams>();
  const history = useHistory();

  const onSubmit = async (values: FormValues) => {
    try {
      await fetcher.makeFetch<ResponseOk<{}>>(
        `${fetcher.BASE_URL}/users/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(values),
        }
      );

      console.log(values);

      history.push(`/users/${id}`);
    } catch (err) {
      notification.error({message: err.message})
      setErrMsg(err.message);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetcher.makeFetch<ResponseOk<User>>(
        `${fetcher.BASE_URL}/users/${id}`
      );
      setUser(response.data);
    } catch (err) {
      notification.error({message: err.message})
      setErrMsg(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppLayout title="Edit user">
      <p>{errMsg}</p>
      <div>
        {errMsg === "" && user ? (
          <UserForm onSubmit={onSubmit} value={{ name: user.name }} />
        ) : null}
      </div>
    </AppLayout>
  );
}
