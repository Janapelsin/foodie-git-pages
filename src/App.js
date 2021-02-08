import { useSelector } from 'react-redux';
import Navigation from './features/Navigation';
import Login from './features/User';
import Categories from './features/Categories';
import Products from './features/Products';
import Groceries from './features/Groceries';
import useFirebase from './api';

function App() {
  const { currentPage } = useSelector(s => s.navigation);
  const { currentUserId } = useSelector(s => s.user);

  useFirebase(currentUserId);

  if (!currentUserId) {
    return (
      <div className="app">
        <Login />
      </div>
    )
  }

  return (
    <div className="app">
      <Navigation />

      {currentPage === "groceries" && <Groceries />}
      {currentPage === "products" && <Products />}
      {currentPage === "categories" && <Categories />}
    </div>
  );
}

export default App;