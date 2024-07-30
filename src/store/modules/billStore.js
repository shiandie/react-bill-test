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
  },
});
const { setBillList } = billStore.actions;
const getBillList = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:8888/ka");
    dispatch(setBillList(response.data));
  };
};
export { getBillList };
const reducer = billStore.reducer;
export default reducer;
