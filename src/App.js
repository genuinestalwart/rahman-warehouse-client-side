import { Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddItem from './components/AddItem/AddItem';
import Blogs from './components/Blogs/Blogs';
import Banner from './components/Home/Banner/Banner';
import HomeItems from './components/Home/HomeItems/HomeItems';
import Inventory from './components/Inventory/Inventory';
import ItemInfo from './components/ItemInfo/ItemInfo';
import Login from './components/Login/Login';
import MyItems from './components/MyItems/MyItems';
import NotFound from './components/NotFound/NotFound';
import Register from './components/Register/Register';
import Footer from './components/Shared/Footer/Footer';
import Header from './components/Shared/Header/Header';
import InformToast from './components/Shared/InformToast/InformToast';
import RequireAuth from './components/Shared/RequireAuth/RequireAuth';
import auth from './firebase.init';
import useFirebase from './hooks/useFirebase';

function App() {
	const [user, loading] = useAuthState(auth);
	const { info, setInfo, showToast, setShowToast } = useFirebase();

	return (
		<div className="App">
			{
				loading ?
					<div className='align-items-center d-flex justify-content-center loading-spinner-container vh-100'>
						<div className='align-items-center d-flex'>
							<Spinner className='' animation="border" />
							<h4 className='fw-bold ms-2 mb-0'>Loading...</h4>
						</div>
					</div>
					:
					<div>
						<Header user={user}></Header>

						<main>
							<InformToast info={info} showToast={showToast} setShowToast={setShowToast}></InformToast>
							<Routes>
								<Route path='/' element={
									<div>
										<Banner></Banner>
										<HomeItems></HomeItems>
									</div>
								}></Route>
								<Route path='/manage-inventory' element={<RequireAuth><Inventory></Inventory></RequireAuth>}></Route>
								<Route path='/inventory/:id' element={<RequireAuth><ItemInfo></ItemInfo></RequireAuth>}></Route>
								<Route path='/add-item' element={<RequireAuth><AddItem></AddItem></RequireAuth>}></Route>
								<Route path='/my-items' element={<RequireAuth><MyItems></MyItems></RequireAuth>}></Route>
								<Route path='/blogs' element={<Blogs></Blogs>}></Route>
								<Route path='/login' element={<Login setInfo={setInfo} setShowToast={setShowToast}></Login>}></Route>
								<Route path='/register' element={<Register setInfo={setInfo} setShowToast={setShowToast}></Register>}></Route>
								<Route path='*' element={<NotFound></NotFound>}></Route>
							</Routes>
						</main>

						<Footer></Footer>
					</div>
			}
		</div>
	);
}

export default App;
