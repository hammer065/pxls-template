// ==UserScript==
// @name         pxls.space pr0 template
// @namespace    pr0
// @updateURL    https://raw.githubusercontent.com/hammer065/pxls-template/master/pxls-template.user.js
// @downloadURL    https://raw.githubusercontent.com/hammer065/pxls-template/master/pxls-template.user.js
// @homepageURL  https://github.com/hammer065/pxls-template
// @version      0.4.7
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
  const storagePrefix = "pxls-template.";

  var getString = function(string, args, language) {
    var output = "";
    const l18n = {
      "de":{
        "title-name":('<img src="'+baseStaticURL+'pr0gramm-logo.svg" class="pr0Logo"> Template'),
        "no-url":"Keine Template-URL angegeben!",
        "url-passed":"Template-URL \"%0\" angegeben",
        "no-ox":"Kein ox Parameter angegeben. Setze auf 0",
        "no-oy":"Kein oy Parameter angegeben. Setze auf 0",
        "template-label":"Template anzeigen [T]",
        "flash-label":"Template flashen lassen [F]",
        "credits":('von Endrik, schrej und <img src="'+baseStaticURL+'pr0gramm-logo.svg" class="pr0User">hammer065'),
        "time-for-reich":"Es ist Zeit für Reich!",
        "invalid-storage-key":"Ungültiger Storagename!",
        "prompt-x-coord":"Bitte gib die X-Koordinate ein, zu der du springen willst:",
        "prompt-y-coord":"Bitte gib die Y-Koordinate ein, zu der du springen willst:",
        "jump-to-coordinates":"Springe zu Koordinaten [J]"
      },
      "en":{
        "title-name":('<img src="'+baseStaticURL+'pr0gramm-logo.svg" class="pr0Logo"> Template'),
        "no-url":"No Template-URL passed!",
        "url-passed":"Template-URL \"%0\" passed",
        "no-ox":"No ox parameter passed. Setting to 0",
        "no-oy":"No oy parameter passed. Setting to 0",
        "template-label":"Show Template [T]",
        "flash-label":"Flash Template [F]",
        "credits":('by Endrik, schrej and <img src="'+baseStaticURL+'pr0gramm-logo.svg" class="pr0User">hammer065'),
        "time-for-reich":"It's time for Reich!",
        "invalid-storage-key":"Invalid storage key!",
        "prompt-x-coord":"Please enter the X-coordinate you want to jump to:",
        "prompt-y-coord":"Please enter the Y-coordinate you want to jump to:",
        "jump-to-coordinates":"Jump to Coordinates [J]"
      }
    }
    if(typeof string !== "string")
    {
      console.error("No valid l18n string passed!");
      return;
    }
    if(typeof args === "undefined")
    {
      args = [];
    }
    else
    {
      if(typeof args !== "object")
      {
        args = [args];
      }
    }
    if(typeof language !== "string")
    {
      if(typeof window.navigator !== "undefined" && typeof navigator.language === "string")
      {
        language = navigator.language.split("-")[0];
      }
      else
      {
        language = "en";
      }
    }
    if(typeof l18n[language] === "undefined")
    {
      console.warn("Unknown language \""+language.toString()+"\"! Setting to \"en\"");
      language = "en";
    }
    if(typeof l18n[language][string] !== "undefined")
    {
      output = l18n[language][string];
      for(var i=0; i<args.length; i++)
      {
        output = output.replace(("%"+i.toString()), args[i]);
      }
      return output;
    }
    else
    {
      return string.toString().toUpperCase();
    }
  }, getStorage = function(key, fallback) {
    if(typeof key !== "string")
    {
      console.warn(getString("invalid-storage-key"));
      return;
    }
    if(typeof window.localStorage !== "undefined" && typeof localStorage[(storagePrefix+key.toString())] !== "undefined")
    {
      return localStorage[(storagePrefix+key.toString())];
    }
    else
    {
      console.log(getString("no-localstorage"));
      if(typeof fallback !== "undefined")
      {
        return fallback;
      }
      else
      {
        return;
      }
    }
  }, setStorage = function(key, value) {
    if(typeof key !== "string")
    {
      console.warn(getString("invalid-storage-key"));
      return;
    }
    if(typeof window.localStorage !== "undefined")
    {
      if(typeof value === "undefined")
      {
        localStorage.removeItem(storagePrefix+key.toString());
        return;
      }
      else
      {
        localStorage[(storagePrefix+key.toString())] = value;
        return value;
      }
    }
    else
    {
      console.warn(getString("no-localstorage"));
      return;
    }
  }, parseBool = function(bool) {
    return (bool === "true" || bool === true || bool === 1);
  }, askCoordinate = function() {
    if(typeof window.prompt === "function")
    {
      var x = window.prompt(getString("prompt-x-coord"));
      if(x !== null)
      {
        var y = window.prompt(getString("prompt-y-coord"));
        if(y !== null)
        {
          App.centerOn(x, y);
        }
      }
    }
  };

  var version = "";
  if(typeof GM_info !== "undefined" && typeof GM_info.script !== "undefined" && typeof GM_info.script.version !== "undefined")
  {
    version = GM_info.script.version;
  }

  console.log("pxls-template"+(version!==""?(" v"+version.toString()):""));

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
  templateContainer.innerHTML = getString("title-name")+(version!==""?(' <span class="version">v'+version.toString()+'</span>'):"")+'<br />';

  if(typeof params.template !== "undefined")
  {
    console.log(getString("url-passed", params.template.toString()));
    var img = document.createElement("img");
    img.src = params.template;
    img.id = "overlayImage";
    img.style.opacity = getStorage("slider", 0.5);
    if(typeof params.ox === "undefined")
    {
      console.log(getString("no-ox"));
      params.ox = 0;
    }
    if(typeof params.oy === "undefined")
    {
      console.log(getString("no-oy"));
      params.oy = 0;
    }
    img.style.top = (params.ox.toString()+"px");
    img.style.left = (params.oy.toString()+"px");
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

    const controlsContainer = document.createElement("div");
    controlsContainer.setAttribute("class", "controlsContainer");

    const templateCheckbox = document.createElement("input");
    templateCheckbox.setAttribute("type", "checkbox");
    templateCheckbox.setAttribute("id", "templateCheckbox");
    templateCheckbox.checked = parseBool(getStorage("template", true));
    controlsContainer.appendChild(templateCheckbox);
    const templateCheckboxLabel = document.createElement("label");
    templateCheckboxLabel.setAttribute("for", "templateCheckbox");
    templateCheckboxLabel.setAttribute("class", "checkboxLabel");
    templateCheckboxLabel.innerHTML = ("&nbsp;"+getString("template-label"));
    controlsContainer.appendChild(templateCheckboxLabel);

    controlsContainer.appendChild(document.createElement("br"));
    const flashCheckbox = document.createElement("input");
    flashCheckbox.setAttribute("type", "checkbox");
    flashCheckbox.setAttribute("id", "flashCheckbox");
    flashCheckbox.checked = parseBool(getStorage("flash", false));
    controlsContainer.appendChild(flashCheckbox);
    const flashCheckboxLabel = document.createElement("label");
    flashCheckboxLabel.setAttribute("for", "flashCheckbox");
    flashCheckboxLabel.setAttribute("class", "checkboxLabel");
    flashCheckboxLabel.innerHTML = ("&nbsp;"+getString("flash-label"));
    controlsContainer.appendChild(flashCheckboxLabel);

    if(typeof App === "object" && typeof App.centerOn === "function")
    {
      controlsContainer.appendChild(document.createElement("br"));
      const coordinateButton = document.createElement("input");
      coordinateButton.setAttribute("type", "button");
      coordinateButton.setAttribute("value", getString("jump-to-coordinates"));
      coordinateButton.onclick = askCoordinate;
      controlsContainer.appendChild(coordinateButton);
    }

    templateContainer.appendChild(controlsContainer);

    var sliderStatusValue = function(float){return (Math.round(float*1000)/10).toString()+"%"};

    const sliderContainer = document.createElement("div");
    sliderContainer.setAttribute("class", "sliderContainer");
    var slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.setAttribute("min", "0");
    slider.setAttribute("max", "1");
    slider.setAttribute("step", "0.01");
    slider.value = img.style.opacity;
    sliderContainer.appendChild(slider);
    var sliderStatus = document.createElement("div");
    sliderStatus.setAttribute("class", "sliderStatus");
    sliderStatus.innerHTML = sliderStatusValue(slider.value);
    sliderContainer.appendChild(sliderStatus);
    templateContainer.appendChild(sliderContainer);

    var updateSlider = function(event) {
      if(typeof event !== "boolean" || event === true)
      {
        setStorage("slider", slider.value);
      }
      sliderStatus.innerHTML = sliderStatusValue(slider.value);
      img.style.opacity = slider.value;
    };

    slider.addEventListener("change", updateSlider);
    slider.addEventListener("input", updateSlider);

    var updateTemplate = function(event) {
      if(typeof event !== "boolean" || event === true)
      {
        setStorage("template", templateCheckbox.checked);
      }
      img.style.visibility = templateCheckbox.checked?"visible":"hidden";
    };

    var flashInterval = -1, flashOldTemplate = templateCheckbox.checked;
    var updateFlash = function(event) {
      if(flashCheckbox.checked)
      {
        flashOldTemplate = templateCheckbox.checked;
        if(typeof event !== "boolean" || event === true)
        {
          setStorage("template", templateCheckbox.checked);
          setStorage("flash", flashCheckbox.checked);
        }
        templateCheckbox.disabled = true;
        flashInterval = window.setInterval(function(){if(flashCheckbox.checked){templateCheckbox.checked=!templateCheckbox.checked; updateTemplate(false);}}, 1000/15);
      }
      else
      {
        window.clearInterval(flashInterval);
        templateCheckbox.checked = flashOldTemplate;
        if(typeof event !== "boolean" || event === true)
        {
          setStorage("flash", flashCheckbox.checked);
        }
        templateCheckbox.disabled = false;
        updateTemplate();
      }
    }
    flashCheckbox.addEventListener("change", updateFlash);

    templateCheckbox.addEventListener("change", updateTemplate);

    document.addEventListener('keydown', function(event) {
      switch(event.keyCode)
      {
        case 84: /* T */
        templateCheckbox.checked = !templateCheckbox.checked;
        updateTemplate();
        break;
        case 70: /* F */
        flashCheckbox.checked = !flashCheckbox.checked;
        updateFlash();
        break;
        case 189: /* - */
        slider.value = parseFloat(slider.value)-0.05;
        updateSlider();
        break;

        case 187: /* + */
        slider.value = parseFloat(slider.value)+0.05;
        updateSlider();
        break;

        case 74: /* J */
        if(typeof App === "object" && typeof App.centerOn === "function")
        {
          askCoordinate();
        }
        break;
      }
    });

    updateSlider(false);
    updateTemplate(false);
    updateFlash(false);
    if(typeof App === "object" && typeof App.centerOn === "function" && templateCheckbox.checked && (params.ox !== 0 || params.oy !== 0))
    {
      App.centerOn(params.ox, params.oy);
    }
  }
  else
  {
    templateContainer.setAttribute("class", "notemplateurl");
    templateContainer.innerHTML += ('<div class="notification">'+getString("no-url")+'</div>');
    console.log(getString("no-url"));
  }

  const creditContainer = document.createElement("div");
  creditContainer.setAttribute("class", "creditContainer");
  creditContainer.innerHTML = getString("credits");
  templateContainer.appendChild(creditContainer);

  uiContainer.appendChild(templateContainer);

  console.log(getString("time-for-reich"));
})();
