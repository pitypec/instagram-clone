import {useState, useEffect} from 'react';
import { useParams, useHistory} from 'react-router-dom';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes'
import Header from '../components/profile/header';
import UserProfile from '../components/profile'

export default function Profile() {
    const { username } = useParams();
    const [user, setUser] = useState(null)
    const history = useHistory()

    useEffect(() => {
      async function checkUserExists(){
          const [logUser] = getUserByUsername(username)
          if(logUser.userId){
              setUser(logUser);
          }else{
              history.push(ROUTES.NOT_FOUND)
          }
      }
      checkUserExists()
    }, [history, username])

    return user?.username ? (
        <div className='bg-gray-background'>
                <Header/>
            <div className='mx-auto max-w-screen-lg'>
                <UserProfile username={user}/>
            </div>
        </div>
    ) : null;
    
}