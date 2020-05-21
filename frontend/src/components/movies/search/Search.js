import React, { useEffect, useState, useMemo } from 'react';
import { movieStyle } from '../../../style/MovieStyle';
import { OneMovie } from './MovieCard';
import Background from '../../layout/Background';
import SearchBar from './SearchBar';
import { Paper, Grid } from '@material-ui/core';
import { RequestManager } from '../../../services/RequestManager';
import InfiniteScroll from 'react-infinite-scroller';

const sortMovies = (sortBy, array) => {
  const newArray = [...array];
  console.log('sort movies by: ', sortBy)
  newArray.sort((a, b) => {
    if (sortBy === 'title') {
      if (a.title < b.title)
        return (-1);
      if (a.title > b.title)
        return (1)
      return (0);
    }
    if (sortBy === 'genres')
      return (b[sortBy].length - a[sortBy].length)
    return (b[sortBy] - a[sortBy])
  })

  return newArray;
}

const filterMovies = (tab, filterYear, filterRate) => {
  console.log('filtering movies..')
  return tab.filter((a) => {
    const rating = Number(a.rating)
    if (!(rating >= filterRate[0] && rating <= filterRate[1]))
      return (0);
    if (!(a.year >= filterYear[0] && a.year <= filterYear[1]))
      return (0);
    return (1);
  })
}

const Search = () => {
  const classes = movieStyle();
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState('seeds');
  const [filterRate, setFilterRate] = useState([0, 10]);
  const [filterYear, setFilterYear] = useState([1950, new Date().getFullYear()])
  const [isSending, setIsSending] = useState(0)
  const [keywords, setKeywords] = useState('');
  console.log('render')
  useEffect(() => {
    RequestManager.popular()
      .then(res => {
        console.log(res);
        setMovies(res.data.movies);
      })
  }, [])

  const searchKeywords = (newKeywords, callback) => {
    if (![0, 2, 3].includes(isSending))
      return;
    setKeywords(newKeywords);
    setIsSending(1);
    RequestManager.search(newKeywords)
      .then((res) => {
        setSortBy('title')
        setMovies(res.data.movies);
        setIsSending(2);
      })
      .catch(() => {
        setIsSending(0);
        setMovies([]);
        console.log('failed')
      })
      .then(callback);
  }

  const loadNext = () => {
    if (isSending !== 2)
      return ;
    console.log('load next');
    const last = sortMovies('title', movies)[movies.length - 1];
    console.log('last: ', last);
    if (!last)
      return ;
    if (!last.title)
      return ;
    setIsSending(1)
    RequestManager.search(keywords, last.title)
    .then((res) => {
      if (res.data.movies.length === 0)
        return setIsSending(3);
      setSortBy('title')
      setMovies([...movies].concat(res.data.movies));
      setIsSending(2);
    })
    .catch(() => {
      setIsSending(0);
      //setMovies([]);
      console.log('failed to load next')
    })
  }

  const canLoad = isSending === 2;

  const sortedMovies = useMemo(() => sortMovies(sortBy, movies), [sortBy, movies])
  const filteredMovie = useMemo(() => filterMovies(sortedMovies, filterYear, filterRate), [sortedMovies, filterYear, filterRate])

  return (
    <>
      <Background />
      <Paper className={classes.movies}>
        <SearchBar
          sortBy={sortBy} setSortBy={setSortBy}
          filterYear={filterYear} setFilterYear={setFilterYear}
          filterRate={filterRate} setFilterRate={setFilterRate}
          searchKeywords={searchKeywords} />
        <InfiniteScroll
          pageStart={0}
          loadMore={loadNext}
          hasMore={canLoad}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          <Grid container justify="center" spacing={2}>
            {filteredMovie.map(OneMovie)}
          </Grid>
        </InfiniteScroll>
      </Paper>
      <div className={classes.endmargin} />
    </>
  )
}

export default Search;