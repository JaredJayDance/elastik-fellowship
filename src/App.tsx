import { useEffect, useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema, jaySchema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

//const client = generateClient<Schema>();
const jayClient = generateClient<jaySchema>();

function App() {
  const { user, signOut } = useAuthenticator();

  /**
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }
 
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  */

  const [students, showStudents] = useState<Array<jaySchema["StudentList"]["type"]>>([]);

  useEffect(() => {
    jayClient.models.StudentList.observeQuery().subscribe({
      next: (data) => showStudents([...data.items]),
    });
  }, []);

  //Create a student entry in the DB or will this make a different student with each create() call??
  function createStudent() {
    jayClient.models.StudentList.create({email: window.prompt("Add email")});
    jayClient.models.StudentList.create({firstName: window.prompt("First Name")});
    jayClient.models.StudentList.create({lastName: window.prompt("Last Name")});
    jayClient.models.StudentList.create({DOB: window.prompt("Students DOB")});
    jayClient.models.StudentList.create({schoolName: window.prompt("School")});
    jayClient.models.StudentList.create({coordinatorName: window.prompt("Coordinator")});
    jayClient.models.StudentList.create({teacherName: window.prompt("Teacher")});
  }

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
          key={student.id}>{student.firstName}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;

/**
<button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li 
          onClick={() => deleteTodo(todo.id)}
          key={todo.id}>{todo.content}</li>
        ))}
      </ul>

      */