import SmartSearch from '../Stocks/SmartsSearch';
import io from "socket.io-client"
const Stocks = () => {
    const socket = io();//'http://localhost:80'
    alert("io");

    socket.on('chat message', function (data) {
        console.log("Rendering message : ",data);
        socket.emit('chat message', "Hello brother");

    });
    return (
        <>
            <h3>Stocks</h3>
            {SmartSearch()}
        </>
    );
}

export default Stocks;