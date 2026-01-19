# Learning gRPC

gRPC is a high-performance, open-source, and universal Remote Procedure Call (RPC) framework.

## What is RPC?

RPC stands for Remote Procedure Call. It allows a client to directly call methods on a server as if it were a local object.

## Advantages of gRPC

- Uses HTTP/2 for transport
- Uses Protocol Buffers as the interface definition language
- Supports multiple programming languages

## Protocol Buffers (Protobuf)

Protocol Buffers is a binary serialization format.

Example:

```proto
syntax = "proto3";

message User {
    string id = 1;
    string name = 2;
    int32 age = 3;
}
```

- 1, 2, 3 are field numbers used to identify fields in the binary format.
- When gRPC sends data, it does NOT send field names like `id` or `name`; it uses field numbers.

## Protobuf vs gRPC

- **Protobuf** = Data format
- **gRPC** = Communication system
