import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080"); // Thay đổi URL của server tương ứng với dự án của bạn
// Gửi một sự kiện đến server
socket.emit("message", "Hello from client");

// Nhận các sự kiện từ server
socket.on("message", (data) => {
  console.log(`Received message from server: ${data}`);
});

const Homepage = () => {
  return (
    <section>
      <Header />
      <Outlet />
      <Footer />
    </section>
  );
};

export default Homepage;
