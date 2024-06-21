import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import Timer from "./Timer";
import { useEffect, useState } from "react";
import { userAuthed } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import {
  useGetNotesQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation,
} from "../features/note/noteApiSlice";

const TrendNotes = ({ setElementShow }) => {
  const user = useSelector(userAuthed);
  const [note, setNote] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(false);
  const [deleteNoteIcon, setDeleteNoteIcon] = useState("");
  const [newNoteData, setNewNoteData] = useState({
    title: "",
    content: "",
  });
  const [noteScroll, setNoteScroll] = useState(false);
  const { data: notesData, isSuccess } = useGetNotesQuery({
    userId: user?.id,
  });
  const [createNote] = useCreateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const handleScrollEnter = () => {
    setNoteScroll(true);
  };

  const handleScrollExit = () => {
    setNoteScroll(false);
  };

  const handleCreateNote = async () => {
    createNote({
      title: newNoteData.title,
      content: newNoteData.content,
    });
    setNewNoteData({
      title: "",
      content: "",
    });
  };

  const handleDeleteNote = async ({ noteId }) => {
    deleteNote({ noteId });
  };

  const handleDeleteEnter = (noteId) => {
    setDeleteNoteIcon(noteId);
  };

  const handleDeleteExit = () => {
    setDeleteNoteIcon("");
  };

  useEffect(() => {
    if (isSuccess) {
      setNotes(notesData);
    }
  }, [isSuccess, notesData]);

  return (
    <div className="trending-notes">
      {/* <div className="trending-timer"> */}
      {/* <h1 className="trending-timer-title">Time Passed</h1>
        <h1 className="trending-timer-time-dash">:</h1>
        <h1 className="trending-timer-time"></h1> */}
      {/* </div> */}
      <div className="notes">
        <div className="note-header">
          <h1>Notes</h1>
          {/* <EditNoteRoundedIcon
            sx={{
              fontSize: 30,
              color: "#a7c750",
              marginLeft: "auto",
            }}
          /> */}
          <AddCircleRoundedIcon
            sx={{
              fontSize: 30,
              color: "#a7c750",
              cursor: "pointer",
            }}
            onClick={() => setNewNote(true)}
          />
        </div>
        {!newNote ? (
          <div
            className={
              noteScroll ? "note-container note-scroll" : "note-container"
            }
            onMouseEnter={handleScrollEnter}
            onMouseLeave={handleScrollExit}
          >
            {notes.map((note) => (
              <div
                className="note"
                key={note?._id}
                onMouseEnter={() => handleDeleteEnter(note._id)}
                onMouseLeave={handleDeleteExit}
              >
                <h2 className="note-title">{note?.title}</h2>
                <h3 className="note-content">{note?.content}</h3>
                {deleteNoteIcon === note._id && (
                  <DeleteForeverRoundedIcon
                    className="note-delete"
                    sx={{
                      fontSize: 22,
                      color: "#ff5959",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleDeleteNote({ noteId: note?._id });
                      console.log("delete note", note?._id);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={"note-create"}>
            <input
              type="text"
              placeholder="Title"
              className="note-create-title"
              value={newNoteData.title}
              onChange={(e) =>
                setNewNoteData({ ...newNoteData, title: e.target.value })
              }
            />
            <textarea
              placeholder="Content"
              className="note-create-content"
              value={newNoteData.content}
              onChange={(e) =>
                setNewNoteData({ ...newNoteData, content: e.target.value })
              }
            />
            <div className="note-create-buttons">
              <button
                className="note-create-button"
                onClick={() => {
                  setNewNote(false);
                  handleCreateNote();
                }}
              >
                Add
              </button>
              <button
                className="note-create-button"
                onClick={() => {
                  setNewNote(false);
                  setNewNoteData({
                    title: "",
                    content: "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendNotes;
