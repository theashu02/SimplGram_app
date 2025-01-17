import Lottie from "react-lottie";
import { animationDefaultOptions } from "../../../lib/utils"

export default function EmptyChatContainer() {
  return (
    <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
      {/* //fix this issue */}
      <Lottie
        isClickToPauseDisabled={true}
        style={{ height: 200, width: 200 }}
        options={animationDefaultOptions}
      />
      <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
        <h3 className="poppins-medium">
          Hi<span className="text-purple-500">! </span>
          Welcome to
          <span className="to-purple-500"> SimpL </span>
          <span className="text-purple-500">Gram</span>
        </h3>
      </div>
    </div>
  );
}
