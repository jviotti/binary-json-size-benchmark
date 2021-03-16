% Bond-over-gRPC

# About #

Bond-over-gRPC provides code generation from Bond IDL service definitions
to send Bond objects via [gRPC](http://www.grpc.io/).

# Features #

## Defining Services ##

The Bond IDL has been extended to support the definition of
[services](compiler.html#service-definition) and
[generic services](compiler.html#generic-service). These definitions are
used by the Bond compiler to generate classes that provide:

* a service base that can be used as the basis for implementing services'
  methods
* a proxy stub that can be used by clients to invoke those methods

To generate these classes, pass the `--grpc` flag to `gbc` (the Bond compiler
tool).

Note that gRPC doesn't provide a messaging pattern that matches
the semantics of methods with a return type of `nothing`; to compensate,
`gbc` provides generated wrappers to simulate the appropriate semantics.

Also note that Bond-over-gRPC only provides interfaces for gRPC's streaming
in C#; this functionality will be added to C++ in the coming months.

# Implementations #

Bond-over-gRPC is available for C# and C++.

## Bond-over-gRPC for C# ##

Given a service definition like the following:

```
service Example
{
    ExampleResponse ExampleMethod(ExampleRequest);
}
```

`gbc` will generate C# classes for gRPC with the `--grpc` flag:

```
gbc c# --grpc example.bond
```

The key generated C# classes for gRPC are:

* A simple class with the name of the service (e.g.: `Example`). This class
  provides some basic encapsulation of the server-side service base, the
  client-side proxy stub, and some static methods and data members for
  initialization.
* The service base, which is named with the name of the service plus the suffix
  `Base` (e.g.: `Example.ExampleBase`). This class has abstract methods
  for each of the methods defined in the service IDL, serving as a base for the
  concrete implementation which will provide the actual server-side business
  logic.
* The proxy stub, which is named with the name of the service plus the suffix
  `Client' (e.g.: `Example.ExampleClient`). This is used to invoke the service
  from the client side.

To build the service functionality, simply write a concrete service
implementation by subclassing the server base and supplying the business logic:

```csharp
public class ExampleServiceImpl : Example.ExampleBase
{
    public override async Task<IMessage<ExampleResponse>> ExampleMethod(IMessage<ExampleRequest> param, ServerCallContext context)
    {
        ExampleRequest request = param.Payload.Deserialize();
        var response = new ExampleResponse();

        // Service business logic goes here

        return Message.From(response);
    }
}
```

This service implementation is hooked up to a gRPC server as follows:

```csharp
var server = new Grpc.Core.Server
{
    Services = { Example.BindService(new ExampleServiceImpl()) },
    Ports = { new Grpc.Core.ServerPort(ExampleHost, ExamplePort, Grpc.Core.ServerCredentials.Insecure) }
};
server.Start();
```

At this point the server is ready to receive requests and route them to the
service implementation.

On the client side, the proxy stub establishes a connection to the server like this:

```csharp
var channel = new Grpc.Core.Channel(ExampleHost, ExamplePort, Grpc.Core.ChannelCredentials.Insecure);
var client = new Example.ExampleClient(channel);
```

The proxy stub can then be used to make calls to the server as follows:

```csharp
var request = new ExampleRequest();
// Fill in request fields here

IMessage<ExampleResponse> responseMessage = await client.Method(request);

ExampleResponse response = responseMessage.Payload.Deserialize().Payload;
// Examine response here
```

Note that the signatures generated by `gbc` are slightly different from the
ones in the gRPC documentation: on the service side, the request is wrapped
in `IMessage<T>` and on the client side, the response is wrapped in
`IMessage<T>`; this allows for better control over the time of
deserialization and also helps prevent slicing when using polymorphic Bond
types. Note also that Bond-over-gRPC does not provide synchronous APIs in C#
by design.

For more information about gRPC in C#, take a look at the
[gRPC C# tutorial](http://www.grpc.io/docs/tutorials/basic/csharp.html).

There is a [Bond-over-gRPC standalone example project](https://github.com/microsoft/bond-grpc-examples).

See also the following example:

<!-- These are in thematic order, from simplier to more advanced, not in
alphabetical order. -->

- `examples/cs/grpc/pingpong`
- `examples/cs/grpc/streaming`
- `examples/cs/grpc/scalar`
- `examples/cs/grpc/shared-types-assembly`

## Bond-over-gRPC for C++ ##

Given a service definition like the following:

```
service Example
{
    ExampleResponse ExampleMethod(ExampleRequest);
}
```

`gbc` will generate C++ classes for gRPC with the `--grpc` flag:

```
gbc c++ --grpc example.bond
```

The key generated C++ classes for gRPC are:

* A simple class with the name of the service (e.g.: `Example`). This class
  provides some basic encapsulation of the server-side service base and the
  client-side proxy stub.
* The service base, which is an inner class named `Service` (e.g.:
  `Example::Service`). This class has abstract methods
  for each of the methods defined in the service IDL, serving as a base for the
  concrete implementation which will provide the actual server-side business
  logic.
* The proxy stub, which is an inner class named `Client` (e.g.:
  `Example::Client`). This is used to invoke the service from the
  client side.

To build the service functionality, simply write a concrete service
implementation by subclassing the server base and supplying the business logic:

```cpp
class ExampleServiceImpl final : public Example::Service
{
public:
    using Example::Service::Service;

private:
    void ExampleMethod(
        bond::ext::grpc::unary_call<ExampleRequest, ExampleResponse> call) override
    {
        ExampleRequest request = call.request().Deserialize();
        ExampleResponse response;

        // Service business logic goes here

        call.Finish(response);
    }
}
```

This service implementation is hooked up to a gRPC server as follows:

```cpp
bond::ext::grpc::thread_pool threadPool;
const std::string server_address{ Host + ":" + Port };

std::unique_ptr<ExampleServiceImpl> service{ new ExampleServiceImpl{ threadPool } };

grpc::ServerBuilder builder;
builder.AddListeningPort(server_address, grpc::InsecureServerCredentials());

auto server = bond::ext::grpc::server::Start(builder, std::move(service));
```

At this point the server is ready to receive requests and route them to the
service implementation.

On the client side, the proxy stub establishes a connection to the server like this:

```cpp
auto ioManager = std::make_shared<bond::ext::grpc::io_manager>();
bond::ext::grpc::thread_pool threadPool;
const std::string server_address{ Host + ":" + Port };

Example::Client client{
    grpc::CreateChannel(server_address, grpc::InsecureChannelCredentials()),
    ioManager,
    threadPool };
```

The proxy stub can then be used to make calls to the server as follows:

```cpp
ExampleRequest request;
// Fill in request fields here

// Blocking version using std::future
try
{
    ExampleResponse response = client.AsyncExampleMethod(request)
        .get().response().Deserialize();
    // Examine response here
}
catch (const bond::ext::grpc::UnaryCallException& e)
{
    // Examine e.status()
}

// Async version with a callback
client.AsyncExampleMethod(
    request,
    [](bond::ext::grpc::unary_call_result<ExampleResponse> result)
    {
        if (result.status().ok())
        {
            ExampleResponse response = result.response().Deserialize();
            // Examine response here
        }
        else
        {
            // Examine result.status()
        }
    });
```

Note these APIs are significantly different from the APIs presented in the
gRPC documentation; Bond-over-gRPC is attempting to provide a more
straightforward API for asynchronous communication than gRPC currently
presents in C++. Bond-over-gRPC does not provide synchronous APIs in C++ by
design.

The proxy stub has a number of overloads for each method. The simplest is
demonstrated above, and there are ones that take `bonded<T>` and
`grpc::ClientContext` arguments.

Using `bonded<T>` to wrap the request and response objects allows for better
control over the time of deserialization and also helps prevent slicing when
using polymorphic Bond types. As demonstrated above, convenience APIs are
provided in some places to hide the use `bonded<T>` where possible. For use
of `bonded` request objects and `ClientContext` arguments, see the pingpong
example.

For more information about gRPC in C++, take a look at the
[gRPC C++ tutorial](http://www.grpc.io/docs/tutorials/basic/c.html);
however, keep in mind that the Bond-over-gRPC APIs diverge significantly
from those documented there.

See also the following example:

- `examples/cpp/grpc/helloworld`
- `examples/cpp/grpc/pingpong`