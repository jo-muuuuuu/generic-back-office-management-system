import Mock from "mockjs";
export default {
  getMenu: (config) => {
    const { username, password } = JSON.parse(config.body);

    if (username === "admin" && password === "admin") {
      return {
        code: 20000,
        data: {
          menu: [
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
                  name: "page1",
                  label: "PAGE 1",
                  icon: "SettingOutlined",
                },
                {
                  path: "/other/pageTwo",
                  name: "page2",
                  label: "PAGE 2",
                  icon: "SettingOutlined",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          identity: "admin",
          message: "Success!",
        },
      };
    } else if (username === "xiaohe" && password === "xiaohe") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/home",
              name: "home",
              label: "HOME",
              icon: "HomeOutlined",
              url: "/home/index",
            },
            {
              path: "/user",
              name: "user",
              label: "USER",
              icon: "UserOutlined",
              url: "/user/index",
            },
          ],
          token: Mock.Random.guid(),
          identity: "user",
          message: "Success!",
        },
      };
    } else {
      return {
        code: -999,
        data: {
          message: "Wrong username or password",
        },
      };
    }
  },
};
