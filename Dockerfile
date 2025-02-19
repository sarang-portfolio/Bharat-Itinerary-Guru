FROM node:20.17.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 

ARG PORT
ARG GEMINI_API_KEY
ARG SWAGGER_DOCS_ROUTE
ENV PORT=$PORT
ENV GEMINI_API_KEY=$GEMINI_API_KEY
ENV SWAGGER_DOCS_ROUTE=$SWAGGER_DOCS_ROUTE

EXPOSE 3000
CMD ["npm", "run", "start:dev"]
# Run tests
CMD ["npm", "run", "test"]