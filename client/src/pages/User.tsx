import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { Descriptions, Button, Divider } from "antd";
import { User, ResponseOk } from "../interfaces/api";
import fetcher from "../service/fetcher";
import AppLayout from "../components/AppLayout";
import ConnectionGraph, {
  GraphData,
  Node,
  Edge,
} from "../components/ConnectionGraph";
import "./user.css";
import { notification } from "antd";

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
      notification.error({message: err.message})
      setErrorMsg(err.message);
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
      notification.error({message: err.message})
      setErrorMsg(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const convertGraphData = (user: User): GraphData => {
    const radius = 200;
    const centerX = 0;
    const centerY = 0;

    const fromNode: Node = {
      id: user.id,
      title: user.name,
      type: "empty",
      x: centerX,
      y: centerY,
    };

    const edges: Edge[] = [];
    const nodes: Node[] = [];
    const connectedUsersLength = user.connections ? user.connections.length : 0;
    user.connections?.forEach((toUser, index) => {
      nodes.push({
        id: toUser.id,
        title: toUser.name,
        type: "empty",
        x:
          centerX +
          radius * Math.cos((2 * Math.PI * index) / connectedUsersLength),
        y:
          centerY +
          radius * Math.sin((2 * Math.PI * index) / connectedUsersLength),
      });
      edges.push({ source: toUser.id, target: fromNode.id, type: "emptyEdge" });
    });

    return { Edges: edges, Nodes: nodes.concat(fromNode) };
  };

  return (
    <AppLayout title="User information">
      <p>{errorMsg}</p>
      {user ? (
        <>
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
          </Descriptions>
          <Divider />
          <Descriptions bordered layout="vertical">
            <Descriptions.Item label="Connections">
              <div
                className={user.connections ? "digraphfull" : "digraphempty"}
              >
                {user.connections ? (
                  <ConnectionGraph
                    data={convertGraphData(user)}
                  ></ConnectionGraph>
                ) : (
                  <p>No connections</p>
                )}
              </div>
            </Descriptions.Item>
          </Descriptions>
        </>
      ) : null}
    </AppLayout>
  );
}
