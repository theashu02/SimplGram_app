import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../../store";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { colors, getColor } from "../../lib/utils";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import apiClient from "../../lib/api-client";
import { HOST, UPDATE_PROFILE_ROUTE } from "../../utils/constants";
import { ADD_PROFILE_IMAGE_ROUTE } from "../../utils/constants";
import { ChangeEvent } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [hovered, setHovered] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (userInfo?.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
    if (userInfo?.image) {
      setImage(`${HOST}/${userInfo.image}`);
    }
  }, [userInfo]);

  const vaildateProfile = () => {
    if (!firstName) {
      toast.error("Please enter first name");
      return false;
    }
    if (!lastName) {
      toast.error("Please enter last name");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (vaildateProfile()) {
      // alert("success")
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, color: selectedColor },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data });
          toast.success("Profile updated successfully");
          navigate("/chat");
        }
      } catch (error) {
        console.log({ error });
        toast.error("Failed to update profile. Please try again");
      }
    }
  };

  const handleNavigate = () => {
    if (userInfo?.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please setup profile");
    }
  };

  const handleFileInputClick = () => {
    // alert("click");
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log({ file });
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);

      try {
        const response = await apiClient.post(
          ADD_PROFILE_IMAGE_ROUTE,
          formData,
          {
            headers: { Authorization: `Bearer ${userInfo}` },
            withCredentials: true,
          }
        );
        console.log(response);
        if (response.status === 200 && response.data.image) {
          // Update the userInfo with the new image
          // @ts-expect-error: userInfo may not have an image property
          setUserInfo({ ...userInfo, image: response.data.image });
          toast.success("Image updated successfully");
        }
      } catch (error) {
        toast.error("Failed to update image. Please try again.");
        console.log(error);
      }
    }
  };

  const handleDeleteImage = async () => {};

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack
            className="text-4xl lg:text-6xl text-white/90 cursor-pointer"
            onClick={handleNavigate}
          />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="User Avatar"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`h-32 uppercase w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {firstName ? firstName.charAt(0) : userInfo?.email.charAt(0)}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full"
                onClick={image ? handleDeleteImage : handleFileInputClick}
              >
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              name="profile-image"
              accept=".png, .jpeg, .svg, .webp"
            />
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo?.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="First Name"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, idx) => (
                <div
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                    selectedColor === idx
                      ? "outline outline-white/50 outline-1"
                      : ""
                  }}`}
                  key={idx}
                  onClick={() => setSelectedColor(idx)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
