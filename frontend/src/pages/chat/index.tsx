import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store";
import { useEffect } from "react";
import { toast } from "sonner";
import ChatContainer from "./chat-container";
import EmptyChatContainer from "./empty-chat-container";
import ContactContainer from "./contacts-container";

export default function Chat() {
  const { userInfo, selectedChatType } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    // ----> this line can make mistake in the application
    if (!userInfo?.profileSetup) {
      toast("Please setup profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactContainer />
      {selectedChatType === undefined ? (
        <EmptyChatContainer />
      ) : (
        <ChatContainer />
      )}
      {/* <EmptyChatContainer /> */}
      {/* <ChatContainer /> */}
    </div>
  );
}
