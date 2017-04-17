// ==UserScript==
// @name         pxls.space pr0 template
// @namespace    pr0
// @updateURL    https://raw.githubusercontent.com/hammer065/pxls-template/master/pxls-template.user.js
// @downloadURL  https://raw.githubusercontent.com/hammer065/pxls-template/master/pxls-template.user.js
// @homepageURL  https://github.com/hammer065/pxls-template
// @version      0.6.13
// @description  Es ist Zeit für Reich
// @author       >_Luzifix and >_hammer065
// @match        http://pxls.space/*
// @match        https://pxls.space/*
// @grant        none
// ==/UserScript==

/* Originally created by phiresky */
/* Forked by LittleEndu on 04-Apr-17. */
/* Basically rewritten by hammer065 */

(function () {
  'use strict';
  window.pxls_template = "";
  const usesFagResize = (typeof window.App === "object" && typeof window.App.use_js_resize === "boolean" && window.App.use_js_resize);
  const storagePrefix = "pxls-template.";
  const baseURL = "https://rawgit.com/hammer065/pxls-template/master/";
  const baseStaticURL = "https://cdn.rawgit.com/hammer065/pxls-template/master/";

  var getString = function(string, args, language) {
    var output = "";
    const l18n = {
      "de":{
        "title-name":('<img src="'+baseStaticURL+'pr0gramm-logo.svg" class="pr0Logo"> Template Skript'),
        "no-url":"Keine Template-URL angegeben!",
        "url-passed":"Template-URL \"%0\" angegeben",
        "no-ox":"Kein (valider) ox Parameter angegeben. Setze auf 0",
        "no-oy":"Kein (valider) oy Parameter angegeben. Setze auf 0",
        "no-tw":"Kein (valider) tw Parameter angegeben. Ignoriere ihn",
        "template-label":"Template anzeigen [T]",
        "flash-label":"Template flashen lassen [F]",
        "credits":('von <img src="'+baseStaticURL+'pr0gramm-logo.svg" class="pr0User">Luzifix und <img src="'+baseStaticURL+'pr0gramm-logo.svg" class="pr0User">hammer065'),
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
        "no-localstorage":"LocalStorage ist nicht verfügbar. Einstellungen werden nicht gespeichert",
        "false-focus":"Falsches Element fokussiert. Fokussiere body...",
        "uses-fag-resize":"Es wird JavaScript zum verschieben und resizen verwendet. Aktiviere Overrides...",
        "no-dependant-class":"Konnte kein Element mit dem Klassennamen \"%0\" finden. Beende..."
      },
      "en":{
        "title-name":('<img src="'+baseStaticURL+'pr0gramm-logo.svg" class="pr0Logo"> Template Script'),
        "no-url":"No Template-URL passed!",
        "url-passed":"Template-URL \"%0\" passed",
        "no-ox":"No (valid) ox parameter passed. Setting to 0",
        "no-oy":"No (valid) oy parameter passed. Setting to 0",
        "no-tw":"No (valid) tw parameter passed. Ignoring it",
        "template-label":"Show Template [T]",
        "flash-label":"Flash Template [F]",
        "credits":('by <img src="'+baseStaticURL+'pr0gramm-logo.svg" class="pr0User">Luzifix and <img src="'+baseStaticURL+'pr0gramm-logo.svg" class="pr0User">hammer065'),
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
        "no-localstorage":"LocalStorage is not available. Settings will not be saved",
        "false-focus":"Wrong element is focused. Focusing body...",
        "uses-fag-resize":"JavaScript is being used to move and resize the canvas. Activating Overrides...",
        "no-dependant-class":"Could not find any Element with class named \"%0\". Exiting..."
      }
    };
    if(typeof string !== "string")
    {
      window.console.error("No valid l18n string passed!");
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
      if(typeof window.navigator !== "undefined" && typeof window.navigator.language === "string")
      {
        language = window.navigator.language.toLowerCase();
        if(typeof l18n[language] === "undefined" || typeof l18n[language][string] === "undefined")
        {
          language = window.navigator.language.split("-")[0].toLowerCase();
        }
      }
      else
      {
        language = "en";
      }
    }
    if(typeof l18n[language] === "undefined" || typeof l18n[language][string] === "undefined")
    {
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
      return "$"+string.toString().toUpperCase()+"$";
    }
  }, getStorage = function(key, fallback) {
    if(typeof key !== "string")
    {
      window.console.warn(getString("invalid-storage-key"));
      return;
    }
    if(typeof window.localStorage !== "undefined" && typeof window.localStorage[(storagePrefix+key.toString())] !== "undefined")
    {
      return window.localStorage[(storagePrefix+key.toString())];
    }
    else
    {
      window.console.log(getString("no-localstorage"));
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
      window.console.warn(getString("invalid-storage-key"));
      return;
    }
    if(typeof window.localStorage !== "undefined")
    {
      if(typeof value === "undefined")
      {
        window.localStorage.removeItem(storagePrefix+key.toString());
        return;
      }
      else
      {
        window.localStorage[(storagePrefix+key.toString())] = value;
        return value;
      }
    }
    else
    {
      window.console.warn(getString("no-localstorage"));
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
          window.App.centerOn(x, y);
        }
      }
    }
  };

  /* if(typeof window.navigator!=="undefined"&&typeof window.navigator.language==="string"){const reg=["ru","pl","fr","no","nb","nn"];for(i=0;i<reg.length;i++){if(reg[i]==window.navigator.language.split("-")[0].toLowerCase()){return;}}} */
  const uniqueIDs = ["overlayImage", "templateContainer", "templateCheckbox", "flashCheckbox", "tempcontainer", "slider-control"];
  var i = 0;
  if(!(delete window.pxls_template))
  {
    window.pxls_template = undefined;
  }
  for(i=0; i<uniqueIDs.length; i++)
  {
    if(window.document.getElementById(uniqueIDs[i]) !== null || typeof window.pxls_template !== "undefined")
    {
      window.console.error(getString("ran-twice"));
      alert(getString("ran-twice"));
      return;
    }
  }
  window.pxls_template = "";

  var version = "";
  if(typeof GM_info !== "undefined" && typeof GM_info.script !== "undefined" && typeof GM_info.script.version !== "undefined")
  {
    version = GM_info.script.version;
  }

  window.console.log("pxls-template"+(version!==""?(" v"+version.toString()):""));

  const query = window.location.search.substring(1).split('&');
  var params = {};
  for(i=0; i<query.length; i++) {
    var pair = query[i].split('=');
    params[decodeURIComponent(pair[0])] = (typeof pair[1] !== "undefined")?decodeURIComponent(pair[1]):true;
  }

  const uiContainer = window.document.getElementsByClassName("ui")[0];
  if(typeof uiContainer === "undefined")
  {
    window.console.error(getString("no-dependant-class", "ui"));
    return;
  }

  const styleElement = window.document.createElement("link");
  styleElement.setAttribute("rel", "stylesheet");
  styleElement.setAttribute("type", "text/css");
  styleElement.setAttribute("href", baseURL+"pxls-template.css");
  window.document.head.appendChild(styleElement);

  const templateContainer = window.document.createElement("div");
  templateContainer.setAttribute("id", "templateContainer");
  templateContainer.innerHTML = getString("title-name")+(version!==""?(' <span class="version">v'+version.toString()+'</span>'):"")+'<br />';
  const activateTemplate = typeof params.template !== "undefined";
  if(activateTemplate)
  {
    window.console.log(getString("url-passed", params.template.toString()));
    var img = window.document.createElement("img");
    img.src = params.template;
    img.id = "overlayImage";
    img.style.opacity = getStorage("templateSlider", 0.5);
    params.ox = window.parseFloat(params.ox);
    if(isNaN(params.ox))
    {
      window.console.log(getString("no-ox"));
      params.ox = 0;
    }
    params.oy = window.parseFloat(params.oy);
    if(isNaN(params.oy))
    {
      window.console.log(getString("no-oy"));
      params.oy = 0;
    }
    params.tw = window.parseFloat(params.tw);
    if(isNaN(params.tw))
    {
      window.console.log(getString("no-tw"));
    }
    else
    {
      if(!usesFagResize)
      {
        img.style.width = (params.tw.toString()+"px");
      }
    }
    if(!usesFagResize)
    {
      img.style.top = (params.oy.toString()+"px");
      img.style.left = (params.ox.toString()+"px");
    }

    if(!usesFagResize)
    {
      const boardMover = window.document.getElementsByClassName("board-mover")[0];
      if(typeof boardMover === "undefined")
      {
        window.console.error(getString("no-dependant-class", "board-mover"));
        return;
      }
      boardMover.appendChild(img);
    }

    const controlsContainer = window.document.createElement("div");
    controlsContainer.setAttribute("class", "controlsContainer");

    const templateCheckbox = window.document.createElement("input");
    templateCheckbox.setAttribute("type", "checkbox");
    templateCheckbox.setAttribute("id", "templateCheckbox");
    templateCheckbox.checked = parseBool(getStorage("template", true));
    controlsContainer.appendChild(templateCheckbox);
    const templateCheckboxLabel = window.document.createElement("label");
    templateCheckboxLabel.setAttribute("for", "templateCheckbox");
    templateCheckboxLabel.setAttribute("class", "checkboxLabel");
    templateCheckboxLabel.innerHTML = ("&nbsp;"+getString("template-label"));
    controlsContainer.appendChild(templateCheckboxLabel);

    var templateSliderStatusValue = function(float){return (Math.round(float*1000)/10).toString()+"%";};
    const templateSliderContainer = window.document.createElement("div");
    templateSliderContainer.setAttribute("class", "sliderContainer");
    var templateSlider = window.document.createElement("input");
    templateSlider.setAttribute("type", "range");
    templateSlider.setAttribute("min", "0");
    templateSlider.setAttribute("max", "1");
    templateSlider.setAttribute("step", "0.01");
    templateSlider.value = img.style.opacity;
    templateSliderContainer.appendChild(templateSlider);
    var templateSliderStatus = window.document.createElement("div");
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
      if(usesFagResize)
      {
        window.App.updateTransform();
      }
    };
    templateSlider.addEventListener("change", updateTemplateSlider);
    templateSlider.addEventListener("input", updateTemplateSlider);

    const flashCheckbox = window.document.createElement("input");
    flashCheckbox.setAttribute("type", "checkbox");
    flashCheckbox.setAttribute("id", "flashCheckbox");
    flashCheckbox.checked = parseBool(getStorage("flash", false));
    controlsContainer.appendChild(flashCheckbox);
    const flashCheckboxLabel = window.document.createElement("label");
    flashCheckboxLabel.setAttribute("for", "flashCheckbox");
    flashCheckboxLabel.setAttribute("class", "checkboxLabel");
    flashCheckboxLabel.innerHTML = ("&nbsp;"+getString("flash-label"));
    controlsContainer.appendChild(flashCheckboxLabel);

    var flashSliderStatusValue = function(float){return (Math.round(float*10)/10).toString()+"ms";};
    const flashSliderContainer = window.document.createElement("div");
    flashSliderContainer.setAttribute("class", "sliderContainer");
    var flashSlider = window.document.createElement("input");
    flashSlider.setAttribute("type", "range");
    flashSlider.setAttribute("min", "0");
    flashSlider.setAttribute("max", "1000");
    flashSlider.setAttribute("step", "0.1");
    flashSlider.value = getStorage("flashSlider", 66.7);
    flashSliderContainer.appendChild(flashSlider);
    var flashSliderStatus = window.document.createElement("div");
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

    if(typeof window.App === "object" && typeof window.App.centerOn === "function" && typeof window.prompt === "function")
    {
      const coordinateButton = window.document.createElement("input");
      coordinateButton.setAttribute("type", "button");
      coordinateButton.setAttribute("value", getString("jump-to-coordinates"));
      coordinateButton.onclick = askCoordinate;
      controlsContainer.appendChild(coordinateButton);
    }
    if(typeof window.prompt === "function")
    {
      /* ffmpeg -r 15 -start_number 2 -i canvas_%d.png -s 2000x2000 -vcodec libx264 timelapse.mp4 -frames 30 */
      controlsContainer.appendChild(window.document.createElement("br"));
      const recordButton = window.document.createElement("input");
      recordButton.setAttribute("type", "button");
      recordButton.setAttribute("value", getString("start-recording"));
      var recordNbr = 0, isRecording = false, recordTimes = window.parseInt(getStorage("recordTimes", 0)), recordDelay = window.parseFloat(getStorage("recordDelay", 10)), recordStop = function() {
        window.console.log(getString("stopped-recording", recordNbr));
        recordButton.value = getString("start-recording");
        recordNbr = 0;
        isRecording = false;
      }, recordLoop = function() {
        if(isRecording)
        {
          var a = window.document.createElement("a");
          a.href = window.App.elements.board[0].toDataURL("record/png");
          a.download = "canvas_"+recordNbr+".png";
          a.click();
          if(typeof a.remove === "function")
          {
            a.remove();
          }
          recordButton.value = getString("stop-recording", ++recordNbr);
          if(recordNbr > recordTimes && recordTimes !== 0)
          {
            recordStop();
          }
          else
          {
            window.setTimeout(recordLoop, (recordDelay*1000));
          }
        }
      }, recordClick = function() {
        if(isRecording)
        {
          recordStop();
        }
        else
        {
          var recDel = window.parseFloat(window.prompt(getString("record-delay"), recordDelay));
          if(!isNaN(recDel))
          {
            recordDelay = recDel;
            setStorage("recordDelay", recordDelay);
            var recTimes = window.parseInt(window.prompt(getString("record-times"), recordTimes));
            if(!isNaN(recTimes))
            {
              recordTimes = recTimes;
              setStorage("recordTimes", recordTimes);
              window.console.log(getString("started-recording"));
              recordButton.value = getString("stop-recording", recordNbr);
              isRecording = true;
              recordLoop();
            }
          }
        }
      };
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
      if(usesFagResize)
      {
        window.App.updateTransform();
      }
    };

    var flashOldTemplate = templateCheckbox.checked;
    var flashLoop = function() {
      if(flashCheckbox.checked)
      {
        templateCheckbox.checked = !templateCheckbox.checked;
        updateTemplate(false);
        window.setTimeout(flashLoop, flashSlider.value);
      }
    }, updateFlash = function(event) {
      if(flashCheckbox.checked)
      {
        flashOldTemplate = templateCheckbox.checked;
        if(typeof event !== "boolean" || event === true)
        {
          setStorage("template", templateCheckbox.checked);
          setStorage("flash", flashCheckbox.checked);
        }
        templateCheckbox.disabled = true;
        /* flashSlider.disabled = true; */
        flashLoop();
      }
      else
      {
        templateCheckbox.checked = flashOldTemplate;
        if(typeof event !== "boolean" || event === true)
        {
          setStorage("flash", flashCheckbox.checked);
        }
        templateCheckbox.disabled = false;
        /* flashSlider.disabled = false; */
        updateTemplate();
      }
    };
    flashCheckbox.addEventListener("change", updateFlash);

    templateCheckbox.addEventListener("change", updateTemplate);

    window.document.addEventListener('keydown', function(event) {
      switch(event.keyCode)
      {
        case 84: /* T */
        if(!flashCheckbox.checked)
        {
          templateCheckbox.checked = !templateCheckbox.checked;
          updateTemplate();
        }
        break;
        case 70: /* F */
        flashCheckbox.checked = !flashCheckbox.checked;
        updateFlash();
        break;
        case 189: /* - */
        templateSlider.value = window.parseFloat(templateSlider.value)-0.05;
        updateTemplateSlider();
        break;

        case 187: /* + */
        templateSlider.value = window.parseFloat(templateSlider.value)+0.05;
        updateTemplateSlider();
        break;

        case 74: /* J */
        if(typeof window.App === "object" && typeof window.App.centerOn === "function")
        {
          askCoordinate();
        }
        break;
      }
    });

    updateTemplateSlider(false);
    updateTemplate(false);
    updateFlash(false);
    if(typeof window.App === "object" && typeof window.App.centerOn === "function" && templateCheckbox.checked && (params.ox !== 0 || params.oy !== 0))
    {
      window.App.centerOn(params.ox, params.oy);
    }
  }
  else
  {
    templateContainer.setAttribute("class", "notemplateurl");
    templateContainer.innerHTML += ('<div class="notification">'+getString("no-url")+'</div>');
    window.console.log(getString("no-url"));
  }

  const creditContainer = window.document.createElement("div");
  creditContainer.setAttribute("class", "creditContainer");
  creditContainer.innerHTML = getString("credits");
  templateContainer.appendChild(creditContainer);

  uiContainer.appendChild(templateContainer);

  if(!Date.now)
  {
    Date.now = function() { return (new Date().getTime()); };
  }
  window.document.body.setAttribute("tabindex", -1);
  var focusLoop = function() {
    if(window.App.cooldown > Date.now())
    {
      if(typeof window.document.activeElement !== "undefined")
      {
        if(window.document.activeElement !== window.document.body)
        {
          window.console.log(getString("false-focus"));
          window.document.body.focus();
        }
      }
      else
      {
        window.document.body.focus();
      }
    }
    window.setTimeout(focusLoop, 500);
  };
  focusLoop();

  if(usesFagResize)
  {
    /* Fix by >_Luzifix; improved by >_hammer065 */
    window.console.warn(getString("uses-fag-resize"));
    window.App.updateTransformOverride = App.updateTransform;
    window.App.updateTransform = function() {
      window.App.updateTransformOverride();

      if(typeof activateTemplate === "boolean" && activateTemplate && typeof templateCheckbox === "object" && templateCheckbox.checked)
      {
        var boardRendererContext = window.App.elements.board_render[0].getContext("2d"),
        ownScale = (!isNaN(params.tw))?(img.width/params.tw):1,
        posX = -window.App.panX + (window.App.width - window.innerWidth / window.App.scale) / 2-params.ox,
        posY = -window.App.panY + (window.App.height - window.innerHeight / window.App.scale) / 2-params.oy;
        boardRendererContext.save();
        boardRendererContext.globalAlpha = templateSlider.value;
        /* console.log(posX+", "+posY+", "+(window.innerWidth / window.App.scale)+", "+(window.innerHeight / window.App.scale)+", "+ownScale+", "+window.App.scale+", "+window.App.panX+", "+window.App.panY); */
        boardRendererContext.drawImage(img, posX*ownScale, posY*ownScale, (window.innerWidth / window.App.scale)*ownScale, (window.innerHeight / window.App.scale)*ownScale, 0, 0, window.innerWidth, window.innerHeight);
        boardRendererContext.restore();
      }
    };
  }

  if(typeof window.App === "object" && typeof window.App.updateTemplate === "function")
  {
    window.App.updateTemplate({"use":false});
    window.App.updateTemplate = function(a){};
  }

  if(!(delete window.pxls_template))
  {
    window.pxls_template = undefined;
  }
  window.console.log(getString("time-for-reich"));
})();
