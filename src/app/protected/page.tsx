import { redirect } from "next/navigation";
import { auth } from "../../../auth";

export default async function Protected() {
  const session = await auth();
  if (!session?.user) {
    return <h1>You need to sign in to access this page</h1>;
  }
  return (
    <div>
      <p>JWT:{session?.user.token ?? "YOU ARE NOT SIGNED IN"}</p>
      <p>Email: {session?.user.email ?? "YOU ARE NOT SIGNED IN"}</p>
      <h1>YOU ARE ON A PROTECTED PAGE</h1>
    </div>
  );
}
