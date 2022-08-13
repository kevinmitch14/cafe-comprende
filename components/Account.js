import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ArrowSmRightIcon, IdentificationIcon, LogoutIcon, UserIcon } from '@heroicons/react/outline';
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';


const Account = () => {
    const { data: session } = useSession()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!session) {
        return (
            <div className='absolute top-4 right-4'>
                <button
                    onClick={handleClick}
                    className="flex items-center px-2 py-1 rounded-md font-medium hover:bg-gray-100 hover:text-gray-800 text-gray-600"
                >
                    Login <ArrowSmRightIcon className="h-4 w-4" />
                </button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => { handleClose; signIn('google') }} >Login with Google</MenuItem>
                </Menu>
            </div >
        )
    }
    return (
        <>
            <UserIcon className="h-8 w-8 border border-gray-300 text-gray-800 hover:bg-gray-100 hover:cursor-pointer rounded-lg p-1 absolute top-4 right-4" onClick={handleClick} />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem disabled >
                    <div className='text-gray-800'>
                        Logged in as:<br />
                        {session.user.email}
                    </div>
                </MenuItem>
                <Link href={`/account/${session.user.email}`}><MenuItem className="flex justify-between gap-x-2">My Account<IdentificationIcon className='w-5 h-5' /></MenuItem></Link>
                <MenuItem onClick={signOut} className="flex justify-between gap-x-2">Log Out <LogoutIcon className='h-5 w-5' /></MenuItem>
            </Menu>
        </>
    )
}

export default Account