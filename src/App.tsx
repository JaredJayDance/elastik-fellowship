import { useEffect, useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from "../amplify/data/resource"; 
import { generateClient } from "aws-amplify/data";
import MyTable from "./table";

const jayClient = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();

  const [students, showStudents] = useState<Array<Schema["StudentList"]["type"]>>([]);

  useEffect(() => {

    const sub = jayClient.models.StudentList.observeQuery().subscribe({
      next: ({ items }) => {
        showStudents([...items]);
      },
    });

    return () => sub.unsubscribe();
  }, []);

  const createStudent = async () => {
    await jayClient.models.StudentList.create({
      email: window.prompt("Add email"),
      firstName: window.prompt("First Name"),
      lastName: window.prompt("Last Name"),
      DOB: window.prompt("Students DOB"),
      schoolName: window.prompt("School"),
      coordinatorName: window.prompt("Coordinator"),
      teacherName: window.prompt("Teacher"),
    });
  };

  function deleteStudent(id: string) {
    jayClient.models.StudentList.delete({ id })
  } 

  return (
    <main>
      <h1>Hi {user?.signInDetails?.loginId}! Welcome to the Student Viewer Dashboard! </h1>
        <button onClick={createStudent}>+ Add a student</button>
        <MyTable />
        <ul>
          {students.map((student) => (
            <li 
            onClick={() => deleteStudent(student.id)}
            key={student.id}>{student.firstName},{student.lastName}</li>
          ))}
        </ul>
        <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;