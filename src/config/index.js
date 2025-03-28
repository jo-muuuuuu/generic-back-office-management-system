const menuConfig = [
  {
    path: "/home",
    name: "home",
    label: "HOME",
    icon: "HomeOutlined",
    url: "/home/index",
  },
  {
    path: "/product",
    name: "product",
    label: "PRODUCTS",
    icon: "ShopOutlined",
    url: "/product/index",
  },
  {
    path: "/user",
    name: "user",
    label: "USER",
    icon: "UserOutlined",
    url: "/user/index",
  },
  {
    path: "/other",
    label: "OTHER",
    icon: "SettingOutlined",
    children: [
      {
        path: "/other/pageOne",
        name: "page 1",
        label: "PAGE 1",
        icon: "SettingOutlined",
      },
      {
        path: "/other/pageTwo",
        name: "page 2",
        label: "PAGE 2",
        icon: "SettingOutlined",
      },
    ],
  },
];

export default menuConfig;
