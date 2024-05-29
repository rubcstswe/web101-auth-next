import { auth } from "../../../auth";
import ChatComponent from "../../../components/chat";

export default async function Protected() {
  const session = await auth();
  if (!session?.user) {
    return <h1>You need to sign in to access the chat</h1>;
  }
  const user = {
    image: session?.user.image,
    name: session?.user.name,
  };
  return (
    <div className="p-8">
      <ChatComponent data={user} />
    </div>
  );
}
