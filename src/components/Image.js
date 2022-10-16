import React, { useState } from "react";
import useFirestore from "../hooks/useFirestore";
import "./Image.css";
import { motion } from "framer-motion";
import axios from "axios";
import { firestore } from "../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { useUser } from "../hooks/useUser";
import { useTheme } from "../hooks/useTheme";

function Image({ setSelectedImg }) {
  const accountSid = "AC7f63b2a0aa094b51bcf03fc5201c744e";
  const authToken = "46f2a5e441e54855d27125681eb3254d";
  //const client = require("twilio")(accountSid, authToken);
  const { user } = useUser();
  const { docs, setDocs } = useFirestore({ collections: user.displayName });
  const { isDarkMode } = useTheme();
  function deleteImage(id) {
    setDocs((pre) => {
      return pre.filter((item, index) => {
        if (index == id) {
          const ref = doc(firestore, user.displayName, item.id);
          deleteDoc(ref).then(() => {
            console.log("Deleted!");
          });
          console.log("delete" + id);
        }
      });
    });
  }
  const [nu, setNu] = useState("");
  const [url, setUrl] = useState("");
  function sendSMS(u) {
    console.log(u)
    setUrl(u);
  }
  function setNumber(){
    axios({
      method: "post",
      url: `http://localhost:8000/twilio?url=${url}&mobile=${nu}`,
    }).then((message) => {console.log(message);
      window.location.reload()
    });
    // client.messages
    //   .create({
    //     body: url,
    //     from: "+13854104089",
    //     to: nu,
    //   })
    //   .then((message) => console.log(message.sid));
    // console.log(nu);
  }
  const [uL,setU] = useState(null);
  const [imgId, setImgId] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className="imageGrid">
      {docs &&
        docs.map((doc, index) => (
          <div key={doc.id}>
            <div className="card">
              <div className="card-header">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#pModal"
                  className={
                    isDarkMode ? "image-delete dark" : "image-delete light"
                  }
                  style={{ marginLeft: "10px" }}
                  onClick={() => sendSMS(doc.url)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-cloud-download"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />{" "}
                    <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z" />{" "}
                  </svg>
                </button>
                <button
                  className={
                    isDarkMode ? "image-delete dark" : "image-delete light"
                  }
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    setImgId(index);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </button>
                <button
                  className={
                    isDarkMode ? "image-delete dark" : "image-delete light"
                  }
                  onClick={() => setSelectedImg(doc.url)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                </button>
              </div>
              <div className="card-body">
                <motion.div
                  className="img-wrap"
                  id={index}
                  layout
                  whileHover={{ opacity: 1 }}
                >
                  <motion.img
                    src={doc.url}
                    onClick={() => setSelectedImg(doc.url)}
                    alt="uploaded pic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  />
                  <div
                    className="modal fade"
                    id="pModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Download Image
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="Box">
                              <h3 className="boxh">Phone Number: </h3>
                              <input
                                type="text"
                                name="num"
                                className="BoxI"
                                value={nu}
                                onChange={(e) => {
                                  setNu(e.target.value);
                                }}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={setNumber}
                              className="btn btn-primary"
                            >
                              Download
                            </button>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal fade" id="exampleModal" tabIndex="-1">
                    <div className="modal-dialog">
                      <div
                        className="modal-content"
                        style={{
                          color: "black",
                        }}
                      >
                        <div className="modal-header">
                          <h5 className="modal-title">Confirm deletion</h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <p>Do you confirm to delete this image?</p>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={() => {
                              deleteImage(imgId);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Image;
