import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { TUSER } from '../types/typeUser';

const UserTable = () => {
  const [users, setUsers] = useState<TUSER[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8000/users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default UserTable;
