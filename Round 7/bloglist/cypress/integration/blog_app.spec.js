describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test user',
      username: 'tester',
      password: 'secret'
    }
    const otherUser = {
      name: 'Test user',
      username: 'fake',
      password: 'hemlig'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', otherUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#loginForm')
      .contains('login')
  })
  describe('Login', function(){
    it('User logs in succesfully', function(){
      cy.get('#username').type('tester')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('Test user logged in')
    })
    it('User does not login with wrong password', function(){
      cy.get('#username').type('tester')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('html')
        .should('not.contain', 'Test user logged in')
      cy.get('#notification')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .contains('Invalid username or password')
    })
    it('User does not login with wrong username', function(){
      cy.get('#username').type('asdasd')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.get('html')
        .should('not.contain', 'Test user logged in')
      cy.get('#notification')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .contains('Invalid username or password')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tester', password: 'secret' })
      cy.wait(150)
    })
    it('A blog can be created', function() {
      const blog = {
        title: 'A new blog',
        author: 'Writer',
        url: 'imaginary.com'
      }
      cy.get('.toggleButtonOn').click({ force: true })
      cy.get('.blogForm').parent().should('not.have.css', 'display', 'none')
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.contains('Create').click()

      cy.get('#notification').contains(`${blog.title} by ${blog.author} has been added`)
      cy.contains(`${blog.title} by ${blog.author}`)
    })
    describe('When a blog exists', function(){
      let blog = {}
      beforeEach(function(){
        blog = {
          title: 'A new blog',
          author: 'Writer',
          url: 'imaginary.com'
        }
        cy.createBlog(blog)
        cy.visit('http://localhost:3000')
        cy.wait(150)
      })
      it('... it can be liked', function(){
        cy.contains('View').click()
        cy.contains('likes').contains('0')
        cy.contains('Like').click()
        cy.contains('likes').contains('1')
        cy.contains('Like').click()
        cy.contains('likes').contains('2')
      })
      it('...and it can be deleted by the creator', function() {
        cy.contains('View').click()
        cy.contains('Remove').click()
        cy.get('#notification').contains(`${blog.title} has been removed`)
        cy.get('html').should('not.contain', blog.title)
      })
      it('...and not by someone else', function() {
        cy.contains('Logout').click()
        cy.login({ username: 'fake', password: 'hemlig' })
        cy.contains('View').click()
        cy.contains('Remove').click()
        cy.get('#notification').contains(`Could not delete ${blog.title} because: Error: Request failed with status code 401`)
        cy.contains(blog.title)
      })
      describe('When a multiple blogs exists', function(){
        let blog2 = {}
        let blog3 = {}
        beforeEach(function(){
          blog2 = {
            title: 'A second blog',
            author: 'Typer',
            url: 'this.com',
            likes: 6
          }
          blog3 = {
            title: 'A third blog',
            author: 'Maker',
            url: 'that.com',
            likes: 5
          }
          cy.createBlog(blog2)
          cy.createBlog(blog3)
          cy.visit('http://localhost:3000')
        })
        it('Blogs ordered by most likes', function(){
          cy.contains(blog.title).contains('View').click()
          cy.contains(blog2.title).contains('View').click()
          cy.contains(blog3.title).contains('View').click()
          cy.get('.blog').then(blogs => {
            const likes = blogs.map( (i, blog) => blog.children[0].children[1].children[2].childNodes[1].nodeValue)
            cy.expect(likes[0] >= likes[1]).to.equal(true)
            cy.expect(likes[1] >= likes[2]).to.equal(true)
          })
        })
      })
    })
  })
})