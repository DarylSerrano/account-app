import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { Descriptions, Button } from "antd";
import { User, ResponseOk } from "../interfaces/api";
import fetcher from "../service/fetcher";
import AppLayout from "../components/AppLayout";
import ConnectionGraph, {
  GraphData,
  Node,
  Edge,
} from "../components/ConnectionGraph";

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

  const onDelete = async () => {
    try {
      await fetcher.makeFetch<ResponseOk<{}>>(
        `${fetcher.BASE_URL}/users/${id}`,
        { method: "DELETE" }
      );
      history.push("/");
    } catch (err) {
      setErrorMsg(JSON.stringify(err));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const convertGraphData = (user: User): GraphData => {
    const fromNode: Node = {
      id: user.id,
      title: user.name,
      type: "empty",
    };

    const edges: Edge[] = [];
    const nodes: Node[] = [];
    user.connections?.forEach((toUser) => {
      nodes.push({ id: toUser.id, title: toUser.name, type: "empty" });
      edges.push({ source: toUser.id, target: fromNode.id, type: "emptyEdge" });
    });

    return { Edges: edges, Nodes: nodes.concat(fromNode) };
  };

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
                  Edit User
                </Button>
                <Button onClick={onDelete}>Delete User</Button>
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
              {user.connections ? (
                <ConnectionGraph
                  data={convertGraphData(user)}
                ></ConnectionGraph>
              ) : (
                <p>No connections</p>
              )}
            </Descriptions.Item>
          </Descriptions>
        ) : null}
      </div>
    </AppLayout>
  );
}
