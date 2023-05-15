import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://640114a00a2a1afebee5c77d.mockapi.io/post1')
  return response.data
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content}` object
  async (initialPost) => {
    // We send the initial data to the mock API server
    const response = await axios.post('https://640114a00a2a1afebee5c77d.mockapi.io/post1', initialPost)
    // The response includes the complete post object, including unique ID
    console.log(response)
    return response.data
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {}, 
    extraReducers(builder) {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.status = 'loading'
        }) 
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = 'succeeded'
          // Add any fetched posts to the array
          state.posts = state.posts.concat(action.payload)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
          // We can directly add the new post object to our posts array
          state.posts.push(action.payload)
        })
      }
    }
  )

export default postsSlice.reducer

export const selectAllPosts = state => state.posts.posts

console.log(selectAllPosts)

export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)