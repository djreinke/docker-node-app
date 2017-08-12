FROM node:6
#FROM python:2.7
#FROM sergeymakinen/oracle-instant-client:11.2

#RUN mkdir -p /usr/src/app  
WORKDIR /usr/src/app  
COPY package.json .

EXPOSE 8080  
RUN npm install
COPY . .
ENV NODE_ENV 'development'  
CMD ["npm", "start"] 

