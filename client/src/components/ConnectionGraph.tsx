import React from "react";
import { GraphView } from "react-digraph";

export type Node = {
  id: number;
  title: string;
  type: "empty";
  x?: number;
  y?: number;
};

export type Edge = {
  source: number;
  target: number;
  type: "emptyEdge";
};

export type GraphData = {
  Nodes: Node[];
  Edges: Edge[];
};

type ConnectionGraphProps = {
  data: GraphData;
};

const GraphConfig = {
  NodeTypes: {
    empty: {
      // required to show empty nodes
      typeText: "User",
      shapeId: "#empty", // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 100 100" id="empty" key="0">
          <circle cx="50" cy="50" r="45"></circle>
        </symbol>
      ),
    },
  },
  NodeSubtypes: {},
  EdgeTypes: {
    emptyEdge: {
      // required to show empty edges
      shapeId: "#emptyEdge",
      shape: <symbol viewBox="0 0 50 50" id="emptyEdge" key="0"></symbol>,
    },
  },
};

const NODE_KEY = "id";

export default function ConnectionGraph({ data }: ConnectionGraphProps) {
  const NodeTypes = GraphConfig.NodeTypes;
  const NodeSubtypes = GraphConfig.NodeSubtypes;
  const EdgeTypes = GraphConfig.EdgeTypes;

  return (
    <GraphView
      nodeKey={NODE_KEY}
      nodes={data.Nodes}
      edges={data.Edges}
      nodeTypes={NodeTypes}
      nodeSubtypes={NodeSubtypes}
      edgeTypes={EdgeTypes}
    />
  );
}
