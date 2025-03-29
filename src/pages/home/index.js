import React, { useEffect, useState } from "react";
import { Col, Row, Card, Table } from "antd";
import * as Icon from "@ant-design/icons";

import "./home.css";
import { getData } from "../../api";
import MyEcharts from "../../components/Echarts/index";

const columns = [
  { title: "City", dataIndex: "name" },
  { title: "Day Profit", dataIndex: "dayProfit" },
  { title: "Month Profit", dataIndex: "monthProfit" },
];

const orderData = [
  {
    name: "Paid Orders Today",
    value: 12345,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "Total Quotes Today",
    value: 54321,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "Unpaid Quotes Today",
    value: 54321,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
  {
    name: "Paid Orders This Month",
    value: 123456,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "Total Quotes This Month",
    value: 654321,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "Unpaid Quotes This Month",
    value: 654321,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
];

// Create Icon Elements
const createIconElement = (name) => {
  return React.createElement(Icon[name]);
};

const Home = () => {
  const userAvatar = require("../../assets/kira.jpeg");

  const [tableData, setTableData] = useState([]);
  const [echartsData, setEchartsData] = useState({});

  useEffect(() => {
    getData().then((res) => {
      // console.log(res.data.data);
      const { tableData, orderData, userData, videoData } = res.data.data;

      setTableData(tableData);

      // const orderData = res.data.data.orderData;
      const xData = orderData.location;

      const keyArray = Object.keys(orderData.data[0]);
      // console.log(keyArray);
      const seriesData = [];
      keyArray.forEach((key) => {
        seriesData.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      // console.log(seriesData);

      setEchartsData({
        orderData: {
          xData,
          seriesData,
        },

        userData: {
          xData: userData.map((item) => item.day),
          seriesData: [
            {
              name: "New User",
              data: userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "Active User",
              data: userData.map((item) => item.active),
              type: "bar",
            },
          ],
        },

        videoData: {
          seriesData: [
            {
              data: videoData,
              type: "pie",
            },
          ],
        },
      });
    });
  }, []);

  return (
    <Row className="home">
      <Col span={8}>
        <Card className="user-info-card" hoverable>
          <div className="user">
            <img src={userAvatar} />
            <div className="user-info">
              <p className="user-name">Johnny</p>
              <p className="user-role">Admin</p>
            </div>
          </div>

          <div className="log-info">
            <p>
              <span className="log-info-title">Last Log-in Time</span>
              <span className="log-info-detail">2024-08-20</span>
            </p>
            <p>
              <span className="log-info-title">Last Log-in Location </span>
              <span className="log-info-detail">Shenzhen</span>
            </p>
          </div>
        </Card>

        <Card>
          <Table
            dataSource={tableData}
            rowKey={"name"}
            columns={columns}
            pagination={false}
          />
        </Card>
      </Col>

      <Col span={16}>
        <div className="order">
          {orderData.map((item, index) => {
            return (
              <Card key={index}>
                <div className="icon-box" style={{ background: item.color }}>
                  {createIconElement(item.icon)}
                </div>

                <div className="detail">
                  <p className="value">${item.value}</p>
                  <p className="title">{item.name}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {echartsData.orderData && (
          <MyEcharts chartData={echartsData.orderData} style={{ height: "280px" }} />
        )}

        <div style={{ display: "flex" }}>
          {echartsData.userData && (
            <MyEcharts
              chartData={echartsData.userData}
              style={{ height: "240px", width: "50%" }}
            />
          )}
          {echartsData.videoData && (
            <MyEcharts
              chartData={echartsData.videoData}
              style={{ height: "260px", width: "50%" }}
              option={"normalOptions"}
            />
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Home;
