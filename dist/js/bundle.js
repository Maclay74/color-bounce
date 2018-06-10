(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Animation =
/*#__PURE__*/
function () {
  function Animation(time, iterator) {
    _classCallCheck(this, Animation);

    _defineProperty(this, "from", 0);

    _defineProperty(this, "time", 0);

    _defineProperty(this, "iterator", function () {});

    _defineProperty(this, "callback", function () {});

    this.time = time;
    this.iterator = iterator;
    this.current = this.from;
    game.app.on("update", this.update, this);
  }

  _createClass(Animation, [{
    key: "update",
    value: function update(dt) {
      this.current += dt * 1000;
      var percentDone = this.current / (this.time / 100);

      if (this.current > this.time) {
        game.app.off("update", this.update, this);
        if (this.callback) return this.callback();
        return true;
      } else {
        this.iterator(percentDone / 100);
      }
    }
  }]);

  return Animation;
}();

exports.default = Animation;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Scene = _interopRequireDefault(require("./Scene"));

var _MainMenu = _interopRequireDefault(require("./scenes/MainMenu"));

var _Customize = _interopRequireDefault(require("./scenes/Customize"));

var _GameLoop = _interopRequireDefault(require("./scenes/GameLoop"));

var _CustomizeBall = _interopRequireDefault(require("./scenes/CustomizeBall"));

var _LocalStorage = _interopRequireDefault(require("./storages/LocalStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _construct(Parent, args, Class) { if (typeof Reflect !== "undefined" && Reflect.construct) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Parent.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Application =
/*#__PURE__*/
function () {
  function Application(app) {
    _classCallCheck(this, Application);

    _defineProperty(this, "configFile", "config/game.json");

    _defineProperty(this, "camera", new pc.Entity('camera'));

    _defineProperty(this, "cameraTargetPosition", new pc.Vec3());

    _defineProperty(this, "cameraTargetRotation", new pc.Quat(0, 1, 0, 1));

    _defineProperty(this, "cameraMovingSpeed", 5);

    _defineProperty(this, "cameraRotationSpeed", 5);

    _defineProperty(this, "ballStyleId", 0);

    _defineProperty(this, "light", new pc.Entity('light'));

    _defineProperty(this, "screen", new pc.Entity("screen"));

    _defineProperty(this, "ball", new pc.Entity("ball"));

    this.app = app;
    this.scene = new _Scene.default(this.app, this);
    this.storage = new _LocalStorage.default(); // Set up game events

    this.events(); // Get config and apply some settings

    this.loadConfig().then(this.storage.init).then(this.preloadAssets.bind(this)).then(this.hierarchy.bind(this)).then(function () {
      app.fire("game:menu");
    });
  }

  _createClass(Application, [{
    key: "loadConfig",
    value: function loadConfig() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        axios.get(_this.configFile).then(function (config) {
          if (!config || !config.data) reject("An error occurred when loading config file");
          _this.config = config.data;
          resolve(_this.config);
        });
      });
    }
  }, {
    key: "events",
    value: function events() {
      var _this2 = this;

      this.app.on("scene:set", function (scene) {
        _this2.scene = new scene(_this2.app, _this2);
      });
      this.app.on("game:menu", function () {
        _this2.scene.hide().then(function () {
          _this2.app.fire("scene:set", _MainMenu.default);
        });
      });
      this.app.on("game:start", function () {
        _this2.scene.hide().then(function () {
          _this2.app.fire("scene:set", _GameLoop.default);
        });
      });
      this.app.on("game:customize", function () {
        _this2.scene.hide().then(function () {
          _this2.app.fire("scene:set", _Customize.default);
        });
      });
      this.app.on("game:customize:ball", function () {
        _this2.scene.hide().then(function () {
          _this2.app.fire("scene:set", _CustomizeBall.default);
        });
      });
      this.app.on("game:customize:background", function () {
        _this2.storage.set("ballStyle", 0); //todo implement that


        return;

        _this2.scene.hide().then(function () {
          _this2.app.fire("scene:set", CustomizeBackground);
        });
      });
      this.app.on("update", function (dt) {
        _this2.update(dt);
      });
    }
  }, {
    key: "update",
    value: function update(dt) {
      // Move the camera
      var cameraPosition = this.camera.getPosition().clone();
      cameraPosition.lerp(cameraPosition, this.cameraTargetPosition, this.cameraMovingSpeed * dt);
      this.camera.setPosition(cameraPosition); // Rotate the camera

      var cameraRotation = this.camera.getRotation().clone();
      cameraRotation = cameraRotation.slerp(cameraRotation, this.cameraTargetRotation, this.cameraRotationSpeed * dt);
      this.camera.setRotation(cameraRotation);
    }
  }, {
    key: "preloadAssets",
    value: function preloadAssets() {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.getAssets().then(function (assets) {
          var requests = assets.map(function (asset) {
            return Application.loadAsset.apply(Application, _toConsumableArray(asset));
          });
          Promise.all(requests).then(function (assets) {
            return resolve(assets);
          });
        });
      });
    }
  }, {
    key: "initBackground",
    value: function initBackground() {
      var _this4 = this;

      this.backgroundLayer = new pc.Layer("background");
      this.backgroundLayer.name = "background";
      this.backgroundLayer.addCamera(this.camera.camera);
      this.backgroundLayer.addLight(this.light);
      game.app.scene.layers.insertOpaque(this.backgroundLayer, 0);
      game.app.scene.layers.insertTransparent(this.backgroundLayer, 0);
      this.backgroundScreen = new pc.Entity("background-screen");
      this.backgroundScreen.addComponent("screen", {
        screenSpace: true,
        referenceResolution: pc.Vec2(1280, 720),
        scaleMode: pc.SCALEMODE_BLEND,
        scaleBlend: 1
      });
      this.backgroundImage = new pc.Entity("background-image");
      Application.getAsset("background.png", "texture").then(function (asset) {
        _this4.backgroundImage.addComponent("element", {
          type: pc.ELEMENTTYPE_IMAGE,
          anchor: new pc.Vec4(0, 0, 1, 1),
          pivot: new pc.Vec2(0.5, 0.5),
          texture: asset.resource,
          layers: [5]
        });

        _this4.backgroundScreen.addChild(_this4.backgroundImage);
      });
      this.app.root.addChild(this.backgroundScreen);
    }
  }, {
    key: "initIcons",
    value: function initIcons(asset) {
      var _this5 = this;

      var setIcon = function setIcon(rect, name) {
        var id = _this5.iconsSprite.frameKeys.length;

        _this5.iconsAtlas.setFrame(id, {
          rect: _construct(pc.Vec4, _toConsumableArray(rect)),
          pivot: new pc.Vec2(0.5, 0.5),
          border: new pc.Vec4(0, 0, 0, 0)
        });

        Application[name] = id;

        _this5.iconsSprite.frameKeys.push(id.toString());
      };

      if (this.iconsSprite) return;
      this.iconsSprite = new pc.Sprite(game.app.graphicsDevice);
      this.iconsSprite.frameKeys = [];
      this.iconsAtlas = new pc.TextureAtlas();
      this.iconsSprite.startUpdate();
      this.iconsSprite.atlas = this.iconsAtlas;
      this.iconsAtlas.texture = asset.resource;
      this.iconsAtlas._frames = [];
      setIcon([0, 265, 48, 48], "ICON_PAUSE");
      setIcon([48, 265, 48, 48], "ICON_BACK");
      setIcon([0, 179, 74, 74], "ICON_BLUE_BACKGROUND");
      setIcon([0, 93, 74, 74], "ICON_RED_BACKGROUND");
      setIcon([0, 7, 74, 74], "ICON_YELLOW_BACKGROUND");
      setIcon([79, 180, 74, 74], "ICON_BLUE_INNER");
      setIcon([79, 94, 74, 74], "ICON_RED_INNER");
      setIcon([79, 8, 74, 74], "ICON_YELLOW_INNER");
      setIcon([246, 177, 241, 80], "ICON_BLUE_BUTTON");
      setIcon([246, 92, 241, 80], "ICON_RED_BUTTON");
      setIcon([246, 5, 241, 80], "ICON_YELLOW_BUTTON");
      setIcon([106, 267, 60, 60], "ICON_PLAY");
      setIcon([166, 267, 60, 60], "ICON_CUSTOMIZE");
      setIcon([226, 267, 60, 60], "ICON_CREDITS");
      setIcon([286, 267, 60, 60], "ICON_BALL");
      setIcon([346, 267, 60, 60], "ICON_BACKGROUND");
      setIcon([406, 264, 34, 63], "ICON_ARROW_LEFT");
      setIcon([440, 264, 34, 63], "ICON_ARROW_RIGHT");
      setIcon([0, 327, 167, 60], "ICON_DEFAULT_BUTTON_BACKGROUND");
      setIcon([0, 387, 167, 60], "ICON_CURRENT_BUTTON_BACKGROUND");
      setIcon([168, 327, 23, 17], "ICON_DONE");
      setIcon([168, 344, 23, 20], "ICON_COIN");
      this.iconsSprite.endUpdate();
    }
  }, {
    key: "initBlur",
    value: function initBlur() {
      var _this6 = this;

      this.blurExtrudeLayer = new pc.Layer("blur-extrude");
      this.blurExtrudeLayer.name = "blur-extrude";
      this.blurExtrudeLayer.addCamera(this.camera.camera);
      this.blurExtrudeLayer.addLight(this.light);
      game.app.scene.layers.insertOpaque(this.blurExtrudeLayer, 11);
      game.app.scene.layers.insertTransparent(this.blurExtrudeLayer, 11);
      var device = this.app.graphicsDevice;
      var texture = new pc.Texture(device, {
        width: device.width,
        height: device.height,
        format: pc.PIXELFORMAT_R8_G8_B8_A8,
        mipmaps: false
      });
      this.blurExtrudeLayer.renderTarget = new pc.RenderTarget({
        colorBuffer: texture,
        depth: true
      });

      this.blurExtrudeLayer.onPreRender = function (cameraIndex) {
        _this6.blurExtrudeLayer.cameras[cameraIndex].clearColor = new pc.Color(0.5, 0.5, 0.5, 0);
      };
    }
  }, {
    key: "hierarchy",
    value: function hierarchy() {
      var _this7 = this;

      return new Promise(function (resolve) {
        _this7.screen.addComponent("screen", {
          referenceResolution: pc.Vec2(1280, 720),
          scaleMode: pc.SCALEMODE_BLEND,
          scaleBlend: 0.5,
          screenSpace: true
        });

        _this7.app.root.addChild(_this7.screen);

        _this7.app.scene.fog = pc.FOG_LINEAR;
        _this7.app.scene.fogStart = 20;
        _this7.app.scene.fogEnd = 50;
        _this7.app.scene.exposure = 0.8;
        _this7.app.scene.fogColor = new pc.Color().fromString("#312E57").darken(-7);
        _this7.app.scene.ambientLight = new pc.Color().fromString("#ffffff");

        _this7.camera.addComponent('camera', {
          clearColor: new pc.Color(1, 1, 1, 1)
        });

        _this7.light.addComponent('light', {
          castShadows: true,
          type: pc.LIGHTTYPE_DIRECTIONAL,
          shadowUpdateMode: pc.SHADOWUPDATE_REALTIME,
          shadowResolution: 512,
          intensity: 0.65,
          shadowDistance: 16,
          shadowType: pc.SHADOW_VSM16,
          vsmBlurMode: pc.BLUR_GAUSSIAN,
          vsmBlurSize: 15
        });

        _this7.light.setEulerAngles(152, -75, -121);

        _this7.app.root.addChild(_this7.camera);

        _this7.camera.addChild(_this7.light);

        _this7.camera.setPosition(0, 0, -0.6);

        _this7.camera.setEulerAngles(0, 180, 0);

        _this7.storage.get("ballStyle", 0).then(function (styleId) {
          _this7.ballStyleId = parseInt(styleId);
          _this7.ball = Application.createBall(_this7.ballStyleId);

          _this7.app.root.addChild(_this7.ball);
        });

        _this7.initBackground();

        _this7.initBlur();

        _this7.app.root.addComponent("script");

        Application.getAsset("blur.js", "script").then(function (asset) {
          _this7.app.root.script.create("blur");
        });
        Application.getAsset("fps.js", "script").then(function (asset) {//this.app.root.script.create("fps");
        });
        Application.getAsset("icons.png", "texture").then(function (asset) {
          _this7.initIcons(asset);

          resolve();
        });
      });
    }
  }, {
    key: "getUrlParams",
    value: function getUrlParams() {
      return _toConsumableArray(new URLSearchParams(document.location.search).entries()).reduce(function (q, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        return Object.assign(q, _defineProperty({}, k, v));
      }, {});
    }
  }, {
    key: "getAssets",
    value: function getAssets() {
      return new Promise(function (resolve) {
        var assets = [["assets/font/antonio-regular.json", "font"], ["assets/font/chathura-regular.json", "font"], ["assets/images/background.png", "texture"], ["assets/images/icons.png", "texture"], ["assets/scripts/fps.js", "script"], ["assets/scripts/blur.js", "script"], ["assets/models/ring/ring.json", "model"], ["assets/shaders/blurPS.glsl", "shader"], ["assets/shaders/blurExcludePS.glsl", "shader"]];
        Promise.all([]).then(function () {
          resolve(assets);
        });
      });
    }
  }], [{
    key: "createBall",
    value: function createBall(ballId) {
      var assetUrl = "assets/models/ball/".concat(ballId, "/ball-model.json");
      var ball = new pc.Entity("ball");
      ball.visual = new pc.Entity("ball-visual");
      ball.contact = null;
      ball.visual.addComponent("model", {
        type: "asset",
        castShadows: true,
        receiveShadows: false
      });
      ball.visual.addComponent("collision", {
        radius: 0,
        type: "sphere"
      });
      ball.visual.addComponent("rigidbody", {
        type: pc.RIGIDBODY_TYPE_KINEMATIC,
        linearDamping: 0,
        angularDamping: 0,
        linearFactor: new pc.Vec3(0, 0, 0),
        angularFactor: pc.Vec3.ZERO,
        friction: 0,
        restitution: 0
      });
      ball.visual.removeComponent("collision");
      Application.loadAsset(assetUrl, "model").then(function (asset) {
        ball.visual.removeComponent("model");
        ball.visual.addComponent("model", {
          asset: asset
        });
        ball.visual.model.model.meshInstances[0].material = material;
      });
      ball.addComponent("collision", {
        radius: game.config.gameLoop.ball.radius,
        type: "sphere"
      });
      ball.addComponent("rigidbody", {
        type: pc.RIGIDBODY_TYPE_DYNAMIC,
        mass: 0,
        linearDamping: 0,
        angularDamping: 0,
        linearFactor: new pc.Vec3(0, 1, 1),
        angularFactor: pc.Vec3.ZERO,
        friction: 0,
        restitution: 0
      });
      var material = new pc.StandardMaterial();
      material.diffuse = new pc.Color().fromString("#00ABFF");
      material.ambient = new pc.Color().fromString("#ffffff");
      material.ambientTint = true;
      material.emissiveIntensity = 5.34;
      material.update();
      ball.addChild(ball.visual);
      return ball;
    }
  }, {
    key: "getAsset",
    value: function getAsset(name, type) {
      return new Promise(function (resolve, reject) {
        var asset = game.app.assets.find(name, type);
        if (asset.resource) resolve(asset);else {
          asset.once("load", function () {
            resolve(asset);
          });
          game.app.assets.load(asset);
        }
      });
    }
  }, {
    key: "loadAsset",
    value: function loadAsset(url, type) {
      return new Promise(function (resolve, reject) {
        var asset = pc.app.assets.getByUrl(url);
        if (asset) resolve(asset);
        pc.app.assets.loadFromUrl(url, type, function (err, asset) {
          if (err) return reject(err);
          return resolve(asset);
        });
      });
    }
  }, {
    key: "getEmissiveColor",
    value: function getEmissiveColor(color) {
      if (color instanceof pc.Color) color = color.toString();
      var colorString = tinycolor(color).darken(40).toString();
    }
  }]);

  return Application;
}();

