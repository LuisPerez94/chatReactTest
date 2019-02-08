import React, { Component } from 'react';
import io from 'socket.io-client';
import LoginForm from './LoginForm';
import ChatContainer  from './chats/ChatContainer';
import { USER_CONNECTED, LOGOUT } from './../Events';

const socketUrl = "http://192.168.234.1:3231";

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            user: null,
        };
    }

    componentWillMount = () => {
        this.initSocket();
    };
    /**
     * Conecta e inicializa el socket
     */
    initSocket = () => {
        const socket = io(socketUrl);
        socket.on('connect', () => {
            console.log('Conectado');
        });
        this.setState({socket});
    };

    setUser = (user) => {
        const {socket} = this.state;
        socket.emit(USER_CONNECTED, user);
        this.setState({user});
    };

    logout = () => {
        const { socket } = this.state;
        socket.emit(LOGOUT);
        this.setState({user: null});
    };

    render() {
        // const {title} = this.props;
        const {socket, user} = this.state;
        return (
            <div className="container">
                {
                    !user ?
                    <LoginForm socket={socket} setUser={this.setUser} />
                    :
                    <ChatContainer socket={socket} user={user} logout={this.logout} />
                }
            </div>
        );
    }
}

export default Layout;