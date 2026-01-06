import React, { useState } from 'react'
import Preview from './Preview'
import axios from 'axios'
import { encryptText } from '../utils/crypto'
import { generateNoteKey, encryptWithPublicKey } from '../utils/cryptoKeys'
// import { useNotification } from '../context/NotificationContext'
const Card = () => {
  // const { showNotification } = useNotification();

  // const createdBy =localStorage.getItem("username")
  const token = localStorage.getItem("token");
  const [text, setText] = useState('')
  const [heading, setHeading] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!heading || !text) {
      // showNotification("Title and text are required", "info");
      alert("Title and text both are required !!");
      return;
    }

    if (!token) {
      // showNotification("User not logged in", "error");
      alert("User not logged in !!")
      return;
    }



    try {
      const noteKey = generateNoteKey()
      const encryptedText = await encryptText(text, noteKey);

      const keyRes = await axios.post("http://localhost:3001/owner-public-key", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (keyRes.data.status !== "Success") {
        return alert(keyRes.data.message);
      }

      const publicKey = keyRes.data.publicKey;
      if (!publicKey) {
        // showNotification("please log out and login again !!", "error")
        alert("please log out and log in again !!");
      }

      const encryptedKey = await encryptWithPublicKey(publicKey, noteKey)


      const res = await axios.post('http://localhost:3001/home', { heading, encryptedText, encryptedKey }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(res.data);

      if (res.data.status === "Error") {
        alert(res.data.message);
        return;
      }

      // showNotification("Note created successfully!", "success")
      alert("Note created successfully!");


      setHeading("")
      setText("")


    } catch (error) {
      console.log(error);
      // showNotification("Encryption or saving failed", "error")
      alert("encryption or saving failed !");
    }

  }


  return (
    <div className="min-h-screen w-full bg-linear-to-br from-gray-950 via-gray-900 to-black text-white flex justify-center items-start p-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left: Form */}
        <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-xl p-6 flex flex-col gap-6">
          <h1 className="text-2xl font-semibold text-center tracking-wide">
            ✨ Create a Secure Note
          </h1>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

            <div>
              <label className="block mb-1 text-sm text-gray-300">Title</label>
              <input
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                placeholder="Enter title"
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-300">Description</label>
              <textarea
                className="w-full min-h-[140px] px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition resize-none"
                placeholder="Write your note..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <button
              className="mt-2 w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-medium tracking-wide active:scale-95"
            >
              Add Note
            </button>
          </form>
        </div>

        {/* Right: Preview */}
        <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-xl p-6 flex flex-col">
          <h2 className="text-xl font-medium mb-4 text-center text-gray-200">
            Live Preview
          </h2>
          <div className="flex-1 overflow-auto">
            <Preview text={text} heading={heading} />
          </div>
        </div>

      </div>
    </div>
  );

}

export default Card
