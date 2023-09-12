'use client';
import { useEffect, useMemo, useState } from 'react';



const Search = ({callback}) =>{
    const [searchValue, setSearchValue] = useState("");
    console.log('searchValue', searchValue); //to check that what we are search is being saved
    const handleSubmit = e => {
        e.preventDefault();
        callback(searchValue);
    }
    return(
        <form className='Search' onSubmit={handleSubmit}>
            <input type='text' className='memberSearchBarInput' 
            value={searchValue} 
            onChange={(e) => setSearchValue(e.target.value)}/>
            filter name
        </form>
    )
} 
export default Search;