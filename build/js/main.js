!function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e){function n(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}window.onload=function(){new o(document.querySelector('[dada-path-popup="popup-1"]')),new o(document.querySelector('[dada-path-popup="popup-2"]'))};var o=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.popup=e,this.clickBtn,this.scrollHeight=0,this.check=!1,this.interactiveCSS="a[href]:not([tabindex='-1']), area[href]:not([tabindex='-1']), input:not([disabled]):not([tabindex='-1']), select:not([disabled]):not([tabindex='-1']), textarea:not([disabled]):not([tabindex='-1']), button:not([disabled]):not([tabindex='-1']), iframe:not([tabindex='-1']), [tabindex]:not([tabindex='-1']), [contentEditable=true]:not([tabindex='-1'])",this.initPopup()}var e,o,i;return e=t,(o=[{key:"initPopup",value:function(){for(var t=this.popup.querySelectorAll(this.interactiveCSS),e=0;e<t.length;e++)t[e].getAttribute("tabindex")&&t[e].setAttribute("data-tabindex",t[e].getAttribute("tabindex")),t[e].setAttribute("tabindex",-1),t[e].setAttribute("data-popup",!0);for(var n=document.querySelectorAll('[dada-target-popup="'.concat(this.popup.getAttribute("dada-path-popup"),'"]')),o=0;o<n.length;o++)n[o].addEventListener("click",this.isOpen.bind(null,this,n[o]))}},{key:"isOpen",value:function(t,e){t.check=!0,t.clickBtn=e||!1,t.popup.setAttribute("tabindex",0),t.popup.classList.add("bolt-popup--visible");for(var n=document.querySelectorAll(t.interactiveCSS),o=0;o<n.length;o++)n[o].getAttribute("data-popup")||(n[o].getAttribute("tabindex")&&n[o].setAttribute("data-tabindex",n[o].getAttribute("tabindex")),n[o].setAttribute("tabindex",-1));for(var i=t.popup.querySelectorAll('[tabindex="-1"]'),r=0;r<i.length;r++)i[r].getAttribute("data-tabindex")?i[r].setAttribute("tabindex",i[r].getAttribute("data-tabindex")):i[r].removeAttribute("tabindex");t.scrollHeight=window.scrollY||window.pageYOffset,document.body.style.top="-".concat(t.scrollHeight,"px"),document.body.style.paddingRight=window.innerWidth-document.body.offsetWidth+"px",setTimeout((function(){document.body.style.position="fixed"}),0),t.popup.focus(),document.addEventListener("keydown",t.monitorKeyboard.bind(null,t),!1),document.addEventListener("click",t.monitorClick.bind(null,t),!1)}},{key:"monitorKeyboard",value:function(t,e){27==e.keyCode&&t.check&&t.isClose(t)}},{key:"monitorClick",value:function(t,e){t.check&&(e.target==t.popup.querySelector(".bolt-popup__close")||e.target==t.popup&&e.target!=t.popup.querySelector(".bolt-popup__container"))&&t.isClose(t)}},{key:"isClose",value:function(t){t.check=!1,t.popup.removeAttribute("tabindex"),t.popup.classList.remove("bolt-popup--visible");for(var e=document.querySelectorAll('[tabindex="-1"]'),n=0;n<e.length;n++)e[n].getAttribute("data-tabindex")&&!e[n].getAttribute("data-popup")?e[n].setAttribute("tabindex",e[n].getAttribute("data-tabindex")):e[n].getAttribute("data-popup")||e[n].removeAttribute("tabindex");for(var o=this.popup.querySelectorAll("[data-popup]"),i=0;i<o.length;i++)o[i].setAttribute("tabindex",-1);document.body.style.position="",window.scrollTo(0,t.scrollHeight),document.body.style.paddingRight="",document.body.style.top="",t.clickBtn&&t.clickBtn.focus()}}])&&n(e.prototype,o),i&&n(e,i),t}()}]);