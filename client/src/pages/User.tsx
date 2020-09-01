import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { Descriptions, Button } from "antd";
import { User, ResponseOk } from "../interfaces/api";
import fetcher from "../service/fetcher";
import AppLayout from "../components/AppLayout";

type UserPageParams = { id: string };

export default function UserPage() {
  const history = useHistory();
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
          <Descriptions
            bordered
            layout="vertical"
            extra={
              <div>
                <Button onClick={() => history.push(`/users/${id}/edit`)}>
                  Edit
                </Button>
                <Button
                  onClick={() =>
                    history.push(`/users/${id}/connections/create`)
                  }
                >
                  Add connections
                </Button>
                <Button
                  onClick={() =>
                    history.push(`/users/${id}/connections/delete`)
                  }
                >
                  Delete connections
                </Button>
              </div>
            }
          >
            <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
            <Descriptions.Item label="Connections">
              {JSON.stringify(user.connections)}
            </Descriptions.Item>
          </Descriptions>
        ) : null}
      </div>
    </AppLayout>
  );
}
