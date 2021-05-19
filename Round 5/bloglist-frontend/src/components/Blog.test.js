import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/react'
import Blog from './Blog'

describe('Blog: renders content', () => {
    let blog
    let component
    beforeEach( () => {
        blog = {
            title: 'Blog title',
            author: 'Blog author',
            likes: 'Blog likes',
            url: 'Blog url',
            user: { name: 'me', username:'Admin', token: '' }
        }
        component = render(
            <Blog blog={blog}/>
        )
    })
    test('Renders title and author but not url and likes', () => {

        const div = component.container.querySelector('div')
        console.log(prettyDOM(div))
        expect(div).toHaveTextContent('Blog title')
        expect(div).toHaveTextContent('Blog author')
        expect(div).not.toHaveTextContent('Blog likes')
        expect(div).not.toHaveTextContent('Blog url')
    })
    test('Button reveals url and likes', () => {
        const viewButton = component.getByText('View')
        //console.log(prettyDOM(viewButton))
        fireEvent.click(viewButton)
        const details = component.container.querySelector('.blogDetails')
        expect(details).toHaveTextContent('Blog likes')
        expect(details).toHaveTextContent('Blog url')
    })
})

describe('Blog: like button', () => {
    let blog
    let component
    const mockLikeHandler = jest.fn()
    beforeEach( () => {
        blog = {
            title: 'Blog title',
            author: 'Blog author',
            likes: 'Blog likes',
            url: 'Blog url',
            user: { name: 'me', username:'Admin', token: '' }
        }
        component = render(
            <Blog blog={blog} handleLikeBlog={mockLikeHandler}/>
        )
    })
    test('Clicking like button twice', () => {
        //const div = component.container.querySelector('div')
        //console.log(prettyDOM(div))
        const viewButton = component.getByText('View')
        fireEvent.click(viewButton)
        const likeButton = component.getByText('Like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
        expect(mockLikeHandler.mock.calls).toHaveLength(2)
    })
})