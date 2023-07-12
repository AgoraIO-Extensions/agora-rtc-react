import "antd/dist/reset.css";
import "../index.scss";
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
  {
    label: "settings",
    key: `/setting`,
  },
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
            <a
              aria-label="View source on GitHub"
              className="github-corner"
              href="https://github.com/AgoraIO-Extensions/agora-rtc-react"
              rel="noreferrer"
              target="_blank"
            >
              <svg
                aria-hidden="true"
                className="github-corner-svg"
                height="80"
                viewBox="0 0 250 250"
                width="80"
              >
                <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
                <path
                  className="github-corner-svg-arm"
                  d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                  fill="currentColor"
                />
                <path
                  className="github-corner-svg-body"
                  d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
