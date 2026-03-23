import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; // Đây là Modal của thư viện
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { TUSER } from '../../types/typeUser';
import { useAppDispatch } from '../../redux/hook';
import {
  createNewUser,
  deleteUser,
  updateUser,
} from '../../redux/user/user.slice';
import { toast } from 'react-toastify';

type TProp = {
  user?: TUSER;
  isEdit?: boolean;
  isOpen: boolean;
  isDelete?: boolean;
  handleClose: () => void;
};
const MyModal: React.FC<TProp> = ({
  isOpen,
  handleClose,
  isEdit,
  user,
  isDelete,
}) => {
  const dispatch = useAppDispatch();

  const handelSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataRaw = Object.fromEntries(formData.entries()) as any;
    const data: TUSER = {
      ...dataRaw,
      id: dataRaw.id ? Number(dataRaw.id) : undefined,
    };
    console.log(data);
    if (isDelete) {
      try {
        await dispatch(deleteUser(data)).unwrap();
        toast.success('Delete user success');
        handleClose();
      } catch {
        toast.error('delete user faill !!!');
      }
      return;
    }
    if (isEdit) {
      try {
        await dispatch(updateUser(data)).unwrap();
        toast.success('Update user success');
        handleClose();
      } catch {
        toast.error('Update user faill !!!');
      }
      return;
    }
    try {
      await dispatch(createNewUser(data)).unwrap();
      toast.success('Create new success');
      handleClose();
    } catch {
      toast.error('Tạo user thất bại!');
    }
  };
  let title = 'Add new user';
  let contentBtn = 'Sign in';
  let variantBtn = 'success';
  if (isEdit) {
    title = 'Edit User';
    contentBtn = 'Update';
    variantBtn = 'warning';
  }
  if (isDelete) {
    title = 'Delete User';
    contentBtn = 'Delete';
    variantBtn = 'danger';
  }
  return (
    <Modal
      key={user?.id}
      show={isOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handelSubmit}>
        <Modal.Body>
          {(isEdit || isDelete) && (
            <FloatingLabel hidden label="id" className="mb-3">
              <Form.Control value={user?.id} readOnly name="id" type="text" />
            </FloatingLabel>
          )}
          {isDelete ? (
            `Are your sure to delete User: ${user?.name} ?`
          ) : (
            <>
              <FloatingLabel label="Name" className="mb-3">
                <Form.Control
                  name="name"
                  hidden={isDelete}
                  defaultValue={isEdit ? user?.name : ''}
                  type="text"
                  placeholder="Name"
                />
              </FloatingLabel>
              <FloatingLabel label="Email address">
                <Form.Control
                  name="email"
                  hidden={isDelete}
                  type="email"
                  defaultValue={isEdit ? user?.email : ''}
                  placeholder="name@example.com"
                />
              </FloatingLabel>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant={variantBtn} type="submit">
            {contentBtn}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default MyModal;
