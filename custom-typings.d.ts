declare module "socket.io-client" {
  interface ManagerOptions {
    // Khai báo các thuộc tính trong ManagerOptions
  }

  interface SocketOptions {
    // Khai báo các thuộc tính trong SocketOptions
  }

  interface Socket {
    // Khai báo các phương thức và thuộc tính trong Socket
  }

  function connect(
    uri: string,
    opts?: Partial<ManagerOptions & SocketOptions>
  ): Socket;
}
