import { stat } from 'fs'
import React from 'react'
import { useSelector } from 'react-redux'
import { useAppSelector } from '../../store/hooks';

export default function UserProfile() {

    const userProfile = useAppSelector((state) => state.user.user);

  return (
    <div>
        <h3>{userProfile.id}</h3>
        <h3>{userProfile.email}</h3>
        <h3>{userProfile.fullname}</h3>
        <h3>{userProfile.avatar}</h3>
        <h3>{userProfile.phone_number}</h3>
        <h3>{userProfile.address}</h3>
        <h3>{userProfile.role}</h3>
    </div>
  )
}
