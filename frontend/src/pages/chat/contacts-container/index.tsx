import { TbMessageChatbotFilled } from "react-icons/tb";
import ProfileInfo from "./components/profile-info";
import NewDM from "./components/new-dm";

export default function ContactContainer() {
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border border-[#2f303b] w-full">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDM />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
}

const Logo = () => {
  return (
    <div
      className="flex p-5 justify-start items-center gap-2"
      // style={{
      //   background:
      //     "linear-gradient(45deg, #4c1d95, #6d28d9)",
      //   padding: "10px",
      //   borderRadius: "50%",
      //   display: "inline-block",
      // }}
    >
      <TbMessageChatbotFilled size={50} color="lightgray" />
      <span className="font-semibold text-3xl">SimpLGram</span>
    </div>
  );
};

const Title = ({ text }: { text: string }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};
