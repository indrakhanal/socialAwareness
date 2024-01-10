import React from 'react'
import { getSearchDataAction } from '../../../../../store/modules/autosearch/autocomplete';
import { useDispatch, useSelector, connect, ConnectedProps } from 'react-redux';
import { RootState } from "../../../../../store/root-reducer";
import { Dispatch } from 'redux';


const HandleSearch = ( string:any, results:any) => {
  
  const search_data = RenderDispatch(string)
  console.log(search_data, '55555555');

}

function RenderDispatch(string:any){
  const dispatch = useDispatch();
  React.useEffect(() => (
      dispatch<any>(getSearchDataAction(string))
  ), [string])
  
  const search = useSelector(
    (state: RootState) => state.getSearchDataReducer.data
  );
  return search

}

export default HandleSearch;