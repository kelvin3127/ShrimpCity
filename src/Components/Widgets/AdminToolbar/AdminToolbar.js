import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkUserIsAdmin } from '../../../utils/index';


const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const AdminToolbar = (props) => {
    const { currentUser } = useSelector(mapState);

    const isAdmin = checkUserIsAdmin(currentUser);
    if (!isAdmin) return null;

    return (

        <Link to="/admin">
            My Admin
        </Link>

    )
}

export default AdminToolbar;