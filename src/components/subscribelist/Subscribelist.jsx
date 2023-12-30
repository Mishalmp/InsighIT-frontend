import React, { useEffect, useState } from "react";
import { Subscriberslist, SubscriptionsList } from "../../services/UserApi";
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
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Loader } from "../../components/Loading/Loader";

function formatDateTime(isoDate) {
  const date = new Date(isoDate);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    //   second: "numeric",
    //   timeZoneName: "short",
  };

  return date.toLocaleDateString("en-US", options);
}

function Subscribelist({ user_id, is_subscription }) {
  const [subscribes, setSubscribes] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedsubscribe, setSelectedSubscribe] = useState(null);



  useEffect(() => {
    const FetchSubscribes = async () => {
      try {
        const response = is_subscription
          ? await SubscriptionsList(user_id)
          : await Subscriberslist(user_id);

        setSubscribes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    FetchSubscribes();
  }, [user_id]);

  if (!subscribes) {
    return <Loader />;
  }


  const handleOpen = (subscribe) => {
    setSelectedSubscribe(subscribe);
    setOpen(true);
  };

  console.log();

  return (
    <>
      <div className="ml-72 flex">
        <h1 className="font-bold text-2xl ">
          {is_subscription ? "Subscriptions" : "Subscribers"}{" "}
        </h1>

        <div className="md:w-56 ml-28">
          <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </div>
      <Card className="w-[50rem] min-h-[25rem] hidescroll max-h-[50rem] overflow-y-auto overflow-x-hidden mt-5 bg-gray-50">
        {subscribes.length > 0 ? (
          subscribes.map((subscribe) => (
            <>
              <Card
                className="gap-10 rounded-md flex-row m-2 ml-16 mr-16 h-16"
                onClick={() => handleOpen(subscribe)}
              >
                <img
                  className="ml-5 mt-2 h-12 w-12 rounded-lg"
                  src={
                    is_subscription
                      ? subscribe.subscribed_to.profile_img
                      : subscribe.subscriber.profile_img
                  }
                  alt="profile img"
                />

                <Typography
                  variant="h5"
                  className="w-32 items-center justify-center flex"
                >
                  {is_subscription
                    ? subscribe.subscribed_to.first_name +
                      " " +
                      subscribe.subscribed_to.last_name
                    : subscribe.subscriber.first_name +
                      " " +
                      subscribe.subscriber.last_name}
                </Typography>
                <p className="mt-4 text-gray-500 text-lg">
                  {is_subscription
                    ? subscribe.subscribed_to.tag_name
                    : subscribe.subscriber.tag_name}
                </p>

                <p className={`${subscribe.is_active?"bg-green-100":"bg-red-200"}  w-40 text-md font-semibold justify-center items-center mt-4 h-[1.6rem] flex text-blue-800  rounded-md`}>
                  { subscribe.is_active?subscribe.subscription_type:"Not active" }
                </p>
              </Card>
            </>
          ))
        ) : (
          <Typography
            variant="h4"
            className="flex justify-center items-center mt-5"
          >
            {is_subscription ? "No Subscriptions" : "No Subscribers"}{" "}
          </Typography>
        )}
      </Card>
      {selectedsubscribe && (
        <Dialog size="md" open={open} handler={handleOpen}>
          <DialogHeader>
            <Typography variant="h4" color="blue-gray">
              Subscription Info
            </Typography>
          </DialogHeader>
          <DialogBody divider className="grid grid-cols-1 gap-4">
            <Typography variant="h6" color="blue-gray">
              Subscription Type:{selectedsubscribe.subscription_type}
            </Typography>
            <Typography variant="h6" color="blue-gray">
              Start date:{formatDateTime(selectedsubscribe.start_time)}
            </Typography>
            <Typography variant="h6" color="blue-gray">
              End date:{formatDateTime(selectedsubscribe.end_time)}
            </Typography>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button
              variant="text"
              color="blue-gray"
              onClick={() => setOpen(!open)}
            >
              close
            </Button>
            <Button variant="gradient" onClick={() => setOpen(!open)}>
              Ok, Got it
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </>
  );
}

export default Subscribelist;
