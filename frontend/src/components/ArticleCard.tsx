import React from 'react';

type Props = {
    article: {
        title: string;
        seMethod: string;
        claim: string;
        comments: string;
    };
};

const ArticleCard = ({article}: Props) => {
    return (
        <div>
            <strong>Article Title:</strong> {article.title} <br/>
            <strong>SE Method:</strong> {article.seMethod} <br/>
            <strong>Claim:</strong> {article.claim} <br/>
            <strong>Comments:</strong> {article.comments} <br/><br/>
        </div>
    )
}

export default ArticleCard;