
import { dbService } from "fbase";
import { storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  } from "firebase/firestore";
  import NweetFactory from "components/NweetFactory";
import React, { useEffect, useState } from "react";
import Nweet  from "components/Nweet";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
//import {Nweet}  from "components/Nweet";이거안됨

const Home = ({ userObj }) => {
    
    const [nweets, setNweets] = useState([]);
    
  // const getNweets = async () => {
  //   const dbNweets = await dbService.collection("nweets").get();
  //   dbNweets.forEach((document) => {
  //     const nweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setNweets((prev) => [nweetObject, ...prev]);
  //   });
  // };
  useEffect(() => {
    const q = query(
    collection(dbService, "nweets"),
    
    );
    onSnapshot(q, (snapshot) => {
    const nweetArr = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    }));
    
    
    //console.log(nweetArr);
    setNweets(nweetArr);
    
    
    });
    
    }, []);
    //console.log(nweets);
    
    return (
      <div className="container">
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
          key={nweet.id}
          nweetObj={nweet}
          isOwner={nweet.nweetObj.creatorId===userObj.uid}
          />
        ))}
      </div>
        </div>
    );
};
export default Home;