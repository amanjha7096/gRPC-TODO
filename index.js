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
