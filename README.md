# WebApp-Assignment2-Client

Name: Yifan Gu 20086429

## Functionality

- **Register Page:** A user can register an account in this page.
    - Username: required;
    - Password: required;
    - Email: required; will be tested if it is in a correct form;
- **Login Page:** A user can login in this page.
    - Username: required;
    - Password: required;
- **Log Out:** A user can log out by clicking on the ‘Log Out’ button in the navigation bar.
- **Home Page:** If the user doesn’t login, the Home Page will show a header and 2 buttons (Login and Register). If the user is logged in, the Home Page will show a welcome message.
- **Posts List Page:** By clicking on the ‘Posts List’ button in the navigation bar, the user will be navigated to Posts List Page. In this page, users can filter by posts’ attributes, add Like for posts and check detail views.
- **Detail View Page:** By clicking on the ‘Check Detail View’ button in the table of Posts List Page, the user will be navigated to Detail View Page. If the user is the author of the post, he can delete the post by clicking on the ‘Delete’ button. If the user is not the author of the post, the ‘Delete’ button will not be shown.
- **Post Your Idea Page:** By clicking on the ‘Post Your Idea’ button in the navigation bar, the user will be navigated to Post Your Idea Page. In this page, the user can upload one post.
    - Title: required; minlength is 5; maxlength is 20; 
    - Content: required; minlength is 5; maxlength is 100;
- **Users List Page:** By clicking on the ‘Users List’ button in the navigation bar, the user will be navigated to Users List Page. In this page, users can filter by users’ attributes and add Follow for users.
