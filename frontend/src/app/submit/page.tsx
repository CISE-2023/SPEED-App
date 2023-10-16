"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

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

                setTimeout(() => {
                    setTextEnabled(false); // Disable the confirmation text after a few seconds
                }, 2000)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div>
            <h1>Submit Article</h1>
            <p>Fill in the form manually below or upload an article in BibTeX Format to submit an article to the database.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Article Title <span style={{color:"red"}}>*</span></label><br />
                <input
                    type="text"
                    id="title"
                    value={article.title}
                    required={true}
                    onChange={onChange}
                />
                <br /> <br />

                <label htmlFor="source">Source <span style={{color:"red"}}>*</span></label><br />
                <input
                    type="text"
                    id="source"
                    value={article.source}
                    required={true}
                    onChange={onChange}
                />                
                <br />
                <br />
                
                <label htmlFor="publication">Year of Publication  <span style={{color:"red"}}>*</span></label><br />
                <input
                    type="number"
                    id="publication"
                    value={article.publication}
                    required={true}
                    onChange={onChange}
                />
                <br />
                <br />
                
                <label htmlFor="author">Authors  <span style={{color:"red"}}>*</span></label><br />
                <input
                    type="text"
                    id="author"
                    value={article.author}
                    required={true}
                    onChange={onChange}
                />
                <br />
                <br />

                <label htmlFor="doi">DOI</label><br />
                <input
                    type="text"
                    id="doi"
                    value={article.doi}
                    onChange={onChange}
                />
                <br />
                <br />

                <label className="temp" htmlFor="volume">Volume</label>          
                <label className="temp" htmlFor="number">Number</label><br />
                
                <input 
                    className="halfSize"
                    type="text"
                    id="volume"     
                    value={article.volume}
                    onChange={onChange}
                /> &nbsp;
                <input
                    className="halfSize"
                    type="number"
                    id="number"    
                    value={article.number}
                    onChange={onChange}
                />                
                <br />
                <br />           

                <label htmlFor="comments">Comments</label><br />
                <textarea
                    rows={8}
                    cols={50}
                    id="comments"
                    value={article.comments}
                    onChange={onChange}
                />
                <br />
                <br />   
                
                <input type="submit" />  

                {textEnabled 
                    ? <span style={{color:"green"}}>&nbsp;<strong>Your new article has been successfully submitted!</strong></span>
                    : null
                }
                <br /> 
            </form>
        </div>
    );
}