exports.default = Application;

},{"./Scene":4,"./scenes/Customize":11,"./scenes/CustomizeBall":12,"./scenes/GameLoop":13,"./scenes/MainMenu":14,"./storages/LocalStorage":16}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LevelElement =
/*#__PURE__*/
function () {
  function LevelElement() {
    _classCallCheck(this, LevelElement);

    _defineProperty(this, "entity", new pc.Entity());

    _defineProperty(this, "_options", null);

    _defineProperty(this, "colorsSynonyms", {
      "#4BB0E4": "#00ABFF",
      "#E95F78": "#ff3a6c",
      "#FBC626": "#FFB100"
    });
  }

  _createClass(LevelElement, [{
    key: "remove",
    value: function remove() {
      var _this = this;

      var animation = {
        opacity: 1
      };
      anime({
        targets: animation,
        opacity: 0,
        delay: 0,
        duration: 100,
        easing: "linear",
        update: function update(anime) {
          _this.opacity = animation.opacity;
        },
        complete: function complete(anime) {
          _this.entity.destroy();
        }
      });
    }
  }, {
    key: "beforeNextInsert",
    value: function beforeNextInsert(options) {}
  }, {
    key: "afterInsert",
    value: function afterInsert(options) {}
  }, {
    key: "beforeInsert",
    value: function beforeInsert(options) {
      options.offset += this.width / 2;
    }
  }, {
    key: "colorSynonym",
    value: function colorSynonym() {
      var hex = this.color.toString();
      if (!this.colorsSynonyms[hex.toUpperCase()]) return this.color;
      return new pc.Color().fromString(this.colorsSynonyms[hex.toUpperCase()]);
    }
  }, {
    key: "width",
    get: function get() {
      throw new Error("Not implemented in the base class");
    }
  }, {
    key: "color",
    get: function get() {
      throw new Error("Not implemented in the base class");
    }
  }, {
    key: "options",
    get: function get() {
      return this._options;
    },
    set: function set(value) {
      this._options = value;
    }
  }, {
    key: "opacity",
    set: function set(value) {
      throw new Error("Not implemented in the base class");
    }
  }]);

  return LevelElement;
}();

exports.default = LevelElement;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Scene =
/*#__PURE__*/
function () {
  _createClass(Scene, [{
    key: "createBlockButton",
    value: function createBlockButton(icon, text, background) {
      var button = new pc.Entity("button");
      button.addComponent("element", {
        type: pc.ELEMENTTYPE_IMAGE,
        anchor: new pc.Vec4(0, 0, 0, 0),
        pivot: new pc.Vec2(0.5, 0.5),
        useInput: true,
        width: 242,
        height: 80,
        sprite: game.iconsSprite,
        opacity: 0,
        spriteFrame: background
      });
      var textEntity = new pc.Entity("text");
      textEntity.addComponent("element", {
        type: pc.ELEMENTTYPE_TEXT,
        anchor: new pc.Vec4(0, 0, 0, 0),
        pivot: new pc.Vec2(0, 0.5),
        lineHeight: 60,
        useInput: true,
        width: 242,
        height: 80,
        fontAsset: game.app.assets.find("antonio-regular.json", "font").id,
        fontSize: 24,
        opacity: 0,
        text: text
      });
      var iconEntity = new pc.Entity("icon");
      iconEntity.addComponent("element", {
        type: pc.ELEMENTTYPE_IMAGE,
        anchor: new pc.Vec4(0, 0, 0, 0),
        pivot: new pc.Vec2(0, 0),
        useInput: true,
        width: 60,
        height: 60,
        sprite: game.iconsSprite,
        opacity: 0,
        spriteFrame: icon
      });
      button.text = textEntity;
      button.icon = iconEntity;
      button.addChild(textEntity);
      button.addChild(iconEntity);
      this.screen.addChild(button);
      button.setPosition(0, 0, 0);
      button.text.translateLocal(70, 40, 0);
      button.icon.translateLocal(10, 10, 0);
      return button;
    }
  }]);

  function Scene(app, game) {
    _classCallCheck(this, Scene);

    this.app = app;
    this.root = new pc.Entity(this.constructor.name);
    this.app.root.addChild(this.root);
    this.game = game;
    this.screen = this.game.screen;
  }

  _createClass(Scene, [{
    key: "hide",
    value: function hide() {
      var _this = this;

      return new Promise(function (resolve) {
        _this.root.destroy();

        return resolve();
      });
    }
  }]);

  return Scene;
}();

exports.default = Scene;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Storage =
/*#__PURE__*/
function () {
  function Storage() {
    _classCallCheck(this, Storage);
  }

  _createClass(Storage, [{
    key: "init",
    value: function init() {
      return new Promise(function (resolve) {
        return resolve();
      });
    }
  }, {
    key: "get",
    value: function get(key, defaultValue) {
      throw new Error("Not implemented in base class");
    }
  }, {
    key: "set",
    value: function set(key, value) {
      throw new Error("Not implemented in base class");
    }
  }]);

  return Storage;
}();

exports.default = Storage;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PanelElement2 = _interopRequireDefault(require("./PanelElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ChangeElement =
/*#__PURE__*/
function (_PanelElement) {
  function ChangeElement(options) {
    var _this;

    _classCallCheck(this, ChangeElement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChangeElement).call(this, options));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "callback", function () {});

    _this.block.model.model.meshInstances[0].material.diffuse = new pc.Color(1, 1, 1, 1);

    _this.block.model.model.meshInstances[0].material.update();

    _this.block.collision.off("collisionstart");

    _this.block.collision.on("collisionstart", function (result) {
      _this.block.collision.off("collisionstart");

      _this.callback();
    });

    return _this;
  }

  _inherits(ChangeElement, _PanelElement);

  return ChangeElement;
}(_PanelElement2.default);

