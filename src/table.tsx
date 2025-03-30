import {  useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import type { Schema } from "../amplify/data/resource"; 
import { generateClient } from "aws-amplify/data";

const jayClient = generateClient<Schema>();

ModuleRegistry.registerModules([AllCommunityModule]);

// Create new GridExample component
const MyTable = () => {


  const fetchStudents = async () => {
    const { data: students } = await jayClient.models.StudentList.list();
    console.log(students);
    return students;
  };

  console.log(fetchStudents);

  // Row Data: The data to be displayed.
  /*
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },

  ]);
  console.log(setRowData);
  */


  //TODO: Have to format the fetchStudents results to match the below format
  const [rowData, setRowData]: any[] = useState(fetchStudents());
  console.log(setRowData);

  // Column Definitions: Defines & controls grid columns.
  /*
  const [colsDef, setColsDef]: any[] = useState([
      { field: "make" },
      { field: "model" },
      { field: "price" },
      { field: "electric" },
    ]);  
    console.log(setColsDef);
  */

const [colsDef, setColsDef]: any[] = useState([
  { field: "id", hide: true },
  { field: "email" },
  { field: "firstName" },
  { field: "lastName" },
  { field: "DOB" },
  { field: "schoolName" },
  { field: "coordinatorName" },
  { field: "teacherName" },
  { field: "createdAt", hide: true },
  { field: "updatedAt", hide: true }
]);  
console.log(setColsDef);
  
  const defaultColDef = {
    flex: 1,
  };

  return (
    <div className="ag-theme-alpine" style={{ width: "800px", height: "480px" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colsDef}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default MyTable;