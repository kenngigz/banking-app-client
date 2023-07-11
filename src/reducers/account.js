import { SET_ACCOUNT, UPDATE_ACCOUNT, RESET_ACCOUNT } from "../utils/constants";

const accountReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ACCOUNT:
      return {
        ...action.accountDetails.account,
      };
    case RESET_ACCOUNT:
      return {};
    case UPDATE_ACCOUNT:
      if (action.operation === "withdraw" || action.operation === "transfer") {
        return {
          ...state,
          total_balance: +state.total_balance - +action.amountToChange,
        };
      } else if (action.operation === "deposit") {
        return {
          ...state,
          total_balance: +state.total_balance + +action.amountToChange,
        };
      }
      break;
    default:
      return state;
  }
};

export default accountReducer;
