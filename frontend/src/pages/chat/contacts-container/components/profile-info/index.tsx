import { Avatar, AvatarImage } from "../../../../../components/ui/avatar";
import { useAppStore } from "../../../../../store";
import { HOST, LOGOUT_ROUTE } from "../../../../../utils/constants";
import { getColor } from "../../../../../lib/utils";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../../../../../components/ui/tooltip";
// import { Button } from "../../../../../components/ui/button";
import { FiEdit2 } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../../../lib/api-client";

export default function ProfileInfo() {
  const {userInfo,setUserInfo} = useAppStore();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await apiClient.post(LOGOUT_ROUTE, {}, {withCredentials: true})
      if(response.status === 200){
        navigate("/auth")
        setUserInfo(undefined);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between p-10 w-full bg-[#2a2b33] ">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {userInfo?.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo?.image}`}
                alt="User Avatar"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`h-12 uppercase w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo?.firstName
                  ? userInfo?.firstName.charAt(0)
                  : userInfo?.email.charAt(0)}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo?.firstName && userInfo.lastName
            ? `${userInfo?.firstName} ${userInfo?.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                onClick={() => navigate("/profile")}
                className="text-purple-500 text-xl font-medium"
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoLogOutOutline
                onClick={logout}
                className="text-red-300 text-xl font-medium"
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
