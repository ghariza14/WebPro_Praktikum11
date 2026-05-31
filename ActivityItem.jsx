function ActivityItem({
  activity,
  index,
  isEditing,
  editText,
  onToggle,
  onDelete,
  onEditStart,
  onEditSave,
  onEditCancel,
  onEditTextChange,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onEditSave(activity.id);
    if (e.key === "Escape") onEditCancel();
  };

  return (
    <li
      className={`activity-item ${activity.done ? "done" : ""}`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="item-number">{String(index + 1).padStart(2, "0")}</div>

      {isEditing ? (
        <div className="edit-row">
          <input
            className="edit-input"
            value={editText}
            onChange={(e) => onEditTextChange(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button className="btn-save" onClick={() => onEditSave(activity.id)}>
            ✓
          </button>
          <button className="btn-cancel" onClick={onEditCancel}>
            ✕
          </button>
        </div>
      ) : (
        <div className="item-content">
          <button
            className={`checkbox ${activity.done ? "checked" : ""}`}
            onClick={() => onToggle(activity.id)}
            title="Toggle selesai"
          >
            {activity.done ? "✓" : ""}
          </button>
          <span className={`item-text ${activity.done ? "strikethrough" : ""}`}>
            {activity.text}
          </span>
        </div>
      )}

      {!isEditing && (
        <div className="item-actions">
          <button
            className="btn-edit"
            onClick={() => onEditStart(activity.id, activity.text)}
            title="Edit aktivitas"
          >
            ✏️
          </button>
          <button
            className="btn-delete"
            onClick={() => onDelete(activity.id)}
            title="Hapus aktivitas"
          >
            🗑️
          </button>
        </div>
      )}
    </li>
  );
}

export default ActivityItem;
