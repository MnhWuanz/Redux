import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { fetchListUser } from '../redux/user/user.slice';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import MyModal from './ui/Modal';
import { TUSER } from '../types/typeUser';

const UserTable = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.listUser);
  useEffect(() => {
    dispatch(fetchListUser());
    toast.success('fetch success');
  }, [dispatch]);
  const searchUser = (id: number) => {
    const userFillter = users.find((data) => data.id === id);
    setUser(userFillter);
  };
  const openEdit = (id: number) => {
    searchUser(id);
    setEdit(true);
    setShow(true);
  };
  const openDelete = (id: number) => {
    searchUser(id);
    setIsDelete(true);
    setShow(true);
  };
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [user, setUser] = useState<TUSER>();

  const handleCloseModal = () => {
    setShow(false);
    setEdit(false);
    setIsDelete(false);
    setUser(undefined);
  };
  return (
    <Table striped bordered hover>
      <MyModal
        isOpen={show}
        handleClose={handleCloseModal}
        isEdit={edit}
        isDelete={isDelete}
        user={user}
      />

      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td className="d-flex gap-3">
                <Button
                  variant="warning"
                  onClick={() => {
                    openEdit(user.id);
                  }}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => openDelete(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default UserTable;
