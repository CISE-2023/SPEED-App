"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import emailjs from '@emailjs/browser';

import style from "../styles/Submit.module.css";

require('dotenv').config();
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "";
emailjs.init(EMAILJS_USER_ID);

export default function SubmitPage() {
  const router = useRouter();
  const { v4: uuidv4 } = require('uuid');
  
  const [article, setArticle] = useState({
      id: uuidv4(),
      title: '',
      source: '',
      publication: '',
      author: '',
      volume: '',
      number: '',
      doi: '',
      comments: '',
  });

  const [textEnabled, setTextEnabled] = useState(false);

  const onChange = (e: React.ChangeEvent<any>) => {
    setArticle({ ...article, [e.target.id]: e.target.value});
  }

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    axios
      .post('http://localhost:3001/articles', article)
      .then((res) => {
        setArticle({
          id: uuidv4(),
          title: '',
          source: '',
          publication: '',
          author: '',
          volume: '',
          number: '',
          doi: '',
          comments: '',
        }); // Reset the article variable to it's default values once it has been posted to the API

        setTextEnabled(true); // Enable the confirmation text at the bottom of the page if the new article is successfully posted to the API

        //sendEmail(); // Sends email notification to moderator

        setTimeout(() => {
            setTextEnabled(false); // Disable the confirmation text after a few seconds
        }, 2000)
      })
      .catch((error) => {
          console.error(error);
      });
  }

  /* EMAILJS */
  const sendEmail = () => {
    const emailParams = {
      role: "moderation",
      title: article.title,
      comments: article.comments ? "Comments: "+article.comments : "",
      url: "http://localhost:3000/moderate" 
    };

    // Sends email
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams)
    .then((response) => {
        console.log('Email sent:', response);
      })
      .catch((error) => {
        console.error('Email error:', error);
      });
  };
  

  return (
    <div className="page">
      <div className="pageContents">
        <h1 className="heading">SUBMIT ARTICLE</h1>
        <p className="text">
          Fill in the form manually below or upload an article in BibTeX Format
          to submit an article to the database.
        </p>
        <form onSubmit={handleSubmit}>
          <div className={style.wrapper}>
            <div className={style.columnWrapper}>
              <label className="text">
                Article Title <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className={style.inputBox}
                type="text"
                id="title"
                value={article.title}
                required={true}
                onChange={onChange}
              />

              <label className="text">
                Source <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className={style.inputBox}                
                type="text"
                id="source"
                value={article.source}
                required={true}
                onChange={onChange}
              />

              <label className="text">
                Year of Publication <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className={style.inputBox}
                type="number"
                id="publication"
                value={article.publication}
                required={true}
                onChange={onChange}
              />
            </div>
            
            <div className={style.columnWrapper}>
              <label className="text">
                Authors <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className={style.inputBox}
                type="text"
                id="author"
                value={article.author}
                required={true}
                onChange={onChange}
              />

              <label className="text">
                DOI <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className={style.inputBox}
                type="text"
                id="doi"
                value={article.doi}
                required={true}
                onChange={onChange}
              />

              <div className={style.rowWrapper}>
                <div className={style.columnWrapper}>
                  <label className="text">
                    Volume
                  </label>
                  <input
                    className={style.inputBox}
                    type="number"
                    id="volume"
                    value={article.volume}
                    required={true}
                    onChange={onChange}
                  />{" "}
                </div>
                
                <div className={style.columnWrapper}>
                  <label className="text" htmlFor="number">
                    Number
                  </label>
                  <input
                    className={style.inputBox}
                    type="number"
                    id="number"
                    value={article.number}
                    required={true}
                    onChange={onChange}
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
                onChange={onChange}
              />
            </div>
            <input className="submit" type="submit" value="Submit Form" />
            {textEnabled 
              ? <span style={{color:"green"}}>&nbsp;<strong>Your new article has been successfully submitted!</strong></span>
              : null}
          </div>
        </form>
      </div>
    </div>
  );
}