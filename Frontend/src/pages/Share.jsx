import React, { useEffect, useState } from "react"
import Navbar2 from "../components/Navbar2"
import axios from "axios"
import { decryptWithPrivateKey, encryptWithPublicKey } from "../utils/cryptoKeys"

const Share = () => {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState("")
  const [receiverEmail, setReceiverEmail] = useState("")
  const [permission, setPermission] = useState("read")

  const token = localStorage.getItem("token")

  // 🔹 Fetch user's own notes
  useEffect(() => {
    axios
      .post(
        "http://localhost:3001/my-notes",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setNotes(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  // 🔹 Share handler
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedNote || !receiverEmail) {
    alert("Please select note and enter email");
    return;
  }

  if (receiverEmail === localStorage.getItem("email")) {
  alert("You cannot share with yourself");
  return;
}


  try {
    const receiverRes = await axios.post(
      "http://localhost:3001/get-public-key",
      { email: receiverEmail },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (receiverRes.data.status !== "Success") {
      alert(receiverRes.data.message);
      return;
    }
    

    const receiverPublicKey = receiverRes.data.publicKey;
    const privateKey = localStorage.getItem("privateKey");

    if (!privateKey) {
      alert("Private key missing — please re-login");
      return;
    }
    

    const keyRes = await axios.post(
      "http://localhost:3001/get-note-key",
      { noteId: selectedNote },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (keyRes.data.status !== "Success") {
      alert(keyRes.data.message);
      return;
    }

    const encryptedKeyForOwner =  keyRes.data.encryptedKey;
    const noteKey = await decryptWithPrivateKey(privateKey, encryptedKeyForOwner);
    const encryptedKeyForReceiver = await encryptWithPublicKey(receiverPublicKey, noteKey);

    console.log("Owner encrypted key:", encryptedKeyForOwner);


    const shareRes = await axios.post(
      "http://localhost:3001/share-note",
      {
        noteId: selectedNote,
        receiverEmail,
        permission,
        encryptedKey: encryptedKeyForReceiver
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert(shareRes.data.message);
    setReceiverEmail("");

  } catch (err) {
    console.error(err);
    alert("Sharing failed");
  }
};


  return (
    <div className="min-h-screen w-full bg-gray-950 text-white">
      <Navbar2 />

      <div className="max-w-3xl mx-auto px-4 mt-10">
        <h1 className="text-3xl font-semibold mb-8 text-center">
          Share a Note
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 bg-gray-900 p-6 rounded-xl border border-gray-800"
        >
          {/* Select Note */}
          <div>
            <label className="block mb-2 font-medium">Select Note</label>
            <select
              className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              value={selectedNote}
              onChange={(e) => setSelectedNote(e.target.value)}
            >
              <option value="">-- Select your note --</option>
              {notes.map((note) => (
                <option key={note._id} value={note._id}>
                  {note.heading}
                </option>
              ))}
            </select>
          </div>

          {/* Receiver Email */}
          <div>
            <label className="block mb-2 font-medium">Receiver Email</label>
            <input
              type="email"
              placeholder="Enter user email"
              className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              value={receiverEmail}
              onChange={(e) => setReceiverEmail(e.target.value)}
            />
          </div>

          {/* Permission */}
          <div>
            <label className="block mb-2 font-medium">Permission</label>
            <select
              className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              value={permission}
              onChange={(e) => setPermission(e.target.value)}
            >
              <option value="read">Read Only</option>
              <option value="write">Read & Write</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg font-medium"
          >
            Share Note
          </button>
        </form>
      </div>
    </div>
  )
}

export default Share
