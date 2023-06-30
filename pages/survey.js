import { NextSeo } from 'next-seo';
import Breadcrumb from '@components/utils/Breadcrumb';
import { Container } from 'react-bootstrap';
import SurveyComponent from '@components/survey';
import SurveyData from "sample-data/survey.json"
export default function Survey() {
  const pagesBreadcumbs = [{ name: 'Survey', href: '/mytasks', current: true }];
  const pageTitle = 'Survey';
  const surveyJson = SurveyData.Data

  const postAPIUrl = '';
  return (
    <>
      <NextSeo title={pageTitle} titleTemplate="%s - BetterCommerce"></NextSeo>
      <Breadcrumb pages={pagesBreadcumbs}></Breadcrumb>
      <div className="h-screen pb-10 form-container">
        <div className="flex justify-between w-full px-4 mt-4">
          <div className="justify-start">
            <h3 className="text-xl font-medium text-black headings">
              {pageTitle}
            </h3>
          </div>
        </div>
        <div className="flex flex-col w-full px-4 mt-4">
          <div className="bg-white rounded shadow-sm h-80">
            <SurveyComponent formJson={surveyJson} postAPIUrl={postAPIUrl} />
          </div>
        </div>
      </div>
    </>
  );
}
