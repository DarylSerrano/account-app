import React, { useEffect, useState } from "react";
import { List } from "antd";
import { User, ResponseOk } from "../interfaces/api";
import fetcher from "../service/fetcher";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import AppLayout from "../components/AppLayout";

export default function RootPage() {
  const history = useHistory();
  const [users, setusers] = useState<User[]>([]);

  const fetchUsers = async () => {
    let response = await fetcher.makeFetch<ResponseOk<User[]>>(
      `${fetcher.BASE_URL}/users/`
    );
    console.log("Fetch users");
    setusers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AppLayout title="Users connection">
      <List
        itemLayout="horizontal"
        bordered
        style={{ textAlign: "center" }}
        dataSource={users}
        renderItem={(user) => (
          <List.Item onClick={() => history.push(`/users/${user.id}`)}>
            <List.Item.Meta
              title={<Link to={`/users/${user.id}`}>{user.name}</Link>}
            ></List.Item.Meta>
          </List.Item>
        )}
      />
    </AppLayout>
  );
}
