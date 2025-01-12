import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store"
import { useEffect } from "react";
import {toast} from "sonner"


export default function Chat() {
  const {userInfo} = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    // ----> this line can make mistake in the application
    if(!userInfo?.profileSetup){
      toast("Please setup profile to continue.")
      navigate("/profile")
    }
  }, [userInfo, navigate])
  return (
    <div>chhaaat</div>
  )
}
