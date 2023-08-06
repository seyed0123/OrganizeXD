# Use an official Node.js runtime as the base image
FROM node
LABEL authors="seyed"
# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the 'server' directory to the working directory
COPY server server

# Expose the port the server will be running on
EXPOSE 3005

# Run the server
CMD [ "node", "server/server.js" ]


# docker build -f G:\code\javaScript\jumpreact\Dockerfile.dockerfile -t organizexd .

# docker run -it -p 3005:3005 organizexd