import { Avatar, Conversation, ConversationList, Search } from "@chatscope/chat-ui-kit-react";
import { Messages, status, Users } from "../../types/schema";
import { db, tx} from "../services/instantdbService";
import { getMessageTime } from "../services/utility";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { BeatLoader } from "react-spinners";

interface ConversationListingProps {
    currentUserId: string;
    activeChatId: string | null
}

function ConversationListing(props: ConversationListingProps) {
    const router = useRouter();
    const { data, isLoading } = db.useQuery({chats: {"$": {
            "where": {
                "or":[
                    {"createrId": props.currentUserId},
                    {"recieverId": props.currentUserId}
                ]
            }
        }}, users: {}})
    const [loader, setLoader] = useState(false)

    if(loader) return <BeatLoader />

    let conversationIds = ["-1"], uIds = ["-1"];

    if(data && data.chats && data.chats.length) {
        data.chats.forEach(c=> {
            if(c.recieverId) {
                uIds.push(c.createrId)
                uIds.push(c.recieverId)
                conversationIds.push(c.id)
            }
        })
    }

    const { data: findChat, isLoading: loadingFindChat } = db.useQuery({ users: { "$": { "where": { "id": { "in": uIds } } } }, messages: {"$":{"where":{"conversationId":{"in":conversationIds}},"order":{"serverCreatedAt":"desc"}}}})

    if(isLoading || loadingFindChat) return <BeatLoader />
    const users = data.users;
    const messages = findChat.messages;

    const chatData = data.chats.map(c=> {
        if(c.recieverId === null) return null;

        let status:status;
        let chatObj = { lastSenderName: null, id:c.id, message: null, profileImage: 'https://avatar.iran.liara.run/public', title: "Unknown User", preview: "", status: status, time: new Date().toString(), isCreator: c.createrId === props.currentUserId}
        let endUser = users.find(u=> u.id === (props.currentUserId === c.createrId ? c.recieverId : c.createrId));

        if(endUser) {
            if(endUser.avatarUrl) chatObj['profileImage'] = endUser.avatarUrl;
            chatObj['title'] = endUser.name;
        };
         
        messages.reverse();
        let message = messages.find(e=> e.conversationId === c.id)
        if(message) {
            chatObj['preview'] = message.text;
            chatObj['status'] = message.status;
            chatObj['time'] = message.createdAt.toString();
            if(message.senderId !== props.currentUserId && message.status === "sent") chatObj.message = message;
            if(message.senderId === props.currentUserId) chatObj['lastSenderName'] = "You";
            else chatObj['lastSenderName'] = endUser.name;
        }

        chatObj['time'] = getMessageTime(chatObj['time'])

        return chatObj
    }).filter(d => d);

    const handleRecentChatClick = (chatId: string, message: Messages) => {
        setLoader(true)
        if(message) {
            message.status = 'seen';
            db.transact([
                tx.messages[message.id].update(message)
            ])
        }
        router.push(`/chat/${chatId}`);
        setLoader(false)
    }


    return <>
    <Search placeholder="Search..." />
    {chatData.map((chat, index) => (<>
        <ConversationList>
            <Conversation
                info={chat.preview}
                lastSenderName={chat.lastSenderName}
                name={chat.title}
                onClick={() => handleRecentChatClick(chat.id, chat.message)}
                active={chat.id === props.activeChatId}
            >
                <Avatar
                    name={chat.title}
                    src={chat.profileImage}
                />
            </Conversation>
        </ConversationList>
        </>
    ))}
    {!chatData.length && <div style={{textAlign: 'center', marginTop: '.5vw'}}>No Chat Available</div>}
</>
}

export default ConversationListing;