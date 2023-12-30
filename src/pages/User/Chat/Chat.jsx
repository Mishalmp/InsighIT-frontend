import React, { useEffect, useRef, useState } from "react";
import Chatfield from "../../../components/Chat/Chatfield";
import ChatUserlist from "../../../components/Chat/ChatUserlist";
// import Userico from "../../assets/user2img.png";


import { useSelector } from "react-redux";
import chatimg from '../../../assets/Work chat-cuate.svg'

function Chat() {
  const { userinfo } = useSelector((state) => state.user);
  
  const [recipientDetails, setRecipientDetails] = useState(null);

  useEffect(()=>{
    document.title="InsighIT | Chat";
  },[])

  return (
    <>

      <div className="flex m-5 mt-0 mb-2 shadow-2xl">
        <ChatUserlist
          userinfo={userinfo}
          setRecipientDetails={setRecipientDetails}
        />
        {recipientDetails ? (
          <Chatfield userinfo={userinfo} recipientDetails={recipientDetails} />
        ) : (
          <div className="w-2/3 h-[41rem] bg-gray-50 border-[1px] border-gray-400">
            
            <h1 className="text-5xl font-bold text-center mt-10">Select Chat</h1>

            <img src={chatimg} className="w-[35rem] h-[35rem] ml-48 mt-10" alt="chat img" />

          </div>
        )}
      </div>
    </>
  );
}

export default Chat;
