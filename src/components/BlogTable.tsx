import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useAppDispatch, useAppSelector } from '../redux/hook';

import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { TBLOG } from '../types/typeBlog';
import ModalBlog from './ui/Modal/ModalBlog';
import { fetchListBlog } from '../redux/blog/blog.slice';

const BlogTable = () => {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector((state) => state.blog.listBlog);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [blog, setBlog] = useState<TBLOG>();

  useEffect(() => {
    dispatch(fetchListBlog());
    toast.success('fetch blog success');
  }, [dispatch]);
  const searchBlog = (id: number) => {
    const blogFillter = blogs.find((data) => data.id === id);
    setBlog(blogFillter);
  };
  const openEdit = (id: number) => {
    searchBlog(id);
    setEdit(true);
    setShow(true);
  };
  const openDelete = (id: number) => {
    searchBlog(id);
    setIsDelete(true);
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
    setEdit(false);
    setIsDelete(false);
    setBlog(undefined);
  };
  return (
    <Table striped bordered hover>
      <ModalBlog
        isOpen={show}
        handleClose={handleCloseModal}
        isEdit={edit}
        isDelete={isDelete}
        blog={blog}
      />

      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Content</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog) => {
          return (
            <tr key={blog.id}>
              <td>{blog.id}</td>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
              <td>{blog.content}</td>
              <td className="d-flex gap-3">
                <Button
                  variant="warning"
                  onClick={() => {
                    openEdit(blog.id);
                  }}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => openDelete(blog.id)}>
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

export default BlogTable;
