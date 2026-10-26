(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`<svg viewBox="0 0 768 962" width="768" height="962" role="img" aria-labelledby="pitch-title" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">\r
      <title id="pitch-title">Football pitch</title>\r
      <defs>\r
        <pattern id="grass-stripes" x="24" y="30" width="720" height="150.333333" patternUnits="userSpaceOnUse">\r
          <rect width="720" height="150.333333" fill="var(--grass-dark)" />\r
          <rect width="720" height="75.166667" fill="var(--grass-light)" />\r
        </pattern>\r
      </defs>\r
\r
      <rect x="24" y="30" width="720" height="902" fill="url(#grass-stripes)" />\r
\r
      <g fill="none" stroke="var(--pitch-lines)" stroke-width="4" stroke-linejoin="round">\r
        <rect x="24" y="30" width="720" height="902" />\r
        <path d="M24 481H744" />\r
        <circle cx="384" cy="481" r="88" />\r
\r
        <path d="M190 30V188H578V30 M296 30V82H472V30" />\r
        <path d="M314 188A88 88 0 0 0 454 188" />\r
\r
        <path d="M190 932V774H578V932 M296 932V880H472V932" />\r
        <path d="M314 774A88 88 0 0 1 454 774" />\r
\r
        <path d="M38 30A14 14 0 0 1 24 44 M730 30A14 14 0 0 0 744 44" />\r
        <path d="M24 918A14 14 0 0 1 38 932 M730 932A14 14 0 0 1 744 918" />\r
      </g>\r
\r
      <g fill="var(--pitch-lines)">\r
        <circle cx="384" cy="135" r="5" />\r
        <circle cx="384" cy="481" r="5" />\r
        <circle cx="384" cy="827" r="5" />\r
      </g>\r
    </svg>`,t=(e,t)=>({number:e,name:t,id:t+e}),n=[t(1,`Oliver`),t(2,`Freya`),t(3,`Arthur`),t(4,`Grace`),t(5,`Leo`),t(6,`Poppy`),t(7,`Ethan`),t(8,`Ruby`),t(9,`Theo`),t(10,`Evie`),t(11,`Alfie`),t(12,`Ivy`),t(13,`Noah`),t(14,`Maya`),t(15,`Finn`)],r=new Map(n.map(e=>[e.id,e]));function i(e,t,n){return Math.min(Math.max(e,t),n)}function a(e){let t=r.get(e);if(!t)return null;let n=document.createElement(`div`);n.classList.add(`player`),n.innerHTML=`
  <span class="player-avatar">${t.number}</span>
  <span class="player-name-field">
    <span class="player-name"></span>
    <button class="player-change" aria-label="Change player name" type="button">🔄</button>
  </span>
  `;let i=n.querySelector(`.player-name`);return i.textContent=t.name,n}function o(e,t){let n=a(e.playerId);return n?(n.style.left=`${e.x}%`,n.style.top=`${e.y}%`,n.addEventListener(`pointerdown`,e=>{e.target instanceof Element&&e.target.closest(`.player-change, .player-picker`)||n.setPointerCapture(e.pointerId)}),n.addEventListener(`pointermove`,e=>{if(!n.hasPointerCapture(e.pointerId))return;let r=t.getBoundingClientRect(),a=n.getBoundingClientRect(),o=e.clientX-r.left,s=e.clientY-r.top,c=i(o,.5*a.width,r.width-.5*a.width),l=i(s,.5*a.height,r.height-.5*a.height);n.style.left=`${c}px`,n.style.top=`${l}px`}),n.querySelector(`.player-change`).addEventListener(`click`,()=>{let i=document.createElement(`select`);i.classList.add(`player-picker`),r.forEach(t=>{let n=document.createElement(`option`);n.value=t.id,n.textContent=t.name,t.id===e.playerId&&(n.selected=!0),i.appendChild(n)}),n.querySelector(`.player-name-field`).replaceWith(i),i.focus(),i.showPicker(),i.addEventListener(`change`,()=>i.blur()),i.addEventListener(`blur`,()=>{let a=i.value,s=r.get(a);if(!s)return;e.playerId=s.id;let c=o(e,t);c&&(c.style.left=n.style.left,c.style.top=n.style.top,n.replaceWith(c))})}),n):null}function s(e){if(e.length===0)return null;let t=document.createElement(`section`);return t.classList.add(`bench`),e.forEach(e=>{let n=a(e);n&&t.appendChild(n)}),t}var c=[{playerId:n[0].id,x:50,y:91},{playerId:n[1].id,x:17,y:75},{playerId:n[2].id,x:39,y:75},{playerId:n[3].id,x:61,y:75},{playerId:n[4].id,x:83,y:75},{playerId:n[5].id,x:27,y:50},{playerId:n[6].id,x:50,y:50},{playerId:n[7].id,x:73,y:50},{playerId:n[8].id,x:27,y:20},{playerId:n[9].id,x:50,y:20},{playerId:n[10].id,x:73,y:20}],l=[n[11].id,n[12].id];document.querySelector(`#app`).innerHTML=`
  <main class="lineup">
    <div class="pitch">
      ${e}
    </div>
  </main>
`;var u=document.querySelector(`.pitch`);c.forEach(e=>{let t=o(e,u);t&&u.appendChild(t)});var d=s(l);d&&document.querySelector(`.lineup`).appendChild(d);