"use client";
import List from "./list";
import { SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function Todo() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([
    "Sweep the floor",
    "Wash the dishes",
    "Clean the house",
  ]);
  const { toast } = useToast();

  function handleSubmit() {
    const data = tasks;
    data.push(input);
    setTasks(data);

    toast({
        title: "Task Created!",
        description: input,
    });
    setInput("");
  }
  function handleInput(e: { target: { value: SetStateAction<string> } }) {
    setInput(e.target.value);
  }

  return (
    <div className="p-8">
      <div className="">
        <h3 className="text-lg font-bold">Welcome back!</h3>
        <p className="text-slate-500">
          Here's a list of your tasks for this month!
        </p>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2 pt-4">
        <Input
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="Add New Task. . ."
        />
        <Button type="submit" onClick={handleSubmit}>
          Add Task
        </Button>
      </div>
      <div className="pt-4">
        <List data={tasks} />
      </div>
      <Toaster />
    </div>
  );
}
