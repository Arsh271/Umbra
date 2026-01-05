import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
import { useNavigate } from "react-router-dom";
const SharedNotes = () => {
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios.post("http://localhost:3001/shared-notes", {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      if(res.data.status==="Success"){
        setNotes(res.data.notes)
      }
    })
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar2 />

      <div className="max-w-3xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Notes Shared With Me
        </h1>

        {notes.length === 0 && (
          <p className="text-center text-gray-400">No shared notes yet.</p>
        )}

        {notes.map(note => (
          <div
            key={note._id}
            className="bg-gray-900 p-4 mb-4 rounded-lg border border-gray-800 
                       hover:border-blue-500 cursor-pointer transition"
            onClick={() => navigate(`/shared/${note._id}`, { state: note })}
          >
            <h2 className="text-xl font-medium text-blue-400 hover:underline">
              {note.heading}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Permission: {note.permission}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedNotes;
