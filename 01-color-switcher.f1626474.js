function t(){return`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}const n={btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]")};let e=null;n.btnStart.addEventListener("click",(function(){n.btnStop.disabled="",n.btnStart.disabled="disabled",document.body.style.backgroundColor=t(),e=setInterval((()=>{document.body.style.backgroundColor=t()}),1e3)})),n.btnStop.addEventListener("click",(function(){n.btnStart.disabled="",clearInterval(e)}));
//# sourceMappingURL=01-color-switcher.f1626474.js.map
