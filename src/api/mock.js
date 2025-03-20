import Mock from "mockjs";
import homeAPI from "./mockServerData/home";

Mock.mock(/home\/getData/, homeAPI.getStatisticalData());
