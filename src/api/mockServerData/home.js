import Mock from "mockjs";

let list = [];

export default {
  getStatisticalData: () => {
    for (let i = 0; i < 8; i++) {
      list.push(
        Mock.mock({
          VIC: Mock.Random.float(100, 8000, 0, 0),
          NSW: Mock.Random.float(100, 8000, 0, 0),
          TAS: Mock.Random.float(100, 8000, 0, 0),
          QLD: Mock.Random.float(100, 8000, 0, 0),
          ACT: Mock.Random.float(100, 8000, 0, 0),
          SA: Mock.Random.float(100, 8000, 0, 0),
          WA: Mock.Random.float(100, 8000, 0, 0),
          NT: Mock.Random.float(100, 8000, 0, 0),
        })
      );
    }

    return {
      code: 20000,
      data: {
        videoData: [
          { name: "VIC", value: 5000 },
          { name: "NSW", value: 4000 },
          { name: "TAS", value: 3000 },
          { name: "QLD", value: 2000 },
          { name: "ACT", value: 1000 },
          { name: "SA", value: 500 },
          { name: "WA", value: 800 },
          { name: "NT", value: 900 },
        ],

        userData: [
          { day: "Mon", new: 23, active: 200 },
          { day: "Tue", new: 23, active: 200 },
          { day: "Wed", new: 23, active: 200 },
          { day: "Thu", new: 23, active: 200 },
          { day: "Fri", new: 23, active: 200 },
          { day: "Sat", new: 23, active: 200 },
          { day: "Sun", new: 23, active: 200 },
        ],

        orderData: {
          location: ["VIC", "NSW", "TAS", "QLD", "ACT", "SA", "WA", "NT"],
          data: list,
        },

        tableData: [
          { name: "Melbourne", dayProfit: 500, monthProfit: 18000 },
          { name: "Sydney", dayProfit: 450, monthProfit: 16500 },
          { name: "Horbat", dayProfit: 300, monthProfit: 10000 },
          { name: "Canberra", dayProfit: 350, monthProfit: 12000 },
          { name: "Adelaide", dayProfit: 350, monthProfit: 13500 },
          { name: "Perth", dayProfit: 400, monthProfit: 12000 },
          { name: "Darwin", dayProfit: 300, monthProfit: 9500 },
        ],
      },
    };
  },
};
