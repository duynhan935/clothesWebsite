import { doLogoutAction } from "../redux/store/profileSlice";
import type { AppDispatch } from "../redux/store/store";

export const logoutUser = (dispatch: AppDispatch) => {
    dispatch(doLogoutAction());
};
