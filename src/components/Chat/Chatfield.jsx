import React, { useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import Userico from "../../assets/user2img.png";
import { w3cwebsocket as W3CWebSocket, client } from "websocket";
import { wsurl } from "../../constants/constants";
import { useQuery } from "react-query";
import { PreviousChat } from "../../services/UserApi";
import { timeAgo } from "../../helpers/Timemanage";
import Chatbg from "../../assets/chatbg.jpg";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import AddIcCallOutlinedIcon from "@mui/icons-material/AddIcCallOutlined";
import { useNavigate } from "react-router-dom";
function Chatfield({ userinfo, recipientDetails }) {
  const messageRef = useRef();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [clientstate, setClientState] = useState("");
  const [senderdetails, setSenderDetails] = useState(userinfo);
  const lastMessageRef = useRef();

  const onButtonClicked = (e) => {
    e.preventDefault();
    if (messageRef.current.value.trim() == "") {
      return;
    }
    clientstate.send(
      JSON.stringify({
        message: messageRef.current.value,
        senderUsername: senderdetails.email,
        recieverUsername: recipientDetails.email,
      })
    );
    messageRef.current.value = "";
  };

  const handlevideoClick = () => {
    if (senderdetails && recipientDetails) {
      const videodata = [senderdetails, recipientDetails];

      if (videodata[1]) {
        const messagedata = {
          message: `${window.location.origin}/User/videocall?roomId=${senderdetails.id}&receiverId=${recipientDetails.id}`,
          senderUsername: senderdetails.email,
          recieverUsername: recipientDetails.email,
        };

        clientstate.send(JSON.stringify(messagedata));

        navigate("/User/videocall", { state: { data: videodata } });
      } else {
        console.error("Data is empty. Unable to initiate video call.");
      }
    } else {
      console.error("Recipient details or sender details are missing.");
    }
  };

  const renderButtonIfLink = (message) => {
    const linkRegex = /https?:\/\/[^\s]+/g; // Regular expression to match URLs

    // Check if the message contains a link
    const hasLink = linkRegex.test(message);

    if (hasLink) {
      return (
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          onClick={() => {
            // Handle button click action (e.g., navigate to the link)
            window.open(message, "_blank");
          }}
        >
          Video Call Link
        </button>
      );
    }

    return null; // Return null if there is no link
  };

  const setUpChat = async () => {
    await PreviousChat(senderdetails.id, recipientDetails.id).then(
      (response) => {
        if (response.status == 200) {
          setMessages(response.data);
        }
      }
    );
    const client = new W3CWebSocket(
      `${wsurl}ws/chat/${senderdetails.id}/?${recipientDetails.id}`
    );
    setClientState(client);
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);

      if (dataFromServer) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: dataFromServer.message,
            sender_email: dataFromServer.senderUsername,
          },
        ]);
      }
    };

    client.onclose = () => {
      console.log("Websocket disconnected", event.reason);
    };

    return () => {
      client.close();
    };
  };

  useEffect(() => {
    if (senderdetails.id != null && recipientDetails.id != null) {
      setUpChat();
    }
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
      messageRef.current.focus();
    }
    // Scroll to the last message when the component is opened
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [senderdetails, recipientDetails]);

  return (
    <>
      <div className="w-2/3 h-[41rem]  bg-gray-50 border-[1px] border-gray-400">
        <div className="w-full bg-blue-gray-50 gap-8 h-[5rem] grid grid-cols-5 rounded-sm shadow-md shadow-gray-300">
          {recipientDetails.profile_img ? (
            <img
              src={recipientDetails.profile_img}
              className="w-[3.5rem] h-[3.5rem] rounded-full mt-3 ml-5 hover:bg-blue-gray-100 hover:cursor-pointer"
              alt="user_img"
              onClick={() =>
                navigate(`/User/authorprofile/`, {
                  state: { authorId: recipientDetails.id },
                })
              }
            />
          ) : (
            <svg
              className="w-[3.5rem] h-[3.5rem] cursor-pointer rounded-full mt-3 ml-5 hover:bg-blue-gray-100 hover:cursor-pointer text-gray-300 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              onClick={() =>
                navigate(`/User/authorprofile/`, {
                  state: { authorId: recipientDetails.id },
                })
              }
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          )}
          <div className="col-span-3">
            <p
              className="mt-4 -ml-10 cursor-pointer font-semibold text-lg"
              onClick={() =>
                navigate(`/User/authorprofile/`, {
                  state: { authorId: recipientDetails.id },
                })
              }
            >
              {recipientDetails.first_name + " " + recipientDetails.last_name}
            </p>
            <p className="text-sm mt-1 -ml-10 text-gray-500">
              Active few minutes ago
            </p>
          </div>
          <div className="col-span-1 mt-5 flex gap-4 ">
            <AddIcCallOutlinedIcon
              className="hover:bg-blue-gray-100 rounded-full hover:cursor-pointer"
              fontSize="large"
            />
            <VideocamOutlinedIcon
              className="hover:bg-blue-gray-100 rounded-full hover:cursor-pointer"
              fontSize="large"
              onClick={handlevideoClick}
            />
          </div>
        </div>

        <div
          className="w-full  hidescroll h-[32rem] overflow-y-auto mb-5 scroll-smooth"
          style={{ backgroundImage: `url(${Chatbg})` }}
          ref={lastMessageRef}
        >
          {
            messages.length > 0
              ? messages.map((message, index) => (
                  <>
                    <div
                      className={`flex mt-10 ${
                        message.sender_email === userinfo.email
                          ? "justify-end"
                          : "justify-start"
                      }`}
                      key={index}
                      ref={index === messages.length - 1 ? lastMessageRef : null}
                    >
                      {message.sender_email !== userinfo.email && (
                        <img
                          src={
                            recipientDetails?.profile_img
                              ? recipientDetails.profile_img
                              : Userico
                          }
                          className="w-12 h-12 rounded-full mt-6 ml-2"
                          alt="user_img"
                        />
                      )}
                      <div
                        className={`rounded-t-xl mt-5 max-w-2xl  min-h-[2.5rem] w-auto h-auto ${
                          message.sender_email === userinfo.email
                            ? "bg-[#5bdb6c] hover:cursor-pointer mr-2 rounded-bl-xl"
                            : "bg-[#218aff] ml-2  rounded-br-xl"
                        }`}
                      >
                        <p className="ml-3 mr-3 mt-2 mb-2">
                          {message.sender_email === userinfo.email ? (
                            renderButtonIfLink(message.message) ? (
                              <span className="text-black font-bold">
                                Video Call Request Has Been Sent
                              </span>
                            ) : (
                              message.message
                            )
                          ) : renderButtonIfLink(message.message) ? (
                            renderButtonIfLink(message.message)
                          ) : (
                            message.message
                          )}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`text-xs mt-2 text-gray-800 ${
                        message.sender_email === userinfo.email
                          ? "float-right mr-5"
                          : "ml-16"
                      }`}
                    >
                      {timeAgo(message.timestamp) == "NaN years ago"
                        ? "just now"
                        : timeAgo(message.timestamp)}
                    </p>
                  </>
                ))
              : ""
            // <p className="mt-4  font-semibold text-5xl">Chat not started </p>
          }

          {/* <div className="flex mt-5 justify-end">
            <div className="rounded-t-xl rounded-bl-xl mt-5 max-w-2xl w-auto h-auto min-h-[2.5rem] bg-[#5bdb6c] mr-2">
              <p className="ml-2 mr-2 mt-1 mb-1">hi how are you asdfasdfasd asdf asd asdf asd f asdf asd f asdf as df adsf asd fas df dsf sdf asdfasdfasdfasdfasdf</p>
            </div>
          </div>
          <p className="text-xs mt-2 float-right mr-5 text-gray-500">
                21 12 2023
           </p> */}
        </div>

        <div className="bg-gray-200 rounded-lg ml-1 mr-1 -mt-5">
          <form>
            <label for="chat" class="sr-only">
              Your message
            </label>
            <div class="flex items-center px-3 py-2 rounded-lg  ">
              <button
                type="button"
                class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100"
              >
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    fill="currentColor"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                </svg>
                <span class="sr-only">Upload image</span>
              </button>
              <button
                type="button"
                class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 "
              >
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                  />
                </svg>
                <span class="sr-only">Add emoji</span>
              </button>
              <input
                id="chat"
                rows="1"
                ref={messageRef}
                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Your message..."
              />
              <button
                type="submit"
                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 "
                onClick={onButtonClicked}
              >
                <svg
                  class="w-5 h-5 rotate-90 rtl:-rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                {/* <span class="sr-only">Send message</span> */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Chatfield;
