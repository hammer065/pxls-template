// ==UserScript==
// @name         pxls.space pr0 template
// @namespace    pr0
// @updateURL    https://raw.githubusercontent.com/hammer065/pxls-template/master/pxls-template.user.js
// @downloadURL  https://raw.githubusercontent.com/hammer065/pxls-template/master/pxls-template.user.js
// @homepageURL  https://github.com/hammer065/pxls-template
// @version      0.6
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
  const baseURL = "https://rawgit.com/hammer065/pxls-template/master/";
  const baseStaticURL = "https://cdn.rawgit.com/hammer065/pxls-template/master/";

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
        "credits":('von <img src="'+baseStaticURL+'pr0gramm-logo.svg" class="pr0User">hammer065'),
        "time-for-reich":"Es ist Zeit für Reich!",
        "invalid-storage-key":"Ungültiger Storagename!",
        "prompt-x-coord":"Bitte gib die X-Koordinate ein, zu der du springen willst:",
        "prompt-y-coord":"Bitte gib die Y-Koordinate ein, zu der du springen willst:",
        "jump-to-coordinates":"Springe zu Koordinaten [J]",
        "ran-twice":"Anscheinend hast du das UserScript mehrfach installiert!\nBitte deinstalliere ALLE Versionen und installiere die Neueste!",
        "start-recording":"Aufnahme starten",
        "started-recording":"Aufnahme gestartet...",
        "stop-recording":"Aufnahme stoppen (%0 Bilder aufgenommen)",
        "stopped-recording":"Aufnahme bei %0 Bildern gestoppt",
        "record-delay":"Bitte gib die Zeit in Sekunden an, die zwischen den Aufnahmen gewartet werden soll",
        "record-times":"Bitte gib an, wie viele Aufnahmen du machen möchtest (0 für Unendlich)",
        "no-localstorage":"LocalStorage ist nicht verfügbar. Einstellungen werden nicht gespeichert"
      },
      "en":{
        "title-name":('<img src="'+baseStaticURL+'pr0gramm-logo.svg" class="pr0Logo"> Template'),
        "no-url":"No Template-URL passed!",
        "url-passed":"Template-URL \"%0\" passed",
        "no-ox":"No ox parameter passed. Setting to 0",
        "no-oy":"No oy parameter passed. Setting to 0",
        "template-label":"Show Template [T]",
        "flash-label":"Flash Template [F]",
        "credits":('by <img src="'+baseStaticURL+'pr0gramm-logo.svg" class="pr0User">hammer065'),
        "time-for-reich":"It's time for Reich!",
        "invalid-storage-key":"Invalid storage key!",
        "prompt-x-coord":"Please enter the X-coordinate you want to jump to:",
        "prompt-y-coord":"Please enter the Y-coordinate you want to jump to:",
        "jump-to-coordinates":"Jump to Coordinates [J]",
        "ran-twice":"It seems that you've installed the UserScript multiply!\nPlease uninstall ALL versions and install the newest one!",
        "start-recording":"Start Recording",
        "started-recording":"Started recording...",
        "stop-recording":"Stop Recording (%0 images recorded)",
        "stopped-recording":"Stopped recording at %0 images",
        "record-delay":"Please enter the delay between each image",
        "record-times":"Please enter how many images you want to create (0 for infinite)",
        "no-localstorage":"LocalStorage is not available. Settings will not be saved"
      }
    };
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

  const uniqueIDs = ["overlayImage", "templateContainer", "templateCheckbox", "flashCheckbox"];
  var i = 0;
  for(i=0; i<uniqueIDs.length; i++)
  {
    if(document.getElementById(uniqueIDs[i]) !== null)
    {
      console.error(getString("ran-twice"));
      alert(getString("ran-twice"));
      return;
    }
  }

  var version = "";
  if(typeof GM_info !== "undefined" && typeof GM_info.script !== "undefined" && typeof GM_info.script.version !== "undefined")
  {
    version = GM_info.script.version;
  }

  console.log("pxls-template"+(version!==""?(" v"+version.toString()):""));

  function toHtml(str) {
    var htmlObject = document.createElement('div');
    htmlObject.innerHTML = str;
    return htmlObject.firstChild;
  }

  const query = window.location.search.substring(1).split('&');
  var params = {};
  for(i=0; i<query.length; i++) {
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
  templateContainer.setAttribute("id", "templateContainer");
  templateContainer.innerHTML = getString("title-name")+(version!==""?(' <span class="version">v'+version.toString()+'</span>'):"")+'<br />';

  if(typeof params.template !== "undefined")
  {
    console.log(getString("url-passed", params.template.toString()));
    var img = document.createElement("img");
    img.src = params.template;
    img.id = "overlayImage";
    img.style.opacity = getStorage("templateSlider", 0.5);
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
    img.style.top = (params.oy.toString()+"px");
    img.style.left = (params.ox.toString()+"px");
    img.style.width = (typeof params.tw !== "undefined")?(params.tw.toString()+"px"):undefined;

    const boardMover = document.querySelector(".board-mover");
    if(!boardMover)
    {
      return;
    }
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

    var templateSliderStatusValue = function(float){return (Math.round(float*1000)/10).toString()+"%";};
    const templateSliderContainer = document.createElement("div");
    templateSliderContainer.setAttribute("class", "sliderContainer");
    var templateSlider = document.createElement("input");
    templateSlider.setAttribute("type", "range");
    templateSlider.setAttribute("min", "0");
    templateSlider.setAttribute("max", "1");
    templateSlider.setAttribute("step", "0.01");
    templateSlider.value = img.style.opacity;
    templateSliderContainer.appendChild(templateSlider);
    var templateSliderStatus = document.createElement("div");
    templateSliderStatus.setAttribute("class", "sliderStatus");
    templateSliderStatus.innerHTML = templateSliderStatusValue(templateSlider.value);
    templateSliderContainer.appendChild(templateSliderStatus);
    controlsContainer.appendChild(templateSliderContainer);

    var updateTemplateSlider = function(event) {
      if(typeof event !== "boolean" || event === true)
      {
        setStorage("templateSlider", templateSlider.value);
      }
      templateSliderStatus.innerHTML = templateSliderStatusValue(templateSlider.value);
      img.style.opacity = templateSlider.value;
    };
    templateSlider.addEventListener("change", updateTemplateSlider);
    templateSlider.addEventListener("input", updateTemplateSlider);

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

    var flashSliderStatusValue = function(float){return (Math.round(float*10)/10).toString()+"ms";};
    const flashSliderContainer = document.createElement("div");
    flashSliderContainer.setAttribute("class", "sliderContainer");
    var flashSlider = document.createElement("input");
    flashSlider.setAttribute("type", "range");
    flashSlider.setAttribute("min", "0");
    flashSlider.setAttribute("max", "1000");
    flashSlider.setAttribute("step", "0.1");
    flashSlider.value = getStorage("flashSlider", 66.7);
    flashSliderContainer.appendChild(flashSlider);
    var flashSliderStatus = document.createElement("div");
    flashSliderStatus.setAttribute("class", "sliderStatus");
    flashSliderStatus.innerHTML = flashSliderStatusValue(flashSlider.value);
    flashSliderContainer.appendChild(flashSliderStatus);
    controlsContainer.appendChild(flashSliderContainer);

    var updateFlashSlider = function(event) {
      if(typeof event !== "boolean" || event === true)
      {
        setStorage("flashSlider", flashSlider.value);
      }
      flashSliderStatus.innerHTML = flashSliderStatusValue(flashSlider.value);
    };
    flashSlider.addEventListener("change", updateFlashSlider);
    flashSlider.addEventListener("input", updateFlashSlider);

    if(typeof App === "object" && typeof App.centerOn === "function" && typeof window.prompt === "function")
    {
      const coordinateButton = document.createElement("input");
      coordinateButton.setAttribute("type", "button");
      coordinateButton.setAttribute("value", getString("jump-to-coordinates"));
      coordinateButton.onclick = askCoordinate;
      controlsContainer.appendChild(coordinateButton);
    }
    if(typeof window.prompt === "function")
    {
      controlsContainer.appendChild(document.createElement("br"));
      const recordButton = document.createElement("input");
      recordButton.setAttribute("type", "button");
      recordButton.setAttribute("value", getString("start-recording"));
      var recordNbr = 0, recordInterval = -1, isRecording = false, recordTimes = parseInt(getStorage("recordTimes", 0)), recordDelay = parseFloat(getStorage("recordDelay", 10)), recordStop = function() {
        window.clearInterval(recordInterval);
        console.log(getString("stopped-recording", recordNbr));
        recordButton.value = getString("start-recording");
        recordNbr = 0;
        isRecording = false;
      }, recordLoop = function() {
        var a = document.createElement("a");
        a.href = App.elements.board[0].toDataURL("record/png");
        a.download = "canvas_"+recordNbr+".png";
        a.click();
        recordButton.value = getString("stop-recording", ++recordNbr);
        if(recordNbr > recordTimes && recordTimes != 0)
        {
          recordStop();
        }
      }, recordClick = function() {
        if(isRecording)
        {
          recordStop();
        }
        else
        {
          var recDel = parseFloat(prompt(getString("record-delay"), recordDelay));
          if(!isNaN(recDel))
          {
            recordDelay = recDel;
            setStorage("recordDelay", recordDelay);
            var recTimes = parseInt(prompt(getString("record-times"), recordTimes));
            if(!isNaN(recTimes))
            {
              recordTimes = recTimes;
              setStorage("recordTimes", recordTimes);
              recordInterval = window.setInterval(recordLoop, (recordDelay*1000)),
              console.log(getString("started-recording"));
              recordButton.value = getString("stop-recording", recordNbr);
              isRecording = true;
            }
          }
        }
      }
      recordButton.onclick = recordClick;
      controlsContainer.appendChild(recordButton);
    }

    templateContainer.appendChild(controlsContainer);

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
        flashSlider.disabled = true;
        flashInterval = window.setInterval(function(){if(flashCheckbox.checked){templateCheckbox.checked=!templateCheckbox.checked; updateTemplate(false);}}, flashSlider.value);
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
        flashSlider.disabled = false;
        updateTemplate();
      }
    };
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
        templateSlider.value = parseFloat(templateSlider.value)-0.05;
        updateTemplateSlider();
        break;

        case 187: /* + */
        templateSlider.value = parseFloat(templateSlider.value)+0.05;
        updateTemplateSlider();
        break;

        case 74: /* J */
        if(typeof App === "object" && typeof App.centerOn === "function")
        {
          askCoordinate();
        }
        break;
      }
    });

    updateTemplateSlider(false);
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
