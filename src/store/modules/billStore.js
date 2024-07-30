import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name: "bill",
  initialState: {
    billList: [],
  },
  reducers: {
    setBillList: (state, action) => {
      state.billList = action.payload;
    },
    //同步添加账单方法
    addBill: (state, action) => {
      state.billList.push(action.payload);
    },
  },
});
const { setBillList, addBill } = billStore.actions;
const getBillList = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:8888/ka");
    dispatch(setBillList(response.data));
  };
};
//编写异步添加
const addBillList = (data) => {
  return async (dispatch) => {
    const response = await axios.post("http://localhost:8888/ka", data);
    dispatch(addBill(response.data));
  };
};
export { getBillList, addBillList };
const reducer = billStore.reducer;
export default reducer;
