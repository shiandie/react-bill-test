import { getBillList } from "@/store/modules/billStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { TabBar } from "antd-mobile";
//import "./index.scss";
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline,
} from "antd-mobile-icons";

const tabs = [
  {
    key: "/month",
    title: "月度账单",
    icon: <BillOutline />,
  },
  {
    key: "/new",
    title: "记账",
    icon: <AddCircleOutline />,
  },
  {
    key: "/year",
    title: "年度账单",
    icon: <CalculatorOutline />,
  },
];

const Layout = () => {
  const navigate = useNavigate();
  const switchRouter = (key) => {
    console.log(key);
    navigate(key);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);
  return (
    <div>
      <div className="fixed 0 bottom-50px">
        <Outlet />
      </div>
      <div className="fixed bottom-0 w-full">
        <TabBar onChange={switchRouter}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
};
export default Layout;
