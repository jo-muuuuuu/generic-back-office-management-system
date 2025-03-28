import Mock from "mockjs";
import homeAPI from "./mockServerData/home";
import userAPI from "./mockServerData/user";
import permissionAPI from "./mockServerData/permission";

Mock.mock(/home\/getData/, homeAPI.getStatisticalData);
Mock.mock(/user\/getUser/, userAPI.getUserList);
Mock.mock(/user\/createUser/, "post", userAPI.createUser);
Mock.mock(/user\/updateUser/, "post", userAPI.updateUser);
Mock.mock(/user\/deleteUser/, "post", userAPI.deleteUser);
Mock.mock(/permission\/getMenu/, "post", permissionAPI.getMenu);
