"use client";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:3001"); // Replace with your server URL

export default function ChatComponent() {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    // Listen for incoming messages
    // SUB
    console.log("socket is sending me stuff");
    socket.on("chat message", (message) => {
      console.log("message", message);
      setMessages((prevMessages: string[]) => [...prevMessages, message]);
      // const prevMsg = messages;
      // console.log("prevMsg", prevMsg);
      // prevMsg.push(message);
      // setMessages(prevMsg);
    });
  }, []);

  // PUB
  const sendMessage = () => {
    console.log("newMessage SENT", newMessage);
    socket.emit("chat message", newMessage);
    setNewMessage("");
  };
  console.log(messages);
  return (
    <>
      <div>
        {messages.map((message, index) => (
          <div className="flex flex-row items-center space-x-2" key={index}>
            <Avatar className="h-[50px] w-[50px]">
              <AvatarImage src={""} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Card className="max-w-md">
              <CardHeader>
                <CardDescription>{message}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </>
  );
}
