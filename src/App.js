import React, { useEffect } from "react";
import { Router } from "./Router/router";
import { useDispatch } from "react-redux";
import { auth, firestore } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import MuiSnackbar from "./components/MuiSnackbar/MuiSnackbar";
import { QueryClientProvider, QueryClient } from "react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { resetAuthValues, setAuthValues } from "./redux/actions/loginActions";

function App() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const q = query(
            collection(firestore, "admins"),
            where("uid", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);

          if (querySnapshot.docs.length > 0) {
            const userData = querySnapshot.docs[0].data();
            dispatch(setAuthValues({ ...userData, ...user }));
          } else {
            console.error(
              "No document found for the user in the Admins collection."
            );
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        auth.signOut();
        dispatch(resetAuthValues());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <MuiSnackbar />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
