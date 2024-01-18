import{a as m,S,i as c}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();function p(r,t){const s="41700733-d920d8ba94f63c82daa7e2416";return m.defaults.baseURL="https://pixabay.com/api/",m.get("",{params:{key:s,q:r,page:t,per_page:40,image_type:"photo",orientation:"horizontal",safesearch:!0}})}function g(r){return r.map(t=>{const{webformatURL:s,largeImageURL:l,tags:e,likes:o,views:a,comments:v,downloads:C}=t;return`
        <li class="gallery-item">
          <a href="${l}">
            <img src="${s}" alt="${e}"  >
          </a>
          <div class="gallery-item-info">
            <div class="info">
            <p><b>Likes</b></p>
            <p>${o}</p>
            </div>
            <div class="info">
            <p><b>Views</b></p>
            <p>${a}</p>
            </div>
            <div class="info">
            <p><b>Comments</b></p>
            <p>${v}</p>
            </div>
            <div class="info">
            <p><b>Downloads</b></p>
            <p>${C}</p>
            </div>
          </div>
        </li>
      `}).join("")}const k=document.querySelector(".js-search-form"),h=document.querySelector(".loader"),d=document.querySelector(".js-gallery"),i=document.querySelector(".js-loadmore"),y=document.querySelector(".js-backdrop");let n=1,u="";const b=new S(".gallery a",{captionDelay:250,captionsData:"alt"});k.addEventListener("submit",q);i.addEventListener("click",w);async function q(r){if(r.preventDefault(),u=r.target.elements.search_field.value.trim(),L(),!u)return f(),d.innerHTML="",i.classList.add("is-hidden"),c.info({messageColor:"rgb(255, 255, 255)",backgroundColor:"blue",timeout:"5000",message:"Please fill out search field",position:"center"});d.innerHTML="";try{const{data:{hits:t,totalHits:s}}=await p(u,n);t.length>0?(d.innerHTML=g(t),b.refresh(),i.classList.remove("is-hidden"),n*40>=s&&(i.classList.add("is-hidden"),c.info({messageColor:"rgb(255, 255, 255)",backgroundColor:"blue",timeout:"5000",message:"We're sorry, but you've reached the end of search results.",position:"bottomCenter"}))):(i.classList.add("is-hidden"),c.error({messageColor:"rgb(255, 255, 255)",backgroundColor:"red",timeout:"5000",message:"Sorry, there are no images matching your search query. Please try again.",position:"center"}))}catch(t){console.error(t.message)}finally{f()}r.target.reset()}async function w(){n+=1,L();try{const{data:{hits:r,totalHits:t}}=await p(u,n);d.insertAdjacentHTML("beforeend",g(r)),b.refresh(),i.classList.remove("is-hidden"),n*40>=t&&(i.classList.add("is-hidden"),c.info({messageColor:"rgb(255, 255, 255)",backgroundColor:"red",timeout:"6000",message:"We're sorry, but you've reached the end of search results.",position:"bottomCenter"}))}catch(r){console.error(r.message)}finally{f()}}function L(){h.classList.remove("hidden"),y.classList.remove("is-hidden")}function f(){h.classList.add("hidden"),y.classList.add("is-hidden")}
//# sourceMappingURL=commonHelpers.js.map
