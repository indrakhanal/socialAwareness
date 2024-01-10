import React, { Suspense } from "react";
import { Route, Routes, useLocation,RouterProps,RouteProps, Navigate } from "react-router-dom";

// import ErrorBoundary from "../../components/React/ErrorBoundary/ErrorBoundary";
import FallbackLoader from "../../components/React/FallBackLoader/FallBackLoader";
import Signup from "../../core/public/signup/signup";

interface RenderRouteProps extends RouterProps {}

// const RenderRoute: React.FC<CustomRoute> = props => {
//     const { component } = props;
//     const Component: React.ComponentType<RenderRouteProps> = component!
    
//     return (
//         <Route exact render={(routerProps: RouterProps) => <Component {...routerProps} {...props} />}/>
//     );
// };

const PrivateRoute = (props: PrivateRouteProps & {redirectPath?: RouteRedirectProps, animate?: boolean}) => {
    const location = useLocation();
    const { appRoutes, redirectPath } = props;
    return (
        <>
        <Suspense fallback={<FallbackLoader/>}>
            <Routes location={location}>
                {appRoutes.map((route, index) => (
                <Route path={route?.path} element={<route.component/>} key={index} />
                ))}
                {redirectPath?.length && redirectPath.map((pah, index) => (
                    <Route path={pah?.from} element={<Navigate replace to={`${pah?.to}`} key={index}/>} />
                    // path && <Navigate to={path.to} key={index} />
                ))}
            </Routes>
        </Suspense>
        </>
       
    )
};

export default PrivateRoute;