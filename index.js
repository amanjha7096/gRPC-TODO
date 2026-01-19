//learning grpc

/*
gRPC -> high performance, open source and universal RPC framework
RPC-> Remote Procedure Call
In RPC client can directly call methods on server as if it is a local object

Advantages of gRPC:
-uses HTTP/2 for transport
-uses Protocol Buffers as interface definition language
-supports multiple programming languages
-Protocol Buffers (Protobuf) : binary serialization format,
    ex: syntax = "proto3";

        message User {
            string id = 1;
            string name = 2;
            int32 age = 3;
        }
    
    # 1,2,3 are field numbers used to identify fields in the binary format
    # When gRPC sends data, it does NOT send field names like id or title, it uses field numbers.


------------------------------------------------------------------------------
Protobuf = Data format
gRPC = Communication system
------------------------------------------------------------------------------
*/

const grpc = require('@grpc/grpc-js');
const prtoLoader = require('@grpc/proto-loader');

//loading proto in our server
const packageDefinition = prtoLoader.loadSync("todo.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const todosProto = grpc.loadPackageDefinition(packageDefinition); //loading package definition into grpc object


const server = new grpc.Server(); //creating grpc server

const todos = [
    {
        id: '1',
        title: 'First Todo',
        content: 'This is the first todo item'
    },
    {
        id: '2',
        title: 'Second Todo',
        content: 'This is the second todo item'
    }
];

server.addService(todosProto.TodoService.service, {
    //we are adding rpcs 
    listTodos: (call, callback) => {   //all request parameter is going to come in call-> call.param
        callback(null, todos); //response is sent using callback
    },
    createTodo: (call, callback) => {
        let incomingTodo = call.request; //getting request data from call.request
        todos.push(incomingTodo); //pushing new todo to todos array
        callback(null, incomingTodo); //sending response back
    },
    getTodo: (call, callback) => {
        let todoId = call.request.id;
        let todo = todos.find(t => t.id == todoId);
        if (todo) {
            callback(null, todo);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Todo Not Found"
            }, null);
        }
    }
});

//starting server
server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(),
    (err, port) => {
        if (err) {
            console.error("Failed to start server:", err);
            return;
        }
        console.log(`gRPC server running on port ${port}`);
    }
);