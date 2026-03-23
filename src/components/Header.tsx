import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import Form from 'react-bootstrap/Form';
import { changeMode } from '../redux/app/app.slice';
import { useEffect } from 'react';

const Header = () => {
  const users = useAppSelector((state) => state.user.listUser);
  const dispatch = useAppDispatch();
  const modeState = useAppSelector((state) => state.app.mode);
  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.setAttribute('data-bs-theme', modeState);
    }
  }, [modeState]);
  return (
    <div>
      <Navbar className="bg-body-tertiary" data-bs-theme={modeState}>
        <Container>
          <Navbar.Brand href="#home">
            Navbar with text {users.length}
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              value={modeState}
              onChange={(e) =>
                dispatch(
                  changeMode(e.target.value === 'light' ? 'dark' : 'light'),
                )
              }
              label={
                modeState === 'light' ? (
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
