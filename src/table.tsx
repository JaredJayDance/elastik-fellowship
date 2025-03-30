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

    const students: Student[] = [];

    for (let i = 0, len = fetchedStudents.length; i < len; i++) {
      students.push({
        email: fetchedStudents[i].email ?? "empty",
        firstName: fetchedStudents[i].firstName ?? "empty",
        lastName: fetchedStudents[i].lastName ?? "empty",
        DOB: fetchedStudents[i].DOB ?? "empty",
        schoolName: fetchedStudents[i].schoolName ?? "empty",
        coordinatorName: fetchedStudents[i].coordinatorName ?? "empty",
        teacherName: fetchedStudents[i].teacherName ?? "empty"
      });
    }

    return students as Student[];
  };
  const studentArray = fetchStudents();
  console.log("studentArray equals: ");
  console.log(studentArray);
  const [rowData, setRowData]: any[] = useState(studentArray);

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

  {
      "email": "exampleemailB@gmail.com",
      "firstName": "Barry",
      "lastName": "Willis",
      "DOB": "02/02/2002",
      "schoolName": "Elastik Demo School",
      "coordinatorName": "exampleCoord",
      "teacherName": "exampleTeach",
    },
    {
      "email": "exampleemail@gmail.com",
      "firstName": "Kathy",
      "lastName": "Berrigan",
      "DOB": "01-01-2001",
      "schoolName": "BPSchool",
      "coordinatorName": "ExampleCoord",
      "teacherName": "ExampleTeacher",
    }
  */
    console.log("After mapping: ");
    console.log(fetchStudents())
    console.log(setRowData);

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