import Container from "@mui/material/Container";
import {Route, Routes} from "react-router-dom";
import {Header} from "./components";
import {Home, FullPost, Registration, AddPost, Login} from "./pages";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAuthMeQuery } from "./services/post";
import { setAuthData } from "./redux/slices/authSlice";

function App() {
    const [reloadKey, setReloadKey] = useState(0);
    const { data, error, isLoading } = useAuthMeQuery();
    const triggerReload = () => {
        setReloadKey((prevKey) => prevKey + 1)
    };
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setAuthData(data));
    }, [data]);
    
    return (
        <>
            <Header value={triggerReload}/>
            <Container maxWidth="lg">
                <Routes>
                    <Route path="/" element={<Home value={reloadKey} />} />
                    <Route path="/posts/:id" element={<FullPost />} />
                    <Route path="/posts/:id/edit" element={<AddPost />} />
                    <Route path="/add-post" element={<AddPost />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
