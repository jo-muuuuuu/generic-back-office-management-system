import http from "axios";

export const getData = () => {
  return http.request({
    url: "/home/getData",
    method: "get",
  });
};

export const getUser = (params) => {
  return http.request({
    url: "/user/getUser",
    method: "get",
    params,
  });
};

export const createUser = (data) => {
  return http.request({
    url: "/user/createUser",
    method: "post",
    data,
  });
};

export const updateUser = (data) => {
  return http.request({
    url: "/user/updateUser",
    method: "post",
    data,
  });
};

export const deleteUser = (data) => {
  return http.request({
    url: "/user/deleteUser",
    method: "post",
    data,
  });
};

export const getMenu = (data) => {
  return http.request({
    url: "/permission/getMenu",
    method: "post",
    data,
  });
};
