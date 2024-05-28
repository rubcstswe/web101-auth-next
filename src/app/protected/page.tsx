import { redirect } from "next/navigation";
import { auth } from "../../../auth";

export default async function Protected() {
  const session = await auth();
  if (!session?.user) redirect("/");
  return (
    <div>
      <p>JWT:{session.user.token ?? ""}</p>
      <p>Email: {session.user.email ?? ""}</p>
      <h1>YOU ARE ON A PROTECTED PAGE</h1>
    </div>
  );
}
