export const initializeScaffolding = (appsMeataData = {}) => {
  console.log("creating scaffolding registry");
  window.scaffolding = {
    apps: {},
    appsMeataData,
  };
};

export const getAppsByPathname = (pathname) => {
  console.log({ pathname, scaf: window.scaffolding });
  return Object.keys(window.scaffolding.appsMeataData)
    .filter(
      (key) => window.scaffolding.appsMeataData[key].location === pathname
    )
    .map((key) => ({
      ...window.scaffolding.appsMeataData[key],
      name: key,
    }));
};

export const getApp = (name) => window.scaffolding.apps[name];

export const initializeApp = (App, configuration) => {
  console.log("initialize app: ", { App, configuration });
  window.scaffolding.apps[configuration.name] = {
    Component: App,
    nodeId: configuration.id,
  };
};

/**
 * mock demo for insights
 */
window.insights = {
  chrome: {
    init: () => {},
    getApp: () => "rbac",
    identifyApp: () => {},
    on: ("foo", () => {}),
    auth: {
      getUser: () =>
        Promise.resolve({ entitlements: [], identity: { user: { is_org_admin: true } } }),
    },
  },
};
