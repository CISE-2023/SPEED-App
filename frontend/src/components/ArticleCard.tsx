import React from 'react';

type Props = {
    article: {
        title: string;
        source: string;
        publication: number;
        author: string;
        volume: string;
        number: number;
        doi: string;
        comments: string;
    };
};

const ArticleCard = ({article}: Props) => { 
    const jsx = (
        <>
            <strong>Claim:</strong> {article.volume} <br/>
        </>
    )

    return (
        <div>
            <strong>Article Title:</strong> {article.title} <br/>
            <strong>Source:</strong> {article.source} <br/>
            <strong>publication:</strong> {article.publication} <br/>
            <strong>Author(s):</strong> {article.author} <br/>
            {article.volume 
                ?  <><strong>Volume:</strong> {article.volume} <br/></> 
                : null}
            {article.number 
                ?  <><strong>Number:</strong> {article.number} <br/></> 
                : null}
            {article.doi
                ?  <><strong>DOI:</strong> {article.doi} <br/></> 
                : null}
            <strong>Comments:</strong> {article.comments} <br/><br/>
        </div>
    )
}

export default ArticleCard;