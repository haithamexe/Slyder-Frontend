// import React from "react";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// import {
//   useRefreshTokenApiQuery,
//   useAuthUserApiMutation,
// } from "../features/user/userApiSlice";

// import { userActions } from "../features/user/userSlice";

// const REFRESH_INTERVAL = 1000 * 60 * 15;

// const AuthUser = () => {
//   const dispatch = useDispatch();

//   const [
//     authUserApi,
//     { data: auth, isSuccess: authSuccess, error: authError },
//   ] = useAuthUserApiMutation();

//   const { data: refreshToken, error: refreshError } = useRefreshTokenApiQuery(
//     null,
//     {
//       pollingInterval: REFRESH_INTERVAL,
//     }
//   );

//   useEffect(() => {
//     authUserApi(refreshToken);
//   }, [refreshToken]);

//   useEffect(() => {
//     if (authSuccess) {
//       dispatch(userActions.authUser(auth));
//     }
//   }, [authSuccess]);

//   return <></>;
// };

// export default AuthUser;

import { userActions, userAuthed } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AuthUser = () => {
  const user = useSelector(userAuthed);
  console.log("AuthUser", userAuthed, userActions, user);
  return <>{user ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default AuthUser;
