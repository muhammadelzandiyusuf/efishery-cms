import { Routes, Route } from 'react-router-dom';
import appRoutes from './routes';

const App = () => {
  return (
    <div>
      <Routes>
        {appRoutes.map((item, index) => (
          <Route {...item} key={index} />
        ))}
      </Routes>
    </div>
  );
};

export default App;
