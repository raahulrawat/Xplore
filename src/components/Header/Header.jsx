import React from "react";
import { RiGridFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const url = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80";

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center pr-4 pt-3 space-x-3 items-center">
            <p onClick={() => navigate("/explore")} className="text-sm hover:underline cursor-pointer">Explore</p>
            <p onClick={() => navigate("/itineraries")} className="text-sm hover:underline cursor-pointer">Itineraries</p>
            <RiGridFill className="text-4xl hover:bg-gray-200 p-2 rounded-full cursor-pointer" />

            <div style={{ marginLeft: "100px" }}>
                <SignedOut>
                    <div className="text-white px-4 py-1 hover:bg-blue-600 cursor-pointer text-sm" style={{ background: "rgb(48, 97, 82)", borderRadius: "20px" }}>
                        <SignInButton />
                    </div>
                </SignedOut>

                <SignedIn>
                    <div className="flex items-center space-x-2">
                        <UserButton
                            appearance={{
                                elements: {
                                    rootBox: 'hover:bg-gray-200 p-2 rounded-full'
                                }
                            }}
                        />
                    </div>
                </SignedIn>
            </div>
        </div>
    );
};

export default Header;
