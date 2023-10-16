"use client";

import React from 'react'
import { useState } from 'react';
import { ARTICLES } from '../../../testdata';

const Page = ({ searchParams, }: { searchParams: { seSelection: string;claimSelection: string; }}) => {
  
  const [articles, setArticles] = useState(ARTICLES.filter((article) => article.practice === searchParams.seSelection && article.claim === searchParams.claimSelection));
  
    return (
      <div>
      {articles.map((article) => (
        <div key={article.id} className="font-regular-8">
        <h4>Title: {article.title}</h4>
        <p>Claim: {article.claim}</p>
        <p>SE Method: {article.practice}</p>
        <p>Publication Year: {article.publication}</p>
        <p>Author(s): {article.author}</p>
      </div>
      ))}
    </div>
  )
}

export default Page