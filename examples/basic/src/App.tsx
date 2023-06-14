import "antd/dist/reset.css";

import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { Client } from "./components";
import { Advanced } from "./pages/advanced";
import { Basic } from "./pages/basic";
import { Components } from "./pages/component";
import { Hooks } from "./pages/hook";
import Setting from "./pages/setting";

const { Content, Sider } = Layout;

interface items {
  label: string;
  key: string;
  children?: items[];
}

const rootItemKeys = ["Basic", "Hooks", "Components", "Advanced", "Setting"];
const items: items[] = [
  {
    label: rootItemKeys[0],
    key: rootItemKeys[0],
    children: Basic.map(page => ({
      key: `/${rootItemKeys[0]}/${page.label}`,
      label: page.label,
    })),
  },
  {
    label: rootItemKeys[1],
    key: rootItemKeys[1],
    children: Hooks.map(page => ({
      key: `/${rootItemKeys[1]}/${page.label}`,
      label: page.label,
    })),
  },
  {
    label: rootItemKeys[2],
    key: rootItemKeys[2],
    children: Components.map(page => ({
      key: `/${rootItemKeys[2]}/${page.label}`,
      label: page.label,
    })),
  },
  {
    label: rootItemKeys[3],
    key: rootItemKeys[3],
    children: Advanced.map(page => ({
      key: `/${rootItemKeys[3]}/${page.label}`,
      label: page.label,
    })),
  },
  // {
  //   label: rootItemKeys[3],
  //   key: `/${rootItemKeys[3].toLowerCase()}`,
  // },
];

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(
    [window.location.hash.slice(1).split("/")[1]] ?? [rootItemKeys[0]],
  );

  const onOpenChange: MenuProps["onOpenChange"] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootItemKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <Sider
          collapsed={collapsed}
          collapsible
          onCollapse={value => setCollapsed(value)}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <Menu
            items={items}
            mode="inline"
            onClick={e => {
              navigate(e.key);
            }}
            onOpenChange={onOpenChange}
            openKeys={openKeys}
            selectedKeys={[window.location.hash.slice(1)]}
            theme="dark"
          />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
          <Content>
            <Routes>
              <Route Component={() => <Setting />} path="/*" />
              <Route Component={() => <Setting />} path="/setting" />
              {Basic.map(({ label, component }) => {
                const RouteComponent = component;
                return (
                  <Route
                    Component={() => (
                      <Client>
                        <RouteComponent />
                      </Client>
                    )}
                    key={label}
                    path={`/${rootItemKeys[0]}/${label}`}
                  />
                );
              })}
              {Hooks.map(({ label, component }) => {
                const RouteComponent = component;
                return (
                  <Route
                    Component={() => (
                      <Client>
                        <RouteComponent />
                      </Client>
                    )}
                    key={label}
                    path={`/${rootItemKeys[1]}/${label}`}
                  />
                );
              })}
              {Components.map(({ label, component }) => {
                const RouteComponent = component;
                return (
                  <Route
                    Component={() => (
                      <Client>
                        <RouteComponent />
                      </Client>
                    )}
                    key={label}
                    path={`/${rootItemKeys[2]}/${label}`}
                  />
                );
              })}
              {Advanced.map(({ label, component }) => {
                const RouteComponent = component;
                return (
                  <Route
                    Component={() => (
                      <Client>
                        <RouteComponent />
                      </Client>
                    )}
                    key={label}
                    path={`/${rootItemKeys[3]}/${label}`}
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
