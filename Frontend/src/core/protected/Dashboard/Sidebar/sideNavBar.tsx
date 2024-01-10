import React from 'react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/root-reducer";
import { getCategoriesAction } from "../../../../store/modules/categories/getcategory"


const AppSidebarNav = () => {

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch<any>(getCategoriesAction())

  }, [])
  const categories = useSelector(
    (state: RootState) => state.categoryReducer.data
  );

  return (
    <>
      {categories && categories.map((item: any, index: number) => (

        <CNavGroup toggler={item.name} key={index}>
          {item.breed && item.breed?.map((breed_name: any, index: number) => (
            <CNavItem href="#" key={index}
              style={{ background: "white" }}>
              {breed_name.name}
              {/* <CIcon customClassName="nav-icon" icon={cilPuzzle} /> */}

            </CNavItem>
          ))}
        </CNavGroup>
      ))}
    </>
  )
}
const mapStateToProps = (state: RootState) => ({
  categories: state.categoryReducer.data,
  
});

const mapDispatchToProps = {
  getCategoriesAction: getCategoriesAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AppSidebarNav);