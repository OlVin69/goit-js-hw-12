import{S as v,i as c,a as m}from"./assets/vendor-89feecc5.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const C=document.querySelector(".js-search-form"),f=document.querySelector(".loader"),d=document.querySelector(".js-gallery"),l=document.querySelector(".js-loadmore");let n=1,S="";const p=new v(".gallery a",{captionDelay:250,captionsData:"alt"});C.addEventListener("submit",q);l.addEventListener("click",w);async function q(r){r.preventDefault();const o=r.target.elements.search_field.value.trim();if(h(),!o)return u(),d.innerHTML="",c.info({messageColor:"rgb(255, 255, 255)",backgroundColor:"blue",timeout:"5000",message:"Please fill out search field",position:"center"});d.innerHTML="";try{const{data:{hits:s,totalHits:i}}=await g(o,n);s.length>0?(d.innerHTML=y(s),p.refresh(),l.classList.remove("is-hidden"),n*40>=i&&(l.classList.add("is-hidden"),c.info({messageColor:"rgb(255, 255, 255)",backgroundColor:"blue",timeout:"6000",message:"We're sorry, but you've reached the end of search results.",position:"bottomCenter"}))):c.error({messageColor:"rgb(255, 255, 255)",backgroundColor:"red",timeout:"3000",message:"Sorry, there are no images matching your search query. Please try again.",position:"center"})}catch(s){console.error(s.message)}finally{u()}r.target.reset()}function g(r,o){const s="41700733-d920d8ba94f63c82daa7e2416";return m.defaults.baseURL="https://pixabay.com/api/",m.get("",{params:{key:s,q:r,page:o,per_page:40,image_type:"photo",orientation:"horizontal",safesearch:!0}})}function y(r){return r.map(o=>{const{webformatURL:s,largeImageURL:i,tags:e,likes:t,views:a,comments:b,downloads:L}=o;return`
        <li class="gallery-item">
          <a href="${i}">
            <img src="${s}" alt="${e}" " >
          </a>
          <div class="gallery-item-info">
            <div>
            <p><b>Likes</b></p>
            <p>${t}</p>
            </div>
            <div>
            <p><b>Views</b></p>
            <p>${a}</p>
            </div>
            <div>
            <p><b>Comments</b></p>
            <p>${b}</p>
            </div>
            <div>
            <p><b>Downloads</b></p>
            <p>${L}</p>
            </div>
          </div>
        </li>
      `}).join("")}async function w(){n+=1,h();try{const{data:{hits:r,totalHits:o}}=await g(S,n);d.insertAdjacentHTML("beforeend",y(r)),p.refresh(),l.classList.remove("is-hidden"),n*40>=o&&(l.classList.add("is-hidden"),c.info({messageColor:"rgb(255, 255, 255)",backgroundColor:"blue",timeout:"6000",message:"We're sorry, but you've reached the end of search results.",position:"bottomCenter"}))}catch(r){console.error(r.message)}finally{u()}}function h(){f.classList.remove("hidden")}function u(){f.classList.add("hidden")}
//# sourceMappingURL=commonHelpers.js.map
