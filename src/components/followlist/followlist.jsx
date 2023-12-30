import React, { useEffect, useState } from "react";
import { Followingslist, Followerslist } from "../../services/UserApi";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Alert,
  Avatar,
  Slider,
  Input,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Loader } from "../../components/Loading/Loader";

function Followlist({ user_id, is_followings }) {
  const [follows, setFollows] = useState(null);

  useEffect(() => {
    const fetchFollowings = async () => {
      try {
        const response = is_followings
          ? await Followingslist(user_id)
          : await Followerslist(user_id);
        setFollows(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFollowings();
  }, [user_id]);

  if (!follows) {
    return <Loader />;
  }

  // console.log(follows, "foloowwwingssss");

  return (
    <>
      <div className="ml-72 flex">
        <h1 className="font-bold text-2xl ">
          {is_followings ? "Followings" : "Followers"}{" "}
        </h1>

        <div className="md:w-56 ml-28">
          <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </div>
      <Card className="w-[50rem] min-h-[25rem] hidescroll max-h-[50rem] overflow-y-auto overflow-x-hidden mt-5 bg-gray-50">
        {follows.length > 0 ? (
          follows.map((follow) => (
            <>
              <Card className="gap-10 rounded-md flex-row m-2 ml-16 mr-16 h-16">
                <img
                  className="ml-5 mt-2 h-12 w-12 rounded-lg"
                  src={
                    is_followings
                      ? follow.following.profile_img
                      : follow.follower.profile_img
                  }
                  alt="profile img"
                />

                <Typography
                  variant="h5"
                  className="w-32 items-center justify-center flex"
                >
                  {is_followings
                    ? follow.following.first_name+ " "+follow.following.last_name 
                    : follow.follower.first_name+ " "+follow.follower.last_name}
                </Typography>
                <p className="mt-4 text-gray-500 text-lg">
                    {is_followings ? follow.following.tag_name :follow.follower.tag_name}
                </p>
                {is_followings && (
                  <p className="bg-green-100 w-24 text-md font-semibold justify-center items-center mt-4 h-[1.6rem] flex text-blue-800  rounded-md">
                    following
                  </p>
                )}
              </Card>
            </>
          ))
        ) : (
          <Typography
            variant="h4"
            className="flex justify-center items-center mt-5"
          >
            {is_followings ? "No Followings" : "No followers"}{" "}
          </Typography>
        )}
      </Card>
    </>
  );
}

export default Followlist;
