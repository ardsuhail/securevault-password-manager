import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import connectDB from '@/db/connectDB'
import Puser from '@/model/Puser'
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),]
    , secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //     error: '/login/error', // agar sign-in fail hua to /error page pe bhej dega
    // },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            try {
                await connectDB()
                const currentUser = await Puser.findOne({ email: user.email })
                // if (currentUser) {
                //     return false
                // }
                if (!currentUser) {
                    // const usernameFromEmail = user.email.split("@")[0]; // example: "suhail123"
                    const NewUser = await Puser.create({
                        name: profile.name,
                        // username: usernameFromEmail,
                        email: user.email,
                        profilePicture: profile.picture,

                    });
                }
                return true;
            } catch (error) {
                return false;
            }
        }
    }


})

export { handler as GET, handler as POST }