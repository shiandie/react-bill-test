import { Button, DatePicker, Input, NavBar } from "antd-mobile";
import Icon from "@/components/Icon";
import "./index.scss";
import classNames from "classnames";
import { billListData } from "@/contants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addBillList } from "@/store/modules/billStore";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

const New = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [billType, setBillType] = useState("pay");
  //收集账单信息
  const [money, setMoney] = useState(0);
  const onChangeMoney = (value) => {
    setMoney(value);
  };
  const [useFor, setUseFor] = useState("");

  //控制时间选择器视图
  const [visible, setVisible] = useState(false);
  //收集时间
  const [date, setDate] = useState();
  const onConfirmDate = (value) => {
    setDate(value);
    console.log(value);
    setVisible(false);
  };
  const onClickSave = () => {
    const UserData = {
      type: billType,
      money: billType === "pay" ? -money : money,
      date: date,
      useFor: useFor,
    };
    dispatch(addBillList(UserData));
  };
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            onClick={() => setBillType("pay")}
            shape="rounded"
            className={classNames(billType === "pay" ? "selected" : "")}
          >
            支出
          </Button>
          <Button
            onClick={() => setBillType("income")}
            className={classNames(billType === "income" ? "selected" : "")}
            shape="rounded"
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span onClick={() => setVisible(true)} className="text">
                {dayjs(date).format("YYYY-MM-DD")}
              </span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={visible}
                onConfirm={onConfirmDate}
                onCancel={() => setVisible(false)}
                onClose={() => setVisible(false)}
              />
            </div>
            <div className="kaInput">
              <Input
                value={money}
                onChange={onChangeMoney}
                className="input"
                placeholder="0.00"
                type="number"
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map((item) => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    <div
                      onClick={() => setUseFor(item.type)}
                      className={classNames(
                        "item",
                        useFor === item.type ? "selected" : ""
                      )}
                      key={item.type}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={onClickSave}>
          保 存
        </Button>
      </div>
    </div>
  );
};

export default New;
