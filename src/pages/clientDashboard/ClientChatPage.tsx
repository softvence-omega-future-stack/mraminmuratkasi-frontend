"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Send, Paperclip, Search } from "lucide-react";
import ClientDashboardLayout from "@/Layout/ClientDashboardLayout";
import { useGetChatListQuery, useGetConversationQuery } from "@/redux/api/chatApi";

interface Message {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  time: string;
  isOwn: boolean;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}



export default function ClientChatPage() {
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch Chat List
  const { data: chatListData, isLoading: isChatListLoading } = useGetChatListQuery(undefined);
  
  // Fetch Conversation
  const { data: conversationData, isLoading: isConversationLoading } = useGetConversationQuery(activeChat?.id, {
    skip: !activeChat?.id,
  });

  // Derived state for chats
  const chatList = Array.isArray(chatListData) ? chatListData : chatListData?.data || [];
  const chats: Chat[] = chatList.map((chat: any) => ({
    id: chat.userId,
    name: chat.name,
    avatar: chat.img || "https://ammachilabs.org/wp-content/uploads/2023/11/male.jpeg",
    lastMessage: chat.lastMessage,
    time: new Date(chat.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    unread: chat.unseenCount,
  }));

  // Derived state for messages
  const conversation = conversationData?.data || conversationData;
  const rawMessages = conversation?.messages || [];
  
  const messages: Message[] = rawMessages.map((msg: any) => ({
    id: msg._id,
    sender: msg.sentByMe ? "You" : conversation?.chatWith?.name,
    avatar: msg.sentByMe 
      ? "https://ammachilabs.org/wp-content/uploads/2023/11/male.jpeg" 
      : (activeChat?.avatar || "/placeholder.svg"),
    text: msg.text,
    time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isOwn: msg.sentByMe,
  }));

  // Set first chat as active initially if available and none selected
  useEffect(() => {
    if (!activeChat && chats.length > 0) {
      setActiveChat(chats[0]);
    }
  }, [chats, activeChat]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Optimistic update or waiting for mutation - user asked for chat list/get conversation api implementation first. 
    // Assuming send message will be implemented later or we just mock local add for now? 
    // The user didn't provide send message API. I will leave the local state update for now but it won't persist without API.
    // Ideally we need a sendMessage mutation.
    
    // const message: Message = {
    //   id: Date.now().toString(),
    //   sender: "You",
    //   avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    //   text: newMessage,
    //   time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    //   isOwn: true,
    // };
    // setMessages([...messages, message]); // This won't work directly as messages is derived from query data now.
    
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ClientDashboardLayout>
      <div className=" bg-white rounded-[24px] p-6">
        <h2 className="text-lg font-semibold text-black mb-6">
          Chats
        </h2>
        <div className="flex gap-6 h-[calc(100vh-250px)]">
          {/* Chat List */}
          <div
            className={`w-full md:w-96 bg-white border border-[#F1F2F2] p-5 rounded-[12px] overflow-y-auto ${
              isMobileMenuOpen ? "block" : "hidden md:block"
            }`}
          >
            <div className="">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pb-3 pt-3.5 pl-10 pr-4.5 bg-[#F6F6F6] rounded-[30px] text-sm text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="divide-y divide-gray-100 space-y-0.5">
              {isChatListLoading ? (
                <div className="p-4 text-center text-gray-500">Loading chats...</div>
              ) : filteredChats.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No chats found</div>
              ) : (
                filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => {
                    setActiveChat(chat);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors cursor-pointer rounded-[8px] ${
                    activeChat?.id === chat.id ? "bg-[#E8F2F8] p-2" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={chat.avatar || "/placeholder.svg"}
                        alt={chat.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {chat.unread > 0 && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#0FE16D] text-white rounded-full text-xs flex items-center justify-center font-semibold">
                          {/* {chat.unread} */}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-black font-medium truncate">
                          {chat.name}
                        </p>
                        <span className="text-xs text-gray-500 font-normal flex-shrink-0">
                          {chat.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400 font-normal truncate">
                          {chat.lastMessage}
                        </p>
                        {chat.unread > 0 && (
                          <span className="w-5.5 h-5.5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-semibold">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              )))}
            </div>
          </div>

          {/* Chat Window */}
          <div
            className={`flex-1 flex-col bg-white border border-[#F1F2F2] rounded-[12px] p-5 ${
              isMobileMenuOpen ? "hidden md:flex" : "flex"
            }`}
          >
            {/* Mobile Header */}
            <div className="md:hidden p-4 border-b border-[#F1F2F2] flex items-center justify-between bg-white">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h3 className="font-semibold text-gray-900">{activeChat?.name || "Select Chat"}</h3>
              <div className="w-6" />
            </div>

            {/* Chat Header */}
            {activeChat ? (
            <div className="hidden md:flex px-5 pt-4 pb-3 border-b border-gray-200 items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={activeChat.avatar || "/placeholder.svg"}
                    alt={activeChat.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <p className="font-medium text-black font-inter">
                    {activeChat.name}
                  </p>
                  <p className="text-xs text-green-600 font-medium font-inter">
                    Active now
                  </p>
                </div>
              </div>
            </div>
            ) : (
                <div className="hidden md:flex px-5 pt-4 pb-3 border-b border-gray-200 items-center justify-between">
                    <p className="font-medium text-gray-500">Select a chat to start messaging</p>
                </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {isConversationLoading ? (
                 <div className="flex h-full items-center justify-center">
                    <p className="text-gray-500">Loading messages...</p>
                 </div>
              ) : messages.length === 0 ? (
                 <div className="flex h-full items-center justify-center">
                    <p className="text-gray-500">No messages found</p>
                 </div>
              ) : (
                messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isOwn ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-end space-x-2 max-w-xs md:max-w-md lg:max-w-lg ${
                      message.isOwn ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    {/* {!message.isOwn && (
                      <img
                        src={message.avatar || "/placeholder.svg"}
                        alt={message.sender}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                    )} */}
                    <div
                      className={`${
                        message.isOwn ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`inline-block px-4 py-2 rounded-2xl ${
                          message.isOwn
                            ? "bg-[#1878B5] text-white rounded-br-none"
                            : "bg-[#E8F2F8] text-gray-900 rounded-bl-none shadow-sm border border-gray-100"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">
                          {message.text}
                        </p>
                      </div>
                      {/* <p className="text-xs text-gray-500 mt-1 px-1">
                        {message.time}
                      </p> */}
                    </div>
                  </div>
                </div>
              )))}
            </div>

            {/* Message Input */}
            <div className="p- border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-5 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all mt-4">
                <button className="text-gray-500 hover:text-gray-700 transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 outline-none text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={`text-blue-600 hover:text-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    newMessage.trim() ? "hover:scale-105" : ""
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientDashboardLayout>
  );
}
