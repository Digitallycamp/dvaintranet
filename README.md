# About

The Learning Management System (LMS) for Digitally Camp is an intuitive platform designed to deliver high-quality, interactive online courses in development and design. The LMS offers seamless learning experiences for students and robust management tools for instructors.

src/
│
├── components/
│ ├── Admin/
│ │ ├── AdminDashboard.jsx
│ │ ├── AddAdmin.jsx
│ │ └── ManageUsers.jsx
│ ├── User/
│ │ ├── UserDashboard.jsx
│ │ └── Profile.jsx
│ ├── Auth/
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ └── ForgotPassword.jsx
│ └── Shared/
│ ├── Header.jsx
│ ├── Footer.jsx
│ └── Sidebar.jsx
│
├── context/
│ └── AuthContext.js
│
├── pages/
│ ├── AdminPage.jsx
│ ├── UserPage.jsx
│ ├── LoginPage.jsx
│ ├── RegisterPage.jsx
│ └── NotFoundPage.jsx
│
├── utils/
│ ├── authHelpers.js
│ ├── privateRoutes.js
│ └── api.js
│
├── App.js
├── index.js
└── routes.js

Firebase Resourse

- Availbale libraries : https://firebase.google.com/docs/web/setup#available-libraries

-Get started: https://firebase.google.com/docs/web/setup?hl=en&authuser=0&_gl=1*16gfxjo*_ga*NTAxODA2MTM1LjE3MTgxMDUyMTc.*_ga_CW55HF8NVT*MTczNTc3NzMyNC42My4xLjE3MzU3Nzc4MDcuMzMuMC4w

- WEB SDK API refrence: https://firebase.google.com/docs/reference/js/?hl=en&authuser=0&_gl=1*16gfxjo*_ga*NTAxODA2MTM1LjE3MTgxMDUyMTc.*_ga_CW55HF8NVT*MTczNTc3NzMyNC42My4xLjE3MzU3Nzc4MDcuMzMuMC4w

- Smaples https://firebase.google.com/docs/samples/?hl=en&authuser=0&_gl=1*16gfxjo*_ga*NTAxODA2MTM1LjE3MTgxMDUyMTc.*_ga_CW55HF8NVT*MTczNTc3NzMyNC42My4xLjE3MzU3Nzc4MDcuMzMuMC4w

# todo

## Add user to user collections afrter signup in.

when user login without signup, update their `user collection` with just the `email`
Redirect the user to onboarding

When user authenticate fro signup, redirect them to onboarding screen to complete the onboarding and set the `isOnboardingComplete` property `to true`

## Add course to user

- When user click on i have made payment for the first time, add the course to user. :done
- Admin approves user by update the `approved` field in the added course. :done
- Show only user approved course in dashboard. : done
- Show only user approved course lessons in lessons page. : check this solution in node.md :done
- Create a colelction for lessons: done
- Retrive user lessons under each batch and course : check this solution in node.md : done
- Admin deleted user from database
- Display LESSONS in CourseLesson UI
- Create a form for admin to add lessons to a batch

//not used

rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {

    // Rules for the "users" collection
    match /users/{uid} {
      // Allow authenticated users to read their own data
      allow read: if request.auth != null && request.auth.uid == uid;

      // Allow admins to read all user documents
      allow read: if request.auth != null && isAdmin();

      // Allow users to write (create/update) their own data, but not the role field
      allow write: if request.auth != null &&
                    request.auth.uid == uid &&
                    !('role' in request.resource.data.keys());

      // Allow updates: either by the user themselves (excluding role) or by an admin for specific fields
      allow update: if (request.auth != null &&
                       request.auth.uid == uid &&
                       !('role' in request.resource.data.keys())) // User updating their own data
                      ||
                      (request.auth != null && isAdmin() && // Admin can update specific fields
                       (request.resource.data.keys().hasOnly(['batches']) || // Only batches field
                        request.resource.data.keys().hasOnly(['isSuspended']))); // Only isSuspended field
    }

    // Rules for the "studentText" collection
    match /studentText/{studentId} {
      allow read: if request.auth != null; // All authenticated users can read
      allow write: if request.auth != null && request.auth.uid == studentId; // Only the owner can write
    }

    // Rules for the "lesson" collection
    match /lesson/{lessonId} {
      allow read: if request.auth != null; // All authenticated users can read lessons
      allow write: if request.auth != null && isAdmin(); // Only admins can write lessons
    }

    // Rules for the "courses" collection
    match /courses/{uid} {
      allow read: if request.auth != null; // All authenticated users can read lessons
      allow write: if request.auth != null && isAdmin(); // Only admins can write COURSE
    }

    // Rules for the "assessment" collection
    match /assessment/{assessmentId} {
      allow read: if request.auth != null; // All authenticated users can read assessments
      allow write: if request.auth != null && isAdmin(); // Only admins can write assessments
    }

    // Helper function to check admin role in the "users" collection
    function isAdmin() {
      return request.auth != null &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

}
}

## scrape this page

https://algomite.com/blog/the-complete-list-of-javascript-event-listeners#Animation_Events
