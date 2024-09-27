import ChatBox from "@/components/ChatBox";
import MyChats from "@/components/MyChats";
import SideDrawer from "@/components/SideDrawer";
import { RootState, useAppSelector } from "@/redux/store";
import { Box } from "@chakra-ui/react";
import React from "react";

const Chat = () => {
  const { token } = useAppSelector((state: RootState) => state.user.userData);
  return (
    <div style={{ width: "100%" }}>
      {token && <SideDrawer />}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        w={"100%"}
        h={"91.5vh"}
        p={"10px"}
      >
        {token && <MyChats />}
        {token && <ChatBox />}
      </Box>
    </div>
  );
};

export default Chat;
