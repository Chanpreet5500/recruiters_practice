import axios from 'axios';
import moment from 'moment';
import PapaParse from 'papaparse';

import { Text } from '../../context/provider';
import enData from '../../locales/en.json'
import esData from '../../locales/es.json'

export const apiDateFormat = date => {
  return moment(date).format("DD/MM/YYYY");
};

export function isLoggedIn() {
  return localStorage.getItem('isLoggedIn');
}

export function handleInvalidToken() {
  //clearToken();
  clearUserData();
  window.location.href = "/login";
}

export function clearUserData() {
  localStorage.removeItem('userData');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('loggedInUser');
  localStorage.removeItem('api_token');
  localStorage.removeItem('leftSection');
  localStorage.removeItem('session');
}

export function getUser() {
  return localStorage.getItem('userData');
}

export function setToken(access_token) {

}

export function getToken() {
  let token = localStorage.getItem('api_token')
  if (token) {
    return token;
  }
  return false;
}
export function logoutCompletely() {
  clearUserData()
}

export const createHtmlMarkup = content => {
  return { __html: content };
};

export const csvFileToArray = (file, delimiter = ',', omitFirstRow = false) => {
  return new Promise(async function (resolve, reject) {
    var reader = new FileReader();
    reader.readAsText(file);
    try {
      reader.onload = function (e) {
        const data = reader.result;
        if (data) {
          let tmpData = PapaParse.parse(data); //using other way to parse as this won't break if column value contains comma
          let csv = tmpData.data.filter(x => x.filter(Boolean).length > 0);

          /*Commented previous way to parse file by gaurav.*/
          /*var csv = data
            .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
            .split('\n')
            .filter(function(obj) {
              return obj.trim().length > 0;
            })
            .map(v => v.split(delimiter));*/
          resolve(omitFirstRow ? csv.slice(1, csv.length) : csv.slice(0, csv.length));
        }
      };
    } catch (error) {
      reject(error);
    }
  });
};

export const changingLanguageText = (tidName) => {
  const activeLang = localStorage.getItem('rcml-lang')
  console.log(activeLang);
  const languageText = activeLang == 'es' ? esData : enData
  return languageText[tidName];
}