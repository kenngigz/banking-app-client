import axios from "axios";
import { SIGN_IN, SIGN_OUT, BASE_API_URL } from "../utils/constants";
import { initiateGetProfile } from "./profile";
import { history } from "../router/AppRouter";
import { getErrors } from "./errors";
import { post } from "../utils/api";
import { resetAccount } from "./account";

export const signIn = (user) => ({
  type: SIGN_IN,
  user,
});

export const initiateLogin = (customer_ID, pin) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(`${BASE_API_URL}/signin`, {
        customer_ID,
        pin,
      });
      const user = result.data;
      localStorage.setItem("user_token", user.token);
      dispatch(signIn(user));
      dispatch(initiateGetProfile(user.email));
      history.push("/account");
    } catch (error) {
      console.log("error", error);
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const registerNewUser = (data) => {
  return async (dispatch) => {
    try {
      const datafrom = await axios.post(`${BASE_API_URL}/signup`, data);
      console.log(datafrom.data);
      return { success: true };
    } catch (error) {
      console.log("error", error);
      error.response && dispatch(getErrors(error.response.data));
      return { success: false };
    }
  };
};

export const signOut = () => ({
  type: SIGN_OUT,
});

export const initiateLogout = () => {
  return async (dispatch) => {
    try {
      await post(`${BASE_API_URL}/logout`, true, true);
      localStorage.removeItem("user_token");
      dispatch(resetAccount());
      return dispatch(signOut());
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};
