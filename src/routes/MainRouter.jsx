import { HashRouter, Routes, Route } from 'react-router-dom';
import RegionsTable from '../components/tables/RegionsTable';
import UsersTable from '../components/tables/UsersTable';

const MainRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<RegionsTable />} />
        <Route path='popup' element={<UsersTable />} />
      </Routes>
    </HashRouter>
  );
};

export default MainRouter;
