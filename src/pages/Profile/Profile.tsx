import { useEffect } from "react";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import ProfileComponent from "../../components/ProfileComponent/ProfileComponent";
import { useAppDispatch, useAppSelector } from "../../service/store/store";
import { getUserProfile } from "../../service/features/userSlice";
import SidebarComponent from "../../components/Layout/Sidebar";
import { FaUser } from "react-icons/fa";


const Profile= () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state=>state.users.user);
    const { account } = useAppSelector((state) => state.auth);
    const isCustomer = account && account.user && account.user.role.includes('Customer');

    useEffect(() => {
        dispatch(getUserProfile())
    }, [dispatch]);
    
  return (
    <>
      {isCustomer ? (
        <div className="grid h-screen" style={{ gridTemplateRows: 'auto 1fr auto' }}>
        <div className="row-start-1 row-end-2">
            <Header />
        </div>
        <div className="row-start-2 row-end-3 grid" style={{ gridTemplateRows: 'auto 1fr' }}>
          <ProfileComponent
            email={user?.email} 
            phone={user?.phone} 
            name={user?.name} 
            avatarUrl={user?.avatarUrl} 
            rank={user?.rank}
          />
        </div>
        <div className="row-start-3 row-end-4">
            <Footer />
        </div>
      </div>
    ) : (
    <>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-12 md:p-0">
          <div className="md:col-span-2">
            <SidebarComponent />
          </div>

          <div className="md:col-span-10 mt-5">
            <div className="flex">
              <FaUser className="text-3xl text-pink-300" />
              <h3 className="text-3xl font-bold ml-6">Profile</h3>
            </div>
              <ProfileComponent
                email={user?.email} 
                phone={user?.phone} 
                name={user?.name} 
                avatarUrl={user?.avatarUrl} 
                rank={user?.rank}
              />
            </div>
          </div>
        </div>
    </>
  )}

</>

  );
};

export default Profile;