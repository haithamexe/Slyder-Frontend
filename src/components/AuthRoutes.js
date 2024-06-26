import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  useRefreshTokenApiMutation,
  useAuthUserApiMutation,
} from "../features/user/userApiSlice";

import {
  userAuthToken,
  userAuthed,
  userActions,
} from "../features/user/userSlice";

const AuthRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userAuthed);
  const userToken = useSelector(userAuthToken);
  const timer = 15 * 60 * 1000;

  const [
    refreshTokenApi,
    {
      data: accessToken,
      error: refreshError,
      isLoading: refreshLoading,
      isSuccess: refreshSuccess,
    },
  ] = useRefreshTokenApiMutation();

  const [
    authUserApi,
    {
      data: auth,
      error: authError,
      isLoading: authLoading,
      isSuccess: authSuccess,
    },
  ] = useAuthUserApiMutation();

  useEffect(() => {
    if (!user && userToken) {
      authUserApi(userToken);
    } else if (!user && !userToken) {
      refreshTokenApi();
    }

    if (refreshSuccess && accessToken && !user) {
      dispatch(userActions.refreshToken(accessToken));
      authUserApi(accessToken);
    }

    if (authSuccess) {
      dispatch(userActions.authUser(auth));
    }

    if (refreshError || authError) {
      dispatch(userActions.logoutUser());
      navigate("/login", { replace: true });
    }

    const refreshTimer = setTimeout(() => {
      refreshTokenApi();
      dispatch(userActions.refreshToken(accessToken));
    }, timer);

    // console.log(
    //   "User: ",
    //   user,
    //   "Token: ",
    //   userToken,
    //   "Auth: ",
    //   auth,
    //   "Refresh Success: ",
    //   refreshSuccess,
    //   "Access Token: ",
    //   accessToken,
    //   "Auth Success: ",
    //   authSuccess,
    //   "Refresh Error: ",
    //   refreshError,
    //   "Auth Error: ",
    //   authError
    // );

    return () => clearTimeout(refreshTimer);
  }, [
    user,
    userToken,
    refreshSuccess,
    accessToken,
    authSuccess,
    refreshError,
    authError,
    refreshTokenApi,
    timer,
    auth,
  ]);

  return <>{user && <Outlet />}</>;
};

export default AuthRoutes;
