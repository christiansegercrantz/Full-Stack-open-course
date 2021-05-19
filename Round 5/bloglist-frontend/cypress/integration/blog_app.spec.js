describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Test user',
            username: 'tester',
            password: 'secret'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
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
            
        })
        it.only('A blog can be created', function() {
            const blog = {
                title: 'A new blog',
                author: 'Writer',
                url: 'imaginary.com'
            }
            cy.get('.toggleButtonOn').click()
            cy.get('.blogForm').parent().should('not.have.css', 'display', 'none')
            cy.get('#title').type(blog.title)
            cy.get('#author').type(blog.author)
            cy.get('#url').type(blog.url)
            cy.contains('Create').click()

            cy.get('#notification').contains(`${blog.title} by ${blog.author} has been added`)
            cy.contains(`${blog.title} by ${blog.author}`) 
        })
        describe('When a blog exists', function(){
            beforeEach(function(){
                const blog = {
                    title: 'A new blog',
                    author: 'Writer',
                    url: 'imaginary.com'
                }
                cy.createBlog(blog)
                cy.visit('http://localhost:3000')
                cy.wait(150)
            })
            it.only('... it can be liked', function(){
                cy.contains('View').click()
                cy.contains('Like').click()
            })
        })
    })
})