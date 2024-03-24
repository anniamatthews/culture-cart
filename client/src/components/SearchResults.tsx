import { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import {SearchFn} from './Search';
import Select from 'react-select';
import Navbar from './Navbar';

const SearchResults = () => {
    const searchTag = String(useParams().search_tag);
    const options = [
      { value: 'asc', label: 'Low to High' },
      { value: 'dsc', label: 'High to Low' },
    ];
    const [sortby, setSortby] = useState(options[0]);
    const setOption = (e: any) => {
      if (e.value === 'asc') {
        setSortby(options[0]);
      } else {
        setSortby(options[1]);
    }};

    return (
        <div>
            <Navbar></Navbar>
            <h1>Search Results</h1>
            <Select value={sortby} onChange={setOption} options={options}/>
            <SearchFn product_name={searchTag} sort_by={sortby.value}/>
        </div>
    )
};

export default SearchResults;