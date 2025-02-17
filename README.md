# Bharat Itinerary Guru

## Project Description

Bharat Itinerary Guru is a simple yet powerful travel itinerary application designed for Indian cities. The app allows users to generate personalized travel itineraries based on their preferences, ensuring a hassle-free planning experience for travelers. By utilizing advanced technologies such as Gemini AI and Large Language Models (LLM), the application leverages structured output and multiple prompts to deliver relevant and customized itineraries. It also supports data extraction from PDF files for seamless integration with travel documents.

## Key Features

- **Generate Itinerary Based on User Preference**: Users can input their preferences for the types of places they wish to visit, and city of interest. The app uses this data to generate a personalized itinerary for a seamless travel experience.
  
- **Gemini AI Model**: The application utilizes the powerful Gemini AI model to analyze the input data and generate contextually accurate itineraries, optimizing the travel experience for each user.
  
- **Leveraged Structured Output**: The app leveraged the LLMs structured output, providing easy-to-read travel itineraries that users can refer to during their trip.
  
- **LLM Chaining**: Through chaining of multiple prompts, the app ensures that the generated itineraries are accurate, complete, and cater to the specific needs of the user.
  
- **Data Extraction from PDF Files**: The application can extract useful data from PDF files, such as travel guides, to integrate with the itinerary generation process.
  
- **Multiple Prompts**: Multiple prompts are used to refine the itinerary generation, ensuring a more accurate and personalized experience for users based on their detailed inputs.

## Steps to Follow to Install the App Locally

1. **Clone the Repository**

   Clone the project repository to your local machine using the following command:
   ```bash
   git clone <repo-url>
   ```

3. **Create a `.env` File**

   Create a .env file in the root of your project directory. This file will contain environment variables, such as API keys and service configurations, which are referenced in the Dockerfile. Ensure you set them according to the configuration specified in the Dockerfile.

4. **Build and Start the Application**

   Use the following Docker Compose command to build the container and start the application:
   ```bash
   docker-compose up --build
   ```
   
6. **Access the Swagger Documentation**

   After the container is successfully built and running, navigate to the Swagger documentation endpoint as specified in your `.env` file. This will provide an interface to interact with the application’s API endpoints.

## Additional Notes

**Challenges Faced**:
- Integrating AI models (Gemini AI) for generating relevant itineraries was initially challenging due to the complexity of chaining multiple prompts and ensuring accurate responses.
  
**Future Improvements**:
- API Integrations: Integrate APIs for real-time travel data such as flight details, hotel bookings, and weather updates.
- Multi-City Itinerary Generation: Extend the app’s functionality to generate itineraries for multi-city travel within India. (Currently I have only integrated `Jaipur` minimizing the complexity of the project).
- Faster API-Responses: Although the current implementation supports a basic in memory Map which acts as a simple cache lookup, later on can implement proper caching mechanism like Redis. The time taken by current API is comparatively long but fine considering the project simplicity. It can be further optimized by LLM streams, background workers, a queuing mechanism for handling the heavy LLM tasks.
- Test Coverage: The app has been tested for core functionalities such as itinerary generation, data extraction from PDFs, and API interactions. Further testing is needed for handling edge cases and ensuring the AI model’s accuracy across various user inputs.
- Powerfull LLMs: Currently for the simplicity of the project I have used Google's Gemini model considering its free tier APIs for selective gemini-1.5 and gemini-2.0 models. We can use more powerfull and better models considering the project requirements.

## Support Links:
- Google Gemini API-Key Generation: [Generate API Key](https://aistudio.google.com/apikey)
- Swagger Docs - `GET - http://localhost:3000/{{ SWAGGER_DOCS_ROUTE }}`
