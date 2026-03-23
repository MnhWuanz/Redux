// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import { decrease, increment } from './redux/counter/counter.slice';
// import { useAppDispatch, useAppSelector } from './redux/hook';

import Header from './components/Header';
import TabContent from './components/TabContent';

// import Button from 'react-bootstrap/Button';
function App() {
  // const count = useSelector((state: RootState) => state.counter);
  // const count = useAppSelector((state) => state.counter);
  // const dispatch = useAppDispatch();

  return (
    <div className="container">
      <Header />
      <TabContent />
    </div>
  );
}

export default App;
