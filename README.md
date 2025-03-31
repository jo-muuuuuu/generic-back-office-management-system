# Generic Backend Management System

## Introduction
<img width="1920" alt="dashbooard" src="https://github.com/user-attachments/assets/a6c69d80-9435-4d21-9ec9-5e488c59a269" />
<br /><br />

This project simulates a generic backend management system, originally inspired by [this Bilibili video](https://www.bilibili.com/video/BV1rz42167A6?vd_source=44dbd0a74161c0bc443fb3c98ae0848e).
<br /><br />
However, this is not simply a direct copy of the original project, I have made some modifications on top of it. The most significant one is setting two user roles: `admin` and `user`. Upon login, a menu items list based on the user's identity is returned, and users can only access certain pages based on their privileges. Besides, different user card information is displayed based on the role.

<img width="756" alt="admin-side-menu" src="https://github.com/user-attachments/assets/6fc408ba-d051-4f62-b7f9-e21ade194f2f" />

<img width="756" alt="user-side-menu" src="https://github.com/user-attachments/assets/c299e13e-3be5-4182-a640-26926268b3aa" />

## Tech Stack

- React (Create React App, React Router Dom, React Redux)
- Ant Design
- Axios
- Mock.js
- Fakerator
- Echarts
- AWS

This project uses `Mock.js` to intercept `Axios` requests and returns randomly generated USER data (`Fakerator` is used to generate random addresses in English). However, TABLE data for `Echarts` is hardcoded.

`Redux` is utilized to manage several states, including user identity, menu items list, and page tabs.

## AWS Hosting

This project is hosted on AWS S3 as it's a static website.

You can access the app via the link below and log in using the following credentials:

[Generic Back Office Management System](http://backend-mgmt-system.s3-website.ap-southeast-4.amazonaws.com/).

### User

- Username: xiaohe
- Password: xiaohe

### Admin

- Username: admin
- Password: admin

## How to Run in Your Local Environment

1. Run `npm i` to install dependencies.
2. Run `npm start` to run the application.
3. Open http://localhost:3000 in your browser if it does not open automatically.
