import Password from "@/model/Password";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
// helper to robustly get id either from params or fallback to URL
function getIdFromReq(req, params) {
  if (params && params.id) return params.id;
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split("/").filter(Boolean);
    // last part should be the id for /api/password/:id
    return parts[parts.length - 1];
  } catch (e) {
    return undefined;
  }
}

export async function GET(req, { params }) {
  try {
    await connectDB();
    const id = getIdFromReq(req, params);
    console.log("GET /api/password/[id] - resolved id:", id);

    if (!id) {
      return NextResponse.json({ success: false, message: "Password ID is required" }, { status: 400 });
    }

    const secretKey = process.env.NEXT_SECRET_KEY;
    const passwordDoc = await Password.findById(id).lean();

    if (!passwordDoc) {
      return NextResponse.json({ success: false, message: "Password not found" }, { status: 404 });
    }

    // decrypt password
    const bytes = CryptoJS.AES.decrypt(passwordDoc.password, secretKey);
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    return NextResponse.json({ success: true, passwords: { ...passwordDoc, password: decryptedPassword } }, { status: 200 });
  } catch (error) {
    console.error("GET /passwords/[id] error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}



// 🗑️ DELETE Password
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const id = getIdFromReq(req, params);

    if (!id) {
      console.warn("DELETE called without id. params:", params, "url:", req.url);
      return NextResponse.json({ success: false, message: "Password ID is required" }, { status: 400 });
    }

    const existingPassword = await Password.findById(id);
    if (!existingPassword) {
      return NextResponse.json(
        { success: false, message: "Password not found" },
        { status: 404 }
      );
    }

    await Password.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: "Password deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /passwords/[id] error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}



// ✏️ PATCH (Update) Password
export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const id = getIdFromReq(req, params);

    if (!id) {
      console.warn("PATCH called without id. params:", params, "url:", req.url);
      return NextResponse.json({ success: false, message: "Password ID is required" }, { status: 400 });
    }

    const { email, username, title, password } = await req.json();

    const existingPassword = await Password.findById(id);
    if (!existingPassword) {
      return NextResponse.json(
        { success: false, message: "Password not found" },
        { status: 404 }
      );
    }

    const secretKey = process.env.NEXT_SECRET_KEY;
    const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();

    const updatedPassword = await Password.findByIdAndUpdate(
      id,
      { title, username, email, password: encryptedPassword },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Password updated successfully",
        data: updatedPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /passwords/[id] error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
