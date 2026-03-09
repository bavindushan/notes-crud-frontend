import { useEffect, useState } from "react";
import API from "../api/api";
import NoteForm from "../components/NoteForm";

function NotesPage() {
    const [notes, setNotes] = useState([]);
    const [editing, setEditing] = useState(null);

    const fetchNotes = async () => {
        const res = await API.get("/notes/");
        setNotes(res.data);
    };

    useEffect(() => {
        const loadNotes = async () => {
            await fetchNotes();
        };

        loadNotes();
    }, []);

    const createNote = async (data) => {
        await API.post("/notes/", data);
        fetchNotes();
    };

    const updateNote = async (data) => {
        await API.put(`/notes/${editing.id}/`, data);
        setEditing(null);
        fetchNotes();
    };

    const deleteNote = async (id) => {
        await API.delete(`/notes/${id}/`);
        fetchNotes();
    };

    return (
        <div>
            <h1>Notes App</h1>

            <NoteForm
                onSubmit={editing ? updateNote : createNote}
                initialData={editing}
            />

            <hr />

            <div>
                {notes.map((note) => (
                    <div className="note-card" key={note.id}>
                        <strong>{note.title}</strong>
                        <p>{note.description}</p>

                        <button onClick={() => setEditing(note)}>Edit</button>
                        <button onClick={() => deleteNote(note.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NotesPage;