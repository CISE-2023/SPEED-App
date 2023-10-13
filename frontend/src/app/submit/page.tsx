"use client";

import { useState } from "react";

import style from "../styles/Submit.module.css";

export default function SubmitPage() {
  const [title, setTitle] = useState("");
  const [journal, setJournal] = useState("");
  const [publication, setPublication] = useState(0);
  const [author, setAuthor] = useState("");
  const [volume, setVolume] = useState("");
  const [number, setNumber] = useState(0);
  const [doi, setDOI] = useState(0);
  const [comments, setComments] = useState("");

  return (
    <div className="page">
      <div className="pageContents">
        <h1 className="heading">SUBMIT ARTICLE</h1>
        <p className="text">
          Fill in the form manually below or upload an article in BibTeX Format
          to submit an article to the database.
        </p>
        <form>
          <div className={style.wrapper}>
            <div className={style.columnWrapper}>
              <label className="text">
                Article Title <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="title"
                required={true}
                className={style.inputBox}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />

              <label className="text">
                Journal Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="journal"
                required={true}
                className={style.inputBox}
                onChange={(e) => {
                  setJournal(e.target.value);
                }}
              />

              <label className="text">
                Year of Publication <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                id="publication"
                required={true}
                className={style.inputBox}
                onChange={(e) => {
                  setPublication(parseInt(e.target.value));
                }}
              />
            </div>
            
            <div className={style.columnWrapper}>
              <label className="text">
                Authors <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="author"
                required={true}
                className={style.inputBox}
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
              />

              <label className="text">
                DOI <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                id="doi"
                required={true}
                className={style.inputBox}
                onChange={(e) => {
                  setDOI(parseInt(e.target.value));
                }}
              />

              <div className={style.rowWrapper}>
                <div className={style.columnWrapper}>
                  <label className="text">
                    Volume
                  </label>
                  <input
                    type="text"
                    className={style.inputBox}
                    onChange={(e) => {
                      setVolume(e.target.value);
                    }}
                  />{" "}
                </div>
                
                <div className={style.columnWrapper}>
                  <label className="text" htmlFor="number">
                    Number
                  </label>
                  <input
                    type="number"
                    id="number"
                    className={style.inputBox}
                    onChange={(e) => {
                      setNumber(parseInt(e.target.value));
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={style.endWrapper}>
            <div className={style.columnWrapper}>
              <label className="text">Comments</label>
              <textarea
                rows={8}
                className={style.textArea}
                cols={50}
                id="comments"
                onChange={(e) => {
                  setComments(e.target.value);
                }}
              />
            </div>
            <input className="submit" type="submit" value="Submit Form" />
          </div>
        </form>
      </div>
    </div>
  );
}
