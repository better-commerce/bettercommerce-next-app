import { useMemo, useState } from 'react';
import { NextSeo } from 'next-seo';
import Breadcrumb from '@components/utils/Breadcrumb';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.min.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import GridData from 'sample-data/grid.json';
import GridColumns from 'sample-data/columnDef.json';
import Parents from 'sample-data/collections.json';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { Col, Collapse, Container, ListGroup, Row } from 'react-bootstrap';
import Image from 'next/image';
import { useUI } from '@context/ui';

export default function DataList() {
  const [isCollepse, setIsCollepse] = useState(false);
  const [isSubCollepse, setIsSubCollepse] = useState(false);
  const [rootCategory, setRootCategory] = useState([]);
  const { isEditProductOpen } = useUI();
  const pagesBreadcumbs = [
    { name: 'Column Editor', href: '/mytasks', current: true }
  ];
  const [subCategories, setSubCategories] = useState([
    { name: 'Select Root Node' }
  ]);
  const pageTitle = 'Column Editor';
  const [rowData] = useState(GridData.Data);

  const [columnDefs] = useState(GridColumns.ColumnDef);
  const containerStyle = useMemo(
    () => ({ width: '100%', height: '100%', margin: '15px 25px' }),
    []
  );
  const fetchSubCategories = (name) => {
    setSubCategories([{ name: 'Loading...' }]);
    setRootCategory(name);
    handleResetQueryParams();
    if (name === 'All') {
      setQueryParams({ ...queryParams, rootCat: 'All', page: 1 });
      setSubCategories([]);
      return;
    }

    getSubCategories(name.toLowerCase()).then((values) => {
      if (!values?.error) {
        // const newCat = _.sortBy(values?.data.result, (item) => item.name.toLowerCase());
        setSubCategories(values?.data?.result);
      } else {
        setSubCategories([]);
        console.log(values?.error);
      }
    });
  };
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const toggleCategory = () => {
    setIsCollepse(true);
  };
  const toggleCategoryBack = () => {
    setIsCollepse(false);
  };
  const toggleSubCategory = () => {
    setIsSubCollepse(true);
  };
  const toggleSubCategoryBack = () => {
    setIsSubCollepse(false);
  };
  return (
    <>
      <NextSeo title={pageTitle} titleTemplate="%s - BetterCommerce"></NextSeo>
      <Breadcrumb pages={pagesBreadcumbs}></Breadcrumb>
      <Container fluid className="w-full">
        <Row className="py-0 justify-content-md-center vh-100">
          <Col
            md={isCollepse ? 1 : 2}
            className="relative h-100"
            dimension="width"
          >
            <Row className="h-100">
              <Col
                md={12}
                className="relative z-10 p-0 overflow-auto bg-white border-r border-gray-200 shadow h-100"
              >
                {!isCollepse ? (
                  <>
                    <ListGroup variant="flush">
                      {Parents?.parentCollection.map((category, index) => (
                        <ListGroup.Item
                          key={index}
                          onClick={() => fetchSubCategories(category.name)}
                          action
                          active={category.name === rootCategory}
                          disabled={category.name === rootCategory}
                          className="flex justify-between w-full h-10 py-2"
                        >
                          <span className="flex text-sm font-semibold">
                            {category.name}
                          </span>
                          <span className="flex arrow-top-2">
                            <Image
                              src="/arrow-right.png"
                              className="absolute justify-end inline-block w-auto"
                              width={9}
                              height={5}
                              alt="arrow-right-icon"
                            />
                          </span>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                    <span
                      onClick={() => toggleCategory()}
                      className="absolute z-50 cursor-pointer right-3 bottom-3 bottom-arrow-position"
                    >
                      <Image
                        src="/arrow-right.png"
                        className="relative justify-end inline-block w-auto rotate-180 bottom-2"
                        width={11}
                        height={11}
                        alt="arrow-right-icon"
                      />
                      <Image
                        src="/arrow-right.png"
                        className="relative justify-end inline-block w-auto rotate-180 bottom-2 -left-1"
                        width={11}
                        height={11}
                        alt="arrow-right-icon"
                      />
                    </span>
                  </>
                ) : (
                  <>
                    <ListGroup variant="flush">
                      {Parents?.parentCollection.map((category, index) => (
                        <ListGroup.Item
                          key={index}
                          onClick={() => fetchSubCategories(category.name)}
                          action
                          active={category.name === rootCategory}
                          disabled={category.name === rootCategory}
                          className="flex justify-between w-full h-10 py-2"
                        >
                          <span className="flex text-sm font-semibold">
                            {category.name.substring(0, 2)}
                          </span>
                          <span className="flex arrow-top-2">
                            <Image
                              src="/arrow-right.png"
                              className="absolute justify-end inline-block w-auto"
                              width={9}
                              height={5}
                              alt="arrow-right-icon"
                            />
                          </span>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                    <span
                      onClick={() => toggleCategoryBack()}
                      className="absolute z-50 cursor-pointer right-3 bottom-3 bottom-arrow-position"
                    >
                      <Image
                        src="/arrow-right.png"
                        className="relative justify-end inline-block w-auto bottom-2"
                        width={11}
                        height={11}
                        alt="arrow-right-icon"
                      />
                      <Image
                        src="/arrow-right.png"
                        className="relative justify-end inline-block w-auto bottom-2 -left-1"
                        width={11}
                        height={11}
                        alt="arrow-right-icon"
                      />
                    </span>
                  </>
                )}
              </Col>
            </Row>
          </Col>
          <Col
            md={isSubCollepse ? 1 : 2}
            className="relative h-100"
            dimension="width"
          >
            <Row className="h-100">
              <Col
                md={12}
                className="relative z-10 p-0 overflow-auto bg-white border-r border-gray-200 shadow h-100"
              >
                {!isSubCollepse ? (
                  <>
                    <ListGroup variant="flush">
                      {Parents?.childCollection.map((category, index) => (
                        <ListGroup.Item
                          key={index}
                          onClick={() => fetchSubCategories(category.name)}
                          action
                          active={category.name === rootCategory}
                          disabled={category.name === rootCategory}
                          className="flex justify-between w-full h-10 py-2"
                        >
                          <span className="flex text-sm font-semibold">
                            {category.name}
                          </span>
                          <span className="flex arrow-top-2">
                            <Image
                              src="/arrow-right.png"
                              className="absolute justify-end inline-block w-auto"
                              width={9}
                              height={5}
                              alt="arrow-right-icon"
                            />
                          </span>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                    <span
                      onClick={() => toggleSubCategory()}
                      className="absolute z-50 cursor-pointer right-3 bottom-3 bottom-arrow-position"
                    >
                      <Image
                        src="/arrow-right.png"
                        className="relative justify-end inline-block w-auto rotate-180 bottom-2"
                        width={11}
                        height={11}
                        alt="arrow-right-icon"
                      />
                      <Image
                        src="/arrow-right.png"
                        className="relative justify-end inline-block w-auto rotate-180 bottom-2 -left-1"
                        width={11}
                        height={11}
                        alt="arrow-right-icon"
                      />
                    </span>
                  </>
                ) : (
                  <>
                    <ListGroup variant="flush">
                      {Parents?.childCollection.map((category, index) => (
                        <ListGroup.Item
                          key={index}
                          onClick={() => fetchSubCategories(category.name)}
                          action
                          active={category.name === rootCategory}
                          disabled={category.name === rootCategory}
                          className="flex justify-between w-full h-10 py-2"
                        >
                          <span className="flex text-sm font-semibold">
                            {category.name.substring(0, 2)}
                          </span>
                          <span className="flex arrow-top-2">
                            <Image
                              src="/arrow-right.png"
                              className="absolute justify-end inline-block w-auto"
                              width={9}
                              height={5}
                              alt="arrow-right-icon"
                            />
                          </span>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                    <span
                      onClick={() => toggleSubCategoryBack()}
                      className="absolute z-50 cursor-pointer right-3 bottom-3 bottom-arrow-position"
                    >
                      <Image
                        src="/arrow-right.png"
                        className="relative justify-end inline-block w-auto bottom-2"
                        width={11}
                        height={11}
                        alt="arrow-left-icon"
                      />
                      <Image
                        src="/arrow-right.png"
                        className="relative justify-end inline-block w-auto bottom-2 -left-1"
                        width={11}
                        height={11}
                        alt="arrow-right-icon"
                      />
                    </span>
                  </>
                )}
              </Col>
            </Row>
          </Col>
          <Col
            md={
              isEditProductOpen
                ? 12
                : isCollepse
                ? isSubCollepse
                  ? 10
                  : 9
                : isSubCollepse
                ? 9
                : 8
            }
            className={
              isEditProductOpen
                ? `h-100 table-grid-container`
                : isCollepse
                ? `h-100 table-grid-container`
                : `h-100 table-grid-container`
            }
          >
            <div style={gridStyle} className="ag-theme-alpine w-full h-full md:h-[94%] 2xl:h-[97%]">
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={columnDefs}
                suppressRowClickSelection={true}
                groupSelectsChildren={true}
                rowSelection={'multiple'}
                rowGroupPanelShow={'always'}
                pivotPanelShow={'always'}
                paginationAutoPageSize={true}
                pagination={true}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
