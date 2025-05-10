import { createContext, useState } from "react";

export const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [message, setMessage] = useState({});

  const showMessage = ({ title, text, type }) => {
    setMessage({ title, text, type });
    setTimeout(() => {
      setMessage({});
    }, 1000);
  };

  return (
    <MessageContext.Provider value={{ message, showMessage, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
}
