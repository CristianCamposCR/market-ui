import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthContext } from '../../modules/auth/authContext';
import { LoginScreen } from '../../modules/auth/LoginScreen';
import PublicNavbar from '../publicNavbar/PublicNavbar';
import AdminNavbar from './AdminNavbar';
import {CategoryScreen} from '../../modules/category/CategoryScreen';

export const AppRouter = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginScreen/>} />
        <Route
          path="/*"
          element={
            user.isLogged ? (
              <>
                <AdminNavbar/>
                <Container style={{ marginTop: '20px' }}>
                  <Routes>
                    <Route path="products" element={<>PRODUCTS</>} />
                    <Route path="category" element={<CategoryScreen/>} />
                    <Route index element={<>INDEX</>} />
                    <Route path="*" element={<>404</>} />
                  </Routes>
                </Container>
              </>
            ) : (
              <PublicNavbar/>
            )
          }
        />
        <Route path="*" element={<>404</>} />
      </Routes>
    </Router>
  );
};
