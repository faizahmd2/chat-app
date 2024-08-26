export type Schema = {
    users: Users,
    conversations: Conversations,
    messages: Messages,
    chats: Chats
}

type Chats = {
    id: string
    createrId: string
    recieverId: string | null
    createdAt: string
}

type Users = {
    id: string
    name: string
    username: string
    avatarUrl: string
    status: number
    createdAt: string
}

type Conversations = {
    id: string
    participantIds: string
    lastMessage: string
}

type Messages = {
    id: string
    conversationId: string
    senderId: string
    text: string
    createdAt: string
    status: status
}

type status = 'sent' | 'delivered' | 'seen'
