"use client"
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle, Eye, EyeOff } from 'lucide-react'
import ConfirmModel from '@/component/ConfirmModel'
const page = () => {
  const [passwords, setPasswords] = useState([])
  const [loading, setLoading] = useState(false)
  const [isShow, setIsShow] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const router = useRouter()
  useEffect(() => {
    setLoading(true);
    fetch("/api/password")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setPasswords(data.passwords || []);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    router.push(`/user/add-new-password?id=${id}`)

  }
  const handleDelete = async (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };
  const confirmDelete = async () => {
    const id = selectedId;
    setShowConfirm(false);

    try {
      const res = await fetch(`/api/password/${id}`, { method: "DELETE" });
      const result = await res.json();

      if (result.success) {
        alert(result.message);
        setPasswords((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


  // const requestOptions = {
  //   method: "DELETE",
  //   redirect: "follow"
  // };

  // fetch(`/api/password/${id}`, requestOptions)
  //   .then((response) => response.json())
  //   .then((result) => {
  //     if (result.success) {
  //       alert(result.message)
  //     } else {
  //       alert(result.message)
  //       setPasswords(passwords.filter(p => p._id !== id));
  //     }
  //     console.log(result)
  //   })
  //   .catch((error) => {
  //     alert(error.message)
  //     console.error(error)
  //   });

// }


return (
  <>

    <main className="min-h-screen mt-10 bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center py-10">
      {loading && (
        <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-40">
          <LoaderCircle className="animate-spin w-16 h-16 text-black" />
        </div>
      )}

      {/* Header */}
      <div className="flex  bg-yellow-400/70 w-11/12 md:w-3/4 py-4 px-6 rounded-2xl justify-between items-center shadow-md">
        <h1 className="text-2xl md:text-3xl text-gray-800 font-extrabold tracking-wide">
          Your Passwords
        </h1>
        <Link href={"/user/add-new-password"} >
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-300">
            + Add New Password
          </button>
        </Link>
      </div>
      <h2 className='text-xl  text-green-900 mt-4' >You Have Total {passwords.length} Passwords</h2>
      <div className='overflow-x-auto  max-h-[80vh]' >
        <div className="flex flex-col items-center gap-4 px-4 py-6 w-full">
          {passwords.length === 0 ? (
            <p className="text-gray-600 text-lg">No passwords found 😅</p>
          ) : (
            passwords.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full max-w-5xl bg-white/90 border border-yellow-300 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 px-5 py-4 overflow-x-auto"
              >
                {/* Left Section */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto items-start sm:items-center text-sm sm:text-base text-gray-800">

                  {/* Title */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 min-w-[200px]">
                    <label className="font-semibold text-gray-700 w-24">Title:</label>
                    <input
                      type="text"
                      defaultValue={item.title || "Untitled"}
                      disabled
                      className="bg-gray-100 px-3 py-2 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none min-w-[180px] overflow-x-auto"
                    />
                  </div>

                  {/* Username */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 min-w-[200px]">
                    <label className="font-semibold text-gray-700 w-24">Username:</label>
                    <input
                      type="text"
                      defaultValue={item.username || "—"}
                      disabled
                      className="bg-gray-100 px-3 py-2 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none min-w-[180px] overflow-x-auto"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 min-w-[200px]">
                    <label className="font-semibold text-gray-700 w-24">Email:</label>
                    <input
                      type="email"
                      defaultValue={item.email || "—"}
                      disabled
                      className="bg-gray-100 px-3 py-2 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none min-w-[200px] overflow-x-auto"
                    />
                  </div>

                  {/* Password */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 min-w-[200px] relative">
                    <label className="font-semibold text-gray-700 w-24">Password:</label>
                    <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-3 py-2 min-w-[180px] overflow-x-auto">
                      <input
                        id={item._id}
                        disabled
                        className="bg-transparent outline-none text-gray-900 w-full overflow-x-auto"
                        type={isShow === index ? "text" : "password"}
                        value={item.password}
                      />
                      {isShow === index ? (
                        <EyeOff
                          onClick={() => setIsShow(null)}
                          className="ml-2 text-yellow-500 hover:text-yellow-600 cursor-pointer transition-transform transform hover:scale-110"
                          size={20}
                        />
                      ) : (
                        <Eye
                          onClick={() => setIsShow(index)}
                          className="ml-2 text-gray-500 hover:text-yellow-500 cursor-pointer transition-transform transform hover:scale-110"
                          size={20}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Section - Buttons */}
                <div className="flex gap-3 w-full sm:w-auto justify-end">
                  <button onClick={() => handleEdit(item._id)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm">
                    Delete
                  </button>
                  {showConfirm && (
                    <ConfirmModel
                      message="Are you sure you want to delete this password?"
                      onConfirm={confirmDelete}
                      onCancel={() => setShowConfirm(false)}
                    />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
      {/* Small Info Section */}
      <div className="mt-10 text-center text-gray-600 text-sm">
        <p>🔒 All your passwords are securely encrypted before saving.</p>
        <p className="mt-1">Only you can decrypt and view them.</p>
      </div>
    </main>


  </>
)
}

export default page
