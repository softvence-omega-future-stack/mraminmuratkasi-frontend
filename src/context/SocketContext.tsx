import React, { createContext, useContext, useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";
import { useGetChatListQuery } from "@/redux/api/chatApi";
import { useAppDispatch } from "@/redux/hooks";
import { baseApi } from "@/redux/api/baseApi";

interface SocketContextType {
  socket: WebSocket | null;
  isConnected: boolean;
  totalUnseenCount: number;
  refetchChatList: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [totalUnseenCount, setTotalUnseenCount] = useState(0);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

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
      if (socket) {
        socket.close();
      }
      return;
    }

    let ws: WebSocket | null = null;
    let reconnectionTimeout: NodeJS.Timeout;
    let retryCount = 0;
    const maxRetries = 5;

    const connect = () => {
      const wsUrl = `wss://unfall-update.de/api/v1?token=${token}`;
      console.log(`[Global Socket] Connecting... (Attempt ${retryCount + 1})`);
      
      ws = new WebSocket(wsUrl);
      setSocket(ws);

      ws.onopen = () => {
        console.log("[Global Socket] Connected");
        setIsConnected(true);
        retryCount = 0;
      };

      const handleGlobalMessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          console.log("[Global Socket] Message:", data);
          
          // Use Redux tag invalidation to trigger automatic refetching of all related queries
          dispatch(baseApi.util.invalidateTags(["Message"]));
        } catch (error) {
          console.error("[Global Socket] Parse Error:", error);
        }
      };

      ws.addEventListener("message", handleGlobalMessage);

      ws.onerror = () => {
        setIsConnected(false);
      };

      ws.onclose = (event) => {
        setIsConnected(false);
        setSocket(null);
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
      if (ws) {
        ws.removeEventListener("message", () => {}); // Cleanup doesn't really work this way with anonymous funcs but close is better
        ws.close();
      }
      if (reconnectionTimeout) clearTimeout(reconnectionTimeout);
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, totalUnseenCount, refetchChatList }}>
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
