import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; // Đây là Modal của thư viện
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { TBLOG } from '../../../types/typeBlog';
import { useAppDispatch } from '../../../redux/hook';
import {
  createNewUser,
  deleteUser,
  updateUser,
} from '../../../redux/user/user.slice';
import { toast } from 'react-toastify';
import {
  createNewBlog,
  deleteBlog,
  updateBlog,
} from '../../../redux/blog/blog.slice';

type TProp = {
  blog?: TBLOG;
  isEdit?: boolean;
  isOpen: boolean;
  isDelete?: boolean;
  handleClose: () => void;
};
const ModalBlog: React.FC<TProp> = ({
  isOpen,
  handleClose,
  isEdit,
  blog,
  isDelete,
}) => {
  const dispatch = useAppDispatch();

  const handelSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataRaw = Object.fromEntries(formData.entries()) as any;
    const data: TBLOG = {
      ...dataRaw,
      id: dataRaw.id ? Number(dataRaw.id) : undefined,
    };
    console.log(data);
    if (isDelete) {
      try {
        await dispatch(deleteBlog(data)).unwrap();
        toast.success('Delete blog success');
        handleClose();
      } catch {
        toast.error('delete blog faill !!!');
      }
      return;
    }
    if (isEdit) {
      try {
        await dispatch(updateBlog(data)).unwrap();
        toast.success('Update blog success');
        handleClose();
      } catch {
        toast.error('Update blog faill !!!');
      }
      return;
    }
    try {
      await dispatch(createNewBlog(data)).unwrap();
      toast.success('Create new success');
      handleClose();
    } catch {
      toast.error('Tạo blog thất bại!');
    }
  };
  let title = 'Add new blog';
  let contentBtn = 'Sign in';
  let variantBtn = 'success';
  if (isEdit) {
    title = 'Edit blog';
    contentBtn = 'Update';
    variantBtn = 'warning';
  }
  if (isDelete) {
    title = 'Delete blog';
    contentBtn = 'Delete';
    variantBtn = 'danger';
  }
  return (
    <Modal
      key={blog?.id}
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
              <Form.Control value={blog?.id} readOnly name="id" type="text" />
            </FloatingLabel>
          )}
          {isDelete ? (
            `Are your sure to delete blog: ${blog?.title} ?`
          ) : (
            <>
              <FloatingLabel label="Title" className="mb-3">
                <Form.Control
                  name="title"
                  hidden={isDelete}
                  defaultValue={isEdit ? blog?.title : ''}
                  type="text"
                  placeholder="title"
                />
              </FloatingLabel>
              <FloatingLabel label="Author">
                <Form.Control
                  name="author"
                  hidden={isDelete}
                  defaultValue={isEdit ? blog?.author : ''}
                  placeholder="author"
                />
              </FloatingLabel>
              <FloatingLabel label="Content">
                <Form.Control
                  name="content"
                  hidden={isDelete}
                  defaultValue={isEdit ? blog?.content : ''}
                  placeholder="content"
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

export default ModalBlog;
