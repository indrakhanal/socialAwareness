// import './App.css'
import React from 'react'
import { getSearchDataAction } from '../../../../../store/modules/autosearch/autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../../../../store/root-reducer";
interface Props{
 id:number,
 name:string   
}

  export const items:any = [{
    id: 0,
    name: 'Cobol'
  },
  {
    id: 1,
    name: 'JavaScript'
  },
  {
    id: 2,
    name: 'Basic'
  },
  {
    id: 3,
    name: 'PHP'
  },
  {
    id: 4,
    name: 'Java'
  }]


  export const handleOnHover = (result:string) => {
    // the item hovered
    console.log(result, '----')
  }

  export const handleOnSelect = (item:string) => {
    // the item selected
    console.log(item, '///////')
  }

  export const handleOnFocus = () => {
    console.log('Focused')
  }

  export const formatResult = (item:any) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  
