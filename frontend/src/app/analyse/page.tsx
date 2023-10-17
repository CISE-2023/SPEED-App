"use client";

// Packages
import { useEffect, useState } from "react";
import axios from 'axios';

// Components
import ArticleCard from "@/components/ArticleCard";

export default function AnalysisPage() {
    const [articles, setArticles] = useState([]); // Initialise an array of articles using the useState hook

    /* AXIOS */

    useEffect(() => {
        axios
            .get('http://localhost:3001/moderate') // Request data from the API (at the URL of our backend server) using the GET method
            .then((response) => {
                setArticles(response.data); // Use the data retrieved from the GET method to populate the articles variable
            })
            .catch((error) => {
                console.error('Error retrieving a response from the backend server.'); // Log an error message if the request failed
            });
    }, []); // Leave dependencies empty so that the useEffect hook triggers once when the page first loads 

    const articlesList = 
        articles.length === 0 // Check if any articles exist in the array
            ? 'There are currently no articles in the queue.' 
            : articles.map((article, index) => <ArticleCard article={article} analysis={true} key={index}/>); // Map each retrieved article to a JSX component for rendering

    /* RENDER */

    return (
        <div>
            <h1>Analysis Page</h1>
            <div>{articlesList}</div>
        </div>
    );
}