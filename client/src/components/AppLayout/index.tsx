import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

import "./appLayout.css";

const { Header, Content, Footer } = Layout;

type AppLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/users/new">Create user</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px", margin: "16px 0" }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Daryl Serrano Hipolito ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}
