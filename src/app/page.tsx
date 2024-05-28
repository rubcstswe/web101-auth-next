import { SignIn } from "../../components/sign-in";
import { SignOut } from "../../components/sign-out";
import { auth } from "../../auth";

export default async function Home() {
  const session = await auth();
  if (!session?.user) return <SignIn />;
  console.table(session.user);
  return (
    <div>
      <SignOut />
      <p>JWT:{session.user.token ?? ""}</p>
      {/* <p>{session.user.name ?? ""}</p> */}
      <p>Email: {session.user.email ?? ""}</p>
      {/* <img src={session.user.image ?? ""} alt="User Avatar" /> */}
    </div>
  );
}
