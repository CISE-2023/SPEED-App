"use client";

// Packages
import { useEffect, useState } from "react";
import axios from 'axios';
import style from "../styles/ArticleCard.module.css";

// Components
import ArticleCard from "@/components/ArticleCard";

export default function AnalysisPage() {
    const [articles, setArticles] = useState([]); // Initialise an array of articles using the useState hook

    const onSubmit = (article: any) => {
        console.log("The article has been analysed and submitted to the SPEED database!");
        axios  
            .post('http://localhost:3001/analysis', article) // Send article to the SPEED database
            .then(() => {
                axios
                    .delete(`http://localhost:3001/moderate/${article.id}`) // Remove the submitted article from the analysis queue once it has been completed analysis
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    /* AXIOS */

    const getArticleData = () => {
        axios
            .get('http://localhost:3001/moderate') // Request data from the API (at the URL of our backend server) using the GET method
            .then((response) => {
                setArticles(response.data); // Use the data retrieved from the GET method to populate the articles variable
            })
            .catch(() => {
                console.error('Error retrieving a response from the backend server.'); // Log an error message if the request failed
            });
    }

    useEffect(() => {
        getArticleData();
    }, []); // Leave dependencies empty so that the useEffect hook triggers once when the page first loads 

    const articlesList = 
        articles.length === 0 // Check if any articles exist in the array
            ? 'There are currently no articles in the queue.' 
            : articles.map((article, index) => <ArticleCard article={article} analysis={true} aSubmit={onSubmit} index={index} key={index}/>); // Map each retrieved article to a JSX component for rendering

    /* RENDER */

    return (
        <div>
             <div className="pageAuto">
            <div>
                <h1 className={style.heading}>Analyse Articles:</h1>
                {articlesList}
            </div>
        </div>
        </div>
    );
}