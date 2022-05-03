import { useEffect, useState } from "react";
import "../tailwind.css";
import axios from 'axios';

function Inscription() {
  return (
        <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
          <div>
            <h2 class="mt-2 text-center text-yellow-400 font-semibold text-5xl font-mono tracking-wide">CryptoTracker</h2>
          </div>
          <div class="bg-gray-100 px-8 py-8 border-4 border-pink-500 rounded-lg drop-shadow-2xl ">
          <h3 class="text-center text-gray-800">Inscription</h3>
          {FormInscription()} 
          </div>
        </div>
        </div>
    )
}

function FormInscription() {
  const [response, setResponse] = useState();

  const message_reception = async () => {
    const { data } = await axios.get(`/api/msg_inscription`)
    setResponse(data)
  }

  useEffect(() => {
    message_reception();
  }, []);

  /* message erreur pour le mail */
  const [mail, setMail] = useState("")
  const [msgMail, setMailMsg] = useState("")
  
  const handleChangeMailEntry = e => { 
    setMail(e.target.value)
    const reg_email = /\S+@\S+\.\S+/g;
    if(reg_email.test(e.target.value) != true) {
        setMailMsg("addresse email non conforme")
    } else {
      setMailMsg("ok")
    }
  }

  /* message erreur pour le mot de passe 1 */
  const [password1, setPassword1] = useState("")
  const [msgpassword1, setPassword1Msg] = useState("")

  const handleChangePassword1Entry = e => {
    setPassword1(e.target.value)  
    /* regex */
    const reg_lenght = /.{8,12}/g;
    const reg_maj = /.*[A-Z]{1,}.*/g;
    const reg_spe = /.*[$&+,:;=\\\\?@#|/'<>.^*()%!-'].*/g;

    /* vérification des reg expression */
    if(reg_lenght.test(e.target.value) != true) {
        setPassword1Msg("le mot de passe doit faire entre 8-12 caractères")
    } else {
      if(reg_maj.test(e.target.value) != true) {
        setPassword1Msg("le mot de passe doit avoir au moins une majuscule")
      }
      else {
        if(reg_spe.test(e.target.value) != true) {
          setPassword1Msg("le mot de passe doit contenir au moins un caractère spécial")
        } else {
          setPassword1Msg("ok")
        }
      }
    }
  }

  /* message erreur pour le mot de passe 1 */
  const [password2, setPassword2] = useState("")
  const [msgpassword2, setPassword2Msg] = useState("")

  const handleChangePassword2Entry = e => {
    setPassword2(e.target.value);
    if(e.target.value === password1) {
      setPassword2Msg("ok")     
    } else {
      setPassword2Msg("les mots de passes ne sont pas les mêmes") 
    }
  }

  /* affichage du message */
  function msg_color(msg) {
    if(msg === "ok") {
      return(
        <p class="text-green-400">ok </p>
      )
    } else {
      return(
        <p class="text-red-400">{msg}</p>
      )
    }
  }

  function button_activation() {
      if(msgpassword2 == "ok" && msgpassword2 == "ok" && msgMail == "ok") {
        return(
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
        </span>
        Inscription
        </button>
      )
      } else {
        return(
          <button type="submit" disabled class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
        </span>
        Inscription
        </button>
      )
      }
  }

  return (
    <form class="mt-8 space-y-6" action="/api/inscription" method="POST">
        <input type="hidden" name="remember" value="true"/>
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="text" class=""> 
            <input id="email-address" value={mail} onChange={handleChangeMailEntry} name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="adresse email"/></label>
          </div>
          {msg_color(msgMail)}
          <div class="py-2">  </div>
          <div>
            <label for="password" class="">
            <input id="password" value={password1} onChange={handleChangePassword1Entry}  name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="mot de passe"/></label>
          </div>
          {msg_color(msgpassword1)}
          <div class="py-2">  </div>
          <div>
            <label for="password" class="">
            <input id="password" value={password2} onChange={handleChangePassword2Entry} name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="confirmer le mot de passe"/></label>
          </div>
          {msg_color(msgpassword2)}
        </div>
        <p class="text-red-500">{response?.msg}</p>
        <div>
          {button_activation()}
        </div>
      </form>
    )
}
export default Inscription;