import {createContext, useContext, useEffect,useState} from 'react'

import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../appwrite/api'


export const INITIAL_USER = {
    id: '',
    name: '',
    email: '',
    username: '',
    imageUrl: '',
    bio: '',
}
const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser :()=>{},
    setIsAuthenticated:()=>{},
    checkAuthUser: async()=> false,
}

const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(INITIAL_USER);
    const [isLoading,setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated ]= useState(false);
    const navigate = useNavigate();

    const checkAuthUser = async () => {
      setIsLoading(true);
      try {
        const currentAccount = await getCurrentUser();
    
        if (currentAccount) {
          setUser({
            id: currentAccount.$id,
            name: currentAccount.name,
            email: currentAccount.email,
            username: currentAccount.username,
            imageUrl: currentAccount.imageUrl,
            bio: currentAccount.bio,
          });
          setIsAuthenticated(true);
          return true;
        }
        return false;
      } catch (error) {
        console.log(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    };
    

    useEffect(() => {
      const cookieFallback = localStorage.getItem("cookieFallback");
      if (
        cookieFallback === "[]" ||
        cookieFallback === null ||
        cookieFallback === undefined
      ) {
        navigate("/login");
      }
  
      checkAuthUser();
    }, []);

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }
  return (
    <AuthContext.Provider value = {value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);


