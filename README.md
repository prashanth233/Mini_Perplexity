# Mini Perplexity System

## Overview

The **Mini Perplexity System** is a web application built with React that provides users with quick, summarized answers to their questions. It uses the Google Custom Search API to gather relevant search results and the Hugging Face API to summarize these results into concise answers. Additionally, the application displays source links for each answer, allowing users to delve deeper into the original content.

## Objectives

- Enable users to obtain summarized answers to their questions quickly.
- Provide reliable source links for further reading and verification.
- Reduce API call volume by caching repeated queries.
- Offer a minimalistic and intuitive interface.

## Features

- **Search Functionality**: Users input questions, and the system fetches relevant web results using Google Custom Search.
- **Answer Generation**: Uses the Hugging Face API to generate a concise summary of the search results.
- **Source Links**: Displays clickable source links to direct users to the original content.
- **Caching**: Reduces repeated API calls and enhances performance by caching frequently searched queries.

## Technologies Used

- **React**: For building and structuring the user interface.
- **Google Custom Search API**: Fetches relevant web content based on user queries.
- **Hugging Face API**: Summarizes the retrieved content into concise answers.
- **CSS**: Provides a simple, clean, and responsive layout.

## Setup and Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/prashanth233/Mini_Perplexity.git
   cd Mini_Perplexity
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables**: You can use the provided `setup.sh` script to create the `.env` file automatically.

   ### For Mac/Linux:

   - Make the script executable:

     ```bash
     chmod +x setup.sh
     ```

   - Run the script:

     ```bash
     ./setup.sh
     ```

   ### For Windows:

   - Run the script using Git Bash (if installed) or use the following command in PowerShell:

     ```powershell
     bash setup.sh
     ```

4. **Start the application:**

   ```bash
   npm start
   ```

## Deployment

The application is deployed on Vercel. You can access the live version here: [Mini Perplexity System](https://mini-perplexity-tu5c.vercel.app/)

**Deployment Steps:**
1. Deployed the project by linking GitHub repository to Vercel.
2. Configured the environment variables in the Vercel dashboard with API keys.
3. Deployed and access the live application using the generated Vercel URL.

## Usage

1. Open the application in your web browser.
2. Enter a question in the search input field.
3. Click "Search" to fetch the answer.
4. The app displays a summarized answer along with source links for more detailed reading.

### Example Interaction

- **Question**: "What is the capital of France?"
- **Generated Answer**: "Paris Paris is the capital and most populous city of France...... ."
- **Source Links**: Links to websites that provide more information on Paris.

## Design Decisions, Challenges, and Solutions

### Design Decisions

- **Simple UI**: The interface was kept minimalistic for ease of use, focusing on accessibility and readability.
- **Answer and Source Display**: Separating the answer and source sections makes it easier for users to locate additional information quickly.
- **Caching**: Adding a caching mechanism reduces response time and API usage.

### Challenges

- **API Limitations**: Both Google Custom Search and Hugging Face APIs have rate limits. This was mitigated by implementing caching to minimize redundant API calls.
- **Result Quality**: Not all Google search results are directly relevant to the user query, which can lead to unsatisfactory answers. This was partially addressed by limiting the length of the summary input to Hugging Face, focusing on the most relevant snippets.

### Solutions

- **Caching Optimization**: Using a Map for caching queries ensures that repeated searches return instantly, enhancing the user experience and reducing API costs.
- **Source Linking**: To provide better context, the app includes links to the original Google search results.

## Future Improvements

- **Improved Answer Filtering**: Enhance the summarization process to better prioritize highly relevant snippets.
- **Error Handling**: Develop more comprehensive error messages and logging to capture different API response errors.
- **Additional APIs**: Integrate alternative search APIs to improve result diversity and accuracy.
- **UI Enhancements**: Add loading animations and dynamic feedback to improve the user experience during data fetches.
- **Pagination for Sources**: Implement pagination for source links when there are more than a few relevant results.
