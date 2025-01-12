import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import { useAppStore } from "./store";
import apiClient from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants";


interface PrivateRouteProps {
  children: ReactNode;
}
interface AuthRouteProps {
  children: ReactNode;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};
const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : <>{children}</>;
};

// ---> for using in javascript
// const PrivateRoute = ({ children }) => {
//   const { userInfo } = useAppStore();
//   const isAuthenticated = !!userInfo;
//   return isAuthenticated ? children : <Navigate to="/auth" />;
// };

function App() {

  const {userInfo, setUserInfo} = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true
        })
        console.log({response})
      } catch (error) {
        console.log({error})
      }
    };

    if(!userInfo){
      getUserData();
    } else{
      setLoading(false);
    }
  }, [userInfo, setUserInfo])

  if(loading){
    return <div>Loading...</div>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth"
            element={
              <AuthRoute>
                <Auth />
              </AuthRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
