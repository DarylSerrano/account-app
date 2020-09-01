import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { User, ResponseOk } from "../interfaces/api";
import fetcher from "../service/fetcher";
import AppLayout from "../components/AppLayout";

type UserPageParams = { id: string };

export default function UserPage() {
  const { id } = useParams<UserPageParams>();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchUser = async () => {
    try {
      const response = await fetcher.makeFetch<ResponseOk<User>>(
        `${fetcher.BASE_URL}/users/${id}`
      );
      setUser(response.data);
    } catch (err) {
      setErrorMsg(JSON.stringify(err));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppLayout title="User information">
      <p>{errorMsg}</p>
      <div>
        {user ? (
          <div>
            <p>Name: {user.name}</p>
            <p>Id: {user.id}</p>
            <p>Connections: {JSON.stringify(user.connections)}</p>
          </div>
        ) : null}
      </div>
    </AppLayout>
  );
}
