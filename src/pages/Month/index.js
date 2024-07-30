import { NavBar, DatePicker, Modal } from "antd-mobile";
import "./index.scss";
import { useState } from "react";
import classNames from "classnames";

const Month = () => {
  const [visible, setVisible] = useState(false);
  const onConfirm = () => {
    Modal.alert({
      title: "确定选择该日期吗？",
      showCloseButton: true,
    });
    setVisible(!visible);
  };
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setVisible(!visible)}>
            <span className="text">2023 | 3月账单</span>
            {/* <span className={classNames("arrow", visible && "expand")}></span> */}
            <span className={`arrow ${visible && "expand"}`}></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
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
      </div>
    </div>
  );
};

export default Month;
