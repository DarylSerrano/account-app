import React, { useEffect, useState } from "react";
import { List } from "antd";
import { User, ResponseOk } from "../interfaces/api";
import fetcher from "../service/fetcher";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";

export default function RootPage() {
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
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              title={user.name}
              description={<Link to={`/users/${user.id}`}>{user.name}</Link>}
            ></List.Item.Meta>
          </List.Item>
        )}
      />
    </AppLayout>
  );
}