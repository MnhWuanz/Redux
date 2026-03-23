import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useAppSelector } from '../redux/hook';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

const Header = () => {
  const users = useAppSelector((state) => state.user.listUser);
  const [mode, setMode] = useState('light');
  return (
    <div>
      <Navbar className="bg-body-tertiary" data-bs-theme={mode}>
        <Container>
          <Navbar.Brand href="#home">
            Navbar with text {users.length}
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              value={mode}
              onChange={(e) =>
                setMode(e.target.value === 'light' ? 'dark' : 'light')
              }
              label={
                mode === 'light' ? (
                  <Navbar.Text>Light mode</Navbar.Text>
                ) : (
                  <Navbar.Text>Dark mode</Navbar.Text>
                )
              }
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
