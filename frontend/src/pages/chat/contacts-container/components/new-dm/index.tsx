import { useState } from "react";
// import { Button } from "../../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "../../../../../components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../../components/ui/tooltip";
import { Avatar, AvatarImage } from "../../../../../components/ui/avatar";
import { FaPlus } from "react-icons/fa";
import { Input } from "../../../../../components/ui/input";
// import Lottie2 from "react-lottie";
import { getColor } from "../../../../../lib/utils";
import apiClient from "../../../../../lib/api-client";
import { HOST, SEARCH_CONTACTS_ROUTES } from "../../../../../utils/constants";
import { ScrollArea } from "../../../../../components/ui/scroll-area";
import { useAppStore } from "../../../../../store";

export default function NewDM() {
  const { setSelectedChatData, setSelectedChatType } = useAppStore();
  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  interface Contact {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    color: number;
    // add other properties if needed
  }

  const [searchedContact, setSearchedContact] = useState<Contact[]>([]);

  const searchContacts = async (searchTerm: string) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACTS_ROUTES,
          { searchTerm },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data.contacts) {
          setSearchedContact(response.data.contacts);
        }
      } else {
        setSearchedContact([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectNewContact = (contact: Contact) => {
    setOpenNewContactModel(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchedContact([]);
  };
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-thin text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="bg-[#1c1b1e] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contact"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>
          {searchedContact.length > 0 && (
            <ScrollArea className="h-[250px]">
              <div className="rounded-lg p-6 bg-[#2c2e3b] border-none">
                {searchedContact.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={() => selectNewContact(contact)}
                  >
                    {/* //div */}
                    <div className="w-12 h-12 relative">
                      <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                        {contact.image ? (
                          <AvatarImage
                            src={`${HOST}/${contact.image}`}
                            alt="profile"
                            className="object-cover w-full h-full bg-black"
                          />
                        ) : (
                          <div
                            className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                              contact.color
                            )}`}
                          >
                            {contact.firstName
                              ? contact.firstName.split("").shift()
                              : contact.email.split("").shift()}
                          </div>
                        )}
                      </Avatar>
                    </div>
                    <div className="flex flex-col">
                      <span>
                        {contact.firstName && contact.lastName
                          ? `${contact.firstName} ${contact.lastName}`
                          : contact.email}
                      </span>
                      <span className="text-xs">{contact.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {searchedContact.length <= 0 && (
            <div className="flex-1 md:bg-[m#lcid25] md:flex mt-5 flex-col justify-center items-center duration=1000 transition-all">
              {/* <Lottie2
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultOptions}
              /> */}
              <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2x1 text-x1 transition-all duration=300 text-center">
                <h3 className="poppins-medium">
                  Hi<span className="text-purple-500"></span> Search new
                  <span className="text-purple-500"> Contact, </span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
