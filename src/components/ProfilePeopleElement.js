import { useNavigate } from "react-router-dom";
import {
  useGetFollowersApiQuery,
  useGetFollowingApiQuery,
  useGetUserWithIdApiQuery,
} from "../features/user/userApiSlice";
import { useEffect, useState } from "react";
import PeopleRender from "./PeopleRender";

const ProfilePeopleElement = ({ users, type }) => {
  const [people, setPeople] = useState([]);

  // const { data: followersData } = useGetFollowersApiQuery({
  //   userId: user?._id,
  // });

  // const { data: followingData } = useGetFollowingApiQuery({
  //   userId: user?._id,
  // });

  // useEffect(() => {
  //   if (type === "Followers") {
  //     if (followersData) {
  //       setPeople(followersData);
  //     }
  //   } else {
  //     if (followingData) {
  //       setPeople(followingData);
  //     }
  //   }
  //   console.log(followersData, followingData, people, user);
  // }, [followersData, followingData]);

  return (
    <div>
      <div className="profile-people-element">
        {users?.length > 0 ? (
          users.map((person) => (
            <PeopleRender key={person._id} person={person} />
          ))
        ) : (
          <div className="no-people">No {type}</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePeopleElement;
