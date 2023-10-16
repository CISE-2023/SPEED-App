"use client";

// Packages
import { useEffect, useState } from "react";
import axios from 'axios';

// Components
import ArticleCard from "@/components/ArticleCard";

export default function ModerationPage() {
    const [articles, setArticles] = useState([]); // Initialise an array of articles using the useState hook

    const approved = (status: boolean, article: any) => {
        console.log(`article was approved: ${status}`);

        if(status) {            
            axios
                .post('http://localhost:3001/moderate', article) // Send article to analysis queue
                .then(() => {
                    axios
                        .delete(`http://localhost:3001/articles/${article.id}`) // Remove approved article from moderation queue after sending to analyst
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
        } else {             
            axios
                .post('http://localhost:3001/rejected', article) // Send article to rejection queue
                .then(() => {
                    axios
                        .delete(`http://localhost:3001/articles/${article.id}`) // Remove approved article from moderation queue after sending to analyst
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
        }
    }

    /* AXIOS */

    const getArticleData = () => {
        axios
            .get('http://localhost:3001/articles') // Request data from the API (at the URL of our backend server) using the GET method
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
            : articles.map((article, index) => <ArticleCard article={article} moderation={true} modButton={approved} key={index}/>); // Map each retrieved article to a JSX component for rendering

    /* RENDER */

    return (
        <div>
            <h1>Moderation Page</h1>
            <div>{articlesList}</div>
        </div>
    );
}