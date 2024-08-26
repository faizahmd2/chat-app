'use client'

import { ChatContainer, MainContainer, Sidebar } from "@chatscope/chat-ui-kit-react";
import ConversationListing from "../components/conversationListing";
import { db } from "../services/instantdbService";
import { BeatLoader } from "react-spinners";
import useDeviceType from "../services/useDeviceType";


function ChatBox() {
    const { user, isLoading } = db.useAuth();
    const isMobile = useDeviceType();

    if(isLoading) return <BeatLoader />

    return <>
        { isMobile && 
        <div style={{ position:"relative", height: "97vh" }}>
            <ConversationListing currentUserId={user.id} activeChatId={null} />
        </div>
        }
        {
            !isMobile && 
            <div style={{ position:"relative", height: "97vh" }}>
                <MainContainer responsive>
                    <Sidebar position="left">
                        <ConversationListing currentUserId={user.id} activeChatId={null} />
                    </Sidebar>
                    <ChatContainer>
                        
                    </ChatContainer>
                </MainContainer>
            </div>
        }
    </> 
}

export default ChatBox;