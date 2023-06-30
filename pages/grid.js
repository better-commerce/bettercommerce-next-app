import { useMemo, useState } from 'react';
import { NextSeo } from 'next-seo';
import Breadcrumb from '@components/utils/Breadcrumb';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.min.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import GridData from 'sample-data/grid.json'
import GridColumns from 'sample-data/columnDef.json'
export default function Grid() {
  const pagesBreadcumbs = [
    { name: 'AG Grid Data', href: '/mytasks', current: true }
  ];
  const pageTitle = 'AG Grid Data';
  const [rowData] = useState(GridData.Data);

  const [columnDefs] = useState(GridColumns.ColumnDef);
  const containerStyle = useMemo(
    () => ({ width: '100%', height: '100%', margin: '15px 25px' }),
    []
  );
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
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
        {/* {JSON.stringify(data)} */}

        <div style={containerStyle}>
          <div style={gridStyle} className="ag-theme-alpine">
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
        </div>
      </div>
    </>
  );
}
