import { auth } from "../../../auth";
import ChatComponent from "../../../components/chat";
import { Button } from "@/components/ui/button";

export default async function Protected() {
  const session = await auth();
  if (!session?.user) {
    return <h1>You need to sign in to access the chat</h1>;
  }
  return (
    <div className="p-8">
      <ChatComponent />
    </div>
  );
}
