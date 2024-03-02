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
    <div className="md:max-w-5xl max-w-3xl mx-auto px-4">
    <div className="md:ml-40 ml-12 lg:ml-48 flex flex-col md:flex-row items-center justify-between">
      <h1 className="font-bold text-2xl mb-4 md:mb-0">
          {is_followings ? "Followings" : "Followers"}{" "}
        </h1>

        <div className="md:w-48 w-32 md:ml-0 ml-0 md:mt-0 mt-4">
        <Input
          label="Search"
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
        />
      </div>
      </div>
      <Card className="md:max-w-5xl max-w-3xl min-h-[25rem] hidescroll max-h-[50rem] overflow-y-auto overflow-x-hidden mt-5 bg-gray-50">
        {follows.length > 0 ? (
          follows.map((follow) => (
            <>
              <Card className="gap-10 rounded-md flex-row m-2 md:ml-10 lg:ml-16 lg:mr-16 h-16">
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
                  className="w-32 items-center justify-center md:text-lg text-sm flex"
                >
                  {is_followings
                    ? follow.following.first_name+ " "+follow.following.last_name 
                    : follow.follower.first_name+ " "+follow.follower.last_name}
                </Typography>
                <p className="mt-4 text-gray-500 md:text-lg text-sm">
                    {is_followings ? follow.following.tag_name :follow.follower.tag_name}
                </p>
                {is_followings && (
                  <p className="bg-green-100 w-24 md:text-lg text-sm font-semibold justify-center items-center mr-2 mt-4 h-[1.6rem] flex text-blue-800  rounded-md">
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
    </div>
  );
}

export default Followlist;
