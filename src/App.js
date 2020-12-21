import React, { Component } from 'react';
import api from './components/api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import SearchBar from './components/Searchbar/Searchbar';
import Button from './components/Button/Button';
import Loader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default class App extends Component {
  state = {
    images: [],
    isLoading: false,
    query: '',
    page: 1,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { query, page } = this.state;

    this.setState({ isLoading: true });

    api
      .fetchImg(query, page)
      .then(images =>
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        })),
      )
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  onChangeQuery = query => {
    this.setState({ query: query, page: 1, images: [] });
  };

  render() {
    const { images, isLoading } = this.state;

    return (
      <>
        <div>
          <SearchBar onSubmit={this.onChangeQuery} />
          <ImageGallery images={images} />

          <span className="loader">
            {isLoading && (
              <Loader
                type="TailSpin"
                color="#00BFFF"
                height={80}
                width={80}
                timeout={3000} //3 secs
              />
            )}
          </span>
          {images.length > 0 && !isLoading && (
            <Button onClick={this.fetchImages} />
          )}
        </div>
      </>
    );
  }
}
