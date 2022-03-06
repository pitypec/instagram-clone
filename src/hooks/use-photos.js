import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getPhotos, getUserByUserId } from '../services/firebase';


export default function usePhotos(){
    const [photos, setPhotos ] = useState(null)

    const {
        user: { uid: userId = ''}
    } = useContext(UserContext);

    useEffect(() => {
       async function getTimelinePhotos(){
           const [user] = await getUserByUserId(userId)
           console.log(user)
           let followedUserPhotos = []

           if(user.following.length > 0){
               followedUserPhotos = await getPhotos(userId, user.following)
           }
           followedUserPhotos.sort((a,b) => b.dateCreated - a.dateCreated);
           setPhotos(followedUserPhotos)
       }

       getTimelinePhotos();
    }, [userId])

    return { photos }
}