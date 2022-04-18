import React from 'react';
import ReactDOM from 'react-dom';
import "../styles/tailwind.css"

function Connexion() {
  return (
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-2 text-center text-yellow-400 font-semibold text-5xl font-mono tracking-wide">CryptoTracker</h2>
        </div>
        <div class="bg-gray-100 px-8 py-8 border-4 border-pink-500 rounded-lg drop-shadow-2xl ">
          <h3 class="text-center">Connexion</h3>
          {FormConnexion()}
        </div>
      </div >
    </div >
  )
}
function FormConnexion() {
  return (
    <form class="mt-8 space-y-6" action="/api/test" method="POST">
      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="adresse email" />
        </div>
        <div class="py-2"></div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="mot de passe" />
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
        </div>
        <div class="text-sm">
          <a href="#" class="font-medium text-blue-600 hover:text-blue-500"> Forgot your password? </a>
        </div>
      </div>
      <div>
        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          </span>
          Connexion
        </button>
      </div>
    </form>
  )
}


export default Connexion
