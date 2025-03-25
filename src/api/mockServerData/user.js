import Mock from "mockjs";
import * as Fakerator from "fakerator";

function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

let List = [];
const count = 200;
const fakerator = Fakerator("en-AU");

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.first() + " " + Mock.Random.last(),
      addr: `${fakerator.address.buildingNumber()} ${fakerator.address.streetName()}, ${fakerator.address.city()}`,
      "age|18-60": 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.pick(["M", "F"]),
    })
  );
}

export default {
  /**
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getUserList: (config) => {
    const { name, page = 1, limit = 20 } = param2Obj(config.url);
    const searchName = name ? name.replace(/\s+/g, "+") : name;
    const mockList = List.filter((user) => {
      if (
        searchName &&
        user.name.toLowerCase().replace(/\s+/g, "+").indexOf(searchName.toLowerCase()) ===
          -1 &&
        user.addr.toLowerCase().replace(/\s+/g, "+").indexOf(searchName.toLowerCase()) ===
          -1
      )
        return false;
      return true;
    });
    const pageList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    );
    return {
      code: 20000,
      count: mockList.length,
      list: pageList,
    };
  },

  /**
   * @param name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  createUser: (config) => {
    const { name, addr, age, birth, sex } = JSON.parse(config.body);
    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      addr: addr,
      age: age,
      birth: birth,
      sex: sex,
    });
    return {
      code: 20000,
      data: {
        message: "New user added",
      },
    };
  },
  /**
   * @param id
   * @return {*}
   */
  deleteUser: (config) => {
    const { id } = JSON.parse(config.body);
    if (!id) {
      return {
        code: -999,
        message: "User doesn't exist",
      };
    } else {
      List = List.filter((u) => u.id !== id);
      return {
        code: 20000,
        message: "User deleted",
      };
    }
  },

  /**
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: (config) => {
    let { ids } = param2Obj(config.url);
    ids = ids.split(",");
    List = List.filter((u) => !ids.includes(u.id));
    return {
      code: 20000,
      data: {
        message: "Batch Delete Success",
      },
    };
  },

  /**
   * @param id, name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  updateUser: (config) => {
    const { id, name, addr, age, birth, sex } = JSON.parse(config.body);
    // const sex_num = parseInt(sex);
    List.some((u) => {
      if (u.id === id) {
        u.name = name;
        u.addr = addr;
        u.age = age;
        u.birth = birth;
        // u.sex = sex_num;
        u.sex = sex;
        return true;
      }
    });
    return {
      code: 20000,
      data: {
        message: "User information updated",
      },
    };
  },
};