exports.default = ChangeElement;

},{"./PanelElement":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _LevelElement2 = _interopRequireDefault(require("./../LevelElement"));

var _Animation = _interopRequireDefault(require("./../Animation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PanelElement =
/*#__PURE__*/
function (_LevelElement) {
  function PanelElement(options) {
    var _this;

    _classCallCheck(this, PanelElement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PanelElement).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "block", new pc.Entity("block"));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "jumper", new pc.Entity("jumper"));

    _this.entity.name = _this.constructor.name;
    Object.assign(_this.options, options);

    _this.initBlock();

    _this.initJumper();

    return _this;
  }

  _createClass(PanelElement, [{
    key: "afterInsert",
    value: function afterInsert() {
      this.block.rigidbody.syncEntityToBody();
    }
  }, {
    key: "initBlock",
    value: function initBlock() {
      var _this2 = this;

      this.block.addComponent("model", {
        type: "box",
        castShadows: false,
        receiveShadows: true
      });
      this.block.addComponent("rigidbody", {
        mass: 0,
        restitution: this.options.restitution
      });
      this.block.addComponent("collision", {
        type: "box",
        halfExtents: new pc.Vec3(this.options.blockHeight / 2, this.options.blockDepth / 2, this.options.blockWidth / 2)
      }); // When ball contacts with element we have to check it's color

      this.block.collision.on("collisionstart", function (result) {
        _this2.block.collision.off("collisionstart");

        game.app.fire("level:checkColor", _this2.colorSynonym());
        game.app.fire("level:resetBallSpeed");
        game.ball.contact = _this2;
      });
      this.block.setLocalScale(this.options.blockHeight, this.options.blockDepth, this.options.blockWidth); // Material

      var material = new pc.StandardMaterial();
      material.diffuse = this.getRandomColor();
      material.opacity = 0.999;
      material.blendType = pc.BLEND_NORMAL;
      material.update();
      this.block.model.model.meshInstances[0].material = material;
      this.entity.addChild(this.block);
    }
  }, {
    key: "initJumper",
    value: function initJumper() {
      var _this3 = this;

      this.entity.addChild(this.jumper); //this.jumper.addComponent("model", {type: "box"});

      this.jumper.setLocalScale(this.options.blockHeight, this.options.blockDepth / 2, this.options.jumperWidth);
      this.jumper.setLocalPosition(0, this.options.blockDepth, this.options.blockWidth / 2 - this.options.jumperWidth / 2);
      this.jumper.addComponent("collision", {
        type: "box",
        halfExtents: new pc.Vec3(this.options.blockHeight / 2, this.options.blockDepth, this.options.jumperWidth / 2)
      }); // Jump on the end of platform

      this.jumper.collision.on("triggerenter", function (result) {
        game.app.fire("level:jump");
      }); // Remove platform

      this.jumper.collision.on("triggerleave", function (result) {
        game.app.fire("level:removeElement", _this3);
        game.app.fire("level:addElement");
        game.ball.contact = null;
      });
    }
  }, {
    key: "getRandomColor",
    value: function getRandomColor() {
      return this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
    }
  }, {
    key: "opacity",
    set: function set(value) {
      this.block.model.model.meshInstances[0].setParameter("material_opacity", value);
    }
  }, {
    key: "width",
    get: function get() {
      return this.options.blockWidth;
    }
  }, {
    key: "color",
    get: function get() {
      return this.block.model.model.meshInstances[0].material.diffuse;
    },
    set: function set(value) {
      this.block.model.model.meshInstances[0].material.diffuse = value;
      this.block.model.model.meshInstances[0].material.update();
    }
  }, {
    key: "options",
    get: function get() {
      return this._options || {
        blockWidth: game.config.gameLoop.level.elements.panel.blockWidth,
        blockHeight: game.config.gameLoop.level.elements.panel.blockHeight,
        blockDepth: game.config.gameLoop.level.elements.panel.blockDepth,
        jumperWidth: 1,
        jumperHeight: 1,
        //restitution: game.config.gameLoop.level.elements.panel.restitution,
        restitution: 3,
        colors: [new pc.Color().fromString("#4BB0E4"), new pc.Color().fromString("#E95F78"), new pc.Color().fromString("#FBC626")]
      };
    }
  }]);

  _inherits(PanelElement, _LevelElement);

  return PanelElement;
}(_LevelElement2.default);

exports.default = PanelElement;

},{"./../Animation":1,"./../LevelElement":3}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _LevelElement2 = _interopRequireDefault(require("./../LevelElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RingElement =
/*#__PURE__*/
function (_LevelElement) {
  function RingElement(options) {
    var _this;

    _classCallCheck(this, RingElement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RingElement).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "ring", new pc.Entity("ring"));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "visual", new pc.Entity("ring-visual"));

    _this.entity.name = _this.constructor.name;
    Object.assign(_this.options, options);

    _this.initRing();

    return _this;
  }

  _createClass(RingElement, [{
    key: "initRing",
    value: function initRing() {
      var _this2 = this;

      this.visual.addComponent("model", {
        type: "asset",
        asset: game.app.assets.find("ring.json", "model")
      });
      this.visual.translateLocal(0, -1, 0);
      this.visual.setEulerAngles(0, 0, 90);
      this.visual.setLocalScale(0.6, 0.6, 0.6);
      this.ring.addChild(this.visual);
      this.ring.addComponent("collision", {
        type: "cylinder",
        radius: 0.7,
        height: 0.2
      });
      this.ring.collision.on("triggerleave", function (result) {
        game.app.fire("level:removeElement", _this2);
        game.app.fire("level:addElement");
      });
      this.ring.collision.on("triggerenter", function (result) {
        game.app.fire("level:checkColor", _this2.colorSynonym());
      });
      var material = new pc.StandardMaterial();
      material.diffuse = this.getRandomColor();
      material.opacity = 0.999;
      material.blendType = pc.BLEND_NORMAL;
      material.update();
      this.visual.model.model.meshInstances[0].material = material;
      this.entity.addChild(this.ring); //this.ring.setLocalScale(1.4, 0.2, 1.4);

      this.ring.setEulerAngles(90, 0, 0);
      this.ring.translate(0, 1.8, 0);
    }
  }, {
    key: "beforeNextInsert",
    value: function beforeNextInsert(options) {
      options.offset -= options.elementOffset / 2;
    }
  }, {
    key: "afterInsert",
    value: function afterInsert(options) {}
  }, {
    key: "beforeInsert",
    value: function beforeInsert(options) {
      options.offset -= options.elementOffset / 2;
    }
  }, {
    key: "getRandomColor",
    value: function getRandomColor() {
      return this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
    }
  }, {
    key: "opacity",
    set: function set(value) {
      this.visual.model.model.meshInstances[0].setParameter("material_opacity", value);
    }
  }, {
    key: "width",
    get: function get() {
      return 0;
    }
  }, {
    key: "color",
    get: function get() {
      return this.visual.model.model.meshInstances[0].material.diffuse;
    },
    set: function set(value) {
      this.visual.model.model.meshInstances[0].material.diffuse = value;
      this.visual.model.model.meshInstances[0].material.update();
    }
  }, {
    key: "options",
    get: function get() {
      return this._options || {
        width: 1.6,
        colors: [new pc.Color().fromString("#4BB0E4"), new pc.Color().fromString("#E95F78"), new pc.Color().fromString("#FBC626")]
      };
    }
  }]);

  _inherits(RingElement, _LevelElement);

  return RingElement;
}(_LevelElement2.default);

exports.default = RingElement;

},{"./../LevelElement":3}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PanelElement2 = _interopRequireDefault(require("./PanelElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _construct(Parent, args, Class) { if (typeof Reflect !== "undefined" && Reflect.construct) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Parent.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

var SafeZoneElement =
/*#__PURE__*/
function (_PanelElement) {
  function SafeZoneElement(options) {
    var _this;

    _classCallCheck(this, SafeZoneElement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SafeZoneElement).call(this, options)); //this.block.translate(0,0, (this.options.blockWidth - super.options.blockWidth) / 2)
    //this.jumper.translate(0,0, (this.options.blockWidth - super.options.blockWidth) / 2)

    _this.block.collision.off("collisionstart");

    _this.block.collision.on("collisionstart", function (result) {
      _this.block.collision.off("collisionstart"); //game.app.fire("level:changeColor", new pc.Color(1,1,1,1));

    });

    return _this;
  }

  _createClass(SafeZoneElement, [{
    key: "options",
    get: function get() {
      return this._options || {
        blockWidth: game.config.gameLoop.level.elements.safeZone.blockWidth,
        blockHeight: game.config.gameLoop.level.elements.safeZone.blockHeight,
        blockDepth: game.config.gameLoop.level.elements.safeZone.blockDepth,
        jumperWidth: 1,
        colors: [_construct(pc.Color, _toConsumableArray(game.config.gameLoop.level.elements.safeZone.color))]
      };
    }
  }, {
    key: "width",
    get: function get() {
      return this.options.blockWidth;
    }
  }]);

  _inherits(SafeZoneElement, _PanelElement);

  return SafeZoneElement;
}(_PanelElement2.default);

exports.default = SafeZoneElement;

},{"./PanelElement":7}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _LevelElement = _interopRequireDefault(require("./../LevelElement"));

