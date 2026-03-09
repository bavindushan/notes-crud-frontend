import { useState } from "react";

function NoteForm({ onSubmit, initialData }) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [file, setFile] = useState(null); // ✅ new state for file

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            title,
            description,
            file, // include file in submitted data
        });

        setTitle("");
        setDescription("");
        setFile(null); // reset file
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{initialData ? "Edit Note" : "Create Note"}</h3>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])} // ✅ store selected file
            />

            <button type="submit">Save</button>
        </form>
    );
}

export default NoteForm;