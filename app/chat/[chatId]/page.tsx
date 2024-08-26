'use client'

import ChatComponent from "../../components/ChatComponent";
import { db } from "../../services/instantdbService";
import { useParams } from 'next/navigation'
import MyLoader from "../../components/loader";
import { ExpansionPanel, MainContainer, Sidebar } from "@chatscope/chat-ui-kit-react";
import ConversationListing from "../../components/conversationListing";

function ChatPage() {
    const { user, isLoading } = db.useAuth();
    const params = useParams<{ chatId: string; }>()
    const { chatId } = params;

    if(isLoading) return <MyLoader />

    // return <ChatComponent conversationId={chatId} currentUserId={user.id} />

    return (
        <div style={{ position:"relative", height: "97vh" }}>
            <MainContainer responsive>
                <Sidebar position="left">
                    <ConversationListing currentUserId={user.id} activeChatId={chatId} />
                </Sidebar>
                <ChatComponent conversationId={chatId} currentUserId={user.id} />
                {/* <Sidebar position="right">
                    <ExpansionPanel open title="INFO">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, porro.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, porro.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, porro.</p>
                    </ExpansionPanel>
                </Sidebar> */}
            </MainContainer>
        </div>
    )
}

export default ChatPage;