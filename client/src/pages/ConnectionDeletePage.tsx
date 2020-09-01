import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { ResponseOk, User } from "../interfaces/api";
import fetcher from "../service/fetcher";
import AppLayout from "../components/AppLayout";
import DeleteConnectionForm, {
  FormValues,
} from "../components/DeleteConnectionForm";
import { notification } from "antd";

type ConnectionEditPageParams = {
  id: string;
};

export default function ConnectionDeletePage() {
  const { id } = useParams<ConnectionEditPageParams>();
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

  const deleteConnection = async (values: FormValues) => {
    try {
      console.log(`delete: ${JSON.stringify({ id: values.idToDelete })}`);

      await fetcher.makeFetch<ResponseOk<{}>>(
        `${fetcher.BASE_URL}/users/${id}/connections`,
        { method: "DELETE", body: JSON.stringify({ id: values.idToDelete }) }
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
          Delete connections from user: {user?.id} {user?.name}
        </p>
        {user ? (
          <DeleteConnectionForm userFrom={user} onSubmit={deleteConnection} />
        ) : null}
      </div>
    </AppLayout>
  );
}
