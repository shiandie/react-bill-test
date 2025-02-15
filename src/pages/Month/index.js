import { NavBar, DatePicker, Modal } from "antd-mobile";
import "./index.scss";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import DailyBill from "./components/DayBill";

const Month = () => {
  const [currentMonthList, setCurrentMonthList] = useState([]);
  const monthResult = useMemo(() => {
    const pay = currentMonthList
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);
    const income = currentMonthList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
    return { pay, income, total: pay + income };
  }, [currentMonthList]);
  console.log(monthResult);
  //按月做数据的分组
  const billList = useSelector((state) => state.bill.billList);
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.data).format("YYYY-MM"));
  }, [billList]);
  console.log(monthGroup);
  // 控制时间选择器的显示与隐藏
  const [visible, setVisible] = useState(false);
  // 控制时间显示
  const [currentDate, setCurrentDate] = useState(() => {
    dayjs(new Date()).format("YYYY-MM");
  });
  const onConfirm = (data) => {
    Modal.alert({
      title: "确定选择该日期吗？",
      showCloseButton: true,
    });
    setVisible(!visible);
    const formatDate = dayjs(data).format("YYYY-MM");
    setCurrentDate(formatDate);
    setCurrentMonthList(monthGroup[formatDate]);
    console.log(currentMonthList);
  };
  //当前日，根据当前月来分组
  const dayGroup = useMemo(() => {
    const groupDate = _.groupBy(currentMonthList, (item) =>
      dayjs(item.data).format("YYYY-MM-DD")
    );
    const keys = Object.keys(groupDate);
    return { groupDate, keys };
  }, [currentMonthList]);
  //初始化的时候就把当前月的统计数据显示出来
  useEffect(() => {
    const nowDate = dayjs().format("YYYY-MM");
    if (monthGroup[nowDate]) {
      setCurrentMonthList(monthGroup[nowDate]);
    }
  }, [monthGroup]);
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setVisible(!visible)}>
            <span className="text">{currentDate + ""} | 3月账单</span>
            <span className={classNames("arrow", visible && "expand")}></span>
            {/* <span className={`arrow ${visible && "expand"}`}></span> */}
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={visible}
            max={new Date()}
            onCancel={() => setVisible(false)}
            onConfirm={onConfirm}
            onClose={() => setVisible(!visible)}
          />
        </div>
        {/* 单日列表统计 */}
        {dayGroup.keys.map((item) => (
          <DailyBill
            key={item}
            date={item}
            billList={dayGroup.groupDate[item]}
          />
        ))}
      </div>
    </div>
  );
};

export default Month;
