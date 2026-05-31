import { useState } from "react";
import ActivityList from "./ActivityList";
import "./App.css";

function App() {
  const [activities, setActivities] = useState([
    { id: 1, text: "Belajar React.js", done: false },
    { id: 2, text: "Mengerjakan Praktikum Web", done: true },
    { id: 3, text: "Review Materi Modul 11", done: false },
  ]);

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | done

  // CREATE
  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const newActivity = { id: Date.now(), text: trimmed, done: false };
    setActivities([...activities, newActivity]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  // UPDATE (toggle done)
  const handleToggle = (id) => {
    setActivities(
      activities.map((a) => (a.id === id ? { ...a, done: !a.done } : a))
    );
  };

  // UPDATE (edit text)
  const handleEditStart = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleEditSave = (id) => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    setActivities(
      activities.map((a) => (a.id === id ? { ...a, text: trimmed } : a))
    );
    setEditId(null);
    setEditText("");
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditText("");
  };

  // DELETE
  const handleDelete = (id) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  // FILTER
  const filteredActivities = activities.filter((a) => {
    if (filter === "active") return !a.done;
    if (filter === "done") return a.done;
    return true;
  });

  const doneCount = activities.filter((a) => a.done).length;
  const totalCount = activities.length;

  return (
    <div className="app-wrapper">
      {/* Background decoration */}
      <div className="bg-blob blob1" />
      <div className="bg-blob blob2" />
      <div className="bg-blob blob3" />

      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <div className="header-icon">⚡</div>
          <h1 className="app-title">Daftar Aktivitas</h1>
          <p className="app-subtitle">Kelola aktivitas harianmu dengan mudah</p>

          {/* Progress bar */}
          <div className="progress-wrap">
            <div className="progress-info">
              <span>{doneCount} selesai</span>
              <span>{totalCount - doneCount} tersisa</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: totalCount === 0 ? "0%" : `${(doneCount / totalCount) * 100}%`,
                }}
              />
            </div>
          </div>
        </header>

        {/* Input Section */}
        <div className="input-section">
          <div className="input-row">
            <input
              className="activity-input"
              type="text"
              placeholder="Tambahkan aktivitas baru..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="btn-add" onClick={handleAdd}>
              <span className="btn-icon">+</span>
              <span>Tambah</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {["all", "active", "done"].map((f) => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? `Semua (${totalCount})` : f === "active" ? `Aktif (${totalCount - doneCount})` : `Selesai (${doneCount})`}
            </button>
          ))}
        </div>

        {/* Activity List */}
        <ActivityList
          activities={filteredActivities}
          editId={editId}
          editText={editText}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEditStart={handleEditStart}
          onEditSave={handleEditSave}
          onEditCancel={handleEditCancel}
          onEditTextChange={setEditText}
        />

        {/* Footer */}
        <footer className="app-footer">
          <p>✦ Aplikasi Daftar Aktivitas Mahasiswa ✦</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
