import React, { Component } from 'react';

import './App.css';

// Components
import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      word: ''
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.searchWord = this.searchWord.bind(this);
  }

  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
      .then(res => this.setState({ posts: res.data }))
      .catch(err => alert(`Error: ${err}.`));
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts/?id=${id}`, { text })
      .then(res => this.setState({ posts: res.data }))
      .catch(err => alert(`Error: ${err.message}.`));
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts/?id=${id}`)
      .then(res => this.setState({ posts: res.data }))
      .catch(err => alert(`Error: ${err.message}.`));
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text })
      .then(res => this.setState({ posts: res.data }))
      .catch(err => alert(`Error: ${err.message}`));
  }

  searchWord(word) {
    this.setState({ word: word });
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="App__parent">
        <Header
          posts={this.state.posts}
          search={this.searchWord} />

        <section className="App__content">

          <Compose createPost={this.createPost} />
          {posts.filter((post) => {
            return post.text.includes(this.state.word.toLowerCase())
          }).map(post => {
            return <Post
              key={post.id}
              post={post.text}
              date={post.date}
              updatePostFn={this.updatePost}
              id={post.id}
              deletePostFn={this.deletePost}
            />
          })}
        </section>
      </div>
    );
  }
}

export default App;