var _PanelElement2 = _interopRequireDefault(require("./PanelElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

var SmallPanelElement =
/*#__PURE__*/
function (_PanelElement) {
  function SmallPanelElement(options) {
    _classCallCheck(this, SmallPanelElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(SmallPanelElement).call(this, options));
  }

  _createClass(SmallPanelElement, [{
    key: "options",
    get: function get() {
      return this._options || {
        blockWidth: 2,
        blockHeight: game.config.gameLoop.level.elements.panel.blockHeight,
        blockDepth: game.config.gameLoop.level.elements.panel.blockDepth,
        jumperWidth: 1,
        jumperHeight: 1,
        restitution: 0,
        colors: [new pc.Color().fromString("#4BB0E4"), new pc.Color().fromString("#E95F78"), new pc.Color().fromString("#FBC626")]
      };
    }
  }]);

  _inherits(SmallPanelElement, _PanelElement);

  return SmallPanelElement;
}(_PanelElement2.default);

exports.default = SmallPanelElement;

},{"./../LevelElement":3,"./PanelElement":7}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Scene2 = _interopRequireDefault(require("./../Scene"));

var _Animation = _interopRequireDefault(require("../Animation"));

var _Application = _interopRequireDefault(require("../Application"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _construct(Parent, args, Class) { if (typeof Reflect !== "undefined" && Reflect.construct) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Parent.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Customize =
/*#__PURE__*/
function (_Scene) {
  function Customize(app, game) {
    var _this;

    _classCallCheck(this, Customize);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Customize).call(this, app, game));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "title", new pc.Entity("title"));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "backBtn", new pc.Entity("backBtn"));

    _this.title.addComponent("element", {
      type: pc.ELEMENTTYPE_TEXT,
      anchor: new pc.Vec4(0.0, 0.0, 0, 0),
      pivot: new pc.Vec2(0.5, 0.5),
      alignment: new pc.Vec2(0.5, 0.5),
      useInput: true,
      fontAsset: 1,
      color: _construct(pc.Color, _toConsumableArray(game.config.customize.ui.color)),
      fontSize: game.config.customize.ui.fontSize,
      text: game.config.customize.ui.titleText,
      opacity: 0
    });

    _this.backBtn.addComponent("element", {
      type: pc.ELEMENTTYPE_IMAGE,
      anchor: new pc.Vec4(0, 1, 0, 1),
      pivot: new pc.Vec2(0, 1),
      useInput: true,
      width: 48,
      height: 48,
      opacity: 0,
      sprite: game.iconsSprite,
      spriteFrame: _Application.default.ICON_BACK
    });

    _this.screen.addChild(_this.backBtn);

    _this.backBtn.setPosition(-1, 1, 0);

    _this.backBtn.translateLocal(20, -20, 0);

    _this.screen.addChild(_this.title);

    _this.title.setPosition(0, 0.6, 0);

    _this.ballBtn = _this.createBlockButton(_Application.default.ICON_BALL, "BALL", _Application.default.ICON_BLUE_BUTTON);
    _this.backgroundBtn = _this.createBlockButton(_Application.default.ICON_BACKGROUND, "BACKGROUND", _Application.default.ICON_YELLOW_BUTTON);

    _this.ballBtn.translateLocal(0, -50, 0);

    _this.backgroundBtn.translateLocal(0, -137, 0);

    _this.events();

    game.cameraTargetPosition = new pc.Vec3(0, 1.8, -6);
    var animation = {
      opacity: 0
    };
    anime({
      targets: animation,
      opacity: 1,
      duration: 200,
      easing: "linear",
      update: function update(anime) {
        _this.backBtn.element.opacity = animation.opacity;
        _this.title.element.opacity = animation.opacity;
        _this.ballBtn.element.opacity = animation.opacity;
        _this.ballBtn.icon.element.opacity = animation.opacity;
        _this.ballBtn.text.element.opacity = animation.opacity;
        _this.backgroundBtn.element.opacity = animation.opacity;
        _this.backgroundBtn.icon.element.opacity = animation.opacity;
        _this.backgroundBtn.text.element.opacity = animation.opacity;
      }
    });
    return _this;
  }

  _createClass(Customize, [{
    key: "events",
    value: function events() {
      var _this2 = this;

      this.backBtn.element.on("click", function (event) {
        var animation = {
          speed: 0
        };
        anime({
          targets: animation,
          speed: [{
            value: 300,
            easing: 'easeOutQuint',
            duration: 300
          }, {
            value: 0,
            easing: 'easeOutCirc',
            duration: 700
          }],
          duration: 1000,
          update: function update(anime) {
            game.ball.visual.rigidbody.angularVelocity = new pc.Vec3(0, -animation.speed, 0);
          }
        });

        _this2.app.fire("game:menu");
      });
      this.ballBtn.element.on("click", function (event) {
        var animation = {
          speed: 0
        };
        anime({
          targets: animation,
          speed: [{
            value: 300,
            easing: 'easeOutQuint',
            duration: 300
          }, {
            value: 0,
            easing: 'easeOutCirc',
            duration: 700
          }],
          duration: 1000,
          update: function update(anime) {
            game.ball.visual.rigidbody.angularVelocity = new pc.Vec3(0, animation.speed, 0);
          }
        });

        _this2.app.fire("game:customize:ball");
      });
      this.backgroundBtn.element.on("click", function (event) {
        return _this2.app.fire("game:customize:background");
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.backBtn.element.off();

        _this3.ballBtn.element.off();

        _this3.backgroundBtn.element.off();

        var animation = {
          opacity: 1
        };
        anime({
          targets: animation,
          opacity: 0,
          duration: 200,
          easing: "linear",
          update: function update(anime) {
            _this3.backBtn.element.opacity = animation.opacity;
            _this3.title.element.opacity = animation.opacity;
            _this3.ballBtn.element.opacity = animation.opacity;
            _this3.ballBtn.icon.element.opacity = animation.opacity;
            _this3.ballBtn.text.element.opacity = animation.opacity;
            _this3.backgroundBtn.element.opacity = animation.opacity;
            _this3.backgroundBtn.icon.element.opacity = animation.opacity;
            _this3.backgroundBtn.text.element.opacity = animation.opacity;
          },
          complete: function complete(anime) {
            _this3.root.destroy();

            _this3.backBtn.destroy();

            _this3.title.destroy();

            _this3.ballBtn.destroy();

            _this3.ballBtn.icon.destroy();

            _this3.ballBtn.text.destroy();

            _this3.backgroundBtn.destroy();

            _this3.backgroundBtn.icon.destroy();

            _this3.backgroundBtn.text.destroy();

            return resolve();
          }
        });
      });
    }
  }]);

  _inherits(Customize, _Scene);

  return Customize;
}(_Scene2.default);

exports.default = Customize;

},{"../Animation":1,"../Application":2,"./../Scene":4}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Scene2 = _interopRequireDefault(require("./../Scene"));

var _Animation = _interopRequireDefault(require("../Animation"));

var _Application = _interopRequireDefault(require("../Application"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _construct(Parent, args, Class) { if (typeof Reflect !== "undefined" && Reflect.construct) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Parent.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CustomizeBall =
/*#__PURE__*/
function (_Scene) {
  function CustomizeBall(app, game) {
    var _this;

    _classCallCheck(this, CustomizeBall);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomizeBall).call(this, app, game));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "title", new pc.Entity("title"));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "backBtn", new pc.Entity("backBtn"));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "ballCurrent", 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "ballsCount", 2);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "ballsDistance", 2.3);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "balls", []);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "ballsInfo", [{
      name: "Default",
      price: null,
      special: null
    }, {
      name: "Stone",
      price: 100,
      special: null
    }]);

    _this.rotator = new pc.Entity("rotate-element");

    _this.rotator.addComponent("element", {
      type: pc.ELEMENTTYPE_IMAGE,
      anchor: new pc.Vec4(0, 0, 1, 1),
      pivot: new pc.Vec2(0, 0),
      useInput: true,
      opacity: 0,
      color: new pc.Color(1, 0, 0, 0)
    });

    _this.screen.addChild(_this.rotator);

    _this.title.addComponent("element", {
      type: pc.ELEMENTTYPE_TEXT,
      anchor: new pc.Vec4(0.0, 0.0, 0, 0),
      pivot: new pc.Vec2(0.5, 0.5),
      alignment: new pc.Vec2(0.5, 0.5),
      useInput: true,
      fontAsset: 1,
      color: _construct(pc.Color, _toConsumableArray(game.config.customize.ui.color)),
      fontSize: game.config.customize.ui.fontSize,
      text: "BALL",
      opacity: 0
    });

    _this.backBtn.addComponent("element", {
      type: pc.ELEMENTTYPE_IMAGE,
      anchor: new pc.Vec4(0, 1, 0, 1),
      pivot: new pc.Vec2(0, 1),
      useInput: true,
      width: 48,
      height: 48,
      opacity: 0,
      sprite: game.iconsSprite,
      spriteFrame: _Application.default.ICON_BACK
    });

    _this.screen.addChild(_this.backBtn);

    _this.backBtn.setPosition(-1, 1, 0);

    _this.backBtn.translateLocal(20, -20, 0);

    _this.screen.addChild(_this.title);

    _this.title.setPosition(0, 0.6, 0);

    _this.leftButton = _this.createArrowButton(_Application.default.ICON_ARROW_LEFT);
    _this.rightButton = _this.createArrowButton(_Application.default.ICON_ARROW_RIGHT);

    _this.events();

    game.cameraTargetPosition = new pc.Vec3(0, 2.4, -6);

    _this.createBalls();

    var animation = {
      opacity: 0
    };
    anime({
      targets: animation,
      opacity: 1,
      duration: 200,
      easing: "linear",
      update: function update(anime) {
        _this.backBtn.element.opacity = animation.opacity;
        _this.title.element.opacity = animation.opacity;

        if (animation.opacity >= 0.2) {
          _this.leftButton.element.opacity = _this.ballCurrent === 0 ? 0.2 : animation.opacity;
          _this.rightButton.element.opacity = _this.ballCurrent === _this.balls.length - 1 ? 0.2 : animation.opacity;
        } else {
          _this.leftButton.element.opacity = animation.opacity;
          _this.rightButton.element.opacity = animation.opacity;
        }
      }
    });
    return _this;
  }

  _createClass(CustomizeBall, [{
    key: "createArrowButton",
    value: function createArrowButton(icon) {
      var button = new pc.Entity("arrow-button");
      var anchor = icon === _Application.default.ICON_ARROW_LEFT ? [0, 0.5, 0, 0.5] : [1, 0.5, 1, 0.5];
      var pivot = icon === _Application.default.ICON_ARROW_LEFT ? [0, 0.5] : [1, 0.5];
      button.addComponent("element", {
        type: pc.ELEMENTTYPE_IMAGE,
        anchor: _construct(pc.Vec4, anchor),
        pivot: _construct(pc.Vec2, pivot),
        useInput: true,
        width: 34,
        height: 63,
        opacity: 0,
        sprite: game.iconsSprite,
        spriteFrame: icon
      });
      this.screen.addChild(button);
      button.setPosition(0, 0, 0);

      if (icon === _Application.default.ICON_ARROW_LEFT) {
        button.setLocalPosition(20, 0, 0);
      }

      if (icon === _Application.default.ICON_ARROW_RIGHT) {
        button.setLocalPosition(-20, 0, 0);
      }

      return button;
    }
  }, {
    key: "events",
    value: function events() {
      var _this2 = this;

      this.backBtn.element.on("click", function (event) {
        // If we have a new ball
        if (game.ballStyleId !== _this2.ballCurrent) {
          game.ball.visual.destroy();
          game.ball.destroy();
          game.ballStyleId = _this2.ballCurrent;
          game.ball = _this2.balls[_this2.ballCurrent];
          game.ball.reparent(game.app.root);
          game.ball.rigidbody.type = "static";
          game.ball.rigidbody.teleport(0, 0, 0);
          game.ball.rigidbody.type = "dynamic";
          game.camera.setPosition(0, 2.4, -6);
          game.cameraTargetPosition = new pc.Vec3(0, 2.4, -6);
        }

        var animation = {
          speed: 0
        };
        anime({
          targets: animation,
          speed: [{
            value: 300,
            easing: 'easeOutQuint',
            duration: 300
          }, {
            value: 0,
            easing: 'easeOutCirc',
            duration: 700
          }],
          duration: 1000,
          update: function update(anime) {
            game.ball.visual.rigidbody.angularVelocity = new pc.Vec3(0, -animation.speed, 0);
          }
        });

        _this2.app.fire("game:customize");
      });
      this.rotator.element.on("touchstart", function (event) {
        var touch = event.event.touches[0];
        _this2.lastTouchCoords = {
          x: touch.pageX,
          y: touch.pageY
        };
      });
      this.rotator.element.on("touchmove", function (event) {
        var touch = event.event.touches[0];
        var coords = {
          x: touch.pageX,
          y: touch.pageY
        };
        var velocity = {
          x: _this2.lastTouchCoords.x - coords.x,
          y: _this2.lastTouchCoords.y - coords.y
        };
        _this2.lastTouchCoords = coords;
        var ball = _this2.balls[_this2.ballCurrent];
        ball.visual.rigidbody.angularVelocity = new pc.Vec3(velocity.y * 50, -velocity.x * 50, 0);

        _this2.resetBallVelocity();
      });
      this.rotator.element.on("touchend", function (event) {
        _this2.resetBallVelocity();
      });

      var updateLabel = function updateLabel() {
        var animation = {
          opacity: 1
        };
        anime({
          targets: animation,
          opacity: 0,
          duration: 150,
          easing: "linear",
          update: function update(anime) {
            _this2.label.element.opacity = animation.opacity;
            _this2.label.icon.element.opacity = animation.opacity;
            _this2.label.text.element.opacity = animation.opacity;
          },
          complete: function complete() {
            _this2.label = _this2.createBallLabel(_this2.ballCurrent);
            anime({
              targets: animation,
              opacity: 1,
              duration: 150,
              easing: "linear",
              update: function update(anime) {
                _this2.label.element.opacity = animation.opacity;
                _this2.label.icon.element.opacity = animation.opacity;
                _this2.label.text.element.opacity = animation.opacity;
              }
            });
          }
        });
      };

      this.leftButton.element.on("click", function (event) {
        if (_this2.ballCurrent <= 0) return;
        var cameraTarget = game.cameraTargetPosition;
        game.cameraTargetPosition = new pc.Vec3(cameraTarget.x + _this2.ballsDistance, cameraTarget.y, cameraTarget.z);
        _this2.balls[--_this2.ballCurrent].visual.rigidbody.angularVelocity = new pc.Vec3(0, 0, 0);

        _this2.checkArrows();

        updateLabel();
      });
      this.rightButton.element.on("click", function (event) {
        if (_this2.ballCurrent === _this2.ballsCount - 1) return;
        var cameraTarget = game.cameraTargetPosition;
        game.cameraTargetPosition = new pc.Vec3(cameraTarget.x - _this2.ballsDistance, cameraTarget.y, cameraTarget.z);
        _this2.balls[++_this2.ballCurrent].visual.rigidbody.angularVelocity = new pc.Vec3(0, 0, 0);

        _this2.checkArrows();

        updateLabel();
      });
    }
  }, {
    key: "checkArrows",
    value: function checkArrows() {
      this.leftButton.element.opacity = this.ballCurrent === 0 ? 0.2 : 1;
      this.rightButton.element.opacity = this.ballCurrent === this.balls.length - 1 ? 0.2 : 1;
    }
  }, {
    key: "resetBallVelocity",
    value: function resetBallVelocity() {
      var ball = this.balls[this.ballCurrent];
      var velocity = ball.visual.rigidbody.angularVelocity;
      var animation = {
        x: velocity.x,
        y: velocity.y
      };
      if (this.resetVelocity) this.resetVelocity.pause();
      this.resetVelocity = anime({
        targets: animation,
        x: 0,
        y: 0,
        delay: 100,
        duration: 500,
        easing: "linear",
        update: function update(anime) {
          ball.visual.rigidbody.angularVelocity = new pc.Vec3(animation.x, animation.y, 0);
        }
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.backBtn.element.off();

        _this3.leftButton.element.off();

        _this3.rightButton.element.off();

        _this3.rotator.element.off();

        var animation = {
          opacity: 1
        };
        anime({
          targets: animation,
          opacity: 0,
          duration: 200,
          easing: "linear",
          update: function update(anime) {
            _this3.backBtn.element.opacity = animation.opacity;
            _this3.title.element.opacity = animation.opacity;
            _this3.label.element.opacity = animation.opacity;
            _this3.label.icon.element.opacity = animation.opacity;
            _this3.label.text.element.opacity = animation.opacity;
            if (_this3.leftButton.element.opacity >= animation.opacity) _this3.leftButton.element.opacity = animation.opacity;
            if (_this3.rightButton.element.opacity >= animation.opacity) _this3.rightButton.element.opacity = animation.opacity;
          },
          complete: function complete(anime) {
            _this3.root.destroy();

            _this3.backBtn.destroy();

            _this3.title.destroy();

            _this3.leftButton.destroy();

            _this3.leftButton.destroy();

            _this3.rotator.destroy();

            _this3.label.destroy();

            _this3.label.icon.destroy();

            _this3.label.text.destroy();

            return resolve();
          }
        });
      });
    }
  }, {
    key: "createBalls",
    value: function createBalls() {
      var _this4 = this;

      for (var i = 0; i < this.ballsCount; i++) {
        var ball = null;

        if (i === game.ballStyleId) {
          ball = game.ball;
        } else {
          ball = _Application.default.createBall(i);
          ball.rigidbody.mass = 0;
          this.root.addChild(ball);
        }

        this.balls.push(ball);
      }

      this.balls.forEach(function (ball, i) {
        var x = (game.ballStyleId - i) * -_this4.ballsDistance;
        ball.rigidbody.type = "static";
        ball.rigidbody.teleport(-x, 0, 0);
        ball.rigidbody.type = "dynamic";
      });
      this.ballCurrent = game.ballStyleId;
      this.label = this.createBallLabel(this.ballCurrent);
      var animation = {
        opacity: 0
      };
      anime({
        targets: animation,
        opacity: 1,
        duration: 150,
        easing: "linear",
        update: function update(anime) {
          _this4.label.element.opacity = animation.opacity;
          _this4.label.icon.element.opacity = animation.opacity;
          _this4.label.text.element.opacity = animation.opacity;
        }
      });
    }
  }, {
    key: "createBallLabel",
    value: function createBallLabel(id) {
      var _this5 = this;

      var info = this.ballsInfo[id];
      var current = game.ballStyleId === id;
      var label = new pc.Entity("button");
      label.addComponent("element", {
        type: pc.ELEMENTTYPE_IMAGE,
        anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
        pivot: new pc.Vec2(0.5, 0.5),
        useInput: true,
        width: 168,
        height: 60,
        sprite: game.iconsSprite,
        opacity: 0,
        spriteFrame: current ? _Application.default.ICON_CURRENT_BUTTON_BACKGROUND : _Application.default.ICON_DEFAULT_BUTTON_BACKGROUND
      });
      var textEntity = new pc.Entity("text");
      textEntity.addComponent("element", {
        type: pc.ELEMENTTYPE_TEXT,
        anchor: new pc.Vec4(0.5, 0, 0, 0),
        pivot: new pc.Vec2(0.5, 0.5),
        useInput: true,
        width: 242,
        height: 80,
        fontAsset: game.app.assets.find("antonio-regular.json", "font").id,
        fontSize: 24,
        opacity: 0,
        text: info.name
      });
      var iconEntity = new pc.Entity("icon");
      iconEntity.addComponent("element", {
        type: pc.ELEMENTTYPE_IMAGE,
        anchor: new pc.Vec4(0, 0, 0, 0),
        pivot: new pc.Vec2(0, 0.5),
        useInput: true,
        width: 23,
        height: 17,
        sprite: game.iconsSprite,
        opacity: 0,
        spriteFrame: _Application.default.ICON_DONE
      });
      label.text = textEntity;
      label.icon = iconEntity;
      label.addChild(textEntity); //label.addChild(iconEntity);

      this.screen.addChild(label);
      label.setPosition(0, 0, 0);
      label.setLocalPosition(0, -100, 0);
      label.text.setPosition(0, 0, 0);
      label.icon.setPosition(0, 0, 0);
      label.text.setLocalPosition(0, 30, 0);
      label.icon.setLocalPosition(20, 30, 0); //label.icon.element.height = 17;

      label.element.on("click", function (event) {
        game.storage.set("ballStyle", id);
        _this5.ballCurrent = id;
        label.element.spriteFrame = _Application.default.ICON_CURRENT_BUTTON_BACKGROUND;
      });
      return label;
    }
  }]);

  _inherits(CustomizeBall, _Scene);

  return CustomizeBall;
}(_Scene2.default);

