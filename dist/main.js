(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/0-config.js
  var TIMING = Object.freeze({
    UI: {
      START_UI_REVEAL: 1500,
      BLACKOUT_TIMER: 200,
      BLACKOUT_WAIT_TO_REVEAL: 50
    },
    VIDEO: {
      VID_END_TIMER: 1500
    }
  });
  var ASSETS = Object.freeze({
    "view-1": {
      desktop: "https://cdn.prod.website-files.com/6a395067d36279ee102c060a/6a395bdb5143048565140f0c_e9ce8e0c1af9be47b3da689f973d8665_Comps%20View-Start%20Shot%20%28with%20comps%29.webp",
      mobile: "https://cdn.prod.website-files.com/6a395067d36279ee102c060a/6a395bdbe2e7d262648b987a_e17b7a873d62390814f8ad549c35eb5d_Comps%20View-Start%20Shot-MP%20%28with%20comps%29.webp"
    },
    "view-2": {
      desktop: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b066788514192dd118f92e_Data-View-2.webp",
      mobile: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b06678f95e3f4b347c21a6_Data-View-2-MP.webp"
    },
    "view-3": {
      desktop: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b06678663d4800cc5f9935_Data-View-3.webp",
      mobile: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b066785c709890f1f02679_Data-View-3-MP.webp"
    }
  });
  var VIEW_START_END = Object.freeze({
    "view-1": {
      startTime: 0,
      endTime: 0
    },
    "view-2": {
      startTime: 1.48,
      endTime: 2.69
    },
    "view-3": {
      startTime: 4.44,
      endTime: 5.65
    }
  });
  var LOOP_SEQUENCE_VIDS = true;

  // src/0-global.js
  var global_exports = {};
  __export(global_exports, {
    _state: () => _state,
    activateCurrentBtn: () => activateCurrentBtn,
    activateCurrentNavLink: () => activateCurrentNavLink,
    allNavMenuLinks: () => allNavMenuLinks,
    allSections: () => allSections,
    allVidCodes: () => allVidCodes,
    allVids: () => allVids,
    blackout: () => blackout,
    clearSectionVidSrc: () => clearSectionVidSrc,
    deactivateAllCtrlBtnWrappers: () => deactivateAllCtrlBtnWrappers,
    deactivateAllSections: () => deactivateAllSections,
    deactivateCurrentBtns: () => deactivateCurrentBtns,
    deactivateCurrentNavLinks: () => deactivateCurrentNavLinks,
    disablePause: () => disablePause,
    disableSectionCtrlBtnEvents: () => disableSectionCtrlBtnEvents,
    enableNavLinksAndNavBtn: () => enableNavLinksAndNavBtn,
    enablePause: () => enablePause,
    enableSectionCtrlBtnEvents: () => enableSectionCtrlBtnEvents,
    flashBlackout: () => flashBlackout,
    getActiveVid: () => getActiveVid,
    getLocalIndex: () => getLocalIndex,
    getVidType: () => getVidType,
    getWebflowBreakpoint: () => getWebflowBreakpoint,
    mainWrapper: () => mainWrapper,
    navBtn: () => navBtn,
    navMenu: () => navMenu,
    playRange: () => playRange,
    query: () => query,
    queryAll: () => queryAll,
    resetAllSectionVids: () => resetAllSectionVids,
    setActiveCtrlBtnWrapper: () => setActiveCtrlBtnWrapper,
    setActiveSection: () => setActiveSection,
    setActiveVid: () => setActiveVid,
    setEndTime: () => setEndTime,
    setStartTime: () => setStartTime,
    setWebflowBreakpoint: () => setWebflowBreakpoint,
    toggleBtnHoverClass: () => toggleBtnHoverClass,
    togglePause: () => togglePause
  });
  var mainWrapper = document.querySelector(".main-wrapper");
  var blackout = document.querySelector(".blackout");
  var allSections = [...document.querySelectorAll(".section")];
  var allVidCodes = document.querySelectorAll(".vid-code");
  var allVids = document.querySelectorAll(".vid");
  var navMenu = document.querySelector(".nav_menu");
  var allNavMenuLinks = document.querySelectorAll(".nav_menu_link");
  var navBtn = document.querySelector(".nav_button");
  var _state = {
    activeSection: null,
    activeSectionName: null,
    activeVid: null,
    webflowBreakpoint: null,
    startTime: 0,
    endTime: 0,
    pauseFlag: false
  };
  var query = function(selector, context = document) {
    const el = context.querySelector(selector);
    if (!el) {
      throw new Error(
        `CRITICAL UI ERROR: "${selector}" is missing from the DOM.`
      );
    }
    return el;
  };
  var queryAll = function(selector, context = document) {
    const elements = context.querySelectorAll(selector);
    if (elements.length === 0) {
      throw new Error(
        `CRITICAL UI ERROR: No elements matching "${selector}" found.`
      );
    }
    return elements;
  };
  var getVidType = function(video) {
    return video.closest(".section").classList[1];
  };
  var flashBlackout = function() {
    blackout.classList.add("active");
    setTimeout(function() {
      blackout.classList.remove("active");
    }, TIMING.UI.BLACKOUT_TIMER);
  };
  var enableNavLinksAndNavBtn = function() {
    navMenu.style.pointerEvents = "auto";
    navBtn.style.pointerEvents = "auto";
  };
  var activateCurrentNavLink = function(clicked) {
    deactivateCurrentNavLinks();
    clicked.classList.add("current");
  };
  var deactivateCurrentNavLinks = function() {
    allNavMenuLinks.forEach(function(el) {
      el.classList.remove("current");
    });
  };
  var setActiveSection = function(sectionName, index) {
    deactivateAllSections();
    _state.activeSectionName = sectionName;
    if (!index) index = 0;
    const matches = allSections.filter(
      (el) => el.dataset.section === sectionName
    );
    const target = matches[index];
    if (target) {
      target.classList.add("active");
      _state.activeSection = target;
    }
  };
  var deactivateAllSections = function() {
    allSections.forEach(function(el) {
      el.classList.remove("active");
    });
  };
  var getActiveVid = function() {
    return _state.activeVid;
  };
  var setActiveVid = function(activeVidWrap, activeSequenceStep) {
    if (_state.activeVid) {
      _state.activeVid.pause();
      _state.activeVid.src = "";
    }
    if (activeVidWrap && activeSequenceStep === null) {
      activeVidWrap.querySelectorAll(".vid-code").forEach((el) => {
        if (el.querySelector(".vid").offsetParent !== null) {
          _state.activeVid = el.querySelector(".vid");
        }
      });
    } else if (activeVidWrap && activeSequenceStep) {
      _state.activeVid = activeSequenceStep;
    } else {
      allVidCodes.forEach((el) => {
        if (el.querySelector(".vid").offsetParent !== null) {
          _state.activeVid = el.querySelector(".vid");
        }
      });
    }
  };
  var getWebflowBreakpoint = function() {
    return _state.webflowBreakpoint;
  };
  var setWebflowBreakpoint = function() {
    const width = window.innerWidth;
    if (width < 480) _state.webflowBreakpoint = "mobilePortrait";
    if (width >= 480) _state.webflowBreakpoint = "mobileLandscape";
    if (width >= 768) _state.webflowBreakpoint = "tablet";
    if (width >= 992) _state.webflowBreakpoint = "desktop";
  };
  var setStartTime = function(newValue) {
    _state.startTime = newValue;
  };
  var setEndTime = function(newValue) {
    _state.endTime = newValue;
  };
  var clearSectionVidSrc = function() {
    _state.activeSection.querySelectorAll(".vid").forEach(function(el) {
      el.src = "";
      el.load();
    });
  };
  var resetAllSectionVids = function() {
    _state.activeSection.querySelectorAll(".vid").forEach(function(el) {
      el.currentTime = 0;
      el.pause();
    });
  };
  var playRange = function(videoCurrentTime) {
    if (!_state.activeVid) return;
    const vidCode = _state.activeVid.parentElement;
    const targetStart = videoCurrentTime || _state.startTime;
    if (_state.activeVid._currentMonitor) {
      _state.activeVid.removeEventListener(
        "timeupdate",
        _state.activeVid._currentMonitor
      );
    }
    if (vidCode) vidCode.style.opacity = "0";
    _state.activeVid.removeEventListener(
      "timeupdate",
      _state.activeVid._currentMonitor
    );
    const monitorTime = () => {
      if (_state.activeVid.currentTime >= _state.endTime - 0.15) {
        _state.activeVid.removeEventListener("timeupdate", monitorTime);
        _state.activeVid.pause();
        _state.activeVid.currentTime = _state.endTime;
        _state.activeVid.dispatchEvent(new Event("ended"));
      }
    };
    _state.activeVid._currentMonitor = monitorTime;
    const source = _state.activeVid.querySelector("source");
    const dataSrc = source ? source.getAttribute("data-src") : null;
    if (dataSrc && _state.activeVid.src !== dataSrc) {
      _state.activeVid.pause();
      _state.activeVid.src = dataSrc;
      _state.activeVid.load();
    }
    const startPlaybackSequence = async () => {
      try {
        _state.activeVid.currentTime = targetStart;
        const pollForFrame = () => {
          if (_state.activeVid.currentTime > targetStart) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                if (vidCode) vidCode.style.opacity = "1";
                if (typeof blackout !== "undefined")
                  blackout.classList.remove("active");
              });
            });
          } else if (!_state.activeVid.paused) {
            requestAnimationFrame(pollForFrame);
          }
        };
        _state.activeVid.addEventListener("timeupdate", monitorTime);
        await _state.activeVid.play();
        pollForFrame();
      } catch (e) {
        console.warn("Playback failed:", e);
        if (vidCode) vidCode.style.opacity = "1";
      }
    };
    if (_state.activeVid.readyState >= 3) {
      startPlaybackSequence();
    } else {
      _state.activeVid.addEventListener("canplay", startPlaybackSequence, {
        once: true
      });
    }
  };
  var disablePause = function() {
    _state.pauseFlag = false;
    _state.activeSection.querySelector(".pause-wrap").style.pointerEvents = "none";
  };
  var enablePause = function() {
    _state.activeSection.querySelector(".pause-wrap").style.pointerEvents = "auto";
  };
  var togglePause = function() {
    if (_state.pauseFlag) {
      _state.pauseFlag = false;
      _state.activeVid.play();
    } else {
      _state.pauseFlag = true;
      _state.activeVid.pause();
    }
  };
  var enableSectionCtrlBtnEvents = function() {
    _state.activeSection.querySelector(".section-wrap-btns").style.pointerEvents = "auto";
  };
  var disableSectionCtrlBtnEvents = function() {
    _state.activeSection.querySelector(".section-wrap-btns").style.pointerEvents = "none";
  };
  var setActiveCtrlBtnWrapper = function(btnWrapperIndex) {
    deactivateAllCtrlBtnWrappers();
    _state.activeSection.querySelectorAll(".section-wrap-btns").forEach(function(el, index) {
      if (index === btnWrapperIndex) {
        el.classList.add("active");
      }
    });
  };
  var deactivateAllCtrlBtnWrappers = function() {
    _state.activeSection.querySelectorAll(".section-wrap-btns").forEach(function(el) {
      el.classList.remove("active");
    });
  };
  var toggleBtnHoverClass = function(btn) {
    if (_state.activeVid && _state.webflowBreakpoint === "desktop")
      btn.classList.toggle("hovered");
  };
  var activateCurrentBtn = function(btn) {
    deactivateCurrentBtns();
    setTimeout(() => btn.classList.add("current"), 50);
  };
  var deactivateCurrentBtns = function(section) {
    if (!section) section = _state.activeSection;
    section.querySelectorAll(".ctrl-btn").forEach(function(el) {
      el.classList.remove("current");
    });
  };
  var getLocalIndex = function(btn, btnClass, allBtnsWrapper) {
    let localIndex;
    const allBtns = btn.closest(`.${allBtnsWrapper}`).querySelectorAll(`.${btnClass}`);
    allBtns.forEach(function(el, index) {
      if (el === btn) localIndex = index;
    });
    return localIndex;
  };

  // src/0-navbar.js
  var Navbar = class {
    constructor(globalController, container) {
      this.global = globalController;
      this.container = container;
      this.navMenu = this.global.query(".nav_menu", this.container);
      this.navBtn = this.global.query(".nav_button", this.container);
      this.allNavLinks = this.global.queryAll(".nav_menu_link", this.container);
      this.allNavLinksWithDropdown = [
        ...this.global.queryAll('[data-nav-section="sequence"]', this.container)
      ];
      this.allNavDropdowns = [
        ...this.global.queryAll(".nav_menu_dropdown", this.container)
      ];
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-nav-dropdown", this.openNavDropdown],
        ["close-nav-dropdown", this.closeNavDropdown],
        ["toggle-nav-dropdown", this.toggleNavDropdown]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    handleEvent = function(trigger, eventAction) {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(trigger);
      } else {
        console.warn(`No action found for: ${eventAction}`);
      }
    };
    closeNavMenu = function() {
      this.allNavDropdowns.forEach(function(el) {
        el.classList.remove("active");
      });
    };
    closeMobileNavMenu = function() {
      if ("navMenuOpen" in this.navMenu.dataset) this.navBtn.click();
      this.navMenu.querySelector(".nav_menu_dropdown").classList.remove("active");
    };
    openNavDropdown = function(trigger) {
      trigger.closest(".nav_menu_link-wrap").querySelector(".nav_menu_dropdown").classList.add("active");
    };
    closeNavDropdown = function(trigger) {
      trigger.closest(".nav_menu_link-wrap").querySelector(".nav_menu_dropdown").classList.remove("active");
    };
    toggleNavDropdown = function(trigger) {
      this.global.activateCurrentNavLink(trigger);
      trigger.closest(".nav_menu_link-wrap").querySelector(".nav_menu_dropdown").classList.toggle("active");
    };
  };
  var navbar_default = Navbar;

  // src/1-features.js
  var Features = class {
    constructor(globalController, container) {
      this.global = globalController;
      this.container = container;
      this.featuresBlackout = this.global.query(".blackout", this.container);
      this.featuresAllText = [
        ...this.global.queryAll(".txt-wrap", this.container)
      ];
      this.featuresIntroVidDiv = this.global.query(
        ".vid-wrap.intro",
        this.container
      );
      this.featuresAllVidWraps = this.global.queryAll(
        ".vid-wrap",
        this.container
      );
      this.featuresVidDiv = this.global.query(
        ".vid-wrap.features",
        this.container
      );
      this.pauseWrapper = this.global.query(".pause-wrap", this.container);
      this.featuresCtrlBtns = this.global.query(
        ".section-wrap-btns",
        this.container
      );
      this.activeFeature = null;
      this.featuresTimer = null;
      this.featuresEndisCancelled = false;
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-features", this.initSection],
        ["play-ctrl-vid", this.playCtrlBtnVid],
        ["pause-ctrl-vid", this.pauseCtrlVid],
        ["btn-hovered", this.global.toggleBtnHoverClass.bind(this)]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    initSection = (clicked, isIntro2) => {
      this.global.blackout.classList.remove("active");
      this.featuresBlackout.classList.remove("active");
      this.pauseWrapper.classList.remove("active");
      this.global.disablePause();
      if (clicked) {
        this.global.activateCurrentNavLink(clicked);
        this.global.flashBlackout();
      }
      this.global.enableSectionCtrlBtnEvents();
      this.hideAllText();
      this.showIntroText();
      this.featuresCtrlBtns.classList.add("active");
      if (isIntro2) return;
      this.playFeaturesIntro();
    };
    handleEvent = (trigger, eventAction) => {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(trigger);
      } else {
        console.warn(`No action found for: ${eventAction}`);
      }
    };
    hideAllText = () => {
      this.featuresAllText.forEach(function(el) {
        el.classList.remove("active");
      });
    };
    showIntroText = () => {
      this.featuresAllText.find((el) => el.dataset.textContent === "intro").classList.add("active");
    };
    showFeatureText = () => {
      this.featuresAllText.find((el) => el.dataset.textContent === this.activeFeature).classList.add("active");
    };
    showFeaturesIntroVidDiv = () => {
      this.featuresIntroVidDiv.classList.add("active");
    };
    hideFeaturesIntroVidDiv = () => {
      this.featuresIntroVidDiv.classList.remove("active");
    };
    showFeaturesVidDiv = (feature) => {
      this.featuresAllVidWraps.forEach((el) => {
        if (el.classList.contains("intro")) return;
        el.classList.remove("active");
        if (el.dataset.feature === feature) {
          this.acitveVidWrap = el;
          this.acitveVidWrap.classList.add("active");
        }
      });
    };
    hideFeaturesVidDiv = () => {
      this.featuresAllVidWraps.forEach((el) => {
        if (el.classList.contains("intro")) return;
        el.classList.remove("active");
      });
    };
    playFeaturesIntro = () => {
      this.featuresBlackout.classList.remove("active");
      this.showFeaturesIntroVidDiv();
      this.hideFeaturesVidDiv();
      const allIntros = this.featuresIntroVidDiv.querySelectorAll(".vid-code-intro");
      allIntros.forEach((el) => {
        if (el.offsetParent !== null) {
          const vid = el.querySelector(".vid-intro");
          if (vid) {
            vid.currentTime = 0;
            vid.play();
          }
        }
      });
    };
    playCtrlBtnVid = (clickedCtrlBtn) => {
      this.clearFeaturesTimers();
      this.global.disablePause();
      this.global.enablePause();
      this.pauseWrapper.classList.remove("active");
      this.hideFeaturesIntroVidDiv();
      this.showFeaturesVidDiv(clickedCtrlBtn.dataset.feature);
      this.activeFeature = clickedCtrlBtn.dataset.feature;
      this.featuresEndisCancelled = false;
      this.hideAllText();
      this.showFeatureText();
      this.global.setActiveVid(this.acitveVidWrap, null);
      this.global.setStartTime(clickedCtrlBtn.dataset.startTime);
      this.global.setEndTime(clickedCtrlBtn.dataset.endTime);
      this.global.activateCurrentBtn(clickedCtrlBtn);
      this.global.blackout.classList.add("active");
      this.global.playRange();
    };
    pauseCtrlVid = () => {
      this.global.togglePause();
      this.pauseWrapper.classList.toggle("active");
    };
    vidEnd = () => {
      if (this.featuresEndisCancelled === false) {
        this.global.disableSectionCtrlBtnEvents();
        this.global.disablePause();
        this.pauseWrapper.classList.remove("active");
        this.featuresTimer = setTimeout(() => {
          this.featuresBlackout.classList.add("active");
          setTimeout(() => {
            this.hideAllText();
            this.showIntroText();
            this.global.resetAllSectionVids();
            this.global.deactivateCurrentBtns();
            this.global.enableNavLinksAndNavBtn();
            this.global.enableSectionCtrlBtnEvents();
            this.playFeaturesIntro();
          }, TIMING.UI.BLACKOUT_WAIT_TO_REVEAL);
        }, TIMING.VIDEO.VID_END_TIMER);
      }
    };
    clearFeaturesTimers = () => {
      this.featuresEndisCancelled = true;
      clearTimeout(this.featuresTimer);
      this.featuresTimer = null;
    };
  };
  var features_default = Features;

  // src/2-data.js
  var HOME_VIEW = "view-1";
  var Data = class {
    constructor(globalController, container) {
      this.global = globalController;
      this.container = container;
      this.introText = this.global.query(".section-wrap-txt", this.container);
      this.viewOptsBtn = this.global.query(".opts-menu-btn", this.container);
      this.viewOptsMenu = this.global.query(".opts-dropdown", this.container);
      this.allViewOptBtns = [
        ...this.global.queryAll(".opts-menu-link", this.container)
      ];
      this.dimmer = this.global.query(".dimmer", this.container);
      this.txtImgBtn = this.global.query(".txt-img-btn", this.container);
      this.activeDataWrapper = this.global.query(
        ".section-wrap-comp-data",
        this.container
      );
      this.allDataWrappers = [
        ...this.global.queryAll(".section-wrap-comp-data", this.container)
      ];
      this.allData = [...this.global.queryAll(".comp-data-wrap", this.container)];
      this.allCtrlBtnWrappers = [
        ...this.global.queryAll(".section-wrap-btns", this.container)
      ];
      this.activeViewBtn = null;
      this.activeView = "view-1";
      this.lastActiveView = { view: "view-1", startTime: 0, endTime: 0 };
      this.viewVidFlag = false;
      this.viewChainFlag = false;
      this.txtOrImg = "image";
      this.activeDataSheet = null;
      this.activeCtrlBtnWrapper = this.allCtrlBtnWrappers[0];
      this.startTime = 0;
      this.endTime = 0;
      this.activeCtrlBtn = null;
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-data", this.initSection],
        ["play-ctrl-vid", this.setAndPlayCtrlBtnVid],
        ["play-view-vid", this.setAndPlayViewVid],
        ["back-to-view", this.backToViewFromComp],
        ["open-view-opts-menu", this.showViewOptsMenu],
        ["close-view-opts-menu", this.hideViewOptsMenu],
        ["toggle-img-txt", this.showCompImageOrText],
        ["btn-hovered", this.global.toggleBtnHoverClass.bind(this)]
      ]);
      this.assetsMap = /* @__PURE__ */ new Map([
        ["view-1", ASSETS["view-1"].desktop],
        ["view-1-mp", ASSETS["view-1"].mobile],
        ["view-2", ASSETS["view-2"].desktop],
        ["view-2-mp", ASSETS["view-2"].mobile],
        ["view-3", ASSETS["view-3"].desktop],
        ["view-3-mp", ASSETS["view-3"].mobile]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    initSection = (clicked) => {
      this.global.flashBlackout();
      this.dimmer.classList.remove("active");
      this.txtOrImg = "image";
      this.txtImgBtn.textContent = "image";
      this.hideBackBtn();
      this.hideAllData();
      this.resetAllDataSheets();
      this.introText.classList.add("active");
      this.showCtrlBtnWrapper();
      this.global.activateCurrentNavLink(clicked);
      this.global.clearSectionVidSrc();
      this.setLastActiveView();
      this.setDataVidBackgroundImg();
    };
    handleEvent = (trigger, eventAction) => {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(trigger);
      } else {
        console.warn(`No action found for: ${eventAction}`);
      }
    };
    showViewOptsMenu = () => {
      this.viewOptsMenu.classList.add("active");
    };
    hideViewOptsMenu = () => {
      this.viewOptsMenu.classList.remove("active");
    };
    showCompImageOrText = () => {
      if (this.txtOrImg === "image") {
        this.txtOrImg = "text";
        this.dimmer.classList.remove("active");
        this.activeDataSheet.classList.remove("active");
      } else {
        this.txtOrImg = "image";
        this.dimmer.classList.add("active");
        this.activeDataSheet.classList.add("active");
      }
      this.activeDataWrapper.querySelector(".txt-img-btn").textContent = this.txtOrImg;
    };
    hideAllData = () => {
      this.deactivateAllDataWrappers();
      this.activeDataWrapper.querySelectorAll(".comp-data-wrap").forEach(function(el) {
        el.classList.remove("active");
      });
    };
    showData = () => {
      this.activeDataWrapper.classList.add("active");
      this.activeDataWrapper.querySelectorAll(".comp-data-wrap").forEach((el) => {
        if (el.dataset.comp === this.activeCtrlBtn.dataset.comp)
          this.activeDataSheet = el;
      });
      this.activeDataSheet.classList.add("active");
    };
    hideBackBtn = () => {
      this.activeCtrlBtnWrapper.querySelector(".ctrl-btn-back").classList.remove("active");
    };
    showBackBtn = () => {
      this.activeCtrlBtnWrapper.querySelectorAll(".ctrl-btn").forEach(function(el) {
        el.classList.remove("active");
      });
      this.activeCtrlBtnWrapper.classList.add("active");
      this.activeCtrlBtnWrapper.querySelector(".ctrl-btn-back").classList.add("active");
    };
    resetAllDataSheets = () => {
      this.allData.forEach(function(el) {
        el.parentElement.classList.add("active");
        el.querySelector(".comp-data-body-wrap").scroll(0, 0);
        el.parentElement.classList.remove("active");
      });
    };
    setLastActiveView = (newValue) => {
      if (!newValue) {
        this.lastActiveView.view = this.activeView;
      } else {
        this.lastActiveView.view = newValue;
      }
    };
    setActiveView = () => {
      this.activeView = this.activeViewBtn.dataset.view;
    };
    viewBackToStart = () => {
      this.startTime = VIEW_START_END[this.lastActiveView.view].startTime;
      this.endTime = VIEW_START_END[this.lastActiveView.view].endTime;
    };
    setViewVidStartAndEnd = () => {
      this.viewVidFlag = true;
      if (this.lastActiveView.view !== HOME_VIEW && this.activeView === HOME_VIEW) {
        this.viewBackToStart();
        return;
      }
      if (this.lastActiveView.view !== HOME_VIEW && this.activeView !== HOME_VIEW) {
        this.viewChainFlag = true;
        this.viewBackToStart();
        return;
      }
      this.startTime = this.activeViewBtn.dataset.startTime;
      this.endTime = this.activeViewBtn.dataset.endTime;
    };
    setDataVidStartAndEnd = () => {
      this.viewVidFlag = false;
      this.hideAllData();
      this.startTime = this.activeCtrlBtn.dataset.startTime;
      this.endTime = this.activeCtrlBtn.dataset.endTime;
    };
    setDataVidPoster = () => {
      const activeVid = this.global.getActiveVid();
      if (!activeVid) return;
      let mapKey = this.activeView;
      if (activeVid.parentElement.classList.contains("mp")) mapKey += "-mp";
      const asset = this.assetsMap.get(mapKey);
      activeVid.setAttribute("poster", asset);
    };
    setDataVidBackgroundImg = () => {
      const activeVid = this.global.getActiveVid();
      if (!activeVid) return;
      const activeVidWrap = activeVid.closest(".vid-wrap");
      let mapKey = this.lastActiveView.view;
      if (activeVid.parentElement.classList.contains("mp")) mapKey += "-mp";
      const asset = this.assetsMap.get(mapKey);
      activeVidWrap.style.backgroundImage = `url("${asset}")`;
    };
    deactivateAllDataWrappers = () => {
      this.allDataWrappers.forEach((el) => {
        el.classList.remove("active");
      });
    };
    setAndPlayViewVid = (clickedViewOptsBtn) => {
      if (clickedViewOptsBtn.dataset.view === this.activeView) return;
      this.viewOptsMenu.classList.remove("active");
      this.viewOptsBtn.textContent = clickedViewOptsBtn.textContent;
      this.activeDataWrapper = this.allDataWrappers.find(
        (el) => el.dataset.view === clickedViewOptsBtn.dataset.view
      );
      this.activeViewBtn = clickedViewOptsBtn;
      this.global.setActiveVid();
      this.setDataVidBackgroundImg();
      this.setActiveView();
      this.setActiveCtrlBtnWrapper();
      this.setViewVidStartAndEnd();
      this.playDataVid();
    };
    setAndPlayCtrlBtnVid = (clickedCtrlBtn) => {
      this.global.setActiveVid();
      this.setLastActiveView();
      this.setDataVidBackgroundImg();
      this.hideActiveCtrlBtnWrapper();
      this.activeCtrlBtn = clickedCtrlBtn;
      this.setDataVidStartAndEnd(this.activeCtrlBtn);
      this.playDataVid();
    };
    playDataVid = () => {
      this.introText.classList.remove("active");
      this.activeCtrlBtnWrapper.classList.remove("active");
      this.global.setStartTime(this.startTime);
      this.global.setEndTime(this.endTime);
      this.global.playRange();
    };
    vidEnd = () => {
      if (this.viewVidFlag && !this.viewChainFlag) {
        this.setLastActiveView();
        this.setDataVidBackgroundImg();
        this.setDataVidPoster();
        this.showActiveCtrlBtnWrapper();
        this.introText.classList.add("active");
        this.global.enableNavLinksAndNavBtn();
      } else if (this.viewChainFlag) {
        this.viewChainFlag = false;
        this.setLastActiveView(HOME_VIEW);
        this.setDataVidBackgroundImg();
        this.setViewVidStartAndEnd();
        this.playDataVid();
      } else {
        this.dimmer.classList.add("active");
        this.activeDataWrapper.querySelector(".txt-img-btn").classList.add("active");
        this.showData();
        this.showBackBtn();
        const activeVidWrap = this.global.getActiveVid().closest(".vid-wrap");
        if (activeVidWrap) {
          activeVidWrap.style.backgroundImage = "none";
          activeVidWrap.style.backgroundColor = "black";
        }
      }
    };
    backToViewFromComp = () => {
      this.global.flashBlackout();
      this.activeDataWrapper.querySelector(".txt-img-btn").textContent = "image";
      this.txtOrImg = "image";
      this.activeDataWrapper.querySelector(".txt-img-btn").classList.remove("active");
      this.hideAllData();
      this.resetAllDataSheets();
      this.dimmer.classList.remove("active");
      this.introText.classList.add("active");
      this.hideBackBtn();
      this.showCtrlBtnWrapper();
      this.setDataVidBackgroundImg();
      this.global.clearSectionVidSrc();
    };
    hideActiveCtrlBtnWrapper = () => {
      this.activeCtrlBtnWrapper.classList.remove("active");
    };
    showActiveCtrlBtnWrapper = () => {
      this.activeCtrlBtnWrapper.classList.add("active");
    };
    showCtrlBtnWrapper = () => {
      this.activeCtrlBtnWrapper.querySelectorAll(".ctrl-btn").forEach((el) => {
        el.classList.add("active");
      });
      this.activeCtrlBtnWrapper.classList.add("active");
    };
    setActiveCtrlBtnWrapper = () => {
      this.global.deactivateAllCtrlBtnWrappers();
      this.activeCtrlBtnWrapper = this.allCtrlBtnWrappers.find(
        (el) => el.dataset.view === this.activeView
      );
    };
    deactivateAllCtrlBtnWrappers = () => {
      this.allCtrlBtnWrappers.forEach((el) => {
        el.classList.remove("active");
      });
    };
  };
  var data_default = Data;

  // src/3-sequence.js
  var Sequence = class {
    constructor(globalController, container) {
      this.global = globalController;
      this.container = container;
      this.pauseWrapper = this.global.query(".pause-wrap", this.container);
      this.allTxtWrappers = [
        ...this.global.queryAll(".txt-wrap", this.container)
      ];
      this.allIntroTxt = [
        ...this.global.queryAll(".intro-txt-wrap", this.container)
      ];
      this.allActionHeadings = [
        ...this.global.queryAll(".action-heading", this.container)
      ];
      this.allVidWrappers = [
        ...this.global.queryAll(".vid-wrap", this.container)
      ];
      this.allCtrlBtnWrappers = [
        ...this.global.queryAll(".section-wrap-btns", this.container)
      ];
      this.isDropdown = false;
      this.activeSequence = null;
      this.activeSectionTxt = null;
      this.activeVidWrapper = null;
      this.allActiveSequenceSteps = null;
      this.activeCtrlBtnWrapper = null;
      this.sequenceTimer = null;
      this.sequenceEndIsCancelled = false;
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-sequence", this.initSection],
        ["open-sequence-index", this.setActiveSequenceDropdown],
        ["play-ctrl-vid", this.playCtrlBtnVid],
        ["pause-ctrl-vid", this.pauseCtrlVid],
        ["btn-hovered", this.global.toggleBtnHoverClass.bind(this)]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    initSection = (clicked) => {
      this.global.flashBlackout();
      this.activeSequence = clicked.dataset.sequence;
      this.pauseWrapper.classList.remove("active");
      this.global.disablePause();
      this.hideAllIntroText();
      this.hideAllActionHeadings();
      this.setAndShowActiveTxtWrapper();
      this.setAndShowActiveVidWrapper();
      this.allActiveSequenceSteps = /* @__PURE__ */ new Set();
      const steps = this.activeVidWrapper.querySelectorAll(".vid-code");
      steps.forEach((el) => {
        this.allActiveSequenceSteps.add(el.dataset.step);
      });
      this.setAndShowActiveCtrlBtnWrapper();
      this.activeTxtWrapper.querySelector(".intro-txt-wrap").classList.add("active");
      if (!this.isDropdown) {
        this.global.activateCurrentNavLink(clicked);
      } else {
        this.global.activateCurrentNavLink(
          clicked.closest(".nav_menu_link-wrap").querySelector(".nav_menu_link")
        );
        window.dispatchEvent(
          new CustomEvent("dropdownOptClicked", { detail: clicked })
        );
        this.isDropdown = false;
      }
    };
    handleEvent = (trigger, eventAction) => {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(trigger);
      } else {
        console.warn(`No action found for: ${eventAction}`);
      }
    };
    setActiveSequenceDropdown = (clicked) => {
      if ("isDropdownIcon" in clicked.dataset) {
        window.dispatchEvent(
          new CustomEvent("dropdownIconClicked", { detail: clicked })
        );
      } else {
        this.isDropdown = true;
        this.initSection(clicked);
      }
    };
    setAndShowActiveTxtWrapper = () => {
      this.allTxtWrappers.forEach((el) => el.classList.remove("active"));
      this.activeTxtWrapper = this.allTxtWrappers.find(
        (el) => el.dataset.sequence === this.activeSequence
      );
      this.activeTxtWrapper.classList.add("active");
    };
    setAndShowActiveVidWrapper = () => {
      this.allVidWrappers.forEach(function(el) {
        el.classList.remove("active");
        el.querySelectorAll(".vid-code").forEach(function(el2) {
          el2.classList.remove("active");
        });
      });
      this.activeVidWrapper = this.allVidWrappers.find(
        (el) => el.dataset.sequence === this.activeSequence
      );
      this.activeVidWrapper.classList.add("active");
    };
    setActiveSequenceStep = (sequenceStepData) => {
      this.activeVidWrapper.querySelectorAll(".vid-code").forEach((el) => {
        if (el.dataset.step === sequenceStepData) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
        if (el.classList.contains("active") && el.offsetParent !== null)
          this.activeSequenceStep = el.querySelector(".vid");
      });
    };
    setAndShowActiveCtrlBtnWrapper = () => {
      this.allCtrlBtnWrappers.forEach((el) => el.classList.remove("active"));
      this.activeCtrlBtnWrapper = this.allCtrlBtnWrappers.find(
        (el) => el.dataset.sequence === this.activeSequence
      );
      this.activeCtrlBtnWrapper.classList.add("active");
    };
    hideAllIntroText = () => {
      this.allIntroTxt.forEach((el) => {
        el.classList.remove("active");
      });
    };
    hideAllActionHeadings = () => {
      this.allActionHeadings.forEach((el) => {
        el.classList.remove("active");
      });
    };
    playCtrlBtnVid = (clickedCtrlBtn) => {
      this.clearSequenceTimers();
      this.global.disablePause();
      this.global.enablePause();
      this.pauseWrapper.classList.remove("active");
      this.activeTxtWrapper.querySelector(".intro-txt-wrap").classList.remove("active");
      this.activeTxtWrapper.querySelector(".action-heading").classList.add("active");
      this.sequenceEndIsCancelled = false;
      this.setActiveSequenceStep(clickedCtrlBtn.dataset.step);
      this.global.setActiveVid();
      this.global.setStartTime(clickedCtrlBtn.dataset.startTime);
      this.global.setEndTime(clickedCtrlBtn.dataset.endTime);
      this.global.activateCurrentBtn(clickedCtrlBtn);
      this.global.blackout.classList.add("active");
      this.global.playRange();
    };
    pauseCtrlVid = () => {
      this.global.togglePause();
      this.pauseWrapper.classList.toggle("active");
    };
    vidEnd = () => {
      if (this.sequenceEndIsCancelled === false) {
        this.pauseWrapper.classList.remove("active");
        this.global.disablePause(this.pauseWrapper);
        this.global.deactivateCurrentBtns();
        if (LOOP_SEQUENCE_VIDS) {
          let activeStepIndex = [...this.allActiveSequenceSteps].indexOf(
            this.activeSequenceStep.parentElement.dataset.step
          );
          if (activeStepIndex === this.allActiveSequenceSteps.size - 1)
            activeStepIndex = 0;
          else {
            activeStepIndex += 1;
          }
          const nextStepBtn = [
            ...this.activeCtrlBtnWrapper.querySelectorAll(".ctrl-btn")
          ].find(
            (el) => el.dataset.step === [...this.allActiveSequenceSteps][activeStepIndex]
          );
          setTimeout(() => {
            this.playCtrlBtnVid(nextStepBtn);
          }, 200);
        }
      }
    };
    clearSequenceTimers = () => {
      this.sequenceEndIsCancelled = true;
      clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    };
  };
  var sequence_default = Sequence;

  // src/main.js
  document.addEventListener("DOMContentLoaded", () => {
    init();
  });
  var navContainer = query(".nav_component", document);
  var featuresContainer = query(".section.features", document);
  var dataContainer = query(".section.data", document);
  var sequenceContainer = query(".section.sequence", document);
  var navbar = new navbar_default(global_exports, navContainer);
  var features = new features_default(global_exports, featuresContainer);
  var data = new data_default(global_exports, dataContainer);
  var sequence = new sequence_default(global_exports, sequenceContainer);
  var SECTIONS = {
    navbar,
    features,
    data,
    sequence
  };
  navContainer.addEventListener("click", function(e) {
    const clicked = e.target.closest("[data-click-action]");
    if (!clicked) return;
    const activeSection = clicked.dataset.navSection;
    const targetModule = SECTIONS[activeSection];
    const action = clicked.dataset.clickAction;
    if ("isDropdownIcon" in clicked.dataset) {
      targetModule.handleEvent(clicked, action);
      return;
    }
    blackout.classList.add("active");
    setActiveSection(activeSection);
    targetModule.handleEvent(clicked, action);
  });
  navContainer.addEventListener("mouseover", function(e) {
    const hovered = e.target.closest("[data-mouseover-action]");
    if (!hovered) return;
    if (this.currentHover === hovered) return;
    this.currentHover = hovered;
    const action = hovered.dataset.mouseoverAction;
    navbar.handleEvent(hovered, action);
  });
  navContainer.addEventListener("mouseout", function(e) {
    const hovered = e.target.closest("[data-mouseout-action]");
    if (!hovered) return;
    if (hovered.contains(e.relatedTarget)) return;
    this.currentHover = null;
    const action = hovered.dataset.mouseoutAction;
    navbar.handleEvent(hovered, action);
  });
  window.addEventListener("dropdownIconClicked", function(e) {
    const clicked = e.detail;
    if (!clicked) return;
    navbar.toggleNavDropdown(clicked);
  });
  window.addEventListener("dropdownOptClicked", function(e) {
    const clicked = e.detail;
    if (!clicked) return;
    navbar.closeNavDropdown(clicked);
    navbar.closeMobileNavMenu();
  });
  mainWrapper.addEventListener("click", function(e) {
    const clicked = e.target.closest("[data-click-action]");
    if (!clicked) return;
    const activeSection = clicked.closest(".section").dataset.section;
    const targetModule = SECTIONS[activeSection];
    const action = clicked.dataset.clickAction;
    targetModule.handleEvent(clicked, action);
  });
  mainWrapper.addEventListener("mouseover", function(e) {
    const hovered = e.target.closest("[data-mouseover-action]");
    if (!hovered) return;
    if (this.currentHover === hovered) return;
    this.currentHover = hovered;
    const activeSection = hovered.closest(".section").dataset.section;
    const targetModule = SECTIONS[activeSection];
    const action = hovered.dataset.mouseoverAction;
    targetModule.handleEvent(hovered, action);
  });
  mainWrapper.addEventListener("mouseout", function(e) {
    const hovered = e.target.closest("[data-mouseout-action]");
    if (!hovered) return;
    if (hovered.contains(e.relatedTarget)) return;
    this.currentHover = null;
    const activeSection = hovered.closest(".section").dataset.section;
    const targetModule = SECTIONS[activeSection];
    const action = hovered.dataset.mouseoutAction;
    targetModule.handleEvent(hovered, action);
  });
  allVids.forEach(function(el) {
    el.addEventListener("ended", function(e) {
      const endedVid = e.target.closest(".vid");
      if (!endedVid) return;
      const vidSection = endedVid.closest(".section").dataset.section;
      const targetModule = SECTIONS[vidSection];
      targetModule.vidEnd();
    });
  });
  var init = function() {
    setupLazyLoading();
    setWebflowBreakpoint();
    blackout.classList.add("active");
    navContainer.classList.remove("active");
    navbar.allNavDropdowns.forEach(function(el) {
      el.classList.remove("active");
    });
    setActiveSection("features");
    setActiveVid();
    blackout.classList.remove("active");
    features.playFeaturesIntro();
    setTimeout(() => {
      navContainer.classList.add("active");
      features.initSection(null, isIntro = true);
    }, TIMING.UI.START_UI_REVEAL);
  };
  var setupLazyLoading = function() {
    const allLazyVids = document.querySelectorAll(".vid");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        const sources = video.querySelectorAll("source");
        if (entry.isIntersecting) {
          sources.forEach((source) => {
            const dataSrc = source.getAttribute("data-src") || source.src;
            if (dataSrc) {
              source.src = dataSrc;
              source.setAttribute("data-src", dataSrc);
            }
          });
          video.load();
        } else {
          performance.clearMeasures();
          performance.clearResourceTimings();
          performance.clearMarks();
          ResetSection(video.closest(".section"));
          video.pause();
          sources.forEach((source) => {
            const currentSrc = source.src;
            if (currentSrc) {
              source.setAttribute("data-src", currentSrc);
              source.src = "";
              source.removeAttribute("src");
            }
          });
          video.load();
        }
      });
    }, observerOptions);
    allLazyVids.forEach((vid) => videoObserver.observe(vid));
    const ResetSection = function(section) {
      if (!section) return;
      section.querySelectorAll(".vid").forEach(function(el) {
        el.currentTime = 0;
        el.pause();
      });
      deactivateCurrentBtns(section);
    };
  };
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjLzAtY29uZmlnLmpzIiwgIi4uL3NyYy8wLWdsb2JhbC5qcyIsICIuLi9zcmMvMC1uYXZiYXIuanMiLCAiLi4vc3JjLzEtZmVhdHVyZXMuanMiLCAiLi4vc3JjLzItZGF0YS5qcyIsICIuLi9zcmMvMy1zZXF1ZW5jZS5qcyIsICIuLi9zcmMvbWFpbi5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNvbnN0IFRJTUlORyA9IE9iamVjdC5mcmVlemUoe1xyXG4gIFVJOiB7XHJcbiAgICBTVEFSVF9VSV9SRVZFQUw6IDE1MDAsXHJcbiAgICBCTEFDS09VVF9USU1FUjogMjAwLFxyXG4gICAgQkxBQ0tPVVRfV0FJVF9UT19SRVZFQUw6IDUwLFxyXG4gIH0sXHJcbiAgVklERU86IHtcclxuICAgIFZJRF9FTkRfVElNRVI6IDE1MDAsXHJcbiAgfSxcclxufSk7XHJcbmV4cG9ydCBjb25zdCBBU1NFVFMgPSBPYmplY3QuZnJlZXplKHtcclxuICBcInZpZXctMVwiOiB7XHJcbiAgICBkZXNrdG9wOlxyXG4gICAgICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNmEzOTUwNjdkMzYyNzllZTEwMmMwNjBhLzZhMzk1YmRiNTE0MzA0ODU2NTE0MGYwY19lOWNlOGUwYzFhZjliZTQ3YjNkYTY4OWY5NzNkODY2NV9Db21wcyUyMFZpZXctU3RhcnQlMjBTaG90JTIwJTI4d2l0aCUyMGNvbXBzJTI5LndlYnBcIixcclxuICAgIG1vYmlsZTpcclxuICAgICAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzZhMzk1MDY3ZDM2Mjc5ZWUxMDJjMDYwYS82YTM5NWJkYmUyZTdkMjYyNjQ4Yjk4N2FfZTE3YjdhODczZDYyMzkwODE0ZjhhZDU0OWMzNWViNWRfQ29tcHMlMjBWaWV3LVN0YXJ0JTIwU2hvdC1NUCUyMCUyOHdpdGglMjBjb21wcyUyOS53ZWJwXCIsXHJcbiAgfSxcclxuICBcInZpZXctMlwiOiB7XHJcbiAgICBkZXNrdG9wOlxyXG4gICAgICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNjliMDYwNzI2YzljMTBkMGNlYmJmNWYzLzY5YjA2Njc4ODUxNDE5MmRkMTE4ZjkyZV9EYXRhLVZpZXctMi53ZWJwXCIsXHJcbiAgICBtb2JpbGU6XHJcbiAgICAgIFwiaHR0cHM6Ly9jZG4ucHJvZC53ZWJzaXRlLWZpbGVzLmNvbS82OWIwNjA3MjZjOWMxMGQwY2ViYmY1ZjMvNjliMDY2NzhmOTVlM2Y0YjM0N2MyMWE2X0RhdGEtVmlldy0yLU1QLndlYnBcIixcclxuICB9LFxyXG4gIFwidmlldy0zXCI6IHtcclxuICAgIGRlc2t0b3A6XHJcbiAgICAgIFwiaHR0cHM6Ly9jZG4ucHJvZC53ZWJzaXRlLWZpbGVzLmNvbS82OWIwNjA3MjZjOWMxMGQwY2ViYmY1ZjMvNjliMDY2Nzg2NjNkNDgwMGNjNWY5OTM1X0RhdGEtVmlldy0zLndlYnBcIixcclxuICAgIG1vYmlsZTpcclxuICAgICAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY5YjA2MDcyNmM5YzEwZDBjZWJiZjVmMy82OWIwNjY3ODVjNzA5ODkwZjFmMDI2NzlfRGF0YS1WaWV3LTMtTVAud2VicFwiLFxyXG4gIH0sXHJcbn0pO1xyXG5leHBvcnQgY29uc3QgVklFV19TVEFSVF9FTkQgPSBPYmplY3QuZnJlZXplKHtcclxuICBcInZpZXctMVwiOiB7XHJcbiAgICBzdGFydFRpbWU6IDAsXHJcbiAgICBlbmRUaW1lOiAwLFxyXG4gIH0sXHJcbiAgXCJ2aWV3LTJcIjoge1xyXG4gICAgc3RhcnRUaW1lOiAxLjQ4LFxyXG4gICAgZW5kVGltZTogMi42OSxcclxuICB9LFxyXG4gIFwidmlldy0zXCI6IHtcclxuICAgIHN0YXJ0VGltZTogNC40NCxcclxuICAgIGVuZFRpbWU6IDUuNjUsXHJcbiAgfSxcclxufSk7XHJcbmV4cG9ydCBjb25zdCBMT09QX1NFUVVFTkNFX1ZJRFMgPSB0cnVlO1xyXG4iLCAiaW1wb3J0IHsgVElNSU5HIH0gZnJvbSBcIi4vMC1jb25maWdcIjtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbmV4cG9ydCBjb25zdCBtYWluV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi13cmFwcGVyXCIpO1xyXG5leHBvcnQgY29uc3QgYmxhY2tvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJsYWNrb3V0XCIpO1xyXG5leHBvcnQgY29uc3QgYWxsU2VjdGlvbnMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zZWN0aW9uXCIpXTtcclxuZXhwb3J0IGNvbnN0IGFsbFZpZENvZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi52aWQtY29kZVwiKTtcclxuZXhwb3J0IGNvbnN0IGFsbFZpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZFwiKTtcclxuZXhwb3J0IGNvbnN0IG5hdk1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51XCIpO1xyXG5leHBvcnQgY29uc3QgYWxsTmF2TWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5uYXZfbWVudV9saW5rXCIpO1xyXG5leHBvcnQgY29uc3QgbmF2QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZfYnV0dG9uXCIpO1xyXG5leHBvcnQgY29uc3QgX3N0YXRlID0ge1xyXG4gIGFjdGl2ZVNlY3Rpb246IG51bGwsXHJcbiAgYWN0aXZlU2VjdGlvbk5hbWU6IG51bGwsXHJcbiAgYWN0aXZlVmlkOiBudWxsLFxyXG4gIHdlYmZsb3dCcmVha3BvaW50OiBudWxsLFxyXG4gIHN0YXJ0VGltZTogMCxcclxuICBlbmRUaW1lOiAwLFxyXG4gIHBhdXNlRmxhZzogZmFsc2UsXHJcbn07XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9HTE9CQUwgRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL1RoZSAnU3RyaWN0JyBTZWxlY3RvclxyXG5leHBvcnQgY29uc3QgcXVlcnkgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQgPSBkb2N1bWVudCkge1xyXG4gIGNvbnN0IGVsID0gY29udGV4dC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICBpZiAoIWVsKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgIGBDUklUSUNBTCBVSSBFUlJPUjogXCIke3NlbGVjdG9yfVwiIGlzIG1pc3NpbmcgZnJvbSB0aGUgRE9NLmAsXHJcbiAgICApO1xyXG4gIH1cclxuICByZXR1cm4gZWw7XHJcbn07XHJcbi8vVGhlICdTdHJpY3QnIE11bHQtU2VsZWN0b3JcclxuZXhwb3J0IGNvbnN0IHF1ZXJ5QWxsID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBjb250ZXh0ID0gZG9jdW1lbnQpIHtcclxuICBjb25zdCBlbGVtZW50cyA9IGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgaWYgKGVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICBgQ1JJVElDQUwgVUkgRVJST1I6IE5vIGVsZW1lbnRzIG1hdGNoaW5nIFwiJHtzZWxlY3Rvcn1cIiBmb3VuZC5gLFxyXG4gICAgKTtcclxuICB9XHJcbiAgcmV0dXJuIGVsZW1lbnRzO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0VmlkVHlwZSA9IGZ1bmN0aW9uICh2aWRlbykge1xyXG4gIHJldHVybiB2aWRlby5jbG9zZXN0KFwiLnNlY3Rpb25cIikuY2xhc3NMaXN0WzFdO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZmxhc2hCbGFja291dCA9IGZ1bmN0aW9uICgpIHtcclxuICBibGFja291dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgYmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9LCBUSU1JTkcuVUkuQkxBQ0tPVVRfVElNRVIpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZW5hYmxlTmF2TGlua3NBbmROYXZCdG4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgbmF2TWVudS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XHJcbiAgbmF2QnRuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IGFjdGl2YXRlQ3VycmVudE5hdkxpbmsgPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xyXG4gIGRlYWN0aXZhdGVDdXJyZW50TmF2TGlua3MoKTtcclxuICBjbGlja2VkLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50XCIpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZGVhY3RpdmF0ZUN1cnJlbnROYXZMaW5rcyA9IGZ1bmN0aW9uICgpIHtcclxuICBhbGxOYXZNZW51TGlua3MuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJjdXJyZW50XCIpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0QWN0aXZlU2VjdGlvbiA9IGZ1bmN0aW9uIChzZWN0aW9uTmFtZSwgaW5kZXgpIHtcclxuICBkZWFjdGl2YXRlQWxsU2VjdGlvbnMoKTtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbk5hbWUgPSBzZWN0aW9uTmFtZTtcclxuICBpZiAoIWluZGV4KSBpbmRleCA9IDA7XHJcbiAgY29uc3QgbWF0Y2hlcyA9IGFsbFNlY3Rpb25zLmZpbHRlcihcclxuICAgIChlbCkgPT4gZWwuZGF0YXNldC5zZWN0aW9uID09PSBzZWN0aW9uTmFtZSxcclxuICApO1xyXG4gIGNvbnN0IHRhcmdldCA9IG1hdGNoZXNbaW5kZXhdO1xyXG4gIGlmICh0YXJnZXQpIHtcclxuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgX3N0YXRlLmFjdGl2ZVNlY3Rpb24gPSB0YXJnZXQ7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgZGVhY3RpdmF0ZUFsbFNlY3Rpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gIGFsbFNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0QWN0aXZlVmlkID0gZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiBfc3RhdGUuYWN0aXZlVmlkO1xyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0QWN0aXZlVmlkID0gZnVuY3Rpb24gKGFjdGl2ZVZpZFdyYXAsIGFjdGl2ZVNlcXVlbmNlU3RlcCkge1xyXG4gIGlmIChfc3RhdGUuYWN0aXZlVmlkKSB7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnNyYyA9IFwiXCI7XHJcbiAgfVxyXG4gIGlmIChhY3RpdmVWaWRXcmFwICYmIGFjdGl2ZVNlcXVlbmNlU3RlcCA9PT0gbnVsbCkge1xyXG4gICAgYWN0aXZlVmlkV3JhcC5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlXCIpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGlmIChlbC5xdWVyeVNlbGVjdG9yKFwiLnZpZFwiKS5vZmZzZXRQYXJlbnQgIT09IG51bGwpIHtcclxuICAgICAgICBfc3RhdGUuYWN0aXZlVmlkID0gZWwucXVlcnlTZWxlY3RvcihcIi52aWRcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0gZWxzZSBpZiAoYWN0aXZlVmlkV3JhcCAmJiBhY3RpdmVTZXF1ZW5jZVN0ZXApIHtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQgPSBhY3RpdmVTZXF1ZW5jZVN0ZXA7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsbFZpZENvZGVzLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGlmIChlbC5xdWVyeVNlbGVjdG9yKFwiLnZpZFwiKS5vZmZzZXRQYXJlbnQgIT09IG51bGwpIHtcclxuICAgICAgICBfc3RhdGUuYWN0aXZlVmlkID0gZWwucXVlcnlTZWxlY3RvcihcIi52aWRcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGdldFdlYmZsb3dCcmVha3BvaW50ID0gZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiBfc3RhdGUud2ViZmxvd0JyZWFrcG9pbnQ7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRXZWJmbG93QnJlYWtwb2ludCA9IGZ1bmN0aW9uICgpIHtcclxuICBjb25zdCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gIGlmICh3aWR0aCA8IDQ4MCkgX3N0YXRlLndlYmZsb3dCcmVha3BvaW50ID0gXCJtb2JpbGVQb3J0cmFpdFwiO1xyXG4gIGlmICh3aWR0aCA+PSA0ODApIF9zdGF0ZS53ZWJmbG93QnJlYWtwb2ludCA9IFwibW9iaWxlTGFuZHNjYXBlXCI7XHJcbiAgaWYgKHdpZHRoID49IDc2OCkgX3N0YXRlLndlYmZsb3dCcmVha3BvaW50ID0gXCJ0YWJsZXRcIjtcclxuICBpZiAod2lkdGggPj0gOTkyKSBfc3RhdGUud2ViZmxvd0JyZWFrcG9pbnQgPSBcImRlc2t0b3BcIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNldFN0YXJ0VGltZSA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xyXG4gIF9zdGF0ZS5zdGFydFRpbWUgPSBuZXdWYWx1ZTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNldEVuZFRpbWUgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcclxuICBfc3RhdGUuZW5kVGltZSA9IG5ld1ZhbHVlO1xyXG59O1xyXG5leHBvcnQgY29uc3QgY2xlYXJTZWN0aW9uVmlkU3JjID0gZnVuY3Rpb24gKCkge1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5zcmMgPSBcIlwiO1xyXG4gICAgZWwubG9hZCgpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcmVzZXRBbGxTZWN0aW9uVmlkcyA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgZWwucGF1c2UoKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHBsYXlSYW5nZSA9IGZ1bmN0aW9uICh2aWRlb0N1cnJlbnRUaW1lKSB7XHJcbiAgaWYgKCFfc3RhdGUuYWN0aXZlVmlkKSByZXR1cm47XHJcbiAgY29uc3QgdmlkQ29kZSA9IF9zdGF0ZS5hY3RpdmVWaWQucGFyZW50RWxlbWVudDtcclxuICBjb25zdCB0YXJnZXRTdGFydCA9IHZpZGVvQ3VycmVudFRpbWUgfHwgX3N0YXRlLnN0YXJ0VGltZTtcclxuICAvLyBDTEVBTlVQOiBLaWxsIGFueSBwcmV2aW91cyBtb25pdG9yIGJlZm9yZSBzdGFydGluZyBhIG5ldyBvbmVcclxuICBpZiAoX3N0YXRlLmFjdGl2ZVZpZC5fY3VycmVudE1vbml0b3IpIHtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJ0aW1ldXBkYXRlXCIsXHJcbiAgICAgIF9zdGF0ZS5hY3RpdmVWaWQuX2N1cnJlbnRNb25pdG9yLFxyXG4gICAgKTtcclxuICB9XHJcbiAgLy8gMS4gSElEREVOIFNUQVRFOiBJbnN0YW50IGhpZGUgdG8gcmV2ZWFsIHZpZC13cmFwIGJhY2tncm91bmQgaW1hZ2VcclxuICBpZiAodmlkQ29kZSkgdmlkQ29kZS5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcbiAgLy8gQ2xlYXIgYW55IGV4aXN0aW5nIHRpbWV1cGRhdGUgbW9uaXRvcnNcclxuICBfc3RhdGUuYWN0aXZlVmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICBcInRpbWV1cGRhdGVcIixcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQuX2N1cnJlbnRNb25pdG9yLFxyXG4gICk7XHJcbiAgY29uc3QgbW9uaXRvclRpbWUgPSAoKSA9PiB7XHJcbiAgICBpZiAoX3N0YXRlLmFjdGl2ZVZpZC5jdXJyZW50VGltZSA+PSBfc3RhdGUuZW5kVGltZSAtIDAuMTUpIHtcclxuICAgICAgX3N0YXRlLmFjdGl2ZVZpZC5yZW1vdmVFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLCBtb25pdG9yVGltZSk7XHJcbiAgICAgIF9zdGF0ZS5hY3RpdmVWaWQucGF1c2UoKTtcclxuICAgICAgX3N0YXRlLmFjdGl2ZVZpZC5jdXJyZW50VGltZSA9IF9zdGF0ZS5lbmRUaW1lO1xyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiZW5kZWRcIikpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgX3N0YXRlLmFjdGl2ZVZpZC5fY3VycmVudE1vbml0b3IgPSBtb25pdG9yVGltZTtcclxuICAvLyBTb3VyY2UgaGFuZGxpbmdcclxuICBjb25zdCBzb3VyY2UgPSBfc3RhdGUuYWN0aXZlVmlkLnF1ZXJ5U2VsZWN0b3IoXCJzb3VyY2VcIik7XHJcbiAgY29uc3QgZGF0YVNyYyA9IHNvdXJjZSA/IHNvdXJjZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiKSA6IG51bGw7XHJcbiAgaWYgKGRhdGFTcmMgJiYgX3N0YXRlLmFjdGl2ZVZpZC5zcmMgIT09IGRhdGFTcmMpIHtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQucGF1c2UoKTtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQuc3JjID0gZGF0YVNyYztcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQubG9hZCgpO1xyXG4gIH1cclxuICBjb25zdCBzdGFydFBsYXliYWNrU2VxdWVuY2UgPSBhc3luYyAoKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkLmN1cnJlbnRUaW1lID0gdGFyZ2V0U3RhcnQ7XHJcblxyXG4gICAgICAvLyAyLiBUSEUgRkFJTC1TQUZFIFJFVkVBTFxyXG4gICAgICAvLyBXZSBwb2xsIGZvciBwaHlzaWNhbCBwbGF5aGVhZCBtb3ZlbWVudC4gT25jZSBpdCBtb3ZlcyxcclxuICAgICAgLy8gdGhlIFwiYmxhY2sgYnVmZmVyXCIgaXMgZ3VhcmFudGVlZCB0byBiZSBnb25lLlxyXG4gICAgICBjb25zdCBwb2xsRm9yRnJhbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQuY3VycmVudFRpbWUgPiB0YXJnZXRTdGFydCkge1xyXG4gICAgICAgICAgLy8gRG91YmxlIFJBRiBpcyB0aGUgZmluYWwgZ3VhcmQgZm9yIHRoZSBHUFUgcGFpbnQgY3ljbGVcclxuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHZpZENvZGUpIHZpZENvZGUuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgYmxhY2tvdXQgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICBibGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIV9zdGF0ZS5hY3RpdmVWaWQucGF1c2VkKSB7XHJcbiAgICAgICAgICAvLyBJZiBzdGlsbCBhdCB0YXJnZXRTdGFydCBidXQgcGxheWluZywgY2hlY2sgYWdhaW4gbmV4dCBmcmFtZVxyXG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBvbGxGb3JGcmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICAvLyAzLiBTVEFSVFxyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsIG1vbml0b3JUaW1lKTtcclxuICAgICAgYXdhaXQgX3N0YXRlLmFjdGl2ZVZpZC5wbGF5KCk7XHJcbiAgICAgIHBvbGxGb3JGcmFtZSgpOyAvLyBTdGFydCBjaGVja2luZyBmb3IgdGhlIGZpcnN0IHJlYWwgZnJhbWVcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS53YXJuKFwiUGxheWJhY2sgZmFpbGVkOlwiLCBlKTtcclxuICAgICAgLy8gRmFsbGJhY2s6IHNob3cgdmlkZW8gYW55d2F5IGlmIHBsYXkoKSBmYWlscyAoZS5nLiBhdXRwbGF5IGJsb2NrZWQpXHJcbiAgICAgIGlmICh2aWRDb2RlKSB2aWRDb2RlLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgIH1cclxuICB9O1xyXG4gIC8vIFdhaXQgZm9yIGRhdGEgKHJlYWR5U3RhdGUgMyBpcyBIQVZFX0ZVVFVSRV9EQVRBKVxyXG4gIGlmIChfc3RhdGUuYWN0aXZlVmlkLnJlYWR5U3RhdGUgPj0gMykge1xyXG4gICAgc3RhcnRQbGF5YmFja1NlcXVlbmNlKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQuYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXlcIiwgc3RhcnRQbGF5YmFja1NlcXVlbmNlLCB7XHJcbiAgICAgIG9uY2U6IHRydWUsXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkaXNhYmxlUGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgX3N0YXRlLnBhdXNlRmxhZyA9IGZhbHNlO1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIucGF1c2Utd3JhcFwiKS5zdHlsZS5wb2ludGVyRXZlbnRzID1cclxuICAgIFwibm9uZVwiO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZW5hYmxlUGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5wYXVzZS13cmFwXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPVxyXG4gICAgXCJhdXRvXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCB0b2dnbGVQYXVzZSA9IGZ1bmN0aW9uICgpIHtcclxuICBpZiAoX3N0YXRlLnBhdXNlRmxhZykge1xyXG4gICAgX3N0YXRlLnBhdXNlRmxhZyA9IGZhbHNlO1xyXG4gICAgX3N0YXRlLmFjdGl2ZVZpZC5wbGF5KCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIF9zdGF0ZS5wYXVzZUZsYWcgPSB0cnVlO1xyXG4gICAgX3N0YXRlLmFjdGl2ZVZpZC5wYXVzZSgpO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGVuYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi13cmFwLWJ0bnNcIikuc3R5bGUucG9pbnRlckV2ZW50cyA9XHJcbiAgICBcImF1dG9cIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRpc2FibGVTZWN0aW9uQ3RybEJ0bkV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPVxyXG4gICAgXCJub25lXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRBY3RpdmVDdHJsQnRuV3JhcHBlciA9IGZ1bmN0aW9uIChidG5XcmFwcGVySW5kZXgpIHtcclxuICBkZWFjdGl2YXRlQWxsQ3RybEJ0bldyYXBwZXJzKCk7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb25cclxuICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpXHJcbiAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGluZGV4KSB7XHJcbiAgICAgIGlmIChpbmRleCA9PT0gYnRuV3JhcHBlckluZGV4KSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWFjdGl2YXRlQWxsQ3RybEJ0bldyYXBwZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uXHJcbiAgICAucXVlcnlTZWxlY3RvckFsbChcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKVxyXG4gICAgLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHRvZ2dsZUJ0bkhvdmVyQ2xhc3MgPSBmdW5jdGlvbiAoYnRuKSB7XHJcbiAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQgJiYgX3N0YXRlLndlYmZsb3dCcmVha3BvaW50ID09PSBcImRlc2t0b3BcIilcclxuICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwiaG92ZXJlZFwiKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGFjdGl2YXRlQ3VycmVudEJ0biA9IGZ1bmN0aW9uIChidG4pIHtcclxuICBkZWFjdGl2YXRlQ3VycmVudEJ0bnMoKTtcclxuICBzZXRUaW1lb3V0KCgpID0+IGJ0bi5jbGFzc0xpc3QuYWRkKFwiY3VycmVudFwiKSwgNTApO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZGVhY3RpdmF0ZUN1cnJlbnRCdG5zID0gZnVuY3Rpb24gKHNlY3Rpb24pIHtcclxuICBpZiAoIXNlY3Rpb24pIHNlY3Rpb24gPSBfc3RhdGUuYWN0aXZlU2VjdGlvbjtcclxuICBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY3RybC1idG5cIikuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJjdXJyZW50XCIpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0TG9jYWxJbmRleCA9IGZ1bmN0aW9uIChidG4sIGJ0bkNsYXNzLCBhbGxCdG5zV3JhcHBlcikge1xyXG4gIGxldCBsb2NhbEluZGV4O1xyXG4gIGNvbnN0IGFsbEJ0bnMgPSBidG5cclxuICAgIC5jbG9zZXN0KGAuJHthbGxCdG5zV3JhcHBlcn1gKVxyXG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2J0bkNsYXNzfWApO1xyXG4gIGFsbEJ0bnMuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGluZGV4KSB7XHJcbiAgICBpZiAoZWwgPT09IGJ0bikgbG9jYWxJbmRleCA9IGluZGV4O1xyXG4gIH0pO1xyXG4gIHJldHVybiBsb2NhbEluZGV4O1xyXG59O1xyXG4iLCAiY2xhc3MgTmF2YmFyIHtcclxuICBjb25zdHJ1Y3RvcihnbG9iYWxDb250cm9sbGVyLCBjb250YWluZXIpIHtcclxuICAgIHRoaXMuZ2xvYmFsID0gZ2xvYmFsQ29udHJvbGxlcjtcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyOyAvL1RoZSByb290IGZvciB0aGlzIG1vZHVsZVxyXG4gICAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgdGhpcy5uYXZNZW51ID0gdGhpcy5nbG9iYWwucXVlcnkoXCIubmF2X21lbnVcIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy5uYXZCdG4gPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5uYXZfYnV0dG9uXCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMuYWxsTmF2TGlua3MgPSB0aGlzLmdsb2JhbC5xdWVyeUFsbChcIi5uYXZfbWVudV9saW5rXCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMuYWxsTmF2TGlua3NXaXRoRHJvcGRvd24gPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKCdbZGF0YS1uYXYtc2VjdGlvbj1cInNlcXVlbmNlXCJdJywgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWxsTmF2RHJvcGRvd25zID0gW1xyXG4gICAgICAuLi50aGlzLmdsb2JhbC5xdWVyeUFsbChcIi5uYXZfbWVudV9kcm9wZG93blwiLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5ldmVudE1hcCA9IG5ldyBNYXAoW1xyXG4gICAgICBbXCJvcGVuLW5hdi1kcm9wZG93blwiLCB0aGlzLm9wZW5OYXZEcm9wZG93bl0sXHJcbiAgICAgIFtcImNsb3NlLW5hdi1kcm9wZG93blwiLCB0aGlzLmNsb3NlTmF2RHJvcGRvd25dLFxyXG4gICAgICBbXCJ0b2dnbGUtbmF2LWRyb3Bkb3duXCIsIHRoaXMudG9nZ2xlTmF2RHJvcGRvd25dLFxyXG4gICAgXSk7XHJcbiAgfVxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvL0ZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgaGFuZGxlRXZlbnQgPSBmdW5jdGlvbiAodHJpZ2dlciwgZXZlbnRBY3Rpb24pIHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuZXZlbnRNYXAuZ2V0KGV2ZW50QWN0aW9uKTtcclxuICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgYWN0aW9uKHRyaWdnZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKGBObyBhY3Rpb24gZm91bmQgZm9yOiAke2V2ZW50QWN0aW9ufWApO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgY2xvc2VOYXZNZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hbGxOYXZEcm9wZG93bnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgY2xvc2VNb2JpbGVOYXZNZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKFwibmF2TWVudU9wZW5cIiBpbiB0aGlzLm5hdk1lbnUuZGF0YXNldCkgdGhpcy5uYXZCdG4uY2xpY2soKTtcclxuICAgIHRoaXMubmF2TWVudS5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51X2Ryb3Bkb3duXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBvcGVuTmF2RHJvcGRvd24gPSBmdW5jdGlvbiAodHJpZ2dlcikge1xyXG4gICAgdHJpZ2dlclxyXG4gICAgICAuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIilcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIilcclxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBjbG9zZU5hdkRyb3Bkb3duID0gZnVuY3Rpb24gKHRyaWdnZXIpIHtcclxuICAgIHRyaWdnZXJcclxuICAgICAgLmNsb3Nlc3QoXCIubmF2X21lbnVfbGluay13cmFwXCIpXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51X2Ryb3Bkb3duXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgdG9nZ2xlTmF2RHJvcGRvd24gPSBmdW5jdGlvbiAodHJpZ2dlcikge1xyXG4gICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50TmF2TGluayh0cmlnZ2VyKTtcclxuICAgIHRyaWdnZXJcclxuICAgICAgLmNsb3Nlc3QoXCIubmF2X21lbnVfbGluay13cmFwXCIpXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51X2Ryb3Bkb3duXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgTmF2YmFyO1xyXG4iLCAiaW1wb3J0IHsgVElNSU5HIH0gZnJvbSBcIi4vMC1jb25maWdcIjtcclxuXHJcbmNsYXNzIEZlYXR1cmVzIHtcclxuICBjb25zdHJ1Y3RvcihnbG9iYWxDb250cm9sbGVyLCBjb250YWluZXIpIHtcclxuICAgIHRoaXMuZ2xvYmFsID0gZ2xvYmFsQ29udHJvbGxlcjtcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyOyAvL1RoZSByb290IGZvciB0aGlzIG1vZHVsZVxyXG4gICAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgdGhpcy5mZWF0dXJlc0JsYWNrb3V0ID0gdGhpcy5nbG9iYWwucXVlcnkoXCIuYmxhY2tvdXRcIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFRleHQgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLnR4dC13cmFwXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmZlYXR1cmVzSW50cm9WaWREaXYgPSB0aGlzLmdsb2JhbC5xdWVyeShcclxuICAgICAgXCIudmlkLXdyYXAuaW50cm9cIixcclxuICAgICAgdGhpcy5jb250YWluZXIsXHJcbiAgICApO1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFZpZFdyYXBzID0gdGhpcy5nbG9iYWwucXVlcnlBbGwoXHJcbiAgICAgIFwiLnZpZC13cmFwXCIsXHJcbiAgICAgIHRoaXMuY29udGFpbmVyLFxyXG4gICAgKTtcclxuICAgIHRoaXMuZmVhdHVyZXNWaWREaXYgPSB0aGlzLmdsb2JhbC5xdWVyeShcclxuICAgICAgXCIudmlkLXdyYXAuZmVhdHVyZXNcIixcclxuICAgICAgdGhpcy5jb250YWluZXIsXHJcbiAgICApO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIgPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5wYXVzZS13cmFwXCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMuZmVhdHVyZXNDdHJsQnRucyA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFxyXG4gICAgICBcIi5zZWN0aW9uLXdyYXAtYnRuc1wiLFxyXG4gICAgICB0aGlzLmNvbnRhaW5lcixcclxuICAgICk7XHJcbiAgICB0aGlzLmFjdGl2ZUZlYXR1cmUgPSBudWxsO1xyXG4gICAgdGhpcy5mZWF0dXJlc1RpbWVyID0gbnVsbDtcclxuICAgIHRoaXMuZmVhdHVyZXNFbmRpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5ldmVudE1hcCA9IG5ldyBNYXAoW1xyXG4gICAgICBbXCJvcGVuLWZlYXR1cmVzXCIsIHRoaXMuaW5pdFNlY3Rpb25dLFxyXG4gICAgICBbXCJwbGF5LWN0cmwtdmlkXCIsIHRoaXMucGxheUN0cmxCdG5WaWRdLFxyXG4gICAgICBbXCJwYXVzZS1jdHJsLXZpZFwiLCB0aGlzLnBhdXNlQ3RybFZpZF0sXHJcbiAgICAgIFtcImJ0bi1ob3ZlcmVkXCIsIHRoaXMuZ2xvYmFsLnRvZ2dsZUJ0bkhvdmVyQ2xhc3MuYmluZCh0aGlzKV0sXHJcbiAgICBdKTtcclxuICB9XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBpbml0U2VjdGlvbiA9IChjbGlja2VkLCBpc0ludHJvKSA9PiB7XHJcbiAgICB0aGlzLmdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc0JsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKCk7XHJcbiAgICBpZiAoY2xpY2tlZCkge1xyXG4gICAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKGNsaWNrZWQpO1xyXG4gICAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdsb2JhbC5lbmFibGVTZWN0aW9uQ3RybEJ0bkV2ZW50cygpO1xyXG4gICAgdGhpcy5oaWRlQWxsVGV4dCgpO1xyXG4gICAgdGhpcy5zaG93SW50cm9UZXh0KCk7XHJcbiAgICB0aGlzLmZlYXR1cmVzQ3RybEJ0bnMuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGlmIChpc0ludHJvKSByZXR1cm47XHJcbiAgICB0aGlzLnBsYXlGZWF0dXJlc0ludHJvKCk7XHJcbiAgfTtcclxuICBoYW5kbGVFdmVudCA9ICh0cmlnZ2VyLCBldmVudEFjdGlvbikgPT4ge1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5ldmVudE1hcC5nZXQoZXZlbnRBY3Rpb24pO1xyXG4gICAgaWYgKGFjdGlvbikge1xyXG4gICAgICBhY3Rpb24odHJpZ2dlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oYE5vIGFjdGlvbiBmb3VuZCBmb3I6ICR7ZXZlbnRBY3Rpb259YCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBoaWRlQWxsVGV4dCA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxUZXh0LmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIHNob3dJbnRyb1RleHQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmZlYXR1cmVzQWxsVGV4dFxyXG4gICAgICAuZmluZCgoZWwpID0+IGVsLmRhdGFzZXQudGV4dENvbnRlbnQgPT09IFwiaW50cm9cIilcclxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93RmVhdHVyZVRleHQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmZlYXR1cmVzQWxsVGV4dFxyXG4gICAgICAuZmluZCgoZWwpID0+IGVsLmRhdGFzZXQudGV4dENvbnRlbnQgPT09IHRoaXMuYWN0aXZlRmVhdHVyZSlcclxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93RmVhdHVyZXNJbnRyb1ZpZERpdiA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNJbnRyb1ZpZERpdi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgaGlkZUZlYXR1cmVzSW50cm9WaWREaXYgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmZlYXR1cmVzSW50cm9WaWREaXYuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dGZWF0dXJlc1ZpZERpdiA9IChmZWF0dXJlKSA9PiB7XHJcbiAgICB0aGlzLmZlYXR1cmVzQWxsVmlkV3JhcHMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyhcImludHJvXCIpKSByZXR1cm47XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIGlmIChlbC5kYXRhc2V0LmZlYXR1cmUgPT09IGZlYXR1cmUpIHtcclxuICAgICAgICB0aGlzLmFjaXR2ZVZpZFdyYXAgPSBlbDtcclxuICAgICAgICB0aGlzLmFjaXR2ZVZpZFdyYXAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuICBoaWRlRmVhdHVyZXNWaWREaXYgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmZlYXR1cmVzQWxsVmlkV3JhcHMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyhcImludHJvXCIpKSByZXR1cm47XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIHBsYXlGZWF0dXJlc0ludHJvID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0JsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnNob3dGZWF0dXJlc0ludHJvVmlkRGl2KCk7XHJcbiAgICB0aGlzLmhpZGVGZWF0dXJlc1ZpZERpdigpO1xyXG4gICAgLy8gTG9naWM6IEZpbmQgdGhlIG9uZSB0aGF0IGlzbid0IGhpZGRlbiAoZGlzcGxheTogbm9uZSlcclxuICAgIGNvbnN0IGFsbEludHJvcyA9XHJcbiAgICAgIHRoaXMuZmVhdHVyZXNJbnRyb1ZpZERpdi5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlLWludHJvXCIpO1xyXG4gICAgYWxsSW50cm9zLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIC8vIG9mZnNldFBhcmVudCBpcyBudWxsIGlmIHRoZSBlbGVtZW50IGlzIGRpc3BsYXk6IG5vbmVcclxuICAgICAgaWYgKGVsLm9mZnNldFBhcmVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnN0IHZpZCA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIudmlkLWludHJvXCIpO1xyXG4gICAgICAgIGlmICh2aWQpIHtcclxuICAgICAgICAgIHZpZC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICB2aWQucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuICBwbGF5Q3RybEJ0blZpZCA9IChjbGlja2VkQ3RybEJ0bikgPT4ge1xyXG4gICAgdGhpcy5jbGVhckZlYXR1cmVzVGltZXJzKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmVuYWJsZVBhdXNlKCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5oaWRlRmVhdHVyZXNJbnRyb1ZpZERpdigpO1xyXG4gICAgdGhpcy5zaG93RmVhdHVyZXNWaWREaXYoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5mZWF0dXJlKTtcclxuICAgIHRoaXMuYWN0aXZlRmVhdHVyZSA9IGNsaWNrZWRDdHJsQnRuLmRhdGFzZXQuZmVhdHVyZTtcclxuICAgIHRoaXMuZmVhdHVyZXNFbmRpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5oaWRlQWxsVGV4dCgpO1xyXG4gICAgdGhpcy5zaG93RmVhdHVyZVRleHQoKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEFjdGl2ZVZpZCh0aGlzLmFjaXR2ZVZpZFdyYXAsIG51bGwpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0U3RhcnRUaW1lKGNsaWNrZWRDdHJsQnRuLmRhdGFzZXQuc3RhcnRUaW1lKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEVuZFRpbWUoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5lbmRUaW1lKTtcclxuICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudEJ0bihjbGlja2VkQ3RybEJ0bik7XHJcbiAgICB0aGlzLmdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5nbG9iYWwucGxheVJhbmdlKCk7XHJcbiAgfTtcclxuICBwYXVzZUN0cmxWaWQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmdsb2JhbC50b2dnbGVQYXVzZSgpO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHZpZEVuZCA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLmZlYXR1cmVzRW5kaXNDYW5jZWxsZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVTZWN0aW9uQ3RybEJ0bkV2ZW50cygpO1xyXG4gICAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UoKTtcclxuICAgICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5mZWF0dXJlc1RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5mZWF0dXJlc0JsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmhpZGVBbGxUZXh0KCk7XHJcbiAgICAgICAgICB0aGlzLnNob3dJbnRyb1RleHQoKTtcclxuICAgICAgICAgIHRoaXMuZ2xvYmFsLnJlc2V0QWxsU2VjdGlvblZpZHMoKTtcclxuICAgICAgICAgIHRoaXMuZ2xvYmFsLmRlYWN0aXZhdGVDdXJyZW50QnRucygpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwuZW5hYmxlTmF2TGlua3NBbmROYXZCdG4oKTtcclxuICAgICAgICAgIHRoaXMuZ2xvYmFsLmVuYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzKCk7XHJcbiAgICAgICAgICB0aGlzLnBsYXlGZWF0dXJlc0ludHJvKCk7XHJcbiAgICAgICAgfSwgVElNSU5HLlVJLkJMQUNLT1VUX1dBSVRfVE9fUkVWRUFMKTtcclxuICAgICAgfSwgVElNSU5HLlZJREVPLlZJRF9FTkRfVElNRVIpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgY2xlYXJGZWF0dXJlc1RpbWVycyA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNFbmRpc0NhbmNlbGxlZCA9IHRydWU7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5mZWF0dXJlc1RpbWVyKTtcclxuICAgIHRoaXMuZmVhdHVyZXNUaW1lciA9IG51bGw7XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBGZWF0dXJlcztcclxuIiwgImltcG9ydCB7IEFTU0VUUywgVklFV19TVEFSVF9FTkQgfSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG5jb25zdCBIT01FX1ZJRVcgPSBcInZpZXctMVwiO1xyXG5jbGFzcyBEYXRhIHtcclxuICBjb25zdHJ1Y3RvcihnbG9iYWxDb250cm9sbGVyLCBjb250YWluZXIpIHtcclxuICAgIHRoaXMuZ2xvYmFsID0gZ2xvYmFsQ29udHJvbGxlcjtcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyOyAvL1RoZSByb290IGZvciB0aGlzIG1vZHVsZVxyXG4gICAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgdGhpcy5pbnRyb1RleHQgPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5zZWN0aW9uLXdyYXAtdHh0XCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMudmlld09wdHNCdG4gPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5vcHRzLW1lbnUtYnRuXCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMudmlld09wdHNNZW51ID0gdGhpcy5nbG9iYWwucXVlcnkoXCIub3B0cy1kcm9wZG93blwiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLmFsbFZpZXdPcHRCdG5zID0gW1xyXG4gICAgICAuLi50aGlzLmdsb2JhbC5xdWVyeUFsbChcIi5vcHRzLW1lbnUtbGlua1wiLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5kaW1tZXIgPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5kaW1tZXJcIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy50eHRJbWdCdG4gPSB0aGlzLmdsb2JhbC5xdWVyeShcIi50eHQtaW1nLWJ0blwiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyID0gdGhpcy5nbG9iYWwucXVlcnkoXHJcbiAgICAgIFwiLnNlY3Rpb24td3JhcC1jb21wLWRhdGFcIixcclxuICAgICAgdGhpcy5jb250YWluZXIsXHJcbiAgICApO1xyXG4gICAgdGhpcy5hbGxEYXRhV3JhcHBlcnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLnNlY3Rpb24td3JhcC1jb21wLWRhdGFcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWxsRGF0YSA9IFsuLi50aGlzLmdsb2JhbC5xdWVyeUFsbChcIi5jb21wLWRhdGEtd3JhcFwiLCB0aGlzLmNvbnRhaW5lcildO1xyXG4gICAgdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLnNlY3Rpb24td3JhcC1idG5zXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmFjdGl2ZVZpZXdCdG4gPSBudWxsO1xyXG4gICAgdGhpcy5hY3RpdmVWaWV3ID0gXCJ2aWV3LTFcIjtcclxuICAgIHRoaXMubGFzdEFjdGl2ZVZpZXcgPSB7IHZpZXc6IFwidmlldy0xXCIsIHN0YXJ0VGltZTogMCwgZW5kVGltZTogMCB9O1xyXG4gICAgdGhpcy52aWV3VmlkRmxhZyA9IGZhbHNlO1xyXG4gICAgdGhpcy52aWV3Q2hhaW5GbGFnID0gZmFsc2U7XHJcbiAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQgPSBudWxsO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlciA9IHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzWzBdO1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSAwO1xyXG4gICAgdGhpcy5lbmRUaW1lID0gMDtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0biA9IG51bGw7XHJcbiAgICB0aGlzLmV2ZW50TWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcIm9wZW4tZGF0YVwiLCB0aGlzLmluaXRTZWN0aW9uXSxcclxuICAgICAgW1wicGxheS1jdHJsLXZpZFwiLCB0aGlzLnNldEFuZFBsYXlDdHJsQnRuVmlkXSxcclxuICAgICAgW1wicGxheS12aWV3LXZpZFwiLCB0aGlzLnNldEFuZFBsYXlWaWV3VmlkXSxcclxuICAgICAgW1wiYmFjay10by12aWV3XCIsIHRoaXMuYmFja1RvVmlld0Zyb21Db21wXSxcclxuICAgICAgW1wib3Blbi12aWV3LW9wdHMtbWVudVwiLCB0aGlzLnNob3dWaWV3T3B0c01lbnVdLFxyXG4gICAgICBbXCJjbG9zZS12aWV3LW9wdHMtbWVudVwiLCB0aGlzLmhpZGVWaWV3T3B0c01lbnVdLFxyXG4gICAgICBbXCJ0b2dnbGUtaW1nLXR4dFwiLCB0aGlzLnNob3dDb21wSW1hZ2VPclRleHRdLFxyXG4gICAgICBbXCJidG4taG92ZXJlZFwiLCB0aGlzLmdsb2JhbC50b2dnbGVCdG5Ib3ZlckNsYXNzLmJpbmQodGhpcyldLFxyXG4gICAgXSk7XHJcbiAgICB0aGlzLmFzc2V0c01hcCA9IG5ldyBNYXAoW1xyXG4gICAgICBbXCJ2aWV3LTFcIiwgQVNTRVRTW1widmlldy0xXCJdLmRlc2t0b3BdLFxyXG4gICAgICBbXCJ2aWV3LTEtbXBcIiwgQVNTRVRTW1widmlldy0xXCJdLm1vYmlsZV0sXHJcbiAgICAgIFtcInZpZXctMlwiLCBBU1NFVFNbXCJ2aWV3LTJcIl0uZGVza3RvcF0sXHJcbiAgICAgIFtcInZpZXctMi1tcFwiLCBBU1NFVFNbXCJ2aWV3LTJcIl0ubW9iaWxlXSxcclxuICAgICAgW1widmlldy0zXCIsIEFTU0VUU1tcInZpZXctM1wiXS5kZXNrdG9wXSxcclxuICAgICAgW1widmlldy0zLW1wXCIsIEFTU0VUU1tcInZpZXctM1wiXS5tb2JpbGVdLFxyXG4gICAgXSk7XHJcbiAgfVxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvL0ZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgaW5pdFNlY3Rpb24gPSAoY2xpY2tlZCkgPT4ge1xyXG4gICAgdGhpcy5nbG9iYWwuZmxhc2hCbGFja291dCgpO1xyXG4gICAgLy9zZXR0aW5nIFVJIGFuZCBsb2dpYy4uLlxyXG4gICAgdGhpcy5kaW1tZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMudHh0T3JJbWcgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLnR4dEltZ0J0bi50ZXh0Q29udGVudCA9IFwiaW1hZ2VcIjtcclxuICAgIHRoaXMuaGlkZUJhY2tCdG4oKTtcclxuICAgIHRoaXMuaGlkZUFsbERhdGEoKTtcclxuICAgIHRoaXMucmVzZXRBbGxEYXRhU2hlZXRzKCk7XHJcbiAgICB0aGlzLmludHJvVGV4dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5zaG93Q3RybEJ0bldyYXBwZXIoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudE5hdkxpbmsoY2xpY2tlZCk7XHJcbiAgICAvL3NldHRpbmcgdmlkIGVsZW1lbnQuLi5cclxuICAgIHRoaXMuZ2xvYmFsLmNsZWFyU2VjdGlvblZpZFNyYygpOyAvL3JldmVhbCBwb3N0ZXJcclxuICAgIHRoaXMuc2V0TGFzdEFjdGl2ZVZpZXcoKTsgLy9mb3IgYmNrZ3JuZCBpbWdcclxuICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICB9O1xyXG4gIGhhbmRsZUV2ZW50ID0gKHRyaWdnZXIsIGV2ZW50QWN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmV2ZW50TWFwLmdldChldmVudEFjdGlvbik7XHJcbiAgICBpZiAoYWN0aW9uKSB7XHJcbiAgICAgIGFjdGlvbih0cmlnZ2VyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgTm8gYWN0aW9uIGZvdW5kIGZvcjogJHtldmVudEFjdGlvbn1gKTtcclxuICAgIH1cclxuICB9O1xyXG4gIHNob3dWaWV3T3B0c01lbnUgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnZpZXdPcHRzTWVudS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgaGlkZVZpZXdPcHRzTWVudSA9ICgpID0+IHtcclxuICAgIHRoaXMudmlld09wdHNNZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93Q29tcEltYWdlT3JUZXh0ID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMudHh0T3JJbWcgPT09IFwiaW1hZ2VcIikge1xyXG4gICAgICB0aGlzLnR4dE9ySW1nID0gXCJ0ZXh0XCI7XHJcbiAgICAgIHRoaXMuZGltbWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIHRoaXMuYWN0aXZlRGF0YVNoZWV0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmFjdGl2ZURhdGFTaGVldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlci5xdWVyeVNlbGVjdG9yKFwiLnR4dC1pbWctYnRuXCIpLnRleHRDb250ZW50ID1cclxuICAgICAgdGhpcy50eHRPckltZztcclxuICB9O1xyXG4gIGhpZGVBbGxEYXRhID0gKCkgPT4ge1xyXG4gICAgdGhpcy5kZWFjdGl2YXRlQWxsRGF0YVdyYXBwZXJzKCk7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXAtZGF0YS13cmFwXCIpXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pO1xyXG4gIH07XHJcbiAgc2hvd0RhdGEgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29tcC1kYXRhLXdyYXBcIikuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgaWYgKGVsLmRhdGFzZXQuY29tcCA9PT0gdGhpcy5hY3RpdmVDdHJsQnRuLmRhdGFzZXQuY29tcClcclxuICAgICAgICB0aGlzLmFjdGl2ZURhdGFTaGVldCA9IGVsO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFTaGVldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgaGlkZUJhY2tCdG4gPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmN0cmwtYnRuLWJhY2tcIilcclxuICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93QmFja0J0biA9ICgpID0+IHtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXJcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY3RybC1idG5cIilcclxuICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgfSk7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmN0cmwtYnRuLWJhY2tcIilcclxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICByZXNldEFsbERhdGFTaGVldHMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFsbERhdGEuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICBlbC5xdWVyeVNlbGVjdG9yKFwiLmNvbXAtZGF0YS1ib2R5LXdyYXBcIikuc2Nyb2xsKDAsIDApO1xyXG4gICAgICBlbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIHNldExhc3RBY3RpdmVWaWV3ID0gKG5ld1ZhbHVlKSA9PiB7XHJcbiAgICBpZiAoIW5ld1ZhbHVlKSB7XHJcbiAgICAgIHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyA9IHRoaXMuYWN0aXZlVmlldztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyA9IG5ld1ZhbHVlO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgc2V0QWN0aXZlVmlldyA9ICgpID0+IHtcclxuICAgIHRoaXMuYWN0aXZlVmlldyA9IHRoaXMuYWN0aXZlVmlld0J0bi5kYXRhc2V0LnZpZXc7XHJcbiAgfTtcclxuICB2aWV3QmFja1RvU3RhcnQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IFZJRVdfU1RBUlRfRU5EW3RoaXMubGFzdEFjdGl2ZVZpZXcudmlld10uc3RhcnRUaW1lO1xyXG4gICAgdGhpcy5lbmRUaW1lID0gVklFV19TVEFSVF9FTkRbdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3XS5lbmRUaW1lO1xyXG4gIH07XHJcbiAgc2V0Vmlld1ZpZFN0YXJ0QW5kRW5kID0gKCkgPT4ge1xyXG4gICAgdGhpcy52aWV3VmlkRmxhZyA9IHRydWU7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyAhPT0gSE9NRV9WSUVXICYmXHJcbiAgICAgIHRoaXMuYWN0aXZlVmlldyA9PT0gSE9NRV9WSUVXXHJcbiAgICApIHtcclxuICAgICAgdGhpcy52aWV3QmFja1RvU3RhcnQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgIT09IEhPTUVfVklFVyAmJlxyXG4gICAgICB0aGlzLmFjdGl2ZVZpZXcgIT09IEhPTUVfVklFV1xyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMudmlld0NoYWluRmxhZyA9IHRydWU7XHJcbiAgICAgIHRoaXMudmlld0JhY2tUb1N0YXJ0KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhcnRUaW1lID0gdGhpcy5hY3RpdmVWaWV3QnRuLmRhdGFzZXQuc3RhcnRUaW1lO1xyXG4gICAgdGhpcy5lbmRUaW1lID0gdGhpcy5hY3RpdmVWaWV3QnRuLmRhdGFzZXQuZW5kVGltZTtcclxuICB9O1xyXG4gIHNldERhdGFWaWRTdGFydEFuZEVuZCA9ICgpID0+IHtcclxuICAgIHRoaXMudmlld1ZpZEZsYWcgPSBmYWxzZTtcclxuICAgIHRoaXMuaGlkZUFsbERhdGEoKTtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gdGhpcy5hY3RpdmVDdHJsQnRuLmRhdGFzZXQuc3RhcnRUaW1lO1xyXG4gICAgdGhpcy5lbmRUaW1lID0gdGhpcy5hY3RpdmVDdHJsQnRuLmRhdGFzZXQuZW5kVGltZTtcclxuICB9O1xyXG4gIHNldERhdGFWaWRQb3N0ZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhY3RpdmVWaWQgPSB0aGlzLmdsb2JhbC5nZXRBY3RpdmVWaWQoKTtcclxuICAgIGlmICghYWN0aXZlVmlkKSByZXR1cm47XHJcbiAgICBsZXQgbWFwS2V5ID0gdGhpcy5hY3RpdmVWaWV3O1xyXG4gICAgaWYgKGFjdGl2ZVZpZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm1wXCIpKSBtYXBLZXkgKz0gXCItbXBcIjtcclxuICAgIGNvbnN0IGFzc2V0ID0gdGhpcy5hc3NldHNNYXAuZ2V0KG1hcEtleSk7XHJcbiAgICBhY3RpdmVWaWQuc2V0QXR0cmlidXRlKFwicG9zdGVyXCIsIGFzc2V0KTtcclxuICB9O1xyXG4gIHNldERhdGFWaWRCYWNrZ3JvdW5kSW1nID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYWN0aXZlVmlkID0gdGhpcy5nbG9iYWwuZ2V0QWN0aXZlVmlkKCk7XHJcbiAgICBpZiAoIWFjdGl2ZVZpZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgYWN0aXZlVmlkV3JhcCA9IGFjdGl2ZVZpZC5jbG9zZXN0KFwiLnZpZC13cmFwXCIpO1xyXG4gICAgbGV0IG1hcEtleSA9IHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldztcclxuICAgIGlmIChhY3RpdmVWaWQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJtcFwiKSkgbWFwS2V5ICs9IFwiLW1wXCI7XHJcbiAgICBjb25zdCBhc3NldCA9IHRoaXMuYXNzZXRzTWFwLmdldChtYXBLZXkpO1xyXG4gICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHthc3NldH1cIilgO1xyXG4gIH07XHJcbiAgZGVhY3RpdmF0ZUFsbERhdGFXcmFwcGVycyA9ICgpID0+IHtcclxuICAgIHRoaXMuYWxsRGF0YVdyYXBwZXJzLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIHNldEFuZFBsYXlWaWV3VmlkID0gKGNsaWNrZWRWaWV3T3B0c0J0bikgPT4ge1xyXG4gICAgLy9yZXR1cm4gaWYgY2xpY2tlZCB2aWV3IHNhbWUgYXMgY3VycmVudCB2aWV3XHJcbiAgICBpZiAoY2xpY2tlZFZpZXdPcHRzQnRuLmRhdGFzZXQudmlldyA9PT0gdGhpcy5hY3RpdmVWaWV3KSByZXR1cm47XHJcbiAgICAvL3NldHRpbmcgVUkgYW5kIGxvZ2ljLi4uXHJcbiAgICB0aGlzLnZpZXdPcHRzTWVudS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy52aWV3T3B0c0J0bi50ZXh0Q29udGVudCA9IGNsaWNrZWRWaWV3T3B0c0J0bi50ZXh0Q29udGVudDtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIgPSB0aGlzLmFsbERhdGFXcmFwcGVycy5maW5kKFxyXG4gICAgICAoZWwpID0+IGVsLmRhdGFzZXQudmlldyA9PT0gY2xpY2tlZFZpZXdPcHRzQnRuLmRhdGFzZXQudmlldyxcclxuICAgICk7XHJcbiAgICB0aGlzLmFjdGl2ZVZpZXdCdG4gPSBjbGlja2VkVmlld09wdHNCdG47XHJcbiAgICAvL3NldHRpbmcgdmlkIGVsZW1lbnQuLi5cclxuICAgIHRoaXMuZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG4gICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gICAgdGhpcy5zZXRBY3RpdmVWaWV3KCk7IC8vZm9yIHRoZSBwb3N0ZXJcclxuICAgIHRoaXMuc2V0QWN0aXZlQ3RybEJ0bldyYXBwZXIoKTtcclxuICAgIC8vcGxheSB2aWRcclxuICAgIHRoaXMuc2V0Vmlld1ZpZFN0YXJ0QW5kRW5kKCk7XHJcbiAgICB0aGlzLnBsYXlEYXRhVmlkKCk7XHJcbiAgfTtcclxuICBzZXRBbmRQbGF5Q3RybEJ0blZpZCA9IChjbGlja2VkQ3RybEJ0bikgPT4ge1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0QWN0aXZlVmlkKCk7XHJcbiAgICB0aGlzLnNldExhc3RBY3RpdmVWaWV3KCk7IC8vZm9yIHRoZSBiY2tncm5kIGltZyB0byBjaGFuZ2UgdG8gY29tcCB2aWQgc3RhcnRzXHJcbiAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgICB0aGlzLmhpZGVBY3RpdmVDdHJsQnRuV3JhcHBlcigpO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuID0gY2xpY2tlZEN0cmxCdG47XHJcbiAgICAvL3BsYXlcclxuICAgIHRoaXMuc2V0RGF0YVZpZFN0YXJ0QW5kRW5kKHRoaXMuYWN0aXZlQ3RybEJ0bik7XHJcbiAgICB0aGlzLnBsYXlEYXRhVmlkKCk7IC8vcmVtb3ZlcyBibGFja291dCBpbiBnbG9iYWwucGxheVJhbmdlXHJcbiAgfTtcclxuICBwbGF5RGF0YVZpZCA9ICgpID0+IHtcclxuICAgIHRoaXMuaW50cm9UZXh0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRTdGFydFRpbWUodGhpcy5zdGFydFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0RW5kVGltZSh0aGlzLmVuZFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwucGxheVJhbmdlKCk7XHJcbiAgfTtcclxuICB2aWRFbmQgPSAoKSA9PiB7XHJcbiAgICBpZiAodGhpcy52aWV3VmlkRmxhZyAmJiAhdGhpcy52aWV3Q2hhaW5GbGFnKSB7XHJcbiAgICAgIHRoaXMuc2V0TGFzdEFjdGl2ZVZpZXcoKTtcclxuICAgICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gICAgICB0aGlzLnNldERhdGFWaWRQb3N0ZXIoKTsgLy9kb25lIGhlcmUgc28gcG9zdGVyIGRvZXNuJ3QgYXBwZWFyIGVhcmxpZXJcclxuICAgICAgdGhpcy5zaG93QWN0aXZlQ3RybEJ0bldyYXBwZXIoKTtcclxuICAgICAgdGhpcy5pbnRyb1RleHQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5nbG9iYWwuZW5hYmxlTmF2TGlua3NBbmROYXZCdG4oKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy52aWV3Q2hhaW5GbGFnKSB7XHJcbiAgICAgIHRoaXMudmlld0NoYWluRmxhZyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnNldExhc3RBY3RpdmVWaWV3KEhPTUVfVklFVyk7XHJcbiAgICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgICAgdGhpcy5zZXRWaWV3VmlkU3RhcnRBbmRFbmQoKTtcclxuICAgICAgdGhpcy5wbGF5RGF0YVZpZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kaW1tZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlclxyXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnR4dC1pbWctYnRuXCIpXHJcbiAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIHRoaXMuc2hvd0RhdGEoKTtcclxuICAgICAgdGhpcy5zaG93QmFja0J0bigpO1xyXG4gICAgICAvL3NldCBiY2tncm5kIGltZyB0byBibGFjayB0byBwcmV2ZW50IGZsYXNoIG9mIGltYWdlIHdoZW4gY2hhbmdpbmcgbmF2XHJcbiAgICAgIGNvbnN0IGFjdGl2ZVZpZFdyYXAgPSB0aGlzLmdsb2JhbC5nZXRBY3RpdmVWaWQoKS5jbG9zZXN0KFwiLnZpZC13cmFwXCIpO1xyXG4gICAgICBpZiAoYWN0aXZlVmlkV3JhcCkge1xyXG4gICAgICAgIGFjdGl2ZVZpZFdyYXAuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJub25lXCI7XHJcbiAgICAgICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG4gIGJhY2tUb1ZpZXdGcm9tQ29tcCA9ICgpID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLmZsYXNoQmxhY2tvdXQoKTtcclxuICAgIC8vc2V0dGluZyBVSSBhbmQgbG9naWMuLi5cclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKS50ZXh0Q29udGVudCA9IFwiaW1hZ2VcIjtcclxuICAgIHRoaXMudHh0T3JJbWcgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnR4dC1pbWctYnRuXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5oaWRlQWxsRGF0YSgpO1xyXG4gICAgdGhpcy5yZXNldEFsbERhdGFTaGVldHMoKTtcclxuICAgIHRoaXMuZGltbWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmludHJvVGV4dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5oaWRlQmFja0J0bigpO1xyXG4gICAgdGhpcy5zaG93Q3RybEJ0bldyYXBwZXIoKTtcclxuXHJcbiAgICAvL3NldHRpbmcgdmlkIGVsZW1lbnQuLi5cclxuICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmNsZWFyU2VjdGlvblZpZFNyYygpOyAvL3JldmVhbCBwb3N0ZXJcclxuICB9O1xyXG4gIGhpZGVBY3RpdmVDdHJsQnRuV3JhcHBlciA9ICgpID0+IHtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dBY3RpdmVDdHJsQnRuV3JhcHBlciA9ICgpID0+IHtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dDdHJsQnRuV3JhcHBlciA9ICgpID0+IHtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIucXVlcnlTZWxlY3RvckFsbChcIi5jdHJsLWJ0blwiKS5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzZXRBY3RpdmVDdHJsQnRuV3JhcHBlciA9ICgpID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLmRlYWN0aXZhdGVBbGxDdHJsQnRuV3JhcHBlcnMoKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIgPSB0aGlzLmFsbEN0cmxCdG5XcmFwcGVycy5maW5kKFxyXG4gICAgICAoZWwpID0+IGVsLmRhdGFzZXQudmlldyA9PT0gdGhpcy5hY3RpdmVWaWV3LFxyXG4gICAgKTtcclxuICB9O1xyXG4gIGRlYWN0aXZhdGVBbGxDdHJsQnRuV3JhcHBlcnMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFsbEN0cmxCdG5XcmFwcGVycy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBEYXRhO1xyXG4iLCAiaW1wb3J0IHsgTE9PUF9TRVFVRU5DRV9WSURTIH0gZnJvbSBcIi4vMC1jb25maWdcIjtcclxuXHJcbmNsYXNzIFNlcXVlbmNlIHtcclxuICBjb25zdHJ1Y3RvcihnbG9iYWxDb250cm9sbGVyLCBjb250YWluZXIpIHtcclxuICAgIHRoaXMuZ2xvYmFsID0gZ2xvYmFsQ29udHJvbGxlcjtcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyOyAvL1RoZSByb290IGZvciB0aGlzIG1vZHVsZVxyXG4gICAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIgPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5wYXVzZS13cmFwXCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMuYWxsVHh0V3JhcHBlcnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLnR4dC13cmFwXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmFsbEludHJvVHh0ID0gW1xyXG4gICAgICAuLi50aGlzLmdsb2JhbC5xdWVyeUFsbChcIi5pbnRyby10eHQtd3JhcFwiLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hbGxBY3Rpb25IZWFkaW5ncyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIuYWN0aW9uLWhlYWRpbmdcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWxsVmlkV3JhcHBlcnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLnZpZC13cmFwXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmFsbEN0cmxCdG5XcmFwcGVycyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIuc2VjdGlvbi13cmFwLWJ0bnNcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuaXNEcm9wZG93biA9IGZhbHNlO1xyXG4gICAgdGhpcy5hY3RpdmVTZXF1ZW5jZSA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZVNlY3Rpb25UeHQgPSBudWxsO1xyXG4gICAgdGhpcy5hY3RpdmVWaWRXcmFwcGVyID0gbnVsbDtcclxuICAgIHRoaXMuYWxsQWN0aXZlU2VxdWVuY2VTdGVwcyA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyID0gbnVsbDtcclxuICAgIHRoaXMuc2VxdWVuY2VUaW1lciA9IG51bGw7XHJcbiAgICB0aGlzLnNlcXVlbmNlRW5kSXNDYW5jZWxsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZXZlbnRNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgW1wib3Blbi1zZXF1ZW5jZVwiLCB0aGlzLmluaXRTZWN0aW9uXSxcclxuICAgICAgW1wib3Blbi1zZXF1ZW5jZS1pbmRleFwiLCB0aGlzLnNldEFjdGl2ZVNlcXVlbmNlRHJvcGRvd25dLFxyXG4gICAgICBbXCJwbGF5LWN0cmwtdmlkXCIsIHRoaXMucGxheUN0cmxCdG5WaWRdLFxyXG4gICAgICBbXCJwYXVzZS1jdHJsLXZpZFwiLCB0aGlzLnBhdXNlQ3RybFZpZF0sXHJcbiAgICAgIFtcImJ0bi1ob3ZlcmVkXCIsIHRoaXMuZ2xvYmFsLnRvZ2dsZUJ0bkhvdmVyQ2xhc3MuYmluZCh0aGlzKV0sXHJcbiAgICBdKTtcclxuICB9XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBpbml0U2VjdGlvbiA9IChjbGlja2VkKSA9PiB7XHJcbiAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICB0aGlzLmFjdGl2ZVNlcXVlbmNlID0gY2xpY2tlZC5kYXRhc2V0LnNlcXVlbmNlO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5oaWRlQWxsSW50cm9UZXh0KCk7XHJcbiAgICB0aGlzLmhpZGVBbGxBY3Rpb25IZWFkaW5ncygpO1xyXG4gICAgdGhpcy5zZXRBbmRTaG93QWN0aXZlVHh0V3JhcHBlcigpO1xyXG4gICAgdGhpcy5zZXRBbmRTaG93QWN0aXZlVmlkV3JhcHBlcigpO1xyXG4gICAgdGhpcy5hbGxBY3RpdmVTZXF1ZW5jZVN0ZXBzID0gbmV3IFNldCgpO1xyXG4gICAgY29uc3Qgc3RlcHMgPSB0aGlzLmFjdGl2ZVZpZFdyYXBwZXIucXVlcnlTZWxlY3RvckFsbChcIi52aWQtY29kZVwiKTtcclxuICAgIHN0ZXBzLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIHRoaXMuYWxsQWN0aXZlU2VxdWVuY2VTdGVwcy5hZGQoZWwuZGF0YXNldC5zdGVwKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZXRBbmRTaG93QWN0aXZlQ3RybEJ0bldyYXBwZXIoKTtcclxuICAgIHRoaXMuYWN0aXZlVHh0V3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5pbnRyby10eHQtd3JhcFwiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGlmICghdGhpcy5pc0Ryb3Bkb3duKSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudE5hdkxpbmsoY2xpY2tlZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKFxyXG4gICAgICAgIGNsaWNrZWQuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIikucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudV9saW5rXCIpLFxyXG4gICAgICApO1xyXG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcclxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJkcm9wZG93bk9wdENsaWNrZWRcIiwgeyBkZXRhaWw6IGNsaWNrZWQgfSksXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuaXNEcm9wZG93biA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgaGFuZGxlRXZlbnQgPSAodHJpZ2dlciwgZXZlbnRBY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuZXZlbnRNYXAuZ2V0KGV2ZW50QWN0aW9uKTtcclxuICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgYWN0aW9uKHRyaWdnZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKGBObyBhY3Rpb24gZm91bmQgZm9yOiAke2V2ZW50QWN0aW9ufWApO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgc2V0QWN0aXZlU2VxdWVuY2VEcm9wZG93biA9IChjbGlja2VkKSA9PiB7XHJcbiAgICBpZiAoXCJpc0Ryb3Bkb3duSWNvblwiIGluIGNsaWNrZWQuZGF0YXNldCkge1xyXG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcclxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJkcm9wZG93bkljb25DbGlja2VkXCIsIHsgZGV0YWlsOiBjbGlja2VkIH0pLFxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc0Ryb3Bkb3duID0gdHJ1ZTtcclxuICAgICAgdGhpcy5pbml0U2VjdGlvbihjbGlja2VkKTtcclxuICAgIH1cclxuICB9O1xyXG4gIHNldEFuZFNob3dBY3RpdmVUeHRXcmFwcGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxUeHRXcmFwcGVycy5mb3JFYWNoKChlbCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKSk7XHJcbiAgICB0aGlzLmFjdGl2ZVR4dFdyYXBwZXIgPSB0aGlzLmFsbFR4dFdyYXBwZXJzLmZpbmQoXHJcbiAgICAgIChlbCkgPT4gZWwuZGF0YXNldC5zZXF1ZW5jZSA9PT0gdGhpcy5hY3RpdmVTZXF1ZW5jZSxcclxuICAgICk7XHJcbiAgICB0aGlzLmFjdGl2ZVR4dFdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNldEFuZFNob3dBY3RpdmVWaWRXcmFwcGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxWaWRXcmFwcGVycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICBlbC5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsMikge1xyXG4gICAgICAgIGVsMi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hY3RpdmVWaWRXcmFwcGVyID0gdGhpcy5hbGxWaWRXcmFwcGVycy5maW5kKFxyXG4gICAgICAoZWwpID0+IGVsLmRhdGFzZXQuc2VxdWVuY2UgPT09IHRoaXMuYWN0aXZlU2VxdWVuY2UsXHJcbiAgICApO1xyXG4gICAgdGhpcy5hY3RpdmVWaWRXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzZXRBY3RpdmVTZXF1ZW5jZVN0ZXAgPSAoc2VxdWVuY2VTdGVwRGF0YSkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVWaWRXcmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGVcIikuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgaWYgKGVsLmRhdGFzZXQuc3RlcCA9PT0gc2VxdWVuY2VTdGVwRGF0YSkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpICYmIGVsLm9mZnNldFBhcmVudCAhPT0gbnVsbClcclxuICAgICAgICB0aGlzLmFjdGl2ZVNlcXVlbmNlU3RlcCA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIudmlkXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBzZXRBbmRTaG93QWN0aXZlQ3RybEJ0bldyYXBwZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFsbEN0cmxCdG5XcmFwcGVycy5mb3JFYWNoKChlbCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKSk7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyID0gdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnMuZmluZChcclxuICAgICAgKGVsKSA9PiBlbC5kYXRhc2V0LnNlcXVlbmNlID09PSB0aGlzLmFjdGl2ZVNlcXVlbmNlLFxyXG4gICAgKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVBbGxJbnRyb1RleHQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFsbEludHJvVHh0LmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIGhpZGVBbGxBY3Rpb25IZWFkaW5ncyA9ICgpID0+IHtcclxuICAgIHRoaXMuYWxsQWN0aW9uSGVhZGluZ3MuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgcGxheUN0cmxCdG5WaWQgPSAoY2xpY2tlZEN0cmxCdG4pID0+IHtcclxuICAgIHRoaXMuY2xlYXJTZXF1ZW5jZVRpbWVycygpO1xyXG4gICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5lbmFibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYWN0aXZlVHh0V3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5pbnRyby10eHQtd3JhcFwiKVxyXG4gICAgICAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYWN0aXZlVHh0V3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5hY3Rpb24taGVhZGluZ1wiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuc2VxdWVuY2VFbmRJc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zZXRBY3RpdmVTZXF1ZW5jZVN0ZXAoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5zdGVwKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0U3RhcnRUaW1lKGNsaWNrZWRDdHJsQnRuLmRhdGFzZXQuc3RhcnRUaW1lKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEVuZFRpbWUoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5lbmRUaW1lKTtcclxuICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudEJ0bihjbGlja2VkQ3RybEJ0bik7XHJcbiAgICB0aGlzLmdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5nbG9iYWwucGxheVJhbmdlKCk7XHJcbiAgfTtcclxuICBwYXVzZUN0cmxWaWQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmdsb2JhbC50b2dnbGVQYXVzZSgpO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHZpZEVuZCA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLnNlcXVlbmNlRW5kSXNDYW5jZWxsZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSh0aGlzLnBhdXNlV3JhcHBlcik7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmRlYWN0aXZhdGVDdXJyZW50QnRucygpO1xyXG4gICAgICBpZiAoTE9PUF9TRVFVRU5DRV9WSURTKSB7XHJcbiAgICAgICAgbGV0IGFjdGl2ZVN0ZXBJbmRleCA9IFsuLi50aGlzLmFsbEFjdGl2ZVNlcXVlbmNlU3RlcHNdLmluZGV4T2YoXHJcbiAgICAgICAgICB0aGlzLmFjdGl2ZVNlcXVlbmNlU3RlcC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuc3RlcCxcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChhY3RpdmVTdGVwSW5kZXggPT09IHRoaXMuYWxsQWN0aXZlU2VxdWVuY2VTdGVwcy5zaXplIC0gMSlcclxuICAgICAgICAgIGFjdGl2ZVN0ZXBJbmRleCA9IDA7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICBhY3RpdmVTdGVwSW5kZXggKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbmV4dFN0ZXBCdG4gPSBbXHJcbiAgICAgICAgICAuLi50aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY3RybC1idG5cIiksXHJcbiAgICAgICAgXS5maW5kKFxyXG4gICAgICAgICAgKGVsKSA9PlxyXG4gICAgICAgICAgICBlbC5kYXRhc2V0LnN0ZXAgPT09XHJcbiAgICAgICAgICAgIFsuLi50aGlzLmFsbEFjdGl2ZVNlcXVlbmNlU3RlcHNdW2FjdGl2ZVN0ZXBJbmRleF0sXHJcbiAgICAgICAgKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMucGxheUN0cmxCdG5WaWQobmV4dFN0ZXBCdG4pO1xyXG4gICAgICAgIH0sIDIwMCk7IC8vZGVsYXkgdG8gc3RhYmlsaXplIGVsZW1lbnRzIGJlZm9yZSBwbGF5XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG4gIGNsZWFyU2VxdWVuY2VUaW1lcnMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnNlcXVlbmNlRW5kSXNDYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuc2VxdWVuY2VUaW1lcik7XHJcbiAgICB0aGlzLnNlcXVlbmNlVGltZXIgPSBudWxsO1xyXG4gIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgU2VxdWVuY2U7XHJcbiIsICJpbXBvcnQgeyBUSU1JTkcgfSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG5pbXBvcnQgKiBhcyBnbG9iYWwgZnJvbSBcIi4vMC1nbG9iYWxcIjtcclxuaW1wb3J0IE5hdmJhckNsYXNzIGZyb20gXCIuLzAtbmF2YmFyXCI7XHJcbmltcG9ydCBGZWF0dXJlc0NsYXNzIGZyb20gXCIuLzEtZmVhdHVyZXNcIjtcclxuaW1wb3J0IERhdGFDbGFzcyBmcm9tIFwiLi8yLWRhdGFcIjtcclxuaW1wb3J0IFNlcXVlbmNlQ2xhc3MgZnJvbSBcIi4vMy1zZXF1ZW5jZVwiO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vaW5pdCBjYWxsIChmdW5jdGlvbiBhdCBib3R0b20pLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gIGluaXQoKTtcclxufSk7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5jb25zdCBuYXZDb250YWluZXIgPSBnbG9iYWwucXVlcnkoXCIubmF2X2NvbXBvbmVudFwiLCBkb2N1bWVudCk7XHJcbmNvbnN0IGZlYXR1cmVzQ29udGFpbmVyID0gZ2xvYmFsLnF1ZXJ5KFwiLnNlY3Rpb24uZmVhdHVyZXNcIiwgZG9jdW1lbnQpO1xyXG5jb25zdCBkYXRhQ29udGFpbmVyID0gZ2xvYmFsLnF1ZXJ5KFwiLnNlY3Rpb24uZGF0YVwiLCBkb2N1bWVudCk7XHJcbmNvbnN0IHNlcXVlbmNlQ29udGFpbmVyID0gZ2xvYmFsLnF1ZXJ5KFwiLnNlY3Rpb24uc2VxdWVuY2VcIiwgZG9jdW1lbnQpO1xyXG5jb25zdCBuYXZiYXIgPSBuZXcgTmF2YmFyQ2xhc3MoZ2xvYmFsLCBuYXZDb250YWluZXIpO1xyXG5jb25zdCBmZWF0dXJlcyA9IG5ldyBGZWF0dXJlc0NsYXNzKGdsb2JhbCwgZmVhdHVyZXNDb250YWluZXIpO1xyXG5jb25zdCBkYXRhID0gbmV3IERhdGFDbGFzcyhnbG9iYWwsIGRhdGFDb250YWluZXIpO1xyXG5jb25zdCBzZXF1ZW5jZSA9IG5ldyBTZXF1ZW5jZUNsYXNzKGdsb2JhbCwgc2VxdWVuY2VDb250YWluZXIpO1xyXG5jb25zdCBTRUNUSU9OUyA9IHtcclxuICBuYXZiYXI6IG5hdmJhcixcclxuICBmZWF0dXJlczogZmVhdHVyZXMsXHJcbiAgZGF0YTogZGF0YSxcclxuICBzZXF1ZW5jZTogc2VxdWVuY2UsXHJcbn07XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9FVkVOVCBERUxFR0FUSU9OLU5BVi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5uYXZDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1jbGljay1hY3Rpb25dXCIpO1xyXG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xyXG4gIGNvbnN0IGFjdGl2ZVNlY3Rpb24gPSBjbGlja2VkLmRhdGFzZXQubmF2U2VjdGlvbjtcclxuICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1thY3RpdmVTZWN0aW9uXTtcclxuICBjb25zdCBhY3Rpb24gPSBjbGlja2VkLmRhdGFzZXQuY2xpY2tBY3Rpb247XHJcbiAgLy8xLiBHZW5lcmljIGNsZWFudXBcclxuICBpZiAoXCJpc0Ryb3Bkb3duSWNvblwiIGluIGNsaWNrZWQuZGF0YXNldCkge1xyXG4gICAgLy8gUG9seW1vcnBoaWMgY2FsbCBvbmx5IC0ganVzdCB0b2dnbGluZyBkcm9wZG93blxyXG4gICAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGNsaWNrZWQsIGFjdGlvbik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIC8vZG9udCBmbGFzaCBpZiBvbmx5IGNsaWNraW5nIGRyb3Bkb3duXHJcbiAgZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgLy8yLiBTdGF0ZSB1cGRhdGVcclxuICBnbG9iYWwuc2V0QWN0aXZlU2VjdGlvbihhY3RpdmVTZWN0aW9uKTtcclxuICAvLzMuIFBvbHltb3JwaGljIGNhbGxcclxuICB0YXJnZXRNb2R1bGUuaGFuZGxlRXZlbnQoY2xpY2tlZCwgYWN0aW9uKTtcclxufSk7XHJcbm5hdkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgaG92ZXJlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tb3VzZW92ZXItYWN0aW9uXVwiKTtcclxuICBpZiAoIWhvdmVyZWQpIHJldHVybjtcclxuICBpZiAodGhpcy5jdXJyZW50SG92ZXIgPT09IGhvdmVyZWQpIHJldHVybjsgLy8gRXhpdCBpZiB3ZSBhcmUgYWxyZWFkeSBob3ZlcmluZyBpdFxyXG4gIHRoaXMuY3VycmVudEhvdmVyID0gaG92ZXJlZDtcclxuICBjb25zdCBhY3Rpb24gPSBob3ZlcmVkLmRhdGFzZXQubW91c2VvdmVyQWN0aW9uO1xyXG4gIG5hdmJhci5oYW5kbGVFdmVudChob3ZlcmVkLCBhY3Rpb24pO1xyXG59KTtcclxubmF2Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbW91c2VvdXQtYWN0aW9uXVwiKTtcclxuICBpZiAoIWhvdmVyZWQpIHJldHVybjtcclxuICAvLyBJZiB0aGUgbW91c2UgbW92ZWQgdG8gYSBjaGlsZCBvZiB0aGUgc2FtZSBidXR0b24sIGRvbid0IHRyaWdnZXIgdGhlIFwiRXhpdFwiXHJcbiAgaWYgKGhvdmVyZWQuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkgcmV0dXJuO1xyXG4gIHRoaXMuY3VycmVudEhvdmVyID0gbnVsbDtcclxuICBjb25zdCBhY3Rpb24gPSBob3ZlcmVkLmRhdGFzZXQubW91c2VvdXRBY3Rpb247XHJcbiAgbmF2YmFyLmhhbmRsZUV2ZW50KGhvdmVyZWQsIGFjdGlvbik7XHJcbn0pO1xyXG4vL0N1c3RvbSBldmVudDogbmF2IGRyb3Bkb3duIGljb24gY2xpY2tlZFxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3Bkb3duSWNvbkNsaWNrZWRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBjbGlja2VkID0gZS5kZXRhaWw7XHJcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XHJcbiAgbmF2YmFyLnRvZ2dsZU5hdkRyb3Bkb3duKGNsaWNrZWQpO1xyXG59KTtcclxuLy9DdXN0b20gZXZlbnQ6IG5hdiBkcm9wZG93biBvcHQgY2xpY2tlZFxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3Bkb3duT3B0Q2xpY2tlZFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGNsaWNrZWQgPSBlLmRldGFpbDtcclxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcclxuICBuYXZiYXIuY2xvc2VOYXZEcm9wZG93bihjbGlja2VkKTtcclxuICBuYXZiYXIuY2xvc2VNb2JpbGVOYXZNZW51KCk7XHJcbn0pO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vRVZFTlQgREVMRUdBVElPTi1NQUlOIEJPRFkuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuZ2xvYmFsLm1haW5XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtY2xpY2stYWN0aW9uXVwiKTtcclxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcclxuICBjb25zdCBhY3RpdmVTZWN0aW9uID0gY2xpY2tlZC5jbG9zZXN0KFwiLnNlY3Rpb25cIikuZGF0YXNldC5zZWN0aW9uO1xyXG4gIGNvbnN0IHRhcmdldE1vZHVsZSA9IFNFQ1RJT05TW2FjdGl2ZVNlY3Rpb25dO1xyXG4gIGNvbnN0IGFjdGlvbiA9IGNsaWNrZWQuZGF0YXNldC5jbGlja0FjdGlvbjtcclxuICB0YXJnZXRNb2R1bGUuaGFuZGxlRXZlbnQoY2xpY2tlZCwgYWN0aW9uKTtcclxufSk7XHJcbmdsb2JhbC5tYWluV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgaG92ZXJlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tb3VzZW92ZXItYWN0aW9uXVwiKTtcclxuICBpZiAoIWhvdmVyZWQpIHJldHVybjtcclxuICBpZiAodGhpcy5jdXJyZW50SG92ZXIgPT09IGhvdmVyZWQpIHJldHVybjsgLy8gRXhpdCBpZiB3ZSBhcmUgYWxyZWFkeSBob3ZlcmluZyBpdFxyXG4gIHRoaXMuY3VycmVudEhvdmVyID0gaG92ZXJlZDtcclxuICBjb25zdCBhY3RpdmVTZWN0aW9uID0gaG92ZXJlZC5jbG9zZXN0KFwiLnNlY3Rpb25cIikuZGF0YXNldC5zZWN0aW9uO1xyXG4gIGNvbnN0IHRhcmdldE1vZHVsZSA9IFNFQ1RJT05TW2FjdGl2ZVNlY3Rpb25dO1xyXG4gIGNvbnN0IGFjdGlvbiA9IGhvdmVyZWQuZGF0YXNldC5tb3VzZW92ZXJBY3Rpb247XHJcbiAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGhvdmVyZWQsIGFjdGlvbik7XHJcbn0pO1xyXG5nbG9iYWwubWFpbldyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgaG92ZXJlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tb3VzZW91dC1hY3Rpb25dXCIpO1xyXG4gIGlmICghaG92ZXJlZCkgcmV0dXJuO1xyXG4gIC8vIElmIHRoZSBtb3VzZSBtb3ZlZCB0byBhIGNoaWxkIG9mIHRoZSBzYW1lIGJ1dHRvbiwgZG9uJ3QgdHJpZ2dlciB0aGUgXCJFeGl0XCJcclxuICBpZiAoaG92ZXJlZC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpKSByZXR1cm47XHJcbiAgdGhpcy5jdXJyZW50SG92ZXIgPSBudWxsO1xyXG4gIGNvbnN0IGFjdGl2ZVNlY3Rpb24gPSBob3ZlcmVkLmNsb3Nlc3QoXCIuc2VjdGlvblwiKS5kYXRhc2V0LnNlY3Rpb247XHJcbiAgY29uc3QgdGFyZ2V0TW9kdWxlID0gU0VDVElPTlNbYWN0aXZlU2VjdGlvbl07XHJcbiAgY29uc3QgYWN0aW9uID0gaG92ZXJlZC5kYXRhc2V0Lm1vdXNlb3V0QWN0aW9uO1xyXG4gIHRhcmdldE1vZHVsZS5oYW5kbGVFdmVudChob3ZlcmVkLCBhY3Rpb24pO1xyXG59KTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0VWRU5UIERFTEVHQVRJT04tVklEUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vdmlkIGVuZGVkXHJcbmdsb2JhbC5hbGxWaWRzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImVuZGVkXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBjb25zdCBlbmRlZFZpZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIudmlkXCIpO1xyXG4gICAgaWYgKCFlbmRlZFZpZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgdmlkU2VjdGlvbiA9IGVuZGVkVmlkLmNsb3Nlc3QoXCIuc2VjdGlvblwiKS5kYXRhc2V0LnNlY3Rpb247XHJcbiAgICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1t2aWRTZWN0aW9uXTtcclxuICAgIHRhcmdldE1vZHVsZS52aWRFbmQoKTtcclxuICB9KTtcclxufSk7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9GVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL2luaXRcclxuY29uc3QgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICBzZXR1cExhenlMb2FkaW5nKCk7XHJcbiAgZ2xvYmFsLnNldFdlYmZsb3dCcmVha3BvaW50KCk7XHJcbiAgZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgbmF2Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgbmF2YmFyLmFsbE5hdkRyb3Bkb3ducy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9KTtcclxuICBnbG9iYWwuc2V0QWN0aXZlU2VjdGlvbihcImZlYXR1cmVzXCIpO1xyXG4gIGdsb2JhbC5zZXRBY3RpdmVWaWQoKTtcclxuICBnbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICBmZWF0dXJlcy5wbGF5RmVhdHVyZXNJbnRybygpO1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBuYXZDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGZlYXR1cmVzLmluaXRTZWN0aW9uKG51bGwsIChpc0ludHJvID0gdHJ1ZSkpO1xyXG4gIH0sIFRJTUlORy5VSS5TVEFSVF9VSV9SRVZFQUwpO1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbn07XHJcbmNvbnN0IHNldHVwTGF6eUxvYWRpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3QgYWxsTGF6eVZpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZFwiKTtcclxuICBjb25zdCBvYnNlcnZlck9wdGlvbnMgPSB7XHJcbiAgICByb290OiBudWxsLFxyXG4gICAgcm9vdE1hcmdpbjogXCIwcHhcIixcclxuICAgIHRocmVzaG9sZDogMC4xLFxyXG4gIH07XHJcbiAgY29uc3QgdmlkZW9PYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xyXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xyXG4gICAgICBjb25zdCB2aWRlbyA9IGVudHJ5LnRhcmdldDtcclxuICAgICAgY29uc3Qgc291cmNlcyA9IHZpZGVvLnF1ZXJ5U2VsZWN0b3JBbGwoXCJzb3VyY2VcIik7XHJcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICAgIC8vIC0tLSBMT0FEIExPR0lDIC0tLVxyXG4gICAgICAgIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XHJcbiAgICAgICAgICAvLyBVc2UgZGF0YS1zcmMgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2Uga2VlcCBjdXJyZW50IHNyY1xyXG4gICAgICAgICAgY29uc3QgZGF0YVNyYyA9IHNvdXJjZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiKSB8fCBzb3VyY2Uuc3JjO1xyXG4gICAgICAgICAgaWYgKGRhdGFTcmMpIHtcclxuICAgICAgICAgICAgc291cmNlLnNyYyA9IGRhdGFTcmM7XHJcbiAgICAgICAgICAgIC8vIEtlZXAgZGF0YS1zcmMgYXR0cmlidXRlIHNvIHdlIGNhbiBmaW5kIHRoZSBVUkwgYWdhaW4gbGF0ZXJcclxuICAgICAgICAgICAgc291cmNlLnNldEF0dHJpYnV0ZShcImRhdGEtc3JjXCIsIGRhdGFTcmMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZpZGVvLmxvYWQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAtLS0gVU5MT0FEIExPR0lDIC0tLVxyXG4gICAgICAgIC8vIENsZWFycyB0aGUgaW50ZXJuYWwgbG9ncyBmb3IgdXNlciBpbnRlcmFjdGlvbnMgYW5kIHJlc291cmNlIGxvYWRzXHJcbiAgICAgICAgcGVyZm9ybWFuY2UuY2xlYXJNZWFzdXJlcygpO1xyXG4gICAgICAgIHBlcmZvcm1hbmNlLmNsZWFyUmVzb3VyY2VUaW1pbmdzKCk7XHJcbiAgICAgICAgcGVyZm9ybWFuY2UuY2xlYXJNYXJrcygpO1xyXG4gICAgICAgIFJlc2V0U2VjdGlvbih2aWRlby5jbG9zZXN0KFwiLnNlY3Rpb25cIikpO1xyXG4gICAgICAgIHZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcclxuICAgICAgICAgIC8vIE1vdmUgc3JjIGJhY2sgdG8gZGF0YS1zcmMgYW5kIGVtcHR5IHRoZSBjdXJyZW50IHNyY1xyXG4gICAgICAgICAgY29uc3QgY3VycmVudFNyYyA9IHNvdXJjZS5zcmM7XHJcbiAgICAgICAgICBpZiAoY3VycmVudFNyYykge1xyXG4gICAgICAgICAgICBzb3VyY2Uuc2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIiwgY3VycmVudFNyYyk7XHJcbiAgICAgICAgICAgIHNvdXJjZS5zcmMgPSBcIlwiOyAvLyBUaGlzIHN0b3BzIHRoZSB2aWRlbyBmcm9tIGJ1ZmZlcmluZ1xyXG4gICAgICAgICAgICBzb3VyY2UucmVtb3ZlQXR0cmlidXRlKFwic3JjXCIpOyAvLyBGdWxseSBjbGVhciBhdHRyaWJ1dGVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBGb3JjZSB0aGUgYnJvd3NlciB0byBkdW1wIHRoZSB2aWRlbyBkYXRhIGZyb20gbWVtb3J5XHJcbiAgICAgICAgdmlkZW8ubG9hZCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LCBvYnNlcnZlck9wdGlvbnMpO1xyXG4gIGFsbExhenlWaWRzLmZvckVhY2goKHZpZCkgPT4gdmlkZW9PYnNlcnZlci5vYnNlcnZlKHZpZCkpO1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvL1JFU0VUIFZJRFMgQUZURVIgVU5MT0FESU5HLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgY29uc3QgUmVzZXRTZWN0aW9uID0gZnVuY3Rpb24gKHNlY3Rpb24pIHtcclxuICAgIGlmICghc2VjdGlvbikgcmV0dXJuOyAvL2hlbHBzIHByZXZlbnQgY3Jhc2hlc1xyXG4gICAgc2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgIGVsLnBhdXNlKCk7XHJcbiAgICB9KTtcclxuICAgIGdsb2JhbC5kZWFjdGl2YXRlQ3VycmVudEJ0bnMoc2VjdGlvbik7XHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7QUFBTyxNQUFNLFNBQVMsT0FBTyxPQUFPO0FBQUEsSUFDbEMsSUFBSTtBQUFBLE1BQ0YsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIseUJBQXlCO0FBQUEsSUFDM0I7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQSxJQUNqQjtBQUFBLEVBQ0YsQ0FBQztBQUNNLE1BQU0sU0FBUyxPQUFPLE9BQU87QUFBQSxJQUNsQyxVQUFVO0FBQUEsTUFDUixTQUNFO0FBQUEsTUFDRixRQUNFO0FBQUEsSUFDSjtBQUFBLElBQ0EsVUFBVTtBQUFBLE1BQ1IsU0FDRTtBQUFBLE1BQ0YsUUFDRTtBQUFBLElBQ0o7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLFNBQ0U7QUFBQSxNQUNGLFFBQ0U7QUFBQSxJQUNKO0FBQUEsRUFDRixDQUFDO0FBQ00sTUFBTSxpQkFBaUIsT0FBTyxPQUFPO0FBQUEsSUFDMUMsVUFBVTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsU0FBUztBQUFBLElBQ1g7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLFNBQVM7QUFBQSxJQUNYO0FBQUEsSUFDQSxVQUFVO0FBQUEsTUFDUixX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QUFTLGtCQUFrQjtBQUczQixlQUFXLE1BQU07QUFDZixtQkFBYSxVQUFVLElBQUksUUFBUTtBQUNuQyxlQUFTLFlBQVksTUFBTyxVQUFVLElBQUs7QUFBQSxJQUM3QyxHQUFHLE9BQU8sR0FBRyxlQUFlO0FBQUEsRUFHOUI7QUFDQSxNQUFNLG1CQUFtQixXQUFZO0FBQ25DLFVBQU0sY0FBYyxTQUFTLGlCQUFpQixNQUFNO0FBQ3BELFVBQU0sa0JBQWtCO0FBQUEsTUFDdEIsTUFBTTtBQUFBLE1BQ04sWUFBWTtBQUFBLE1BQ1osV0FBVztBQUFBLElBQ2I7QUFDQSxVQUFNLGdCQUFnQixJQUFJLHFCQUFxQixDQUFDLFlBQVk7QUFDMUQsY0FBUSxRQUFRLENBQUMsVUFBVTtBQUN6QixjQUFNLFFBQVEsTUFBTTtBQUNwQixjQUFNLFVBQVUsTUFBTSxpQkFBaUIsUUFBUTtBQUMvQyxZQUFJLE1BQU0sZ0JBQWdCO0FBRXhCLGtCQUFRLFFBQVEsQ0FBQyxXQUFXO0FBRTFCLGtCQUFNLFVBQVUsT0FBTyxhQUFhLFVBQVUsS0FBSyxPQUFPO0FBQzFELGdCQUFJLFNBQVM7QUFDWCxxQkFBTyxNQUFNO0FBRWIscUJBQU8sYUFBYSxZQUFZLE9BQU87QUFBQSxZQUN6QztBQUFBLFVBQ0YsQ0FBQztBQUNELGdCQUFNLEtBQUs7QUFBQSxRQUNiLE9BQU87QUFHTCxzQkFBWSxjQUFjO0FBQzFCLHNCQUFZLHFCQUFxQjtBQUNqQyxzQkFBWSxXQUFXO0FBQ3ZCLHVCQUFhLE1BQU0sUUFBUSxVQUFVLENBQUM7QUFDdEMsZ0JBQU0sTUFBTTtBQUNaLGtCQUFRLFFBQVEsQ0FBQyxXQUFXO0FBRTFCLGtCQUFNLGFBQWEsT0FBTztBQUMxQixnQkFBSSxZQUFZO0FBQ2QscUJBQU8sYUFBYSxZQUFZLFVBQVU7QUFDMUMscUJBQU8sTUFBTTtBQUNiLHFCQUFPLGdCQUFnQixLQUFLO0FBQUEsWUFDOUI7QUFBQSxVQUNGLENBQUM7QUFFRCxnQkFBTSxLQUFLO0FBQUEsUUFDYjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsR0FBRyxlQUFlO0FBQ2xCLGdCQUFZLFFBQVEsQ0FBQyxRQUFRLGNBQWMsUUFBUSxHQUFHLENBQUM7QUFHdkQsVUFBTSxlQUFlLFNBQVUsU0FBUztBQUN0QyxVQUFJLENBQUMsUUFBUztBQUNkLGNBQVEsaUJBQWlCLE1BQU0sRUFBRSxRQUFRLFNBQVUsSUFBSTtBQUNyRCxXQUFHLGNBQWM7QUFDakIsV0FBRyxNQUFNO0FBQUEsTUFDWCxDQUFDO0FBQ0QsTUFBTyxzQkFBc0IsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjsiLAogICJuYW1lcyI6IFsiaXNJbnRybyJdCn0K
