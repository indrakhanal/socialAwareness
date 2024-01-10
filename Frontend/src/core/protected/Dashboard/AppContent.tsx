import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { NavLink, Link } from 'react-router-dom'

// routes config
import routes from '../../../routes/routes'
import CreatePost from '../PostDetails/addPost'


// Assuming you have defined the type for routes somewhere in your code
interface RouteType {
  path: string;
  exact: boolean;
  name: string;
  component: React.ComponentType<any>;
  // Add other properties as needed
}

const AppContent: React.FC = () => {

  routes.map((route, id) => {
    console.log(route, id, "----------");
    return null; // Ensure to return a value in the map function
  });

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => (
            route && (
              <Route
                key={idx}
                path={route.path}
                element={<route.component />}
              />
            )
          ))}
        </Routes>
      </Suspense>
      {/* <NavLink to={"/post"}>Create New Post</NavLink> */}
    </CContainer>
  );
};

export default React.memo(AppContent);

