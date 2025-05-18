import { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Dialog, DialogContent, DialogHeader, DialogDescription } from '@/components/ui/dialog';
import travelPlannerLogo from '../../assets/travelplanner.png';
import axios from 'axios';

import { FcGoogle } from 'react-icons/fc';

function Header() {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => GetUserProfile(tokenInfo),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    setLoading(true);
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: 'application/json',
        },
      })
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.data));
        setUser(resp.data);
        setOpenDialog(false);
        setLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
  };

  return (
    <header className="backdrop-blur-md bg-white/60 border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={travelPlannerLogo}
            alt="Ghoom AI Logo"
            className="w-10 h-10 rounded-lg shadow-sm"
          />
          <span className="text-xl font-bold text-gray-800">Ghoom AI</span>
        </div>

        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <a href="/" className="text-sm font-medium text-gray-700 hover:text-black transition">
                <Button variant="ghost">Home</Button>
              </a>
              <a href="/aiagent">
                <Button variant="outline" className="rounded-full">
                  AI Agent
                </Button>
              </a>
              <a href="/create-trip">
                <Button className="rounded-full bg-black text-white hover:bg-white hover:text-black border hover:border-black transition">
                  + Create Trip
                </Button>
              </a>
              <a href="/my-trips">
                <Button variant="ghost" className="rounded-full">
                  My Trips
                </Button>
              </a>
              <Popover>
                <PopoverTrigger>
                  <img
                    src={user.picture}
                    alt="User Avatar"
                    className="h-9 w-9 rounded-full border border-gray-300 hover:ring-2 hover:ring-black transition"
                  />
                </PopoverTrigger>
                <PopoverContent className="p-4 text-sm">
                  <div className="mb-2">{user.name}</div>
                  <Button
                    variant="ghost"
                    className="text-red-600 w-full hover:bg-red-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <Button
              onClick={() => setOpenDialog(true)}
              className="bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-white hover:text-black hover:border-black border transition"
            >
              Sign In
            </Button>
          )}
        </nav>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogDescription>
              <img
                src={travelPlannerLogo}
                className="w-16 h-16 mx-auto mb-4 rounded-lg"
                alt="logo"
              />
              <h2 className="font-bold text-xl">Sign In with Google</h2>
              <p className="text-sm text-gray-600 mt-1 mb-5">
                Secure access to Ghoom AI via your Google account
              </p>
              <button
                disabled={loading}
                onClick={login}
                className="w-full flex gap-4 items-center justify-center p-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
              >
                <FcGoogle className="h-6 w-6" />
                {loading ? 'Loading...' : 'Sign In With Google'}
              </button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Header;
