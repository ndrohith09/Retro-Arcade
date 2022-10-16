import React, { useState } from "react";
import Title from "./Title";
import "./Home.css";
import Upload from "./Upload";
import Image from "./Image";
import Modal from "./Modal";
import Login from "./Login";
import Footer from "./Footer";
import bg from "../assets/main.mp4"
import { useUser } from '../hooks/useUser';

function Home () {
  const { signedIn } = useUser();
  const [selectedImg, setSelectedImg] = useState(null);
  const [down, setDown] = useState(null);

  return (
    <div className="home">
      {!signedIn && <video autoPlay loop muted>
        <source src={bg} type="video/mp4"/></video>}
      <Title
        quote={
          !signedIn
            ? "You dont take photograph. You make it! Enjoy using this app"
            : "Photography is the art of making memories tangible."
        }
      />
      {!signedIn && (
        <Login />
      )}
      {signedIn && <Upload />}
      {signedIn && <Image setSelectedImg={setSelectedImg} />}
      {signedIn && selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
      <Footer fixed={!signedIn} />
    </div>
  );
}

export default Home;
