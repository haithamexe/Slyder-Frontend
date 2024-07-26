import { useGetUserWithIdApiQuery } from "../features/user/userApiSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PeopleRender = ({ person }) => {
  const navigate = useNavigate();

  return (
    <div className="person" onClick={() => navigate("/" + person?.username)}>
      <img src={person?.picture} alt="profile" />
      <div className="person-info">
        <h1>
          {person?.firstName} {person?.surName}
        </h1>
        <p>@{person?.username}</p>
      </div>
    </div>
  );
};

export default PeopleRender;
