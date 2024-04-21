import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'; // Tambahkan import useSelector dari react-redux
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { loginUser, logoutUser } from '../../redux/auth/authActions'; // Import aksi Redux yang diperlukan

export default function AuthPageHandler({ children, dispatch }) {
  const isAuth = useSelector(state => state.auth.isAuthenticated); // Ambil status autentikasi dari store Redux

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User logged in
        dispatch(loginUser(user)); // Dispatch aksi Redux untuk menandai pengguna masuk
      } else {
        // User hasn't logged in
        dispatch(logoutUser()); // Dispatch aksi Redux untuk menandai pengguna keluar
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]); // Tambahkan dispatch ke dalam array dependency

  return <div>{isAuth ? children : null}</div>; // Render children jika pengguna terautentikasi
}
