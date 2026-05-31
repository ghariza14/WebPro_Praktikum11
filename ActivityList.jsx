import ActivityItem from "./ActivityItem";

function ActivityList({
  activities,
  editId,
  editText,
  onToggle,
  onDelete,
  onEditStart,
  onEditSave,
  onEditCancel,
  onEditTextChange,
}) {
  if (activities.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <p className="empty-text">Belum ada aktivitas</p>
        <p className="empty-sub">Tambahkan aktivitas baru di atas!</p>
      </div>
    );
  }

  return (
    <ul className="activity-list">
      {activities.map((activity, index) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          index={index}
          isEditing={editId === activity.id}
          editText={editText}
          onToggle={onToggle}
          onDelete={onDelete}
          onEditStart={onEditStart}
          onEditSave={onEditSave}
          onEditCancel={onEditCancel}
          onEditTextChange={onEditTextChange}
        />
      ))}
    </ul>
  );
}

export default ActivityList;
