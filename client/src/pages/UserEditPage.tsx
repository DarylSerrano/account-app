import React, { useState, useEffect } from "react";
import UserForm, { FormValues } from "../components/UserForm";
import fetcher from "../service/fetcher";
import { ResponseOk, User } from "../interfaces/api";
import { useHistory, useParams } from "react-router";
import AppLayout from "../components/AppLayout";

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
      setErrMsg(JSON.stringify(err));
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetcher.makeFetch<ResponseOk<User>>(
        `${fetcher.BASE_URL}/users/${id}`
      );
      setUser(response.data);
    } catch (err) {
      setErrMsg(JSON.stringify(err));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppLayout title="Create user">
      <p>{errMsg}</p>
      <div>
        {errMsg === "" && user ? (
          <UserForm onSubmit={onSubmit} value={{ name: user.name }} />
        ) : null}
      </div>
    </AppLayout>
  );
}
