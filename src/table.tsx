import {  useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import type { Schema } from "../amplify/data/resource"; 
import { generateClient } from "aws-amplify/data";

const jayClient = generateClient<Schema>();

ModuleRegistry.registerModules([AllCommunityModule]);

// Create new GridExample component
const MyTable = () => {
  // Row Data: The data to be displayed.

  const fetchStudents = async () => {
    const { data: students } = await jayClient.models.StudentList.list();
    console.log(students);
    return students;
  };

  console.log(fetchStudents);

  const [rowData, setRowData]: any[] = useState(fetchStudents());
  console.log(setRowData);

  // Column Definitions: Defines & controls grid columns.

const [colsDef, setColsDef]: any[] = useState([
  { field: "email" },
  { field: "firstName" },
  { field: "lastName" },
  { field: "DOB" },
  { field: "schoolName" },
  { field: "coordinatorName" },
  { field: "teacherName" },
  ]);  
  console.log(setColsDef);

  /**
   * { field: "email" },
    { field: "firstName" },
    { field: "lastName" },
    { field: "DOB" },
    { field: "schoolName" },
    { field: "coordinatorName" },
    { field: "teacherName" },
   */
  
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