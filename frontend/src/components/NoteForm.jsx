import { useState } from "react";

function NoteForm({ onSubmit, initialData }) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            title,
            description,
        });

        setTitle("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{initialData ? "Edit Note" : "Create Note"}</h3>

            <input
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

            <button type="submit">Save</button>
        </form>
    );
}

export default NoteForm;