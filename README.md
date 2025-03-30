## Jay's Fellowship Application

This repository provides a starter template for creating applications using React+Vite and AWS Amplify, emphasizing easy setup for authentication, API, and database capabilities.

## Overview

This template equips you with a foundational React application integrated with AWS Amplify, streamlined for scalability and performance. It is ideal for developers looking to jumpstart their project with pre-configured AWS services like Cognito, AppSync, and DynamoDB.

## Features

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **Database**: Real-time database powered by Amazon DynamoDB.

## Improvements

Given more time I would have liked to...
- Make the table update its contents whenever a student is created or deleted.
- Improve the delete UI/UX.
- Improve Lambda function and increase my understanding of lambda functions.

## How would I have completed the other features

- Scaling up to 50,000 records.
    I would first need to fix the delete student interface. Then write a python script to auto generate 50,000 students with generic emails/names like emailX@gmail.com/studentFNameX and increment x for every entry. Then I would be able to test if the functions I used are scalable and sufficiently performant.

- Testing
    Using Jest I would test for edge cases when adding new entries to the database such as very long strings or numbers instead of strings. I would then use a tests case to ensure all frontend buttons work including creating and deleting students, filtering and sorting the table.

- Lambda
    I did attempt to use a Lambda function and my handler file has some logic included there however I did not end up using it as I was running short on time and struggling to implement it correctly. I would have liked to have used a custom query to export a JSON file with the relevant details to pass straight to my AG Grid table, w

- State management


## Deploying to AWS

For detailed instructions on deploying your application, refer to the [deployment section](https://docs.amplify.aws/react/start/quickstart/#deploy-a-fullstack-app-to-aws) of our documentation.
