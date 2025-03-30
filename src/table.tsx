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
    const { data: fetchedStudents } = await jayClient.models.StudentList.list();
    console.log("Pre-mapping: " + fetchedStudents);
    interface Student {
      email: string;
      firstName: string;
      lastName: string;
      DOB: string;
      schoolName: string;
      coordinatorName: string;
      teacherName: string;
    }

    const students: Student[] = fetchedStudents.map(student => ({
      email: student?.email ?? "empty",
      firstName: student?.firstName ?? "empty",
      lastName: student?.lastName ?? "empty",
      DOB: student?.DOB ?? "empty",
      schoolName: student?.schoolName ?? "empty",
      coordinatorName: student?.coordinatorName ?? "empty",
      teacherName: student?.teacherName ?? "empty"
    }));

    return students;
  };

  const [rowData, setRowData]: any[] = useState(fetchStudents());

  /*
  const myArray = fetchStudents();
  for (let i = 0, len = myArray.length; i < len; i++) {
    console.log(myArray[i].email);
    console.log(myArray[i].firstName);
    console.log(myArray[i].lastName);
    console.log(myArray[i].schoolName);
    console.log(myArray[i].coordinatorName);
    console.log(myArray[i].teacherName);
  }
  */
    console.log("After mapping: " + fetchStudents);
    console.log("Row data print: " + setRowData);

const [colsDef, setColsDef]: any[] = useState([
  { field: "email" },
  { field: "firstName" },
  { field: "lastName" },
  { field: "DOB" },
  { field: "schoolName" },
  { field: "coordinatorName" },
  { field: "teacherName" },
]);  
console.log("ColsDef print: " + setColsDef);
  
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
        paginationPageSize={20}
      />
    </div>
  );
};

export default MyTable;