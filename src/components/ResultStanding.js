// @flow

import React from 'react';


type ResultStandingProps = {
    quizResultList: string
};

const ResultStanding = (props: ResultStandingProps) => (
        <div>
             <strong>{props.quizResultList}</strong>!
        </div>

);

export default ResultStanding;