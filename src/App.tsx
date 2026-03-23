import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { decrease, increment } from './redux/counter/counter.slice';
import { useAppDispatch, useAppSelector } from './redux/hook';
import Button from 'react-bootstrap/Button';
function App() {
  // const count = useSelector((state: RootState) => state.counter);
  const count = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  console.log(count);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="">
        <h1>My current count = {count.value}</h1>
        <Button variant="warning">Test boostrap</Button>
        <div className="">
          <button
            className="btn btn-primary "
            onClick={() => dispatch(increment())}
          >
            Increase{' '}
          </button>
          <button onClick={() => dispatch(decrease())}>Decrease </button>
        </div>
      </div>
    </>
  );
}

export default App;
