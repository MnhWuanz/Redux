import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; // Đây là Modal của thư viện
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { TUSER } from '../../types/typeUser';

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
  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
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
