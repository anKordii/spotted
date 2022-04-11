import React from "react";
import { io } from "socket.io-client";
import style from './styles/main.module.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
const socket = io("https://charlie.4uss.cyou");

socket.on("connect", () => {
  console.log(socket.disconnected); // false
});
function sendJSONtoBase(e){
  e.preventDefault();
  var yeye = document.getElementById('message').value;
  var designPost = document.getElementById('scheme').value;

  if(yeye.length < 5 || yeye.length > 280){
    NotificationManager.error('Wiadomość jest nieodpowiedniej długości.');
  }else{
    NotificationManager.warning('SYSTEM: Wysłano prośbę.');
    socket.emit("megasecurite", yeye, designPost, (response) => {
      NotificationManager.info(response);
      
      document.getElementById('message').value = '';
    });
  }

}

function Projects() {
  return (
      <section>
        <div className="container mt-5 p-5 bb__panel">
            <div className="row justify-content-center">
              <div className={`${'col-md-6 p-5 mb-5'} ${style.spotted__bg}`}>
                <div className={` ${'text-center'} ${style.spotted__header}`}>
                  <img src="https://cdn.beyondlabs.pl/spotted/logo.png" alt="logo" className="img-fluid"/>
                  <div className={`${'p-3 mb-3'} ${style.spotted__info}`}>
                    <h3>Kotleciarnia Opole</h3>
                    <p style={{marginBottom: '0'}}>
                      Jeżeli chcesz kogoś <strong style={{color: 'black'}}>pozdrowić</strong>,<br/>
                      szukasz <strong style={{color: 'black'}}>czegoś</strong>/<strong style={{color: 'black'}}>kogoś</strong>
                      <br/>albo chcesz się podzielić jakaś <strong style={{color: 'black'}}>historią</strong>?<br/>
                      <strong style={{color: 'black', fontFamily: "'Roboto Mono', monospace"}}>PISZ DO NAS</strong></p>
                  </div>
                </div>
                <form onSubmit={sendJSONtoBase}>
                  <textarea className="form-control" rows={3} placeholder="Wyślij wiadomość" id="message" required></textarea>
                  <small>Twoja wiadomość jest anonimowa 😅</small>
                  <small><br/>Maksymalnie <strong>280</strong> znaków <strong>/</strong> Minimalnie <strong>5</strong> znaków</small>
                  <div style={{float: 'right'}} className="mt-5">
                    <button className="btn__better">Wyślij</button>
                  </div>
                </form>
              </div>

              <div className={`${'col-md-4 p-5 mb-5 ms-2'} ${style.spotted__bg}`}>
              <div className={` ${'text-center'} ${style.spotted__header}`}>
                    <h4>Wybierz wygląd</h4>
                    <p>Możesz zdecydować jak będzie wyglądać twój post 😎</p>
                    <div className={`${'p-3 mb-3 justify-content-center'} ${style.spotted__design}`}>

                      <div className={`${'m-1'} ${style.spotted__select}`}>
                        <img src="https://cdn.beyondlabs.pl/spotted/schematv2.png" alt="default" className="img-fluid"></img>
                      </div>

                      <div className={`${'m-1'} ${style.spotted__select}`}>
                        <img src="https://cdn.beyondlabs.pl/spotted/schemat/dark.png" alt="dark" className="img-fluid"></img>
                      </div>

                      <div className={`${'m-1'} ${style.spotted__select}`}>
                        <img src="https://cdn.beyondlabs.pl/spotted/schemat/blue.png" alt="blue" className="img-fluid"></img>
                      </div>

                      <div className={`${'m-1'} ${style.spotted__select}`}>
                        <img src="https://cdn.beyondlabs.pl/spotted/schemat/pink.png" alt="pink" className="img-fluid"></img>
                      </div>

                      <select className="form-select mt-2" id="scheme">
                        <option value="default">Domyślny</option>
                        <option value="dark">Ciemny</option>
                        <option value="blue">Niebieski</option>
                        <option value="pink">Różowy</option>
                      </select>

                    </div>
                </div>
            </div>

            </div>
        </div>
        <NotificationContainer/>
      </section>
  );
}

export default Projects;