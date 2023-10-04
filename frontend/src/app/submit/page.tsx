"use client";

import { useState } from "react";

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
        <div>
            <h1>Submit Article</h1>
            <p>Fill in the form manually below or upload an article in BibTeX Format to submit an article to the database.</p>
            <form>
                <label htmlFor="title">Article Title <span style={{color:"red"}}>*</span></label><br />
                <input
                    type="text"
                    id="title"
                    required={true}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <br /> <br />

                <label htmlFor="journal">Journal Name <span style={{color:"red"}}>*</span></label><br />
                <input
                    type="text"
                    id="journal"
                    required={true}
                    onChange={(e) => {
                        setJournal(e.target.value);
                    }}
                />                
                <br />
                <br />
                
                <label htmlFor="publication">Year of Publication  <span style={{color:"red"}}>*</span></label><br />
                <input
                    type="number"
                    id="publication"
                    required={true}
                    onChange={(e) => {
                        setPublication(parseInt(e.target.value));
                    }}
                />
                <br />
                <br />
                
                <label htmlFor="author">Authors  <span style={{color:"red"}}>*</span></label><br />
                <input
                    type="text"
                    id="author"
                    required={true}
                    onChange={(e) => {
                        setAuthor(e.target.value);
                    }}
                />
                <br />
                <br />

                <label htmlFor="doi">DOI  <span style={{color:"red"}}>*</span></label><br />
                <input
                    type="number"
                    id="doi"
                    required={true}
                    onChange={(e) => {
                        setDOI(parseInt(e.target.value));
                    }}
                />
                <br />
                <br />

                <label className="temp" htmlFor="volume">Volume</label>          
                <label className="temp" htmlFor="number">Number</label><br />
                
                <input 
                    className="halfSize"
                    type="text"
                    id="volume"     
                    onChange={(e) => {
                        setVolume(e.target.value);
                    }}
                /> &nbsp;
                <input
                    className="halfSize"
                    type="number"
                    id="number"    
                    onChange={(e) => {
                        setNumber(parseInt(e.target.value));
                    }}
                />
                
                <br />
                <br />           

                <label htmlFor="comments">Comments</label><br />
                <textarea
                    rows={8}
                    cols={50}
                    id="comments"
                    onChange={(e) => {
                        setComments(e.target.value);
                    }}
                />
                <br />
                <br />   
                
                <input type="submit" />
            </form>
        </div>
    );
}