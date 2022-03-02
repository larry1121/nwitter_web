import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { useState } from "react";
import { storageService } from "fbase";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);
  const urlRef = ref(storageService, nweetObj.attachmentURL);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
        await deleteDoc(NweetTextRef );
        if(nweetObj.nweetObj.attachmentUrl !== "" ){
          await deleteObject(urlRef);
          }
        
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(NweetTextRef, {
        nweetObj : {text: newNweet,createdAt:`${nweetObj.nweetObj.createdAt}`,creatorId:`${nweetObj.nweetObj.creatorId}`,attachmentUrl:`${nweetObj.nweetObj.attachmentUrl}`},
        });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  console.log(nweetObj);
  console.log(nweetObj.id);
  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{`${nweetObj.nweetObj.text}`}</h4>
          {nweetObj.nweetObj.attachmentUrl && <img src={nweetObj.nweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="nweet__actions">
               <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;