const express = require("express")
const routes = require("./routes")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")

const app = express();

const socketio = require("socket.io")
const http = require("http")

const server = http.Server(app)
const io = socketio(server)

const connectedUsers = {}

io.on("connection", socket => {
    const {user_id} = socket.handshake.query
    connectedUsers[user_id] = socket.id

    
})

mongoose.connect("mongodb+srv://expedito00:96335565@expeditomongodb-atjvu.mongodb.net/expedito?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers
    return next()
}

)
// GET , POST , DELETE 

// req.query = acessar query params 
// req.params = para edição e delete
// req.body = acessar o corpo da requisição (para criação e edição de registro)
app.use(cors()) // posso escolher qual aplicação pode acessar o backend
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..","uploads")));
app.use(routes);
server.listen(3333);
