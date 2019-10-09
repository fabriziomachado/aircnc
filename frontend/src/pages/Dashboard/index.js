import React, { useEffect, useState, useMemo } from 'react'

import moment from 'moment';
import 'moment/locale/pt-br';
import { Link } from 'react-router-dom'
import socketio from 'socket.io-client'
import api from '../../services/api'
import './styles.css'

require('dotenv').config();
console.log( process.env.REACT_APP_BASE_URL)

export default function Dashboard() {
  const [spots, setSpots] = useState([])
  const [requests, setRequests] = useState([])

  const user_id = localStorage.getItem('user')

  // memoriza o valor da variável até que ela mude
  const socket = useMemo(() => socketio( process.env.REACT_APP_BASE_URL, {
      query: { user_id }
    }
  ), [user_id]) //caso o user_id mude

  useEffect(() => {
    socket.on('booking-request', data =>
      setRequests([...requests, data])
    )
  }, [requests, socket])

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user')
      const response = await api.get('/dashboard', {
          headers: { user_id }
        })

      setSpots(response.data)
    }

    loadSpots()
  }, [])


  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`)

    setRequests(requests.filter(request => request._id !== id))
  }

  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`)

    setRequests(requests.filter(request => request._id !== id))
  }

  

  return (
    <>
      <ul className="notifications">
      {requests.map(request => (
        <li key={request._id}>
          <p>
            <strong>{request.user.email} </strong> solicitou uma reserva {moment().startOf('minute').fromNow()} em <strong> {request.spot.company}</strong> para 
            <strong> { moment(request.date).format('D [de] MMMM') }</strong> ({moment(request.date).endOf('day').fromNow()}).
          </p>

          <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
          <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
        </li>
      ))}
      </ul>

      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{backgroundImage: `url('${spot.thumbnail_url}')`}} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/day`: `GRATUITO`}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Novo Spot</button>
      </Link>
    </>
  )
}
