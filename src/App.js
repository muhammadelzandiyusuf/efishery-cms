import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import NotFound from '@/pages/NotFound';

import { store } from './redux';
import appRoutes from './routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/scss/global.scss';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {appRoutes.map((item, index) => (
            <Route {...item} key={index} />
          ))}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
