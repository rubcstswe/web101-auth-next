import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;
          const res = await fetch("http://localhost:8085/auth", {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });
          if (!res.ok) {
            // credentials are invalid
            return null;
          }

          const parsedResponse = await res.json();
          console.log(parsedResponse);
          user = {
            id: parsedResponse.id,
            email: parsedResponse.email,
            name: parsedResponse.name,
            image: parsedResponse.image,
          };
          return user;
        } catch (error) {
          return null;
        }
        // let user = null;

        // // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password);

        // // logic to verify if user exists
        // user = await getUserFromDb(credentials.email, pwHash);

        // if (!user) {
        //   // No user found, so this is their first attempt to login
        //   // meaning this is also the place you could do registration
        //   throw new Error("User not found.");
        // }

        // // return user object with the their profile data
        // return user;
      },
    }),
  ],
});