exports.default = CustomizeBall;

},{"../Animation":1,"../Application":2,"./../Scene":4}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Scene2 = _interopRequireDefault(require("./../Scene"));

var _PanelElement = _interopRequireDefault(require("./../levelElements/PanelElement"));

var _SafeZoneElement = _interopRequireDefault(require("./../levelElements/SafeZoneElement"));

var _RingElement = _interopRequireDefault(require("../levelElements/RingElement"));

var _ChangeElement = _interopRequireDefault(require("../levelElements/ChangeElement"));

var _SmallPanelElement = _interopRequireDefault(require("../levelElements/SmallPanelElement"));

var _Application = _interopRequireDefault(require("../Application"));

var _PauseMenu = _interopRequireDefault(require("./PauseMenu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _construct(Parent, args, Class) { if (typeof Reflect !== "undefined" && Reflect.construct) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Parent.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GameLoop =
/*#__PURE__*/
function (_Scene) {
  function GameLoop(app, game) {
    var _this;

    _classCallCheck(this, GameLoop);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GameLoop).call(this, app, game));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scoreLabel", new pc.Entity("scoreLabel"));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scoreValueLabel", new pc.Entity("scoreValueLabel"));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "buttonsDock", new pc.Entity("buttonsDock"));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "pauseButton", new pc.Entity("pauseButton"));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "blendColors", []);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "score", 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "availableElements", [_PanelElement.default]);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "elements", []);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "elementOffset", 4.16);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "ballSpeed", 7);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "ballRotationSpeed", 500);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initElementsCount", 10);

    _this.events();

    _this.initUI();

    _this.initLevel();

    _this.difficulty();

    var cameraPosition = game.camera.getPosition().clone();
    var ballPosition = game.ball.getPosition().clone();
    var diff = cameraPosition.sub(ballPosition);
    console.log(diff.data);
    game.ball.rigidbody.mass = game.config.gameLoop.ball.mass;
    game.ball.rigidbody.type = "dynamic";
    game.ball.rigidbody.teleport(0, 2, 1);
    game.ball.contact = null;
    cameraPosition.y = 2 + diff.y;
    cameraPosition.z = 1 + diff.z;
    game.camera.setPosition(cameraPosition);
    game.cameraTargetPosition = cameraPosition;

    _this.elements.forEach(function (element) {
      element.opacity = 0;
    });

    _this.resetBallRotation();

    var animation = {
      opacity: 0
    };
    anime({
      targets: animation,
      opacity: 1,
      duration: 300,
      easing: "linear",
      update: function update(anime) {
        _this.elements.forEach(function (element) {
          element.opacity = animation.opacity;
        });
      }
    });
    var ballRotationAnim = {
      ballAngularVelocity: 0
    };
    anime({
      targets: ballRotationAnim,
      ballAngularVelocity: _this.ballRotationSpeed,
      duration: 300,
      delay: 250,
      easing: "linear",
      update: function update(anime) {
        game.ball.visual.rigidbody.angularVelocity = new pc.Vec3(ballRotationAnim.ballAngularVelocity, 0, 0);
      }
    });
    game.app.fire("level:resetBallSpeed");
    return _this;
  }

  _createClass(GameLoop, [{
    key: "createColorButton",
    value: function createColorButton(color) {
      var _this2 = this;

      var button = new pc.Entity();
      button.addComponent("element", {
        type: pc.ELEMENTTYPE_IMAGE,
        anchor: new pc.Vec4(0, 0, 0, 0),
        pivot: new pc.Vec2(0.5, 0),
        useInput: false,
        width: 74,
        height: 74,
        sprite: game.iconsSprite
      });
      var inner = new pc.Entity("button-inner");
      inner.addComponent("element", {
        type: pc.ELEMENTTYPE_IMAGE,
        anchor: new pc.Vec4(0, 0, 0, 0),
        pivot: new pc.Vec2(0.5, 0.5),
        useInput: true,
        width: 74,
        height: 74,
        sprite: game.iconsSprite
      });
      button.addChild(inner);
      button.inner = inner;
      var targetColor = new pc.Color().fromString(color);

      var touchStart = function touchStart(event) {
        // Remove old colors from palette
        _this2.blendColors.map(function (current, i) {
          if (current.toString() === targetColor.toString()) _this2.blendColors.splice(i, 1);
        });

        _this2.blendColors.push(targetColor);

        var color = GameLoop.blendColors.apply(GameLoop, _toConsumableArray(_this2.blendColors));
        game.app.fire("level:changeColor", color);
        var animation = {
          x: 1,
          y: 1
        };
        if (inner.animation) inner.animation.pause();
        inner.animation = anime({
          targets: animation,
          x: 1.1,
          y: 1.075,
          duration: 300,
          update: function update(anime) {
            inner.setLocalScale(animation.x, animation.y, 1);
          }
        });
      };

      var touchEnd = function touchEnd(event) {
        // Remove old colors from palette
        _this2.blendColors.map(function (current, i) {
          if (current.toString() === targetColor.toString()) _this2.blendColors.splice(i, 1);
        });

        if (_this2.blendColors.length) {
          var _color = GameLoop.blendColors.apply(GameLoop, _toConsumableArray(_this2.blendColors));

          game.app.fire("level:changeColor", _color);
        }

        var animation = {
          x: 1.1,
          y: 1.075
        };
        if (inner.animation) inner.animation.pause();
        inner.animation = anime({
          targets: animation,
          x: 1,
          y: 1,
          duration: 300,
          update: function update(anime) {
            inner.setLocalScale(animation.x, animation.y, 1);
          }
        });
      };

      button.inner.element.on("touchstart", touchStart, this);
      button.inner.element.on("touchend", touchEnd, this);
      button.inner.element.on("touchcancel", touchEnd, this);
      button.inner.element.on("mousedown", touchStart, this);
      button.inner.element.on("mouseup", touchEnd, this);
      return button;
    }
  }, {
    key: "initUI",
    value: function initUI() {
      // Score value
      this.scoreValueLabel.addComponent("element", {
        type: pc.ELEMENTTYPE_TEXT,
        anchor: new pc.Vec4(0, 0, 0, 0),
        pivot: new pc.Vec2(0, 1),
        fontAsset: 1,
        lineHeight: 48,
        color: _construct(pc.Color, _toConsumableArray(game.config.gameLoop.ui.color)),
        fontSize: game.config.gameLoop.ui.fontSize,
        text: this.score
      }); // Score

      this.scoreLabel.addComponent("element", {
        type: pc.ELEMENTTYPE_TEXT,
        anchor: new pc.Vec4(0, 0, 0, 0),
        pivot: new pc.Vec2(0, 1),
        fontAsset: 2,
        color: new pc.Color().fromString("#8489C0"),
        fontSize: 40,
        text: game.config.gameLoop.ui.scoreText
      });
      this.screen.addChild(this.scoreLabel);
      this.screen.addChild(this.scoreValueLabel);
      this.scoreLabel.setPosition(-1, 1, 0);
      this.scoreValueLabel.setPosition(-1, 1, 0);
      this.scoreValueLabel.translateLocal(20, -10, 0);
      this.scoreLabel.translateLocal(20, -70, 0); // Color buttons

      this.buttonsDock.addComponent("element", {
        type: pc.ELEMENTTYPE_IMAGE,
        anchor: new pc.Vec4(0, 0, 1, 0),
        pivot: new pc.Vec2(0.5, 0),
        useInput: true,
        width: 1280,
        height: 105,
        color: new pc.Color().fromString("#16182F")
      });
      this.screen.addChild(this.buttonsDock);
      this.blueButton = this.createColorButton("#00ABFF");
      this.redButton = this.createColorButton("#ff3a6c");
      this.yellowButton = this.createColorButton("#FFB100");
      this.blueButton.element.spriteFrame = _Application.default.ICON_BLUE_BACKGROUND;
      this.redButton.element.spriteFrame = _Application.default.ICON_RED_BACKGROUND;
      this.yellowButton.element.spriteFrame = _Application.default.ICON_YELLOW_BACKGROUND;
      this.blueButton.inner.element.spriteFrame = _Application.default.ICON_BLUE_INNER;
      this.redButton.inner.element.spriteFrame = _Application.default.ICON_RED_INNER;
      this.yellowButton.inner.element.spriteFrame = _Application.default.ICON_YELLOW_INNER;
      this.buttonsDock.addChild(this.blueButton);
      this.buttonsDock.addChild(this.redButton);
      this.buttonsDock.addChild(this.yellowButton);
      this.blueButton.setPosition(0, -1, 0);
      this.blueButton.translateLocal(-97, 15, 0);
      this.redButton.setPosition(0, -1, 0);
      this.redButton.translateLocal(0, 15, 0);
      this.yellowButton.setPosition(0, -1, 0);
      this.yellowButton.translateLocal(97, 15, 0);
      this.blueButton.inner.translateLocal(37, 37, 0);
      this.redButton.inner.translateLocal(37, 37, 0);
      this.yellowButton.inner.translateLocal(37, 37, 0); // Pause

      this.pauseButton.addComponent("element", {
        type: pc.ELEMENTTYPE_IMAGE,
        anchor: new pc.Vec4(0, 0, 0, 0),
        pivot: new pc.Vec2(1, 1),
        useInput: true,
        width: 48,
        height: 48,
        sprite: game.iconsSprite,
        spriteFrame: _Application.default.ICON_PAUSE
      });
      this.screen.addChild(this.pauseButton);
      this.pauseButton.setPosition(1, 1, 0);
      this.pauseButton.translateLocal(-20, -20, 0);
      this.pauseButton.element.on("touchstart", function (event) {
        game.app.fire("level:pause");
      }, this);
      this.pauseButton.element.sprite = game.iconsSprite;
      this.pauseButton.element.spriteFrame = _Application.default.ICON_PAUSE;
    }
  }, {
    key: "initLevel",
    value: function initLevel() {
      this.addElement(_SafeZoneElement.default);

      for (var i = 0; i < this.initElementsCount - 2; i++) {
        this.addElement();
      }
    }
  }, {
    key: "jump",
    value: function jump() {
      game.ball.rigidbody.applyImpulse(0, 4, 0);
      var animate = {
        scale: 1,
        translate: 0
      };
      if (this.ballJumpAnimation) this.ballJumpAnimation.pause();
      this.ballJumpAnimation = anime({
        targets: animate,
        scale: [{
          value: 0.9,
          easing: 'easeOutQuint'
        }, {
          value: 1,
          easing: 'easeOutQuint'
        }],
        translate: [{
          value: -0.05,
          easing: 'linear'
        }, {
          value: 0,
          easing: 'linear'
        }],
        duration: 250,
        delay: 750,
        update: function update(anime) {
          game.ball.setLocalScale(1 + (1 - animate.scale), animate.scale, 1 + (1 - animate.scale));
          game.ball.visual.setLocalPosition(0, animate.translate, 0);
        }
      });
    }
  }, {
    key: "changeBallColor",
    value: function changeBallColor(color) {
      var material = game.ball.visual.model.model.meshInstances[0].material;
      var meshInstance = game.ball.visual.model.model.meshInstances[0]; // Try to get color from shader

      var currentColor = meshInstance.getParameter("material_diffuse"); // If it's not set, get it from material

      if (!currentColor) currentColor = material.diffuse;

      var oldColor = _construct(pc.Color, _toConsumableArray(currentColor.data));

      if (this.colorBlendAnimation) this.colorBlendAnimation.pause();
      this.colorBlendAnimation = anime({
        targets: {
          time: 0
        },
        time: 1,
        duration: 150,
        easing: "linear",
        update: function update(anime) {
          var value = anime.animations[0].currentValue;
          var targetColor = new pc.Color();
          targetColor.lerp(oldColor, color, value);
          meshInstance.setParameter("material_diffuse", [targetColor.r, targetColor.g, targetColor.b]);
        },
        complete: function complete(anime) {
          if (game.ball.contact) {
            var _color2 = game.ball.contact.colorSynonym();

            game.app.fire("level:checkColor", _color2);
          }
        }
      });
      material.diffuse = color;
    }
  }, {
    key: "resetBallRotation",
    value: function resetBallRotation() {
      var currentRotation = game.ball.visual.getRotation().clone();
      var currentGraphRotation = game.ball.visual.model.model.graph.getLocalRotation().clone();
      var targetRotation = new pc.Quat().mul2(currentRotation, currentGraphRotation);
      game.ball.visual.model.model.graph.setLocalRotation(targetRotation);
      game.ball.visual.setRotation(new pc.Quat(0, 0, 0, 1));
    }
  }, {
    key: "events",
    value: function events() {
      var _this3 = this;

      // When ball contacts something with special color
      game.app.on("level:checkColor", function (color) {
        _this3.checkColor(color);
      });
      game.app.on("level:jump", function (color) {
        _this3.jump();
      });
      game.app.on("level:addElement", function () {
        if (game.scene.elements.length < _this3.initElementsCount) _this3.addElement();
      });
      game.app.on("level:removeElement", function (element) {
        var index = _this3.elements.indexOf(element);

        _this3.elements.splice(index, 1);

        element.remove();
      });
      game.app.on("level:changeColor", function (color) {
        _this3.changeBallColor(color);
      });
      game.app.on("level:resetBallSpeed", function () {
        var ballVelocity = game.ball.rigidbody.linearVelocity;
        game.ball.rigidbody.linearVelocity = new pc.Vec3(0, ballVelocity.y, _this3.ballSpeed);
      });
      game.app.on("level:pause", function () {
        game.ball.rigidbody.disableSimulation();
        game.ball.visual.rigidbody.angularVelocity = new pc.Vec3(0, 0, 0);
        if (_this3.ballJumpAnimation) _this3.ballJumpAnimation.pause();
        var pauseScene = new _PauseMenu.default(game.app, game);
        pauseScene.score = _this3.score;
        var animation = {
          opacity: 1
        };
        anime({
          targets: animation,
          opacity: 0,
          duration: 300,
          easing: "linear",
          update: function update(anime) {
            _this3.scoreValueLabel.element.opacity = animation.opacity;
            _this3.scoreLabel.element.opacity = animation.opacity;
            _this3.pauseButton.element.opacity = animation.opacity;
          }
        });
      });
      game.app.on("level:unpause", function (scene) {
        scene.hide().then(function () {
          game.ball.rigidbody.enableSimulation();
          game.ball.visual.rigidbody.angularVelocity = new pc.Vec3(_this3.ballRotationSpeed, 0, 0);
          if (_this3.ballJumpAnimation) _this3.ballJumpAnimation.play();
        });
        var animation = {
          opacity: 0
        };
        anime({
          targets: animation,
          opacity: 1,
          duration: 300,
          easing: "linear",
          update: function update(anime) {
            _this3.scoreValueLabel.element.opacity = animation.opacity;
            _this3.scoreLabel.element.opacity = animation.opacity;
            _this3.pauseButton.element.opacity = animation.opacity;
          }
        });
      });

      this.updateEventListener = function (event) {
        var ballPosition = game.ball.getPosition().clone();
        ballPosition.y = 4; //ballPosition.y = 2;

        ballPosition.z -= 4;
        game.cameraTargetPosition = ballPosition;

        if (game.cameraMovingSpeed < 5) {
          game.cameraMovingSpeed += 0.05;
        }
      };

      game.app.on("update", this.updateEventListener);
    }
  }, {
    key: "eventsOff",
    value: function eventsOff() {
      game.app.off("update", this.updateEventListener);
      game.app.off("level:resetBallSpeed");
      game.app.off("level:pause");
      game.app.off("level:unpause");
      game.app.off("level:addElement");
      game.app.off("level:removeElement");
      game.app.off("level:checkColor");
      game.app.off("level:changeColor");
      game.app.off("level:jump");
    }
  }, {
    key: "difficulty",
    value: function difficulty() {
      /* let fn = () => {
             let changer = this.addElement(ChangeElement);
           changer.callback = () => {
               this.ballSpeed += this.ballSpeedMultiplier;
               game.app.fire("level:resetBallSpeed");
               fn();
               console.log("speedUp: " + this.ballSpeed)
           };
             this.elementOffset += this.elementOffsetMultiplier;
           this.elementOffsetMultiplier+=0.05;
       };
         if (this.score === 0) fn();
      */
      if (this.score === 1) this.availableElements.push(_RingElement.default);
      if (this.score === 1) this.availableElements.push(_SmallPanelElement.default);
    }
  }, {
    key: "gameover",
    value: function gameover() {
      game.app.fire("game:menu");
    }
  }, {
    key: "checkColor",
    value: function checkColor(color) {
      var ballColor = game.ball.visual.model.model.meshInstances[0].material.diffuse;

      if (ballColor.toString() !== color.toString()) {
        this.gameover();
      } else {
        this.score++;
        this.scoreValueLabel.element.text = this.score;
        this.difficulty();
      }
    }
  }, {
    key: "addElement",
    value: function addElement(className, config) {
      if (!className) {
        if (this.elements.length) {
          var lastElement = this.elements[this.elements.length - 1];

          if (lastElement instanceof _PanelElement.default) {
            className = this.getRandomElement();
          } else {
            className = _PanelElement.default;
          }
        }
      } //if (!className) className = PanelElement;


      var element = new className(config);
      var options = {
        offset: 0,
        element: element,
        elementOffset: this.elementOffset
      };

      if (this.elements.length) {
        var _lastElement = this.elements[this.elements.length - 1];
        options.offset += _lastElement.entity.getPosition().z;
        options.offset += _lastElement.width / 2;
        options.offset += this.elementOffset;

        _lastElement.beforeNextInsert(options);
      }

      element.beforeInsert(options);
      this.root.addChild(element.entity);
      element.entity.setPosition(0, 0, options.offset);
      element.afterInsert(options);
      this.elements.push(element);
      return element;
    }
  }, {
    key: "getRandomElement",
    value: function getRandomElement() {
      return this.availableElements[Math.floor(Math.random() * this.availableElements.length)];
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this4 = this;

      if (!this.root.children.length) {
        return new Promise(function (resolve) {
          return resolve();
        });
      }

      return new Promise(function (resolve) {
        game.ball.rigidbody.type = "static";

        _this4.eventsOff();

        var currentPosition = game.ball.getPosition();
        game.ball.setLocalScale(1, 1, 1);
        if (_this4.ballJumpAnimation) _this4.ballJumpAnimation.pause();
        game.cameraTargetPosition = new pc.Vec3(0, 6, currentPosition.z - 6);
        var animation = {
          opacity: 1,
          ballPosition: currentPosition.y,
          ballRotation: _this4.ballRotationSpeed
        };
        var moveBallPromise = new Promise(function (resolveBall) {
          anime({
            targets: animation,
            ballPosition: 5,
            duration: 1000,
            easing: "easeOutBack",
            update: function update(anime) {
              game.ball.setPosition(0, animation.ballPosition, currentPosition.z);
            },
            complete: function complete(anime) {
              game.ball.setPosition(0, 0, 0);
              game.camera.setPosition(0, 1, -6);
              game.cameraTargetPosition = new pc.Vec3(0, 1, -6);
              game.ballTargetPosition = new pc.Vec3(0, 0, 0);
              resolveBall();
            }
          });
        });
        var rotateBallPromise = new Promise(function (resolveBall) {
          anime({
            targets: animation,
            duration: 1000,
            ballRotation: 0,
            easing: "linear",
            update: function update(anime) {
              game.ball.visual.rigidbody.angularVelocity = new pc.Vec3(animation.ballRotation, 0, 0);
            },
            complete: function complete(anime) {
              resolveBall();
            }
          });
        });
        var hideUI = new Promise(function (resolveUI) {
          anime({
            targets: animation,
            opacity: 0,
            duration: 300,
            easing: "linear",
            update: function update(anime) {
              _this4.elements.forEach(function (element) {
                element.opacity = animation.opacity;
              });

              _this4.blueButton.element.opacity = animation.opacity;
              _this4.blueButton.inner.element.opacity = animation.opacity;
              _this4.redButton.element.opacity = animation.opacity;
              _this4.redButton.inner.element.opacity = animation.opacity;
              _this4.yellowButton.element.opacity = animation.opacity;
              _this4.yellowButton.inner.element.opacity = animation.opacity;
              _this4.buttonsDock.element.opacity = animation.opacity; // Probably already hidden

              if (_this4.scoreLabel.element.opacity > 0) {
                _this4.scoreLabel.element.opacity = animation.opacity;
                _this4.scoreValueLabel.element.opacity = animation.opacity;
                _this4.pauseButton.element.opacity = animation.opacity;
              }
            },
            complete: function complete(anime) {
              _this4.blueButton.destroy();

              _this4.blueButton.destroy();

              _this4.redButton.destroy();

              _this4.redButton.inner.destroy();

              _this4.yellowButton.destroy();

              _this4.yellowButton.inner.destroy();

              _this4.buttonsDock.destroy();

              _this4.scoreLabel.destroy();

              _this4.scoreValueLabel.destroy();

              _this4.pauseButton.destroy();

              resolveUI();
            }
          });
        });
        Promise.all([moveBallPromise, rotateBallPromise, hideUI]).then(function () {
          _this4.root.destroy();

          resolve();
        });
      });
    }
  }], [{
    key: "blendColors",
    value: function blendColors() {
      var newColor = new pc.Color(0, 0, 0, 1);
      var r = 0,
          g = 0,
          b = 0;

      for (var _len = arguments.length, colors = new Array(_len), _key = 0; _key < _len; _key++) {
        colors[_key] = arguments[_key];
      }

      colors.forEach(function (color) {
        r += color.r;
        g += color.g;
        b += color.b;
      });
      newColor.r = r / colors.length;
      newColor.g = g / colors.length;
      newColor.b = b / colors.length;

      if (newColor.toString() === "#aa8779") {
        newColor = new pc.Color(1, 1, 1, 1);
      }

      return newColor;
    }
  }]);

  _inherits(GameLoop, _Scene);

  return GameLoop;
}(_Scene2.default);

