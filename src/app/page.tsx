import { SignIn } from "../../components/sign-in";
import { SignOut } from "../../components/sign-out";
import { auth } from "../../auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const session = await auth();
  if (!session?.user) return <SignIn />;
  console.table(session.user);
  return (
    <>
      <Card>
        <CardHeader>
          <Avatar>
            <AvatarImage src={session.user.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <CardTitle>{session.user.name ?? ""}</CardTitle>
          <CardDescription>{session.user.email ?? ""}</CardDescription>
        </CardHeader>
        <CardFooter>
          {" "}
          <SignOut />
        </CardFooter>
      </Card>
    </>
  );
}
