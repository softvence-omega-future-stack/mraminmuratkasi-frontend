import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";
import { useGetChatListQuery } from "@/redux/api/chatApi";

interface SocketContextType {
  socket: WebSocket | null;
  isConnected: boolean;
  totalUnseenCount: number;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [totalUnseenCount, setTotalUnseenCount] = useState(0);
  const socketRef = useRef<WebSocket | null>(null);
  const token = useAppSelector(selectToken);

  const { data: chatListData, refetch: refetchChatList } = useGetChatListQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (chatListData) {
      const chats = Array.isArray(chatListData) ? chatListData : chatListData?.data || [];
      const total = chats.reduce((acc: number, chat: any) => acc + (chat.unseenCount || 0), 0);
      setTotalUnseenCount(total);
    }
  }, [chatListData]);

  useEffect(() => {
    if (!token) {
      if (socketRef.current) {
        socketRef.current.close();
      }
      return;
    }

    let socket: WebSocket | null = null;
    let reconnectionTimeout: NodeJS.Timeout;
    let retryCount = 0;
    const maxRetries = 5;

    const connect = () => {
      const wsUrl = `wss://unfall-update.de/api/v1?token=${token}`;
      console.log(`[Global Socket] Connecting... (Attempt ${retryCount + 1})`);
      
      socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("[Global Socket] Connected");
        setIsConnected(true);
        retryCount = 0;
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("[Global Socket] Message:", data);
          
          // Refetch chat list to update previews and unseen counts
          refetchChatList();
        } catch (error) {
          console.error("[Global Socket] Parse Error:", error);
        }
      };

      socket.onerror = () => {
        setIsConnected(false);
      };

      socket.onclose = (event) => {
        setIsConnected(false);
        if (!event.wasClean && retryCount < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
          reconnectionTimeout = setTimeout(() => {
            retryCount++;
            connect();
          }, delay);
        }
      };
    };

    connect();

    return () => {
      if (socket) socket.close();
      if (reconnectionTimeout) clearTimeout(reconnectionTimeout);
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, isConnected, totalUnseenCount }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
