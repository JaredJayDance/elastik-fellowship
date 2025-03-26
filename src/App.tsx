import { useEffect, useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from "../amplify/data/resource"; 
import { generateClient } from "aws-amplify/data";

const jayClient = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();

  const [students, showStudents] = useState<Array<Schema["StudentList"]["type"]>>([]);

  useEffect(() => {

    console.log(jayClient); // Is `client` defined?
    console.log(jayClient.models); // Does `models` exist?
    console.log(jayClient.models.StudentList); // Is `StudentList` in `models`?

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
      <h1>{user?.signInDetails?.loginId}'s ToDos</h1>
      
      <button onClick={signOut}>Sign out</button>
      <button onClick={createStudent}>+ newStudent</button>
      <ul>
        {students.map((student) => (
          <li 
          onClick={() => deleteStudent(student.id)}
          key={student.id}>{student.firstName},{student.firstName}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;

/**
<button onClick={createStudent}>+ newStudent</button>
      <ul>
        {students.map((student) => (
          <li 
          onClick={() => deleteStudent(student.id)}
          key={student.id}>{student.firstName}</li>
        ))}
      </ul>


      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li 
          onClick={() => deleteTodo(todo.id)}
          key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      */