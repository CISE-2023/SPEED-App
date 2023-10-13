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
        <p>
          Fill in the form manually below or upload an article in BibTeX Format
          to submit an article to the database.
        </p>
        <form className="pageContents">
          <div className={style.wrapper}>
            <div className={style.columnWrapper}>
              <label htmlFor="title">
                Article Title <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="title"
                required={true}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />

              <label htmlFor="journal">
                Journal Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="journal"
                required={true}
                onChange={(e) => {
                  setJournal(e.target.value);
                }}
              />

              <label htmlFor="publication">
                Year of Publication <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                id="publication"
                required={true}
                onChange={(e) => {
                  setPublication(parseInt(e.target.value));
                }}
              />
            </div>
            
            <div className={style.columnWrapper}>
              <label htmlFor="author">
                Authors <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="author"
                required={true}
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
              />

              <label htmlFor="doi">
                DOI <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                id="doi"
                required={true}
                onChange={(e) => {
                  setDOI(parseInt(e.target.value));
                }}
              />

              <div className={style.rowWrapper}>
                <div className={style.columnWrapper}>
                  <label className="temp" htmlFor="volume">
                    Volume
                  </label>
                  <input
                    className="halfSize"
                    type="text"
                    id="volume"
                    onChange={(e) => {
                      setVolume(e.target.value);
                    }}
                  />{" "}
                </div>
                
                <div className={style.columnWrapper}>
                  <label className="temp" htmlFor="number">
                    Number
                  </label>
                  <input
                    type="number"
                    id="number"
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
              <label htmlFor="comments">Comments</label>
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
