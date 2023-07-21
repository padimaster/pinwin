// SocketProvider.jsx

import { createContext, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

export const SocketContext = createContext({ socket: null } as any);

const SocketProvider: React.FC = ({ children }: any) => {
  // we use a ref to store the socket as it won't be updated frequently
  const socket = useRef(socketIOClient("https://server-domain.com"));

  // When the Provider mounts, initialize it 👆
  // and register a few listeners 👇

  useEffect(() => {
    socket.current.on("connect", () => {
      console.log("SocketIO: Connected and authenticated");
    });

    socket.current.on("error", (msg: string) => {
      console.error("SocketIO: Error", msg);
    });

    // Remove all the listeners and
    // close the socket when it unmounts
    return () => {
      if (socket && socket.current) {
        socket.current.removeAllListeners();
        socket.current.close();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socket.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