exports.default = GameLoop;

},{"../Application":2,"../levelElements/ChangeElement":6,"../levelElements/RingElement":8,"../levelElements/SmallPanelElement":10,"./../Scene":4,"./../levelElements/PanelElement":7,"./../levelElements/SafeZoneElement":9,"./PauseMenu":15}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Scene2 = _interopRequireDefault(require("./../Scene"));

var _Animation = _interopRequireDefault(require("../Animation"));

var _Application = _interopRequireDefault(require("../Application"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

var MainMenu =
/*#__PURE__*/
function (_Scene) {
  function MainMenu(app, game) {
    var _this;

    _classCallCheck(this, MainMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MainMenu).call(this, app, game));
    _this.startGameBtn = _this.createBlockButton(_Application.default.ICON_PLAY, "START GAME", _Application.default.ICON_BLUE_BUTTON);
    _this.customizeBtn = _this.createBlockButton(_Application.default.ICON_CUSTOMIZE, "CUSTOMIZE", _Application.default.ICON_RED_BUTTON);
    _this.creditsBtn = _this.createBlockButton(_Application.default.ICON_CREDITS, "CREDITS", _Application.default.ICON_YELLOW_BUTTON);

    _this.customizeBtn.translateLocal(0, -87, 0);

    _this.creditsBtn.translateLocal(0, -174, 0);

    var animation = {
      opacity: 0,
      cameraSpeed: 2
    };
    anime({
      targets: animation,
      opacity: 1,
      cameraSpeed: 4,
      duration: 200,
      easing: "linear",
      update: function update(anime) {
        _this.startGameBtn.element.opacity = animation.opacity;
        _this.customizeBtn.element.opacity = animation.opacity;
        _this.creditsBtn.element.opacity = animation.opacity;
        _this.startGameBtn.text.element.opacity = animation.opacity;
        _this.customizeBtn.text.element.opacity = animation.opacity;
        _this.creditsBtn.text.element.opacity = animation.opacity;
        _this.startGameBtn.icon.element.opacity = animation.opacity;
        _this.customizeBtn.icon.element.opacity = animation.opacity;
        _this.creditsBtn.icon.element.opacity = animation.opacity;
        game.cameraMovingSpeed = animation.cameraSpeed;
      }
    });

    _this.events(); // Disable ball's physics


    game.ball.rigidbody.teleport(0, 0, 0);
    game.ball.rigidbody.mass = 0; // Calculate camera position

    var cameraPosition = game.ball.getPosition().clone();
    cameraPosition.y = 1;
    cameraPosition.z = -6;
    game.cameraMovingSpeed = 1;
    game.cameraRotationSpeed = 5;
    game.cameraTargetPosition = cameraPosition;
    game.cameraTargetRotation = new pc.Quat().setFromEulerAngles(-22, 180, 0);
    return _this;
  }

  _createClass(MainMenu, [{
    key: "events",
    value: function events() {
      var _this2 = this;

      this.startGameBtn.element.on("click", function (event) {
        _this2.app.fire("game:start");
      });
      this.customizeBtn.element.on("click", function (event) {
        var animation = {
          speed: 0
        };
        anime({
          targets: animation,
          speed: [{
            value: 300,
            easing: 'easeOutQuint',
            duration: 300
          }, {
            value: 0,
            easing: 'easeOutCirc',
            duration: 700
          }],
          duration: 1000,
          update: function update(anime) {
            game.ball.visual.rigidbody.angularVelocity = new pc.Vec3(0, animation.speed, 0);
          }
        });

        _this2.app.fire("game:customize");
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.startGameBtn.element.off();

        _this3.customizeBtn.element.off();

        _this3.creditsBtn.element.off();

        var animation = {
          opacity: 1
        };
        anime({
          targets: animation,
          opacity: 0,
          cameraSpeed: 4,
          duration: 200,
          easing: "linear",
          update: function update(anime) {
            _this3.startGameBtn.element.opacity = animation.opacity;
            _this3.customizeBtn.element.opacity = animation.opacity;
            _this3.creditsBtn.element.opacity = animation.opacity;
            _this3.startGameBtn.text.element.opacity = animation.opacity;
            _this3.customizeBtn.text.element.opacity = animation.opacity;
            _this3.creditsBtn.text.element.opacity = animation.opacity;
            _this3.startGameBtn.icon.element.opacity = animation.opacity;
            _this3.customizeBtn.icon.element.opacity = animation.opacity;
            _this3.creditsBtn.icon.element.opacity = animation.opacity;
          },
          complete: function complete(anime) {
            _this3.root.destroy();

            _this3.startGameBtn.destroy();

            _this3.customizeBtn.destroy();

            _this3.creditsBtn.destroy();

            return resolve();
          }
        });
      });
    }
  }]);

  _inherits(MainMenu, _Scene);

  return MainMenu;
}(_Scene2.default);

exports.default = MainMenu;

},{"../Animation":1,"../Application":2,"./../Scene":4}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Scene2 = _interopRequireDefault(require("./../Scene"));

