# Mini Perplexity System

## Overview

The **Mini Perplexity System** is a React-based web application that allows users to search for answers to their questions. It leverages the Google Custom Search API to retrieve relevant search results and uses the Hugging Face API to generate concise answers from those results. This application is designed to provide quick and informative responses, along with source links for further reading.

## Features

- **Search Functionality**: Users can input their questions, and the system will fetch relevant results from Google.
- **Answer Generation**: The application utilizes the Hugging Face API to generate a summarized answer based on the search results.
- **Source Links**: The application displays links to the sources from which the answers are derived.
- **Caching**: Previously searched queries are cached to improve performance and reduce API calls.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Google Custom Search API**: Used to fetch search results based on user queries.
- **Hugging Face API**: Utilized to generate answers from the search results.
- **CSS**: For styling the application.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/prashanth233/Mini_Perplexity.git
   cd Mini_Perplexity
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```
   
3. Start the application:

   ```bash
   npm start
   ```

## Usage

1. Open the application in your web browser.
2. Type your question in the input field and click the "Search" button.
3. The application will display the generated answer along with source links for reference.
