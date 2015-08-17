USER STORIES:

Create a topic ---> have topic added to list of topics.<BR>
View topic ---> on list but also individually.<BR>
Create user with pic.<BR>
Leave comment on topic ---> will take you to view comment added.<BR>
Vote on topics ---> have this control order.<BR>
See how many comments are on a thread.<BR>

ROUTES:

/threads - app.get - view all thread pages. should be index.<BR>
/threads/:id - app.get - to leave a comment or view individual comments and details.<BR>
/threads/new - app.post - res.redirect('/threads/'+ this.lastID) - start a new thread.<BR>
/users/new - app.post - create a user.<BR>
/threads/:id/comments - app.post - res.redirect('/threads/'+ req.params.id) - post comment.<BR>
/threads/:id/votes - app.post - res.redirect('/threads/'+req.params.id) - vote.<BR>
/threads/:id - app.delete - res.redirect('/threads') = delete.<BR>
ERD:

![erd](https://github.com/davidwightman/project_two/erd.tif)

WIREFRAME

![wireframe](https://github.com/davidwightman/projects/project_two/photo.JPG)