var _Application = _interopRequireDefault(require("../Application"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _construct(Parent, args, Class) { if (typeof Reflect !== "undefined" && Reflect.construct) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Parent.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PauseMenu =
/*#__PURE__*/
function (_Scene) {
  _createClass(PauseMenu, [{
    key: "createBlockButton",
    value: function createBlockButton(icon, text, background) {
      var button = _get(_getPrototypeOf(PauseMenu.prototype), "createBlockButton", this).call(this, icon, text, background);

      button.element.layers = [6];
      button.icon.element.layers = [6];
      button.text.element.layers = [6];
      return button;
    }
  }]);

  function PauseMenu(app, game) {
    var _this;

    _classCallCheck(this, PauseMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PauseMenu).call(this, app, game));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scoreLabel", new pc.Entity("scoreLabel"));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scoreValueLabel", new pc.Entity("scoreValueLabel"));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "background", new pc.Entity("pause-background"));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "title", new pc.Entity("title"));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "blurPower", 2);

    _this.background.addComponent("element", {
      type: pc.ELEMENTTYPE_IMAGE,
      anchor: new pc.Vec4(0, 0, 1, 1),
      pivot: new pc.Vec2(0, 0),
      useInput: true,
      opacity: 0,
      color: new pc.Color().fromString("#170B48")
    });

    _this.screen.addChild(_this.background);

    _this.resumeBtn = _this.createBlockButton(_Application.default.ICON_PLAY, "RESUME", _Application.default.ICON_BLUE_BUTTON);
    _this.mainMenuBtn = _this.createBlockButton(_Application.default.ICON_CUSTOMIZE, "MAIN MENU", _Application.default.ICON_RED_BUTTON);

    _this.mainMenuBtn.translateLocal(0, -87, 0); // Score value


    _this.title.addComponent("element", {
      type: pc.ELEMENTTYPE_TEXT,
      anchor: new pc.Vec4(0, 0, 0, 0),
      pivot: new pc.Vec2(0.5, 0.5),
      fontAsset: 1,
      lineHeight: 48,
      color: _construct(pc.Color, _toConsumableArray(game.config.gameLoop.ui.color)),
      fontSize: 48,
      opacity: 0,
      text: "PAUSE",
      layers: [6]
    }); // Score value


    _this.scoreValueLabel.addComponent("element", {
      type: pc.ELEMENTTYPE_TEXT,
      anchor: new pc.Vec4(0, 0, 0, 0),
      pivot: new pc.Vec2(0.5, 1),
      fontAsset: 1,
      lineHeight: 48,
      color: _construct(pc.Color, _toConsumableArray(game.config.gameLoop.ui.color)),
      fontSize: game.config.gameLoop.ui.fontSize,
      opacity: 0,
      text: 0,
      layers: [6]
    }); // Score


    _this.scoreLabel.addComponent("element", {
      type: pc.ELEMENTTYPE_TEXT,
      anchor: new pc.Vec4(0, 0, 0, 0),
      pivot: new pc.Vec2(0.5, 1),
      fontAsset: 2,
      color: new pc.Color().fromString("#8489C0"),
      fontSize: 40,
      text: game.config.gameLoop.ui.scoreText,
      opacity: 0,
      layers: [6]
    });

    _this.screen.addChild(_this.scoreLabel);

    _this.screen.addChild(_this.scoreValueLabel);

    _this.screen.addChild(_this.title);

    _this.scoreLabel.setPosition(0, 1, 0);

    _this.scoreValueLabel.setPosition(0, 1, 0);

    _this.title.setPosition(0, 0, 0);

    _this.scoreValueLabel.translateLocal(0, -10, 0);

    _this.scoreLabel.translateLocal(0, -70, 0);

    _this.title.translateLocal(0, 100, 0);

    _this.events();

    var animation = {
      opacity: 0,
      blur: 0
    };
    anime({
      targets: animation,
      opacity: 1,
      blur: _this.blurPower,
      easing: "linear",
      duration: 300,
      update: function update(anime) {
        _this.resumeBtn.element.opacity = animation.opacity;
        _this.resumeBtn.text.element.opacity = animation.opacity;
        _this.resumeBtn.icon.element.opacity = animation.opacity;
        _this.mainMenuBtn.element.opacity = animation.opacity;
        _this.mainMenuBtn.text.element.opacity = animation.opacity;
        _this.mainMenuBtn.icon.element.opacity = animation.opacity;
        _this.scoreLabel.element.opacity = animation.opacity;
        _this.scoreValueLabel.element.opacity = animation.opacity;
        _this.title.element.opacity = animation.opacity;
        game.app.root.script.blur.power = animation.blur;
        _this.background.element.opacity = animation.opacity / 3;
      }
    });
    return _this;
  }

  _createClass(PauseMenu, [{
    key: "events",
    value: function events() {
      var _this2 = this;

      this.resumeBtn.element.on("click", function (event) {
        return _this2.app.fire("level:unpause", _this2);
      });
      this.mainMenuBtn.element.on("click", function (event) {
        Promise.all([_this2.hide(), game.scene.hide()]).then(function () {
          game.app.fire("game:menu");
        });
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.resumeBtn.element.off();

        _this3.mainMenuBtn.element.off();

        var animation = {
          opacity: 1,
          blur: _this3.blurPower
        };
        anime({
          targets: animation,
          opacity: 0,
          blur: 0,
          easing: "linear",
          duration: 300,
          update: function update(anime) {
            _this3.resumeBtn.element.opacity = animation.opacity;
            _this3.resumeBtn.text.element.opacity = animation.opacity;
            _this3.resumeBtn.icon.element.opacity = animation.opacity;
            _this3.mainMenuBtn.element.opacity = animation.opacity;
            _this3.mainMenuBtn.text.element.opacity = animation.opacity;
            _this3.mainMenuBtn.icon.element.opacity = animation.opacity;
            _this3.background.element.opacity = animation.opacity / 3;
            _this3.title.element.opacity = animation.opacity;
            _this3.scoreLabel.element.opacity = animation.opacity;
            _this3.scoreValueLabel.element.opacity = animation.opacity;
            game.app.root.script.blur.power = animation.blur;
          },
          complete: function complete(anime) {
            _this3.root.destroy();

            _this3.background.destroy();

            _this3.resumeBtn.destroy();

            _this3.mainMenuBtn.destroy();

            _this3.scoreLabel.destroy();

            _this3.scoreValueLabel.destroy();

            _this3.title.destroy();

            return resolve();
          }
        });
      });
    }
  }, {
    key: "score",
    set: function set(value) {
      this.scoreValueLabel.element.text = value;
    }
  }]);

  _inherits(PauseMenu, _Scene);

  return PauseMenu;
}(_Scene2.default);

