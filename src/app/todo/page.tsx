import { auth } from "../../../auth";
import Todo from "../../../components/to-do";

export default async function Protected() {
  const session = await auth();
  if (!session?.user) {
    return <h1>You need to sign in to access the task list</h1>;
  }
  return (
    <>
      <Todo />
    </>
  );
}
