# Globe Chat
Globe chat is a web chat application built with **MERN** stack where users can communicate with each other in **real-time**. Users need to register in the application
in order to access the app and store their progress. User then can login and logout whenever they want. Apart from real-time messaging it also has a feature of file
sharing.  
&nbsp;  
&nbsp;  
![Screenshot 2023-07-12 123530](https://github.com/parthkasture/Real-Time-Chat-WebApp/assets/95185785/7ef29e4f-d610-4321-93da-b57661d1f422)

&nbsp;  
&nbsp;  

![Screenshot 2023-07-12 125925](https://github.com/parthkasture/Real-Time-Chat-WebApp/assets/95185785/9bb21ea5-3e95-4897-9e0f-1e29bcc5c6e5)

## Installation Guide
### Requirements
- [Node.js](https://nodejs.org/en/download)
- [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/)

Both should be installed and make sure mongodb is running.  

```
git clone https://github.com/parthkasture/Real-Time-Chat-WebApp.git
cd Real-Time-Chat-WebApp
```

Now install the required dependencies.  
```cd server
npm install
cd ..
cd public
npm install
```
To start the servers,  

For frontend
```
cd public
npm run dev
```
For backend
```
cd ../server
nodemon index.js
```
Now open localhost:5173 in browser to start the application.

# Real-time_chat_web_application
