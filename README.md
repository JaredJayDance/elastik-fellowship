## Jay's Fellowship Application

This repository provides the code needed to set up my Amplify Gen2 application for my Elastik Fellowship Project.

To view the project, please use the following URL: https://main.d29s4ux576i452.amplifyapp.com/

## Overview

This web application has a sign up/sign in interface which, once signed in takes you to a dashboard and allows you to view the contents of a DynamoDB database and add or delete items from the database. 

## Features

- **Authentication**: Setup with Amazon Cognito, offers secure user authentication with sign up and sign in capability.
- **Database**: DynamoDB set up with the ability to create, read and delete entries. Did not complete update feature.
- **Table**: The table has search, sort, filter, pagination features.

## Improvements

Given more time I would have liked to...
- Make the table update its contents dynamically whenever a student is created or deleted.
- Add the ability for users to update existing student details.
- Improve the delete UI/UX.
- Get the Lambda function working properly and increase my understanding of Lambda functions.

## How would I have completed the other features

- **Scaling up to 50,000 records**
    I would first need to fix the delete student interface. Then write a python script to auto generate 50,000 students with generic emails/names like emailX@gmail.com/studentFNameX and increment x for every entry. Then I would be able to test if the functions I used are scalable and sufficiently performant.

- **Testing**
    Using Jest I would test for edge cases when adding new entries to the database such as very long strings or numbers instead of strings. I would then use a tests case to ensure all frontend buttons work including creating and deleting students, filtering and sorting the table.

- **Lambda**
    I did attempt to use a Lambda function and my handler file has some logic included there, however I did not end up using it as I was running short on time and struggling to implement it correctly. I would have liked to have used a custom query to export a JSON file with the relevant details to pass straight to my AG Grid table.

- **State Management**
    I have never used React Context API before so I would have had to conduct research and decided the best way to apply it to my project.


- **Deploying the application**
    To deploy this application begin by making a copy of the git repository. Then log in to AWS, navigate to AWS Amplify and click "Create New App" then follow along with the process and select your newly copied repo to deploy the provided code.