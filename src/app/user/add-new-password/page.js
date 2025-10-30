"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
const Page = () => {
    const [form, setForm] = useState({
        title: "",
        username: "",
        email: "",
        password: ""
    })
    const [isShow, setIsShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams();
    const passwordID = searchParams.get("id");
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })

    }

    // useEffect(() => {

    //     if (id) {
    //         //   setLoading(true)
    //         fetch(`/api/password/${id}`)
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 if (data.success && data.passwords) {
    //                     // setLoading(false)
    //                     setForm({
    //                         title: data.passwords.title || "",
    //                         username: data.passwords.username || "",
    //                         email: data.passwords.email || "",
    //                         password: data.passwords.password || ""
    //                     })
    //                 }

    //             })
    //             .catch((err)=>{
    //                 // setLoading(false)
    //                 console.log(err.message)
    //                 alert(err.message)
    //             })
    //     }
    // }, [id])
    useEffect(() => {
        if (passwordID) {
            setLoading(true);
            fetch(`/api/password/${passwordID}`)
                .then(res => res.json())
                .then(data => {
                    console.log("🔍 API Response:", data); // <-- ADD THIS LINE

                    if (data.success && data.passwords) {
                        setLoading(false);
                        setForm({
                            title: data.passwords.title || "",
                            username: data.passwords.username || "",
                            email: data.passwords.email || "",
                            password: data.passwords.password || ""
                        });
                    } else {
                        setLoading(false);
                        console.log("⚠️ No data or success false");
                    }
                })
                .catch(err => {
                    setLoading(false);
                    console.log("❌ Fetch error:", err);
                    alert(err.message);
                });
        }
    }, [passwordID]);

    const handlesubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const method = passwordID ? "PATCH" : "POST";
        const url = passwordID ? `/api/password/${passwordID}` : "/api/password";
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "title": form.title,
            "username": form.username,
            "email": form.email,
            "password": form.password
        });

        const requestOptions = {
            method: method,
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    setLoading(false)
                    // alert(result.message)
                    router.push("/user/my-password")
                } else {
                    alert(result.message)
                }
                console.log(result)
            })
            .catch((error) => {
                setLoading(false)
                alert(error.message)
                console.error(error)
            });


    }
    return (
        <>
            {loading && (
                <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-40">
                    <LoaderCircle className="animate-spin w-16 h-16 text-black" />
                </div>
            )}

            <main className='min-h-screen z-0      mt-10 bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center py-10 '>
                <form
                    method="post"
                    onSubmit={handlesubmit}
                    className="mt-10 w-11/12 md:w-2/3 bg-white/60 backdrop-blur-md shadow-xl rounded-2xl p-6 md:p-10  "
                >
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Add Password Details</h2>

                    <div className="flex flex-col gap-5">
                        {/* Title */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Title <span className="text-sm text-gray-500">(optional)</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Example: Instagram / Netflix / Bank Account"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        {/* Username */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Username <span className="text-sm text-gray-500">(optional)</span>
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Enter username if any"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter your email address"
                                required
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Password <span className="text-red-500">*</span>
                            </label>

                            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-3 focus-within:ring-2 focus-within:ring-yellow-400 transition-all">
                                <input
                                    type={isShow ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full py-3 bg-transparent text-gray-800 placeholder-gray-500 outline-none"
                                />

                                {isShow ? (
                                    <EyeOff
                                        onClick={() => setIsShow(false)}
                                        className="text-yellow-500 hover:text-yellow-600 cursor-pointer transition-transform hover:scale-110 ml-2"
                                        size={20}
                                    />
                                ) : (
                                    <Eye
                                        onClick={() => setIsShow(true)}
                                        className="text-gray-500 hover:text-yellow-500 cursor-pointer transition-transform hover:scale-110 ml-2"
                                        size={20}
                                    />
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex justify-center">
                        <button
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
                        >
                            Save Password
                        </button>
                    </div>
                </form>
            </main>
        </>
    )
}

export default Page
