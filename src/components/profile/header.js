import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfile } from '../../services/firebase'


export default function Header( 
    photosCount,  
    followerCount, 
    setFollowerCount, 
    profile
    ) {
const { user } = useUser()
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeBtnFollow = user.username && user.username !== profile.username;

    const handleToggleFollow = () => {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile)
        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
        });
    }

    useEffect(() => {
       const isLoggedInUserFollowingProfile = async () => {
           const isFollowing = await isUserFollowingProfile(user.username, profile.userId)
           setIsFollowingProfile(isFollowing)
       }
       if(user.username && profile.userId){
           isLoggedInUserFollowingProfile()
       }
    }, [user.username])

    
    return (
        <div className='grid grid-cols-3 gap-4 justify-between mx-auto'>
            <div className="container flex justify-center">
                {user.username && 
                 (
                     <img 
                        className='rounded-full h-40 w-40 flex' 
                        src={`/images/avatars/${profile.username}.jpg`} 
                        alt={`${user.username} profile`}/>
                 )
                }
            </div>
            <div className='flex items-start justify-center flex-col col-span-2'>
                <div className='container flex item-center'>
                    <p className='text-2xl mr-4'>{profile.username}</p>
                    {activeBtnFollow && (
                        <button 
                            className='bg-blue-medium font-bold text-sm rounded text-white w-20 h-8' 
                            type="button"
                            onClick={handleToggleFollow}
                            onKeyDown={(e) => {
                                if(e.key === 'Enter'){
                                    handleToggleFollow()
                                }
                            }}
                        >
                            {isFollowingProfile ? 'unfollow' : 'follow'}
                        </button>
                    )}
                </div>
                <div className='container flex mt-4'>
                    {profile.followers == undefined || profile.following == undefined ? (
                        <Skeleton count={1} width={677} height={24}/>
                    ) : (
                        <>
                         <p className='mr-10'>
                            <span className='font-bold'>{photosCount}</span> photos
                         </p>
                         <p className='mr-10'>
                            <span className='font-bold'>{followerCount}</span>
                            {followerCount == 1 ? 'follower' : 'followers'}
                         </p>
                         <p className='mr-10'>
                            <span className='font-bold'>{profile.following.length}</span>
                         </p>
                        </>
                    )}
                </div>
                <div className='container mt-4'>
                    <p className='font-medium'>
                      {!profile.fullName ? <Skeleton count={1}  height={24}/> : profile.fullName }
                    </p>
                </div>
            </div>
        </div>
    );
}

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        username: PropTypes.string,
        following: PropTypes.array,
        followers: PropTypes.array
    }).isRequired
}
