import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserTable from './UserTable';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import MyModal from './ui/Modal/ModalUser';
import ModalBlog from './ui/Modal/ModalBlog';
import BlogTable from './BlogTable';
const TabContent = () => {
  const [show, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);
  return (
    <Tabs
      defaultActiveKey="user"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="user" title="User">
        <div className="container d-flex justify-content-between mb-3">
          <h2>Table Users</h2>
          <Button variant="primary" onClick={() => setShow(true)}>
            Add New
          </Button>
          <MyModal isOpen={show} handleClose={handleCloseModal} />
        </div>
        <UserTable />
      </Tab>
      <Tab eventKey="blog" title="Blogs">
        <div className="container d-flex justify-content-between mb-3">
          <h2>Table Blogs</h2>
          <Button variant="primary" onClick={() => setShow(true)}>
            Add New
          </Button>
          <ModalBlog isOpen={show} handleClose={handleCloseModal} />
        </div>
        <BlogTable />
      </Tab>
    </Tabs>
  );
};

export default TabContent;
