"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

const socket = io("http://localhost:3001"); // Replace with your server URL

export default function ChatComponent(data: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

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
      userEmail: data.data.email,
    };
    console.log(payload);
    socket.emit("chat message", payload);
    setNewMessage("");
  };

  return (
    <>
      <div className="sticky top-4">
        <Card className="max-w-full flex items-center">
          <Avatar className="h-[50px] w-[50px] ml-4">
            <AvatarImage src={data.data.image} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardHeader>
            <CardDescription className="font-bold text-slate-800">
              {data.data.name}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="h-screen p-8">
        {messages.map((message, index) =>
          data.data.email === message.userEmail ? (
            <div
              className="flex flex-row-reverse items-center space-x-2 text-right"
              key={index}
            >
              <Card className="max-w-md">
                <CardHeader>
                  <CardDescription>{message.content}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          ) : (
            <div className="flex flex-row items-center space-x-2" key={index}>
              <Avatar className="h-[50px] w-[50px]">
                <AvatarImage src={message.userProfileImage} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Card className="max-w-md">
                <CardHeader>
                  <CardDescription className="font-bold text-xs text-purple-800">
                    {message.userName}
                  </CardDescription>
                  <CardDescription>{message.content}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          )
        )}
      </div>
      <div className="flex space-x-4 sticky bottom-8">
        <Input
          type="text"
          value={newMessage}
          placeholder="Type your message here. . ."
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </>
  );
}
