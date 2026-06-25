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
      desktop: "https://cdn.prod.website-files.com/6a395067d36279ee102c060a/6a3bdbbb958d98202a2e32f2_8cdf9d0fd2e7f78cec1523e74dbe4de4_View-2.png",
      mobile: "https://cdn.prod.website-files.com/6a395067d36279ee102c060a/6a3c409a1e19b544abe4a6e7_292e31508f45ed170de4bf297b590c93_View-2-MP.png"
    }
  });
  var VIEW_START_END = Object.freeze({
    "view-1": {
      startTime: 0,
      endTime: 3
    },
    "view-2": {
      startTime: 3.24,
      endTime: 6.2
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
        ["view-2-mp", ASSETS["view-2"].mobile]
        // ["view-3", ASSETS["view-3"].desktop],
        // ["view-3-mp", ASSETS["view-3"].mobile],
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjLzAtY29uZmlnLmpzIiwgIi4uL3NyYy8wLWdsb2JhbC5qcyIsICIuLi9zcmMvMC1uYXZiYXIuanMiLCAiLi4vc3JjLzEtZmVhdHVyZXMuanMiLCAiLi4vc3JjLzItZGF0YS5qcyIsICIuLi9zcmMvMy1zZXF1ZW5jZS5qcyIsICIuLi9zcmMvbWFpbi5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNvbnN0IFRJTUlORyA9IE9iamVjdC5mcmVlemUoe1xyXG4gIFVJOiB7XHJcbiAgICBTVEFSVF9VSV9SRVZFQUw6IDE1MDAsXHJcbiAgICBCTEFDS09VVF9USU1FUjogMjAwLFxyXG4gICAgQkxBQ0tPVVRfV0FJVF9UT19SRVZFQUw6IDUwLFxyXG4gIH0sXHJcbiAgVklERU86IHtcclxuICAgIFZJRF9FTkRfVElNRVI6IDE1MDAsXHJcbiAgfSxcclxufSk7XHJcbmV4cG9ydCBjb25zdCBBU1NFVFMgPSBPYmplY3QuZnJlZXplKHtcclxuICBcInZpZXctMVwiOiB7XHJcbiAgICBkZXNrdG9wOlxyXG4gICAgICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNmEzOTUwNjdkMzYyNzllZTEwMmMwNjBhLzZhMzk1YmRiNTE0MzA0ODU2NTE0MGYwY19lOWNlOGUwYzFhZjliZTQ3YjNkYTY4OWY5NzNkODY2NV9Db21wcyUyMFZpZXctU3RhcnQlMjBTaG90JTIwJTI4d2l0aCUyMGNvbXBzJTI5LndlYnBcIixcclxuICAgIG1vYmlsZTpcclxuICAgICAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzZhMzk1MDY3ZDM2Mjc5ZWUxMDJjMDYwYS82YTM5NWJkYmUyZTdkMjYyNjQ4Yjk4N2FfZTE3YjdhODczZDYyMzkwODE0ZjhhZDU0OWMzNWViNWRfQ29tcHMlMjBWaWV3LVN0YXJ0JTIwU2hvdC1NUCUyMCUyOHdpdGglMjBjb21wcyUyOS53ZWJwXCIsXHJcbiAgfSxcclxuICBcInZpZXctMlwiOiB7XHJcbiAgICBkZXNrdG9wOlxyXG4gICAgICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNmEzOTUwNjdkMzYyNzllZTEwMmMwNjBhLzZhM2JkYmJiOTU4ZDk4MjAyYTJlMzJmMl84Y2RmOWQwZmQyZTdmNzhjZWMxNTIzZTc0ZGJlNGRlNF9WaWV3LTIucG5nXCIsXHJcbiAgICBtb2JpbGU6XHJcbiAgICAgIFwiaHR0cHM6Ly9jZG4ucHJvZC53ZWJzaXRlLWZpbGVzLmNvbS82YTM5NTA2N2QzNjI3OWVlMTAyYzA2MGEvNmEzYzQwOWExZTE5YjU0NGFiZTRhNmU3XzI5MmUzMTUwOGY0NWVkMTcwZGU0YmYyOTdiNTkwYzkzX1ZpZXctMi1NUC5wbmdcIixcclxuICB9LFxyXG59KTtcclxuZXhwb3J0IGNvbnN0IFZJRVdfU1RBUlRfRU5EID0gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgXCJ2aWV3LTFcIjoge1xyXG4gICAgc3RhcnRUaW1lOiAwLFxyXG4gICAgZW5kVGltZTogMyxcclxuICB9LFxyXG4gIFwidmlldy0yXCI6IHtcclxuICAgIHN0YXJ0VGltZTogMy4yNCxcclxuICAgIGVuZFRpbWU6IDYuMixcclxuICB9LFxyXG59KTtcclxuZXhwb3J0IGNvbnN0IExPT1BfU0VRVUVOQ0VfVklEUyA9IHRydWU7XHJcbiIsICJpbXBvcnQgeyBUSU1JTkcgfSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuZXhwb3J0IGNvbnN0IG1haW5XcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXdyYXBwZXJcIik7XHJcbmV4cG9ydCBjb25zdCBibGFja291dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmxhY2tvdXRcIik7XHJcbmV4cG9ydCBjb25zdCBhbGxTZWN0aW9ucyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlY3Rpb25cIildO1xyXG5leHBvcnQgY29uc3QgYWxsVmlkQ29kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlXCIpO1xyXG5leHBvcnQgY29uc3QgYWxsVmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpO1xyXG5leHBvcnQgY29uc3QgbmF2TWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVcIik7XHJcbmV4cG9ydCBjb25zdCBhbGxOYXZNZW51TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm5hdl9tZW51X2xpbmtcIik7XHJcbmV4cG9ydCBjb25zdCBuYXZCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9idXR0b25cIik7XHJcbmV4cG9ydCBjb25zdCBfc3RhdGUgPSB7XHJcbiAgYWN0aXZlU2VjdGlvbjogbnVsbCxcclxuICBhY3RpdmVTZWN0aW9uTmFtZTogbnVsbCxcclxuICBhY3RpdmVWaWQ6IG51bGwsXHJcbiAgd2ViZmxvd0JyZWFrcG9pbnQ6IG51bGwsXHJcbiAgc3RhcnRUaW1lOiAwLFxyXG4gIGVuZFRpbWU6IDAsXHJcbiAgcGF1c2VGbGFnOiBmYWxzZSxcclxufTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0dMT0JBTCBGVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vVGhlICdTdHJpY3QnIFNlbGVjdG9yXHJcbmV4cG9ydCBjb25zdCBxdWVyeSA9IGZ1bmN0aW9uIChzZWxlY3RvciwgY29udGV4dCA9IGRvY3VtZW50KSB7XHJcbiAgY29uc3QgZWwgPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gIGlmICghZWwpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgYENSSVRJQ0FMIFVJIEVSUk9SOiBcIiR7c2VsZWN0b3J9XCIgaXMgbWlzc2luZyBmcm9tIHRoZSBET00uYCxcclxuICAgICk7XHJcbiAgfVxyXG4gIHJldHVybiBlbDtcclxufTtcclxuLy9UaGUgJ1N0cmljdCcgTXVsdC1TZWxlY3RvclxyXG5leHBvcnQgY29uc3QgcXVlcnlBbGwgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQgPSBkb2N1bWVudCkge1xyXG4gIGNvbnN0IGVsZW1lbnRzID0gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgIGBDUklUSUNBTCBVSSBFUlJPUjogTm8gZWxlbWVudHMgbWF0Y2hpbmcgXCIke3NlbGVjdG9yfVwiIGZvdW5kLmAsXHJcbiAgICApO1xyXG4gIH1cclxuICByZXR1cm4gZWxlbWVudHM7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRWaWRUeXBlID0gZnVuY3Rpb24gKHZpZGVvKSB7XHJcbiAgcmV0dXJuIHZpZGVvLmNsb3Nlc3QoXCIuc2VjdGlvblwiKS5jbGFzc0xpc3RbMV07XHJcbn07XHJcbmV4cG9ydCBjb25zdCBmbGFzaEJsYWNrb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gIGJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICBibGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0sIFRJTUlORy5VSS5CTEFDS09VVF9USU1FUik7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBlbmFibGVOYXZMaW5rc0FuZE5hdkJ0biA9IGZ1bmN0aW9uICgpIHtcclxuICBuYXZNZW51LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcclxuICBuYXZCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xyXG59O1xyXG5leHBvcnQgY29uc3QgYWN0aXZhdGVDdXJyZW50TmF2TGluayA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XHJcbiAgZGVhY3RpdmF0ZUN1cnJlbnROYXZMaW5rcygpO1xyXG4gIGNsaWNrZWQuY2xhc3NMaXN0LmFkZChcImN1cnJlbnRcIik7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWFjdGl2YXRlQ3VycmVudE5hdkxpbmtzID0gZnVuY3Rpb24gKCkge1xyXG4gIGFsbE5hdk1lbnVMaW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImN1cnJlbnRcIik7XHJcbiAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRBY3RpdmVTZWN0aW9uID0gZnVuY3Rpb24gKHNlY3Rpb25OYW1lLCBpbmRleCkge1xyXG4gIGRlYWN0aXZhdGVBbGxTZWN0aW9ucygpO1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uTmFtZSA9IHNlY3Rpb25OYW1lO1xyXG4gIGlmICghaW5kZXgpIGluZGV4ID0gMDtcclxuICBjb25zdCBtYXRjaGVzID0gYWxsU2VjdGlvbnMuZmlsdGVyKFxyXG4gICAgKGVsKSA9PiBlbC5kYXRhc2V0LnNlY3Rpb24gPT09IHNlY3Rpb25OYW1lLFxyXG4gICk7XHJcbiAgY29uc3QgdGFyZ2V0ID0gbWF0Y2hlc1tpbmRleF07XHJcbiAgaWYgKHRhcmdldCkge1xyXG4gICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICBfc3RhdGUuYWN0aXZlU2VjdGlvbiA9IHRhcmdldDtcclxuICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWFjdGl2YXRlQWxsU2VjdGlvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgYWxsU2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRBY3RpdmVWaWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIF9zdGF0ZS5hY3RpdmVWaWQ7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRBY3RpdmVWaWQgPSBmdW5jdGlvbiAoYWN0aXZlVmlkV3JhcCwgYWN0aXZlU2VxdWVuY2VTdGVwKSB7XHJcbiAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQpIHtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQucGF1c2UoKTtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQuc3JjID0gXCJcIjtcclxuICB9XHJcbiAgaWYgKGFjdGl2ZVZpZFdyYXAgJiYgYWN0aXZlU2VxdWVuY2VTdGVwID09PSBudWxsKSB7XHJcbiAgICBhY3RpdmVWaWRXcmFwLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGVcIikuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgaWYgKGVsLnF1ZXJ5U2VsZWN0b3IoXCIudmlkXCIpLm9mZnNldFBhcmVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgIF9zdGF0ZS5hY3RpdmVWaWQgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLnZpZFwiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSBlbHNlIGlmIChhY3RpdmVWaWRXcmFwICYmIGFjdGl2ZVNlcXVlbmNlU3RlcCkge1xyXG4gICAgX3N0YXRlLmFjdGl2ZVZpZCA9IGFjdGl2ZVNlcXVlbmNlU3RlcDtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxsVmlkQ29kZXMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgaWYgKGVsLnF1ZXJ5U2VsZWN0b3IoXCIudmlkXCIpLm9mZnNldFBhcmVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgIF9zdGF0ZS5hY3RpdmVWaWQgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLnZpZFwiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0V2ViZmxvd0JyZWFrcG9pbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIF9zdGF0ZS53ZWJmbG93QnJlYWtwb2ludDtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNldFdlYmZsb3dCcmVha3BvaW50ID0gZnVuY3Rpb24gKCkge1xyXG4gIGNvbnN0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgaWYgKHdpZHRoIDwgNDgwKSBfc3RhdGUud2ViZmxvd0JyZWFrcG9pbnQgPSBcIm1vYmlsZVBvcnRyYWl0XCI7XHJcbiAgaWYgKHdpZHRoID49IDQ4MCkgX3N0YXRlLndlYmZsb3dCcmVha3BvaW50ID0gXCJtb2JpbGVMYW5kc2NhcGVcIjtcclxuICBpZiAod2lkdGggPj0gNzY4KSBfc3RhdGUud2ViZmxvd0JyZWFrcG9pbnQgPSBcInRhYmxldFwiO1xyXG4gIGlmICh3aWR0aCA+PSA5OTIpIF9zdGF0ZS53ZWJmbG93QnJlYWtwb2ludCA9IFwiZGVza3RvcFwiO1xyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0U3RhcnRUaW1lID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XHJcbiAgX3N0YXRlLnN0YXJ0VGltZSA9IG5ld1ZhbHVlO1xyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0RW5kVGltZSA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xyXG4gIF9zdGF0ZS5lbmRUaW1lID0gbmV3VmFsdWU7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBjbGVhclNlY3Rpb25WaWRTcmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi52aWRcIikuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGVsLnNyYyA9IFwiXCI7XHJcbiAgICBlbC5sb2FkKCk7XHJcbiAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCByZXNldEFsbFNlY3Rpb25WaWRzID0gZnVuY3Rpb24gKCkge1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICBlbC5wYXVzZSgpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcGxheVJhbmdlID0gZnVuY3Rpb24gKHZpZGVvQ3VycmVudFRpbWUpIHtcclxuICBpZiAoIV9zdGF0ZS5hY3RpdmVWaWQpIHJldHVybjtcclxuICBjb25zdCB2aWRDb2RlID0gX3N0YXRlLmFjdGl2ZVZpZC5wYXJlbnRFbGVtZW50O1xyXG4gIGNvbnN0IHRhcmdldFN0YXJ0ID0gdmlkZW9DdXJyZW50VGltZSB8fCBfc3RhdGUuc3RhcnRUaW1lO1xyXG4gIC8vIENMRUFOVVA6IEtpbGwgYW55IHByZXZpb3VzIG1vbml0b3IgYmVmb3JlIHN0YXJ0aW5nIGEgbmV3IG9uZVxyXG4gIGlmIChfc3RhdGUuYWN0aXZlVmlkLl9jdXJyZW50TW9uaXRvcikge1xyXG4gICAgX3N0YXRlLmFjdGl2ZVZpZC5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4gICAgICBcInRpbWV1cGRhdGVcIixcclxuICAgICAgX3N0YXRlLmFjdGl2ZVZpZC5fY3VycmVudE1vbml0b3IsXHJcbiAgICApO1xyXG4gIH1cclxuICAvLyAxLiBISURERU4gU1RBVEU6IEluc3RhbnQgaGlkZSB0byByZXZlYWwgdmlkLXdyYXAgYmFja2dyb3VuZCBpbWFnZVxyXG4gIGlmICh2aWRDb2RlKSB2aWRDb2RlLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuICAvLyBDbGVhciBhbnkgZXhpc3RpbmcgdGltZXVwZGF0ZSBtb25pdG9yc1xyXG4gIF9zdGF0ZS5hY3RpdmVWaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcclxuICAgIFwidGltZXVwZGF0ZVwiLFxyXG4gICAgX3N0YXRlLmFjdGl2ZVZpZC5fY3VycmVudE1vbml0b3IsXHJcbiAgKTtcclxuICBjb25zdCBtb25pdG9yVGltZSA9ICgpID0+IHtcclxuICAgIGlmIChfc3RhdGUuYWN0aXZlVmlkLmN1cnJlbnRUaW1lID49IF9zdGF0ZS5lbmRUaW1lIC0gMC4xNSkge1xyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsIG1vbml0b3JUaW1lKTtcclxuICAgICAgX3N0YXRlLmFjdGl2ZVZpZC5wYXVzZSgpO1xyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkLmN1cnJlbnRUaW1lID0gX3N0YXRlLmVuZFRpbWU7XHJcbiAgICAgIF9zdGF0ZS5hY3RpdmVWaWQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJlbmRlZFwiKSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBfc3RhdGUuYWN0aXZlVmlkLl9jdXJyZW50TW9uaXRvciA9IG1vbml0b3JUaW1lO1xyXG4gIC8vIFNvdXJjZSBoYW5kbGluZ1xyXG4gIGNvbnN0IHNvdXJjZSA9IF9zdGF0ZS5hY3RpdmVWaWQucXVlcnlTZWxlY3RvcihcInNvdXJjZVwiKTtcclxuICBjb25zdCBkYXRhU3JjID0gc291cmNlID8gc291cmNlLmdldEF0dHJpYnV0ZShcImRhdGEtc3JjXCIpIDogbnVsbDtcclxuICBpZiAoZGF0YVNyYyAmJiBfc3RhdGUuYWN0aXZlVmlkLnNyYyAhPT0gZGF0YVNyYykge1xyXG4gICAgX3N0YXRlLmFjdGl2ZVZpZC5wYXVzZSgpO1xyXG4gICAgX3N0YXRlLmFjdGl2ZVZpZC5zcmMgPSBkYXRhU3JjO1xyXG4gICAgX3N0YXRlLmFjdGl2ZVZpZC5sb2FkKCk7XHJcbiAgfVxyXG4gIGNvbnN0IHN0YXJ0UGxheWJhY2tTZXF1ZW5jZSA9IGFzeW5jICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIF9zdGF0ZS5hY3RpdmVWaWQuY3VycmVudFRpbWUgPSB0YXJnZXRTdGFydDtcclxuXHJcbiAgICAgIC8vIDIuIFRIRSBGQUlMLVNBRkUgUkVWRUFMXHJcbiAgICAgIC8vIFdlIHBvbGwgZm9yIHBoeXNpY2FsIHBsYXloZWFkIG1vdmVtZW50LiBPbmNlIGl0IG1vdmVzLFxyXG4gICAgICAvLyB0aGUgXCJibGFjayBidWZmZXJcIiBpcyBndWFyYW50ZWVkIHRvIGJlIGdvbmUuXHJcbiAgICAgIGNvbnN0IHBvbGxGb3JGcmFtZSA9ICgpID0+IHtcclxuICAgICAgICBpZiAoX3N0YXRlLmFjdGl2ZVZpZC5jdXJyZW50VGltZSA+IHRhcmdldFN0YXJ0KSB7XHJcbiAgICAgICAgICAvLyBEb3VibGUgUkFGIGlzIHRoZSBmaW5hbCBndWFyZCBmb3IgdGhlIEdQVSBwYWludCBjeWNsZVxyXG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICBpZiAodmlkQ29kZSkgdmlkQ29kZS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBibGFja291dCAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIGJsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghX3N0YXRlLmFjdGl2ZVZpZC5wYXVzZWQpIHtcclxuICAgICAgICAgIC8vIElmIHN0aWxsIGF0IHRhcmdldFN0YXJ0IGJ1dCBwbGF5aW5nLCBjaGVjayBhZ2FpbiBuZXh0IGZyYW1lXHJcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocG9sbEZvckZyYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICAgIC8vIDMuIFNUQVJUXHJcbiAgICAgIF9zdGF0ZS5hY3RpdmVWaWQuYWRkRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIiwgbW9uaXRvclRpbWUpO1xyXG4gICAgICBhd2FpdCBfc3RhdGUuYWN0aXZlVmlkLnBsYXkoKTtcclxuICAgICAgcG9sbEZvckZyYW1lKCk7IC8vIFN0YXJ0IGNoZWNraW5nIGZvciB0aGUgZmlyc3QgcmVhbCBmcmFtZVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oXCJQbGF5YmFjayBmYWlsZWQ6XCIsIGUpO1xyXG4gICAgICAvLyBGYWxsYmFjazogc2hvdyB2aWRlbyBhbnl3YXkgaWYgcGxheSgpIGZhaWxzIChlLmcuIGF1dHBsYXkgYmxvY2tlZClcclxuICAgICAgaWYgKHZpZENvZGUpIHZpZENvZGUuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgLy8gV2FpdCBmb3IgZGF0YSAocmVhZHlTdGF0ZSAzIGlzIEhBVkVfRlVUVVJFX0RBVEEpXHJcbiAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQucmVhZHlTdGF0ZSA+PSAzKSB7XHJcbiAgICBzdGFydFBsYXliYWNrU2VxdWVuY2UoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgX3N0YXRlLmFjdGl2ZVZpZC5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheVwiLCBzdGFydFBsYXliYWNrU2VxdWVuY2UsIHtcclxuICAgICAgb25jZTogdHJ1ZSxcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGRpc2FibGVQYXVzZSA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUucGF1c2VGbGFnID0gZmFsc2U7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5wYXVzZS13cmFwXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPVxyXG4gICAgXCJub25lXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBlbmFibGVQYXVzZSA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLnBhdXNlLXdyYXBcIikuc3R5bGUucG9pbnRlckV2ZW50cyA9XHJcbiAgICBcImF1dG9cIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IHRvZ2dsZVBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gIGlmIChfc3RhdGUucGF1c2VGbGFnKSB7XHJcbiAgICBfc3RhdGUucGF1c2VGbGFnID0gZmFsc2U7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnBsYXkoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgX3N0YXRlLnBhdXNlRmxhZyA9IHRydWU7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgZW5hYmxlU2VjdGlvbkN0cmxCdG5FdmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKS5zdHlsZS5wb2ludGVyRXZlbnRzID1cclxuICAgIFwiYXV0b1wiO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZGlzYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi13cmFwLWJ0bnNcIikuc3R5bGUucG9pbnRlckV2ZW50cyA9XHJcbiAgICBcIm5vbmVcIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNldEFjdGl2ZUN0cmxCdG5XcmFwcGVyID0gZnVuY3Rpb24gKGJ0bldyYXBwZXJJbmRleCkge1xyXG4gIGRlYWN0aXZhdGVBbGxDdHJsQnRuV3JhcHBlcnMoKTtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvblxyXG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VjdGlvbi13cmFwLWJ0bnNcIilcclxuICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaW5kZXgpIHtcclxuICAgICAgaWYgKGluZGV4ID09PSBidG5XcmFwcGVySW5kZXgpIHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRlYWN0aXZhdGVBbGxDdHJsQnRuV3JhcHBlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb25cclxuICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpXHJcbiAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgdG9nZ2xlQnRuSG92ZXJDbGFzcyA9IGZ1bmN0aW9uIChidG4pIHtcclxuICBpZiAoX3N0YXRlLmFjdGl2ZVZpZCAmJiBfc3RhdGUud2ViZmxvd0JyZWFrcG9pbnQgPT09IFwiZGVza3RvcFwiKVxyXG4gICAgYnRuLmNsYXNzTGlzdC50b2dnbGUoXCJob3ZlcmVkXCIpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgYWN0aXZhdGVDdXJyZW50QnRuID0gZnVuY3Rpb24gKGJ0bikge1xyXG4gIGRlYWN0aXZhdGVDdXJyZW50QnRucygpO1xyXG4gIHNldFRpbWVvdXQoKCkgPT4gYnRuLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50XCIpLCA1MCk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWFjdGl2YXRlQ3VycmVudEJ0bnMgPSBmdW5jdGlvbiAoc2VjdGlvbikge1xyXG4gIGlmICghc2VjdGlvbikgc2VjdGlvbiA9IF9zdGF0ZS5hY3RpdmVTZWN0aW9uO1xyXG4gIHNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi5jdHJsLWJ0blwiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImN1cnJlbnRcIik7XHJcbiAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRMb2NhbEluZGV4ID0gZnVuY3Rpb24gKGJ0biwgYnRuQ2xhc3MsIGFsbEJ0bnNXcmFwcGVyKSB7XHJcbiAgbGV0IGxvY2FsSW5kZXg7XHJcbiAgY29uc3QgYWxsQnRucyA9IGJ0blxyXG4gICAgLmNsb3Nlc3QoYC4ke2FsbEJ0bnNXcmFwcGVyfWApXHJcbiAgICAucXVlcnlTZWxlY3RvckFsbChgLiR7YnRuQ2xhc3N9YCk7XHJcbiAgYWxsQnRucy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaW5kZXgpIHtcclxuICAgIGlmIChlbCA9PT0gYnRuKSBsb2NhbEluZGV4ID0gaW5kZXg7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGxvY2FsSW5kZXg7XHJcbn07XHJcbiIsICJjbGFzcyBOYXZiYXIge1xyXG4gIGNvbnN0cnVjdG9yKGdsb2JhbENvbnRyb2xsZXIsIGNvbnRhaW5lcikge1xyXG4gICAgdGhpcy5nbG9iYWwgPSBnbG9iYWxDb250cm9sbGVyO1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7IC8vVGhlIHJvb3QgZm9yIHRoaXMgbW9kdWxlXHJcbiAgICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICAvL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICB0aGlzLm5hdk1lbnUgPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5uYXZfbWVudVwiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLm5hdkJ0biA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLm5hdl9idXR0b25cIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy5hbGxOYXZMaW5rcyA9IHRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLm5hdl9tZW51X2xpbmtcIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy5hbGxOYXZMaW5rc1dpdGhEcm9wZG93biA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoJ1tkYXRhLW5hdi1zZWN0aW9uPVwic2VxdWVuY2VcIl0nLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hbGxOYXZEcm9wZG93bnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLm5hdl9tZW51X2Ryb3Bkb3duXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmV2ZW50TWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcIm9wZW4tbmF2LWRyb3Bkb3duXCIsIHRoaXMub3Blbk5hdkRyb3Bkb3duXSxcclxuICAgICAgW1wiY2xvc2UtbmF2LWRyb3Bkb3duXCIsIHRoaXMuY2xvc2VOYXZEcm9wZG93bl0sXHJcbiAgICAgIFtcInRvZ2dsZS1uYXYtZHJvcGRvd25cIiwgdGhpcy50b2dnbGVOYXZEcm9wZG93bl0sXHJcbiAgICBdKTtcclxuICB9XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBoYW5kbGVFdmVudCA9IGZ1bmN0aW9uICh0cmlnZ2VyLCBldmVudEFjdGlvbikge1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5ldmVudE1hcC5nZXQoZXZlbnRBY3Rpb24pO1xyXG4gICAgaWYgKGFjdGlvbikge1xyXG4gICAgICBhY3Rpb24odHJpZ2dlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oYE5vIGFjdGlvbiBmb3VuZCBmb3I6ICR7ZXZlbnRBY3Rpb259YCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBjbG9zZU5hdk1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFsbE5hdkRyb3Bkb3ducy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBjbG9zZU1vYmlsZU5hdk1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoXCJuYXZNZW51T3BlblwiIGluIHRoaXMubmF2TWVudS5kYXRhc2V0KSB0aGlzLm5hdkJ0bi5jbGljaygpO1xyXG4gICAgdGhpcy5uYXZNZW51LnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIG9wZW5OYXZEcm9wZG93biA9IGZ1bmN0aW9uICh0cmlnZ2VyKSB7XHJcbiAgICB0cmlnZ2VyXHJcbiAgICAgIC5jbG9zZXN0KFwiLm5hdl9tZW51X2xpbmstd3JhcFwiKVxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudV9kcm9wZG93blwiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGNsb3NlTmF2RHJvcGRvd24gPSBmdW5jdGlvbiAodHJpZ2dlcikge1xyXG4gICAgdHJpZ2dlclxyXG4gICAgICAuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIilcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIilcclxuICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICB0b2dnbGVOYXZEcm9wZG93biA9IGZ1bmN0aW9uICh0cmlnZ2VyKSB7XHJcbiAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKHRyaWdnZXIpO1xyXG4gICAgdHJpZ2dlclxyXG4gICAgICAuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIilcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIilcclxuICAgICAgLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBOYXZiYXI7XHJcbiIsICJpbXBvcnQgeyBUSU1JTkcgfSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG5cclxuY2xhc3MgRmVhdHVyZXMge1xyXG4gIGNvbnN0cnVjdG9yKGdsb2JhbENvbnRyb2xsZXIsIGNvbnRhaW5lcikge1xyXG4gICAgdGhpcy5nbG9iYWwgPSBnbG9iYWxDb250cm9sbGVyO1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7IC8vVGhlIHJvb3QgZm9yIHRoaXMgbW9kdWxlXHJcbiAgICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICAvL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQgPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5ibGFja291dFwiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLmZlYXR1cmVzQWxsVGV4dCA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIudHh0LXdyYXBcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuZmVhdHVyZXNJbnRyb1ZpZERpdiA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFxyXG4gICAgICBcIi52aWQtd3JhcC5pbnRyb1wiLFxyXG4gICAgICB0aGlzLmNvbnRhaW5lcixcclxuICAgICk7XHJcbiAgICB0aGlzLmZlYXR1cmVzQWxsVmlkV3JhcHMgPSB0aGlzLmdsb2JhbC5xdWVyeUFsbChcclxuICAgICAgXCIudmlkLXdyYXBcIixcclxuICAgICAgdGhpcy5jb250YWluZXIsXHJcbiAgICApO1xyXG4gICAgdGhpcy5mZWF0dXJlc1ZpZERpdiA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFxyXG4gICAgICBcIi52aWQtd3JhcC5mZWF0dXJlc1wiLFxyXG4gICAgICB0aGlzLmNvbnRhaW5lcixcclxuICAgICk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlciA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLnBhdXNlLXdyYXBcIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc0N0cmxCdG5zID0gdGhpcy5nbG9iYWwucXVlcnkoXHJcbiAgICAgIFwiLnNlY3Rpb24td3JhcC1idG5zXCIsXHJcbiAgICAgIHRoaXMuY29udGFpbmVyLFxyXG4gICAgKTtcclxuICAgIHRoaXMuYWN0aXZlRmVhdHVyZSA9IG51bGw7XHJcbiAgICB0aGlzLmZlYXR1cmVzVGltZXIgPSBudWxsO1xyXG4gICAgdGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmV2ZW50TWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcIm9wZW4tZmVhdHVyZXNcIiwgdGhpcy5pbml0U2VjdGlvbl0sXHJcbiAgICAgIFtcInBsYXktY3RybC12aWRcIiwgdGhpcy5wbGF5Q3RybEJ0blZpZF0sXHJcbiAgICAgIFtcInBhdXNlLWN0cmwtdmlkXCIsIHRoaXMucGF1c2VDdHJsVmlkXSxcclxuICAgICAgW1wiYnRuLWhvdmVyZWRcIiwgdGhpcy5nbG9iYWwudG9nZ2xlQnRuSG92ZXJDbGFzcy5iaW5kKHRoaXMpXSxcclxuICAgIF0pO1xyXG4gIH1cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy9GVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIGluaXRTZWN0aW9uID0gKGNsaWNrZWQsIGlzSW50cm8pID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UoKTtcclxuICAgIGlmIChjbGlja2VkKSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudE5hdkxpbmsoY2xpY2tlZCk7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmZsYXNoQmxhY2tvdXQoKTtcclxuICAgIH1cclxuICAgIHRoaXMuZ2xvYmFsLmVuYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzKCk7XHJcbiAgICB0aGlzLmhpZGVBbGxUZXh0KCk7XHJcbiAgICB0aGlzLnNob3dJbnRyb1RleHQoKTtcclxuICAgIHRoaXMuZmVhdHVyZXNDdHJsQnRucy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgaWYgKGlzSW50cm8pIHJldHVybjtcclxuICAgIHRoaXMucGxheUZlYXR1cmVzSW50cm8oKTtcclxuICB9O1xyXG4gIGhhbmRsZUV2ZW50ID0gKHRyaWdnZXIsIGV2ZW50QWN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmV2ZW50TWFwLmdldChldmVudEFjdGlvbik7XHJcbiAgICBpZiAoYWN0aW9uKSB7XHJcbiAgICAgIGFjdGlvbih0cmlnZ2VyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgTm8gYWN0aW9uIGZvdW5kIGZvcjogJHtldmVudEFjdGlvbn1gKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGhpZGVBbGxUZXh0ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFRleHQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2hvd0ludHJvVGV4dCA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxUZXh0XHJcbiAgICAgIC5maW5kKChlbCkgPT4gZWwuZGF0YXNldC50ZXh0Q29udGVudCA9PT0gXCJpbnRyb1wiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dGZWF0dXJlVGV4dCA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxUZXh0XHJcbiAgICAgIC5maW5kKChlbCkgPT4gZWwuZGF0YXNldC50ZXh0Q29udGVudCA9PT0gdGhpcy5hY3RpdmVGZWF0dXJlKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dGZWF0dXJlc0ludHJvVmlkRGl2ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0ludHJvVmlkRGl2LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBoaWRlRmVhdHVyZXNJbnRyb1ZpZERpdiA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNJbnRyb1ZpZERpdi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0ZlYXR1cmVzVmlkRGl2ID0gKGZlYXR1cmUpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxWaWRXcmFwcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW50cm9cIikpIHJldHVybjtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgaWYgKGVsLmRhdGFzZXQuZmVhdHVyZSA9PT0gZmVhdHVyZSkge1xyXG4gICAgICAgIHRoaXMuYWNpdHZlVmlkV3JhcCA9IGVsO1xyXG4gICAgICAgIHRoaXMuYWNpdHZlVmlkV3JhcC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIGhpZGVGZWF0dXJlc1ZpZERpdiA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxWaWRXcmFwcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW50cm9cIikpIHJldHVybjtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgcGxheUZlYXR1cmVzSW50cm8gPSAoKSA9PiB7XHJcbiAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuc2hvd0ZlYXR1cmVzSW50cm9WaWREaXYoKTtcclxuICAgIHRoaXMuaGlkZUZlYXR1cmVzVmlkRGl2KCk7XHJcbiAgICAvLyBMb2dpYzogRmluZCB0aGUgb25lIHRoYXQgaXNuJ3QgaGlkZGVuIChkaXNwbGF5OiBub25lKVxyXG4gICAgY29uc3QgYWxsSW50cm9zID1cclxuICAgICAgdGhpcy5mZWF0dXJlc0ludHJvVmlkRGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGUtaW50cm9cIik7XHJcbiAgICBhbGxJbnRyb3MuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgLy8gb2Zmc2V0UGFyZW50IGlzIG51bGwgaWYgdGhlIGVsZW1lbnQgaXMgZGlzcGxheTogbm9uZVxyXG4gICAgICBpZiAoZWwub2Zmc2V0UGFyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgdmlkID0gZWwucXVlcnlTZWxlY3RvcihcIi52aWQtaW50cm9cIik7XHJcbiAgICAgICAgaWYgKHZpZCkge1xyXG4gICAgICAgICAgdmlkLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICAgIHZpZC5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIHBsYXlDdHJsQnRuVmlkID0gKGNsaWNrZWRDdHJsQnRuKSA9PiB7XHJcbiAgICB0aGlzLmNsZWFyRmVhdHVyZXNUaW1lcnMoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5nbG9iYWwuZW5hYmxlUGF1c2UoKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmhpZGVGZWF0dXJlc0ludHJvVmlkRGl2KCk7XHJcbiAgICB0aGlzLnNob3dGZWF0dXJlc1ZpZERpdihjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LmZlYXR1cmUpO1xyXG4gICAgdGhpcy5hY3RpdmVGZWF0dXJlID0gY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5mZWF0dXJlO1xyXG4gICAgdGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmhpZGVBbGxUZXh0KCk7XHJcbiAgICB0aGlzLnNob3dGZWF0dXJlVGV4dCgpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0QWN0aXZlVmlkKHRoaXMuYWNpdHZlVmlkV3JhcCwgbnVsbCk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRTdGFydFRpbWUoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5zdGFydFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0RW5kVGltZShjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LmVuZFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50QnRuKGNsaWNrZWRDdHJsQnRuKTtcclxuICAgIHRoaXMuZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5wbGF5UmFuZ2UoKTtcclxuICB9O1xyXG4gIHBhdXNlQ3RybFZpZCA9ICgpID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLnRvZ2dsZVBhdXNlKCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgdmlkRW5kID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMuZmVhdHVyZXNFbmRpc0NhbmNlbGxlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5nbG9iYWwuZGlzYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzKCk7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmZlYXR1cmVzVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaGlkZUFsbFRleHQoKTtcclxuICAgICAgICAgIHRoaXMuc2hvd0ludHJvVGV4dCgpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwucmVzZXRBbGxTZWN0aW9uVmlkcygpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwuZGVhY3RpdmF0ZUN1cnJlbnRCdG5zKCk7XHJcbiAgICAgICAgICB0aGlzLmdsb2JhbC5lbmFibGVOYXZMaW5rc0FuZE5hdkJ0bigpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwuZW5hYmxlU2VjdGlvbkN0cmxCdG5FdmVudHMoKTtcclxuICAgICAgICAgIHRoaXMucGxheUZlYXR1cmVzSW50cm8oKTtcclxuICAgICAgICB9LCBUSU1JTkcuVUkuQkxBQ0tPVVRfV0FJVF9UT19SRVZFQUwpO1xyXG4gICAgICB9LCBUSU1JTkcuVklERU8uVklEX0VORF9USU1FUik7XHJcbiAgICB9XHJcbiAgfTtcclxuICBjbGVhckZlYXR1cmVzVGltZXJzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLmZlYXR1cmVzVGltZXIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc1RpbWVyID0gbnVsbDtcclxuICB9O1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEZlYXR1cmVzO1xyXG4iLCAiaW1wb3J0IHsgQVNTRVRTLCBWSUVXX1NUQVJUX0VORCB9IGZyb20gXCIuLzAtY29uZmlnXCI7XHJcbmNvbnN0IEhPTUVfVklFVyA9IFwidmlldy0xXCI7XHJcbmNsYXNzIERhdGEge1xyXG4gIGNvbnN0cnVjdG9yKGdsb2JhbENvbnRyb2xsZXIsIGNvbnRhaW5lcikge1xyXG4gICAgdGhpcy5nbG9iYWwgPSBnbG9iYWxDb250cm9sbGVyO1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7IC8vVGhlIHJvb3QgZm9yIHRoaXMgbW9kdWxlXHJcbiAgICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICAvL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICB0aGlzLmludHJvVGV4dCA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLnNlY3Rpb24td3JhcC10eHRcIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy52aWV3T3B0c0J0biA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLm9wdHMtbWVudS1idG5cIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUgPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5vcHRzLWRyb3Bkb3duXCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMuYWxsVmlld09wdEJ0bnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLm9wdHMtbWVudS1saW5rXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmRpbW1lciA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLmRpbW1lclwiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLnR4dEltZ0J0biA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLnR4dC1pbWctYnRuXCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIgPSB0aGlzLmdsb2JhbC5xdWVyeShcclxuICAgICAgXCIuc2VjdGlvbi13cmFwLWNvbXAtZGF0YVwiLFxyXG4gICAgICB0aGlzLmNvbnRhaW5lcixcclxuICAgICk7XHJcbiAgICB0aGlzLmFsbERhdGFXcmFwcGVycyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIuc2VjdGlvbi13cmFwLWNvbXAtZGF0YVwiLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hbGxEYXRhID0gWy4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLmNvbXAtZGF0YS13cmFwXCIsIHRoaXMuY29udGFpbmVyKV07XHJcbiAgICB0aGlzLmFsbEN0cmxCdG5XcmFwcGVycyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIuc2VjdGlvbi13cmFwLWJ0bnNcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWN0aXZlVmlld0J0biA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZVZpZXcgPSBcInZpZXctMVwiO1xyXG4gICAgdGhpcy5sYXN0QWN0aXZlVmlldyA9IHsgdmlldzogXCJ2aWV3LTFcIiwgc3RhcnRUaW1lOiAwLCBlbmRUaW1lOiAwIH07XHJcbiAgICB0aGlzLnZpZXdWaWRGbGFnID0gZmFsc2U7XHJcbiAgICB0aGlzLnZpZXdDaGFpbkZsYWcgPSBmYWxzZTtcclxuICAgIHRoaXMudHh0T3JJbWcgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFTaGVldCA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyID0gdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnNbMF07XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XHJcbiAgICB0aGlzLmVuZFRpbWUgPSAwO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuID0gbnVsbDtcclxuICAgIHRoaXMuZXZlbnRNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgW1wib3Blbi1kYXRhXCIsIHRoaXMuaW5pdFNlY3Rpb25dLFxyXG4gICAgICBbXCJwbGF5LWN0cmwtdmlkXCIsIHRoaXMuc2V0QW5kUGxheUN0cmxCdG5WaWRdLFxyXG4gICAgICBbXCJwbGF5LXZpZXctdmlkXCIsIHRoaXMuc2V0QW5kUGxheVZpZXdWaWRdLFxyXG4gICAgICBbXCJiYWNrLXRvLXZpZXdcIiwgdGhpcy5iYWNrVG9WaWV3RnJvbUNvbXBdLFxyXG4gICAgICBbXCJvcGVuLXZpZXctb3B0cy1tZW51XCIsIHRoaXMuc2hvd1ZpZXdPcHRzTWVudV0sXHJcbiAgICAgIFtcImNsb3NlLXZpZXctb3B0cy1tZW51XCIsIHRoaXMuaGlkZVZpZXdPcHRzTWVudV0sXHJcbiAgICAgIFtcInRvZ2dsZS1pbWctdHh0XCIsIHRoaXMuc2hvd0NvbXBJbWFnZU9yVGV4dF0sXHJcbiAgICAgIFtcImJ0bi1ob3ZlcmVkXCIsIHRoaXMuZ2xvYmFsLnRvZ2dsZUJ0bkhvdmVyQ2xhc3MuYmluZCh0aGlzKV0sXHJcbiAgICBdKTtcclxuICAgIHRoaXMuYXNzZXRzTWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcInZpZXctMVwiLCBBU1NFVFNbXCJ2aWV3LTFcIl0uZGVza3RvcF0sXHJcbiAgICAgIFtcInZpZXctMS1tcFwiLCBBU1NFVFNbXCJ2aWV3LTFcIl0ubW9iaWxlXSxcclxuICAgICAgW1widmlldy0yXCIsIEFTU0VUU1tcInZpZXctMlwiXS5kZXNrdG9wXSxcclxuICAgICAgW1widmlldy0yLW1wXCIsIEFTU0VUU1tcInZpZXctMlwiXS5tb2JpbGVdLFxyXG4gICAgICAvLyBbXCJ2aWV3LTNcIiwgQVNTRVRTW1widmlldy0zXCJdLmRlc2t0b3BdLFxyXG4gICAgICAvLyBbXCJ2aWV3LTMtbXBcIiwgQVNTRVRTW1widmlldy0zXCJdLm1vYmlsZV0sXHJcbiAgICBdKTtcclxuICB9XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBpbml0U2VjdGlvbiA9IChjbGlja2VkKSA9PiB7XHJcbiAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICAvL3NldHRpbmcgVUkgYW5kIGxvZ2ljLi4uXHJcbiAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy50eHRPckltZyA9IFwiaW1hZ2VcIjtcclxuICAgIHRoaXMudHh0SW1nQnRuLnRleHRDb250ZW50ID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy5oaWRlQmFja0J0bigpO1xyXG4gICAgdGhpcy5oaWRlQWxsRGF0YSgpO1xyXG4gICAgdGhpcy5yZXNldEFsbERhdGFTaGVldHMoKTtcclxuICAgIHRoaXMuaW50cm9UZXh0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnNob3dDdHJsQnRuV3JhcHBlcigpO1xyXG4gICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50TmF2TGluayhjbGlja2VkKTtcclxuICAgIC8vc2V0dGluZyB2aWQgZWxlbWVudC4uLlxyXG4gICAgdGhpcy5nbG9iYWwuY2xlYXJTZWN0aW9uVmlkU3JjKCk7IC8vcmV2ZWFsIHBvc3RlclxyXG4gICAgdGhpcy5zZXRMYXN0QWN0aXZlVmlldygpOyAvL2ZvciBiY2tncm5kIGltZ1xyXG4gICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gIH07XHJcbiAgaGFuZGxlRXZlbnQgPSAodHJpZ2dlciwgZXZlbnRBY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuZXZlbnRNYXAuZ2V0KGV2ZW50QWN0aW9uKTtcclxuICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgYWN0aW9uKHRyaWdnZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKGBObyBhY3Rpb24gZm91bmQgZm9yOiAke2V2ZW50QWN0aW9ufWApO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgc2hvd1ZpZXdPcHRzTWVudSA9ICgpID0+IHtcclxuICAgIHRoaXMudmlld09wdHNNZW51LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBoaWRlVmlld09wdHNNZW51ID0gKCkgPT4ge1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dDb21wSW1hZ2VPclRleHQgPSAoKSA9PiB7XHJcbiAgICBpZiAodGhpcy50eHRPckltZyA9PT0gXCJpbWFnZVwiKSB7XHJcbiAgICAgIHRoaXMudHh0T3JJbWcgPSBcInRleHRcIjtcclxuICAgICAgdGhpcy5kaW1tZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudHh0T3JJbWcgPSBcImltYWdlXCI7XHJcbiAgICAgIHRoaXMuZGltbWVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIHRoaXMuYWN0aXZlRGF0YVNoZWV0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIikudGV4dENvbnRlbnQgPVxyXG4gICAgICB0aGlzLnR4dE9ySW1nO1xyXG4gIH07XHJcbiAgaGlkZUFsbERhdGEgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmRlYWN0aXZhdGVBbGxEYXRhV3JhcHBlcnMoKTtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXJcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29tcC1kYXRhLXdyYXBcIilcclxuICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgfSk7XHJcbiAgfTtcclxuICBzaG93RGF0YSA9ICgpID0+IHtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIucXVlcnlTZWxlY3RvckFsbChcIi5jb21wLWRhdGEtd3JhcFwiKS5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBpZiAoZWwuZGF0YXNldC5jb21wID09PSB0aGlzLmFjdGl2ZUN0cmxCdG4uZGF0YXNldC5jb21wKVxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0YVNoZWV0ID0gZWw7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVNoZWV0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBoaWRlQmFja0J0biA9ICgpID0+IHtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXJcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY3RybC1idG4tYmFja1wiKVxyXG4gICAgICAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dCYWNrQnRuID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvckFsbChcIi5jdHJsLWJ0blwiKVxyXG4gICAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9KTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXJcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY3RybC1idG4tYmFja1wiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHJlc2V0QWxsRGF0YVNoZWV0cyA9ICgpID0+IHtcclxuICAgIHRoaXMuYWxsRGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoXCIuY29tcC1kYXRhLWJvZHktd3JhcFwiKS5zY3JvbGwoMCwgMCk7XHJcbiAgICAgIGVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2V0TGFzdEFjdGl2ZVZpZXcgPSAobmV3VmFsdWUpID0+IHtcclxuICAgIGlmICghbmV3VmFsdWUpIHtcclxuICAgICAgdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID0gdGhpcy5hY3RpdmVWaWV3O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID0gbmV3VmFsdWU7XHJcbiAgICB9XHJcbiAgfTtcclxuICBzZXRBY3RpdmVWaWV3ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVWaWV3ID0gdGhpcy5hY3RpdmVWaWV3QnRuLmRhdGFzZXQudmlldztcclxuICB9O1xyXG4gIHZpZXdCYWNrVG9TdGFydCA9ICgpID0+IHtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gVklFV19TVEFSVF9FTkRbdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3XS5zdGFydFRpbWU7XHJcbiAgICB0aGlzLmVuZFRpbWUgPSBWSUVXX1NUQVJUX0VORFt0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXddLmVuZFRpbWU7XHJcbiAgfTtcclxuICBzZXRWaWV3VmlkU3RhcnRBbmRFbmQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnZpZXdWaWRGbGFnID0gdHJ1ZTtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ICE9PSBIT01FX1ZJRVcgJiZcclxuICAgICAgdGhpcy5hY3RpdmVWaWV3ID09PSBIT01FX1ZJRVdcclxuICAgICkge1xyXG4gICAgICB0aGlzLnZpZXdCYWNrVG9TdGFydCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyAhPT0gSE9NRV9WSUVXICYmXHJcbiAgICAgIHRoaXMuYWN0aXZlVmlldyAhPT0gSE9NRV9WSUVXXHJcbiAgICApIHtcclxuICAgICAgdGhpcy52aWV3Q2hhaW5GbGFnID0gdHJ1ZTtcclxuICAgICAgdGhpcy52aWV3QmFja1RvU3RhcnQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLmFjdGl2ZVZpZXdCdG4uZGF0YXNldC5zdGFydFRpbWU7XHJcbiAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLmFjdGl2ZVZpZXdCdG4uZGF0YXNldC5lbmRUaW1lO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZFN0YXJ0QW5kRW5kID0gKCkgPT4ge1xyXG4gICAgdGhpcy52aWV3VmlkRmxhZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5oaWRlQWxsRGF0YSgpO1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLmFjdGl2ZUN0cmxCdG4uZGF0YXNldC5zdGFydFRpbWU7XHJcbiAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLmFjdGl2ZUN0cmxCdG4uZGF0YXNldC5lbmRUaW1lO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZFBvc3RlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFjdGl2ZVZpZCA9IHRoaXMuZ2xvYmFsLmdldEFjdGl2ZVZpZCgpO1xyXG4gICAgaWYgKCFhY3RpdmVWaWQpIHJldHVybjtcclxuICAgIGxldCBtYXBLZXkgPSB0aGlzLmFjdGl2ZVZpZXc7XHJcbiAgICBpZiAoYWN0aXZlVmlkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibXBcIikpIG1hcEtleSArPSBcIi1tcFwiO1xyXG4gICAgY29uc3QgYXNzZXQgPSB0aGlzLmFzc2V0c01hcC5nZXQobWFwS2V5KTtcclxuICAgIGFjdGl2ZVZpZC5zZXRBdHRyaWJ1dGUoXCJwb3N0ZXJcIiwgYXNzZXQpO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZEJhY2tncm91bmRJbWcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhY3RpdmVWaWQgPSB0aGlzLmdsb2JhbC5nZXRBY3RpdmVWaWQoKTtcclxuICAgIGlmICghYWN0aXZlVmlkKSByZXR1cm47XHJcbiAgICBjb25zdCBhY3RpdmVWaWRXcmFwID0gYWN0aXZlVmlkLmNsb3Nlc3QoXCIudmlkLXdyYXBcIik7XHJcbiAgICBsZXQgbWFwS2V5ID0gdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3O1xyXG4gICAgaWYgKGFjdGl2ZVZpZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm1wXCIpKSBtYXBLZXkgKz0gXCItbXBcIjtcclxuICAgIGNvbnN0IGFzc2V0ID0gdGhpcy5hc3NldHNNYXAuZ2V0KG1hcEtleSk7XHJcbiAgICBhY3RpdmVWaWRXcmFwLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke2Fzc2V0fVwiKWA7XHJcbiAgfTtcclxuICBkZWFjdGl2YXRlQWxsRGF0YVdyYXBwZXJzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxEYXRhV3JhcHBlcnMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2V0QW5kUGxheVZpZXdWaWQgPSAoY2xpY2tlZFZpZXdPcHRzQnRuKSA9PiB7XHJcbiAgICAvL3JldHVybiBpZiBjbGlja2VkIHZpZXcgc2FtZSBhcyBjdXJyZW50IHZpZXdcclxuICAgIGlmIChjbGlja2VkVmlld09wdHNCdG4uZGF0YXNldC52aWV3ID09PSB0aGlzLmFjdGl2ZVZpZXcpIHJldHVybjtcclxuICAgIC8vc2V0dGluZyBVSSBhbmQgbG9naWMuLi5cclxuICAgIHRoaXMudmlld09wdHNNZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnZpZXdPcHRzQnRuLnRleHRDb250ZW50ID0gY2xpY2tlZFZpZXdPcHRzQnRuLnRleHRDb250ZW50O1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlciA9IHRoaXMuYWxsRGF0YVdyYXBwZXJzLmZpbmQoXHJcbiAgICAgIChlbCkgPT4gZWwuZGF0YXNldC52aWV3ID09PSBjbGlja2VkVmlld09wdHNCdG4uZGF0YXNldC52aWV3LFxyXG4gICAgKTtcclxuICAgIHRoaXMuYWN0aXZlVmlld0J0biA9IGNsaWNrZWRWaWV3T3B0c0J0bjtcclxuICAgIC8vc2V0dGluZyB2aWQgZWxlbWVudC4uLlxyXG4gICAgdGhpcy5nbG9iYWwuc2V0QWN0aXZlVmlkKCk7XHJcbiAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgICB0aGlzLnNldEFjdGl2ZVZpZXcoKTsgLy9mb3IgdGhlIHBvc3RlclxyXG4gICAgdGhpcy5zZXRBY3RpdmVDdHJsQnRuV3JhcHBlcigpO1xyXG4gICAgLy9wbGF5IHZpZFxyXG4gICAgdGhpcy5zZXRWaWV3VmlkU3RhcnRBbmRFbmQoKTtcclxuICAgIHRoaXMucGxheURhdGFWaWQoKTtcclxuICB9O1xyXG4gIHNldEFuZFBsYXlDdHJsQnRuVmlkID0gKGNsaWNrZWRDdHJsQnRuKSA9PiB7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRBY3RpdmVWaWQoKTtcclxuICAgIHRoaXMuc2V0TGFzdEFjdGl2ZVZpZXcoKTsgLy9mb3IgdGhlIGJja2dybmQgaW1nIHRvIGNoYW5nZSB0byBjb21wIHZpZCBzdGFydHNcclxuICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgIHRoaXMuaGlkZUFjdGl2ZUN0cmxCdG5XcmFwcGVyKCk7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG4gPSBjbGlja2VkQ3RybEJ0bjtcclxuICAgIC8vcGxheVxyXG4gICAgdGhpcy5zZXREYXRhVmlkU3RhcnRBbmRFbmQodGhpcy5hY3RpdmVDdHJsQnRuKTtcclxuICAgIHRoaXMucGxheURhdGFWaWQoKTsgLy9yZW1vdmVzIGJsYWNrb3V0IGluIGdsb2JhbC5wbGF5UmFuZ2VcclxuICB9O1xyXG4gIHBsYXlEYXRhVmlkID0gKCkgPT4ge1xyXG4gICAgdGhpcy5pbnRyb1RleHQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldFN0YXJ0VGltZSh0aGlzLnN0YXJ0VGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRFbmRUaW1lKHRoaXMuZW5kVGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5wbGF5UmFuZ2UoKTtcclxuICB9O1xyXG4gIHZpZEVuZCA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLnZpZXdWaWRGbGFnICYmICF0aGlzLnZpZXdDaGFpbkZsYWcpIHtcclxuICAgICAgdGhpcy5zZXRMYXN0QWN0aXZlVmlldygpO1xyXG4gICAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgICAgIHRoaXMuc2V0RGF0YVZpZFBvc3RlcigpOyAvL2RvbmUgaGVyZSBzbyBwb3N0ZXIgZG9lc24ndCBhcHBlYXIgZWFybGllclxyXG4gICAgICB0aGlzLnNob3dBY3RpdmVDdHJsQnRuV3JhcHBlcigpO1xyXG4gICAgICB0aGlzLmludHJvVGV4dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmdsb2JhbC5lbmFibGVOYXZMaW5rc0FuZE5hdkJ0bigpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnZpZXdDaGFpbkZsYWcpIHtcclxuICAgICAgdGhpcy52aWV3Q2hhaW5GbGFnID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2V0TGFzdEFjdGl2ZVZpZXcoSE9NRV9WSUVXKTtcclxuICAgICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gICAgICB0aGlzLnNldFZpZXdWaWRTdGFydEFuZEVuZCgpO1xyXG4gICAgICB0aGlzLnBsYXlEYXRhVmlkKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyXHJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIilcclxuICAgICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5zaG93RGF0YSgpO1xyXG4gICAgICB0aGlzLnNob3dCYWNrQnRuKCk7XHJcbiAgICAgIC8vc2V0IGJja2dybmQgaW1nIHRvIGJsYWNrIHRvIHByZXZlbnQgZmxhc2ggb2YgaW1hZ2Ugd2hlbiBjaGFuZ2luZyBuYXZcclxuICAgICAgY29uc3QgYWN0aXZlVmlkV3JhcCA9IHRoaXMuZ2xvYmFsLmdldEFjdGl2ZVZpZCgpLmNsb3Nlc3QoXCIudmlkLXdyYXBcIik7XHJcbiAgICAgIGlmIChhY3RpdmVWaWRXcmFwKSB7XHJcbiAgICAgICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcIm5vbmVcIjtcclxuICAgICAgICBhY3RpdmVWaWRXcmFwLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiYmxhY2tcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbiAgYmFja1RvVmlld0Zyb21Db21wID0gKCkgPT4ge1xyXG4gICAgdGhpcy5nbG9iYWwuZmxhc2hCbGFja291dCgpO1xyXG4gICAgLy9zZXR0aW5nIFVJIGFuZCBsb2dpYy4uLlxyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlci5xdWVyeVNlbGVjdG9yKFwiLnR4dC1pbWctYnRuXCIpLnRleHRDb250ZW50ID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy50eHRPckltZyA9IFwiaW1hZ2VcIjtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXJcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIilcclxuICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmhpZGVBbGxEYXRhKCk7XHJcbiAgICB0aGlzLnJlc2V0QWxsRGF0YVNoZWV0cygpO1xyXG4gICAgdGhpcy5kaW1tZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuaW50cm9UZXh0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmhpZGVCYWNrQnRuKCk7XHJcbiAgICB0aGlzLnNob3dDdHJsQnRuV3JhcHBlcigpO1xyXG5cclxuICAgIC8vc2V0dGluZyB2aWQgZWxlbWVudC4uLlxyXG4gICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gICAgdGhpcy5nbG9iYWwuY2xlYXJTZWN0aW9uVmlkU3JjKCk7IC8vcmV2ZWFsIHBvc3RlclxyXG4gIH07XHJcbiAgaGlkZUFjdGl2ZUN0cmxCdG5XcmFwcGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0FjdGl2ZUN0cmxCdG5XcmFwcGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0N0cmxCdG5XcmFwcGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKFwiLmN0cmwtYnRuXCIpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNldEFjdGl2ZUN0cmxCdG5XcmFwcGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5nbG9iYWwuZGVhY3RpdmF0ZUFsbEN0cmxCdG5XcmFwcGVycygpO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlciA9IHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzLmZpbmQoXHJcbiAgICAgIChlbCkgPT4gZWwuZGF0YXNldC52aWV3ID09PSB0aGlzLmFjdGl2ZVZpZXcsXHJcbiAgICApO1xyXG4gIH07XHJcbiAgZGVhY3RpdmF0ZUFsbEN0cmxCdG5XcmFwcGVycyA9ICgpID0+IHtcclxuICAgIHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IERhdGE7XHJcbiIsICJpbXBvcnQgeyBMT09QX1NFUVVFTkNFX1ZJRFMgfSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG5cclxuY2xhc3MgU2VxdWVuY2Uge1xyXG4gIGNvbnN0cnVjdG9yKGdsb2JhbENvbnRyb2xsZXIsIGNvbnRhaW5lcikge1xyXG4gICAgdGhpcy5nbG9iYWwgPSBnbG9iYWxDb250cm9sbGVyO1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7IC8vVGhlIHJvb3QgZm9yIHRoaXMgbW9kdWxlXHJcbiAgICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICAvL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlciA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLnBhdXNlLXdyYXBcIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy5hbGxUeHRXcmFwcGVycyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIudHh0LXdyYXBcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWxsSW50cm9UeHQgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLmludHJvLXR4dC13cmFwXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmFsbEFjdGlvbkhlYWRpbmdzID0gW1xyXG4gICAgICAuLi50aGlzLmdsb2JhbC5xdWVyeUFsbChcIi5hY3Rpb24taGVhZGluZ1wiLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hbGxWaWRXcmFwcGVycyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIudmlkLXdyYXBcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzID0gW1xyXG4gICAgICAuLi50aGlzLmdsb2JhbC5xdWVyeUFsbChcIi5zZWN0aW9uLXdyYXAtYnRuc1wiLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5pc0Ryb3Bkb3duID0gZmFsc2U7XHJcbiAgICB0aGlzLmFjdGl2ZVNlcXVlbmNlID0gbnVsbDtcclxuICAgIHRoaXMuYWN0aXZlU2VjdGlvblR4dCA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZVZpZFdyYXBwZXIgPSBudWxsO1xyXG4gICAgdGhpcy5hbGxBY3RpdmVTZXF1ZW5jZVN0ZXBzID0gbnVsbDtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIgPSBudWxsO1xyXG4gICAgdGhpcy5zZXF1ZW5jZVRpbWVyID0gbnVsbDtcclxuICAgIHRoaXMuc2VxdWVuY2VFbmRJc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5ldmVudE1hcCA9IG5ldyBNYXAoW1xyXG4gICAgICBbXCJvcGVuLXNlcXVlbmNlXCIsIHRoaXMuaW5pdFNlY3Rpb25dLFxyXG4gICAgICBbXCJvcGVuLXNlcXVlbmNlLWluZGV4XCIsIHRoaXMuc2V0QWN0aXZlU2VxdWVuY2VEcm9wZG93bl0sXHJcbiAgICAgIFtcInBsYXktY3RybC12aWRcIiwgdGhpcy5wbGF5Q3RybEJ0blZpZF0sXHJcbiAgICAgIFtcInBhdXNlLWN0cmwtdmlkXCIsIHRoaXMucGF1c2VDdHJsVmlkXSxcclxuICAgICAgW1wiYnRuLWhvdmVyZWRcIiwgdGhpcy5nbG9iYWwudG9nZ2xlQnRuSG92ZXJDbGFzcy5iaW5kKHRoaXMpXSxcclxuICAgIF0pO1xyXG4gIH1cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy9GVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIGluaXRTZWN0aW9uID0gKGNsaWNrZWQpID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLmZsYXNoQmxhY2tvdXQoKTtcclxuICAgIHRoaXMuYWN0aXZlU2VxdWVuY2UgPSBjbGlja2VkLmRhdGFzZXQuc2VxdWVuY2U7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKCk7XHJcbiAgICB0aGlzLmhpZGVBbGxJbnRyb1RleHQoKTtcclxuICAgIHRoaXMuaGlkZUFsbEFjdGlvbkhlYWRpbmdzKCk7XHJcbiAgICB0aGlzLnNldEFuZFNob3dBY3RpdmVUeHRXcmFwcGVyKCk7XHJcbiAgICB0aGlzLnNldEFuZFNob3dBY3RpdmVWaWRXcmFwcGVyKCk7XHJcbiAgICB0aGlzLmFsbEFjdGl2ZVNlcXVlbmNlU3RlcHMgPSBuZXcgU2V0KCk7XHJcbiAgICBjb25zdCBzdGVwcyA9IHRoaXMuYWN0aXZlVmlkV3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlXCIpO1xyXG4gICAgc3RlcHMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgdGhpcy5hbGxBY3RpdmVTZXF1ZW5jZVN0ZXBzLmFkZChlbC5kYXRhc2V0LnN0ZXApO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNldEFuZFNob3dBY3RpdmVDdHJsQnRuV3JhcHBlcigpO1xyXG4gICAgdGhpcy5hY3RpdmVUeHRXcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmludHJvLXR4dC13cmFwXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgaWYgKCF0aGlzLmlzRHJvcGRvd24pIHtcclxuICAgICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50TmF2TGluayhjbGlja2VkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudE5hdkxpbmsoXHJcbiAgICAgICAgY2xpY2tlZC5jbG9zZXN0KFwiLm5hdl9tZW51X2xpbmstd3JhcFwiKS5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51X2xpbmtcIiksXHJcbiAgICAgICk7XHJcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxyXG4gICAgICAgIG5ldyBDdXN0b21FdmVudChcImRyb3Bkb3duT3B0Q2xpY2tlZFwiLCB7IGRldGFpbDogY2xpY2tlZCB9KSxcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5pc0Ryb3Bkb3duID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfTtcclxuICBoYW5kbGVFdmVudCA9ICh0cmlnZ2VyLCBldmVudEFjdGlvbikgPT4ge1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5ldmVudE1hcC5nZXQoZXZlbnRBY3Rpb24pO1xyXG4gICAgaWYgKGFjdGlvbikge1xyXG4gICAgICBhY3Rpb24odHJpZ2dlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oYE5vIGFjdGlvbiBmb3VuZCBmb3I6ICR7ZXZlbnRBY3Rpb259YCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBzZXRBY3RpdmVTZXF1ZW5jZURyb3Bkb3duID0gKGNsaWNrZWQpID0+IHtcclxuICAgIGlmIChcImlzRHJvcGRvd25JY29uXCIgaW4gY2xpY2tlZC5kYXRhc2V0KSB7XHJcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxyXG4gICAgICAgIG5ldyBDdXN0b21FdmVudChcImRyb3Bkb3duSWNvbkNsaWNrZWRcIiwgeyBkZXRhaWw6IGNsaWNrZWQgfSksXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlzRHJvcGRvd24gPSB0cnVlO1xyXG4gICAgICB0aGlzLmluaXRTZWN0aW9uKGNsaWNrZWQpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgc2V0QW5kU2hvd0FjdGl2ZVR4dFdyYXBwZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFsbFR4dFdyYXBwZXJzLmZvckVhY2goKGVsKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpKTtcclxuICAgIHRoaXMuYWN0aXZlVHh0V3JhcHBlciA9IHRoaXMuYWxsVHh0V3JhcHBlcnMuZmluZChcclxuICAgICAgKGVsKSA9PiBlbC5kYXRhc2V0LnNlcXVlbmNlID09PSB0aGlzLmFjdGl2ZVNlcXVlbmNlLFxyXG4gICAgKTtcclxuICAgIHRoaXMuYWN0aXZlVHh0V3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2V0QW5kU2hvd0FjdGl2ZVZpZFdyYXBwZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFsbFZpZFdyYXBwZXJzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGVcIikuZm9yRWFjaChmdW5jdGlvbiAoZWwyKSB7XHJcbiAgICAgICAgZWwyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmFjdGl2ZVZpZFdyYXBwZXIgPSB0aGlzLmFsbFZpZFdyYXBwZXJzLmZpbmQoXHJcbiAgICAgIChlbCkgPT4gZWwuZGF0YXNldC5zZXF1ZW5jZSA9PT0gdGhpcy5hY3RpdmVTZXF1ZW5jZSxcclxuICAgICk7XHJcbiAgICB0aGlzLmFjdGl2ZVZpZFdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNldEFjdGl2ZVNlcXVlbmNlU3RlcCA9IChzZXF1ZW5jZVN0ZXBEYXRhKSA9PiB7XHJcbiAgICB0aGlzLmFjdGl2ZVZpZFdyYXBwZXIucXVlcnlTZWxlY3RvckFsbChcIi52aWQtY29kZVwiKS5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBpZiAoZWwuZGF0YXNldC5zdGVwID09PSBzZXF1ZW5jZVN0ZXBEYXRhKSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikgJiYgZWwub2Zmc2V0UGFyZW50ICE9PSBudWxsKVxyXG4gICAgICAgIHRoaXMuYWN0aXZlU2VxdWVuY2VTdGVwID0gZWwucXVlcnlTZWxlY3RvcihcIi52aWRcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIHNldEFuZFNob3dBY3RpdmVDdHJsQnRuV3JhcHBlciA9ICgpID0+IHtcclxuICAgIHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzLmZvckVhY2goKGVsKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIgPSB0aGlzLmFsbEN0cmxCdG5XcmFwcGVycy5maW5kKFxyXG4gICAgICAoZWwpID0+IGVsLmRhdGFzZXQuc2VxdWVuY2UgPT09IHRoaXMuYWN0aXZlU2VxdWVuY2UsXHJcbiAgICApO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgaGlkZUFsbEludHJvVGV4dCA9ICgpID0+IHtcclxuICAgIHRoaXMuYWxsSW50cm9UeHQuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgaGlkZUFsbEFjdGlvbkhlYWRpbmdzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxBY3Rpb25IZWFkaW5ncy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBwbGF5Q3RybEJ0blZpZCA9IChjbGlja2VkQ3RybEJ0bikgPT4ge1xyXG4gICAgdGhpcy5jbGVhclNlcXVlbmNlVGltZXJzKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmVuYWJsZVBhdXNlKCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVUeHRXcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmludHJvLXR4dC13cmFwXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVUeHRXcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmFjdGlvbi1oZWFkaW5nXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5zZXF1ZW5jZUVuZElzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnNldEFjdGl2ZVNlcXVlbmNlU3RlcChjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LnN0ZXApO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0QWN0aXZlVmlkKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRTdGFydFRpbWUoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5zdGFydFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0RW5kVGltZShjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LmVuZFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50QnRuKGNsaWNrZWRDdHJsQnRuKTtcclxuICAgIHRoaXMuZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5wbGF5UmFuZ2UoKTtcclxuICB9O1xyXG4gIHBhdXNlQ3RybFZpZCA9ICgpID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLnRvZ2dsZVBhdXNlKCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgdmlkRW5kID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMuc2VxdWVuY2VFbmRJc0NhbmNlbGxlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKHRoaXMucGF1c2VXcmFwcGVyKTtcclxuICAgICAgdGhpcy5nbG9iYWwuZGVhY3RpdmF0ZUN1cnJlbnRCdG5zKCk7XHJcbiAgICAgIGlmIChMT09QX1NFUVVFTkNFX1ZJRFMpIHtcclxuICAgICAgICBsZXQgYWN0aXZlU3RlcEluZGV4ID0gWy4uLnRoaXMuYWxsQWN0aXZlU2VxdWVuY2VTdGVwc10uaW5kZXhPZihcclxuICAgICAgICAgIHRoaXMuYWN0aXZlU2VxdWVuY2VTdGVwLnBhcmVudEVsZW1lbnQuZGF0YXNldC5zdGVwLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGFjdGl2ZVN0ZXBJbmRleCA9PT0gdGhpcy5hbGxBY3RpdmVTZXF1ZW5jZVN0ZXBzLnNpemUgLSAxKVxyXG4gICAgICAgICAgYWN0aXZlU3RlcEluZGV4ID0gMDtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGFjdGl2ZVN0ZXBJbmRleCArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBuZXh0U3RlcEJ0biA9IFtcclxuICAgICAgICAgIC4uLnRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIucXVlcnlTZWxlY3RvckFsbChcIi5jdHJsLWJ0blwiKSxcclxuICAgICAgICBdLmZpbmQoXHJcbiAgICAgICAgICAoZWwpID0+XHJcbiAgICAgICAgICAgIGVsLmRhdGFzZXQuc3RlcCA9PT1cclxuICAgICAgICAgICAgWy4uLnRoaXMuYWxsQWN0aXZlU2VxdWVuY2VTdGVwc11bYWN0aXZlU3RlcEluZGV4XSxcclxuICAgICAgICApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wbGF5Q3RybEJ0blZpZChuZXh0U3RlcEJ0bik7XHJcbiAgICAgICAgfSwgMjAwKTsgLy9kZWxheSB0byBzdGFiaWxpemUgZWxlbWVudHMgYmVmb3JlIHBsYXlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbiAgY2xlYXJTZXF1ZW5jZVRpbWVycyA9ICgpID0+IHtcclxuICAgIHRoaXMuc2VxdWVuY2VFbmRJc0NhbmNlbGxlZCA9IHRydWU7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5zZXF1ZW5jZVRpbWVyKTtcclxuICAgIHRoaXMuc2VxdWVuY2VUaW1lciA9IG51bGw7XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBTZXF1ZW5jZTtcclxuIiwgImltcG9ydCB7IFRJTUlORyB9IGZyb20gXCIuLzAtY29uZmlnXCI7XHJcbmltcG9ydCAqIGFzIGdsb2JhbCBmcm9tIFwiLi8wLWdsb2JhbFwiO1xyXG5pbXBvcnQgTmF2YmFyQ2xhc3MgZnJvbSBcIi4vMC1uYXZiYXJcIjtcclxuaW1wb3J0IEZlYXR1cmVzQ2xhc3MgZnJvbSBcIi4vMS1mZWF0dXJlc1wiO1xyXG5pbXBvcnQgRGF0YUNsYXNzIGZyb20gXCIuLzItZGF0YVwiO1xyXG5pbXBvcnQgU2VxdWVuY2VDbGFzcyBmcm9tIFwiLi8zLXNlcXVlbmNlXCI7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9pbml0IGNhbGwgKGZ1bmN0aW9uIGF0IGJvdHRvbSkuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgaW5pdCgpO1xyXG59KTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbmNvbnN0IG5hdkNvbnRhaW5lciA9IGdsb2JhbC5xdWVyeShcIi5uYXZfY29tcG9uZW50XCIsIGRvY3VtZW50KTtcclxuY29uc3QgZmVhdHVyZXNDb250YWluZXIgPSBnbG9iYWwucXVlcnkoXCIuc2VjdGlvbi5mZWF0dXJlc1wiLCBkb2N1bWVudCk7XHJcbmNvbnN0IGRhdGFDb250YWluZXIgPSBnbG9iYWwucXVlcnkoXCIuc2VjdGlvbi5kYXRhXCIsIGRvY3VtZW50KTtcclxuY29uc3Qgc2VxdWVuY2VDb250YWluZXIgPSBnbG9iYWwucXVlcnkoXCIuc2VjdGlvbi5zZXF1ZW5jZVwiLCBkb2N1bWVudCk7XHJcbmNvbnN0IG5hdmJhciA9IG5ldyBOYXZiYXJDbGFzcyhnbG9iYWwsIG5hdkNvbnRhaW5lcik7XHJcbmNvbnN0IGZlYXR1cmVzID0gbmV3IEZlYXR1cmVzQ2xhc3MoZ2xvYmFsLCBmZWF0dXJlc0NvbnRhaW5lcik7XHJcbmNvbnN0IGRhdGEgPSBuZXcgRGF0YUNsYXNzKGdsb2JhbCwgZGF0YUNvbnRhaW5lcik7XHJcbmNvbnN0IHNlcXVlbmNlID0gbmV3IFNlcXVlbmNlQ2xhc3MoZ2xvYmFsLCBzZXF1ZW5jZUNvbnRhaW5lcik7XHJcbmNvbnN0IFNFQ1RJT05TID0ge1xyXG4gIG5hdmJhcjogbmF2YmFyLFxyXG4gIGZlYXR1cmVzOiBmZWF0dXJlcyxcclxuICBkYXRhOiBkYXRhLFxyXG4gIHNlcXVlbmNlOiBzZXF1ZW5jZSxcclxufTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0VWRU5UIERFTEVHQVRJT04tTkFWLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbm5hdkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLWNsaWNrLWFjdGlvbl1cIik7XHJcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XHJcbiAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IGNsaWNrZWQuZGF0YXNldC5uYXZTZWN0aW9uO1xyXG4gIGNvbnN0IHRhcmdldE1vZHVsZSA9IFNFQ1RJT05TW2FjdGl2ZVNlY3Rpb25dO1xyXG4gIGNvbnN0IGFjdGlvbiA9IGNsaWNrZWQuZGF0YXNldC5jbGlja0FjdGlvbjtcclxuICAvLzEuIEdlbmVyaWMgY2xlYW51cFxyXG4gIGlmIChcImlzRHJvcGRvd25JY29uXCIgaW4gY2xpY2tlZC5kYXRhc2V0KSB7XHJcbiAgICAvLyBQb2x5bW9ycGhpYyBjYWxsIG9ubHkgLSBqdXN0IHRvZ2dsaW5nIGRyb3Bkb3duXHJcbiAgICB0YXJnZXRNb2R1bGUuaGFuZGxlRXZlbnQoY2xpY2tlZCwgYWN0aW9uKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgLy9kb250IGZsYXNoIGlmIG9ubHkgY2xpY2tpbmcgZHJvcGRvd25cclxuICBnbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAvLzIuIFN0YXRlIHVwZGF0ZVxyXG4gIGdsb2JhbC5zZXRBY3RpdmVTZWN0aW9uKGFjdGl2ZVNlY3Rpb24pO1xyXG4gIC8vMy4gUG9seW1vcnBoaWMgY2FsbFxyXG4gIHRhcmdldE1vZHVsZS5oYW5kbGVFdmVudChjbGlja2VkLCBhY3Rpb24pO1xyXG59KTtcclxubmF2Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBob3ZlcmVkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLW1vdXNlb3Zlci1hY3Rpb25dXCIpO1xyXG4gIGlmICghaG92ZXJlZCkgcmV0dXJuO1xyXG4gIGlmICh0aGlzLmN1cnJlbnRIb3ZlciA9PT0gaG92ZXJlZCkgcmV0dXJuOyAvLyBFeGl0IGlmIHdlIGFyZSBhbHJlYWR5IGhvdmVyaW5nIGl0XHJcbiAgdGhpcy5jdXJyZW50SG92ZXIgPSBob3ZlcmVkO1xyXG4gIGNvbnN0IGFjdGlvbiA9IGhvdmVyZWQuZGF0YXNldC5tb3VzZW92ZXJBY3Rpb247XHJcbiAgbmF2YmFyLmhhbmRsZUV2ZW50KGhvdmVyZWQsIGFjdGlvbik7XHJcbn0pO1xyXG5uYXZDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgaG92ZXJlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tb3VzZW91dC1hY3Rpb25dXCIpO1xyXG4gIGlmICghaG92ZXJlZCkgcmV0dXJuO1xyXG4gIC8vIElmIHRoZSBtb3VzZSBtb3ZlZCB0byBhIGNoaWxkIG9mIHRoZSBzYW1lIGJ1dHRvbiwgZG9uJ3QgdHJpZ2dlciB0aGUgXCJFeGl0XCJcclxuICBpZiAoaG92ZXJlZC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpKSByZXR1cm47XHJcbiAgdGhpcy5jdXJyZW50SG92ZXIgPSBudWxsO1xyXG4gIGNvbnN0IGFjdGlvbiA9IGhvdmVyZWQuZGF0YXNldC5tb3VzZW91dEFjdGlvbjtcclxuICBuYXZiYXIuaGFuZGxlRXZlbnQoaG92ZXJlZCwgYWN0aW9uKTtcclxufSk7XHJcbi8vQ3VzdG9tIGV2ZW50OiBuYXYgZHJvcGRvd24gaWNvbiBjbGlja2VkXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZHJvcGRvd25JY29uQ2xpY2tlZFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGNsaWNrZWQgPSBlLmRldGFpbDtcclxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcclxuICBuYXZiYXIudG9nZ2xlTmF2RHJvcGRvd24oY2xpY2tlZCk7XHJcbn0pO1xyXG4vL0N1c3RvbSBldmVudDogbmF2IGRyb3Bkb3duIG9wdCBjbGlja2VkXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZHJvcGRvd25PcHRDbGlja2VkXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgY2xpY2tlZCA9IGUuZGV0YWlsO1xyXG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xyXG4gIG5hdmJhci5jbG9zZU5hdkRyb3Bkb3duKGNsaWNrZWQpO1xyXG4gIG5hdmJhci5jbG9zZU1vYmlsZU5hdk1lbnUoKTtcclxufSk7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9FVkVOVCBERUxFR0FUSU9OLU1BSU4gQk9EWS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5nbG9iYWwubWFpbldyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1jbGljay1hY3Rpb25dXCIpO1xyXG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xyXG4gIGNvbnN0IGFjdGl2ZVNlY3Rpb24gPSBjbGlja2VkLmNsb3Nlc3QoXCIuc2VjdGlvblwiKS5kYXRhc2V0LnNlY3Rpb247XHJcbiAgY29uc3QgdGFyZ2V0TW9kdWxlID0gU0VDVElPTlNbYWN0aXZlU2VjdGlvbl07XHJcbiAgY29uc3QgYWN0aW9uID0gY2xpY2tlZC5kYXRhc2V0LmNsaWNrQWN0aW9uO1xyXG4gIHRhcmdldE1vZHVsZS5oYW5kbGVFdmVudChjbGlja2VkLCBhY3Rpb24pO1xyXG59KTtcclxuZ2xvYmFsLm1haW5XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBob3ZlcmVkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLW1vdXNlb3Zlci1hY3Rpb25dXCIpO1xyXG4gIGlmICghaG92ZXJlZCkgcmV0dXJuO1xyXG4gIGlmICh0aGlzLmN1cnJlbnRIb3ZlciA9PT0gaG92ZXJlZCkgcmV0dXJuOyAvLyBFeGl0IGlmIHdlIGFyZSBhbHJlYWR5IGhvdmVyaW5nIGl0XHJcbiAgdGhpcy5jdXJyZW50SG92ZXIgPSBob3ZlcmVkO1xyXG4gIGNvbnN0IGFjdGl2ZVNlY3Rpb24gPSBob3ZlcmVkLmNsb3Nlc3QoXCIuc2VjdGlvblwiKS5kYXRhc2V0LnNlY3Rpb247XHJcbiAgY29uc3QgdGFyZ2V0TW9kdWxlID0gU0VDVElPTlNbYWN0aXZlU2VjdGlvbl07XHJcbiAgY29uc3QgYWN0aW9uID0gaG92ZXJlZC5kYXRhc2V0Lm1vdXNlb3ZlckFjdGlvbjtcclxuICB0YXJnZXRNb2R1bGUuaGFuZGxlRXZlbnQoaG92ZXJlZCwgYWN0aW9uKTtcclxufSk7XHJcbmdsb2JhbC5tYWluV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBob3ZlcmVkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLW1vdXNlb3V0LWFjdGlvbl1cIik7XHJcbiAgaWYgKCFob3ZlcmVkKSByZXR1cm47XHJcbiAgLy8gSWYgdGhlIG1vdXNlIG1vdmVkIHRvIGEgY2hpbGQgb2YgdGhlIHNhbWUgYnV0dG9uLCBkb24ndCB0cmlnZ2VyIHRoZSBcIkV4aXRcIlxyXG4gIGlmIChob3ZlcmVkLmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpIHJldHVybjtcclxuICB0aGlzLmN1cnJlbnRIb3ZlciA9IG51bGw7XHJcbiAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IGhvdmVyZWQuY2xvc2VzdChcIi5zZWN0aW9uXCIpLmRhdGFzZXQuc2VjdGlvbjtcclxuICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1thY3RpdmVTZWN0aW9uXTtcclxuICBjb25zdCBhY3Rpb24gPSBob3ZlcmVkLmRhdGFzZXQubW91c2VvdXRBY3Rpb247XHJcbiAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGhvdmVyZWQsIGFjdGlvbik7XHJcbn0pO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vRVZFTlQgREVMRUdBVElPTi1WSURTLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy92aWQgZW5kZWRcclxuZ2xvYmFsLmFsbFZpZHMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICBlbC5hZGRFdmVudExpc3RlbmVyKFwiZW5kZWRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgIGNvbnN0IGVuZGVkVmlkID0gZS50YXJnZXQuY2xvc2VzdChcIi52aWRcIik7XHJcbiAgICBpZiAoIWVuZGVkVmlkKSByZXR1cm47XHJcbiAgICBjb25zdCB2aWRTZWN0aW9uID0gZW5kZWRWaWQuY2xvc2VzdChcIi5zZWN0aW9uXCIpLmRhdGFzZXQuc2VjdGlvbjtcclxuICAgIGNvbnN0IHRhcmdldE1vZHVsZSA9IFNFQ1RJT05TW3ZpZFNlY3Rpb25dO1xyXG4gICAgdGFyZ2V0TW9kdWxlLnZpZEVuZCgpO1xyXG4gIH0pO1xyXG59KTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0ZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vaW5pdFxyXG5jb25zdCBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gIHNldHVwTGF6eUxvYWRpbmcoKTtcclxuICBnbG9iYWwuc2V0V2ViZmxvd0JyZWFrcG9pbnQoKTtcclxuICBnbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICBuYXZDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICBuYXZiYXIuYWxsTmF2RHJvcGRvd25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG4gIGdsb2JhbC5zZXRBY3RpdmVTZWN0aW9uKFwiZmVhdHVyZXNcIik7XHJcbiAgZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG4gIGdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIGZlYXR1cmVzLnBsYXlGZWF0dXJlc0ludHJvKCk7XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIG5hdkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgZmVhdHVyZXMuaW5pdFNlY3Rpb24obnVsbCwgKGlzSW50cm8gPSB0cnVlKSk7XHJcbiAgfSwgVElNSU5HLlVJLlNUQVJUX1VJX1JFVkVBTCk7XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxufTtcclxuY29uc3Qgc2V0dXBMYXp5TG9hZGluZyA9IGZ1bmN0aW9uICgpIHtcclxuICBjb25zdCBhbGxMYXp5VmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpO1xyXG4gIGNvbnN0IG9ic2VydmVyT3B0aW9ucyA9IHtcclxuICAgIHJvb3Q6IG51bGwsXHJcbiAgICByb290TWFyZ2luOiBcIjBweFwiLFxyXG4gICAgdGhyZXNob2xkOiAwLjEsXHJcbiAgfTtcclxuICBjb25zdCB2aWRlb09ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XHJcbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IHZpZGVvID0gZW50cnkudGFyZ2V0O1xyXG4gICAgICBjb25zdCBzb3VyY2VzID0gdmlkZW8ucXVlcnlTZWxlY3RvckFsbChcInNvdXJjZVwiKTtcclxuICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XHJcbiAgICAgICAgLy8gLS0tIExPQUQgTE9HSUMgLS0tXHJcbiAgICAgICAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcclxuICAgICAgICAgIC8vIFVzZSBkYXRhLXNyYyBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSBrZWVwIGN1cnJlbnQgc3JjXHJcbiAgICAgICAgICBjb25zdCBkYXRhU3JjID0gc291cmNlLmdldEF0dHJpYnV0ZShcImRhdGEtc3JjXCIpIHx8IHNvdXJjZS5zcmM7XHJcbiAgICAgICAgICBpZiAoZGF0YVNyYykge1xyXG4gICAgICAgICAgICBzb3VyY2Uuc3JjID0gZGF0YVNyYztcclxuICAgICAgICAgICAgLy8gS2VlcCBkYXRhLXNyYyBhdHRyaWJ1dGUgc28gd2UgY2FuIGZpbmQgdGhlIFVSTCBhZ2FpbiBsYXRlclxyXG4gICAgICAgICAgICBzb3VyY2Uuc2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIiwgZGF0YVNyYyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmlkZW8ubG9hZCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIC0tLSBVTkxPQUQgTE9HSUMgLS0tXHJcbiAgICAgICAgLy8gQ2xlYXJzIHRoZSBpbnRlcm5hbCBsb2dzIGZvciB1c2VyIGludGVyYWN0aW9ucyBhbmQgcmVzb3VyY2UgbG9hZHNcclxuICAgICAgICBwZXJmb3JtYW5jZS5jbGVhck1lYXN1cmVzKCk7XHJcbiAgICAgICAgcGVyZm9ybWFuY2UuY2xlYXJSZXNvdXJjZVRpbWluZ3MoKTtcclxuICAgICAgICBwZXJmb3JtYW5jZS5jbGVhck1hcmtzKCk7XHJcbiAgICAgICAgUmVzZXRTZWN0aW9uKHZpZGVvLmNsb3Nlc3QoXCIuc2VjdGlvblwiKSk7XHJcbiAgICAgICAgdmlkZW8ucGF1c2UoKTtcclxuICAgICAgICBzb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgLy8gTW92ZSBzcmMgYmFjayB0byBkYXRhLXNyYyBhbmQgZW1wdHkgdGhlIGN1cnJlbnQgc3JjXHJcbiAgICAgICAgICBjb25zdCBjdXJyZW50U3JjID0gc291cmNlLnNyYztcclxuICAgICAgICAgIGlmIChjdXJyZW50U3JjKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiLCBjdXJyZW50U3JjKTtcclxuICAgICAgICAgICAgc291cmNlLnNyYyA9IFwiXCI7IC8vIFRoaXMgc3RvcHMgdGhlIHZpZGVvIGZyb20gYnVmZmVyaW5nXHJcbiAgICAgICAgICAgIHNvdXJjZS5yZW1vdmVBdHRyaWJ1dGUoXCJzcmNcIik7IC8vIEZ1bGx5IGNsZWFyIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEZvcmNlIHRoZSBicm93c2VyIHRvIGR1bXAgdGhlIHZpZGVvIGRhdGEgZnJvbSBtZW1vcnlcclxuICAgICAgICB2aWRlby5sb2FkKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sIG9ic2VydmVyT3B0aW9ucyk7XHJcbiAgYWxsTGF6eVZpZHMuZm9yRWFjaCgodmlkKSA9PiB2aWRlb09ic2VydmVyLm9ic2VydmUodmlkKSk7XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vUkVTRVQgVklEUyBBRlRFUiBVTkxPQURJTkcuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBjb25zdCBSZXNldFNlY3Rpb24gPSBmdW5jdGlvbiAoc2VjdGlvbikge1xyXG4gICAgaWYgKCFzZWN0aW9uKSByZXR1cm47IC8vaGVscHMgcHJldmVudCBjcmFzaGVzXHJcbiAgICBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgZWwucGF1c2UoKTtcclxuICAgIH0pO1xyXG4gICAgZ2xvYmFsLmRlYWN0aXZhdGVDdXJy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
