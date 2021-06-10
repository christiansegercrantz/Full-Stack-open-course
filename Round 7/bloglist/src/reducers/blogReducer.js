import blogService from '../services/blogs'

const initialState = []

const sortBlogs = (blogs) => {
  return blogs.sort((first, second) => second.likes - first.likes ||  first.title.localeCompare(second.title)
  )
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogsFromDB = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogsFromDB,
    })
  }
}

export const addBlog = (newBlogObj) => {
  return async dispatch => {
    const addedBlog = await blogService.create(newBlogObj)
    dispatch({
      type: 'ADD',
      data: addedBlog,
    })
    return addedBlog
  }
}

export const removeBlog = (BlogObj) => {
  return async dispatch => {
    await blogService.remove(BlogObj)
    dispatch({
      type: 'REMOVE',
      data: {
        id: BlogObj.id
      }
    })
  }
}



export const likeBlog = (BlogObj) => {
  return async dispatch => {
    await blogService.addLike(BlogObj)
    dispatch({
      type: 'LIKE',
      data: {
        id: BlogObj.id
      }
    })
  }
}

const blogReducer = (state = initialState, action) => {
  switch(action.type){
  case 'INIT':
    return sortBlogs(action.data)
  case 'ADD':
    return sortBlogs([action.data, ...state])
  case 'REMOVE':
    return sortBlogs(state.filter(b => b.id !== action.data.id))
  case 'LIKE':{
    const id = action.data.id
    const likedBlog = state.find(note => note.id === id)
    const updatedBlog = { ...likedBlog, votes: likedBlog.votes +1 }
    return sortBlogs(state.map(b => b.id !== id ? b : updatedBlog))
  }
  default:
    return state
  }

}

export default blogReducer