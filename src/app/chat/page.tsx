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
    email: session?.user.email,
  };
  return (
    <div className="bg-slate-50">
      <div className="p-4">
        <ChatComponent data={user} />
      </div>
    </div>
  );
}
