import React from "react";
import { io } from "socket.io-client";
import style from './styles/main.module.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const socket = io("https//charlie.4uss.cyou");

socket.on("connect", () => {
  console.log(socket.disconnected); // false
});
function sendJSONtoBase(e){
  e.preventDefault();
  var yeye = document.getElementById('message').value;

  var regex = /nigger|nugger|pedał/gi;

  if(yeye.length < 5 || yeye.length > 280){
    NotificationManager.error('Wiadomość jest nieodpowiedniej długości.');
  }else{
    NotificationManager.success('Wysłano wiadomość.');

    var makepretie = yeye.toString().replace(regex,"*******")

    socket.emit("megasecurite", makepretie, (response) => {
      console.log(response); // "got it"
    });

    setTimeout(() => {
      window.location.reload(false);
    }, 1500);
  }

}

function Projects() {
  return (
      <section>
        <div className="container mt-5 p-5 bb__panel">
            <div className="row justify-content-center">

              <div className={`${'col-md-6 p-5 mb-5'} ${style.spotted__bg}`}>
                <div className={` ${'text-center'} ${style.spotted__header}`}>
                  <img src="http://www.zsz4.opole.pl/templates/jsn_metro_pro/images/colors/white/logo.png" alt="avatar" className="img-fluid"/>
                  <div className={`${'p-3 mb-3'} ${style.spotted__info}`}>
                    <h3>Kotleciarnia Opole</h3>
                    <p style={{marginBottom: '0'}}>
                      <strong style={{color: 'black'}}>Szukasz czegoś</strong>/<strong style={{color: 'black'}}>kogoś</strong>
                      <br/>albo chcesz się podzielić jakaś historią?<br/>
                      <strong style={{color: 'black'}}>pisz do nas 💬</strong></p>
                  </div>
                </div>
                <form onSubmit={sendJSONtoBase}>
                  <textarea className="form-control" rows={3} placeholder="Wyślij wiadomość" id="message" required></textarea>
                  <small>Twoja wiadomość jest anonimowa 😅</small>
                  <code><br/>Maksymalnie 280 znaków</code>
                  <div style={{float: 'right'}} className="mt-5">
                    <button className="btn__better">Wyślij</button>
                  </div>
                </form>
              </div>

            </div>
        </div>
        <NotificationContainer/>
      </section>
  );
}

export default Projects;