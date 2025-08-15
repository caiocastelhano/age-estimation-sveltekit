# 🔮 Svelte Age Predictor

Front-end application built with **SvelteKit** that uses the public API [agify.io](https://agify.io) to estimate a person’s average age based on the entered name.

This project was originally created as part of a technical challenge for a hiring process. Although I didn’t advance in the process, I decided to keep it in my portfolio as it was a great opportunity to learn SvelteKit and API consumption.

## 🌐 Visit

🌐 (Insert deployed app link here, if available)

## 🧠 About the Project

The app queries the [agify.io](https://agify.io) API to return the average estimated age and record count for a given name. It features a reactive input field with a debounce mechanism and URL synchronization, offering a smooth and simple user experience.

## 🌐 Features

- Query to the [agify.io](https://agify.io) API  
- Reactive input field with 1-second debounce  
- URL synchronization with the search (`?name=...`)  
- Displays the estimated average age and record count  
- Responsive layout with pure CSS (no frameworks)  
- Styling focused on simplicity and performance

## 🛠️ Technologies Used

- [SvelteKit](https://kit.svelte.dev/)  
- Pure CSS with local scope in `+page.svelte`  
- REST API [agify.io](https://agify.io)  

## 📱 Responsiveness

The layout adapts to different screen sizes, ensuring usability on **desktop, tablet, and mobile**.

## 📅 Development Stages

### 01 – Project Setup
- Created the project with SvelteKit  
- Initial structure and automatic routing for the main page

### 02 – Data Entry and URL Sync
- Input field created with `bind:value`  
- URL synchronization using `goto()` whenever the name changes  
- If the page loads with `?name=`, the input is automatically populated

### 03 – API Integration
- Implemented `load()` to fetch data from agify.io  
- API response (`name`, `age`, `count`) displayed in the interface  
- Handles initial state and clears the URL if the field is emptied

### 04 – Styling with Pure CSS
- Dark palette with green highlights  
- Centered layout  
- Montserrat font (Google Fonts)
