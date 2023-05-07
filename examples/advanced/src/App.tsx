import { useNavigate, Route, Routes, Navigate } from "react-router-dom";
import "antd/dist/reset.css";

import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Pages, defaultPage } from "./pages";

const { Content, Sider } = Layout;

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <Sider collapsed={collapsed} collapsible onCollapse={value => setCollapsed(value)}>
          <Menu
            defaultSelectedKeys={[defaultPage]}
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
              <Route element={<Navigate to={defaultPage} />} path="/" />
              {Pages.map(({ label, component }) => {
                return <Route Component={component} key={label} path={`/${label}`} />;
              })}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