exports.default = PauseMenu;

},{"../Application":2,"./../Scene":4}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Storage2 = _interopRequireDefault(require("./../Storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

var LocalStorage =
/*#__PURE__*/
function (_Storage) {
  function LocalStorage() {
    var _this;

    _classCallCheck(this, LocalStorage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LocalStorage).call(this));

    if (!window.localStorage) {
      throw new Error("This storage type is not supported");
    }

    return _this;
  }

  _createClass(LocalStorage, [{
    key: "get",
    value: function get(key, defaultValue) {
      return new Promise(function (resolve) {
        var item = localStorage.getItem(key);
        if (!item) return resolve(defaultValue);
        return resolve(item);
      });
    }
  }, {
    key: "set",
    value: function set(key, value) {
      return new Promise(function (resolve) {
        localStorage.setItem(key, value);
        return resolve(value);
      });
    }
  }]);

  _inherits(LocalStorage, _Storage);

  return LocalStorage;
}(_Storage2.default);

exports.default = LocalStorage;

},{"./../Storage":5}],17:[function(require,module,exports){
"use strict";

var _Application = _interopRequireDefault(require("./js/Application"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CANVAS_ID = 'application-canvas';
var canvas, devices, app, game;

var createCanvas = function createCanvas() {
  canvas = document.createElement('canvas');
  canvas.setAttribute('id', CANVAS_ID);
  canvas.setAttribute('tabindex', 0); // canvas.style.visibility = 'hidden';
  // Disable I-bar cursor on click+drag

  canvas.onselectstart = function () {
    return false;
  };

  document.querySelector("body").appendChild(canvas);
  return canvas;
};

var createInputDevices = function createInputDevices(canvas) {
  var devices = {
    elementInput: new pc.ElementInput(canvas),
    keyboard: new pc.Keyboard(window),
    mouse: new pc.Mouse(canvas),
    gamepads: new pc.GamePads()
  };

  if ('ontouchstart' in window) {
    devices.touch = new pc.TouchDevice(canvas);
  }

  return devices;
};

var configureCss = function configureCss(fillMode, width, height) {
  // Configure resolution and resize event
  if (canvas.classList) {
    canvas.classList.add('fill-mode-' + fillMode);
  } // css media query for aspect ratio changes


  var css = "@media screen and (min-aspect-ratio: " + width + "/" + height + ") {";
  css += "    #application-canvas.fill-mode-KEEP_ASPECT {";
  css += "        width: auto;";
  css += "        height: 100%;";
  css += "        margin: 0 auto;";
  css += "    }";
  css += "}"; // append css to style

  if (document.head.querySelector) {
    document.head.querySelector('style').innerHTML += css;
  }
};

var reflow = function reflow() {
  var size = app.resizeCanvas(canvas.width, canvas.height);
  canvas.style.width = '';
  canvas.style.height = '';
  var fillMode = app._fillMode;

  if (fillMode == pc.FILLMODE_NONE || fillMode == pc.FILLMODE_KEEP_ASPECT) {
    if (fillMode == pc.FILLMODE_NONE && canvas.clientHeight < window.innerHeight || canvas.clientWidth / canvas.clientHeight >= window.innerWidth / window.innerHeight) {
      canvas.style.marginTop = Math.floor((window.innerHeight - canvas.clientHeight) / 2) + 'px';
    } else {
      canvas.style.marginTop = '';
    }
  }
};

var displayError = function displayError(html) {
  var div = document.createElement('div');
  div.innerHTML = ['<table style="background-color: #8CE; width: 100%; height: 100%;">', '  <tr>', '      <td align="center">', '          <div style="display: table-cell; vertical-align: middle;">', '              <div style="">' + html + '</div>', '          </div>', '      </td>', '  </tr>', '</table>'].join('\n');
  document.body.appendChild(div);
};

canvas = createCanvas();
devices = createInputDevices(canvas);

try {
  app = new pc.Application(canvas, {
    elementInput: devices.elementInput,
    keyboard: devices.keyboard,
    mouse: devices.mouse,
    gamepads: devices.gamepads,
    touch: devices.touch,
    graphicsDeviceOptions: {
      'antialias': true,
      'alpha': false,
      'preserveDrawingBuffer': false,
      'preferWebGl2': true
    },
    assetPrefix: window.ASSET_PREFIX || "",
    scriptPrefix: window.SCRIPT_PREFIX || "",
    scriptsOrder: window.SCRIPTS || []
  });
} catch (e) {
  if (e instanceof pc.UnsupportedBrowserError) {
    displayError('This page requires a browser that supports WebGL.<br/>' + '<a href="http://get.webgl.org">Click here to find out more.</a>');
  } else if (e instanceof pc.ContextCreationError) {
    displayError("It doesn't appear your computer can support WebGL.<br/>" + '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>');
  } else {
    displayError('Could not initialize application. Error: ' + e);
  }
}

app.configure("config/playcanvas.json", function (err) {
  if (err) {
    console.error(err);
  }

  configureCss(app._fillMode, app._width, app._height); //reflow();

  window.addEventListener('resize', reflow, false);
  window.addEventListener('orientationchange', reflow, false);
  app.preload(function (err) {
    if (err) {
      console.error(err);
    }

    app.start();
    window.game = new _Application.default(app);
  });
});

},{"./js/Application":2}]},{},[17]);
