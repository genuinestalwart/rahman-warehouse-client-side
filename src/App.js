import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddItem from './components/AddItem/AddItem';
import Blogs from './components/Blogs/Blogs';
import Banner from './components/Home/Banner/Banner';
import Items from './components/Home/Items/Items';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import MyItems from './components/MyItems/MyItems';
import NotFound from './components/NotFound/NotFound';
import Footer from './components/Shared/Footer/Footer';
import Header from './components/Shared/Header/Header';

function App() {
	return (
		<div className="App">
			<Header></Header>

			<main>
				<Routes>
					<Route path='/' element={
						<div>
							<Banner></Banner>
							<Items></Items>
						</div>
					}></Route>
					<Route path='/inventory' element={<Inventory></Inventory>}></Route>
					<Route path='/add-item' element={<AddItem></AddItem>}></Route>
					<Route path='/my-items' element={<MyItems></MyItems>}></Route>
					<Route path='/blogs' element={<Blogs></Blogs>}></Route>
					<Route path='/login' element={<Login></Login>}></Route>
					<Route path='*' element={<NotFound></NotFound>}></Route>
				</Routes>
			</main>

			<Footer></Footer>
		</div>
	);
}

export default App;
