// ==UserScript==
// @name         pxls.space pr0 template
// @namespace    pr0
// @updateURL    https://raw.githubusercontent.com/hammer065/pxls-template/master/pxls-template.user.js
// @homepageURL  https://github.com/hammer065/pxls-template
// @version      0.3.6
// @description  Es ist Zeit für Reich
// @author       Endrik, schrej and >_hammer065
// @match        http://pxls.space/*
// @match        https://pxls.space/*
// @grant        none
// ==/UserScript==

/* Originally created by Endrik on 04-Apr-17. */
/* Modified by schrej */
/* Also modified by hammer065 */

(function () {
  'use strict';

  const baseURL = "https://rawgit.com/hammer065/pxls-template/master/";
  const baseStaticURL = "https://cdn.rawgit.com/hammer065/pxls-template/master/";

  function toHtml(str) {
    var htmlObject = document.createElement('div');
    htmlObject.innerHTML = str;
    return htmlObject.firstChild;
  }

  const query = window.location.search.substring(1).split('&');
  var params = {};
  for(var i = 0; i<query.length; i++) {
    var pair = query[i].split('=');
    params[decodeURIComponent(pair[0])] = (typeof pair[1] !== "undefined")?decodeURIComponent(pair[1]):true;
  }

  const uiContainer = document.querySelector(".ui");

  const styleElement = document.createElement("link");
  styleElement.setAttribute("rel", "stylesheet");
  styleElement.setAttribute("type", "text/css");
  styleElement.setAttribute("href", baseURL+"pxls-template.css");
  document.head.appendChild(styleElement);

  const templateContainer = document.createElement("div");
  templateContainer.setAttribute("id", "tempcontainer");

  var version = "";
  if(typeof GM_info !== "undefined" && typeof GM_info.script !== "undefined" && typeof GM_info.script.version !== "undefined")
  {
    version = GM_info.script.version;
  }
  templateContainer.innerHTML = '<img src="'+baseStaticURL+'pr0gramm-logo.svg" class="pr0Logo"> Template'+(version!==""?(' <span class="version">v'+version.toString()+'</span>'):"")+'<br />';

  if(typeof params.template !== "undefined")
  {
    console.log("Template-URL \""+params.template.toString()+"\" passed");
    var img = document.createElement("img");
    img.src = params.template;
    img.id = "overlayImage";
    if(typeof params.ox === "undefined")
    {
      console.log("No ox parameter passed. Setting to 0");
      params.ox = 0;
    }
    if(typeof params.oy === "undefined")
    {
      console.log("No oy parameter passed. Setting to 0");
      params.oy = 0;
    }
    img.style.transform = "translate("+params.ox.toString()+"px,"+params.oy.toString()+"px)";
    img.style.width = (typeof params.tw !== "undefined")?(params.tw.toString()+"px"):undefined;
    try {
      img.style.imageRendering = "pixelated";
      if(!img.style.imageRendering || img.style.imageRendering == "none")
      {
        img.style.imageRendering = "-moz-crisp-edges";
      }
      if(!img.style.imageRendering || img.style.imageRendering == "none")
      {
        img.style.imageRendering = "grisp-edges";
      }
    }
    catch (e) {
    }
    
    const boardMover = document.querySelector(".board-mover");
    if (!boardMover) return;
    boardMover.appendChild(img);
    
    const checkboxContainer = document.createElement("div");
    checkboxContainer.setAttribute("class", "checkboxContainer");

    const brElement = document.createElement("br");

    const templateCheckbox = document.createElement("input");
    templateCheckbox.setAttribute("type", "checkbox");
    templateCheckbox.setAttribute("id", "templateCheckbox");
    templateCheckbox.checked = true;
    checkboxContainer.appendChild(templateCheckbox);
    const templateCheckboxLabel = document.createElement("label");
    templateCheckboxLabel.setAttribute("for", "templateCheckbox");
    templateCheckboxLabel.setAttribute("class", "checkboxLabel");
    templateCheckboxLabel.innerHTML = "&nbsp;Toggle Template [T]";
    checkboxContainer.appendChild(templateCheckboxLabel);
    checkboxContainer.appendChild(brElement);

    const flashCheckbox = document.createElement("input");
    flashCheckbox.setAttribute("type", "checkbox");
    flashCheckbox.setAttribute("id", "flashCheckbox");
    flashCheckbox.checked = false;
    checkboxContainer.appendChild(flashCheckbox);
    const flashCheckboxLabel = document.createElement("label");
    flashCheckboxLabel.setAttribute("for", "flashCheckbox");
    flashCheckboxLabel.setAttribute("class", "checkboxLabel");
    flashCheckboxLabel.innerHTML = "&nbsp;Toggle Flash [F]";
    checkboxContainer.appendChild(flashCheckboxLabel);

    templateContainer.appendChild(checkboxContainer);
    
    var sliderStatusValue = function(float){return (Math.round(float*1000)/10).toString()+"%"};

    const sliderContainer = document.createElement("div");
    sliderContainer.setAttribute("class", "sliderContainer");
    var slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.setAttribute("min", "0");
    slider.setAttribute("max", "1");
    slider.setAttribute("step", "0.01");
    slider.value = 0.5;
    sliderContainer.appendChild(slider);
    var sliderStatus = document.createElement("div");
    sliderStatus.setAttribute("class", "sliderStatus");
    sliderStatus.innerHTML = sliderStatusValue(slider.value);
    sliderContainer.appendChild(sliderStatus);
    templateContainer.appendChild(sliderContainer);

    var handleSliderEvent = function (event) {
      sliderStatus.innerHTML = sliderStatusValue(event.target.value);
      img.style.opacity = event.target.value;
    };
    
    slider.addEventListener("change", handleSliderEvent);
    slider.addEventListener("input", handleSliderEvent);
    
    var setVisibility = function (event) {
      img.style.visibility = templateCheckbox.checked?"visible":"hidden";
    };

    var flashInterval = 0, flashOldTemplate = true;
    var updateFlash = function(event) {
      if(flashCheckbox.checked)
      {
        flashOldTemplate = templateCheckbox.checked;
        flashInterval = window.setInterval(function(){if(flashCheckbox.checked){templateCheckbox.checked=!templateCheckbox.checked; setVisibility();}}, 1000/15);
      }
      else
      {
        window.clearInterval(flashInterval);
        templateCheckbox.checked = flashOldTemplate;
        setVisibility();
      }
    }
    flashCheckbox.addEventListener("change", updateFlash);

    templateCheckbox.addEventListener("change", setVisibility);
    
    document.addEventListener('keydown', function(event) {
      switch(event.keyCode)
      {
        case 84: /* T */
        templateCheckbox.checked = !templateCheckbox.checked;
        setVisibility();
        break;
        case 70: /* F */
        flashCheckbox.checked = !flashCheckbox.checked;
        updateFlash();
        break;
      }
    });
  }
  else
  {
    templateContainer.setAttribute("class", "notemplateurl");
    templateContainer.innerHTML += '<br /><div class="notification">No Template-URL passed</div>';
    console.log("No Template-URL passed");
  }

  const creditContainer = document.createElement("div");
  creditContainer.setAttribute("class", "creditContainer");
  creditContainer.innerHTML = 'by Endrik, schrej and <img src="'+baseStaticURL+'pr0gramm-logo.svg" class="pr0User">hammer065';
  templateContainer.appendChild(creditContainer);

  uiContainer.appendChild(templateContainer);

  console.log("Es ist Zeit für Reich!");
})();
