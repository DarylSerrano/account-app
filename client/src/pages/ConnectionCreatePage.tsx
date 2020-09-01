import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { ResponseOk, User } from "../interfaces/api";
import fetcher from "../service/fetcher";
import AppLayout from "../components/AppLayout";
import ConnectionForm, { FormValues } from "../components/ConnectionForm";
import { notification } from "antd";

type ConnectionCreatePageParams = {
  id: string;
};

export default function ConnectionCreatePage() {
  const { id } = useParams<ConnectionCreatePageParams>();
  const history = useHistory();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchUser = async () => {
    try {
      const response = await fetcher.makeFetch<ResponseOk<User>>(
        `${fetcher.BASE_URL}/users/${id}`
      );
      setUser(response.data);
    } catch (err) {
      notification.error({message: err.message})
      setErrorMsg(err.message);
    }
  };

  const createConnection = async (values: FormValues) => {
    try {
      await fetcher.makeFetch<ResponseOk<{}>>(
        `${fetcher.BASE_URL}/users/${id}/connections`,
        { method: "POST", body: JSON.stringify({ id: values.idTo }) }
      );

      history.push(`/users/${id}`);
    } catch (err) {
      notification.error({message: err.message})
      setErrorMsg(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppLayout title="Create connection for user">
      <p>{errorMsg}</p>
      <div>
        <p>
          Connect user: {user?.id} {user?.name}
        </p>
        <ConnectionForm idFrom={Number(id)} onSubmit={createConnection} />
      </div>
    </AppLayout>
  );
}
