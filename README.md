# Interview Scheduler

## Project Description

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

## Work Outcomes

- Troubleshoot and debug problems associated with web development in React.
- Evaluate or analyze coding solutions/ideas, and their limitations and/or benefits.
- Contribute to full-stack web applications using modern software development patterns, tools, and workflows.
- Integrate into common development team workflows (git, Github workflow, automated testing, and code reviews).

## Setup

Install dependencies with `npm install`.

Dependencies include:

- axio:^0.27.,
- classname:^2.2.,
- normalize.cs:^8.0.,
- reac:^16.9.,
- react-do:^16.9.,
- react-hooks-testing-librar:^0.6.,
- react-script:3.4.

# Database & API

For this app to fully function we must run the clien and the API server.

- Fork and Clone the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) server
- Follow the set-up instructions in the README.md file

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Screenshot Snippets

### Adding an Appointment

![Add Interview](https://user-images.githubusercontent.com/101018212/193963218-17c0df60-4d89-4694-97d7-89c54c0bffac.gif)

### Editing an Appointment

![Edit](https://user-images.githubusercontent.com/101018212/193963225-f9d8fd99-c9ba-49d1-ab75-149692564cde.gif)

### Deleting an Appointment

![Delete Interview](https://user-images.githubusercontent.com/101018212/193963235-77fc651d-41d4-4b7a-a693-ffef4f5a2e49.gif)
