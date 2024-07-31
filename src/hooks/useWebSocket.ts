import {useEffect, useRef, useState} from 'react';

export const useWebSocket = (url: string, open: boolean) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (open) {
      socket.current = new WebSocket(url);

      socket.current.onopen = () => {
        console.log('WebSocket connection opened');
      };

      socket.current.onmessage = event => {
        const newMessage = event.data;
        setMessages(prevMessages => [...prevMessages, newMessage]);
      };

      socket.current.onerror = error => {
        console.error('WebSocket error:', error);
      };

      socket.current.onclose = () => {
        console.log('WebSocket connection closed');
      };

      return () => {
        if (socket.current) {
          socket.current.close();
        }
      };
    }
  }, [open, url]);

  const sendMessage = (message: string) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(message);
    } else {
      console.error('WebSocket is not open');
    }
  };

  const wsState = () => {
    if (socket.current) {
      return socket.current.readyState;
    }
    return null;
  };

  const closeSocket = () => {
    if (socket.current) {
      socket.current.close();
    }
  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
    closeSocket,
    wsState,
  };
};
