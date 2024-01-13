import{S as p,i as y}from"./assets/vendor-46aac873.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const g=document.querySelector(".form"),a=document.querySelector(".search-input"),l=document.querySelector(".loader"),c=document.querySelector(".gallery"),h=new p(".gallery a",{captionDelay:250,captionsData:"alt"});g.addEventListener("submit",n=>{n.preventDefault();const o=a.value.trim();o&&(l.classList.remove("hidden"),c.innerHTML="",a.value="",b(o).then(({hits:r})=>{v(r)}).catch(r=>console.log(r)).finally(()=>{l.classList.add("hidden")}))});function b(n){const o=`https://pixabay.com/api/?key=41700733-d920d8ba94f63c82daa7e2416&q=${n}&image_type=photo&orientation=horizontal&safesearch=true`;return fetch(o).then(r=>{if(!r.ok)throw new Error(`HTTP error! Status: ${r.status}`);return r.json()})}function v(n){if(n.length>0){const o=n.reduce((r,s)=>{const{webformatURL:e,largeImageURL:t,tags:i,likes:d,views:u,comments:f,downloads:m}=s;return r+`
        <li class="gallery-item">
          <a href="${t}">
            <img src="${e}" alt="${i}" " >
          </a>
          <div class="gallery-item-info">
            <div>
            <p><b>Likes</b></p>
            <p>${d}</p>
            </div>
            <div>
            <p><b>Views</b></p>
            <p>${u}</p>
            </div>
            <div>
            <p><b>Comments</b></p>
            <p>${f}</p>
            </div>
            <div>
            <p><b>Downloads</b></p>
            <p>${m}</p>
            </div>
          </div>
        </li>
      `},"");c.insertAdjacentHTML("beforeend",o),h.refresh()}else y.error({messageColor:"rgb(255, 255, 255)",backgroundColor:"red",timeout:"3000",message:"Sorry, there are no images matching your search query. Please try again.",position:"center"})}
//# sourceMappingURL=commonHelpers.js.map
