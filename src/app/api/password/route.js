// import { getServerSession } from "next-auth";

// import connectDB from "@/db/connectDB";
// import Password from "@/model/Password";
// import { NextResponse } from "next/server";
// import CryptoJS from "crypto-js";


// export async function POST(req) {
//   try {
//     await connectDB()

//    const session = await getServerSession();
//     if (!session || !session?.user?.email) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     const body = await req.json()
//     const { email, username, title, password } = body

//     if (!email || !password) {
//       return NextResponse.json({
//         success: false,
//         error: true,
//         message: "hey bro all email and password are required"
//       })
//     }
//     const secretKey = process.env.NEXT_SECRET_KEY; // .env me store kar
//     const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();

//     const newPassword = await Password.create({
//       userId: session.user.email,
//       username,
//       title,
//       email,
//       password: encryptedPassword
//     })
//     return NextResponse.json({
//       success: true,
//       error: false,
//       message: "Password created successfully",
//       newPassword
//     })
//   } catch (error) {
//     console.error(error.message)
//     console.log(error.message)
//     return NextResponse.json({
//       userId: session.user.email,
//       success: false,
//       error: true,
//       message: "Server error please try again later"
//     })
//   }
// }


// // export async function GET(req) {
// //   try {
// //     await connectDB()
// //     const secretKey = process.env.SECRET_KEY;
// //     const passwords = await Password.find().sort({ createdAt: -1 }).lean()
// //     //  const decryptedPasswords = passwords.map((item) => {
// //     //   const bytes = CryptoJS.AES.decrypt(item.password, secretKey);
// //     //   const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

// //     //   return {
// //     //     ...item,
// //     //     password: decryptedPassword,
// //     //   };
// //     // });
// //     return NextResponse.json({
// //       success: true,
// //       // passwords: decryptedPasswords
// //       passwords
// //     })
// //   } catch (error) {
// //     console.error(error.message)
// //     console.log(error.message)
// //     return NextResponse.json({
// //       success: false,
// //       error: true,
// //       message: "Server Error while fetch data from database please refresh the page or visi the page after some time or contact us"
// //     })
// //   }
// // }


// export async function GET(req) {
//   try {
//     await connectDB();
//     const session = await getServerSession(); // yahan koi authOptions nahi chahiye
//     if (!session || !session.user?.email) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     const secretKey = process.env.NEXT_SECRET_KEY;


//     // ✅ lean() lagane se plain JS object milta hai
//     const passwords = await Password.find({ userId: session.user.email }).sort({ createdAt: -1 }).lean();

//     const decryptedPasswords = passwords.map((item) => {
//       const bytes = CryptoJS.AES.decrypt(item.password, secretKey);
//       const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

//       return {
//         ...item,
//         password: decryptedPassword,
//       };
//     });

//     return NextResponse.json({
//       success: true,
//       passwords: decryptedPasswords,
//     });
//   } catch (error) {
//     console.error(error.message);
//     return NextResponse.json({
//       success: false,
//       error: true,
//       message:
//         "Server Error while fetching data. Please refresh the page or try again later.",
//     });
//   }
// }


import { getServerSession } from "next-auth";
import connectDB from "@/db/connectDB";
import Password from "@/model/Password";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userEmail = session.user.email.toLowerCase();
    const body = await req.json();
    const { email, username, title, password } = body;

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        error: true,
        message: "hey bro all email and password are required",
      });
    }

    const secretKey = process.env.NEXT_SECRET_KEY;
    const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();

    const newPassword = await Password.create({
      userId:userEmail,
      username,
      title,
      email,
      password: encryptedPassword,
    });

    return NextResponse.json({
      success: true,
      error: false,
      message: "Password created successfully",
      newPassword,
    });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({
      success: false,
      error: true,
      message: "Server error please try again later",
    });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(); // ✅ yahi sahi hai

    if (!session || !session.user?.email) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const secretKey = process.env.NEXT_SECRET_KEY;

    const passwords = await Password.find({ userId: session.user.email })
      .sort({ createdAt: -1 })
      .lean();

    const decryptedPasswords = passwords.map((item) => {
      const bytes = CryptoJS.AES.decrypt(item.password, secretKey);
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

      return {
        ...item,
        password: decryptedPassword,
      };
    });

    return NextResponse.json({
      success: true,
      passwords: decryptedPasswords,
    });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({
      success: false,
      error: true,
      message: "Server Error while fetching data. Please refresh the page or try again later.",
    });
  }
}
