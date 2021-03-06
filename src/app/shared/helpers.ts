import {Auth} from './auth';

export class Helpers {

  constructor() {
  }

  formatDate(date) {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  validateConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  }


  getMinuteDifferenceBetweenTwoDates(date1: Date, date2: Date) {
    const diffMs = (date2.getTime() - date1.getTime()); // milliseconds between
    const diffDays = Math.floor(diffMs / 86400000); // days
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    return diffMins;
  }

  validateActionUser(action) {
    let hasPermssion = false;

    // Obtiene las acciones que tenga el usuario logueado
    const actions = Auth.getActions();
    for (const value of actions) {
      if (action === value) {
        hasPermssion = true;
        break;
      }
    }

    return hasPermssion;
  }

  popupCenter({url, title, w, h}) {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(url, title,
      `
      scrollbars=yes,
      width=${w / systemZoom},
      height=${h / systemZoom},
      top=${top},
      left=${left}
      `
    )

    if (window.focus) newWindow.focus();

    return newWindow;
  }

}
