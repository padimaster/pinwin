// SocketProvider.jsx

import { createContext, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

export const SocketContext = createContext({ socket: null } as any);

const SocketProvider: any = ({ children }: any) => {
  // we use a ref to store the socket as it won't be updated frequently
  const socketRef = useRef<any>(null);
  const SOCKET_SERVER_URL = "http://localhost:4000";

  socketRef.current = socketIOClient(SOCKET_SERVER_URL);
  
  // When the Provider mounts, initialize it 👆
  // and register a few listeners 👇

  useEffect(() => {
    socketRef.current.on("connect", () => {
      console.log("SocketIO: Connected and authenticated");
    });

    socketRef.current.on("error", (msg: string) => {
      console.error("SocketIO: Error", msg);
    });

    // Remove all the listeners and
    // close the socket when it unmounts
    return () => {
      if (socketRef && socketRef.current) {
        socketRef.current.removeAllListeners();
        socketRef.current.close();
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
