import { HashRouter, Routes, Route } from "react-router-dom";
import AppDrawer from "./Drawer/AppDrawer.jsx";
import GrillDashboard from "./PagesDashboard/GrillDashboard.jsx";
import GrillMap from "./PagesMap/GrillMap.jsx";

export default function App() {

    return (

        <HashRouter>

            <div
                style={{
                    display: "flex",
                    width: "100vw",
                    height: "100vh",
                    overflow: "hidden"
                }}
            >

                <AppDrawer />


                <div
                    style={{
                        flex: 1,
                        height: "100vh"
                    }}
                >

                    <Routes>

                        <Route
                            path="/GrillDashboard"
                            element={<GrillDashboard />}
                        />

                        <Route
                            path="/GrillMap"
                            element={<GrillMap />}
                        />

                    </Routes>

                </div>

            </div>

        </HashRouter>

    );
}
