import React , { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import socketio from 'socket.io-client'; 

import './styles.css';

export default function DashBoard(){

    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);


    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id},
    }) , [ user_id]); 

    useEffect(() => {

        socket.on('booking_request' , data => {
            setRequests([... requests, data]);
        })

    }, [requests, socket]); 

    useEffect(() => {
        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard' , {
                headers : { user_id  }

            });
            setSpots(response.data);
        }

        loadSpots();
    }, []);
    
    async function handdleAccept(id){
        await  api.post(`./bookings/${id}/approvals`)

        setRequests(requests.filter(request => request._id !== id));
    }
    async function handdleReject(id){
        await  api.post(`./bookings/${id}/rejection`)

        setRequests(requests.filter(request => request._id !== id));
        
    }


    return (
        <>
            <ul className="notifications">
                {requests.map( request => (
                    <li key = {request._id}>
                        <p>
                            <strong>{request.user.email}</strong> esta solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.spot.date}</strong>
                        </p>
                        <button className="accept" onClick = {() => handdleAccept(request._id)} >ACEITAR</button>
                        <button className="reject" onClick = {() => handdleReject(request._id)} >RECUSAR</button> 
                    </li>
                ))}
            </ul>
            <ul className = "spot-list">
                {spots.map( spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />

                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : `GRATUITO`}</span>
                    </li>
                ))}
            </ul>


            <Link to = "/new">
                <button className="btnSub">Cadastrar novo Spot</button>
            </Link>
        </>
    )
}