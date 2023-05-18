import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts } from './postsSlice'
import { Spinner } from '../../components/Spinner'

const PostExcerpt = ({ post }) => {
  return (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
    </article>
  )
}

export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  console.log(posts)
  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    postStatus === 'idle' && dispatch(fetchPosts())
  }, [postStatus, dispatch])

  let content

  postStatus === 'loading' ? (
    content = <Spinner text="Loading..." />
  ) : postStatus === 'succeeded' ? (
    content = posts.map(post => <PostExcerpt post={post} />)
  ) : (
    content = <div>{error}</div>
  )

  return (
    <section>
      <h2>Posts</h2>
      {content}   
    </section>
  )
}