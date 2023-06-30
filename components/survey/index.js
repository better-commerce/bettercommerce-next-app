import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";

function SurveyComponent({formJson, postAPIUrl}) {
    const survey = new Model(formJson);
    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
        //post the captured data here = postEndpoint
    });
    return (<Survey model={survey} />);
}

export default SurveyComponent;