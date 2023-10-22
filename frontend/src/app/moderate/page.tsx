"use client";

// Packages
import { useEffect, useState } from "react";
import axios from 'axios';
import style from "../styles/ArticleCard.module.css";
import emailjs from '@emailjs/browser';

// Components
import ArticleCard from "@/components/ArticleCard";

// EmailJS
require('dotenv').config();
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_USERTEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_USERTEMPLATE_ID || "";
const EMAILJS_USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "";
emailjs.init(EMAILJS_USER_ID);

export default function ModerationPage() {
    const [articles, setArticles] = useState([]); // Initialise an array of articles using the useState hook

    const approved = (status: boolean, article: any) => {
        console.log(`article approved status: ${status}`);

        if(status) {            
            axios
                .post('https://speed-app-backend.vercel.app/moderate', article) // Send article to analysis queue
                .then(() => {
                    axios
                        .delete(`https://speed-app-backend.vercel.app/articles/${article.id}`) // Remove approved article from moderation queue after sending to analyst        
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch((error) => {
                    console.error(error);
                });
                //sendEmail(article); // Sends email notification to analyst
                //sendUserEmail(article, status); // Sends email notification to user  
        } else {             
            axios
                .post('https://speed-app-backend.vercel.app/rejected', article) // Send article to rejection queue
                .then(() => {
                    axios
                        .delete(`https://speed-app-backend.vercel.app/articles/${article.id}`) // Remove approved article from moderation queue after sending to analyst
                        .then(() => {
                            getArticleData();
                        })            
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch((error) => {
                    console.error(error);
                });
                //sendUserEmail(article, status); // Sends email notification to user
        }
    }

    /* AXIOS */

    const getArticleData = () => {
        axios
            .get('https://speed-app-backend.vercel.app/articles') // Request data from the API (at the URL of our backend server) using the GET method
            .then((response) => {
                setArticles(response.data); // Use the data retrieved from the GET method to populate the articles variable
            })
            .catch((error) => {
                console.error('Error retrieving a response from the backend server.'); // Log an error message if the request failed
            });
    }

    useEffect(() => {
        getArticleData();
    }, []); // Leave dependencies empty so that the useEffect hook triggers once when the page first loads 

    const articlesList = 
        articles.length === 0 // Check if any articles exist in the array
            ? 'There are currently no articles in the queue.' 
            : articles.map((article, index) => <ArticleCard article={article} moderation={true} mSubmit={approved} index={index} key={index}/>); // Map each retrieved article to a JSX component for rendering

    /* EMAILJS */
    const sendEmail = (article: any) => {
        const emailParams = { // Sets values for message variables
            role: "analysis",
            title: article.title,
            comments: article.comments ? "Comments: "+article.comments : "",
            url: "http://localhost:3000/analyse" 
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

    const sendUserEmail = (article: any, status: boolean) => {
        const emailParams = { // Sets values for message variables
            title: article.title,
            status: status ? "Approved" : "Rejected",
            result: status ? "Your article was approved, it will be updated to the website shortly." : "Your article was rejected, it did not meet our submission guidelines."

        };
        console.log("TITLE"+article.title);

        // Sends email
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_USERTEMPLATE_ID, emailParams)
        .then((response) => {
            console.log('Email sent:', response);
            })
            .catch((error) => {
            console.error('Email error:', error);
            });
        };

    /* RENDER */

    return (
        <div className="pageAuto">
            <div className={style.pageContents}>
                <h1 className="heading">MODERATE</h1>
                {articlesList}
            </div>
        </div>
    );
}