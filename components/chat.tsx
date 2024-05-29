"use client";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

const socket = io("http://localhost:3001"); // Replace with your server URL

export default function ChatComponent(data: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  console.log("USER", data);
  useEffect(() => {
    // Listen for incoming messages
    // SUB
    socket.on("chat message", (message) => {
      setMessages((prevMessages: any[]) => [...prevMessages, message]);
    });
  }, []);

  // PUB
  const sendMessage = () => {
    const payload = {
      content: newMessage,
      userProfileImage: data.data.image,
      userName: data.data.name,
    };
    console.log(payload);
    socket.emit("chat message", payload);
    setNewMessage("");
  };
  return (
    <>
      <div>
        {messages.map((message, index) => (
          <div className="flex flex-row items-center space-x-2" key={index}>
            <Avatar className="h-[50px] w-[50px]">
              <AvatarImage src={message.userProfileImage} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Card className="max-w-md">
              <CardHeader>
                <CardDescription>{message.content}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
      <div>
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </>
  );
}
