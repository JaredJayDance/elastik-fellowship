import {  useState, useEffect } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import type { Schema } from "../amplify/data/resource"; 
import { generateClient } from "aws-amplify/data";

const jayClient = generateClient<Schema>();

ModuleRegistry.registerModules([AllCommunityModule]);

// Create new GridExample component
const MyTable = () => {

  interface Student {
    email: string;
    firstName: string;
    lastName: string;
    DOB: string;
    schoolName: string;
    coordinatorName: string;
    teacherName: string;
  }

  var students: Student[] = [];

  const [rowData, setRowData] = useState<Student[]>([]);

  const [colsDef, setColsDef]: any[] = useState([
    { field: "email", filter: true },
    { field: "firstName", filter: true },
    { field: "lastName", filter: true },
    { field: "DOB", filter: true },
    { field: "schoolName", filter: true },
    { field: "coordinatorName", filter: true },
    { field: "teacherName", filter: true },
  ]);  
  console.log("ColsDef print: " + setColsDef);
    
    const defaultColDef = {
      flex: 1,
      filter: true
    };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data: fetchedStudents } = await jayClient.models.StudentList.list();

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

        setRowData(students);
        console.log("Students loaded:", students);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "480px" }}>
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