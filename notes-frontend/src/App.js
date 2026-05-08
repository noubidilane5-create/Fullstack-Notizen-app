import { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotesPage />} />
        <Route path="/note/:id" element={<NoteDetail />} />
        <Route path="/note/:id/edit" element={<EditNote />} />
      </Routes>
    </Router>
  );
}

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  useEffect(() => {
    fetch("http://localhost:8080/notes")
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  const createNote = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      alert("Bitte Titel eingeben.");
      return;
    }
    if (content.trim() === "") {
      alert("Bitte Inhalt eingeben.");
      return;
    }
    if (title.length > 120) {
      alert("Der Titel darf maximal 120 Zeichen lang sein.");
      return;
    }
    if (content.length > 200) {
      alert("Der Inhalt darf maximal 200 Zeichen lang sein.");
      return;
    }

    const newNote = { title, content };

    fetch("http://localhost:8080/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote)
    })
      .then(res => res.json())
      .then(savedNote => {
        setNotes([...notes, savedNote]);
        setTitle("");
        setContent("");
      });
  };

  return (
    <div >
      <div className="container">

        <h1>Notizen</h1>



        <form onSubmit={createNote} style={{ marginBottom: "30px" }}>
          <input
            type="text"
            placeholder="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Inhalt"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ height: "100px" }}
          />

          <button type="submit" className="create">Note erstellen</button>
        </form>

        {notes.map((note) => (
          <Link
            key={note.id}
            to={`/note/${note.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="card">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}

function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/notes/${id}`)
      .then(res => res.json())
      .then(data => setNote(data));
  }, [id]);

  if (!note) return <h2>Loading...</h2>;

  const handleDelete = () => {
    fetch(`http://localhost:8080/notes/${id}`, {
      method: "DELETE"
    }).then(() => navigate("/"));
  };

  return (
    <div className="container">
      <button
        onClick={() => navigate("/")}
        className="create"
        style={{
          marginBottom: "20px",
          display: "inline-block",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          padding: "10px 16px",
          cursor: "pointer"
        }}
      >
        ← Zurück
      </button>
      <div className="card">
        <h2>{note.title}</h2>
        <p style={{ fontSize: "18px", opacity: 0.9 }}>{note.content}</p>

        <button
          onClick={() => navigate(`/note/${id}/edit`)}
          className="create"
          style={{ marginTop: "20px" }}
        >
          ✏️ Bearbeiten
        </button>

        <button
          onClick={handleDelete}
          className="delete-btn"
        >
          🗑️ Löschen
        </button>

      </div>
    </div>



  );
}

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/notes/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setContent(data.content);
      });
  }, [id]);

  const updateNote = (e) => {
    e.preventDefault();

    const updated = { title, content };

    fetch(`http://localhost:8080/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    }).then(() => navigate(`/note/${id}`));
  };

  return (
    <div className="container">
      <Link
        to={`/note/${id}`}
        className="create"
        style={{ marginBottom: "20px", display: "inline-block" }}
      >
        ← Zurück
      </Link>

      <form onSubmit={updateNote} className="card">
        <h2>Notiz bearbeiten</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ height: "100px" }}
        />

        <button type="submit" className="create" style={{ marginTop: "20px" }}>
          Speichern
        </button>
      </form>
    </div>
  );
}

export default App;
