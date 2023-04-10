const express = require('express');
const { connect, mongoose } = require('./db');
connect();

const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const platformRoute = require('./routes/platform')
const GuildRoute = require('./routes/guild')

const app = express(); 
const PORT = 3001; 

app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/platform', platformRoute);
app.use('/api/v1/guild', GuildRoute);

app.listen(PORT, ()=>console.log(`Running Express server on port ${PORT}`));