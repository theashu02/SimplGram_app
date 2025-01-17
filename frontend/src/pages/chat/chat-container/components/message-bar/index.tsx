import { useState, useRef, useEffect } from "react";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSendOutline } from "react-icons/io5";
import EmojiPicker, { Theme } from "emoji-picker-react"

export default function MessageBar() {
  const emojiRef = useRef<HTMLDivElement | null>(null);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [message, setMessage] = useState("");


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
      setEmojiPickerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {};

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-4 sm:px-6 md:px-8 mb-4 sm:mb-6 gap-4 sm:gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-3 sm:gap-5 pr-4 sm:pr-5">
        <input
          type="text"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-3 sm:p-4 bg-transparent rounded-md focus:outline-none"
        />
        <button className="text-neutral-500 hover:text-white focus:outline-none transition-colors duration-300">
          <GrAttachment className="text-xl sm:text-2xl" />
        </button>
        <div className="relative">
          <button
            className="text-neutral-500 hover:text-white focus:outline-none transition-colors duration-300"
            onClick={() => setEmojiPickerOpen(true)}
          >
            <RiEmojiStickerLine className="text-xl sm:text-2xl" />
          </button>
          <div className="absolute bottom-full right-0 mb-2" ref={emojiRef}>
            <EmojiPicker
              theme={Theme.DARK}
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button className="bg-[#8417ff] rounded-md flex items-center justify-center p-3 sm:p-4 focus:outline-none hover:bg-[#741bda] transition-colors duration-300">
        <IoSendOutline
          className="text-xl sm:text-2xl"
          onClick={handleSendMessage}
        />
      </button>
    </div>
  );
}
