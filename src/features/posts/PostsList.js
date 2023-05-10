import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts } from './postsSlice'
import { Spinner } from '../../components/Spinner'

const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
    </article>
  )
}

export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  console.log(posts)
  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)
 
console.log(posts)

  useEffect(() => {
    console.log(postStatus)
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    content = posts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }
  console.log(content)
return (
  <section>
    <h2>Posts</h2>
    {content}   
  </section>
)
}