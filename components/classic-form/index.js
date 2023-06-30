import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";

function ClassicForm({ formJson }) {
  if (!formJson) {
    return (
      <div className="container mx-auto">
        <p>Loading data..</p>
      </div>
    )
  }

  const survey = new Model(formJson);

  survey.onComplete.add((sender, _options) => {
      console.log(JSON.stringify(sender.data, null, 3));
  });

  return <Survey className="text-sm bg-white shadow" model={survey} />;
}

export default ClassicForm;