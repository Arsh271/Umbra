import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
import { decryptText , encryptText } from "../utils/crypto";
import { decryptWithPrivateKey  } from "../utils/cryptoKeys";
import Preview from "../components/Preview";

const SharedNoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [permission, setPermission] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const noteId= id;
  const handleAction = async (type) => {
  try {
    if (type === "update") {

        const keyRes = await axios.post('http://localhost:3001/get-note-key',{ noteId },
            { headers: { Authorization: `Bearer ${token}` } }
              );
              if (keyRes.data.status === "Error") {
                return alert(keyRes.data.message);
              }
              const encryptedKey = keyRes.data.encryptedKey;
              const privateKey= localStorage.getItem("privateKey")
              const noteKey = await decryptWithPrivateKey(privateKey, encryptedKey);
            const encryptedText = await encryptText(text,noteKey);

      const res = await axios.post(
        `http://localhost:3001/shared-note/${id}/update`,
        { heading, encryptedText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message || "Note updated!");
    }

    if (type === "delete") {
      const confirmed = window.confirm("Are you sure you want to delete this note?");
      if (!confirmed) return;

      const res = await axios.post(
        `http://localhost:3001/shared-note/${id}/delete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message || "Note deleted!");
      navigate("/shared");
    }
  } catch (err) {
    console.error(err);
    alert("Action failed");
  }
};

 

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3001/shared-note/${id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const { encryptedText, encryptedKey, permission, heading } = res.data;

        const privateKey = localStorage.getItem("privateKey");
        const noteKey = await decryptWithPrivateKey(privateKey, encryptedKey);
        const plainText = await decryptText(encryptedText, noteKey);

        setHeading(heading);
        setText(plainText);
        setPermission(permission);
      } catch (err) {
        console.error(err);
        setError("Failed to load note or access denied.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Loading note...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-4">
        <p className="text-red-400">{error}</p>
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          onClick={() => navigate("/shared")}
        >
          Back to Shared Notes
        </button>
      </div>
    );
  }

  const isWritable = permission === "write";

return (
  <div className="min-h-screen w-full bg-gray-950 text-white">
    <Navbar2 />

    <div className="max-w-6xl mx-auto px-6 py-8">

      
      <div className="mb-6 flex flex-col items-center">
        <h1 className="text-3xl font-semibold">{heading}</h1>
        <span className={`mt-2 px-3 py-1 text-xs rounded-full 
          ${isWritable ? "bg-green-600/20 text-green-400" : "bg-blue-600/20 text-blue-400"}`}>
          {isWritable ? "Edit Access" : "Read Only"}
        </span>
      </div>

      
      {isWritable ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              rows="14"
              className="w-full px-3 py-2 rounded-md resize-none bg-gray-800 border border-gray-700 focus:border-blue-500"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

         
          <div className="  bg-gray-900 p-5 rounded-xl borderh border-gray-800">
            <label className="block mb-2 font-medium">Preview</label>
            <Preview text={text} heading={heading}/>
          </div>

        </div>
      ) : (
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <Preview text={text} heading={heading}/>
        </div>
      )}

     
      {isWritable && (
        <div className="flex justify-center gap-4 mt-6">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium" onClick={()=>{handleAction("update")}}>
            Update
          </button>
          <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium" onClick={()=>{handleAction("delete")}}>
            Delete
          </button>
        </div>
      )}

    </div>
  </div>
);

};

export default SharedNoteDetail;
