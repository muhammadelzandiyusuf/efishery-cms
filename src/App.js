import { Routes, Route } from 'react-router-dom';

import appRoutes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

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
