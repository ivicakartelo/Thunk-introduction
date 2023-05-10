import { AddPostForm } from './features/posts/AddPostForm'
import { PostsList } from './features/posts/PostsList'

function App() {
/*
  function wrapper_function() {
    // this one is a "thunk" because it defers work for later:
    return function thunk() {   // it can be named, or anonymous
      console.log('do stuff now');
    };
  }

  //wrapper_function()()
  const thunk = wrapper_function();
  thunk();
*/

  return (
    <>
      <AddPostForm />
      <PostsList />
    </>    
  );
}
export default App;
