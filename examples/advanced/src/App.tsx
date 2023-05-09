import { useNavigate, Route, Routes } from "react-router-dom";
import "antd/dist/reset.css";

import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Pages } from "./pages";
import { Client } from "./components";
import Setting from "./pages/Setting";

const { Content, Sider } = Layout;

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <Sider collapsed={collapsed} collapsible onCollapse={value => setCollapsed(value)}>
          <Menu
            items={Pages.map(page => ({
              key: `/${page.label}`,
              label: page.label,
            }))}
            mode="inline"
            onClick={e => {
              navigate(e.key);
            }}
            theme="dark"
          />
        </Sider>
        <Layout>
          <Content>
            <Routes>
              <Route Component={() => <Setting />} path="/" />
              {Pages.map(({ label, component }) => {
                const RouteComponent = component;
                return (
                  <Route
                    Component={() => (
                      <Client>
                        <RouteComponent />
                      </Client>
                    )}
                    key={label}
                    path={`/${label}`}
                  />
                );
              })}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
