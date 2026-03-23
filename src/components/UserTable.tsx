import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { fetchListUser } from '../redux/user/user.slice';
import { toast } from 'react-toastify';

const UserTable = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.listUser);
  useEffect(() => {
    dispatch(fetchListUser());
    toast.success('fetch success');
  }, [dispatch]);
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
