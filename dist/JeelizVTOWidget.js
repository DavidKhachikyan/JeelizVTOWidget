/**
 * Jeeliz Glasses VTO Widget - https://github.com/jeeliz/jeelizGlassesVTOWidget
 *
 * Copyright 2020 WebAR.rocks ( Jeeliz® - https://jeeliz.com )
 *
 * This software library is the proprietary and confidential information of
 * Jeeliz ("Licensor"). You may only use this software library if
 * you have obtained a valid commercial license from Licensor. If you have not
 * obtained a valid commercial license from Licensor, please check out
 * https://jeeliz.com/#pricing for licensing options and pricing.
 *
 * Unauthorized use, reproduction, or distribution of this software library or
 * any portion thereof may result in severe civil and criminal penalties, and
 * will be prosecuted to the maximum extent possible under the law.
 *
 * THIS SOFTWARE LIBRARY IS PROVIDED "AS IS" AND WITHOUT ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
 *
 * IN NO EVENT SHALL LICENSOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE LIBRARY, EVEN
 * IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

"use strict";
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.owns = function (ka, oa) {
  return Object.prototype.hasOwnProperty.call(ka, oa);
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (ka, oa, qa) {
        if (ka == Array.prototype || ka == Object.prototype) return ka;
        ka[oa] = qa.value;
        return ka;
      };
$jscomp.getGlobal = function (ka) {
  ka = [
    "object" == typeof globalThis && globalThis,
    ka,
    "object" == typeof window && window,
    "object" == typeof self && self,
    "object" == typeof global && global,
  ];
  for (var oa = 0; oa < ka.length; ++oa) {
    var qa = ka[oa];
    if (qa && qa.Math == Math) return qa;
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE =
  "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS =
  !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function (ka, oa) {
  var qa = $jscomp.propertyToPolyfillSymbol[oa];
  if (null == qa) return ka[oa];
  qa = ka[qa];
  return void 0 !== qa ? qa : ka[oa];
};
$jscomp.polyfill = function (ka, oa, qa, Na) {
  oa &&
    ($jscomp.ISOLATE_POLYFILLS
      ? $jscomp.polyfillIsolated(ka, oa, qa, Na)
      : $jscomp.polyfillUnisolated(ka, oa, qa, Na));
};
$jscomp.polyfillUnisolated = function (ka, oa, qa, Na) {
  qa = $jscomp.global;
  ka = ka.split(".");
  for (Na = 0; Na < ka.length - 1; Na++) {
    var va = ka[Na];
    if (!(va in qa)) return;
    qa = qa[va];
  }
  ka = ka[ka.length - 1];
  Na = qa[ka];
  oa = oa(Na);
  oa != Na &&
    null != oa &&
    $jscomp.defineProperty(qa, ka, {
      configurable: !0,
      writable: !0,
      value: oa,
    });
};
$jscomp.polyfillIsolated = function (ka, oa, qa, Na) {
  var va = ka.split(".");
  ka = 1 === va.length;
  Na = va[0];
  Na = !ka && Na in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var pb = 0; pb < va.length - 1; pb++) {
    var ta = va[pb];
    if (!(ta in Na)) return;
    Na = Na[ta];
  }
  va = va[va.length - 1];
  qa = $jscomp.IS_SYMBOL_NATIVE && "es6" === qa ? Na[va] : null;
  oa = oa(qa);
  null != oa &&
    (ka
      ? $jscomp.defineProperty($jscomp.polyfills, va, {
          configurable: !0,
          writable: !0,
          value: oa,
        })
      : oa !== qa &&
        (($jscomp.propertyToPolyfillSymbol[va] = $jscomp.IS_SYMBOL_NATIVE
          ? $jscomp.global.Symbol(va)
          : $jscomp.POLYFILL_PREFIX + va),
        (va = $jscomp.propertyToPolyfillSymbol[va]),
        $jscomp.defineProperty(Na, va, {
          configurable: !0,
          writable: !0,
          value: oa,
        })));
};
$jscomp.assign =
  $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.assign
    ? Object.assign
    : function (ka, oa) {
        for (var qa = 1; qa < arguments.length; qa++) {
          var Na = arguments[qa];
          if (Na) for (var va in Na) $jscomp.owns(Na, va) && (ka[va] = Na[va]);
        }
        return ka;
      };
$jscomp.polyfill(
  "Object.assign",
  function (ka) {
    return ka || $jscomp.assign;
  },
  "es6",
  "es3"
);
$jscomp.arrayIteratorImpl = function (ka) {
  var oa = 0;
  return function () {
    return oa < ka.length ? { done: !1, value: ka[oa++] } : { done: !0 };
  };
};
$jscomp.arrayIterator = function (ka) {
  return { next: $jscomp.arrayIteratorImpl(ka) };
};
$jscomp.makeIterator = function (ka) {
  var oa =
    "undefined" != typeof Symbol && Symbol.iterator && ka[Symbol.iterator];
  return oa ? oa.call(ka) : $jscomp.arrayIterator(ka);
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill(
  "Promise",
  function (ka) {
    function oa() {
      this.batch_ = null;
    }
    function qa(ta) {
      return ta instanceof va
        ? ta
        : new va(function (Ja, Ra) {
            Ja(ta);
          });
    }
    if (ka && !$jscomp.FORCE_POLYFILL_PROMISE) return ka;
    oa.prototype.asyncExecute = function (ta) {
      if (null == this.batch_) {
        this.batch_ = [];
        var Ja = this;
        this.asyncExecuteFunction(function () {
          Ja.executeBatch_();
        });
      }
      this.batch_.push(ta);
    };
    var Na = $jscomp.global.setTimeout;
    oa.prototype.asyncExecuteFunction = function (ta) {
      Na(ta, 0);
    };
    oa.prototype.executeBatch_ = function () {
      for (; this.batch_ && this.batch_.length; ) {
        var ta = this.batch_;
        this.batch_ = [];
        for (var Ja = 0; Ja < ta.length; ++Ja) {
          var Ra = ta[Ja];
          ta[Ja] = null;
          try {
            Ra();
          } catch (db) {
            this.asyncThrow_(db);
          }
        }
      }
      this.batch_ = null;
    };
    oa.prototype.asyncThrow_ = function (ta) {
      this.asyncExecuteFunction(function () {
        throw ta;
      });
    };
    var va = function (ta) {
      this.state_ = 0;
      this.result_ = void 0;
      this.onSettledCallbacks_ = [];
      var Ja = this.createResolveAndReject_();
      try {
        ta(Ja.resolve, Ja.reject);
      } catch (Ra) {
        Ja.reject(Ra);
      }
    };
    va.prototype.createResolveAndReject_ = function () {
      function ta(db) {
        return function (nb) {
          Ra || ((Ra = !0), db.call(Ja, nb));
        };
      }
      var Ja = this,
        Ra = !1;
      return { resolve: ta(this.resolveTo_), reject: ta(this.reject_) };
    };
    va.prototype.resolveTo_ = function (ta) {
      if (ta === this)
        this.reject_(new TypeError("A Promise cannot resolve to itself"));
      else if (ta instanceof va) this.settleSameAsPromise_(ta);
      else {
        a: switch (typeof ta) {
          case "object":
            var Ja = null != ta;
            break a;
          case "function":
            Ja = !0;
            break a;
          default:
            Ja = !1;
        }
        Ja ? this.resolveToNonPromiseObj_(ta) : this.fulfill_(ta);
      }
    };
    va.prototype.resolveToNonPromiseObj_ = function (ta) {
      var Ja = void 0;
      try {
        Ja = ta.then;
      } catch (Ra) {
        this.reject_(Ra);
        return;
      }
      "function" == typeof Ja
        ? this.settleSameAsThenable_(Ja, ta)
        : this.fulfill_(ta);
    };
    va.prototype.reject_ = function (ta) {
      this.settle_(2, ta);
    };
    va.prototype.fulfill_ = function (ta) {
      this.settle_(1, ta);
    };
    va.prototype.settle_ = function (ta, Ja) {
      if (0 != this.state_)
        throw Error(
          "Cannot settle(" +
            ta +
            ", " +
            Ja +
            "): Promise already settled in state" +
            this.state_
        );
      this.state_ = ta;
      this.result_ = Ja;
      this.executeOnSettledCallbacks_();
    };
    va.prototype.executeOnSettledCallbacks_ = function () {
      if (null != this.onSettledCallbacks_) {
        for (var ta = 0; ta < this.onSettledCallbacks_.length; ++ta)
          pb.asyncExecute(this.onSettledCallbacks_[ta]);
        this.onSettledCallbacks_ = null;
      }
    };
    var pb = new oa();
    va.prototype.settleSameAsPromise_ = function (ta) {
      var Ja = this.createResolveAndReject_();
      ta.callWhenSettled_(Ja.resolve, Ja.reject);
    };
    va.prototype.settleSameAsThenable_ = function (ta, Ja) {
      var Ra = this.createResolveAndReject_();
      try {
        ta.call(Ja, Ra.resolve, Ra.reject);
      } catch (db) {
        Ra.reject(db);
      }
    };
    va.prototype.then = function (ta, Ja) {
      function Ra(ub, Fb) {
        return "function" == typeof ub
          ? function (Nb) {
              try {
                db(ub(Nb));
              } catch (Sb) {
                nb(Sb);
              }
            }
          : Fb;
      }
      var db,
        nb,
        Tb = new va(function (ub, Fb) {
          db = ub;
          nb = Fb;
        });
      this.callWhenSettled_(Ra(ta, db), Ra(Ja, nb));
      return Tb;
    };
    va.prototype.catch = function (ta) {
      return this.then(void 0, ta);
    };
    va.prototype.callWhenSettled_ = function (ta, Ja) {
      function Ra() {
        switch (db.state_) {
          case 1:
            ta(db.result_);
            break;
          case 2:
            Ja(db.result_);
            break;
          default:
            throw Error("Unexpected state: " + db.state_);
        }
      }
      var db = this;
      null == this.onSettledCallbacks_
        ? pb.asyncExecute(Ra)
        : this.onSettledCallbacks_.push(Ra);
    };
    va.resolve = qa;
    va.reject = function (ta) {
      return new va(function (Ja, Ra) {
        Ra(ta);
      });
    };
    va.race = function (ta) {
      return new va(function (Ja, Ra) {
        for (
          var db = $jscomp.makeIterator(ta), nb = db.next();
          !nb.done;
          nb = db.next()
        )
          qa(nb.value).callWhenSettled_(Ja, Ra);
      });
    };
    va.all = function (ta) {
      var Ja = $jscomp.makeIterator(ta),
        Ra = Ja.next();
      return Ra.done
        ? qa([])
        : new va(function (db, nb) {
            function Tb(Nb) {
              return function (Sb) {
                ub[Nb] = Sb;
                Fb--;
                0 == Fb && db(ub);
              };
            }
            var ub = [],
              Fb = 0;
            do
              ub.push(void 0),
                Fb++,
                qa(Ra.value).callWhenSettled_(Tb(ub.length - 1), nb),
                (Ra = Ja.next());
            while (!Ra.done);
          });
    };
    return va;
  },
  "es6",
  "es3"
);
$jscomp.polyfill(
  "Math.log2",
  function (ka) {
    return ka
      ? ka
      : function (oa) {
          return Math.log(oa) / Math.LN2;
        };
  },
  "es6",
  "es3"
);
$jscomp.findInternal = function (ka, oa, qa) {
  ka instanceof String && (ka = String(ka));
  for (var Na = ka.length, va = 0; va < Na; va++) {
    var pb = ka[va];
    if (oa.call(qa, pb, va, ka)) return { i: va, v: pb };
  }
  return { i: -1, v: void 0 };
};
$jscomp.polyfill(
  "Array.prototype.find",
  function (ka) {
    return ka
      ? ka
      : function (oa, qa) {
          return $jscomp.findInternal(this, oa, qa).v;
        };
  },
  "es6",
  "es3"
);
$jscomp.polyfill(
  "Object.is",
  function (ka) {
    return ka
      ? ka
      : function (oa, qa) {
          return oa === qa
            ? 0 !== oa || 1 / oa === 1 / qa
            : oa !== oa && qa !== qa;
        };
  },
  "es6",
  "es3"
);
$jscomp.polyfill(
  "Array.prototype.includes",
  function (ka) {
    return ka
      ? ka
      : function (oa, qa) {
          var Na = this;
          Na instanceof String && (Na = String(Na));
          var va = Na.length;
          qa = qa || 0;
          for (0 > qa && (qa = Math.max(qa + va, 0)); qa < va; qa++) {
            var pb = Na[qa];
            if (pb === oa || Object.is(pb, oa)) return !0;
          }
          return !1;
        };
  },
  "es7",
  "es3"
);
$jscomp.checkStringArgs = function (ka, oa, qa) {
  if (null == ka)
    throw new TypeError(
      "The 'this' value for String.prototype." +
        qa +
        " must not be null or undefined"
    );
  if (oa instanceof RegExp)
    throw new TypeError(
      "First argument to String.prototype." +
        qa +
        " must not be a regular expression"
    );
  return ka + "";
};
$jscomp.polyfill(
  "String.prototype.includes",
  function (ka) {
    return ka
      ? ka
      : function (oa, qa) {
          return (
            -1 !==
            $jscomp.checkStringArgs(this, oa, "includes").indexOf(oa, qa || 0)
          );
        };
  },
  "es6",
  "es3"
);
$jscomp.polyfill(
  "Array.prototype.findIndex",
  function (ka) {
    return ka
      ? ka
      : function (oa, qa) {
          return $jscomp.findInternal(this, oa, qa).i;
        };
  },
  "es6",
  "es3"
);
$jscomp.polyfill(
  "Promise.prototype.finally",
  function (ka) {
    return ka
      ? ka
      : function (oa) {
          return this.then(
            function (qa) {
              return Promise.resolve(oa()).then(function () {
                return qa;
              });
            },
            function (qa) {
              return Promise.resolve(oa()).then(function () {
                throw qa;
              });
            }
          );
        };
  },
  "es9",
  "es3"
);
$jscomp.polyfill(
  "Math.sign",
  function (ka) {
    return ka
      ? ka
      : function (oa) {
          oa = Number(oa);
          return 0 === oa || isNaN(oa) ? oa : 0 < oa ? 1 : -1;
        };
  },
  "es6",
  "es3"
);
var JeelizVTOWidget = (function () {
  function ka() {
    Qa.mode = ob.realtime;
    Qa.isRT = !0;
    Aa.adjust = document.getElementById("JeelizVTOWidgetAdjust");
    if (Aa.adjust) {
      Aa.adjustNotice = document.getElementById("JeelizVTOWidgetAdjustNotice");
      Aa.adjustExit = document.getElementById("JeelizVTOWidgetAdjustExit");
      Aa.changeModelContainer = document.getElementById(
        "JeelizVTOWidgetChangeModelContainer"
      );
      Aa.buttonResizeCanvas = document.getElementById("buttonResizeCanvas");
      var da = Aa.adjust;
      da && da.addEventListener("click", Tb, !1);
      (da = Aa.adjustExit) && da.addEventListener("click", ub, !1);
      [Aa.adjust, Aa.changeModelContainer, Aa.buttonResizeCanvas].forEach(qa);
    }
    Ub.enabled && Sa.do_instantDetection(Ub.interval, Ub.callback);
    ac && (ac(!0), (ac = null));
  }
  function oa() {
    var da = document.createElement("style");
    da.setAttribute("type", "text/css");
    da.innerHTML =
      "._jeelizVTOForceHide { display: none!important }._jeelizVTOForceShow { display: revert!important }";
    var la = document.getElementsByTagName("head");
    1 <= la.length ? la[0].appendChild(da) : document.body.appendChild(da);
  }
  function qa(da) {
    da &&
      (da.classList.remove("_jeelizVTOForceHide"),
      "none" === window.getComputedStyle(da).display &&
        da.classList.add("_jeelizVTOForceShow"));
  }
  function Na(da) {
    da &&
      (da.classList.add("_jeelizVTOForceHide"),
      da.classList.remove("_jeelizVTOForceShow"));
  }
  function va(da, la) {
    if (da) for (var Oa in la) da.style[Oa] = la[Oa];
  }
  function pb(da) {
    if (!da) return { width: 0, height: 0 };
    da = da.getBoundingClientRect();
    return { width: da.width, height: da.height };
  }
  function ta(da) {
    return new Promise(function (la, Oa) {
      var Ka = new XMLHttpRequest();
      Ka.open("GET", da, !0);
      Ka.onreadystatechange = function () {
        if (4 === Ka.readyState)
          if (200 === Ka.status || 0 === Ka.status)
            try {
              var $a = JSON.parse(Ka.responseText);
              la($a);
            } catch (Ya) {
              Oa("INVALID JSON");
            }
          else Oa("HTTP ERROR " + Ka.status);
      };
      Ka.send();
    });
  }
  function Ja(da, la) {
    return new Promise(function (Oa, Ka) {
      ta(da)
        .then(function ($a) {
          Sa.set_modelStandalone($a, Nb.bind(null, la, Oa), la);
        })
        .catch(Ka);
    });
  }
  function Ra() {
    yb.toggle_loading(!1);
    Qa.mode = ob.realtime;
    db("INVALID_SKU");
  }
  function db(da) {
    xc.error ? xc.error(da) : console.log("ERROR:", da);
  }
  function nb(da) {
    var la = pb(Aa.container),
      Oa = Math.abs(jb.displayWidth - la.width),
      Ka = Math.abs(jb.displayHeight - la.height);
    if (!da && 1 >= Oa && 1 >= Ka)
      console.log(
        "INFO in JeelizVTOWidget.resize: resolution difference too small abord resize"
      );
    else if (
      ((jb.displayWidth = la.width),
      (jb.displayHeight = la.height),
      console.log(
        "INFO in JeelizVTOWidget.resize: width = " +
          jb.displayWidth.toString() +
          " height = " +
          jb.displayHeight.toString() +
          " oFactor = " +
          (1).toString()
      ),
      (jb.cvWidth = Math.round(1 * jb.displayWidth)),
      (jb.cvHeight = Math.round(1 * jb.displayHeight)),
      va(Aa.cv, {
        width: jb.displayWidth.toString() + "px",
        height: jb.displayHeight.toString() + "px",
      }),
      (Aa.cv.width = jb.cvWidth),
      (Aa.cv.height = jb.cvHeight),
      Sa)
    )
      if (Qa.mode === ob.notLoaded) Sa.set_size(jb.cvWidth, jb.cvHeight, !1);
      else
        Sa.onLoad(function () {
          Sa.resize(jb.cvWidth, jb.cvHeight, !1, da);
        });
  }
  function Tb() {
    [Aa.adjust, Aa.changeModelContainer, Aa.buttonResizeCanvas].forEach(Na);
    Qa.mode = ob.adjust;
    [Aa.adjustNotice, Aa.adjustExit].forEach(qa);
    Aa.cv.style.cursor = "move";
    Sa.switch_modeInteractor("movePinch");
    lc("ADJUST_START");
  }
  function ub() {
    [Aa.adjustNotice, Aa.adjustExit].forEach(Na);
    [Aa.adjust, Aa.changeModelContainer, Aa.buttonResizeCanvas].forEach(qa);
    Aa.cv.style.cursor = "auto";
    Qa.mode = Qa.realtime;
    Sa.switch_modeInteractor("idle");
    lc("ADJUST_END");
  }
  function Fb() {
    if (!Aa.trackIframe) {
      var da = mc.appstaticURL + "jeewidget/";
      Aa.trackIframe = document.createElement("iframe");
      Aa.trackIframe.width = "10";
      Aa.trackIframe.height = "10";
      Aa.trackIframe.src = da + "trackIframe.html";
      va(Aa.trackIframe, {
        position: "absolute",
        zIndex: -1,
        bottom: "0",
        right: "0",
      });
      Aa.container.appendChild(Aa.trackIframe);
    }
  }
  function Nb(da, la) {
    Qa.mode = ob.realtime;
    la && la();
    yb.toggle_loading(!1);
    if (Aa.trackIframe) {
      la = location.href.split("?").shift().split("://").pop();
      la = la.split("/").shift();
      la = la.split("www.").pop();
      try {
        Aa.trackIframe.contentWindow.postMessage(
          { action: "COUNTTRYONSESSION", domain: la, sku: da },
          "*"
        );
      } catch (Oa) {}
    }
  }
  function Sb(da, la, Oa, Ka) {
    var $a = la.mod + ".json";
    la.isStandalone
      ? Ja(yc + "models3DStandalone/" + $a, da).then(Oa)
      : Sa.load_model($a, la.mats, Nb.bind(null, da, Oa), da, Ka);
  }
  function lc(da) {
    (da = Kc[da]) && da();
  }
  var Sa = (function () {
    function da(a, b) {
      return a[0] * (1 - b) + a[1] * b;
    }
    function la(a, b) {
      var d = new XMLHttpRequest();
      d.open("GET", a, !0);
      d.withCredentials = !1;
      d.onreadystatechange = function () {
        4 !== d.readyState ||
          (200 !== d.status && 0 !== d.status) ||
          b(d.responseText);
      };
      d.send();
    }
    function Oa(a, b) {
      la(a + "", function (d) {
        b(JSON.parse(d));
      });
    }
    function Ka(a, b) {
      if (0 === b || "object" !== typeof a) return a;
      a = Object.assign({}, a);
      b = void 0 === b || -1 === b ? -1 : b - 1;
      for (var d in a) a[d] = Ka(a[d], b);
      return a;
    }
    function $a(a) {
      return 0.5 > a ? 4 * a * a * a : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1;
    }
    function Ya(a) {
      switch (a) {
        case "relu":
          return "gl_FragColor=max(vec4(0.),gl_FragColor);";
        case "elu":
          return "gl_FragColor=mix(exp(-abs(gl_FragColor))-vec4(1.),gl_FragColor,step(0.,gl_FragColor));";
        case "elu01":
          return "gl_FragColor=mix(0.1*exp(-abs(gl_FragColor))-vec4(0.1),gl_FragColor,step(0.,gl_FragColor));";
        case "arctan":
          return "gl_FragColor=atan(3.14159265359*texture2D(u0,vUV))/3.14159265359;";
        case "copy":
          return "";
        default:
          return !1;
      }
    }
    function zb(a, b) {
      var d = b % 8;
      return (a[(b - d) / 8] >> (7 - d)) & 1;
    }
    function La(a, b, d) {
      var f = 1,
        l = 0;
      for (d = b + d - 1; d >= b; --d) (l += f * zb(a, d)), (f *= 2);
      return l;
    }
    function kb(a) {
      a = a.data;
      a =
        "undefined" === typeof btoa
          ? Buffer.from(a, "base64").toString("latin1")
          : atob(a);
      for (var b = a.length, d = new Uint8Array(b), f = 0; f < b; ++f)
        d[f] = a.charCodeAt(f);
      return d;
    }
    function sb(a) {
      return "string" === typeof a ? JSON.parse(a) : a;
    }
    function Lb(a) {
      return "undefined" === typeof sb(a).nb ? Ob(a) : Cb(a);
    }
    function Cb(a) {
      var b = sb(a);
      a = b.nb;
      if (0 === a) return new Uint8Array(b.nb);
      var d = b.n;
      b = kb(b);
      for (var f = new Uint32Array(d), l = 0; l < d; ++l)
        f[l] = La(b, l * a, a);
      return f;
    }
    function Ob(a) {
      var b = sb(a);
      a = b.ne;
      var d = b.nf,
        f = b.n;
      b = kb(b);
      for (
        var l = new Float32Array(f),
          p = new Float32Array(d),
          u = a + d + 1,
          h = 0;
        h < f;
        ++h
      ) {
        var m = u * h,
          r = 0 === zb(b, m) ? 1 : -1,
          w = La(b, m + 1, a);
        m = m + 1 + a;
        for (var H = p.length, y = 0, x = m; x < m + H; ++x)
          (p[y] = zb(b, x)), ++y;
        for (H = m = 0; H < d; ++H) m += p[H] * Math.pow(2, -H - 1);
        l[h] =
          0 === m && 0 === w
            ? 0
            : r * (1 + m) * Math.pow(2, 1 + w - Math.pow(2, a - 1));
      }
      return l;
    }
    function bc(a) {
      var b = null,
        d = null,
        f = null,
        l = 0,
        p = this,
        u = null,
        h = { Mc: [], Yd: "none", dg: !1, Xd: null, grid: null };
      this.m = function () {
        this.Tk(u.Mc);
        f.to({ Yd: u.Yd, dg: u.dg, Xd: u.Xd });
      };
      this.Yl = function (m) {
        return b[m];
      };
      this.se = function (m) {
        ["s32", "s34", "s27"].forEach(function (r) {
          Z.j(r, [{ type: "2f", name: "u20", value: m }]);
        });
        b &&
          b.forEach(function (r) {
            r.se(m);
          });
      };
      this.Tk = function (m) {
        var r = null;
        l = m.length;
        var w =
            null !== u.grid &&
            a.grid.length &&
            !(1 === a.grid[0] && 1 === a.grid[1]),
          H = w ? u.grid : [1, 1];
        w && this.se(H);
        b = m.map(function (y, x) {
          y = Object.assign({}, y, {
            index: x,
            parent: p,
            ce: r,
            Gm: x === l - 1,
            Hc: w,
            Ca: H,
          });
          return (r = 0 === x ? bd.instance(y) : cd.instance(y));
        });
        d = b[0];
        f = b[l - 1];
        b.forEach(function (y, x) {
          0 !== x && y.tn();
        });
      };
      this.ya = function (m) {
        m.h(0);
        var r = m;
        b.forEach(function (w) {
          r = w.ya(r, !1);
        });
        return r;
      };
      this.Wh = function () {
        return d.Xl();
      };
      this.Ec = function () {
        return f.am();
      };
      this.Sh = function () {
        return f.Sh();
      };
      this.A = function () {
        b &&
          (b.forEach(function (m) {
            m.A();
          }),
          (f = d = b = null),
          (l = 0));
      };
      "undefined" !== typeof a && ((u = Object.assign({}, h, a)), this.m());
    }
    function Gb(a, b) {
      a[b] = !0;
      a.setAttribute(b, "true");
    }
    function cc(a, b) {
      window.addEventListener(
        "beforeunload",
        function () {
          b &&
            b.getTracks &&
            b.getTracks().forEach(function (d) {
              b.removeTrack(d);
            });
          a.videoStream && a.videoStream.stop();
          a.videoStream = null;
        },
        !1
      );
    }
    function nc() {
      var a = navigator.userAgent.toLowerCase();
      return -1 !== a.indexOf("safari") && -1 === a.indexOf("chrome") ? !0 : !1;
    }
    function dc(a) {
      if (!a) return a;
      var b = null;
      if (a.video) {
        var d = function (f) {
          return f && "object" === typeof f ? Object.assign({}, f) : f;
        };
        b = {};
        "undefined" !== typeof a.video.width && (b.width = d(a.video.width));
        "undefined" !== typeof a.video.height && (b.height = d(a.video.height));
        "undefined" !== typeof a.video.facingMode &&
          (b.facingMode = d(a.video.facingMode));
      }
      b = { audio: a.audio, video: b };
      "undefined" !== typeof a.deviceId && ec(b, a.deviceId);
      return b;
    }
    function ec(a, b) {
      b &&
        ((a.video = a.video || {}),
        (a.video.deviceId = { exact: b }),
        a.video.facingMode && delete a.video.facingMode);
    }
    function oc(a) {
      var b = a.video.width;
      a.video.width = a.video.height;
      a.video.height = b;
      return a;
    }
    function pc(a) {
      function b(y) {
        return [
          480, 576, 640, 648, 720, 768, 800, 960, 1080, 1152, 1280, 1366, 1920,
        ].sort(function (x, z) {
          return Math.abs(x - y) - Math.abs(z - y);
        });
      }
      function d(y) {
        var x = dc(a);
        y = y(x);
        l.push(y);
        f(y);
      }
      function f(y) {
        if (y.video && y.video.facingMode && y.video.facingMode.exact) {
          var x = y.video.facingMode.exact;
          y = dc(y);
          delete y.video.facingMode.exact;
          y.video.facingMode.ideal = x;
          l.push(y);
        }
      }
      var l = [];
      if (!a || !a.video) return l;
      f(a);
      if (a.video.width && a.video.height) {
        if (a.video.width.ideal && a.video.height.ideal) {
          var p = b(a.video.width.ideal).slice(0, 3),
            u = b(a.video.height.ideal).slice(0, 3),
            h = {},
            m = 0;
          for (h.Fb = void 0; m < p.length; h = { Fb: h.Fb }, ++m) {
            h.Fb = p[m];
            var r = {},
              w = 0;
            for (r.xb = void 0; w < u.length; r = { xb: r.xb }, ++w)
              if (
                ((r.xb = u[w]),
                h.Fb !== a.video.width.ideal || r.xb !== a.video.height.ideal)
              ) {
                var H = Math.max(h.Fb, r.xb) / Math.min(h.Fb, r.xb);
                H < 4 / 3 - 0.1 ||
                  H > 16 / 9 + 0.1 ||
                  d(
                    (function (y, x) {
                      return function (z) {
                        z.video.width.ideal = y.Fb;
                        z.video.height.ideal = x.xb;
                        return z;
                      };
                    })(h, r)
                  );
              }
          }
        }
        d(function (y) {
          return oc(y);
        });
      }
      a.video.width &&
        a.video.height &&
        (a.video.width.ideal &&
          a.video.height.ideal &&
          d(function (y) {
            delete y.video.width.ideal;
            delete y.video.height.ideal;
            return y;
          }),
        d(function (y) {
          delete y.video.width;
          delete y.video.height;
          return y;
        }));
      a.video.facingMode &&
        (d(function (y) {
          delete y.video.facingMode;
          return y;
        }),
        a.video.width &&
          a.video.height &&
          d(function (y) {
            oc(y);
            delete y.video.facingMode;
            return y;
          }));
      l.push({ audio: a.audio, video: !0 });
      return l;
    }
    function Vb(a) {
      a.volume = 0;
      Gb(a, "muted");
      if (nc()) {
        if (1 === a.volume) {
          var b = function () {
            a.volume = 0;
            window.removeEventListener("mousemove", b, !1);
            window.removeEventListener("touchstart", b, !1);
          };
          window.addEventListener("mousemove", b, !1);
          window.addEventListener("touchstart", b, !1);
        }
        setTimeout(function () {
          a.volume = 0;
          Gb(a, "muted");
        }, 5);
      }
    }
    function qc(a) {
      var b = Ba.element,
        d = Ba.th;
      return null === b
        ? Promise.resolve()
        : new Promise(function (f, l) {
            if (b.srcObject && b.srcObject.getVideoTracks) {
              var p = b.srcObject.getVideoTracks();
              1 !== p.length
                ? l("INVALID_TRACKNUMBER")
                : ((p = p[0]), a ? Lc(b, f, l, d) : (p.stop(), f()));
            } else l("BAD_IMPLEMENTATION");
          });
    }
    function fc(a, b, d, f) {
      function l(u) {
        p || ((p = !0), d(u));
      }
      var p = !1;
      navigator.mediaDevices
        .getUserMedia(f)
        .then(function (u) {
          function h() {
            setTimeout(function () {
              if (a.currentTime) {
                var r = a.videoHeight;
                if (0 === a.videoWidth || 0 === r) l("VIDEO_NULLSIZE");
                else {
                  r = { al: null, Eg: null, an: null };
                  try {
                    var w = u.getVideoTracks()[0];
                    w &&
                      ((r.an = w),
                      (r.al = w.getCapabilities()),
                      (r.Eg = w.getSettings()));
                  } catch (H) {}
                  p || (cc(a, u), b(a, u, r));
                }
              } else l("VIDEO_NOTSTARTED");
            }, 700);
          }
          function m() {
            a.removeEventListener("loadeddata", m, !1);
            var r = a.play();
            Vb(a);
            "undefined" === typeof r
              ? h()
              : r
                  .then(function () {
                    h();
                  })
                  .catch(function () {
                    l("VIDEO_PLAYPROMISEREJECTED");
                  });
          }
          "undefined" !== typeof a.srcObject
            ? (a.srcObject = u)
            : ((a.src = window.URL.createObjectURL(u)), (a.videoStream = u));
          Vb(a);
          a.addEventListener("loadeddata", m, !1);
        })
        .catch(function (u) {
          l(u);
        });
    }
    function Lc(a, b, d, f) {
      a
        ? navigator.mediaDevices && navigator.mediaDevices.getUserMedia
          ? (Gb(a, "autoplay"),
            Gb(a, "playsinline"),
            f && f.audio ? (a.volume = 0) : Gb(a, "muted"),
            dd(f).then(function () {
              fc(
                a,
                b,
                function () {
                  function l(u) {
                    if (0 === u.length)
                      d("NO_VALID_MEDIASTREAM_FALLBACK_CONSTRAINTS");
                    else {
                      var h = u.shift();
                      fc(
                        a,
                        b,
                        function () {
                          l(u);
                        },
                        h
                      );
                    }
                  }
                  var p = pc(f);
                  l(p);
                },
                f
              );
            }))
          : d && d("MEDIASTREAMAPI_NOT_FOUND")
        : d && d("VIDEO_NOT_PROVIDED");
    }
    function dd(a) {
      if (!a || !a.video || !a.video.facingMode)
        return Promise.resolve("NO_VIDEO_CONSTRAINTS");
      if (a.video.deviceId) return Promise.resolve("DEVICEID_ALREADY_SET");
      var b = a.video.facingMode;
      b = b.exact || b.ideal;
      if (!b) return Promise.resolve("NO_FACINGMODE");
      var d = { user: [], environment: ["camera2 0"] }[b];
      return d && 0 !== d.length
        ? new Promise(function (f) {
            Mc(function (l) {
              l
                ? (l = l.find(function (p) {
                    var u = p.label;
                    return u
                      ? d.some(function (h) {
                          return u.includes(h);
                        })
                      : !1;
                  }))
                  ? ((a.video.deviceId = { exact: l.deviceId }), f("SUCCESS"))
                  : f("NO_PREFERRED_DEVICE_FOUND")
                : f("NO_DEVICES_FOUND");
            });
          })
        : Promise.resolve("NO_PREFERRED_CAMERAS");
    }
    function Mc(a) {
      navigator.mediaDevices && navigator.mediaDevices.enumerateDevices
        ? navigator.mediaDevices
            .enumerateDevices()
            .then(function (b) {
              (b = b.filter(function (d) {
                return (
                  d.kind &&
                  -1 !== d.kind.toLowerCase().indexOf("video") &&
                  d.label &&
                  d.deviceId
                );
              })) &&
              b.length &&
              0 < b.length
                ? a(b, !1)
                : a(!1, "NODEVICESFOUND");
            })
            .catch(function () {
              a(!1, "PROMISEREJECTED");
            })
        : a(!1, "NOTSUPPORTED");
    }
    function ed() {
      function a(K) {
        K = K ? rc.gf : 1;
        R.width = K * I.width;
        R.height = K * I.height;
        return R;
      }
      function b(K) {
        var S = K.length - 1,
          ea = K[S];
        if ("data:" === ea.substring(0, 5)) return ea;
        for (ea = ""; 0 <= S; --S) {
          var pa = K[S],
            Ga = "http" === pa.substring(0, 4).toLowerCase();
          ea = pa + ea;
          if (Ga) break;
        }
        return ea;
      }
      function d(K, S, ea) {
        return new Promise(function (pa) {
          ya.Hj(S);
          Ca.ba();
          ab.isEnabled = !0;
          Ha.isEnabled = !1;
          ab.Pa || (ab.Pa = gc.instance({}));
          K.Yh() && (ab.Pa.vg(K.Yh()), ya.qa(ab.Pa));
          K.set();
          Ha.isEnabled = !1;
          w();
          var Ga = lb.Uh(ea);
          setTimeout(function () {
            ab.isEnabled = !1;
            ya.Hj(!1);
            pa(Ga);
          }, 1);
        });
      }
      function f(K, S) {
        ma.Xc = 0.5;
        return new Promise(function (ea) {
          Ha.bc = K;
          Ha.isEnabled = !0;
          Ha.C = function () {
            var pa = Nc.instance(S());
            Ha.C = null;
            ea(pa);
          };
        });
      }
      function l(K, S) {
        return new Promise(function (ea, pa) {
          Oa(S + K, function (Ga) {
            Ga.error
              ? pa("SKU_NOT_FOUND")
              : ea({ bn: Ga.intrinsic.mod + ".json", $m: Ga.intrinsic.mats });
          });
        });
      }
      function p(K, S) {
        var ea = b([I.da, I.va, I.Ud + "/"]);
        S = S.map(function (pa) {
          return ea + pa;
        });
        V.model = {
          url: b([I.da, I.va, I.Vd + "/" + K]),
          Pc: S,
          Kb: !1,
          Jb: !1,
        };
        return new Promise(function (pa) {
          Pa.Fi(V.model, function () {
            T.isBusy = !1;
            pa();
          });
        });
      }
      function u(K, S) {
        if (!S) return K;
        K = K.slice(0);
        var ea = fb.bi().map(function (rb) {
            return rb.toLowerCase();
          }),
          pa;
        for (pa in S) {
          var Ga = ea.indexOf(pa.toLowerCase());
          -1 !== Ga && (K[Ga] = S[pa]);
        }
        return K;
      }
      function h(K, S) {
        return new Promise(function (ea, pa) {
          T.set_model(
            K,
            function () {
              T.set_materials(S, function () {
                T.isBusy = !1;
                ea();
              });
            },
            function () {
              T.isBusy = !1;
              pa("CANNOT_LOAD_MODEL");
            }
          );
        });
      }
      function m() {
        T.load_model = function (K, S, ea, pa, Ga, rb) {
          if (T.isBusy) return !1;
          T.isBusy = !0;
          S = u(S, Ga);
          (V.model ? h(K, S) : p(K, S)).then(ea).catch(rb);
          return !0;
        };
        T.set_offset = function (K) {
          E = K;
          Pa.te();
        };
        T.set_scale = function (K) {
          B = K;
          Pa.ue();
        };
        T.set_rx = function (K) {
          U = K;
          Pa.Vj();
        };
        T.switch_shadow = ya.Jg;
        T.switch_bgBlur = ya.Ig;
        T.set_zoom = ya.ug;
        T.is_viewer3D = function () {
          return ra === ja.Ja;
        };
        T.switch_viewer3D = function (K, S) {
          if (
            ra === ja.mc ||
            ra === ja.nc ||
            (ra === ja.X && !K) ||
            (ra === ja.Ja && K) ||
            Ha.isEnabled
          )
            return !1;
          if (ra === ja.ua)
            return Wa !== ja.Ja || K
              ? Wa === ja.X && K
                ? ((Wa = ja.Ja), ya.qa(ma.Eb), ya.cb(1), S && S(), !0)
                : !1
              : ((Wa = ja.X), ya.qa(ma.Ia), ya.cb(0), S && S(), !0);
          var ea = 0,
            pa = -1,
            Ga = 0;
          ra === ja.X
            ? ((ra = ja.mc), (pa = I.ap))
            : ra === ja.Ja && ((ra = ja.nc), (pa = I.ep));
          var rb = zc.mf();
          hb = setInterval(function () {
            var mb = zc.mf();
            ea += (mb - rb) / pa;
            1 <= ea &&
              ((ea = 1),
              ra === ja.mc
                ? ((ra = ja.Ja), ya.qa(ma.Eb))
                : ((ra = ja.X), ya.qa(ma.Ia)),
              S && S(),
              clearInterval(hb),
              (hb = null));
            var Mb = ra === ja.nc || ra === ja.X ? 1 - I.Zo(ea) : I.Yo(ea);
            ya.cb(Mb);
            (ra !== ja.nc && ra !== ja.mc) ||
              0 !== Ga++ % 2 ||
              (ya.qa(ma.Xf), ma.Xf.no(Mb));
            rb = mb;
          }, 0.016);
          return !0;
        };
        T.capture_image = function (K, S, ea, pa) {
          Ha.bc = K;
          Ha.isEnabled = !0;
          "undefined" === typeof isAllocate && (ea = !1);
          (pa = "undefined" === typeof pa ? !1 : pa) && ya.le(!1);
          g();
          Ha.C = function () {
            ya.cj(0);
            c.flush();
            var Ga = lb.Uh(ea);
            S(Ga);
            pa && ya.le(!0);
          };
        };
        T.capture_detection = function (K, S) {
          var ea = null === ca.Gb ? ca.kb : ca.$c;
          f(K, function () {
            return {
              pd: na.pc.clone(),
              Yf: fb.ai(),
              Tf: fb.Zh(),
              background: ea.clone(),
              Pa: xa.Ka.ci().clone(),
              Sf: ib,
            };
          }).then(S);
        };
        T.process_image = function (K) {
          function S() {
            return new Promise(function (vb, qb) {
              Ha.Tg = mb.updateLightInterval;
              f(mb.nSteps, ea).then(function (gb) {
                Ha.Tg = 3;
                gb
                  ? 1 >= gb.cm().data[0]
                    ? (gb.I(), qb("FACE_NOT_FOUND"))
                    : d(gb, mb.isMask, !0).then(function (fd) {
                        ya.qa(ma.Ia);
                        gb.I();
                        vb(fd);
                      })
                  : qb("CRITICAL");
              });
              w();
            });
          }
          function ea() {
            return {
              pd: na.pc.clone(),
              Yf: !1,
              Tf: !1,
              background: I.wq ? !1 : ca.kb.clone(!0),
              Pa: xa.Ka.ci().clone(),
            };
          }
          function pa() {
            return new Promise(function (vb, qb) {
              l(mb.modelSKU, mb.glassesDBURL)
                .then(function (gb) {
                  T.load_model(
                    gb.bn,
                    gb.$m,
                    function () {
                      vb();
                    },
                    mb.modelSKU,
                    null,
                    function () {
                      qb("CANNOT_LOAD_MODEL");
                    }
                  );
                })
                .catch(function (gb) {
                  qb(gb);
                });
            });
          }
          function Ga() {
            if (mb.image) {
              var vb = mb.image;
              rb(vb);
              return Promise.resolve(vb);
            }
            return new Promise(function (qb) {
              var gb = new Image();
              gb.onload = function () {
                rb(gb);
                qb();
              };
              gb.src = mb.imageBase64;
            });
          }
          function rb(vb) {
            var qb = vb.width,
              gb = vb.height;
            if (qb !== I.width || gb !== I.height)
              Ba.Md && ((Ba.element.width = qb), (Ba.element.height = gb)),
                J(qb, gb, mb.overSamplingFactor);
            Ba.Hh.drawImage(vb, 0, 0);
            g();
          }
          var mb = Object.assign(
            {
              imageBase64: null,
              image: null,
              FOVHztDeg: 0,
              nSteps: 50,
              updateLightInterval: 3,
              overSamplingFactor: 2,
              modelSKU: "undef",
              glassesDBURL: "https://glassesdbcached.jeeliz.com/sku/",
              isMask: !0,
            },
            K
          );
          if (I.Kc) throw Error("This feature cannot be called");
          var Mb = bb.FOVforced;
          mb.FOVHztDeg && (bb.FOVforced = mb.FOVHztDeg);
          ya.qa(ma.Ia);
          return new Promise(function (vb, qb) {
            return pa()
              .then(Ga)
              .then(function () {
                S()
                  .then(function (gb) {
                    bb.FOVforced = Mb;
                    vb(gb);
                  })
                  .catch(qb);
              })
              .catch(qb)
              .catch(qb);
          });
        };
        T.process_offlineRendering = function (K, S, ea, pa, Ga) {
          Pa.On();
          pa &&
            (T.gk.drawImage(lb.tb(), 0, 0),
            lb.tb().parentNode.insertBefore(T.Hb, lb.tb()),
            T.Hb.setAttribute("class", "jeefitMask"));
          T.set_model(S, function () {
            T.set_materials(ea, function () {
              setTimeout(function () {
                d(K, pa).then(Ga);
                Pa.Ln(
                  pa
                    ? function () {
                        lb.tb().parentNode.removeChild(T.Hb);
                      }
                    : !1
                );
              }, 1);
            });
          });
        };
        T.serialize_detection = function (K) {
          return K.cc();
        };
        T.unserialize_detection = function (K, S, ea) {
          return Nc.Zc(K, S, ea);
        };
        T.do_instantDetection = function (K, S) {
          Oc.m(na.pc);
          Oc.start(K, S);
        };
        T.relieve_DOM = function (K, S) {
          if (O.Wb) return !1;
          y(S || 160);
          X = !1;
          fa && clearTimeout(fa);
          fa = setTimeout(function () {
            y(I.Aa);
            fa = !1;
            z();
          }, K);
          return !0;
        };
        T.switch_slow = function (K, S) {
          if (O.Wb) return !1;
          "undefined" === typeof S && (S = I.nk);
          fa && (y(I.Aa), z(), clearTimeout(fa), (fa = !1));
          K ? (X = !1) : z();
          y(K ? S : I.Aa);
          return !0;
        };
        T.switch_deepSleep = function (K) {
          if (Xa === K) return !1;
          Xa = !1;
          T.switch_sleep(K);
          Xa = K;
          return !0;
        };
        T.switch_sleep = function (K, S) {
          function ea() {
            T.isBusy = !1;
            K ? ((Wa = ra), (ra = ja.ua)) : ((ra = Wa), w());
          }
          if (O.Wb || Xa || T.isBusy) return S ? Promise.reject() : null;
          if ((K && ra === ja.ua) || (!K && ra !== ja.ua))
            return S ? Promise.resolve(!1) : !1;
          hb && (clearInterval(hb), (hb = null));
          ra === ja.nc
            ? ((ra = ja.X), ya.qa(ma.Ia), ya.cb(0))
            : ra === ja.mc && ((ra = ja.Ja), ya.qa(ma.Eb), ya.cb(1));
          Ab.stop();
          var pa = null;
          T.isBusy = !0;
          S ? (pa = qc(!K).then(ea)) : ea();
          return S ? pa : !0;
        };
        T.set_modelStandalone = function (K, S) {
          ya.me(!1);
          Ac.instance({
            url: K.model,
            Pc: K.materials,
            Kb: !1,
            Jb: !1,
            C: function (ea) {
              ba = [0, 0, 0];
              wa = 1;
              Za = G = A = 0;
              Ia = I.Nc;
              T.ready && Pa.ve();
              S && S();
              H(ea);
              Pa.Gg();
              ya.me(!0);
            },
          });
        };
        T.start_rendering = Pa.Gg;
        T.update_material = function (K, S) {
          if (!fb) return Promise.reject("MODEL_NOT_LOADED");
          var ea = -1;
          switch (typeof K) {
            case "number":
              ea = K;
              break;
            case "string":
              ea = fb.bi().findIndex(function (pa) {
                return pa.includes(K);
              });
              if (-1 === ea) return Promise.reject("PART_NOT_FOUND");
              break;
            default:
              return Promise.reject("INVALID_PART_ID");
          }
          fb.No(ea, S);
          return Promise.resolve();
        };
        T.set_model = function (K, S, ea) {
          fb &&
            ((K = b([I.da, I.va, I.Vd + "/", K])),
            fb.replace(
              K,
              function () {
                S && S(fb.el());
              },
              ea
            ));
        };
        T.set_tweaker = function (K, S) {
          function ea(pa) {
            T.hh(pa);
            S && S();
          }
          "string" === typeof K ? la(I.da + I.va + I.Fo + "/" + K, ea) : ea(K);
        };
        T.hh = function (K) {
          K &&
            (K.preOffset && (ba = K.preOffset),
            K.preScale && (wa = K.preScale),
            K.rx && (A = K.rx),
            K.beginBendZ && (G = K.beginBendZ),
            K.bendStrength && (Za = K.bendStrength),
            K.maskBranchStartEnd && (Ia = K.maskBranchStartEnd),
            T.ready && Pa.ve());
        };
        T.set_materials = function (K, S) {
          if (fb) {
            var ea = b([I.da, I.va, I.Ud + "/"]);
            K = K.map(function (pa) {
              var Ga = pa;
              "string" === typeof pa &&
                ((Ga = ea + pa), (Ga = Ga.replace(/([^:])\/\//, "$1/")));
              return Ga;
            });
            fb.wg(K, S);
          }
        };
      }
      function r() {
        ha.Wg(rc.Hl);
        Pa.Yc();
        I.$b && (Ca.reset(), xa.Ka.lh(Ba.$), xa.Ka.kh());
        T.ready = !0;
        T.ed.forEach(function (K) {
          K();
        });
        T.ed.splice(0);
      }
      function w() {
        Hb.reset();
        Ab.stop();
        Ca.ba();
        x(0);
      }
      function H(K) {
        fb && (ya.Fn(fb), fb.remove());
        ya.ik(K);
        fb = K;
      }
      function y(K) {
        Q = K;
        Ab.update({ Aa: Q });
      }
      function x(K) {
        Da = -1;
        if (Ha.isEnabled) Da = Ha.bc;
        else if (ab.isEnabled) Da = ab.bc;
        else if (X) {
          if (!g()) return;
          Da = ra === ja.X ? Hb.W() : 1;
        } else if (((Da = I.bd[0]), !g())) return;
        Ca.ba();
        if (!ab.isEnabled)
          for (var S = 0; S < Da; ++S)
            Z.set("s64"),
              ca.Df.L(0.25 * R.width, P.Wh()),
              ca.kb.h(0),
              na.Qc.h(1),
              W.l(!1, !1),
              P.ya(ca.Df),
              Ha.isEnabled && 0 === (S + 1) % Ha.Tg && C();
        Ha.isEnabled
          ? (Ha.C && Ha.C(),
            (Ha.isEnabled = !1),
            c.flush(),
            ra !== ja.ua && Ab.pg(x))
          : (ya.animate(K),
            ca.lg &&
              Math.abs(za - ma.Ci) > ma.Kj &&
              I.$b &&
              ra === ja.X &&
              (Ca.ba(), C(), Ca.aa()),
            ab.isEnabled ||
              (X &&
                (Hb.Oj(),
                (S = Hb.Th(1)),
                (sa = da(I.lk, S)),
                I.$b &&
                  ra === ja.X &&
                  ((ma.Kj = da(I.Ei, S)),
                  (ma.Xc = da(I.Tm, S)),
                  (ma.Xc = Math.min(ma.Xc, 0.5)))),
              (za = K),
              ra !== ja.ua && Ab.pg(x)));
      }
      function z() {
        za = zc.mf();
        X = !0;
      }
      function g() {
        var K = 15;
        if (!Ba.Md) {
          if (!Ba.element.videoWidth)
            return Ab.stop(), T.request_cameraVideoStream().then(w), !1;
          var S = Ba.element.currentTime;
          if (!S) return !0;
          K = S - Bc;
          0 > K && (Bc = S);
          if (1e3 * K < I.To) return !0;
        }
        Ba.$.refresh();
        Bc += K;
        Ba.wd = K;
        Ea = !0;
        Ca.ba();
        Z.set("s0");
        na.mg.L();
        na.Qc.Qk(0);
        W.l(!0, !0);
        Z.set("s62");
        ca.kb.L();
        Ba.$.h(0);
        W.l(!1, !1);
        null !== ca.Gb &&
          (Z.set("s63"), ca.$c.o(), ca.kb.h(0), ca.Gb.h(1), W.l(!1, !1));
        return !0;
      }
      function k() {
        ca.Zj = aa.instance({
          isPot: !0,
          isLinear: !0,
          isFloat: !1,
          url: I.da + I.va + I.Uo,
        });
        var K = {
          isPot: !1,
          isLinear: !0,
          isFloat: !1,
          width: R.width,
          height: R.height,
        };
        ca.kb = aa.instance(K);
        ca.$c = aa.instance(K);
        O.Lj.push(ca.kb, ca.$c);
        ca.Df = gd.instance({});
        I.Rd &&
          (sc = aa.instance({
            isPot: !1,
            isFloat: !1,
            isLinear: !0,
            url: (I.Rf || -1 !== I.Qf.indexOf("//") ? "" : I.da + I.va) + I.Qf,
          }));
      }
      function D() {
        function K() {
          return {
            width: 3,
            height: 1,
            isFloat: !0,
            isPot: !1,
            array: new Float32Array([0, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
          };
        }
        var S = {
          width: 3,
          height: 1,
          isFloat: !0,
          isPot: !1,
          array: new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
        };
        na.Qc = Cc.instance(K());
        na.mg = aa.instance(K());
        na.pc = aa.instance(K());
        na.$d = Cc.instance(K());
        na.af = aa.instance(S);
        S = {
          width: 2,
          height: 1,
          isFloat: !0,
          isPot: !1,
          array: new Float32Array([0, 0, 0, 0, 0, 0, 0, 0]),
        };
        na.Xg = aa.instance(S);
        na.xe = aa.instance(S);
        ma.ae = aa.instance({
          width: 1,
          height: 1,
          isFloat: !0,
          isPot: !1,
          array: new Float32Array([0, 0, 0, 0]),
        });
      }
      function M(K) {
        ca.lg = K;
        if (Ea) {
          Ea = !1;
          Z.set("s70");
          na.Xg.L();
          na.xe.h(2);
          var S = da(I.Sk, Hb.Th(0.5));
          Z.D("u67", S);
          na.mg.h(1);
          Z.D("u68", 1e3 * Ba.wd);
          W.l(!1, !1);
          Z.set("s71");
          na.xe.o();
          na.Xg.h(0);
          W.l(!1, !1);
        }
        K.h(0);
        na.Qc.qj(1);
        c.viewport(0, 0, 1, 1);
        Z.set("s65");
        Z.Cg("u47", Pc.get(0));
        W.l(!1, !1);
        Z.set("s66");
        c.viewport(1, 0, 2, 1);
        W.l(!1, !1);
        na.af.L();
        Z.set("s67");
        Z.O("u58", I.Ie[0] * sa, I.Ie[1]);
        na.Qc.h(0);
        na.$d.h(1);
        W.l(!1, !1);
        Z.set("s68");
        na.$d.qj(1);
        na.af.h(0);
        na.xe.h(2);
        na.Qc.h(3);
        W.l(!1, !1);
        Z.set("s69");
        na.$d.h(0);
        na.pc.o();
        W.l(!1, !1);
      }
      function C() {
        ma.Ci = za;
        ma.ae.L();
        Z.set(Y.ri ? "s73" : "s72");
        ca.lg.h(0);
        W.l(!1, !1);
        xa.Ka.Yj(Ba.$, ma.ae, ma.Xc);
      }
      function n() {
        return new Promise(function (K) {
          var S = I.da,
            ea = I.ad.split("://").shift();
          if ("http" === ea || "https" === ea) S = "";
          S += I.ad;
          "json" !== S.split(".").pop() && (S += I.neuralNetworkPath);
          la(S, function (pa) {
            pa = JSON.parse(pa);
            if (pa.exportData) {
              var Ga = pa.exportData;
              Y.ab = Y.ab || Ga.rotationEulerAnglesFactors;
              Y.Bc = Y.Bc || Ga.deformScaleXFactor;
              Y.sa = Y.sa || Ga.translationScalingFactors;
              Y.Gh = Ga.dyOffset || 0;
              Y.Eh = Ga.dsOffset || 0;
              Y.ri = Ga.isLThetaSplitCosSin || !1;
            }
            P = new bc({ Mc: pa.layers, Yd: "gpuRawAvg", Xd: M });
            K();
          });
        });
      }
      function e(K) {
        a(K);
        K = I.width;
        var S = I.height;
        L.pb[0] = 1;
        L.pb[1] = K / S;
        Pc.m({
          Zd: I.scanOverlapFactors,
          Ni: I.scanNScaleLevels,
          fa: K,
          zf: S,
          ij: I.scanScale0Factor,
          sa: Y.sa,
          qg: !0,
        });
        Ib = K > S ? [K / S, 1] : [1, S / K];
        O.Na = !0;
      }
      function v() {
        Z.j("s64", [
          { type: "1i", name: "u1", value: 0 },
          { type: "1i", name: "u41", value: 1 },
          { type: "2f", name: "u42", value: L.pb },
          { type: "1f", name: "u43", value: Y.Bc },
          { type: "1f", name: "u45", value: Y.Gh },
          { type: "1f", name: "u44", value: Y.Eh },
        ]);
        Z.j("s65", [
          { type: "1i", name: "u46", value: 0 },
          { type: "1i", name: "u41", value: 1 },
          { type: "1f", name: "u51", value: I.Do },
          { type: "1f", name: "u52", value: I.ll },
          {
            type: "3f",
            name: "u48",
            value: [Y.sa[0] * L.pb[0], Y.sa[1] * L.pb[1], Y.sa[2]],
          },
          {
            type: "3f",
            name: "u49",
            value: [I.oc[0][0], I.oc[1][0], I.oc[2][0]],
          },
          {
            type: "3f",
            name: "u50",
            value: [I.oc[0][1], I.oc[1][1], I.oc[2][1]],
          },
        ]);
        Z.j("s66", [
          { type: "1i", name: "u46", value: 0 },
          { type: "1i", name: "u41", value: 1 },
          { type: "2f", name: "u55", value: I.wn },
          { type: "3f", name: "u53", value: Y.ab },
          { type: "3f", name: "u54", value: I.Nj },
          { type: "1f", name: "u56", value: I.Il },
        ]);
        Z.j("s67", [
          { type: "1i", name: "u41", value: 0 },
          { type: "1i", name: "u57", value: 1 },
          { type: "2f", name: "u58", value: I.Ie },
          { type: "1f", name: "u59", value: I.Mn },
          { type: "1f", name: "u60", value: I.vn },
        ]);
        Z.j("s68", [
          { type: "1i", name: "u57", value: 1 },
          { type: "1i", name: "u61", value: 0 },
          { type: "1i", name: "u62", value: 2 },
          { type: "1i", name: "u63", value: 3 },
          { type: "2f", name: "u42", value: L.pb },
          { type: "1f", name: "u65", value: P.Wh() },
          { type: "2f", name: "u64", value: I.In },
        ]);
        Z.j("s69", [
          { type: "1i", name: "u41", value: 0 },
          { type: "1f", name: "u66", value: I.Pn },
        ]);
        Z.j("s70", [
          { type: "1i", name: "u46", value: 0 },
          { type: "1i", name: "u41", value: 1 },
          { type: "1i", name: "u62", value: 2 },
          { type: "3f", name: "u53", value: Y.ab },
          { type: "3f", name: "u54", value: I.Nj },
        ]);
        Z.j("s71", [
          { type: "1i", name: "u62", value: 0 },
          { type: "2f", name: "u70", value: I.Eo },
          { type: "2f", name: "u71", value: I.Nn },
        ]);
        Z.j("s72", [{ type: "1i", name: "u46", value: 0 }]);
        Z.j("s73", [{ type: "1i", name: "u46", value: 0 }]);
        Z.j("s63", [
          { type: "1i", name: "u1", value: 0 },
          { type: "1i", name: "u72", value: 1 },
        ]);
      }
      function J(K, S, ea) {
        var pa = 0 === ea,
          Ga = a(pa);
        I.width = K;
        I.height = S;
        e(pa);
        v();
        O.Lj.forEach(function (rb) {
          rb.resize(K, S);
        });
        ea = pa ? 1 : ea;
        ha.resize(Ga.width * ea, Ga.height * ea);
        Pa.Yc();
        eb.Dg(
          Ba.element.videoWidth || Ba.element.width,
          Ba.element.videoHeight || Ba.element.height
        );
        eb.Kg();
        eb.Ij();
      }
      function N() {
        Ab.stop();
        O.hb && (clearTimeout(O.hb), (O.hb = null));
        if (!O.Wb) {
          var K = O.width,
            S = O.height;
          if (I.width === K && I.height === S) w();
          else if (ra !== ja.X && ra !== ja.Ja) O.hb = setTimeout(N, I.gj);
          else {
            var ea = "undefined" === typeof Bb ? !1 : Bb.get_mode(),
              pa = ra;
            ra = ja.ua;
            O.Wb = !0;
            Ha.isEnabled = !0;
            Ha.C = function () {
              Ha.isEnabled = !1;
              O.Wb = !1;
              z();
              y(I.Aa);
              fa && clearTimeout(fa);
              fa = !1;
              ra = pa;
            };
            J(K, S, 0);
            w();
            ra === ja.Ja && ((ra = ja.X), T.switch_viewer3D(!0, !1));
            ea && Bb.switch_mode(ea);
          }
        }
      }
      var A,
        G,
        L = { pb: [-1, -1] },
        q = null,
        t = [0.5, 0, 0, 0.5],
        R = { width: -1, height: -1 },
        O = { width: -1, height: -1, hb: null, Wb: !1, Na: !1, Lj: [] },
        ia = [0, I.be[1], I.be[2]],
        Y = {
          ab: [-I.ab[0], -I.ab[1], I.ab[2]],
          Bc: I.Bc,
          sa: I.sa,
          Gh: 0,
          Eh: 0,
          ri: !1,
        },
        Q = I.Aa,
        fa = null,
        P = null;
      a(!0);
      var E = [0, 0, 0],
        B = 1,
        U = 0,
        ca = { kb: null, $c: null, Df: null, Zj: null, lg: null, Gb: null },
        na = { mg: null, pc: null, $d: null, af: null, Xg: null, xe: null },
        za = 0,
        Ea = !1,
        ma = {
          Ia: null,
          Eb: null,
          Xf: null,
          Ci: 0,
          Kj: I.Ei[1],
          Xc: 0.1,
          ae: null,
        },
        ua = !1,
        Ma = !1,
        X = !0,
        sa = 1,
        Da = -1,
        ja = { ua: -1, X: 0, Ja: 1, mc: 2, nc: 3 },
        ra = ja.X,
        hb = null,
        Wa = ja.X,
        Xa = !1,
        Ha = { isEnabled: !1, bc: 1, Tg: 3, C: null },
        ab = { isEnabled: !1, Pa: null, bc: 0 },
        sc = null,
        Ib = -1,
        Jb = !1,
        Pb = !1,
        hc = !1,
        Qb = [0, 0, 0],
        Wb = 1,
        ic,
        Ta,
        jc,
        ba = [0, 0, 0],
        wa = 1,
        Za = (G = A = 0),
        Ia = I.Nc,
        wb = [0, 0, 0],
        ib = { scale: 1, offsetX: 0, offsetY: 0 },
        Bc = 0,
        Pa = {
          m: function () {
            Z.uc([
              {
                id: "s62",
                name: "_",
                v: "attribute vec2 a0;uniform mat2 u40;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=vec2(.5)+u40*a0;}",
                J: ["a0"],
                S: [2],
                g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                i: ["u1", "u40"],
                precision: "lowp",
              },
              {
                id: "s64",
                name: "_",
                g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                v: "attribute vec2 a0;uniform sampler2D u41;uniform vec2 u42;uniform float u43,u44,u45;const vec2 h=vec2(.16,.5),i=vec2(.5,.5),j=vec2(.84,.5),q=vec2(.5,.5);varying vec2 vv0;void main(){vec4 b=texture2D(u41,h);vec2 c=b.gb,a=b.a*u42;vec4 l=texture2D(u41,i);float m=l.y;vec2 n=vec2(mix(1.,1./cos(m),u43),1.);a*=n,a*=1.+u44;vec2 o=a0*.5;float d=texture2D(u41,j).r,e=cos(d),f=sin(d);mat2 g=mat2(e,f,-f,e);vec2 p=g*o;c+=vec2(-.5,-.5)*a*(g*vec2(0.,u45)),vv0=c+p*a,gl_Position=vec4(a0,0.,1.);}",
                J: ["a0"],
                S: [2],
                i: "u1 u41 u42 u43 u44 u45".split(" "),
                precision: "lowp",
              },
              {
                id: "s65",
                name: "_",
                v: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                g: "uniform sampler2D u46,u41;uniform vec3 u47,u48,u49,u50;uniform float u51,u52;const vec4 e=vec4(.25,.25,.25,.25);const vec2 f=vec2(.16,.5),g=vec2(.5,.5),h=vec2(.83,.5);const vec3 i=vec3(1.,1.,1.);void main(){vec4 j=texture2D(u46,vec2(.625,.625)),k=texture2D(u46,vec2(.875,.625));float l=dot(j-k,e);bool m=l>u52;vec4 a=texture2D(u41,f);m?a.r=2.:a.r>u51?a.r=0.:a.r>1.9?a.r+=1.:0.;if(a.r<.9)a=vec4(1.,u47);else{float n=dot(e,texture2D(u46,vec2(.875,.875))),o=dot(e,texture2D(u46,vec2(.125,.625))),p=dot(e,texture2D(u46,vec2(.375,.625))),b=texture2D(u41,h).r,c=cos(b),d=sin(b);vec2 q=mat2(c,d,-d,c)*vec2(n,o);float r=texture2D(u41,g).a;vec3 s=mix(u49,u50,r*i);a.r*=step(1.9,a.r),a.gba+=vec3(q,p)*u48*s*a.a;}gl_FragColor=a;}",
                i: "u46 u41 u47 u51 u48 u52 u49 u50".split(" "),
              },
              {
                id: "s66",
                name: "_",
                g: "uniform sampler2D u46,u41;uniform vec3 u53,u54;uniform vec2 u55;uniform float u56;const vec4 v=vec4(1.),f=vec4(0.),e=vec4(.25);const vec2 g=vec2(.16,.5),h=vec2(.5,.5),i=vec2(.84,.5);varying vec2 vv0;void main(){float k=step(vv0.x,.5);vec4 l=texture2D(u41,g);if(l.r<1.9){gl_FragColor=f;return;}float m=dot(texture2D(u46,vec2(.125,.125)),e),a=smoothstep(u55.x,u55.y,m);vec4 n=texture2D(u41,h);float o=n.a;a=mix(a,o,.3);float p=dot(e,texture2D(u46,vec2(.125,.875))),q=dot(e,texture2D(u46,vec2(.375,.875))),r=dot(e,texture2D(u46,vec2(.625,.875)));vec3 s=vec3(p,q,r),b=u54+s*u53;float c=texture2D(u41,i).r,d=b.z*u56;c+=d,b.z-=d;vec4 t=vec4(b,a),u=vec4(c,0.,0.,0.);gl_FragColor=mix(u,t,k);}",
                i: "u46 u41 u55 u53 u54 u56".split(" "),
              },
              {
                id: "s67",
                name: "_",
                g: "uniform sampler2D u41,u57;uniform vec2 u58;uniform float u59,u60;const vec4 f=vec4(1.),h=vec4(1.,0.,0.,0.),i=vec4(0.,0.,0.,1.),j=vec4(0.,0.,0.,0.);const vec2 g=vec2(.5,.5);varying vec2 vv0;void main(){vec4 k=texture2D(u41,vv0),l=texture2D(u57,vv0),q=texture2D(u41,g),m=texture2D(u57,g);float n=pow(m.a,u60),o=mix(u58.y,u58.x,n),b=step(.66,vv0.x),c=step(.34,vv0.x)*(1.-b);vec4 a=mix(h,i,c);a=mix(a,j,b);vec4 d=max(o*f,a);d*=mix(f,u59*vec4(1.,1.,1.,0.)+vec4(0.,0.,0.,1.),c);vec4 p=k-l;gl_FragColor=p*d;}",
                i: ["u41", "u57", "u58", "u59", "u60"],
                precision: "highp",
              },
              {
                id: "s68",
                name: "_",
                g: "uniform sampler2D u57,u61,u62,u63;uniform vec2 u42,u64;uniform float u65;const vec4 w=vec4(0.),x=vec4(1.);const vec2 j=vec2(.25,.5),k=vec2(.75,.5),g=vec2(.16,.5),l=vec2(.5,.5);varying vec2 vv0;bool f(float a){return (a<0.||0.<a||a==0.)&&a+1.!=a?false:true;}void main(){float y=step(vv0.x,.33),m=step(.33,vv0.x)*step(vv0.x,.66),z=step(.66,vv0.x);vec4 n=texture2D(u63,l);float b=n.a;b*=texture2D(u62,j).a,b*=texture2D(u62,k).a;vec4 o=texture2D(u57,vv0),p=texture2D(u61,vv0),c=o+p;c.a=mix(c.a,b,m);vec4 e=texture2D(u57,g),q=texture2D(u63,g);vec2 r=e.gb,s=q.gb;float t=e.a;vec2 h=u65*abs(r-s)/(u42*t);float u=max(h.x,h.y),v=smoothstep(u64.x,u64.y,u);vec4 i=texture2D(u63,vv0),a=mix(c,i,v);if(f(a.x)||f(a.y)||f(a.z)||f(a.w)){gl_FragColor=i;return;}gl_FragColor=a;}",
                i: "u57 u61 u62 u63 u42 u65 u64".split(" "),
                precision: "highp",
              },
              {
                id: "s69",
                name: "_",
                g: "uniform sampler2D u41;uniform float u66;const vec4 g=vec4(1.);const vec2 f=vec2(.5,.5);varying vec2 vv0;void main(){vec4 a=texture2D(u41,vv0);float b=step(vv0.x,.33),c=texture2D(u41,f).g;a.a+=b*a.a*u66*abs(sin(c)),gl_FragColor=a;}",
                i: ["u41", "u66"],
                precision: "highp",
              },
              {
                id: "s70",
                name: "_",
                g: "uniform sampler2D u41,u62,u46;uniform vec3 u53,u54;uniform float u67,u68;const vec4 e=vec4(.25);const vec3 g=vec3(1.);const vec2 h=vec2(.5,.5);const vec3 i=vec3(1.,1.,4.);varying vec2 vv0;void main(){vec4 c=texture2D(u41,h);float d=step(vv0.x,.5),a=1.-d;vec4 j=texture2D(u62,vv0);float t=c.a;vec2 k=mix(vec2(.875,.875),vec2(.125,.875),a),l=mix(vec2(.125,.625),vec2(.375,.875),a),m=mix(vec2(.375,.625),vec2(.625,.875),a);float n=dot(e,texture2D(u46,k)),o=dot(e,texture2D(u46,l)),p=dot(e,texture2D(u46,m));vec3 q=mix(i,u53,a),b=q*vec3(n,o,p),r=c.rgb;b=mix(b,u54+b-r,a)/u68;vec4 s=mix(vec4(b,0.),j,vec4(u67*g,0.));gl_FragColor=s;}",
                i: "u41 u62 u46 u67 u68 u53 u54".split(" "),
                precision: "highp",
              },
              {
                id: "s71",
                name: "_",
                g: "uniform sampler2D u62;uniform vec2 u70,u71;const vec4 h=vec4(.25,.25,.25,.25);varying vec2 vv0;void main(){float a=step(.5,vv0.x),c=mix(u70.x,u71.x,a),d=mix(u70.y,u71.y,a);vec3 b=texture2D(u62,vv0).rgb;float f=length(b),g=1.-smoothstep(c,d,f);gl_FragColor=vec4(b,g);}",
                i: ["u62", "u70", "u71"],
                precision: "highp",
              },
              {
                id: "s72",
                name: "_",
                v: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                g: "uniform sampler2D u46;const vec4 e=vec4(.25);const float f=3.1415;void main(){float a=dot(texture2D(u46,vec2(.375,.375)),e),b=dot(texture2D(u46,vec2(.625,.375)),e),c=f/2.*dot(texture2D(u46,vec2(.875,.375)),e),d=.75*f*dot(texture2D(u46,vec2(.125,.375)),e);gl_FragColor=vec4(d,a,b,c);}",
                i: ["u46"],
              },
              {
                id: "s73",
                name: "_",
                v: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                g: "uniform sampler2D u46;const vec4 e=vec4(.25);const float f=3.1415,g=1e-7;void main(){float b=dot(texture2D(u46,vec2(.875,.375)),e),c=dot(texture2D(u46,vec2(.375,.125)),e),d=f/2.*dot(texture2D(u46,vec2(.625,.375)),e),a=dot(texture2D(u46,vec2(.125,.375)),e),h=dot(texture2D(u46,vec2(.375,.375)),e);a+=(step(0.,a)-.5)*g;float i=atan(h,a);gl_FragColor=vec4(i,b,c,d);}",
                i: ["u46"],
              },
              {
                id: "s63",
                name: "_",
                g: "uniform sampler2D u1,u72;varying vec2 vv0;vec4 i(vec4 a,sampler2D g){mediump float b=a.b*63.;mediump vec2 c;c.y=floor(floor(b)/8.),c.x=floor(b)-c.y*8.;mediump vec2 d;d.y=floor(ceil(b)/8.),d.x=ceil(b)-d.y*8.;highp vec2 e;e.x=c.x*.125+9.765625e-4+.123047*a.r,e.y=c.y*.125+9.765625e-4+.123047*a.g;highp vec2 f;f.x=d.x*.125+9.765625e-4+.123047*a.r,f.y=d.y*.125+9.765625e-4+.123047*a.g;lowp vec4 j=texture2D(g,e),k=texture2D(g,f),l=mix(j,k,fract(b));return l;}void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=i(a,u72);}",
                i: ["u1", "u72"],
              },
            ]);
            D();
            Ab.m({ pi: !1, Aa: Q });
            Hb.m({ ag: 0, n: I.bd[1] - I.bd[0] + 1, Di: I.bd[0] });
            T.set_videoRotation = function (K) {
              bb.rotate = K;
              T.ready &&
                (eb.Dg(Ba.element.videoWidth, Ba.element.videoHeight), eb.Kg());
            };
            T.set_viewRotation = function () {};
            T.set_LUT = function (K) {
              return new Promise(function (S) {
                K
                  ? aa.instance({
                      url: K,
                      isFloat: !1,
                      isFlipY: !1,
                      C: function (ea) {
                        ca.Gb = ea;
                        Pa.Yc();
                        S();
                      },
                    })
                  : ((ca.Gb = null), Pa.Yc(), S());
              });
            };
            T.resize = function (K, S, ea, pa) {
              T.ready &&
                (O.hb && (clearTimeout(O.hb), (O.hb = null)),
                Ab.stop(),
                (ea = ea ? rc.gf : 1),
                (O.width = K * ea),
                (O.height = S * ea),
                (O.hb = setTimeout(N, pa ? 0 : I.gj)));
            };
            return n();
          },
          Jl: J,
          Ao: function () {
            k();
            e(!0);
            v();
            Pa.Ij();
            m();
            T.dd.forEach(function (K) {
              K();
            });
            T.dd.splice(0);
            V.model && !T.isBusy ? Pa.Fi(V.model) : I.Kc || r();
            return Promise.resolve();
          },
          bm: function () {
            return R;
          },
          A: function () {
            Ab.A();
            return new Promise(function (K) {
              T.switch_sleep(!0, !0)
                .finally(function () {
                  P && P.A();
                  ha.A();
                  lb.A();
                  c && (c = null);
                  P = null;
                  I.Rf = !1;
                  fb = null;
                  X = !0;
                  sa = 1;
                  Da = -1;
                  ra = ja.X;
                  hb = null;
                  Wa = ja.X;
                  Object.assign(Ba, Qc);
                  Object.assign(I, Rc);
                  K();
                })
                .catch(function (S) {
                  throw Error(S);
                });
            });
          },
          Yc: function () {
            ya.oj(na.pc, null === ca.Gb ? ca.kb : ca.$c, ma.ae, ca.Zj);
          },
          $l: function () {
            return ib;
          },
          wj: function (K) {
            ib = K;
          },
          te: function () {
            wb[0] = E[0] - ib.offsetX;
            wb[1] = E[1] + ib.offsetY;
            wb[2] = E[2];
            ya.Vn(ia, ba, wb);
          },
          ue: function () {
            ya.Wn(B * I.rn, wa, ib.scale);
          },
          Vj: function () {
            ya.Xn(U + A);
          },
          Ko: function () {
            ya.Tn(I.jd + G, I.Mb + Za);
          },
          Mo: function () {
            ya.Un(Ia);
          },
          ve: function () {
            Pa.te();
            Pa.ue();
            Pa.Vj();
            Pa.Ko();
            Pa.Mo();
          },
          On: function () {
            Ab.stop();
            hb && (clearInterval(hb), (hb = null));
            ab.isEnabled = !0;
            ab.bc = 0;
            Jb = ya.Zl();
            Pb = fb.ai();
            hc = fb.Zh();
            Wb = wa;
            Qb = ba;
            ic = Ia;
            Ta = G;
            jc = Za;
            Ha.isEnabled = !1;
            ya.le(!1);
          },
          Ln: function (K) {
            function S() {
              2 === ++ea &&
                ((ab.isEnabled = !1),
                (wa = Wb),
                (ba = Qb),
                (Ia = ic),
                (G = Ta),
                (Za = jc),
                Pa.ve(),
                ya.qa(Jb),
                w(),
                K && K());
            }
            var ea = 0;
            ra === ja.mc ? (ra = ja.Ja) : ra === ja.nc && (ra = ja.X);
            ya.cb(ra === ja.X ? 0 : 1);
            fb.replace(Pb, S);
            fb.wg(hc, S);
            Pa.Yc();
            ya.le(!0);
          },
          Ij: function () {
            var K = Math.tan(Ba.Rb / 2);
            ya.nj({
              jf: I.jf / K,
              Qn: K,
              un: Ba.Yi,
              Ga: I.Ga,
              Zf: I.Zf,
              $f: I.$f,
              bk: L.pb,
              fk: I.Xo,
              Fc: I.Fc,
              yf: I.yf,
              wf: I.wf,
              xf: I.xf,
              Nc: Ia,
              Je: I.Je,
              We: I.We,
              og: I.og,
              jc: I.jc,
              uo: I.Cj,
              vo: I.Dj,
              ke: I.ke,
              kc: I.kc,
              qd: I.qd,
              Ze: I.Ze,
              Ye: I.Ye,
              Xe: I.Xe,
              Me: I.Me,
              Le: I.da + I.va + I.Le,
              jd: I.jd + G,
              Mb: I.Mb + Za,
              uf: I.uf,
              bh: I.bh,
              ah: I.ah,
              Ae: I.Ae,
              cp: I.bp,
              ze: Ba.ze,
              Rd: I.Rd,
              Vm: sc,
              Qd: I.Qd,
              Sd: I.Sd,
              Pf: I.Pf,
              Um: Ib,
              Lg: I.Lg,
            });
          },
          bl: function () {
            var K = bb.De,
              S = bb.Ce,
              ea = 1 / Math.tan(Ba.Rb / 2),
              pa = lb.Z() / lb.P();
            Ba.Yi = [
              ea,
              0,
              0,
              0,
              0,
              ea / pa,
              0,
              0,
              0,
              0,
              -(S + K) / (S - K),
              -1,
              0,
              0,
              (-2 * K * S) / (S - K),
              0,
            ];
            Ba.ze = 1 / Math.tan((I.$o * Math.PI) / 360) / ea;
          },
          Dg: function (K, S) {
            q = [0.5, 0.5];
            K = S / K;
            S = lb.Z() / lb.P();
            90 === Math.abs(bb.rotate) && (K = 1 / K);
            K > S ? (q[1] *= S / K) : (q[0] *= K / S);
            t[0] = 0;
            t[1] = 0;
            t[2] = 0;
            t[3] = 0;
            switch (bb.rotate) {
              case 0:
                t[0] = q[0];
                t[3] = q[1];
                break;
              case 180:
                t[0] = -q[0];
                t[3] = -q[1];
                break;
              case 90:
                t[1] = q[0];
                t[2] = -q[1];
                break;
              case -90:
                (t[1] = -q[0]), (t[2] = q[1]);
            }
            I.ti || ((t[0] *= -1), (t[1] *= -1));
            S = bb.FOVforced;
            Ba.Rb =
              2 *
              Math.atan(
                2 *
                  q[0] *
                  Math.tan(
                    ((S ? S : 1 < K ? bb.FOVmobile : bb.FOVdesktop) * Math.PI) /
                      180 /
                      2
                  )
              );
            Pa.bl();
          },
          Kg: function () {
            Z.j("s62", [
              { type: "1i", name: "u1", value: 0 },
              { type: "mat2", name: "u40", value: t },
            ]);
          },
          Cf: function (K, S) {
            return Ma
              ? Promise.resolve()
              : new Promise(function (ea, pa) {
                  Pa.sm(K, S);
                  Promise.all([Pa.m(), Pa.tm()])
                    .then(function () {
                      Pa.ji();
                      Ma = !0;
                      ea();
                    })
                    .catch(function (Ga) {
                      T.ob && T.ob("GL_INCOMPATIBLE", "Cannot init JEELIZVTO");
                      pa(Ga);
                    });
                });
          },
          sm: function (K, S) {
            T.Ib = document.createElement("canvas");
            T.Hb = document.createElement("canvas");
            T.Hb.width = I.width;
            T.Hb.height = I.height;
            T.gk = T.Hb.getContext("2d");
            T.replace_video = function (ea) {
              Ba.element = ea;
              Ba.Rg.la = Ba.element;
              return !0;
            };
            T.tc = T.Ib.getContext("2d");
            T.capture_background = function (ea, pa) {
              ea = "undefined" === typeof ea ? K : ea;
              pa = "undefined" === typeof pa ? S : pa;
              T.Ib.width = ea;
              T.Ib.height = pa;
              var Ga = ea / pa,
                rb = 0,
                mb = 0;
              if (K / S > Ga) {
                var Mb = S * Ga;
                Ga = S;
                rb = Math.round((K - Mb) / 2);
              } else (Mb = K), (Ga = K / Ga), (mb = Math.round((S - Ga) / 2));
              T.tc.save();
              T.tc.translate(ea, 0);
              T.tc.scale(-1, 1);
              T.tc.drawImage(Ba.element, rb, mb, Mb, Ga, 0, 0, ea, pa);
              T.tc.restore();
              ea = document.createElement("canvas");
              ea.width = T.Ib.width;
              ea.height = T.Ib.height;
              ea.getContext("2d").drawImage(T.Ib, 0, 0);
              return ea;
            };
          },
          ji: function () {
            window.CanvasListeners &&
              (Bb.init({ ra: lb.tb() }),
              (T.init_listeners = Pa.ji),
              (T.add_listener = Bb.add_listener),
              (T.remove_listener = Bb.remove_listener),
              (T.animate_swipe = Bb.animate_swipe),
              (T.switch_modeInteractor = Bb.switch_mode),
              (T.get_modeInteractor = Bb.get_mode),
              Bb.add_listener(
                "move",
                function (K, S) {
                  ra === ja.X &&
                    (I.Wm &&
                      ((ib.offsetX -= S[0] * I.Hi),
                      (ib.offsetX = Math.min(
                        Math.max(ib.offsetX, -I.Td),
                        I.Td
                      ))),
                    (ib.offsetY -= S[1] * I.Hi),
                    (ib.offsetY = Math.min(Math.max(ib.offsetY, -I.Td), I.Td)),
                    Pa.te());
                },
                !0
              ).add_listener(
                "pinch",
                function (K, S) {
                  ra === ja.X &&
                    ((ib.scale += S * I.Xm),
                    (ib.scale = Math.min(Math.max(ib.scale, I.Ii[0]), I.Ii[1])),
                    Pa.ue());
                },
                !0
              ));
          },
          tm: function () {
            return new Promise(function (K, S) {
              ha.m({
                Kd: !1,
                $k: !1,
                expand: !1,
                ra: lb.tb(),
                Sb: lb,
                onload: function () {
                  ma.Eb = gc.instance({
                    Lb: I.da + I.va + cb.Vo,
                    wc: I.da + I.va + cb.Wo,
                    vc: cb.$j,
                    xc: cb.ak,
                  });
                  I.$b
                    ? ((ma.Ia = gc.instance({})), xa.Ka.qa(ma.Ia))
                    : (ma.Ia = ma.Eb);
                  ya.qa(ma.Ia);
                  ma.Xf = I.$b ? hd.instance({ Sm: ma.Ia, Qm: ma.Eb }) : ma.Eb;
                  K();
                },
              }) || S("CANNOT_INIT_JE3D");
            });
          },
          Gg: function () {
            ua || ((ua = !0), Pa.ve(), r(), (za = 0), I.Kc && w());
          },
          Fi: function (K, S) {
            K = Ac.instance({
              Ne: function () {
                Pa.Gg();
                S && S();
              },
              url: K.url,
              Pc: K.Pc,
              Kb: K.Kb,
              Jb: K.Jb,
            });
            H(K);
          },
          Jj: function () {
            if (I.$b) {
              var K = Object.assign({}, cb, { Ab: b([I.da, I.va, cb.Ab]) });
              xa.Ka.ib(K);
            }
          },
        };
      return Pa;
    }
    function Sc() {
      return new Promise(function (a, b) {
        T.Fe && T.Fe();
        Ba.Md = !1;
        var d = {
            width: { min: bb.minWidth, max: bb.maxWidth, ideal: bb.idealWidth },
            height: {
              min: bb.minHeight,
              max: bb.maxHeight,
              ideal: bb.idealHeight,
            },
            facingMode: { ideal: "user" },
          },
          f = { video: d, audio: !1 };
        Ba.th = f;
        d && -1 !== Ba.deviceId && ec(f, Ba.deviceId);
        Lc(
          navigator.mediaDevices && navigator.mediaDevices.getUserMedia
            ? document.createElement("video")
            : !1,
          function (l) {
            T.Ge && T.Ge(l);
            Tc(l).then(a).catch(b);
          },
          function (l) {
            T.ob && T.ob("WEBCAM_UNAVAILABLE", l);
            b(l);
          },
          f
        );
      });
    }
    function Tc(a) {
      Ba.element = a;
      a = Ba.element.videoWidth || Ba.element.width;
      var b = Ba.element.videoHeight || Ba.element.height;
      Ba.Rg = { la: Ba.element, isPot: !1, isFloat: !1, isFlipY: !0 };
      Ba.$ = aa.instance(Ba.Rg);
      eb.Dg(a, b);
      return eb
        .Cf(a, b)
        .then(function () {
          eb.Kg();
          return eb.Ao();
        })
        .catch(function (d) {
          return Promise.reject(d);
        });
    }
    function id() {
      var a = document.createElement("canvas");
      a.width = I.width;
      a.height = I.height;
      Ba.Hh = a.getContext("2d");
      Ba.Md = !0;
      return Tc(a);
    }
    function Xb(a) {
      return 3 === arguments.length ? this.rb(arguments) : this.set(a);
    }
    function Uc(a, b) {
      b = Math.floor(b);
      a.r = ((b >> 16) & 255) / 255;
      a.Y = ((b >> 8) & 255) / 255;
      a.b = (b & 255) / 255;
    }
    function jd(a, b) {
      function d(h) {
        void 0 !== h &&
          1 > parseFloat(h) &&
          console.warn(
            "JETHREE.Color: Alpha component of " + b + " will be ignored."
          );
      }
      var f;
      if ((f = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(b))) {
        var l = f[2];
        switch (f[1]) {
          case "rgb":
          case "rgba":
            if (
              (f =
                /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(
                  l
                ))
            ) {
              a.r = Math.min(255, parseInt(f[1], 10)) / 255;
              a.Y = Math.min(255, parseInt(f[2], 10)) / 255;
              a.b = Math.min(255, parseInt(f[3], 10)) / 255;
              d(f[5]);
              return;
            }
            if (
              (f =
                /^(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(
                  l
                ))
            ) {
              a.r = Math.min(100, parseInt(f[1], 10)) / 100;
              a.Y = Math.min(100, parseInt(f[2], 10)) / 100;
              a.b = Math.min(100, parseInt(f[3], 10)) / 100;
              d(f[5]);
              return;
            }
            break;
          case "hsl":
          case "hsla":
            if (
              (f =
                /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(
                  l
                ))
            ) {
              l = parseFloat(f[1]) / 360;
              var p = parseInt(f[2], 10) / 100,
                u = parseInt(f[3], 10) / 100;
              d(f[5]);
              a.Sn(l, p, u);
              return;
            }
        }
      } else if ((f = /^#([A-Fa-f0-9]+)$/.exec(b))) {
        f = f[1];
        l = f.length;
        if (3 === l) {
          a.r = parseInt(f.charAt(0) + f.charAt(0), 16) / 255;
          a.Y = parseInt(f.charAt(1) + f.charAt(1), 16) / 255;
          a.b = parseInt(f.charAt(2) + f.charAt(2), 16) / 255;
          return;
        }
        if (6 === l) {
          a.r = parseInt(f.charAt(0) + f.charAt(1), 16) / 255;
          a.Y = parseInt(f.charAt(2) + f.charAt(3), 16) / 255;
          a.b = parseInt(f.charAt(4) + f.charAt(5), 16) / 255;
          return;
        }
      }
      b &&
        0 < b.length &&
        ((f = kd[b]),
        void 0 !== f
          ? Uc(a, f)
          : console.warn("JETHREE.Color: Unknown color " + b));
    }
    function tc(a, b, d, f) {
      this.F = a || 0;
      this.G = b || 0;
      this.H = d || 0;
      this.T = void 0 !== f ? f : 1;
    }
    function Vc(a, b, d) {
      var f = b.F,
        l = b.G,
        p = b.H;
      b = b.T;
      var u = d.F,
        h = d.G,
        m = d.H;
      d = d.T;
      a.F = f * d + b * u + l * m - p * h;
      a.G = l * d + b * h + p * u - f * m;
      a.H = p * d + b * m + f * h - l * u;
      a.T = b * d - f * u - l * h - p * m;
      return a;
    }
    function Yb(a, b) {
      this.x = a || 0;
      this.y = b || 0;
    }
    function Ua(a, b, d) {
      this.x = a || 0;
      this.y = b || 0;
      this.z = d || 0;
    }
    function Wc(a, b) {
      var d = a.x,
        f = a.y,
        l = a.z;
      a.x = f * b.z - l * b.y;
      a.y = l * b.x - d * b.z;
      a.z = d * b.y - f * b.x;
    }
    function Zb(a, b, d, f) {
      this.F = a || 0;
      this.G = b || 0;
      this.H = d || 0;
      this.Sa = f || Zb.ck;
    }
    function Dc(a, b) {
      this.min = void 0 !== a ? a : new Ua(Infinity, Infinity, Infinity);
      this.max = void 0 !== b ? b : new Ua(-Infinity, -Infinity, -Infinity);
    }
    function uc(a) {
      return new Ua().fd(a.min, a.max).Ea(0.5);
    }
    function ld(a, b) {
      a.min.min(b);
      a.max.max(b);
    }
    function $b() {
      this.elements = new Float32Array([
        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
      ]);
      0 < arguments.length &&
        console.error(
          "JETHREE.Matrix4: the constructor no longer reads arguments. use .set() instead."
        );
    }
    function Xc(a, b, d) {
      var f = b.elements,
        l = d.elements;
      d = a.elements;
      b = f[0];
      var p = f[4],
        u = f[8],
        h = f[12],
        m = f[1],
        r = f[5],
        w = f[9],
        H = f[13],
        y = f[2],
        x = f[6],
        z = f[10],
        g = f[14],
        k = f[3],
        D = f[7],
        M = f[11];
      f = f[15];
      var C = l[0],
        n = l[4],
        e = l[8],
        v = l[12],
        J = l[1],
        N = l[5],
        A = l[9],
        G = l[13],
        L = l[2],
        q = l[6],
        t = l[10],
        R = l[14],
        O = l[3],
        ia = l[7],
        Y = l[11];
      l = l[15];
      d[0] = b * C + p * J + u * L + h * O;
      d[4] = b * n + p * N + u * q + h * ia;
      d[8] = b * e + p * A + u * t + h * Y;
      d[12] = b * v + p * G + u * R + h * l;
      d[1] = m * C + r * J + w * L + H * O;
      d[5] = m * n + r * N + w * q + H * ia;
      d[9] = m * e + r * A + w * t + H * Y;
      d[13] = m * v + r * G + w * R + H * l;
      d[2] = y * C + x * J + z * L + g * O;
      d[6] = y * n + x * N + z * q + g * ia;
      d[10] = y * e + x * A + z * t + g * Y;
      d[14] = y * v + x * G + z * R + g * l;
      d[3] = k * C + D * J + M * L + f * O;
      d[7] = k * n + D * N + M * q + f * ia;
      d[11] = k * e + D * A + M * t + f * Y;
      d[15] = k * v + D * G + M * R + f * l;
      return a;
    }
    function Ec(a, b, d, f, l, p) {
      this.a = a;
      this.b = b;
      this.c = d;
      this.Fa = f instanceof Ua ? f : new Ua();
      this.ye = Array.isArray(f) ? f : [];
      this.color = l instanceof Xb ? l : new Xb();
      this.Zg = Array.isArray(l) ? l : [];
      this.ac = void 0 !== p ? p : 0;
    }
    function md(a, b, d) {
      var f = new XMLHttpRequest();
      f.open("GET", a, !0);
      var l = (f.withCredentials = !1);
      f.onreadystatechange = function () {
        404 !== f.status || l || ((l = !0), d && d(404));
        if (4 === f.readyState && 200 === f.status) {
          var p = null;
          try {
            p = JSON.parse(f.responseText);
          } catch (u) {
            d && d(-1);
          }
          b && p && b(p);
        }
      };
      f.onerror = function () {
        d && d(0);
      };
      f.send();
    }
    function Fc(a, b, d) {
      "object" === typeof a ? b(a) : md(a, b, d);
    }
    function nd(a) {
      return new Promise(function (b, d) {
        Fc(a, b, d);
      });
    }
    function od(a, b) {
      for (var d = new Ua(), f = new Ua(), l = 0, p = b.length; l < p; l++) {
        var u = b[l],
          h = a[u.a],
          m = a[u.b],
          r = a[u.c];
        h &&
          m &&
          r &&
          (d.gb(r, m),
          f.gb(h, m),
          Wc(d, f),
          0 !== d.Kf() && (d.normalize(), u.Fa.N(d)));
      }
    }
    function pd(a, b) {
      for (var d = Array(a.length), f = 0, l = a.length; f < l; ++f)
        d[f] = new Ua();
      f = new Ua();
      l = new Ua();
      for (var p = 0, u = b.length; p < u; ++p) {
        var h = b[p],
          m = a[h.a],
          r = a[h.b],
          w = a[h.c];
        m &&
          r &&
          w &&
          (f.gb(w, r),
          l.gb(m, r),
          Wc(f, l),
          d[h.a].add(f),
          d[h.b].add(f),
          d[h.c].add(f));
      }
      f = 0;
      for (a = a.length; f < a; ++f) d[f].normalize();
      a = 0;
      for (f = b.length; a < f; ++a)
        (h = b[a]),
          (l = h.ye),
          (p = d[h.a]),
          (u = d[h.b]),
          (h = d[h.c]),
          p &&
            u &&
            h &&
            (3 === l.length
              ? (l[0].N(p), l[1].N(u), l[2].N(h))
              : ((l[0] = p.clone()), (l[1] = u.clone()), (l[2] = h.clone())));
      return d;
    }
    function qd(a, b, d, f) {
      function l(v) {
        n.N(b[v]);
        e.N(n);
        var J = h[v];
        M.N(J);
        M.sub(n.Ea(n.sd(J))).normalize();
        var N = e.x,
          A = e.y,
          G = e.z,
          L = J.x,
          q = J.y;
        J = J.z;
        C.x = A * J - G * q;
        C.y = G * L - N * J;
        C.z = N * q - A * L;
        N = 0 > C.sd(m[v]) ? -1 : 1;
        u[4 * v] = M.x;
        u[4 * v + 1] = M.y;
        u[4 * v + 2] = M.z;
        u[4 * v + 3] = N;
      }
      for (
        var p = a.length,
          u = new Float32Array(4 * p),
          h = Array(p),
          m = Array(p),
          r = 0;
        r < p;
        r++
      )
        (h[r] = new Ua()), (m[r] = new Ua());
      var w = new Ua(),
        H = new Ua(),
        y = new Ua(),
        x = new Yb(),
        z = new Yb(),
        g = new Yb(),
        k = new Ua(),
        D = new Ua();
      f.forEach(function (v) {
        var J = v.a,
          N = v.b;
        v = v.c;
        w.N(a[J]);
        H.N(a[N]);
        y.N(a[v]);
        x.N(d[J]);
        z.N(d[N]);
        g.N(d[v]);
        var A = H.x - w.x,
          G = y.x - w.x,
          L = H.y - w.y,
          q = y.y - w.y,
          t = H.z - w.z,
          R = y.z - w.z,
          O = z.x - x.x,
          ia = g.x - x.x,
          Y = z.y - x.y,
          Q = g.y - x.y,
          fa = 1 / (O * Q - ia * Y);
        k.set((Q * A - Y * G) * fa, (Q * L - Y * q) * fa, (Q * t - Y * R) * fa);
        D.set(
          (O * G - ia * A) * fa,
          (O * q - ia * L) * fa,
          (O * R - ia * t) * fa
        );
        h[J].add(k);
        h[N].add(k);
        h[v].add(k);
        m[J].add(D);
        m[N].add(D);
        m[v].add(D);
      });
      var M = new Ua(),
        C = new Ua(),
        n = new Ua(),
        e = new Ua();
      f.forEach(function (v) {
        l(v.a);
        l(v.b);
        l(v.c);
      });
      return u;
    }
    function Yc(a, b, d, f) {
      return Math.sqrt((a - d) * (a - d) + (b - f) * (b - f));
    }
    var V = {
        wh: !0,
        Dp: !1,
        Ep: !1,
        kl: !1,
        vh: !1,
        Cp: !1,
        Qa: !1,
        Kd: !1,
        nq: !1,
        da: "",
        Ki: "",
        Ik: 700,
        Hk: 200,
        xh: !1,
        Po: !1,
        Qo: !1,
        Oo: !1,
        pk: 3,
        Ob: !1,
        ih: !0,
        Lb: "images/backgrounds/interior2.jpg",
        wc: "images/backgrounds/interior_light.jpg",
        Kk: [256, 256, 512, 512],
        vc: 2.1,
        xc: 8,
        Jk: [64, 128, 256, 256],
        zm: [60, 96, 160, 250],
        ym: [8, 12, 18, 40],
        Rc: 2.2,
        ig: 1,
        Oe: 300,
        mh: 500,
        Pe: 50,
        Uk: 0,
        Vk: 0,
        rp: 45,
        tp: 1,
        sp: 1e3,
        nh: 20,
        fp: 10,
        gp: 10,
        hp: 5,
        qn: 0.1,
        Si: 20,
        Vi: 100,
        Wi: 100,
        pn: -Math.PI / 3,
        on: Math.PI / 3,
        Ui: 0,
        Mj: 0,
        wd: [40, 32, 16, 16],
        mk: [0, 0.87, 0.92, 0.9],
        ln: 2,
        en: 100,
        ga_: !1,
        qk: 16,
        rk: 0.4,
        tk: [0.72, 0.73, 0.72, 0.74],
        Dk: 1.2,
        Ak: [0.5, 0.5, 0.5, 1],
        Fk: 140,
        Ek: 280,
        Gk: 1.2,
        uk: 20,
        vk: 40,
        Ck: [6, 9, 9, 12],
        zk: [0.03, 0.02, 0.02, 0.018],
        yk: [0.35, 0.35, 0.4, 0.5],
        wk: [0.2, 0.2, 0.2, 0.2],
        sk: [0.1, 0.15, 0.15, 0.15],
        Bk: [200, 200, 150, 120],
        xk: [1, 2, 3, 5],
        wo: 1.1,
        Hq: [0.25, 0.5, 1, 2],
        Iq: 256,
        Gq: 256,
        Fq: 200,
        xo: [40, 80, 200, 500],
        yo: [35, 45, 80, 120],
        fl: !0,
        gl: "CCW",
      },
      Zc = {},
      Z = (function () {
        function a(q, t, R) {
          t = q.createShader(t);
          q.shaderSource(t, R);
          q.compileShader(t);
          return q.getShaderParameter(t, q.COMPILE_STATUS) ? t : null;
        }
        function b(q, t, R) {
          t = a(q, q.VERTEX_SHADER, t);
          R = a(q, q.FRAGMENT_SHADER, R);
          q === c && h.push(t, R);
          var O = q.createProgram();
          q.attachShader(O, t);
          q.attachShader(O, R);
          q.linkProgram(O);
          return O;
        }
        function d(q) {
          return ["float", "sampler2D", "int"]
            .map(function (t) {
              return "precision " + q + " " + t + ";\n";
            })
            .join("");
        }
        function f(q, t) {
          t.R = t.R ? !0 : !1;
          if (!t.R) {
            t.v =
              t.v ||
              "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5);}";
            t.J = t.J || ["a0"];
            t.S = t.S || [2];
            t.precision = t.precision || y;
            t.id = w++;
            void 0 !== t.jj &&
              (t.jj.forEach(function (ia, Y) {
                t.g = t.g.replace(ia, t.Ha[Y]);
              }),
              t.jj.splice(0));
            t.$g = 0;
            t.S.forEach(function (ia) {
              t.$g += 4 * ia;
            });
            var R = d(t.precision);
            t.pa = b(q, R + t.v, R + t.g);
            t.B = {};
            t.i.forEach(function (ia) {
              t.B[ia] = q.getUniformLocation(t.pa, ia);
            });
            t.attributes = {};
            t.wa = [];
            t.J.forEach(function (ia) {
              var Y = q.getAttribLocation(t.pa, ia);
              t.attributes[ia] = Y;
              t.wa.push(Y);
            });
            if (t.u) {
              q.useProgram(t.pa);
              r = t;
              m = t.id;
              for (var O in t.u) q.uniform1i(t.B[O], t.u[O]);
            }
            t.Na = !0;
          }
        }
        function l(q) {
          xb.Aj(L);
          m !== q.id &&
            (L.M(),
            (m = q.id),
            (r = q),
            c.useProgram(q.pa),
            q.wa.forEach(function (t) {
              0 !== t && c.enableVertexAttribArray(t);
            }));
        }
        function p(q, t, R) {
          f(q, t, R);
          q.useProgram(t.pa);
          q.enableVertexAttribArray(t.attributes.a0);
          m = -1;
          return (r = t);
        }
        function u() {
          return {
            g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
            i: ["u1"],
            u: { u1: 0 },
          };
        }
        var h = [],
          m = -1,
          r = null,
          w = 0,
          H = !1,
          y = "highp",
          x = ["u1"],
          z = ["u0"],
          g = { u1: 0 },
          k = { u0: 0 },
          D = { u1: 0, u2: 1 },
          M = { u1: 0, u3: 1 },
          C = ["u1", "u3", "u4"],
          n = { u5: 0 },
          e = ["u6", "u7", "u8", "u9"],
          v = { u6: 0, u7: 1 },
          J = {
            s0: u(),
            s1: {
              g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
              i: x,
              u: g,
              precision: "lowp",
            },
            s2: {
              g: "uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}",
              i: ["u1", "u2"],
              u: D,
            },
            s3: {
              g: "uniform sampler2D u1;uniform vec2 u10,u11;varying vec2 vv0;void main(){vec2 a=vv0*u10+u11;gl_FragColor=texture2D(u1,a);}",
              i: ["u1", "u10", "u11"],
              u: g,
              R: !0,
            },
            s4: {
              g: "uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}",
              i: x,
              u: g,
            },
            s5: {
              g: "uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}",
              i: ["u1", "u2"],
              u: D,
            },
            s6: {
              g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}",
              i: x,
              u: g,
            },
            s7: {
              g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}",
              i: x,
              u: g,
            },
            s8: {
              g: "uniform sampler2D u0;uniform float u10;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u10;}",
              i: ["u0", "u10"],
              u: k,
            },
            s9: {
              g: "uniform sampler2D u0;uniform float u10;varying vec2 vv0;const vec4 f=vec4(.25),g=vec4(1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u10,f);gl_FragColor=b*g;}",
              i: ["u0", "u10"],
              u: k,
            },
            s10: {
              g: "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}",
              i: x,
              u: g,
            },
            s11: {
              g: "uniform sampler2D u1,u12;uniform float u13;const vec4 f=vec4(1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u12,vv0);gl_FragColor=mix(b,a,u13*f);}",
              i: ["u1", "u12", "u13"],
              u: { u1: 0, u12: 1 },
            },
            s12: {
              g: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u14)+texture2D(u1,vv0+u14*vec2(1.,-1.))+texture2D(u1,vv0+u14*vec2(-1.,-1.))+texture2D(u1,vv0+u14*vec2(-1.,1.)));}",
              i: ["u1", "u14"],
              u: g,
            },
            s13: {
              g: "uniform sampler2D u1;varying vec2 vv0;vec4 f(vec3 d){vec3 b=d/65536.,a=clamp(ceil(log2(b)),-128.,127.);float c=max(max(a.r,a.g),a.b),g=exp2(c);vec3 h=clamp(b/g,0.,1.);return vec4(h,(c+128.)/256.);}void main(){vec3 a=texture2D(u1,vv0).rgb;gl_FragColor=f(a);}",
              i: x,
              u: g,
              R: !0,
            },
            s14: {
              g: "uniform sampler2D u1;varying vec2 vv0;vec3 f(vec4 a){float b=a.a*256.-128.;vec3 c=a.rgb;return exp2(b)*c*65536.;}void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=vec4(f(a),1.);}",
              i: x,
              u: g,
              R: !0,
            },
            s15: {
              g: "uniform sampler2D u1;uniform vec4 u15;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 j(float a){if(a==0.)return vec4(0.,0.,0.,0.);float k=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),l=c+127.,b=(a/exp2(c)-1.)*8388608.,d=l/2.,m=fract(d)*2.,n=floor(d),o=e(b,0.,8.),p=e(b,8.,16.),q=m*128.+e(b,16.,23.),r=k+n;return vec4(o,p,q,r)/255.;}void main(){float a=dot(texture2D(u1,vv0),u15);gl_FragColor=j(a);}",
              i: ["u1", "u15"],
              u: g,
            },
            s16: {
              g: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}",
              i: z,
              u: k,
              R: !0,
            },
            s17: {
              g: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(f,a);}",
              i: z,
              u: k,
              R: !0,
            },
            s18: {
              g: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.);const float g=.797885,h=.044715;vec4 i(vec4 a){vec4 b=exp(-abs(a)),c=b*b,d=sign(a)*(e-c)/(e+c);return d;}void main(){vec4 a=texture2D(u0,vv0),b=a+h*a*a*a,c=i(g*b);gl_FragColor=.5*a*(e+c);}",
              i: z,
              u: k,
              R: !0,
            },
            s19: {
              g: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-f,a,step(0.,a));}",
              i: z,
              u: k,
              R: !0,
            },
            s20: {
              g: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(a)-f;gl_FragColor=mix(.1*b,a,step(0.,a));}",
              i: z,
              u: k,
            },
            s21: {
              g: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}",
              i: z,
              u: k,
            },
            s22: {
              g: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=2.*atan(e*texture2D(u0,vv0))/e;}",
              i: z,
              u: k,
              R: !0,
            },
            s23: {
              g: "uniform sampler2D u0,u16;uniform float u17;const vec2 e=vec2(.5);const float f=1e-5;const vec4 g=vec4(1.),i=vec4(0.);varying vec2 vv0;void main(){vec4 a=texture2D(u16,e);float b=u17*u17;vec4 c=max(b*a,f*g);gl_FragColor=texture2D(u0,vv0)/c;}",
              i: ["u0", "u16", "u17"],
              u: { u0: 0, u16: 1 },
              R: !0,
            },
            s24: {
              g: "uniform sampler2D u1;uniform vec2 u18;varying vec2 vv0;void main(){float a=u18.x*u18.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u18.y),f=floor(u18.x*fract(b*u18.y)),g=(f*u18.y+d)/a;gl_FragColor=texture2D(u1,g+c/a);}",
              i: ["u1", "u18"],
              u: g,
            },
            s25: {
              g: "uniform sampler2D u7,u6,u19;varying vec2 vv0;void main(){vec4 a=texture2D(u19,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u7,b),f=texture2D(u6,c);gl_FragColor=d*f;}",
              i: ["u7", "u6", "u19"],
              u: Object.assign({ u19: 2 }, v),
              R: !0,
            },
            s26: {
              g: "uniform float u8,u9;uniform sampler2D u7,u6;varying vec2 vv0;void main(){vec2 b=fract(vv0*u8);float a=u8*u9;vec2 c=(vec2(.5)+floor(a*vv0))/a;vec4 d=texture2D(u7,c),f=texture2D(u6,b);gl_FragColor=d*f;}",
              i: e,
              u: v,
            },
            s27: {
              g: "uniform float u8,u9;uniform vec2 u20;uniform sampler2D u7,u6;varying vec2 vv0;void main(){float a=u8*u9;vec2 b=mod(vv0*u20,vec2(1.)),c=floor(vv0*u20)/u20,d=c+fract(b*u8)/u20,f=(vec2(.5)+floor(a*b))/a;vec4 g=texture2D(u7,f),h=texture2D(u6,d);gl_FragColor=g*h;}",
              i: ["u20"].concat(e),
              u: v,
              R: !0,
            },
            s28: {
              g: "uniform float u8,u9;uniform sampler2D u7,u6,u22,u23,u24,u25;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 c=fract(vv0*u8),d=vv0;float h=u8*u9;d=(.5+floor(h*vv0))/h;vec4 l=texture2D(u7,d),m=texture2D(u6,c),a=texture2D(u25,d);a=floor(.5+a*255.);vec4 n=texture2D(u22,c),o=texture2D(u23,c),p=texture2D(u24,c),i=step(-g,-a),b=e-i,j=b*step(-e-g,-a);b*=e-j;vec4 k=b*step(-2.*e-g,-a);b*=e-k;vec4 q=b,r=i*m+j*n+k*o+q*p;gl_FragColor=l*r;}",
              i: ["u25", "u22", "u23", "u24"].concat(e),
              u: Object.assign({ u25: 3, u22: 4, u23: 5, u24: 6 }, v),
              R: !0,
            },
            s29: {
              g: "uniform sampler2D u7,u6,u3;uniform float u8,u26,u27,u9;uniform vec2 u28;varying vec2 vv0;const vec2 f=vec2(1.),l=vec2(0.);void main(){vec2 c=floor(u26*vv0),d=u26*vv0-c;float g=u8/u26;vec2 h=floor(d*g),i=d*g-h,j=(c+i)/u26;float m=u26*u9/u8;vec2 b=m*h;b=floor(u28*b+.5*(u9-1.)*(f-u28));vec2 a=(b+i*u27)/u9;a+=.25/u9;vec2 k=step(a,f)*step(l,a);vec4 n=texture2D(u7,j),o=texture2D(u6,a),p=n*o,q=texture2D(u3,j);gl_FragColor=(p*u27*u27+q)*k.x*k.y;}",
              i: ["u26", "u27", "u3", "u28"].concat(e),
              u: Object.assign({ u3: 2 }, v),
            },
            s30: {
              g: "uniform sampler2D u7,u6;varying vec2 vv0;void main(){vec4 a=texture2D(u7,vv0),b=texture2D(u6,vv0);gl_FragColor=a*b;}",
              i: ["u7", "u6"],
              u: v,
              R: !0,
            },
            s31: {
              g: "uniform sampler2D u1,u3;uniform float u4;varying vec2 vv0;void main(){gl_FragColor=texture2D(u3,vv0)+u4*texture2D(u1,vv0);}",
              i: C,
              u: M,
            },
            s32: {
              g: "uniform sampler2D u1,u3;uniform vec2 u20;uniform float u4;varying vec2 vv0;void main(){gl_FragColor=texture2D(u3,vv0*u20)+u4*texture2D(u1,vv0);}",
              i: ["u20"].concat(C),
              u: M,
              R: !0,
            },
            s33: {
              g: "uniform sampler2D u1,u3;uniform float u4;varying vec2 vv0;const vec4 e=vec4(1.);void main(){vec4 a=texture2D(u3,vv0)+u4*texture2D(u1,vv0);vec2 h=mod(gl_FragCoord.xy,vec2(2.)),d=step(h,vec2(.75));float b=d.x+2.*d.y,c=step(2.5,b),g=(1.-c)*step(1.5,b),i=(1.-c)*(1.-g)*step(.5,b);a=mix(a,a.argb,i*e),a=mix(a,a.barg,g*e),a=mix(a,a.gbar,c*e),gl_FragColor=a;}",
              i: C,
              u: M,
              R: !0,
            },
            s34: {
              g: "uniform sampler2D u1,u3;uniform vec2 u20;uniform float u4;varying vec2 vv0;const vec4 e=vec4(1.);void main(){vec4 a=texture2D(u3,vv0*u20)+u4*texture2D(u1,vv0);vec2 h=mod(gl_FragCoord.xy,vec2(2.)),d=step(h,vec2(.75));float b=d.x+2.*d.y,c=step(2.5,b),g=(1.-c)*step(1.5,b),i=(1.-c)*(1.-g)*step(.5,b);a=mix(a,a.argb,i*e),a=mix(a,a.barg,g*e),a=mix(a,a.gbar,c*e),gl_FragColor=a;}",
              i: ["u20"].concat(C),
              u: M,
              R: !0,
            },
            s35: {
              g: "uniform sampler2D u1,u3;uniform float u4;varying vec2 vv0;const vec4 h=vec4(1.);void main(){vec4 a=texture2D(u3,vv0)+u4*texture2D(u1,vv0);vec2 b=floor(gl_FragCoord.xy);vec3 d=b.x*vec3(1.)+vec3(0.,1.,2.);float c=mod(b.y,2.);vec4 f=vec4(c,(1.-c)*step(mod(d,vec3(3.)),vec3(.5)));mat4 g=mat4(a.rgba,a.gbar,a.barg,a.argb);gl_FragColor=g*f;}",
              i: C,
              u: M,
              R: !0,
            },
            s36: {
              g: "varying vec2 vv0;uniform sampler2D u1;const vec4 f=vec4(1.,1.,1.,1.),g=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,g)*f;}",
              i: x,
              u: g,
              precision: "lowp",
            },
            s37: {
              g: "varying vec2 vv0;uniform sampler2D u1;uniform float u29;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u29)).rgb,c=texture2D(u1,vv0+vec2(u29,u29)).rgb,d=texture2D(u1,vv0+vec2(u29,0.)).rgb;gl_FragColor=vec4(dot(a,f),dot(b,f),dot(c,f),dot(d,f));}",
              i: ["u1", "u29"],
              u: g,
              precision: "lowp",
            },
            s38: {
              g: "varying vec2 vv0;uniform sampler2D u1;uniform float u29;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u29)).rgb,c=texture2D(u1,vv0+vec2(u29,u29)).rgb,d=texture2D(u1,vv0+vec2(u29,0.)).rgb;gl_FragColor=vec4(a.r,b.g,c.b,dot(d,f));}",
              i: ["u1", "u29"],
              u: g,
              precision: "lowp",
            },
            s39: {
              g: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u30;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u30,vv0.y-u30))*1.,a-=texture2D(u1,vec2(vv0.x-u30,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u30,vv0.y+u30))*1.,a+=texture2D(u1,vec2(vv0.x+u30,vv0.y-u30))*1.,a+=texture2D(u1,vec2(vv0.x+u30,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u30,vv0.y+u30))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u30,vv0.y-u30))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u30))*2.,b-=texture2D(u1,vec2(vv0.x+u30,vv0.y-u30))*1.,b+=texture2D(u1,vec2(vv0.x-u30,vv0.y+u30))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u30))*2.,b+=texture2D(u1,vec2(vv0.x+u30,vv0.y+u30))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),g=texture2D(u2,vv0);gl_FragColor=g.a*e.r*f;}",
              i: ["u1", "u2", "u30"],
              u: D,
              R: !0,
            },
            s40: {
              g: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u30;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float h=0.;vec2 l=k*u30,a,b;float c,d,i=0.;for(float e=-4.;e<=4.;e+=1.)for(float f=-4.;f<=4.;f+=1.)a=vec2(e,f),c=length(a)/2.,d=exp(-c*c),b=vv0+l*a,h+=d*texture2D(u1,b).r,i+=d;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,b).r-h/i)*j;}",
              i: ["u1", "u2", "u30"],
              u: D,
              R: !0,
            },
            s41: {
              g: "uniform sampler2D u5;uniform vec2 u14;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 g=vec2(.5,.5),h=vec2(1.,0.),i=vec2(0.,1.);void main(){vec2 a=vv0-u14*g;vec4 b=texture2D(u5,a),c=texture2D(u5,a+u14*h),d=texture2D(u5,a+u14*i),j=texture2D(u5,a+u14),k=e(b,c),l=e(d,j);gl_FragColor=e(k,l);}",
              i: ["u5", "u14"],
              u: n,
            },
            s42: {
              g: "uniform sampler2D u5;uniform vec2 u14;varying vec2 vv0;const vec2 k=vec2(1.,0.),l=vec2(0.,1.),m=vec2(2.,0.),n=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u5,a),c=texture2D(u5,a+u14*k),d=texture2D(u5,a+u14*l),g=texture2D(u5,a+u14),h=e(b,c),i=e(d,g);return e(h,i);}void main(){vec2 a=vv0+u14*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u14*m),d=f(a+u14*2.),g=f(a+u14*n),h=e(b,c),i=e(d,g);gl_FragColor=e(h,i);}",
              i: ["u5", "u14"],
              u: n,
              R: !0,
            },
            s43: {
              g: "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}",
              i: ["u1"],
              u: g,
              precision: "lowp",
              R: !0,
            },
            s44: {
              g: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;const float e=15444.;void main(){vec4 a=1001./e*texture2D(u1,vv0-3.*u14)+2002./e*texture2D(u1,vv0-2.*u14)+3003./e*texture2D(u1,vv0-u14)+3432./e*texture2D(u1,vv0)+3003./e*texture2D(u1,vv0+u14)+2002./e*texture2D(u1,vv0+2.*u14)+1001./e*texture2D(u1,vv0+3.*u14);gl_FragColor=a;}",
              i: ["u14", "u1"],
              u: g,
              precision: "lowp",
              R: !0,
            },
            s45: {
              g: "uniform sampler2D u1,u16,u31;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);const float g=.1;void main(){vec4 a=texture2D(u16,vv0),b=texture2D(u31,vv0),c=texture2D(u1,vv0),d=max(f*g,b-a*a),h=sqrt(d);gl_FragColor=(c-a)/h;}",
              i: ["u1", "u16", "u31"],
              u: { u1: 0, u16: 1, u31: 2 },
              R: !0,
            },
          },
          N = {
            s46: {
              g: "uniform float u8,u32;uniform sampler2D u7,u6,u3;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-5,1e-5);void main(){vec4 sum=texture2D(u3,vv0);float toSparsity=1.1111;vec2 uvFrom,uvWeight,xyPatch=ZERO2,eps2=EPS2/u8,xyTo=floor(vv0*u8+eps2);float weightSize=toSparsity*u8;vec2 halfFromSparsity=ONE2*(toSparsity-1.)/2.;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.)xyPatch.y=patch_y,uvFrom=(xyTo+HALF2+u32*(xyPatch-halfFromSparsity))/u8,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),uvWeight=(xyTo*toSparsity+xyPatch+HALF2)/weightSize,sum+=texture2D(u7,uvWeight)*texture2D(u6,uvFrom);}gl_FragColor=sum,gl_FragColor*=2.2222;}",
              i: ["u8", "u7", "u6", "u3", "u32"],
              Ha: ["1.1111", "gl_FragColor\\*=2.2222;"],
            },
            s47: {
              g: "uniform float u8,u32,u9;uniform sampler2D u7,u6,u3;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u3,vv0);float fromSparsity=1.1111,shrinkFactor=3.3333;vec2 uvFrom,uvWeight,xyFrom,xyPatchTo,xyPatch=ZERO2,xyShrink=ZERO2,eps2=EPS2/u9,xyTo=floor(vv0*u8+eps2);float weightSize=fromSparsity*u9;vec2 halfFromSparsity=ONE2*(fromSparsity-1.)/2.;float toSparsity=weightSize/u8;vec2 xyFrom0=xyTo*shrinkFactor;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.){xyPatch.y=patch_y;for(float shrink_x=0.;shrink_x<3.3333;shrink_x+=1.){xyShrink.x=shrink_x;for(float shrink_y=0.;shrink_y<3.3333;shrink_y+=1.)xyShrink.y=shrink_y,xyFrom=xyFrom0+xyShrink+shrinkFactor*u32*(xyPatch-halfFromSparsity),uvFrom=(xyFrom+HALF2)/u9,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),xyPatchTo=xyPatch*shrinkFactor+xyShrink,uvWeight=(xyTo*toSparsity+xyPatchTo+HALF2)/weightSize,sum+=texture2D(u7,uvWeight)*texture2D(u6,uvFrom);}}}gl_FragColor=sum,gl_FragColor*=2.2222;}",
              i: "u8 u9 u7 u6 u3 u32".split(" "),
              Ha: ["1.1111", "gl_FragColor\\*=2.2222;", "3.3333"],
            },
          },
          A = null,
          G = null,
          L = {
            Zb: function () {
              return H;
            },
            m: function () {
              if (!H) {
                A = Ka(J, 2);
                G = Ka(N, 2);
                y = "highp";
                c.getShaderPrecisionFormat &&
                  (c.getShaderPrecisionFormat(
                    c.FRAGMENT_SHADER,
                    c.MEDIUM_FLOAT
                  ),
                  c.getShaderPrecisionFormat(c.FRAGMENT_SHADER, c.LOW_FLOAT));
                for (var q in A) f(c, A[q], q);
                Z.set("s0");
                c.enableVertexAttribArray(0);
                H = !0;
              }
            },
            uc: function (q) {
              q.forEach(function (t) {
                L.na(t);
              });
            },
            na: function (q) {
              A[q.id] = q;
              f(c, q, q.id);
            },
            wm: function (q, t, R) {
              t || (t = q);
              A[t] = Object.create(G[q]);
              A[t].Fm = !0;
              G[q].Ha &&
                G[q].Ha.forEach(function (O, ia) {
                  A[t].g = A[t].g.replace(new RegExp(O, "g"), R[ia]);
                });
              f(c, A[t], t);
            },
            set: function (q) {
              var t = A[q];
              t.R && ((t.R = !1), f(c, t, q));
              l(t);
            },
            Bb: function (q) {
              return p(q, u(), "s48");
            },
            ge: function (q) {
              return p(
                q,
                {
                  g: "void main(){gl_FragColor=vec4(.5,.5,.5,.5);}",
                  i: [],
                  precision: y,
                },
                "s49"
              );
            },
            Gl: function (q) {
              return "undefined" === typeof A[q] ? !1 : A[q].Na;
            },
            M: function () {
              -1 !== m &&
                ((m = -1),
                r.wa.forEach(function (q) {
                  0 !== q && c.disableVertexAttribArray(q);
                }));
            },
            ie: function () {
              var q = 0;
              r.wa.forEach(function (t, R) {
                R = r.S[R];
                c.vertexAttribPointer(t, R, c.FLOAT, !1, r.$g, q);
                q += 4 * R;
              });
            },
            Fl: function () {
              c.enableVertexAttribArray(0);
            },
            fc: function () {
              L.hc(c);
            },
            hc: function (q) {
              q.vertexAttribPointer(r.wa[0], 2, q.FLOAT, !1, 8, 0);
            },
            he: function (q, t) {
              c.uniform1i(r.B[q], t);
            },
            D: function (q, t) {
              c.uniform1f(r.B[q], t);
            },
            O: function (q, t, R) {
              c.uniform2f(r.B[q], t, R);
            },
            Ag: function (q, t) {
              c.uniform2fv(r.B[q], t);
            },
            Cg: function (q, t) {
              c.uniform3fv(r.B[q], t);
            },
            Bg: function (q, t, R, O) {
              c.uniform3f(r.B[q], t, R, O);
            },
            po: function (q, t, R, O, ia) {
              c.uniform4f(r.B[q], t, R, O, ia);
            },
            za: function (q, t) {
              c.uniform4fv(r.B[q], t);
            },
            qo: function (q, t) {
              c.uniformMatrix2fv(r.B[q], !1, t);
            },
            ro: function (q, t) {
              c.uniformMatrix3fv(r.B[q], !1, t);
            },
            Vc: function (q, t) {
              c.uniformMatrix4fv(r.B[q], !1, t);
            },
            j: function (q, t) {
              L.set(q);
              t.forEach(function (R) {
                switch (R.type) {
                  case "4f":
                    c.uniform4fv(r.B[R.name], R.value);
                    break;
                  case "3f":
                    c.uniform3fv(r.B[R.name], R.value);
                    break;
                  case "2f":
                    c.uniform2fv(r.B[R.name], R.value);
                    break;
                  case "1f":
                    c.uniform1f(r.B[R.name], R.value);
                    break;
                  case "1i":
                    c.uniform1i(r.B[R.name], R.value);
                    break;
                  case "mat2":
                    c.uniformMatrix2fv(r.B[R.name], !1, R.value);
                    break;
                  case "mat3":
                    c.uniformMatrix3fv(r.B[R.name], !1, R.value);
                    break;
                  case "mat4":
                    c.uniformMatrix4fv(r.B[R.name], !1, R.value);
                }
              });
            },
            Sp: function () {
              return "lowp";
            },
            A: function () {
              L.M();
              c.disableVertexAttribArray(0);
              for (var q in A) {
                var t = A[q];
                t.Na && ((t.Na = !1), c.deleteProgram(t.pa));
                t.Fm && delete A[q];
              }
              h.forEach(function (R) {
                c.deleteShader(R);
              });
              h.splice(0);
              w = 0;
              H = !1;
              r = null;
              m = -1;
            },
          };
        return L;
      })(),
      c = null,
      lb = (function () {
        function a(x) {
          console.log("ERROR in ContextFF: ", x);
          return !1;
        }
        function b() {
          return (
            navigator.userAgent &&
            -1 !== navigator.userAgent.indexOf("forceWebGL1")
          );
        }
        function d(x, z, g) {
          x.setAttribute("width", z);
          x.setAttribute("height", g);
        }
        function f(x) {
          if (b()) return !1;
          var z = document.createElement("canvas");
          d(z, 5, 5);
          var g = null;
          try {
            g = z.getContext("webgl2", x);
          } catch (k) {
            return !1;
          }
          if (!g) return !1;
          l(g);
          Fa.Ih(g);
          x = Fa.$e(g);
          if (!x.Wa && !x.Ya) return Db.A(), Fa.reset(), !1;
          g = Db.oh(g, x);
          Db.A();
          Fa.reset();
          return g ? !0 : !1;
        }
        function l(x) {
          x.clearColor(0, 0, 0, 0);
          x.disable(x.DEPTH_TEST);
          x.disable(x.BLEND);
          x.disable(x.DITHER);
          x.disable(x.STENCIL_TEST);
          x.disable(x.CULL_FACE);
          x.GENERATE_MIPMAP_HINT &&
            x.FASTEST &&
            x.hint(x.GENERATE_MIPMAP_HINT, x.FASTEST);
          x.disable(x.SAMPLE_ALPHA_TO_COVERAGE);
          x.disable(x.SAMPLE_COVERAGE);
          x.depthFunc(x.LEQUAL);
          x.clearDepth(1);
        }
        var p = null,
          u = null,
          h = null,
          m = !0,
          r = null,
          w = null,
          H = [],
          y = {
            P: function () {
              return p.width;
            },
            Z: function () {
              return p.height;
            },
            tb: function () {
              return p;
            },
            Ll: function () {
              return c;
            },
            ma: function () {
              return m;
            },
            flush: function () {
              c.flush();
            },
            $p: function () {
              Ca.ba();
              y.Jn();
            },
            Jn: function () {
              aa.reset();
              W.reset();
              Z.M();
              Z.Fl();
              c.disable(c.DEPTH_TEST);
              c.disable(c.BLEND);
              W.md();
              Z.fc();
            },
            Ql: function () {
              r || (r = new Uint8Array(p.width * p.height * 4));
              c.readPixels(0, 0, p.width, p.height, c.RGBA, c.UNSIGNED_BYTE, r);
              return r;
            },
            Op: function () {
              return p.toDataURL("image/jpeg");
            },
            Pp: function () {
              Ca.aa();
              u ||
                ((u = document.createElement("canvas")),
                (h = u.getContext("2d")));
              d(u, p.width, p.height);
              for (
                var x = y.Ql(),
                  z = h.createImageData(u.width, u.height),
                  g = u.width,
                  k = u.height,
                  D = z.data,
                  M = 0;
                M < k;
                ++M
              )
                for (var C = k - M - 1, n = 0; n < g; ++n) {
                  var e = 4 * (M * g + n),
                    v = 4 * (C * g + n);
                  D[e] = x[v];
                  D[e + 1] = x[v + 1];
                  D[e + 2] = x[v + 2];
                  D[e + 3] = x[v + 3];
                }
              h.putImageData(z, 0, 0);
              return u.toDataURL("image/png");
            },
            Uh: function (x) {
              !u &&
                x &&
                ((u = document.createElement("canvas")),
                (h = u.getContext("2d")));
              var z = x ? u : document.createElement("canvas");
              d(z, p.width, p.height);
              (x ? h : z.getContext("2d")).drawImage(p, 0, 0);
              return z;
            },
            m: function (x) {
              x = Object.assign(
                {
                  Xa: null,
                  cg: null,
                  ra: null,
                  Ve: null,
                  width: 512,
                  height: 512,
                  premultipliedAlpha: !1,
                  Cm: !0,
                  antialias: !1,
                  debug: !1,
                  Bp: !1,
                },
                x
              );
              x.Xa
                ? ((c = x.Xa), (p = x.Xa.canvas))
                : x.Ve && !x.ra
                ? (p = document.getElementById(x.Ve))
                : x.ra && (p = x.ra);
              p || (p = document.createElement("canvas"));
              p.width = x.width;
              p.height = x.height;
              if (c) m = c instanceof WebGL2RenderingContext;
              else {
                m = !0;
                var z = {
                  antialias: x.antialias,
                  alpha: !0,
                  preserveDrawingBuffer: !0,
                  premultipliedAlpha: x.premultipliedAlpha,
                  stencil: !1,
                  depth: x.Cm,
                  failIfMajorPerformanceCaveat: !0,
                  powerPreference: "high-performance",
                };
                navigator &&
                  navigator.userAgent &&
                  -1 !== navigator.userAgent.indexOf("noAntialiasing") &&
                  (z.antialias = !1);
                var g = f(z);
                g || !z.antialias || b() || ((z.antialias = !1), (g = f(z)));
                g && (c = p.getContext("webgl2", z));
                c
                  ? (m = !0)
                  : ((c = p.getContext("webgl", z)) ||
                      (c = p.getContext("experimental-webgl", z)),
                    (m = !1));
              }
              if (!c) return a("WebGL1 and 2 are not enabled");
              x.cg &&
                p.addEventListener &&
                ((w = x.cg), p.addEventListener("webglcontextlost", w, !1));
              if (!Fa.m()) return a("Not enough GL capabilities");
              l(c);
              Z.m();
              W.m();
              Db.oh(c, Fa.Nl());
              H.forEach(function (k) {
                k(c);
              });
              H.splice(0);
              return !0;
            },
            qp: function () {
              return new Promise(function (x) {
                c ? x(c) : H.push(x);
              });
            },
            A: function () {
              c && (Fa.A(), Z.A(), Db.A());
              w &&
                (p.removeEventListener("webglcontextlost", w, !1), (w = null));
              c = r = h = u = p = null;
              H.splice(0);
            },
          };
        return y;
      })(),
      xb = (function () {
        function a() {
          null === b &&
            ("undefined" !== typeof Z
              ? (b = Z)
              : "undefined" !== typeof F && (b = F));
        }
        var b = null;
        return {
          reset: function () {
            b = null;
          },
          Aj: function (d) {
            b !== d && (b && b.M(), (b = d));
          },
          Zb: function () {
            return b.Zb();
          },
          fc: function () {
            return b.fc();
          },
          hc: function (d) {
            return b.hc(d);
          },
          ie: function () {
            return b.ie();
          },
          M: function () {
            return b.M();
          },
          set: function (d) {
            a();
            return b.set(d);
          },
          Bb: function (d) {
            a();
            return b.Bb(d);
          },
          ge: function (d) {
            a();
            return b.ge(d);
          },
        };
      })(),
      aa = (function () {
        function a(G) {
          c.bindTexture(c.TEXTURE_2D, G);
        }
        function b(G) {
          var L = new Uint16Array(G.length);
          G.forEach(function (q, t) {
            v[0] = q;
            var R = J[0];
            var O = (R >> 16) & 32768;
            q = (R >> 12) & 2047;
            var ia = (R >> 23) & 255;
            R =
              103 > ia
                ? O
                : 142 < ia
                ? O | 31744 | ((255 == ia ? 0 : 1) && R & 8388607)
                : 113 > ia
                ? ((q |= 2048),
                  O | ((q >> (114 - ia)) + ((q >> (113 - ia)) & 1)))
                : (O | ((ia - 112) << 10) | (q >> 1)) + (q & 1);
            L[t] = R;
          });
          return L;
        }
        function d() {
          if (null !== N.Af) return N.Af;
          var G = f(b([0.5, 0.5, 0.5, 0.5]), !0);
          return null === G ? !0 : (N.Af = G);
        }
        function f(G, L) {
          if (!xb.Zb() || !x) return null;
          var q = null,
            t = Math.sqrt(G.length / 4);
          try {
            var R = c.getError();
            if ("FUCKING_BIG_ERROR" === R) return !1;
            q = A.instance({ isFloat: !1, U: L, array: G, width: t });
            R = c.getError();
            if (R !== c.NO_ERROR) return !1;
          } catch (O) {
            return !1;
          }
          Ca.aa();
          c.viewport(0, 0, t, t);
          c.clearColor(0, 0, 0, 0);
          c.clear(c.COLOR_BUFFER_BIT);
          xb.set("s0");
          q.xa(0);
          W.l(!0, !0);
          G = 4 * t * t;
          L = new Uint8Array(G);
          c.readPixels(0, 0, t, t, c.RGBA, c.UNSIGNED_BYTE, L);
          t = !0;
          for (R = 0; R < G; ++R) t = t && 3 > Math.abs(L[R] - 127);
          q.remove();
          Ca.ba();
          return t;
        }
        var l = 0,
          p = null,
          u = 0,
          h = null,
          m = null,
          r = null,
          w = null,
          H = null,
          y = null,
          x = !1,
          z = [],
          g = {
            isFloat: !1,
            isPot: !0,
            isLinear: !1,
            isMipmap: !1,
            si: !1,
            isAnisotropicFiltering: !1,
            isMirrorX: !1,
            isMirrorY: !1,
            isSrgb: !1,
            isKeepArray: !1,
            isFlipY: null,
            width: 0,
            height: 0,
            url: null,
            array: null,
            data: null,
            la: null,
            ei: null,
            Em: !1,
            U: !1,
            C: null,
            K: 4,
            Uf: 0,
          },
          k = !1,
          D = null,
          M = null,
          C = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
          ],
          n = !1,
          e = !1,
          v = new Float32Array(1),
          J = new Int32Array(v.buffer),
          N = { Af: null, Bf: null },
          A = {
            m: function () {
              x ||
                ((H = [c.RGBA, null, c.RGBA, c.RGBA]),
                (y = [c.RGBA, null, c.RGBA, c.RGBA]),
                (p = [
                  c.TEXTURE0,
                  c.TEXTURE1,
                  c.TEXTURE2,
                  c.TEXTURE3,
                  c.TEXTURE4,
                  c.TEXTURE5,
                  c.TEXTURE6,
                  c.TEXTURE7,
                ]),
                (n = "undefined" !== typeof ha),
                (e = "undefined" !== typeof Fa),
                (h = [-1, -1, -1, -1, -1, -1, -1, -1]),
                (w = [c.UNSIGNED_BYTE, c.FLOAT, c.FLOAT]),
                (x = !0));
            },
            um: function () {
              if (!m) {
                for (var G = new Float32Array(16384), L = 0; 16384 > L; ++L)
                  G[L] = 2 * Math.random() - 1;
                m = {
                  random: A.instance({
                    isFloat: !0,
                    isPot: !0,
                    array: G,
                    width: 64,
                  }),
                  Qj: A.instance({
                    isFloat: !1,
                    isPot: !0,
                    width: 1,
                    array: new Uint8Array([0, 0, 0, 0]),
                  }),
                };
              }
              A.Lo();
            },
            vj: function (G) {
              c.framebufferTexture2D(
                Ca.qf(),
                c.COLOR_ATTACHMENT0,
                c.TEXTURE_2D,
                G,
                0
              );
            },
            di: function () {
              return m.Qj;
            },
            Lo: function () {
              w[1] = Fa.pf(c);
            },
            ko: function () {
              y = H = [c.RGBA, c.RGBA, c.RGBA, c.RGBA];
            },
            dj: function (G) {
              Z.set("s1");
              Ca.aa();
              var L = G.P(),
                q = G.Z();
              c.viewport(0, 0, L, q);
              G.h(0);
              W.l(!1, !1);
            },
            pq: function (G, L) {
              A.dj(G);
              c.readPixels(0, 0, G.P(), G.Z(), c.RGBA, c.UNSIGNED_BYTE, L);
            },
            qq: function (G, L) {
              A.dj(G);
              return Fa.ng(0, 0, G.P(), G.Z(), L);
            },
            Ph: function (G, L, q, t, R, O, ia) {
              G.activeTexture(G.TEXTURE0);
              var Y = G.createTexture();
              G.bindTexture(G.TEXTURE_2D, Y);
              R = R instanceof Float32Array ? R : new Float32Array(R);
              G.texParameteri(G.TEXTURE_2D, G.TEXTURE_WRAP_S, G.CLAMP_TO_EDGE);
              G.texParameteri(G.TEXTURE_2D, G.TEXTURE_WRAP_T, G.CLAMP_TO_EDGE);
              G.texParameteri(G.TEXTURE_2D, G.TEXTURE_MAG_FILTER, G.NEAREST);
              G.texParameteri(G.TEXTURE_2D, G.TEXTURE_MIN_FILTER, G.NEAREST);
              G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL, O);
              G.texImage2D(
                G.TEXTURE_2D,
                0,
                G.RGBA,
                q,
                t,
                0,
                G.RGBA,
                G.FLOAT,
                R
              );
              G.bindTexture(G.TEXTURE_2D, null);
              G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL, !1);
              ia && (Ca.ba(), Z.Bb(G));
              G.viewport(0, 0, q, t);
              G.framebufferTexture2D(
                G.FRAMEBUFFER,
                G.COLOR_ATTACHMENT0,
                G.TEXTURE_2D,
                L,
                0
              );
              G.bindTexture(G.TEXTURE_2D, Y);
              ia ? W.l(!0, !0) : W.Qb(G);
              G.deleteTexture(Y);
              x && ((h[0] = -1), (r = null), (l = 0));
            },
            He: function (G) {
              G !== l && (c.activeTexture(p[G]), (l = G));
            },
            instance: function (G) {
              function L() {
                ma = void 0 !== Q.la.videoWidth ? Q.la.videoWidth : Q.la.width;
                ua =
                  void 0 !== Q.la.videoHeight ? Q.la.videoHeight : Q.la.height;
              }
              function q(ba) {
                var wa = c.getError();
                if ("FUCKING_BIG_ERROR" === wa) return !1;
                c.texImage2D(c.TEXTURE_2D, 0, Wa, Xa, Ha, ba);
                wa = c.getError();
                wa !== c.NO_ERROR &&
                  Xa !== c.RGBA &&
                  ((Xa = c.RGBA),
                  c.texImage2D(c.TEXTURE_2D, 0, Wa, Xa, Ha, ba));
                return !0;
              }
              function t() {
                if (!X) {
                  a(na);
                  ab && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, ab);
                  Q.isPot
                    ? (c.texParameteri(
                        c.TEXTURE_2D,
                        c.TEXTURE_WRAP_S,
                        Q.isMirrorX ? c.MIRRORED_REPEAT : c.REPEAT
                      ),
                      c.texParameteri(
                        c.TEXTURE_2D,
                        c.TEXTURE_WRAP_T,
                        Q.isMirrorY ? c.MIRRORED_REPEAT : c.REPEAT
                      ))
                    : (c.texParameteri(
                        c.TEXTURE_2D,
                        c.TEXTURE_WRAP_S,
                        c.CLAMP_TO_EDGE
                      ),
                      c.texParameteri(
                        c.TEXTURE_2D,
                        c.TEXTURE_WRAP_T,
                        c.CLAMP_TO_EDGE
                      ));
                  Q.isAnisotropicFiltering &&
                    "undefined" !== typeof V &&
                    c.texParameterf(
                      c.TEXTURE_2D,
                      ha.Rl().TEXTURE_MAX_ANISOTROPY_EXT,
                      V.pk
                    );
                  c.texParameteri(
                    c.TEXTURE_2D,
                    c.TEXTURE_MAG_FILTER,
                    Q.isLinear ? c.LINEAR : c.NEAREST
                  );
                  var ba = Q.isMipmap && !Ib;
                  c.texParameteri(
                    c.TEXTURE_2D,
                    c.TEXTURE_MIN_FILTER,
                    Q.si
                      ? c.LINEAR_MIPMAP_LINEAR
                      : Q.isLinear
                      ? ba
                        ? c.NEAREST_MIPMAP_LINEAR
                        : c.LINEAR
                      : ba
                      ? c.NEAREST_MIPMAP_NEAREST
                      : c.NEAREST
                  );
                  Xa = H[Q.K - 1];
                  Wa = y[Q.K - 1];
                  Ha = w[P];
                  Fa.ma() &&
                    ((ba = Fa.Tl()),
                    Xa === c.RGBA && Ha === c.FLOAT
                      ? Q.isMipmap || Q.isLinear
                        ? (Wa = Db.Vl(c))
                        : Fa.ha()
                        ? ba && (Wa = ba)
                        : (Wa = c.RGBA16F || c.RGBA)
                      : Xa === c.RGB &&
                        Ha === c.FLOAT &&
                        ba &&
                        ((Wa = ba), (Xa = c.RGBA)));
                  if (
                    (Q.U && !Q.isFloat) ||
                    (Q.isFloat && Q.isMipmap && Db.Mm())
                  )
                    (Wa = Fa.Ul()), (Ha = Fa.pf(c));
                  Q.Uf && (Pb = Q.Uf);
                  Q.isSrgb && 4 === Q.K && (Xa = ha.mm());
                  if (Q.la) q(Q.la);
                  else if (Q.url) q(za);
                  else if (Ea) {
                    ba = Ea;
                    try {
                      "FUCKING_BIG_ERROR" !== c.getError() &&
                        (c.texImage2D(
                          c.TEXTURE_2D,
                          0,
                          Wa,
                          ma,
                          ua,
                          0,
                          Xa,
                          Ha,
                          ba
                        ),
                        c.getError() !== c.NO_ERROR &&
                          (c.texImage2D(
                            c.TEXTURE_2D,
                            0,
                            Wa,
                            ma,
                            ua,
                            0,
                            Xa,
                            Ha,
                            null
                          ),
                          c.getError() !== c.NO_ERROR &&
                            c.texImage2D(
                              c.TEXTURE_2D,
                              0,
                              c.RGBA,
                              ma,
                              ua,
                              0,
                              c.RGBA,
                              c.UNSIGNED_BYTE,
                              null
                            )));
                    } catch (ib) {
                      c.texImage2D(
                        c.TEXTURE_2D,
                        0,
                        Wa,
                        ma,
                        ua,
                        0,
                        Xa,
                        Ha,
                        null
                      );
                    }
                    Q.isKeepArray || (Ea = null);
                  } else
                    (ba = c.getError()),
                      "FUCKING_BIG_ERROR" !== ba &&
                        (c.texImage2D(
                          c.TEXTURE_2D,
                          0,
                          Wa,
                          ma,
                          ua,
                          0,
                          Xa,
                          Ha,
                          null
                        ),
                        (ba = c.getError()),
                        ba !== c.NO_ERROR &&
                          ((Xa = c.RGBA),
                          Q.U &&
                            Ha !== c.FLOAT &&
                            ((Ha = c.FLOAT),
                            c.texImage2D(
                              c.TEXTURE_2D,
                              0,
                              Wa,
                              ma,
                              ua,
                              0,
                              Xa,
                              Ha,
                              null
                            ))));
                  if (Q.isMipmap)
                    if (!Ib && Ta) Ta.Dc(), (Qb = !0);
                    else if (Ib) {
                      ba = Math.log2(Math.min(ma, ua));
                      Jb = Array(1 + ba);
                      Jb[0] = na;
                      for (var wa = 1; wa <= ba; ++wa) {
                        var Za = Math.pow(2, wa),
                          Ia = ma / Za;
                        Za = ua / Za;
                        var wb = c.createTexture();
                        a(wb);
                        c.texParameteri(
                          c.TEXTURE_2D,
                          c.TEXTURE_MIN_FILTER,
                          c.NEAREST
                        );
                        c.texParameteri(
                          c.TEXTURE_2D,
                          c.TEXTURE_MAG_FILTER,
                          c.NEAREST
                        );
                        c.texImage2D(
                          c.TEXTURE_2D,
                          0,
                          Wa,
                          Ia,
                          Za,
                          0,
                          Xa,
                          Ha,
                          null
                        );
                        a(null);
                        Jb[wa] = wb;
                      }
                      Qb = !0;
                    }
                  a(null);
                  h[l] = -1;
                  ab && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !1);
                  Ma = !0;
                  Q.C && Ta && (Q.C(Ta), (Q.C = null));
                }
              }
              function R() {
                for (
                  var ba = ma * ua, wa = 2 * ba, Za = 3 * ba, Ia = 0;
                  Ia < ba;
                  ++Ia
                )
                  (Da[0][Ia] = hb[Ia]),
                    (Da[1][Ia] = hb[Ia + ba]),
                    (Da[2][Ia] = hb[Ia + wa]),
                    (Da[3][Ia] = hb[Ia + Za]);
              }
              function O() {
                var ba = ma * ua * 4;
                ja = [
                  new Uint8Array(ba),
                  new Uint8Array(ba),
                  new Uint8Array(ba),
                  new Uint8Array(ba),
                ];
                Da = [
                  new Float32Array(ja[0].buffer),
                  new Float32Array(ja[1].buffer),
                  new Float32Array(ja[2].buffer),
                  new Float32Array(ja[3].buffer),
                ];
                ra = new Uint8Array(4 * ba);
                hb = new Float32Array(ra.buffer);
                sa = !0;
              }
              function ia() {
                Y = new Uint8Array(ma * ua * 4);
                ic = new Float32Array(Y.buffer);
                Wb = !0;
              }
              var Y,
                Q = Object.assign({}, g, G),
                fa = u++;
              null === Q.isFlipY && (Q.isFlipY = Q.url ? !0 : !1);
              Q.data &&
                ((Q.array =
                  "string" === typeof Q.data
                    ? Lb(Q.data)
                    : Q.isFloat
                    ? new Float32Array(Q.data)
                    : new Uint8Array(Q.data)),
                (Q.isFlipY = !1));
              var P = 0,
                E = Q.la ? !0 : !1,
                B = null,
                U = null,
                ca = !1;
              Q.U = Q.U || Q.isFloat;
              Q.U && (P = 1);
              !Q.Em && Q.isFloat && e && !Fa.ha() && (Q.isFloat = !1);
              Q.isFloat && (P = 2);
              Q.isAnisotropicFiltering &&
                n &&
                !ha.Lm() &&
                (Q.isAnisotropicFiltering = !1);
              var na = Q.ei || c.createTexture(),
                za = null,
                Ea = !1,
                ma = 0,
                ua = 0,
                Ma = !1,
                X = !1,
                sa = !1,
                Da = null,
                ja = null,
                ra = null,
                hb = null,
                Wa = null,
                Xa = null,
                Ha = null,
                ab = Q.isFlipY,
                sc = (G = Q.U && Q.isMipmap) && Db.Xk(),
                Ib = G && !sc ? !0 : !1,
                Jb = null,
                Pb = -1,
                hc = -1,
                Qb = !1,
                Wb = !1,
                ic = (Y = null);
              Q.width && ((ma = Q.width), (ua = Q.height ? Q.height : ma));
              var Ta = {
                get: function () {
                  return na;
                },
                P: function () {
                  return ma;
                },
                Z: function () {
                  return ua;
                },
                nm: function () {
                  return Q.url;
                },
                yi: function () {
                  return Q.isFloat;
                },
                zi: function () {
                  return Q.U;
                },
                Dq: function (ba) {
                  na = ba;
                },
                hq: function () {
                  return Q.isLinear;
                },
                Dc: function () {
                  c.generateMipmap(c.TEXTURE_2D);
                },
                Pk: function (ba, wa) {
                  Ib
                    ? (ba || (ba = Ta.$h()), A.He(wa), a(Jb[ba]), (h[wa] = -1))
                    : Ta.h(wa);
                },
                $h: function () {
                  -1 === Pb && (Pb = Math.log2(ma));
                  return Pb;
                },
                xj: function (ba) {
                  c.TEXTURE_MAX_LEVEL &&
                    c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAX_LEVEL, ba);
                },
                Kl: function (ba) {
                  ba || (ba = Ta.$h());
                  if (Ib) {
                    Z.set("s12");
                    A.He(0);
                    for (var wa = ma, Za = ua, Ia = 1; Ia <= ba; ++Ia)
                      (wa /= 2),
                        (Za /= 2),
                        Z.O("u14", 0.25 / wa, 0.25 / Za),
                        c.viewport(0, 0, wa, Za),
                        a(Jb[Ia - 1]),
                        c.framebufferTexture2D(
                          Ca.qf(),
                          c.COLOR_ATTACHMENT0,
                          c.TEXTURE_2D,
                          Jb[Ia],
                          0
                        ),
                        W.l(!1, 1 === Ia);
                    h[0] = -1;
                  } else ba !== hc && ((hc = ba), Ta.xj(ba)), Ta.Dc();
                },
                Eq: function (ba) {
                  (E = !(
                    Array.isArray(ba) ||
                    ba.constructor === Float32Array ||
                    ba.constructor === Uint8Array
                  ))
                    ? ((Ea = null), (Q.la = ba), L())
                    : (Ea = ba);
                },
                h: function (ba) {
                  if (!Ma) return !1;
                  A.He(ba);
                  if (h[ba] === fa) return !1;
                  a(na);
                  h[ba] = fa;
                  return !0;
                },
                xa: function (ba) {
                  c.activeTexture(p[ba]);
                  l = ba;
                  a(na);
                  h[ba] = fa;
                },
                o: function () {
                  r = Ta;
                  A.vj(na);
                },
                L: function () {
                  c.viewport(0, 0, ma, ua);
                  r = Ta;
                  A.vj(na);
                },
                re: A.re,
                co: function (ba, wa) {
                  ma = ba;
                  ua = wa;
                },
                resize: function (ba, wa) {
                  Ta.co(ba, wa);
                  t();
                },
                clone: function (ba) {
                  ba = A.instance({
                    width: ma,
                    height: ua,
                    U: Q.U,
                    isFloat: Q.isFloat,
                    isLinear: Q.isLinear,
                    isMirrorY: Q.isMirrorY,
                    isFlipY: ba ? !ab : ab,
                    isPot: Q.isPot,
                  });
                  xb.set("s0");
                  Ca.ba();
                  ba.L();
                  Ta.h(0);
                  W.l(!0, !0);
                  return ba;
                },
                Wc: function () {
                  c.viewport(0, 0, ma, ua);
                },
                remove: function () {
                  c.deleteTexture(na);
                  X = !0;
                  z.splice(z.indexOf(Ta), 1);
                  Ta = null;
                },
                refresh: function () {
                  Ta.xa(0);
                  ab && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !0);
                  E
                    ? c.texImage2D(c.TEXTURE_2D, 0, Wa, Xa, Ha, Q.la)
                    : c.texImage2D(c.TEXTURE_2D, 0, Wa, ma, ua, 0, Xa, Ha, Ea);
                  ab && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !1);
                },
                bj: function () {
                  sa || O();
                  c.readPixels(0, 0, ma, 4 * ua, c.RGBA, c.UNSIGNED_BYTE, ra);
                  R();
                  return Da;
                },
                zn: function () {
                  sa || O();
                  return Fa.ng(0, 0, ma, 4 * ua, ra).then(function () {
                    R();
                    return Da;
                  });
                },
                Bn: function () {
                  Wb || ia();
                  c.readPixels(0, 0, ma, ua, c.RGBA, c.UNSIGNED_BYTE, Y);
                  return ic;
                },
                An: function () {
                  Wb || ia();
                  return Fa.ng(0, 0, ma, ua, Y);
                },
                Bh: function (ba) {
                  Ca.aa();
                  Z.set("s15");
                  Ta.h(0);
                  if (ba)
                    c.viewport(0, 0, ma, ua),
                      Z.po("u15", 0.25, 0.25, 0.25, 0.25),
                      W.l(!1, !0);
                  else
                    for (ba = 0; 4 > ba; ++ba)
                      c.viewport(0, ua * ba, ma, ua),
                        Z.za("u15", C[ba]),
                        W.l(!1, 0 === ba);
                },
                Vg: function (ba) {
                  var wa;
                  if ((wa = Ha === w[0]))
                    null !== N.Bf
                      ? (wa = N.Bf)
                      : ((wa = f(new Uint8Array([127, 127, 127, 127]), !1)),
                        (wa = null === wa ? !0 : (N.Bf = wa))),
                      (wa = !wa);
                  a(na);
                  ab && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !0);
                  wa
                    ? (ca ||
                        ((B = document.createElement("canvas")),
                        (B.width = ma),
                        (B.height = ua),
                        (U = B.getContext("2d")),
                        U.createImageData(ma, ua),
                        (ca = !0)),
                      null.data.set(ba),
                      U.putImageData(null, 0, 0),
                      c.texImage2D(c.TEXTURE_2D, 0, Wa, Xa, Ha, B))
                    : c.texImage2D(c.TEXTURE_2D, 0, Wa, ma, ua, 0, Xa, Ha, ba);
                  h[l] = fa;
                  ab && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !1);
                },
                Sq: function (ba, wa) {
                  a(na);
                  wa && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !0);
                  c.texImage2D(c.TEXTURE_2D, 0, Wa, Xa, Ha, ba);
                  h[l] = fa;
                  wa && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !1);
                },
                cc: function (ba, wa) {
                  var Za = ma * ua,
                    Ia = 4 * Za;
                  ba = Q.U ? (ba ? "RGBE" : "JSON") : "RGBA";
                  wa && (ba = wa);
                  wa = Fa.ma() && !1;
                  var wb = null;
                  switch (ba) {
                    case "RGBE":
                      wb = "s13";
                      break;
                    case "JSON":
                      wb = wa ? "s0" : "s15";
                      break;
                    case "RGBA":
                    case "RGBAARRAY":
                      wb = "s7";
                  }
                  sa ||
                    ("RGBA" === ba || "RGBE" === ba || "RGBAARRAY" === ba
                      ? ((ja = new Uint8Array(Ia)), (sa = !0))
                      : "JSON" !== ba || wa || O());
                  Ca.aa();
                  Z.set(wb);
                  Ta.h(0);
                  Ia = null;
                  if ("RGBA" === ba || "RGBE" === ba || "RGBAARRAY" === ba) {
                    c.viewport(0, 0, ma, ua);
                    W.l(!0, !0);
                    c.readPixels(0, 0, ma, ua, c.RGBA, c.UNSIGNED_BYTE, ja);
                    if ("RGBAARRAY" === ba) return { data: ja };
                    k ||
                      ((D = document.createElement("canvas")),
                      (M = D.getContext("2d")),
                      (k = !0));
                    D.width = ma;
                    D.height = ua;
                    Za = M.createImageData(ma, ua);
                    Za.data.set(ja);
                    M.putImageData(Za, 0, 0);
                    Ia = D.toDataURL("image/png");
                  } else if ("JSON" === ba)
                    if (wa)
                      (Ia = new Float32Array(Za)),
                        c.viewport(0, 0, ma, ua),
                        W.l(!0, !0),
                        c.readPixels(0, 0, ma, ua, c.RGBA, c.FLOAT, Ia);
                    else {
                      for (Ia = 0; 4 > Ia; ++Ia)
                        c.viewport(0, ua * Ia, ma, ua),
                          Z.za("u15", C[Ia]),
                          W.l(!Ia, !Ia);
                      Ta.bj();
                      Ia = Array(Za);
                      for (wa = 0; wa < Za; ++wa)
                        (Ia[4 * wa] = Da[0][wa]),
                          (Ia[4 * wa + 1] = Da[1][wa]),
                          (Ia[4 * wa + 2] = Da[2][wa]),
                          (Ia[4 * wa + 3] = Da[3][wa]);
                    }
                  return {
                    format: ba,
                    data: Ia,
                    width: ma,
                    height: ua,
                    isMirrorY: Q.isMirrorY,
                    isFlipY: "RGBA" === ba ? Q.isFlipY : !Q.isFlipY,
                  };
                },
              };
              Q.isMipmap && !Ib && Ma && !Qb && (Ta.Dc(), (Qb = !0));
              if (Q.url)
                a(na),
                  c.texImage2D(
                    c.TEXTURE_2D,
                    0,
                    c.RGBA,
                    1,
                    1,
                    0,
                    c.RGBA,
                    c.UNSIGNED_BYTE,
                    null
                  ),
                  (za = new Image()),
                  (za.zp = "Anonymous"),
                  (za.crossOrigin = "Anonymous"),
                  (za.src = Q.url),
                  (za.onload = function () {
                    ma = za.width;
                    ua = za.height;
                    t();
                  });
              else if (Q.la) {
                var jc = function () {
                  L();
                  ma ? t() : setTimeout(jc, 1);
                };
                jc();
              } else
                Q.array
                  ? (Q.U && !Q.isFloat
                      ? Q.array instanceof Uint16Array
                        ? ((Ea = Q.array), t())
                        : d()
                        ? ((Ea = b(Q.array)), t())
                        : (t(), A.Ph(c, na, Ta.P(), Ta.Z(), Q.array, ab, !0))
                      : ((Ea = Q.isFloat
                          ? Q.array instanceof Float32Array
                            ? Q.array
                            : new Float32Array(Q.array)
                          : Q.array instanceof Uint8Array
                          ? Q.array
                          : new Uint8Array(Q.array)),
                        t()),
                    Q.isKeepArray ||
                      (Ea && Ea !== Q.array && (Ea = null), delete Q.array))
                  : Q.ei
                  ? (Ma = !0)
                  : t();
              Ta.Wp = Ta.P;
              Q.C && Ma && (Q.C(Ta), (Q.C = null));
              z.push(Ta);
              return Ta;
            },
            aa: function (G) {
              G !== l && (c.activeTexture(p[G]), (l = G));
              h[G] = -1;
              a(null);
            },
            Rk: function (G) {
              m.random.h(G);
            },
            re: function () {
              r = null;
              c.framebufferTexture2D(
                Ca.qf(),
                c.COLOR_ATTACHMENT0,
                c.TEXTURE_2D,
                null,
                0
              );
            },
            reset: function () {
              0 !== l && c.activeTexture(p[0]);
              for (var G = 0; G < p.length; ++G) h[G] = -1;
              l = -1;
            },
            tq: function () {
              l = -1;
            },
            Sj: function () {
              for (var G = 0; G < p.length; ++G) A.aa(G);
            },
            I: function () {
              m && (m.random.remove(), m.Qj.remove());
            },
            Zc: function (G, L) {
              if ("RGBA" === G.format || "RGBE" === G.format) {
                var q = new Image();
                q.src = G.data;
                q.onload = function () {
                  A.instance({
                    isMirrorY: G.isMirrorY,
                    isFlipY: G.isFlipY,
                    isFloat: !1,
                    la: q,
                    C: function (t) {
                      if ("RGBA" === G.format) L(t);
                      else {
                        var R = G.width,
                          O = G.height,
                          ia = A.instance({
                            isMirrorY: G.isMirrorY,
                            isFloat: !0,
                            width: R,
                            height: O,
                            isFlipY: G.isFlipY,
                          });
                        Ca.ba();
                        c.viewport(0, 0, R, O);
                        Z.set("s14");
                        ia.o();
                        t.h(0);
                        W.l(!0, !0);
                        A.aa(0);
                        L(ia);
                        Fa.flush();
                        t.remove();
                      }
                    },
                  });
                };
              } else
                "JSON" === G.format
                  ? L(
                      A.instance({
                        isFloat: !0,
                        isFlipY: G.isFlipY,
                        width: G.width,
                        height: G.height,
                        array: new Float32Array(G.data),
                      })
                    )
                  : L(!1);
            },
            cl: b,
            A: function () {
              r && (Ca.ba(), A.re(), Ca.aa());
              A.Sj();
              z.slice(0).forEach(function (G) {
                G.remove();
              });
              z.splice(0);
              x = !1;
              u = 0;
              "undefined" !== typeof Db && Db.A();
              m = null;
            },
          };
        return A;
      })(),
      Cc = {
        instance: function (a) {
          var b = [aa.instance(a), aa.instance(a)],
            d = [b[1], b[0]],
            f = d,
            l = {
              qj: function (p) {
                f[1].o();
                f[0].h(p);
                l.Ej();
              },
              rj: function (p) {
                f[1].L();
                f[0].h(p);
                l.Ej();
              },
              Ej: function () {
                f = f === b ? d : b;
              },
              refresh: function () {
                f[0].refresh();
                f[1].refresh();
              },
              h: function (p) {
                f[0].h(p);
              },
              xa: function (p) {
                f[0].xa(p);
              },
              Qk: function (p) {
                f[1].h(p);
              },
              Xh: function () {
                return f[0];
              },
              Up: function () {
                return f[1];
              },
              Vg: function (p) {
                f[0].Vg(p);
                f[1].Vg(p);
              },
              remove: function () {
                f[0].remove();
                f[1].remove();
                f = null;
              },
              sync: function () {
                l.rj(0);
                Z.set("s0");
                W.l(!1, !1);
              },
            };
          return l;
        },
      },
      W = (function () {
        function a(m) {
          var r = { ka: null, indices: null };
          r.ka = m.createBuffer();
          m.bindBuffer(m.ARRAY_BUFFER, r.ka);
          m.bufferData(
            m.ARRAY_BUFFER,
            new Float32Array([-1, -1, 3, -1, -1, 3]),
            m.STATIC_DRAW
          );
          r.indices = m.createBuffer();
          m.bindBuffer(m.ELEMENT_ARRAY_BUFFER, r.indices);
          m.bufferData(
            m.ELEMENT_ARRAY_BUFFER,
            new Uint16Array([0, 1, 2]),
            m.STATIC_DRAW
          );
          return r;
        }
        var b = null,
          d = 0,
          f = !1,
          l = [],
          p = -2,
          u = -2,
          h = {
            reset: function () {
              u = p = -2;
            },
            m: function () {
              f || ((b = a(c)), h.md(), (f = !0));
            },
            instance: function (m) {
              var r = d++,
                w = m.indices ? m.indices.length : 0,
                H = "undefined" === typeof m.mode ? c.STATIC_DRAW : m.mode,
                y = c.createBuffer();
              c.bindBuffer(c.ARRAY_BUFFER, y);
              c.bufferData(
                c.ARRAY_BUFFER,
                m.ka instanceof Float32Array ? m.ka : new Float32Array(m.ka),
                H
              );
              p = r;
              var x = null,
                z = null,
                g = null;
              if (m.indices) {
                x = c.createBuffer();
                c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, x);
                var k = null;
                65536 > m.indices.length
                  ? ((k = Uint16Array), (z = c.UNSIGNED_SHORT), (g = 2))
                  : ((k = Uint32Array), (z = c.UNSIGNED_INT), (g = 4));
                k = m.indices instanceof k ? m.indices : new k(m.indices);
                c.bufferData(c.ELEMENT_ARRAY_BUFFER, k, H);
                u = r;
              }
              var D = {
                yc: function (M) {
                  p !== r && (c.bindBuffer(c.ARRAY_BUFFER, y), (p = r));
                  M && xb.ie();
                },
                Nk: function () {
                  u !== r && (c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, x), (u = r));
                },
                bind: function (M) {
                  D.yc(M);
                  D.Nk();
                },
                V: function () {
                  c.drawElements(c.TRIANGLES, w, z, 0);
                },
                Ma: function (M, C) {
                  c.drawElements(c.TRIANGLES, M, z, C * g);
                },
                remove: function () {
                  c.deleteBuffer(y);
                  m.indices && c.deleteBuffer(x);
                  D = null;
                },
              };
              l.push(D);
              return D;
            },
            md: function () {
              -1 !== p && (c.bindBuffer(c.ARRAY_BUFFER, b.ka), (p = -1));
              -1 !== u &&
                (c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, b.indices), (u = -1));
            },
            l: function (m, r) {
              m && W.md();
              r && xb.fc();
              c.drawElements(c.TRIANGLES, 3, c.UNSIGNED_SHORT, 0);
            },
            Qb: function (m) {
              m = m || c;
              var r = a(m);
              m.bindBuffer(m.ARRAY_BUFFER, r.ka);
              m.bindBuffer(m.ELEMENT_ARRAY_BUFFER, r.indices);
              xb.hc(m);
              m.clear(m.COLOR_BUFFER_BIT);
              m.drawElements(m.TRIANGLES, 3, m.UNSIGNED_SHORT, 0);
              m.flush();
              m.bindBuffer(m.ARRAY_BUFFER, null);
              m.bindBuffer(m.ELEMENT_ARRAY_BUFFER, null);
              m.deleteBuffer(r.ka);
              m.deleteBuffer(r.indices);
              h.reset();
              f && (h.md(), xb.fc());
            },
            I: function () {
              var m = c,
                r = b;
              m.deleteBuffer(r.ka);
              m.deleteBuffer(r.indices);
            },
            A: function () {
              h.I();
              l.forEach(function (m) {
                m.remove();
              });
              c.bindBuffer(c.ARRAY_BUFFER, null);
              c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, null);
              h.reset();
              f = !1;
              l.splice(0);
              d = 0;
            },
          };
        return h;
      })(),
      Ca = (function () {
        var a = null,
          b = null,
          d = null,
          f = !1,
          l = [],
          p = { oa: -2, Oh: 1 },
          u = {
            Zb: function () {
              return f;
            },
            m: function () {
              if (!f) {
                a = c.createFramebuffer();
                var h = Fa.ma();
                b =
                  h && c.DRAW_FRAMEBUFFER ? c.DRAW_FRAMEBUFFER : c.FRAMEBUFFER;
                d =
                  h && c.READ_FRAMEBUFFER ? c.READ_FRAMEBUFFER : c.FRAMEBUFFER;
                f = !0;
              }
            },
            Sl: function () {
              return b;
            },
            Vh: function () {
              return d;
            },
            qf: function () {
              return c.FRAMEBUFFER;
            },
            Vp: function () {
              return p;
            },
            Lp: function () {
              return a;
            },
            instance: function (h) {
              void 0 === h.Gc && (h.Gc = !1);
              var m = h.$ ? h.$ : null,
                r = h.width,
                w = void 0 !== h.height ? h.height : h.width,
                H = a,
                y = null,
                x = !1,
                z = !1,
                g = 0;
              m && ((r = r ? r : m.P()), (w = w ? w : m.Z()));
              var k = {
                kj: function () {
                  x || ((H = c.createFramebuffer()), (x = !0), (g = p.Oh++));
                },
                gd: function () {
                  k.kj();
                  k.o();
                  y = c.createRenderbuffer();
                  c.bindRenderbuffer(c.RENDERBUFFER, y);
                  c.renderbufferStorage(
                    c.RENDERBUFFER,
                    c.DEPTH_COMPONENT16,
                    r,
                    w
                  );
                  c.framebufferRenderbuffer(
                    b,
                    c.DEPTH_ATTACHMENT,
                    c.RENDERBUFFER,
                    y
                  );
                  c.clearDepth(1);
                },
                bind: function (D, M) {
                  g !== p.oa && (c.bindFramebuffer(b, H), (p.oa = g));
                  m && m.o();
                  M && c.viewport(0, 0, r, w);
                  D && c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
                },
                jh: function () {
                  g !== p.oa && (c.bindFramebuffer(b, H), (p.oa = g));
                },
                clear: function () {
                  c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
                },
                Re: function () {
                  c.clear(c.COLOR_BUFFER_BIT);
                },
                qh: function () {
                  c.clear(c.DEPTH_BUFFER_BIT);
                },
                Wc: function () {
                  c.viewport(0, 0, r, w);
                },
                o: function () {
                  g !== p.oa && (c.bindFramebuffer(b, H), (p.oa = g));
                },
                rtt: function (D) {
                  m = D;
                  p.oa !== g &&
                    (c.bindFramebuffer(c.FRAMEBUFFER, H), (p.oa = g));
                  D.o();
                },
                aa: function () {
                  c.bindFramebuffer(b, null);
                  p.oa = -1;
                },
                resize: function (D, M) {
                  r = D;
                  w = M;
                  y &&
                    (c.bindRenderbuffer(c.RENDERBUFFER, y),
                    c.renderbufferStorage(
                      c.RENDERBUFFER,
                      c.DEPTH_COMPONENT16,
                      r,
                      w
                    ));
                },
                remove: function () {
                  H === a ||
                    z ||
                    (c.bindFramebuffer(b, H),
                    c.framebufferTexture2D(
                      b,
                      c.COLOR_ATTACHMENT0,
                      c.TEXTURE_2D,
                      null,
                      0
                    ),
                    y &&
                      c.framebufferRenderbuffer(
                        b,
                        c.DEPTH_ATTACHMENT,
                        c.RENDERBUFFER,
                        null
                      ),
                    c.bindFramebuffer(b, null),
                    c.deleteFramebuffer(H),
                    y && c.deleteRenderbuffer(y));
                  z = !0;
                },
              };
              h.Gc && k.gd();
              l.push(k);
              return k;
            },
            aa: function () {
              c.bindFramebuffer(b, null);
              p.oa = -1;
            },
            Qq: function () {
              c.bindFramebuffer(b, null);
              c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
              Fa.Bj();
              p.oa = -1;
            },
            reset: function () {
              p.oa = -2;
            },
            ba: function () {
              0 !== p.oa && (c.bindFramebuffer(b, a), (p.oa = 0));
            },
            clear: function () {
              Fa.Bj();
              c.clear(c.COLOR_BUFFER_BIT);
            },
            A: function () {
              u.aa();
              l.forEach(function (h) {
                h.remove();
              });
              null !== a && (c.deleteFramebuffer(a), (a = null));
              u.reset();
              f = !1;
              l.splice(0);
              p.Oh = 1;
            },
          };
        return u;
      })(),
      Fa = (function () {
        function a() {
          h = "undefined" === typeof lb ? ha : lb;
          m = !0;
        }
        function b(e, v, J) {
          for (var N = 0; N < v.length; ++N) {
            var A = J.getExtension(v[N] + "_" + e);
            if (A) return A;
          }
          return null;
        }
        function d() {
          null !== k.qe && (clearTimeout(k.qe), (k.qe = null));
          k.Ub = !1;
        }
        function f(e) {
          if (0 === k.wb.length) {
            k.Ba = c.PIXEL_PACK_BUFFER;
            k.wb.splice(0);
            k.Gd.splice(0);
            for (var v = 0; v < k.Ac; ++v)
              k.wb.push(c.createBuffer()), k.Gd.push(-1);
            k.Ua = 0;
            k.bg = 0;
          }
          c.bindBuffer(k.Ba, k.wb[k.Ua]);
          e.byteLength !== k.Gd[k.Ua] &&
            (c.bufferData(k.Ba, e.byteLength, c.STREAM_READ),
            (k.Gd[k.Ua] = e.byteLength));
          k.aq = !0;
        }
        function l() {
          c.bindBuffer(k.Ba, null);
        }
        function p() {
          k.Tb.forEach(function (e) {
            c.deleteSync(e);
          });
          k.Tb.splice(0);
        }
        function u() {
          k.Ua = (k.Ua + 1) % k.Ac;
          ++k.bg;
        }
        var h = null,
          m = !1,
          r = {
            ni: !1,
            Ng: null,
            Og: null,
            vi: !1,
            Jm: !1,
            Pg: null,
            wi: !1,
            Qg: null,
            oi: !1,
            Se: null,
            Am: !1,
            Te: null,
            Bm: !1,
          },
          w = null,
          H = { Wa: !0, Ya: !0, hf: !0, aj: !1 },
          y = null,
          x = !0,
          z = null,
          g = null,
          k = {
            dl: 1,
            Ac: -1,
            Ua: 0,
            bg: 0,
            Ub: !1,
            wb: [],
            Tb: [],
            Gd: [],
            Ba: null,
            qe: null,
          },
          D = "EXT WEBGL OES MOZ_OES WEBKIT_OES KHR".split(" "),
          M = ["OES", "MOZ_OES", "WEBKIT_OES"],
          C = "undefined" === typeof window ? {} : window,
          n = {
            m: function () {
              if (m) return !0;
              n.reset();
              m || a();
              var e = c;
              if (!w.ni) {
                w.Ng = n.Lh(e);
                C.GL_EXT_FLOAT = w.Ng;
                w.vi = w.Ng ? !0 : !1;
                if (w.vi || n.ma())
                  (w.Og = n.Mh(e)),
                    (w.Jm = w.Og ? !0 : !1),
                    (C.GL_EXT_FLOATLINEAR = w.Og);
                w.ni = !0;
              }
              if (!w.oi) {
                w.Pg = n.yd(e);
                w.Pg && ((w.wi = !0), (C.GL_EXT_HALFFLOAT = w.Pg));
                if (w.wi || n.ma())
                  (w.Qg = n.Nh(e)), (C.GL_EXT_HALFFLOATLINEAR = w.Qg);
                w.eq = w.Qg ? !0 : !1;
                w.oi = !0;
              }
              w.Se = n.Jh(e);
              w.Am = w.Se ? !0 : !1;
              C.GL_EXT_COLORBUFFERFLOAT = w.Se;
              w.Te = n.Kh(e);
              w.Bm = w.Te ? !0 : !1;
              C.GL_EXT_COLORBUFFERHALFFLOAT = w.Te;
              Ca.m();
              aa.m();
              if (!n.nl()) return !1;
              W.m();
              aa.um();
              return !0;
            },
            reset: function () {
              w = Object.assign({}, r);
              y = Object.assign({}, H);
            },
            P: function () {
              m || a();
              return h.P();
            },
            Z: function () {
              m || a();
              return h.Z();
            },
            ma: function () {
              m || a();
              return h.ma();
            },
            Ih: function (e) {
              n.Jh(e);
              n.Kh(e);
              n.Lh(e);
              n.Mh(e);
              n.yd(e);
              n.Nh(e);
            },
            Jh: b.bind(null, "color_buffer_float", D),
            Kh: b.bind(null, "color_buffer_half_float", D),
            Lh: b.bind(null, "texture_float", M),
            Mh: b.bind(null, "texture_float_linear", M),
            yd: b.bind(null, "texture_half_float", M),
            Nh: b.bind(null, "texture_half_float_linear", M),
            pf: function (e) {
              var v = n.yd(e);
              return v && v.HALF_FLOAT_OES
                ? v.HALF_FLOAT_OES
                : e.HALF_FLOAT || e.FLOAT;
            },
            Tl: function () {
              return g || c.RGBA32F || c.RGBA;
            },
            Ul: function () {
              return z || c.RGBA16F || c.RGBA;
            },
            Nl: function () {
              return y;
            },
            ha: function () {
              return y.Wa;
            },
            up: function () {
              return y.Ya;
            },
            Wk: function () {
              return y.hf;
            },
            Zk: function () {
              return y.aj && x;
            },
            Pj: function (e) {
              x = e;
              !e && k.Ub && (p(), c.bindBuffer(k.Ba, null), (k.Ub = !1));
            },
            iq: function () {
              return k.Ub;
            },
            oe: function (e, v, J) {
              function N() {
                e.bindTexture(e.TEXTURE_2D, null);
                e.bindFramebuffer(A, null);
                e.deleteTexture(q);
                e.deleteFramebuffer(L);
              }
              var A = e.FRAMEBUFFER,
                G = e.NEAREST,
                L = e.createFramebuffer();
              e.bindFramebuffer(A, L);
              var q = e.createTexture();
              e.activeTexture(e.TEXTURE0);
              e.bindTexture(e.TEXTURE_2D, q);
              e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1);
              e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE);
              e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
              e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, G);
              e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, G);
              e.texImage2D(e.TEXTURE_2D, 0, v, 3, 3, 0, e.RGBA, J, null);
              e.framebufferTexture2D(
                e.FRAMEBUFFER,
                e.COLOR_ATTACHMENT0,
                e.TEXTURE_2D,
                q,
                0
              );
              if (
                e.checkFramebufferStatus(
                  e.READ_FRAMEBUFFER || e.FRAMEBUFFER
                ) !== e.FRAMEBUFFER_COMPLETE
              )
                return N(), !1;
              xb.ge(e);
              e.clearColor(0, 0, 0, 0);
              e.viewport(0, 0, 3, 3);
              e.disable(e.DEPTH_TEST);
              e.clear(e.COLOR_BUFFER_BIT);
              W.Qb(e);
              e.bindFramebuffer(A, null);
              xb.Bb(e);
              e.activeTexture(e.TEXTURE0);
              e.bindTexture(e.TEXTURE_2D, q);
              W.Qb(e);
              v = new Uint8Array(36);
              e.readPixels(0, 0, 3, 3, e.RGBA, e.UNSIGNED_BYTE, v);
              N();
              for (J = 0; 36 > J; ++J)
                if (3 !== J % 4 && 3 < Math.abs(v[J] - 127)) return !1;
              return !0;
            },
            $e: function (e) {
              var v = { Wa: !1, Ya: !1 };
              e.disable(e.BLEND);
              e.clearColor(0, 0, 0, 0);
              e.clear(e.COLOR_BUFFER_BIT);
              e.RGBA32F &&
                n.oe(e, e.RGBA32F, e.FLOAT) &&
                ((v.Wa = !0), (g = e.RGBA32F));
              !v.Wa && n.oe(e, e.RGBA, e.FLOAT) && ((v.Wa = !0), (g = e.RGBA));
              var J = n.pf(e);
              z = null;
              e.RGBA16F &&
                n.oe(e, e.RGBA16F, J) &&
                ((v.Ya = !0), (z = e.RGBA16F));
              !v.Ya && n.oe(e, e.RGBA, J) && ((v.Ya = !0), (z = e.RGBA));
              return v;
            },
            pl: function () {
              var e = Ca.instance({ width: 2 });
              e.kj();
              var v = aa.instance({ width: 2, isFloat: !0, K: 3 });
              e.o();
              v.o();
              n.flush();
              c.checkFramebufferStatus(Ca.Vh()) !== c.FRAMEBUFFER_COMPLETE
                ? (aa.ko(), (y.hf = !1))
                : (y.hf = !0);
              e.remove();
              v.remove();
            },
            ql: function () {
              var e = !1;
              n.ma() &&
                (e =
                  "PIXEL_PACK_BUFFER STREAM_READ SYNC_GPU_COMMANDS_COMPLETE WAIT_FAILED fenceSync deleteSync createBuffer"
                    .split(" ")
                    .every(function (v) {
                      return "undefined" !== typeof c[v];
                    }));
              y.aj = e;
            },
            nl: function () {
              var e = n.$e(c);
              Object.assign(y, e);
              if (!y.Wa && !y.Ya) return !1;
              n.pl();
              n.ql();
              return !0;
            },
            Cn: function (e, v, J, N, A) {
              c.readPixels(e, v, J, N, c.RGBA, c.UNSIGNED_BYTE, A);
              return Promise.resolve(A, !1);
            },
            ng: function (e, v, J, N, A, G, L) {
              if (!n.Zk()) return n.Cn(e, v, J, N, A);
              k.Ac = L || k.dl;
              f(A);
              c.readPixels(e, v, J, N, c.RGBA, c.UNSIGNED_BYTE, 0);
              k.Tb[k.Ua] = c.fenceSync(c.SYNC_GPU_COMMANDS_COMPLETE, 0);
              n.flush();
              var q = !1;
              return new Promise(function (t, R) {
                function O() {
                  if (!k.Ub) return d(), l(), u(), R(), !1;
                  var ia = (k.Ua + 1) % k.Ac;
                  switch (c.clientWaitSync(k.Tb[ia], 0, 0)) {
                    case c.TIMEOUT_EXPIRED:
                    case c.WAIT_FAILED:
                      break;
                    default:
                      return (
                        d(),
                        c.deleteSync(k.Tb[ia]),
                        (k.Tb[ia] = null),
                        c.bindBuffer(k.Ba, k.wb[ia]),
                        c.getBufferSubData(k.Ba, 0, A),
                        l(),
                        u(),
                        t(A, q),
                        !0
                      );
                  }
                  k.qe = setTimeout(O, 0);
                  return !1;
                }
                d();
                k.bg + 1 < k.Ac
                  ? (l(), u(), t(A, !1))
                  : ((k.Ub = !0), O() || !G || q || ((q = !0), G()));
              });
            },
            Bj: function () {
              c.viewport(0, 0, n.P(), n.Z());
            },
            flush: function () {
              c.flush();
            },
            A: function () {
              d();
              p();
              aa.A();
              Ca.A();
              W.A();
              k.wb.forEach(function (e) {
                c.deleteBuffer(e);
              });
              k.wb.splice(0);
              xb.reset();
              m = !1;
            },
          };
        return n;
      })(),
      Db = (function () {
        function a(e, v, J, N) {
          k.texParameteri(
            k.TEXTURE_2D,
            k.TEXTURE_MIN_FILTER,
            N ? k.NEAREST_MIPMAP_NEAREST : k.LINEAR
          );
          var A = null;
          if (null !== J)
            try {
              A = k.getError();
              if ("FUCKING_BIG_ERROR" === A) return !1;
              k.texImage2D(k.TEXTURE_2D, 0, e, 4, 4, 0, k.RGBA, v, J);
              A = k.getError();
              if (A !== k.NO_ERROR) return !1;
            } catch (G) {
              return !1;
            }
          N && k.generateMipmap(k.TEXTURE_2D);
          k.clear(k.COLOR_BUFFER_BIT);
          W.Qb(k);
          A = k.getError();
          if ("FUCKING_BIG_ERROR" === A) return !1;
          k.readPixels(0, 0, 2, 2, k.RGBA, k.UNSIGNED_BYTE, w);
          A = k.getError();
          A === k.INVALID_OPERATION &&
            "undefined" !== typeof k.PIXEL_PACK_BUFFER &&
            (k.bindBuffer(k.PIXEL_PACK_BUFFER, null),
            k.readPixels(0, 0, 2, 2, k.RGBA, k.UNSIGNED_BYTE, w),
            (A = k.getError()));
          if (A !== k.NO_ERROR) return !1;
          J = !0;
          for (N = 0; 16 > N; ++N) J = J && 4 > Math.abs(w[N] - 127);
          J && ((m.Xi = v), (m.mi = e));
          return J;
        }
        function b(e, v) {
          return D.Wa && a(e, k.FLOAT, new Float32Array(H), v)
            ? ((h = u.gh), !0)
            : !1;
        }
        function d(e, v, J) {
          if (!D.Ya) return !1;
          var N = aa.cl(H),
            A = Fa.yd(k);
          if (
            (A && A.HALF_FLOAT_OES && a(e, A.HALF_FLOAT_OES, N, v)) ||
            (k.HALF_FLOAT && a(e, k.HALF_FLOAT, N, v))
          )
            return (h = u.sc), !0;
          N = new Float32Array(H);
          if (a(e, k.FLOAT, N, v)) return (h = u.sc), !0;
          k.bindTexture(k.TEXTURE_2D, J);
          k.texImage2D(
            k.TEXTURE_2D,
            0,
            k.RGBA,
            2,
            2,
            0,
            k.RGBA,
            k.UNSIGNED_BYTE,
            null
          );
          k.bindFramebuffer(m.td, n);
          aa.Ph(k, J, 2, 2, N, !1, !1);
          k.bindFramebuffer(m.td, null);
          k.bindTexture(k.TEXTURE_2D, J);
          return a(e, null, null, v) ? ((h = u.sc), !0) : !1;
        }
        function f(e, v, J) {
          r = !0;
          if (d(e, !0, J) || b(v, !0)) return !0;
          r = !1;
          return d(e, !1, J) || b(v, !1) ? !0 : !1;
        }
        function l(e) {
          if (h === u.M) {
            k = e || c;
            h = u.RGBA8;
            r = !0;
            Fa.Ih(k);
            D || (D = Fa.$e(k));
            Ca.reset();
            n = k.createFramebuffer();
            m.td = k.DRAW_FRAMEBUFFER || k.FRAMEBUFFER;
            k.bindFramebuffer(m.td, null);
            k.clearColor(0, 0, 0, 0);
            k.viewport(0, 0, 2, 2);
            Z.M();
            M = Z.Bb(k);
            e = k.createTexture();
            k.activeTexture(k.TEXTURE0);
            k.bindTexture(k.TEXTURE_2D, e);
            k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_S, k.REPEAT);
            k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_T, k.REPEAT);
            k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MAG_FILTER, k.NEAREST);
            C = e;
            var v = (e = k.RGBA),
              J = k.RGBA16F,
              N = k.RGBA32F;
            N && (e = N);
            J && (v = J);
            if ((J || N) && f(v, e, C)) return p(), !0;
            e = v = k.RGBA;
            if (f(v, e, C)) return p(), !0;
            h = u.RGBA8;
            p();
            return !1;
          }
        }
        function p() {
          k.deleteProgram(M.pa);
          k.deleteTexture(C);
          C = M = null;
        }
        for (
          var u = { M: -1, gh: 3, sc: 2, RGBA8: 0 },
            h = u.M,
            m = { Xi: null, mi: null, td: null },
            r = !0,
            w = new Uint8Array(16),
            H = Array(64),
            y = 0;
          4 > y;
          ++y
        )
          for (var x = 0; 4 > x; ++x) {
            var z = 0 === (x + y) % 2 ? 1 : 0,
              g = 4 * y + x;
            H[4 * g] = z;
            H[4 * g + 1] = z;
            H[4 * g + 2] = z;
            H[4 * g + 3] = z;
          }
        var k = null,
          D = null,
          M = null,
          C = null,
          n = null;
        return {
          Xk: function (e) {
            l(e);
            return r;
          },
          oh: function (e, v) {
            h === u.M && (typeof ("undefined" !== v) && (D = v), l(e));
            return h !== u.RGBA8;
          },
          fq: function (e) {
            l(e);
            return h === u.gh;
          },
          Mm: function (e) {
            l(e);
            return h === u.sc;
          },
          Rp: function (e) {
            l(e);
            return m.Xi;
          },
          Vl: function (e) {
            l(e);
            return m.mi;
          },
          A: function () {
            k = null;
            r = !0;
            h = u.M;
            D = null;
          },
        };
      })(),
      bd = {
        instance: function (a) {
          function b() {
            y && y.remove();
            y = aa.instance({
              isFloat: !1,
              isPot: !1,
              width: a.size * a.Ca[0],
              height: a.size * a.Ca[1],
            });
          }
          var d = null,
            f = !1,
            l = !1,
            p = null,
            u = !1,
            h = !1,
            m = null,
            r = "undefined" === typeof a.preprocessing ? !1 : a.preprocessing,
            w =
              "undefined" === typeof a.preprocessingSize
                ? a.size
                : a.preprocessingSize;
          a.mask &&
            ((f = !0),
            I && void 0 !== I.da && (a.mask = I.da + a.mask),
            (d = aa.instance({ isFloat: !1, url: a.mask })));
          var H = !1;
          a.customInputShader &&
            ((H = "s50"),
            Z.na({
              name: "_",
              id: H,
              g: a.customInputShader,
              Rq: ["uSource"],
              precision: "lowp",
            }),
            Z.j(H, [{ type: "1i", name: "_", value: 0 }]));
          switch (r) {
            case "sobel":
              m = "s39";
              u = !0;
              break;
            case "meanNormalization":
              m = "s40";
              u = !0;
              break;
            case "grayScale":
              m = "s36";
              u = !1;
              break;
            case "grayScaleTilt":
              m = "s37";
              h = !0;
              u = !1;
              break;
            case "rgbGrayTilt":
              m = "s38";
              h = !0;
              u = !1;
              break;
            case "copy":
              m = H ? H : "s0";
              break;
            case "inputLightRegulation":
              m = H ? H : "s36";
              p = rd.instance({ li: w, Ri: a.size, Mi: a.nBlurPass, Da: !1 });
              l = !0;
              break;
            case "inputMix0":
              m = "none";
              p = sd.instance({
                fa: w,
                jb: a.varianceMin,
                Ta: a.blurKernelSizePx,
                gain: a.gain || 1,
                Da: !1,
              });
              l = !0;
              break;
            case "inputMix1":
              m = "none";
              p = td.instance({
                fa: w,
                jb: a.varianceMin,
                Ta: a.blurKernelSizePx,
                gain: a.gain || 1,
                Da: !1,
              });
              l = !0;
              break;
            case "inputCut4":
              m = "none";
              p = ud.instance({
                fa: w,
                jb: a.varianceMin,
                Ta: a.blurKernelSizePx,
                gain: a.gain || 1,
                Ic: a.isNormalized || !1,
                hg: a.overlap || 0,
                Da: !1,
              });
              w *= p.Wl();
              l = !0;
              break;
            case "direct":
            case "none":
            case "abort":
              m = "abort";
              break;
            default:
              m = "s4";
          }
          w = Math.ceil(w);
          h && Z.j(m, [{ name: "u29", type: "1f", value: a.tilt }]);
          f && (m += "Mask");
          var y = null;
          b();
          var x = {
            P: function () {
              return a.size;
            },
            Xl: function () {
              return w;
            },
            rf: function () {
              return x.P();
            },
            am: function () {
              return l ? p.Ec() : y;
            },
            se: function (z) {
              a.Ca = z;
              b();
            },
            ya: function (z) {
              Ca.ba();
              if ("abort" === m) return z.h(0), z;
              "none" !== m &&
                (Z.set(m),
                u && Z.D("u30", 1 / a.size),
                y.L(),
                f && d.h(1),
                W.l(!1, !1),
                y.h(0),
                (z = y));
              l && p.process(z);
            },
            A: function () {
              y.remove();
              f && d.remove();
            },
          };
          return x;
        },
      },
      cd = {
        instance: function (a) {
          function b() {
            if (n.lc) {
              l.input && (l.input.remove(), l.Jd.remove());
              var v = a.size * a.sparsity;
              C = Math.log(v / a.size) / Math.log(2);
              l.input = aa.instance({
                isMipmap: !0,
                isFloat: !0,
                isPot: !0,
                width: v * a.Ca[0],
                height: v * a.Ca[1],
                Uf: C,
              });
              l.Jd = aa.instance({
                isFloat: !0,
                isPot: !0,
                width: a.size * a.Ca[0],
                height: a.size * a.Ca[1],
              });
            }
          }
          function d() {
            l.zb && l.zb.remove();
            l.zb = aa.instance({
              isFloat: !0,
              isPot: !u,
              isLinear: !u && h.isLinear,
              width: a.size * a.Ca[0],
              height: a.size * a.Ca[1],
            });
          }
          function f(v) {
            h.buffer.forEach(function (J, N) {
              h.results[N][0] = v[0][J];
              h.results[N][1] = v[1][J];
              h.results[N][2] = v[2][J];
              h.results[N][3] = v[3][J];
            });
            return h.results;
          }
          a.normalize = a.normalize || !1;
          var l = {
              input: null,
              bias: null,
              Jd: null,
              zb: null,
              gg: null,
              eg: null,
              fg: null,
            },
            p = null,
            u = !0,
            h = {
              type: "undef",
              C: null,
              isLinear: !1,
              buffer: [],
              results: [],
              Ld: !1,
            },
            m = -1,
            r = a.isReorganize ? a.isReorganize : !1,
            w = a.kernelsCount ? !0 : !1,
            H = [a.Hc ? "s32" : "s31", a.Hc ? "s34" : "s33", "s35"][
              a.shiftRGBAMode || 0
            ],
            y = { isEnabled: !1 },
            x = 1 / a.size;
          a.Gm
            ? ((a.sparsity =
                "undefined" !== typeof a.sparsity ? a.sparsity : a.ce.rf()),
              (u = !1))
            : "full" === a.connectivityUp && (a.sparsity = a.ce.rf());
          var z = {
              elu: "s19",
              elu01: "s20",
              relu: "s17",
              gelu: "s18",
              arctan: "s21",
              arctan2: "s22",
              sigmoid: "s16",
              copy: "s0",
            }[a.activation],
            g = a.sparsity * a.sparsity,
            k = !1,
            D = a.size,
            M = "";
          if (a.maxPooling) {
            switch (a.maxPooling.size) {
              case 2:
                M = "s41";
                break;
              case 4:
                M = "s42";
            }
            k = !0;
            D /= a.maxPooling.size;
            l.eg = aa.instance({ isFloat: !0, isPot: !1, width: D });
          }
          var C = -1,
            n = null;
          u && d();
          l.bias = aa.instance(a.bias);
          var e = {
            P: function () {
              return a.size;
            },
            rf: function () {
              return D;
            },
            Sh: function () {
              return a.classesCount;
            },
            Ok: function (v) {
              p.h(v);
            },
            tn: function () {
              a.remap &&
                a.remap.isEnabled &&
                (y = {
                  isEnabled: !0,
                  Zm: aa.instance(a.remap.maskTexture),
                  Mc: a.remap.layers.map(function (v) {
                    return a.parent.Yl(v);
                  }),
                  depth: a.remap.depth,
                });
            },
            lo: function () {
              switch (a.connectivityUp) {
                case "direct":
                  n = vd.instance(a.connectivity);
                  break;
                case "square":
                  n = wd.instance(a.connectivity);
                  break;
                case "squareFast":
                  n = xd.instance(a.connectivity, a.activation);
                  break;
                case "full":
                  n = yd.instance(Object.assign({ Hc: a.Hc }, a.connectivity));
                  break;
                case "conv":
                  (m = a.kernelsCount),
                    (n = zd.instance(a.connectivity)),
                    r &&
                      (l.gg = aa.instance({
                        width: D,
                        isFloat: !0,
                        isFlipY: !1,
                        isPot: !1,
                      }));
              }
              b();
            },
            ya: function (v, J) {
              p = v;
              n.lc
                ? (l.input.L(),
                  w && l.bias.h(2),
                  n.ya(y),
                  l.input.h(0),
                  l.input.Kl(C),
                  l.Jd.L(),
                  w ? Z.set("s0") : (Z.set(H), Z.D("u4", g), l.bias.h(1)),
                  l.input.Pk(C, 0),
                  W.l(!1, !1),
                  Z.set(z),
                  l.zb.o(),
                  l.Jd.h(0),
                  W.l(!1, !1))
                : (l.zb.L(), l.bias.h(1), n.ya());
              if (u)
                return (
                  (J = l.zb),
                  k &&
                    (l.eg.L(),
                    J.h(0),
                    Z.set(M),
                    Z.O("u14", x, x),
                    W.l(!1, !1),
                    (J = l.eg)),
                  r &&
                    (l.gg.o(),
                    Z.set("s24"),
                    Z.O("u18", m, D / m),
                    J.h(0),
                    W.l(!1, !1),
                    (J = l.gg)),
                  J.h(0),
                  J
                );
              var N = l.zb;
              if (a.normalize || h.Ld)
                (v = a.normalize),
                  Z.set(h.Ld ? "s9" : "s8"),
                  Z.D("u10", v ? x : 1),
                  l.fg.L(),
                  N.h(0),
                  W.l(!1, !1),
                  (N = l.fg);
              v = null;
              switch (h.type) {
                case "cpuRGBA2Float":
                  N.Bh(!1);
                  J ? (v = e.xn(N).then(h.C)) : ((N = e.yn(N)), h.C(N));
                  break;
                case "cpuMeanFloat":
                  N.Bh(!0);
                  if (J) v = N.An().then(h.C);
                  else {
                    N = N.Bn();
                    for (var A = 0; A < N.length; ++A);
                    h.C(N);
                  }
                  break;
                case "gpuRawAvg":
                case "gpuRaw":
                  N.h(0);
                case "none":
                  null !== h.C && h.C(N);
              }
              J && null === v && (v = Promise.resolve());
              return v;
            },
            se: function (v) {
              a.Ca = v;
              b();
              d();
            },
            to: function (v) {
              v &&
                ((h.type = v.Yd || "none"),
                (h.C = v.Xd || null),
                (h.isLinear = v.dg ? !0 : !1));
              d();
              v =
                "undefined" !== typeof a.classesCount && a.classesCount
                  ? a.classesCount
                  : a.size * a.size;
              for (var J = 0, N = 0, A = 0; J < v; ++J)
                h.buffer.push(N + (a.size - 1 - A) * a.size),
                  h.results.push([-1, -1, -1, -1]),
                  ++N,
                  N === a.size && ((N = 0), ++A);
              h.Ld = "gpuRawAvg" === h.type || "cpuMeanFloat" === h.type;
              if (a.normalize || h.Ld)
                l.fg = aa.instance({ isFloat: !0, isPot: !0, width: a.size });
            },
            xn: function (v) {
              return v.zn().then(f);
            },
            yn: function (v) {
              v = v.bj();
              f(v);
              return h.results;
            },
            A: function () {
              for (var v in l) {
                var J = l[v];
                J && J.remove();
              }
              n && (n.A(), (n = null));
            },
          };
          a.ce && e.lo(a.ce);
          return e;
        },
      },
      vd = {
        instance: function (a) {
          var b = aa.instance(a.weights);
          return {
            lc: !0,
            Dd: function () {
              return 1;
            },
            A: function () {
              b.remove();
            },
            om: function () {
              return b;
            },
            ya: function () {
              Z.set("s30");
              b.h(1);
              W.l(!1, !1);
            },
          };
        },
      },
      yd = {
        instance: function (a) {
          var b = a.fromLayerSize,
            d = aa.instance(a.weights),
            f = a.Hc ? "s27" : "s26";
          return {
            lc: !0,
            Dd: function () {
              return b;
            },
            A: function () {
              d.remove();
            },
            ya: function (l) {
              if (l.isEnabled) {
                Z.set("s28");
                l.Zm.h(3);
                for (var p = Math.min(l.Mc.length, l.depth), u = 0; u < p; ++u)
                  l.Mc[u].Ok(4 + u);
              } else Z.set(f);
              Z.D("u8", a.toLayerSize);
              Z.D("u9", a.fromLayerSize);
              d.h(1);
              W.l(!1, !1);
            },
          };
        },
      },
      wd = {
        instance: function (a) {
          for (
            var b = a.fromLayerSize,
              d = a.toLayerSize,
              f = a.toSparsity,
              l = f * d,
              p = l / b,
              u = b / d,
              h = 0,
              m = 0,
              r = 0,
              w = Array(f * d * f * d * 4),
              H = Array(f * d * f * d * 4),
              y = Array(b * b),
              x = 0;
            x < y.length;
            ++x
          )
            y[x] = 0;
          x = Math.floor(f / 2);
          for (var z = 0.5 / d, g = 0.5 / b, k = 0.5 / l, D = 0; D < d; ++D)
            for (var M = Math.round(D * u), C = 0; C < d; ++C) {
              var n = Math.round(C * u),
                e = D / d,
                v = C / d;
              e += z;
              v += z;
              for (var J = 0; J < f; ++J) {
                var N = M + J - x;
                0 > N && (N += b);
                N >= b && (N -= b);
                for (var A = 0; A < f; ++A) {
                  var G = h / l,
                    L = m / l,
                    q = n + A - x;
                  0 > q && (q += b);
                  q >= b && (q -= b);
                  var t = N / b,
                    R = q / b;
                  L = 1 - L - 1 / l;
                  t += g;
                  R += g;
                  G += k;
                  L += k;
                  var O = D * f + J,
                    ia = C * f + A;
                  ia = d * f - ia - 1;
                  O = ia * d * f + O;
                  w[4 * O] = G;
                  w[4 * O + 1] = L;
                  w[4 * O + 2] = t;
                  w[4 * O + 3] = R;
                  R = y[q * b + N]++;
                  O = R % p;
                  t = N * p + O;
                  q = q * p + (R - O) / p;
                  q = b * p - 1 - q;
                  q = q * b * p + t;
                  H[4 * q] = G;
                  H[4 * q + 1] = L;
                  H[4 * q + 2] = e;
                  H[4 * q + 3] = v;
                  ++h >= l && ((h = 0), ++m);
                  ++r;
                }
              }
            }
          y = null;
          var Y = aa.instance(a.weights);
          delete a.weights.data;
          var Q = aa.instance({
            width: l,
            isFloat: !0,
            array: new Float32Array(H),
            isPot: !0,
          });
          H = null;
          var fa = aa.instance({
            width: l,
            isFloat: !0,
            array: new Float32Array(w),
            isPot: !0,
          });
          w = null;
          return {
            lc: !0,
            Dd: function () {
              return p;
            },
            A: function () {
              Q.remove();
              fa.remove();
              Y.remove();
            },
            ya: function () {
              Z.set("s25");
              Y.h(1);
              fa.h(2);
              W.l(!1, !1);
            },
          };
        },
      },
      zd = {
        instance: function (a) {
          var b = a.kernelsCount,
            d = a.toSparsity,
            f = (d * a.toLayerSize) / a.fromLayerSize,
            l = a.inputScale || [1, 1],
            p = aa.instance(a.weights);
          return {
            lc: !0,
            Dd: function () {
              return f;
            },
            Yp: function () {
              return d;
            },
            om: function () {
              return p;
            },
            A: function () {
              p.remove();
            },
            ya: function () {
              Z.set("s29");
              Z.Ag("u28", l);
              Z.D("u26", b);
              Z.D("u27", d);
              Z.D("u8", a.toLayerSize);
              Z.D("u9", a.fromLayerSize);
              p.h(1);
              W.l(!1, !1);
            },
          };
        },
      },
      xd = {
        instance: function (a, b) {
          var d = a.fromLayerSize,
            f = a.toLayerSize,
            l = a.toSparsity,
            p = a.stride ? a.stride : 1,
            u = (l * f) / d,
            h = f < d,
            m = d / f,
            r = aa.instance(a.weights),
            w =
              "s51" +
              [d.toString(), f.toString(), l.toString(), p.toString(), b].join(
                "_"
              );
          Z.Gl(w) ||
            ((a = Ya(b)),
            (f = [
              { type: "1f", name: "u8", value: f },
              { type: "1f", name: "u32", value: p },
            ]),
            h && f.push({ type: "1f", name: "u9", value: d }),
            (d = [(h ? u : l).toFixed(1), a]),
            h && d.push(m.toFixed(1)),
            Z.wm(h ? "s47" : "s46", w, d),
            Z.j(
              w,
              f.concat([
                { type: "1i", name: "u6", value: 0 },
                { type: "1i", name: "u3", value: 1 },
                { type: "1i", name: "u7", value: 3 },
              ])
            ));
          return {
            lc: !1,
            Dd: function () {
              return u;
            },
            A: function () {
              r.remove();
            },
            ya: function () {
              Z.set(w);
              r.h(3);
              W.l(!1, !1);
            },
          };
        },
      },
      rd = {
        instance: function (a) {
          var b = a.Mi ? a.Mi : 3,
            d = a.li ? a.li : 64,
            f = a.Ri ? a.Ri : 64,
            l = a.Da ? !0 : !1;
          a = { isFloat: !1, width: d, isPot: !1, isFlipY: !1 };
          var p = aa.instance(a),
            u = aa.instance(a),
            h = aa.instance(a),
            m = aa.instance(a),
            r = aa.instance({ isFloat: !0, width: f, isPot: !1, isFlipY: !1 }),
            w = 1 / d;
          return {
            process: function (H) {
              Z.set("s43");
              m.o();
              W.l(l, !1);
              Z.set("s44");
              for (var y = 0; y < b; ++y)
                p.o(),
                  Z.O("u14", w, 0),
                  W.l(l, !1),
                  h.o(),
                  m.h(0),
                  W.l(l, !1),
                  u.o(),
                  p.h(0),
                  Z.O("u14", 0, w),
                  W.l(l, !1),
                  m.o(),
                  h.h(0),
                  W.l(l, !1),
                  y !== b - 1 && u.h(0);
              Z.set("s45");
              r.o();
              H.h(0);
              u.h(1);
              m.h(2);
              W.l(l, !1);
              r.h(0);
            },
            Ec: function () {
              return r;
            },
          };
        },
      },
      sd = {
        instance: function (a) {
          function b(w) {
            return aa.instance({
              isFloat: w,
              width: d.fa,
              isPot: !1,
              isFlipY: !1,
            });
          }
          var d = Object.assign(
              { jb: 0.1, Ta: 9, fa: 128, gain: 1, Da: !1 },
              a
            ),
            f = b(!1),
            l = [b(!1), b(!1), b(!1)],
            p = [b(!1), b(!1), b(!1)],
            u = b(!0),
            h = [f, p[0], p[1]];
          a =
            "uniform sampler2D u1;const float e=1.1111,g=2.2222;uniform vec2 u33;varying vec2 vv0;void main(){float b=0.,c=0.;for(float a=-e;a<=e;a+=1.){vec2 i=u33*a,j=vv0+i*g;float d=1.2*a/e,f=exp(-d*d);b+=f*texture2D(u1,j).r,c+=f;}b/=c,gl_FragColor=vec4(b,0.,0.,1.);}"
              .replace("1.1111", Math.round((d.Ta - 1) / 2).toFixed(2))
              .replace("2.2222", (1 / d.fa).toFixed(6));
          var m =
              "uniform sampler2D u34,u35,u36,u37;const float f=1.1111;const vec3 g=vec3(1.);const float h=2.2222;varying vec2 vv0;void main(){vec3 a=texture2D(u34,vv0).rgb;float c=texture2D(u35,vv0).r,d=texture2D(u36,vv0).r,i=texture2D(u37,vv0).r,j=a.r*a.r;vec3 b=vec3(c,d,i),k=max(g*f,abs(vec3(j)-b*b)),l=sqrt(k);gl_FragColor=vec4(a.r,h*(a-b)/l);}"
                .replace("1.1111", d.jb.toFixed(4))
                .replace("2.2222", d.gain.toFixed(4)),
            r = { u1: 0 };
          Z.uc([
            {
              id: "s53",
              name: "_",
              g: "uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(.2126,.7152,.0722),g=vec3(1.);void main(){vec3 b=texture2D(u1,vv0).rgb;float a=dot(b,f);gl_FragColor=vec4(a,a,a,a);}",
              u: r,
              i: ["u1"],
              precision: "lowp",
            },
            {
              id: "s54",
              name: "_",
              g: a,
              u: r,
              i: ["u1", "u33"],
              precision: "lowp",
            },
            {
              id: "s55",
              name: "_",
              g: m,
              u: { u34: 0, u35: 1, u36: 2, u37: 3 },
              i: ["u34", "u35", "u36", "u37"],
              precision: "highp",
            },
          ]);
          return {
            process: function () {
              Z.set("s53");
              f.L();
              W.l(d.Da, !1);
              Z.set("s54");
              for (var w = 0; 3 > w; ++w)
                Z.O("u33", 1, 0),
                  l[w].o(),
                  h[w].h(0),
                  W.l(!1, !1),
                  Z.O("u33", 0, 1),
                  p[w].o(),
                  l[w].h(0),
                  W.l(!1, !1);
              Z.set("s55");
              u.o();
              f.h(0);
              p[0].h(1);
              p[1].h(2);
              p[2].h(3);
              W.l(!1, !1);
              u.h(0);
            },
            Ec: function () {
              return u;
            },
          };
        },
      },
      td = {
        instance: function (a) {
          function b(r) {
            return aa.instance({
              isFloat: r,
              width: d.fa,
              isPot: !1,
              isFlipY: !1,
            });
          }
          var d = Object.assign(
              { jb: 0.1, Ta: 9, fa: 128, gain: 1, Da: !1 },
              a
            ),
            f = b(!1),
            l = b(!1),
            p = b(!1),
            u = b(!0);
          a =
            "uniform sampler2D u1;const float e=1.1111,g=2.2222;uniform vec2 u33;varying vec2 vv0;void main(){vec3 b=vec3(0.);float c=0.;for(float a=-e;a<=e;a+=1.){vec2 i=u33*a,j=vv0+i*g;float d=1.2*a/e,f=exp(-d*d);b+=f*texture2D(u1,j).rgb,c+=f;}b/=c,gl_FragColor=vec4(b,1.);}"
              .replace("1.1111", Math.round((d.Ta - 1) / 2).toFixed(2))
              .replace("2.2222", (1 / d.fa).toFixed(6));
          var h =
              "uniform sampler2D u0,u38;const float f=1.1111;const vec3 g=vec3(1.);const float h=2.2222;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);vec3 c=texture2D(u38,vv0).rgb;float d=a.a*a.a;vec3 b=c.rgb,i=max(g*f,abs(vec3(d)-b*b)),j=sqrt(i);gl_FragColor=vec4(a.a,h*(a.rgb-b)/j);}"
                .replace("1.1111", d.jb.toFixed(4))
                .replace("2.2222", d.gain.toFixed(4)),
            m = { u1: 0 };
          Z.uc([
            {
              id: "s56",
              name: "_",
              g: "uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(.2126,.7152,.0722),g=vec3(1.);void main(){vec3 a=texture2D(u1,vv0).rgb;float b=dot(a,f);gl_FragColor=vec4(a.rgb,b);}",
              u: m,
              i: ["u1"],
              precision: "lowp",
            },
            {
              id: "s57",
              name: "_",
              g: a,
              u: m,
              i: ["u1", "u33"],
              precision: "lowp",
            },
            {
              id: "s58",
              name: "_",
              g: h,
              u: { u0: 0, u38: 1 },
              i: ["u0", "u38"],
              precision: "highp",
            },
          ]);
          return {
            process: function () {
              Z.set("s56");
              f.L();
              W.l(d.Da, !1);
              Z.set("s57");
              Z.O("u33", 1, 0);
              l.o();
              f.h(0);
              W.l(!1, !1);
              Z.O("u33", 0, 1);
              p.o();
              l.h(0);
              W.l(!1, !1);
              Z.set("s58");
              u.o();
              f.h(0);
              p.h(1);
              W.l(!1, !1);
              u.h(0);
            },
            Ec: function () {
              return u;
            },
          };
        },
      },
      ud = {
        instance: function (a) {
          function b(w) {
            return aa.instance({
              isFloat: w,
              width: d.fa,
              isPot: !1,
              isFlipY: !1,
            });
          }
          var d = Object.assign(
              { jb: 0.1, Ta: 9, fa: 128, gain: 1, hg: 0, Ic: !1, Da: !1 },
              a
            ),
            f = b(!1),
            l = null,
            p = null,
            u = null;
          d.Ic && ((l = b(!1)), (p = b(!1)), (u = b(!0)));
          a = { u1: 0 };
          var h = [
            {
              id: "s59",
              name: "_",
              g: "uniform sampler2D u1;const float f=1.1111;varying vec2 vv0;const vec3 e=vec3(.2126,.7152,.0722);void main(){vec2 a=vv0*.5*(f+1.);float b=.5*(1.-f),c=dot(texture2D(u1,a).rgb,e),d=dot(texture2D(u1,a+vec2(0.,b)).rgb,e),h=dot(texture2D(u1,a+vec2(b,0.)).rgb,e),i=dot(texture2D(u1,a+vec2(b,b)).rgb,e);gl_FragColor=vec4(c,d,h,i);}".replace(
                "1.1111",
                d.hg.toFixed(4)
              ),
              u: a,
              i: ["u1"],
              precision: "lowp",
            },
          ];
          if (d.Ic) {
            var m =
                "uniform sampler2D u1;const float e=1.1111,g=2.2222;uniform vec2 u33;varying vec2 vv0;void main(){vec4 b=vec4(0.);float c=0.;for(float a=-e;a<=e;a+=1.){vec2 i=u33*a,j=vv0+i*g;float d=1.2*a/e,f=exp(-d*d);b+=f*texture2D(u1,j),c+=f;}gl_FragColor=b/c;}"
                  .replace("1.1111", Math.round((d.Ta - 1) / 2).toFixed(2))
                  .replace("2.2222", (1 / d.fa).toFixed(6)),
              r =
                "uniform sampler2D u0,u38;const float f=1.1111;const vec4 g=vec4(1.);const float h=2.2222;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u38,vv0),d=a*a,b=c,i=max(g*f,abs(d-b*b)),j=sqrt(i);gl_FragColor=h*(a-b)/j;}"
                  .replace("1.1111", d.jb.toFixed(4))
                  .replace("2.2222", d.gain.toFixed(4));
            h.push(
              {
                id: "s60",
                name: "_",
                g: m,
                u: a,
                i: ["u1", "u33"],
                precision: "lowp",
              },
              {
                id: "s61",
                name: "_",
                g: r,
                u: { u0: 0, u38: 1 },
                i: ["u0", "u38"],
                precision: "highp",
              }
            );
          }
          Z.uc(h);
          return {
            process: function () {
              Z.set("s59");
              f.L();
              W.l(d.Da, !1);
              d.Ic
                ? (Z.set("s60"),
                  Z.O("u33", 1, 0),
                  l.o(),
                  f.h(0),
                  W.l(!1, !1),
                  Z.O("u33", 0, 1),
                  p.o(),
                  l.h(0),
                  W.l(!1, !1),
                  Z.set("s61"),
                  u.o(),
                  f.h(0),
                  p.h(1),
                  W.l(!1, !1),
                  u.h(0))
                : f.h(0);
            },
            Wl: function () {
              return 2 - d.hg;
            },
            Ec: function () {
              return d.Ic ? u : f;
            },
          };
        },
      },
      Hb = (function () {
        function a(g, k, D, M, C, n, e) {
          if (!x)
            if (e === n.length) C();
            else {
              switch (n[e]) {
                case "A":
                  D();
                  break;
                case "D":
                  g();
                  break;
                case "S":
                  k()
                    .then(function (v, J) {
                      z.Oj();
                      a(g, k, D, J ? null : M, C, n, ++e);
                    })
                    .catch(function (v) {
                      console.log("An error occurred in the WebAR loop: ", v);
                      C();
                    });
                  return;
                case "R":
                  M && M();
              }
              a(g, k, D, M, C, n, ++e);
            }
        }
        var b = {
            n: 5,
            ag: 1,
            Di: 0,
            Ad: [35, 49],
            xd: [2, 200],
            k: 0.7,
            Io: 200,
            nn: 0.05,
          },
          d = -1,
          f = null,
          l = -1,
          p = -1,
          u = 0,
          h = -1,
          m = -1,
          r = 0,
          w = 0,
          H = b.xd[1],
          y = Math.log(2),
          x = !0,
          z = {
            W: function () {
              switch (d) {
                case -1:
                  return -1;
                case 0:
                  return m + f.Di;
                case 1:
                  return r;
              }
            },
            Th: function (g) {
              return Math.pow(
                Math.min(Math.max(h, 0), f.n - 1) / (f.n - 1),
                g || 1
              );
            },
            m: function (g) {
              f = Object.assign({}, b, g);
              h = m = f.ag;
              d = 0;
              z.reset();
            },
            Oj: function (g) {
              g = ("undefined" === typeof g ? Date.now() : g) || 0;
              var k = Math.min(Math.max(g - w, f.xd[0]), f.xd[1]);
              H = k;
              w = g;
              var D = -1 === l ? 0 : f.k;
              l = Math.min(Math.max(1e3 / k, 5), 120) * (1 - D) + l * D;
              g - p > f.Io &&
                5 < ++u &&
                ((k = f.k),
                (h =
                  h * (1 - k) +
                  (l < f.Ad[0] ? m - 1 : l > f.Ad[1] ? m + 1 : m) * k),
                Math.abs(h - m) > 1 - f.nn &&
                  ((k = Math.min(Math.max(Math.round(h), 0), f.n - 1)),
                  k !== m && ((h = m = k), (l = (f.Ad[1] - f.Ad[0]) / 2))),
                (p = g));
            },
            pg: function (g, k, D, M, C, n) {
              x = !1;
              a(g, k, D, M, C, n, 0);
            },
            stop: function () {
              x = !0;
            },
            fo: function (g) {
              r = g;
              d = 1;
            },
            Ho: function () {
              d = 0;
              z.reset();
            },
            reset: function () {
              H = b.xd[1];
              p = l = -1;
              u = 0;
            },
            Kq: function (g, k, D) {
              D = Math.exp((-y * H) / D);
              return (1 - D) * g + D * k;
            },
            Qp: function () {
              return H;
            },
          };
        return z;
      })(),
      Pc = (function () {
        function a(H, y) {
          var x = H[0] - 0.5;
          H = H[1] - 0.5;
          var z = y[0] - 0.5;
          y = y[1] - 0.5;
          return x * x + H * H - (z * z + y * y);
        }
        var b = {
            Ni: 4,
            Zd: [1.5, 1.5, 2],
            sa: [0.1, 0.1, 0.1],
            ij: 1,
            fa: -1,
            zf: -1,
            Co: 2,
            kn: 1,
            qg: !0,
            El: 0.8,
          },
          d = null,
          f = [],
          l = [],
          p = [],
          u = [0],
          h = [0.5, 0.5, 1],
          m = null,
          r = 0,
          w = [0, 0, 0];
        return {
          m: function (H) {
            d = Object.assign({}, b, H);
            f.splice(0);
            l.splice(0);
            p.splice(0);
            r = 0;
            H = d.Zd[0] * d.sa[0];
            var y = d.Zd[1] * d.sa[1],
              x = 1 / (1 + d.Zd[2] * d.sa[2]),
              z = d.ij * Math.min(d.fa, d.zf),
              g = z / d.fa;
            z /= d.zf;
            var k = 0.5 * d.El;
            k *= k;
            for (var D = 0; D < d.Ni; ++D) {
              var M = [];
              l.push(M);
              var C = Math.pow(x, D),
                n = g * C,
                e = z * C;
              C = n * d.kn;
              p.push(C);
              var v = n * H,
                J = e * y;
              n /= 2;
              e /= 2;
              for (
                var N = 1 + (1 - n - n) / v, A = 1 + (1 - e - e) / J, G = 0;
                G < A;
                ++G
              )
                for (var L = e + G * J, q = L - 0.5, t = 0; t < N; ++t) {
                  var R = n + t * v,
                    O = R - 0.5;
                  O * O + q * q > k || ((R = [R, L, C]), f.push(R), M.push(R));
                }
              d.qg && M.sort(a);
              m = f;
            }
            d.qg && f.sort(a);
          },
          get: function (H) {
            var y = m.length;
            if (0 === y) return h;
            for (; H >= u.length; ) u.push(0);
            u[H] >= y && (u[H] = 0);
            var x = m[Math.floor(u[H]) % y];
            u[H] = (u[H] + 1 / d.Co) % y;
            if (0 === r) return x;
            w[0] = x[0];
            w[1] = x[1];
            w[2] = r;
            return w;
          },
          oq: function (H) {
            H >= u.length || (u[H] = Math.floor(Math.random() * m.length));
          },
          Cq: function (H) {
            r = H;
            if (0 === r) m = f;
            else {
              for (var y = p.length, x = y - 1, z = 0; z < y; ++z)
                if (p[z] <= H) {
                  x = z;
                  break;
                }
              m = l[x];
            }
          },
          reset: function () {
            for (var H = f.length / u.length, y = 0; y < u.length; ++y)
              u[y] = Math.floor(y * H);
            r = 0;
            m = f;
          },
        };
      })(),
      Ab = (function () {
        function a() {
          d(g + x.Vf);
          k.port.postMessage("DONE");
        }
        function b() {
          n.hd = 0 === x.Aa ? M(d) : M(f);
        }
        function d(A) {
          C.Xb &&
            null !== z &&
            ((A -= g),
            (A = Math.min(Math.max(A, x.Fh[0]), x.Fh[1])),
            (g += A),
            p(),
            e.isEnabled && e.Jc && C.Oa && g - e.If > x.fh && (r(), (e.If = g)),
            z(g));
        }
        function f(A) {
          C.Xb && (n.timeout = setTimeout(d.bind(null, A), x.Aa));
        }
        function l() {
          z = null;
          C.Xb = !1;
          p();
        }
        function p() {
          n.hd && (window.cancelAnimationFrame(n.hd), (n.hd = null));
          n.timeout && (window.clearTimeout(n.timeout), (n.timeout = null));
        }
        function u(A) {
          A && !C.Oa
            ? ((C.Oa = !0),
              D && Hb.Ho(),
              k.port.postMessage("STOP"),
              Fa.Pj(!0),
              b())
            : !A &&
              C.Oa &&
              ((C.Oa = !1),
              D && Hb.fo(1),
              Fa.Pj(!1),
              k.port.postMessage("START"));
        }
        function h(A) {
          A.target.hidden ? J() : v();
        }
        function m(A, G, L) {
          G = A.createShader(G);
          A.shaderSource(G, L);
          A.compileShader(G);
          return G;
        }
        function r() {
          e.Jc = !1;
          var A = e.Xa,
            G = e.Hd,
            L = e.Id,
            q = e.Ba;
          A.uniform1f(e.fi, Math.random());
          e.Yb ? G.beginQueryEXT(q, L) : A.beginQuery(q, L);
          A.drawElements(A.POINTS, 1, A.UNSIGNED_SHORT, 0);
          e.Yb ? G.endQueryEXT(q) : A.endQuery(q);
          Fa.flush();
          H()
            .then(function (t) {
              0 === t || isNaN(t)
                ? ((e.isEnabled = !1),
                  console.log(
                    "WARNING in benchmark_GPUClock: WebGL timer queries is not working properly. timeElapsedNs =",
                    t
                  ))
                : ((t = (x.dk * x.eh * 1e3) / t),
                  (e.we = (e.we + 1) % x.rc),
                  (e.Jf[e.we] = t),
                  ++e.Bi > x.rc &&
                    (e.Nd.set(e.Jf),
                    e.Nd.sort(function (R, O) {
                      return R - O;
                    }),
                    (t = e.Nd[Math.floor(x.rc / 2)]),
                    (e.zd = Math.max(e.zd, t)),
                    x.dh(t / e.zd)),
                  (e.Jc = !0));
            })
            .catch(function () {
              e.Jc = !0;
            });
        }
        function w(A) {
          var G = e.Xa,
            L = e.Hd,
            q = e.Id;
          q = e.Yb
            ? L.Kp(q, L.QUERY_RESULT_AVAILABLE_EXT)
            : G.getQueryParameter(q, G.QUERY_RESULT_AVAILABLE);
          G = G.getParameter(L.GPU_DISJOINT_EXT);
          q ? A(!G) : setTimeout(w.bind(null, A), 0.1);
        }
        function H() {
          return new Promise(function (A, G) {
            w(function (L) {
              if (L) {
                L = e.Xa;
                var q = e.Hd,
                  t = e.Id;
                L = e.Yb
                  ? q.getQueryObjectEXT(t, q.QUERY_RESULT_EXT)
                  : L.getQueryParameter(t, L.QUERY_RESULT);
                A(L);
              } else G();
            });
          });
        }
        var y = {
            pi: !0,
            Fh: [1, 200],
            Vf: 20,
            Aa: 0,
            eh: 50,
            dk: 240,
            fh: 3e3,
            rc: 3,
            dh: null,
          },
          x = null,
          z = null,
          g = 0,
          k = null,
          D = !1,
          M = null,
          C = { Na: !1, Oa: !0, Hf: !1, Ff: !1, Ef: !1, Xb: !1 },
          n = { hd: null, timeout: null },
          e = {
            isEnabled: !1,
            Jc: !1,
            Xa: null,
            Hd: null,
            Id: null,
            Ba: null,
            fi: null,
            Yb: !0,
            If: 0,
            Bi: 0,
            Jf: null,
            Nd: null,
            we: 0,
            zd: 0,
          },
          v = u.bind(null, !0),
          J = u.bind(null, !1),
          N = {
            m: function (A) {
              x = Object.assign(y, A);
              Object.assign(C, { Oa: !0, Na: !0, Xb: !1 });
              M =
                window.requestPostAnimationFrame ||
                window.requestAnimationFrame;
              if (null !== x.dh) {
                A = document.createElement("canvas");
                A.setAttribute("width", "1");
                A.setAttribute("height", "1");
                var G = { antialias: !1 };
                A = A.getContext("webgl2", G) || A.getContext("webgl", G);
                if (
                  (G =
                    A.getExtension("EXT_disjoint_timer_query") ||
                    A.getExtension("EXT_disjoint_timer_query_webgl2"))
                ) {
                  e.Xa = A;
                  e.Hd = G;
                  e.isEnabled = !0;
                  e.Yb = G.beginQueryEXT ? !0 : !1;
                  var L = m(
                      A,
                      A.VERTEX_SHADER,
                      "attribute vec4 a0;void main(){gl_Position=a0;}"
                    ),
                    q = m(
                      A,
                      A.FRAGMENT_SHADER,
                      "precision lowp float;uniform float u39;void main(){vec4 a=u39*vec4(1.,2.,3.,4.);for(int b=0;b<666;b+=1)a=cos(a);gl_FragColor=a;}".replace(
                        "666",
                        x.eh.toString()
                      )
                    ),
                    t = A.createProgram();
                  A.attachShader(t, L);
                  A.attachShader(t, q);
                  A.linkProgram(t);
                  L = A.getAttribLocation(t, "a0");
                  e.fi = A.getUniformLocation(t, "u39");
                  A.useProgram(t);
                  A.enableVertexAttribArray(L);
                  t = A.createBuffer();
                  A.bindBuffer(A.ARRAY_BUFFER, t);
                  A.bufferData(
                    A.ARRAY_BUFFER,
                    new Float32Array([0.5, 0.5, 0, 1]),
                    A.STATIC_DRAW
                  );
                  A.vertexAttribPointer(L, 4, A.FLOAT, !1, 16, 0);
                  t = A.createBuffer();
                  A.bindBuffer(A.ELEMENT_ARRAY_BUFFER, t);
                  A.bufferData(
                    A.ELEMENT_ARRAY_BUFFER,
                    new Uint16Array([0]),
                    A.STATIC_DRAW
                  );
                  A.disable(A.DEPTH_TEST);
                  A.disable(A.DITHER);
                  A.disable(A.STENCIL_TEST);
                  A.viewport(0, 0, 1, 1);
                  t = e.Yb ? G.createQueryEXT() : A.createQuery();
                  e.Id = t;
                  e.Ba = G.TIME_ELAPSED_EXT || A.TIME_ELAPSED;
                  e.If = -x.fh;
                  e.Jf = new Float32Array(x.rc);
                  e.Nd = new Float32Array(x.rc);
                  e.zd = 0;
                  e.we = 0;
                  e.Bi = 0;
                  e.Jc = !0;
                }
              }
              if (x.pi) {
                A = !1;
                try {
                  if ("undefined" === typeof SharedWorker) {
                    var R = URL.createObjectURL(
                        new Blob(
                          [
                            "let handler = null;\n      self.addEventListener('message', function(e){\n        if (handler !== null){\n          clearTimeout(handler);\n          handler = null;\n        }\n        switch (e.data) {\n          case 'START':\n          case 'DONE':\n            handler = setTimeout(function(){\n              self.postMessage('TICK');\n            }, " +
                              x.Vf.toString() +
                              ");\n            break;\n          case 'STOP':\n            break;\n        };\n      }, false);",
                          ],
                          { type: "text/javascript" }
                        )
                      ),
                      O = new Worker(R);
                    O.addEventListener("message", a);
                    k = { $i: O, port: O };
                    C.Hf = !0;
                  } else {
                    var ia = URL.createObjectURL(
                        new Blob(
                          [
                            "let handler = null;\n      onconnect = function(e) {\n        const port = e.ports[0];\n        port.addEventListener('message', function(e) {\n          \n          if (handler !== null){\n            clearTimeout(handler);\n            handler = null;\n          }\n          switch (e.data) {\n            case 'START':\n            case 'DONE':\n              handler = setTimeout(function(){\n                port.postMessage('TICK');\n              }, " +
                              x.Vf.toString() +
                              ");\n              break;\n            case 'STOP':\n              break;\n          };\n          \n        });\n        \n        port.start();\n      } // end onconnect()",
                          ],
                          { type: "text/javascript" }
                        )
                      ),
                      Y = new SharedWorker(ia);
                    Y.port.start();
                    Y.port.addEventListener("message", a);
                    k = { $i: Y, port: Y.port };
                    C.Ff = !0;
                  }
                  A = !0;
                } catch (Q) {}
                A &&
                  ("onvisibilitychange" in document
                    ? document.addEventListener("visibilitychange", h)
                    : (window.addEventListener("blur", J),
                      window.addEventListener("focus", v)),
                  window.addEventListener("pagehide", J),
                  window.addEventListener("pageshow", v),
                  (C.Ef = !0));
              }
              D = "undefined" !== typeof Hb;
            },
            A: function () {
              l();
              C.Ef &&
                ("onvisibilitychange" in document
                  ? document.removeEventListener("visibilitychange", h)
                  : (window.removeEventListener("blur", J),
                    window.removeEventListener("focus", v)),
                window.removeEventListener("pagehide", J),
                window.removeEventListener("pageshow", v),
                (C.Ef = !1));
              C.Ff
                ? (k.port.close(), (C.Ff = !1))
                : C.Hf && (k.$i.terminate(), (C.Hf = !1));
              Object.assign(C, { Oa: !0, Na: !1, Xb: !1 });
              z = null;
            },
            lq: function () {
              return C.Oa;
            },
            update: function (A) {
              Object.assign(x, A);
            },
            pg: function (A) {
              C.Na || N.m({});
              p();
              C.Xb = !0;
              z = A;
              C.Oa && b();
            },
            stop: l,
          };
        return N;
      })(),
      zc = {
        mf: function () {
          return Date.now();
        },
        Np: function () {
          return performance.now();
        },
      },
      gd = (function () {
        var a = { Dm: !0, isLinear: !0, Wf: [4, 11] };
        return {
          Ip: function (b, d, f) {
            return d.isDetected
              ? Math.floor(d.s * b)
              : ((b = Math.floor(Math.log2(b / 4))),
                (b = Math.min(Math.max(b, 4), 9)),
                Math.max(f, Math.pow(2, b)));
          },
          instance: function (b) {
            var d = Object.assign({}, a, b),
              f = [],
              l = null,
              p = -1,
              u = null,
              h = !1;
            for (b = d.Wf[0]; b <= d.Wf[1]; ++b) f[b] = null;
            return {
              L: function (m, r) {
                r !== p &&
                  (l && l.remove(),
                  (l = aa.instance({
                    isLinear: d.isLinear,
                    isPot: !0,
                    width: r,
                  })));
                if ((h = d.Dm && r < 0.5 * m)) {
                  m = Math.floor(Math.log2(m));
                  var w = d.Wf;
                  w = m = Math.min(Math.max(m, w[0]), w[1]);
                  if (!f[w]) {
                    var H = aa.instance({
                      isPot: !0,
                      isMipmap: !0,
                      si: !0,
                      width: Math.pow(2, w),
                    });
                    f[w] = { $: H, Li: -1 };
                  }
                  m = f[m];
                  u = m.$;
                  m.Li !== r &&
                    ((w = Math.log2(r)), u.h(0), u.xj(w), aa.aa(0), (m.Li = r));
                } else u = l;
                p = r;
                u.L();
              },
              h: function (m) {
                u.h(m);
                h && u.Dc();
              },
              xa: function (m) {
                u.xa(m);
              },
              remove: function () {
                l && l.remove();
                f.forEach(function (m) {
                  m && m.$.remove();
                });
              },
            };
          },
        };
      })(),
      Bb = (function () {
        function a(X) {
          switch (v) {
            case e.movePinch:
              var sa = -X.deltaY;
              0 === J && g("pinch", -1, 0.001 * sa, null);
          }
          X.deltaY;
          X.preventDefault();
        }
        function b(X) {
          if (-1 !== J)
            switch (v) {
              case e.swipe:
                if (1 !== J) break;
                m();
                w(X, A);
                var sa = A[0] - N[0];
                l(sa);
                X = sa / ((20 * M.offsetWidth) / 100);
                g("swipeMove", Math.min(Math.max(X, -1), 1), X, null);
                break;
              case e.movePinch:
                if (2 === J || 3 === J) {
                  w(X, A);
                  sa = A[0] - N[0];
                  var Da = A[1] - N[1];
                  2 === J
                    ? ((U += Math.sqrt(sa * sa + Da * Da)),
                      10 > U
                        ? ((N[0] = A[0]), (N[1] = A[1]))
                        : (za || ((za = !0), g("moveStart", null, null, null)),
                          (ca[0] = sa),
                          (ca[1] = Da),
                          (L[0] = sa - G[0]),
                          (L[1] = Da - G[1]),
                          g("move", ca, L, null),
                          (G[0] = ca[0]),
                          (G[1] = ca[1])))
                    : 3 === J &&
                      ((X = r(X) / na), g("pinch", X, X - Ea, null), (Ea = X));
                }
            }
        }
        function d(X) {
          if (-1 !== J)
            switch (v) {
              case e.swipe:
                if (1 !== J) break;
                m();
                w(X, A);
                X = A[0] - N[0];
                var sa = 0 > X;
                (X = 20 < (100 * Math.abs(X)) / M.offsetWidth) && sa
                  ? g("swipeLeft", q, null, null)
                  : X && !sa && g("swipeRight", q, null, null);
                var Da = function () {
                  setTimeout(function () {
                    h();
                    J = 0;
                    g("swipeEnd", null, null, null);
                  }, 202);
                };
                X
                  ? ((X = function () {
                      var ja = (sa ? -1 : 1) * M.width,
                        ra = ((sa ? 1 : -1) * ja) / M.width;
                      q.style.transitionDuration = (400).toString() + "ms";
                      q.style.left = (Y[0] + ja).toString() + "px";
                      q.style.top = Y[1].toString() + "px";
                      q.style.transform = "rotate( " + ra.toString() + "rad )";
                      Da();
                    }),
                    ia ? X() : (Q = X))
                  : ((q.style.transitionDuration = (200).toString() + "ms"),
                    (q.style.opacity = "0"),
                    (q.style.left = Y[0].toString() + "px"),
                    (q.style.top = Y[1].toString() + "px"),
                    (q.style.transform = ""),
                    Da());
                J = -1;
                break;
              case e.movePinch:
                if (2 === J || 3 === J)
                  J === J.move
                    ? g("moveEnd", null, null, null)
                    : 3 === J && g("pinchEnd", null, null, null),
                    (J = 0);
            }
        }
        function f(X) {
          X.preventDefault();
          if (-1 !== J)
            switch (v) {
              case e.swipe:
                if (0 !== J) break;
                m();
                J = 1;
                fa = setTimeout(function () {
                  h();
                  fa = null;
                  1 === J && ((J = 0), g("swipeEnd", null, null, null));
                }, 1e3);
                p();
                g("swipeStart", null, null, null);
                g("swipeGetCanvas", q, R, t);
                w(X, N);
                break;
              case e.movePinch:
                0 !== J
                  ? 2 !== J ||
                    za ||
                    (void 0 === X.changedTouches && void 0 === X.touches) ||
                    ((na = r(X)),
                    20 < na &&
                      ((J = 3), (Ea = 1), g("pinchStart", null, null, null)))
                  : 3 !== J &&
                    ((za = !1),
                    w(X, N),
                    (G[0] = 0),
                    (G[1] = 0),
                    (J = 2),
                    (U = 0));
            }
        }
        function l(X) {
          var sa = 0 > X;
          q.style.left = Y[0] + X + "px";
          q.style.transformOrigin = sa ? E : P;
          q.style.transform =
            "rotate( " + (((sa ? 1 : -1) * X) / M.width).toString() + "rad )";
        }
        function p() {
          ia = !1;
          var X = M.getBoundingClientRect();
          Y[0] = X.left;
          Y[1] = X.top;
          q.width = Math.round(M.width / 4);
          q.height = Math.round(M.height / 4);
          t.width = q.width;
          t.height = q.height;
          q.style.width = M.offsetWidth + "px";
          q.style.height = M.offsetHeight + "px";
          q.style.left = Y[0] + "px";
          q.style.top = Y[1] + "px";
          setTimeout(u, 0);
        }
        function u() {
          R.drawImage(M, 0, 0, q.width, q.height);
          O.drawImage(q, 0, 0);
          ia = !0;
          document.body.appendChild(q);
          Q && (Q(), (Q = !1));
        }
        function h() {
          q.style.transitionDuration = "0ms";
          q.style.opacity = "1";
          q.style.transform = "";
          ia && (document.body.removeChild(q), (ia = !1));
        }
        function m() {
          fa && (window.clearTimeout(fa), (fa = null));
        }
        function r(X) {
          H(X, ma, 0);
          H(X, ua, 1);
          return Math.sqrt(ma[0] * ma[0] + ua[0] * ua[0]);
        }
        function w(X, sa) {
          void 0 !== X.changedTouches || void 0 !== X.touches
            ? H(X, sa, 0)
            : ((sa[0] = X.pageX), (sa[1] = X.pageY));
        }
        function H(X, sa, Da) {
          X.touches.length > Da
            ? ((sa[0] = X.touches[Da].pageX), (sa[1] = X.touches[Da].pageY))
            : ((sa[0] = X.changedTouches[Da].pageX),
              (sa[1] = X.changedTouches[Da].pageY));
        }
        function y() {
          n.forEach(function (X) {
            M.removeEventListener(X.type, X.sb, !1);
          });
          return n.splice(0, n.length);
        }
        function x(X) {
          X.forEach(function (sa) {
            z(sa.type, sa.sb);
          });
        }
        function z(X, sa) {
          M.removeEventListener(X, sa, !1);
          q.removeEventListener(X, sa, !1);
          M.addEventListener(X, sa, !1);
          q.addEventListener(X, sa, !1);
          0 ===
            n.filter(function (Da) {
              return Da.type === X && Da.sb === sa;
            }).length && n.push({ type: X, sb: sa });
        }
        function g(X, sa, Da, ja) {
          C[X].forEach(function (ra) {
            ra.sb(sa, Da, ja);
          });
        }
        function k(X) {
          return X[0] + "% " + (100 - X[1]).toString() + "%";
        }
        var D = !1,
          M = null,
          C = {
            swipeStart: [],
            swipeEnd: [],
            swipeLeft: [],
            swipeRight: [],
            swipeMove: [],
            swipeGetCanvas: [],
            pinch: [],
            pinchStart: [],
            pinchEnd: [],
            move: [],
            moveStart: [],
            moveEnd: [],
          },
          n = [],
          e = { idle: 0, swipe: 1, movePinch: 2 },
          v = e.idle,
          J = 0,
          N = [0, 0],
          A = [0, 0],
          G = [0, 0],
          L = [0, 0],
          q = document.createElement("canvas"),
          t = document.createElement("canvas"),
          R = q.getContext("2d"),
          O = t.getContext("2d");
        q.style.position = "fixed";
        q.style.zIndex = "800";
        q.style.cursor = "move";
        q.style.pointerEvents = "none";
        q.className = "swipeImage";
        q.setAttribute("draggable", !1);
        var ia = !1,
          Y = [0, 0],
          Q = null,
          fa = null,
          P = k([50, 100]),
          E = k([50, 0]),
          B = null,
          U = 0,
          ca = [0, 0],
          na = 0,
          za = !1,
          Ea = 1,
          ma = [0, 0],
          ua = [0, 0],
          Ma = {
            init: function (X) {
              if (D) Ma.switch_canvas(X.ra);
              else
                return (
                  (M = X.ra),
                  z("mousedown", f),
                  z("mouseup", d),
                  z("mouseout", d),
                  z("mousemove", b),
                  z("mousemove", b),
                  z("wheel", a),
                  z("touchstart", f),
                  z("touchend", d),
                  z("touchmove", b),
                  (D = !0),
                  Ma
                );
            },
            switch_canvas: function (X) {
              if (!D) Ma.init({ ra: X });
              else if (M !== X) {
                var sa = y();
                M = X;
                x(sa);
                for (var Da in C)
                  for (X = C[Da], sa = X.length - 1; 0 <= sa; --sa)
                    X[sa].En && X.splice(sa, 1);
              }
            },
            get_mode: function () {
              for (var X in e) if (e[X] === v) return X;
              return !1;
            },
            switch_mode: function (X) {
              D &&
                "undefined" !== typeof e[X] &&
                ((X = e[X]), v !== X && (m(), (v = X), (J = 0)));
            },
            add_listener: function (X, sa, Da) {
              C[X].push({ sb: sa, En: "undefined" === typeof Da ? !1 : Da });
              return Ma;
            },
            remove_listener: function (X) {
              C[X].splice(0, C[X].length);
              return Ma;
            },
            animate_swipe: function (X, sa) {
              B && (clearInterval(B), (B = null));
              p();
              var Da = (M.width / (sa / 1e3)) * ("left" === X ? -1 : 1),
                ja = 0,
                ra,
                hb = Date.now();
              B = setInterval(function () {
                B &&
                  ((ra = Date.now()),
                  (ja += ((ra - hb) / 1e3) * Da),
                  l(ja),
                  (hb = ra),
                  Math.abs(ja) > 0.75 * M.width &&
                    B &&
                    (clearInterval(B), (B = null), h()));
              }, 16);
            },
          };
        return Ma;
      })();
    window.CanvasListeners = Bb;
    var T = {
        VERSION: "4.1.4",
        ed: [],
        dd: [],
        Fe: !1,
        Ee: !1,
        Ge: !1,
        ready: !1,
        isBusy: !1,
      },
      bb = {
        idealWidth: 800,
        idealHeight: 600,
        minWidth: 480,
        maxWidth: 1280,
        minHeight: 480,
        maxHeight: 1280,
        FOVdesktop: 60,
        rotate: 0,
        FOVmobile: 45,
        FOVforced: 0,
        De: 10,
        Ce: 8e3,
      },
      Rc = {
        Kc: !0,
        Vd: "models3D",
        Ud: "materials",
        Fo: "tweakers",
        neuralNetworkPath: "built/jeefitNNC_65_0.json",
        neuralNetworkVersion: "65_0",
        da: "",
        va: "",
        ad: "",
        Aa: 0,
        nk: 20,
        width: 1024,
        height: 1024,
        ti: !0,
        mn: [2, 3.5],
        gj: 300,
        bd: [1, 6],
        scanOverlapFactors: [2, 2, 3],
        scanNScaleLevels: 2,
        scanScale0Factor: 0.7,
        sa: [0.2, 0.2, 0.3],
        oc: [
          [0.8, 0.5],
          [0.8, 0.5],
          [1, 1],
        ],
        Do: 30,
        ll: 1,
        wn: [0.3, 0.65],
        vn: 1,
        Eo: [0.01, 0.035],
        Nn: [0.003, 0.007],
        Lg: [0, 0.6],
        Il: 0.2,
        ab: [0.698111, 1.047166, 0.122169],
        Nj: [-0.1, 0, 0],
        be: [0, -62, 8],
        rn: 1.03,
        Ga: [0, -60, 0],
        Zf: 50,
        $f: 20,
        Bc: 0.4,
        jf: 73,
        Ie: [0.03, 1],
        lk: [4, 1],
        Sk: [0, 0.5],
        Pn: 0.15,
        Mn: 1,
        In: [1, 4.5],
        To: 20,
        Hp: !1,
        Fc: 145,
        yf: -18,
        wf: 20,
        xf: 3,
        Nc: [-110, 0],
        jc: 1,
        Cj: 0.4,
        Dj: 3,
        ke: [0, 0, 0],
        kc: [1.1, 1],
        qd: 0,
        Ze: 0.95,
        Ye: 90,
        Xe: 50,
        jd: 30,
        Mb: 0.05,
        uf: !0,
        Rd: !0,
        Qf: "images/masks/target.jpg",
        Rf: !1,
        Qd: [1 / 255, 175 / 255, 236 / 255, 0],
        Sd: -0.001,
        Pf: 3.14,
        Me: 0,
        Le: "images/masks/burka.png",
        Je: Math.PI - Math.PI / 4,
        We: Math.PI / 4,
        og: [0.3, 0.2, 0.1],
        $b: !0,
        Ei: [700, 90],
        Tm: [0.2, 0.04],
        Uo: "images/backgrounds/viewer3D.png",
        bh: [0, 0, 0],
        ah: [0, 15, 60],
        Ae: 0.3,
        bp: 50,
        Yo: Zc ? $a : !1,
        Zo: Zc ? $a : !1,
        ap: 1e3,
        ep: 1e3,
        $o: 40,
        Xo: [0, 0, -400],
        Hi: 0.1,
        Xm: 0.5,
        Ii: [0.5, 1.5],
        Td: 30,
        Wm: !0,
      },
      I = Object.assign({}, Rc);
    V.wh = !0;
    V.xh = !0;
    V.vh = !1;
    V.Qa = !0;
    var cb = {
      de: 3.5,
      Ab: "images/debug/picsou.png",
      Tc: 45,
      Nf: 0.785,
      Of: 0.3925,
      Pd: 5,
      Od: 2,
      Mf: 0,
      Lf: 0,
      Vo: "images/backgrounds/bg1.jpg",
      Wo: "images/backgrounds/bg1_light.jpg",
      $j: 1,
      ak: 2,
    };
    I.fx = [4, 50];
    I.Nc = [-110, 0];
    I.Cj = 0.25;
    I.Dj = 3;
    I.ke = [0, -2, 20];
    I.kc = [0.95, 1];
    V.Rc = 2.1289;
    V.ig = 1;
    cb.de = 2.5858;
    cb.Nf = 0.4388;
    cb.Of = 0.118;
    cb.Ab = "images/debug/hdri2.png";
    cb.Tc = 180;
    cb.rg = 0.8065;
    cb.Pd = 5.3887;
    cb.Od = 0.5351;
    cb.Mf = -0.3019;
    cb.Lf = 0;
    cb.$j = 3.5288;
    cb.ak = 6.2168;
    var Qc = {
        element: null,
        Hh: null,
        Md: !1,
        th: null,
        $: null,
        Rg: null,
        deviceId: -1,
        Rb: -1,
        wd: 0,
        Yi: null,
        ze: -1,
      },
      Ba = Object.assign({}, Qc),
      fb = null,
      $c = I.mn,
      Gc = window.devicePixelRatio ? window.devicePixelRatio : 1;
    var rc = { Hl: Math.max($c[0], Gc) / Gc, gf: Math.min(Gc, $c[1]) };
    var eb = null;
    T.onLoad = function (a) {
      T.ready ? a() : T.ed.push(a);
    };
    T.onHalfLoad = function (a) {
      T.load_model ? a() : T.dd.push(a);
    };
    T.onWebcamAsk = function (a) {
      T.Fe = a;
    };
    T.onContextLost = function (a) {
      T.Ee = a;
    };
    T.onWebcamGet = function (a) {
      T.Ge = a;
    };
    T.get_onHalfLoadCallstack = function () {
      return T.dd;
    };
    T.set_size = function (a, b, d) {
      d = d ? rc.gf : 1;
      I.width = a * d;
      I.height = b * d;
    };
    T.get_videoDevices = function (a) {
      Mc(a);
    };
    T.set_videoDevice = function (a) {
      Ba.deviceId = a;
    };
    T.set_videoSizes = function (a, b, d, f, l, p) {
      bb.idealWidth = a;
      bb.idealHeight = b;
      bb.minWidth = d;
      bb.maxWidth = f;
      bb.minHeight = l;
      bb.maxHeight = p;
    };
    T.set_loading = function (a, b, d) {
      a && ((I.Rf = !0), (I.Qf = a));
      "number" === typeof b && ((a = new Xb(b)), (I.Qd = [a.r, a.Y, a.b, 0]));
      "number" === typeof d && (I.Sd = d);
    };
    T.set_settings = function (a, b, d) {
      a && Object.assign(I, a);
      b && Object.assign(bb, b);
      d && Object.assign(cb, d);
    };
    T.get_size = function () {
      return { width: I.width, height: I.height };
    };
    T.get_cv = function () {
      return lb.tb();
    };
    T.set_NNCPath = function (a) {
      I.ad = a;
    };
    T.set_materialsPath = function (a) {
      I.Ud = a;
    };
    T.set_modelsPath = function (a) {
      I.Vd = a;
    };
    T.destroy = function () {
      return eb ? eb.A() : Promise.resolve();
    };
    T.update_lightSettings = function (a) {
      a = Object.assign(
        {
          screenTextureURL: null,
          screenLuminosity: -1,
          lightDirFactor: -1,
          lightAmbFactor: -1,
          screenWidthAngle: -1,
        },
        a
      );
      0 <= a.lightDirFactor && (cb.Pd = a.lightDirFactor);
      0 <= a.lightAmbFactor && (cb.Od = a.lightAmbFactor);
      0 <= a.screenLuminosity && (cb.de = a.screenLuminosity);
      0 <= a.screenWidthAngle && (cb.Tc = a.screenWidthAngle);
      a.screenTextureURL && (cb.Ab = a.screenTextureURL);
      T.ready && (eb.Jj(), xa.Ka.lh(Ba.$));
    };
    T.init2 = function (a) {
      var b = Object.assign(
        {
          basePath: null,
          modelsPath: null,
          materialsPath: null,
          materialTextureBasePath: null,
          NNCPath: null,
          cv: null,
          isRequestCamera: !0,
          width: 512,
          height: 512,
          isMirror: !0,
          isApplyOverSampling: !1,
          scanOverlapFactors: null,
          scanNScaleLevels: null,
          scanScale0Factor: null,
          callbackReady: null,
        },
        a
      );
      I.Kc = b.isRequestCamera;
      T.set_size(b.width, b.height, b.isApplyOverSampling);
      T.update_lightSettings(a);
      b.modelsPath && (I.Vd = b.modelsPath);
      b.materialsPath && (I.Ud = b.materialsPath);
      b.materialTextureBasePath && (V.Ki = b.materialTextureBasePath);
      b.NNCPath && (I.ad = b.NNCPath);
      I.scanOverlapFactors = b.scanOverlapFactors || I.scanOverlapFactors;
      I.scanNScaleLevels = b.scanNScaleLevels || I.scanNScaleLevels;
      I.scanScale0Factor = b.scanScale0Factor || I.scanScale0Factor;
      I.ti = b.isMirror;
      return new Promise(function (d, f) {
        T.onHalfLoad(d);
        T.init(
          b.basePath,
          function () {
            b.callbackReady && b.callbackReady();
          },
          f,
          b.cv
        );
      });
    };
    T.init = function (a, b, d, f) {
      eb = ed();
      T.ob = d
        ? function (l, p) {
            d(l, p);
            T.ob = !1;
          }
        : function () {};
      T.kp = eb;
      a && (I.da = a);
      b && T.ed.push(b);
      eb.Jj();
      a = eb.bm();
      return lb.m({
        Ve: "jeefitCanvas",
        ra: f,
        width: a.width,
        height: a.height,
        debug: !1,
        cg: function () {
          T.Ee && T.Ee();
        },
        premultipliedAlpha: !0,
      })
        ? I.Kc
          ? Sc()
          : id()
        : (T.ob && T.ob("GL_INCOMPATIBLE", "Cannot init Context"), !1);
    };
    T.request_cameraVideoStream = function () {
      return Sc().then(function () {
        eb.Jl(I.width, I.height, 0);
      });
    };
    window.JEELIZVTO = T;
    var Oc = (function () {
        function a() {
          Ca.aa();
          c.viewport(0, 0, 1, 1);
          Z.set("s74");
          f.h(0);
          W.l(!1);
          c.readPixels(0, 0, 1, 1, c.RGBA, c.UNSIGNED_BYTE, p);
          b(0 < p[0]);
        }
        var b = null,
          d = !1,
          f = null,
          l = !1,
          p = null,
          u = {
            m: function (h) {
              if (l) return !1;
              f = h;
              Z.uc([
                {
                  id: "s74",
                  name: "_",
                  g: "uniform sampler2D u41;const vec2 e=vec2(.16,.5);void main(){vec4 a=texture2D(u41,e);float b=step(1.99,a.r);gl_FragColor=vec4(b,0.,0.,1.);}",
                  i: ["u41"],
                  precision: "lowp",
                },
              ]);
              Z.j("s74", [{ type: "1i", name: "u41", value: 0 }]);
              p = new Uint8Array(4);
              return (l = !0);
            },
            start: function (h, m) {
              u.stop();
              b = m;
              d = window.setInterval(a, h);
            },
            stop: function () {
              d && (window.clearInterval(a), (d = !1));
            },
          };
        return u;
      })(),
      Hc = {};
    Xb.prototype = {
      constructor: Xb,
      r: 1,
      Y: 1,
      b: 1,
      set: function (a) {
        a instanceof Xb
          ? this.N(a)
          : "number" === typeof a
          ? Uc(this, a)
          : "string" === typeof a && jd(this, a);
        return this;
      },
      Sn: (function () {
        function a(b, d, f) {
          0 > f && (f += 1);
          1 < f && --f;
          return f < 1 / 6
            ? b + 6 * (d - b) * f
            : 0.5 > f
            ? d
            : f < 2 / 3
            ? b + 6 * (d - b) * (2 / 3 - f)
            : b;
        }
        return function (b, d, f) {
          b = Hc.Math.Jp(b, 1);
          d = Hc.Math.Qe(d, 0, 1);
          f = Hc.Math.Qe(f, 0, 1);
          0 === d
            ? (this.r = this.Y = this.b = f)
            : ((d = 0.5 >= f ? f * (1 + d) : f + d - f * d),
              (f = 2 * f - d),
              (this.r = a(f, d, b + 1 / 3)),
              (this.Y = a(f, d, b)),
              (this.b = a(f, d, b - 1 / 3)));
          return this;
        };
      })(),
      clone: function () {
        return new this.constructor(this.r, this.Y, this.b);
      },
      N: function (a) {
        this.r = a.r;
        this.Y = a.Y;
        this.b = a.b;
        return this;
      },
      add: function (a) {
        this.r += a.r;
        this.Y += a.Y;
        this.b += a.b;
        return this;
      },
      multiply: function (a) {
        this.r *= a.r;
        this.Y *= a.Y;
        this.b *= a.b;
        return this;
      },
      Ea: function (a) {
        this.r *= a;
        this.Y *= a;
        this.b *= a;
        return this;
      },
      rb: function (a, b) {
        void 0 === b && (b = 0);
        this.r = a[b];
        this.Y = a[b + 1];
        this.b = a[b + 2];
        return this;
      },
    };
    var kd = {};
    tc.prototype = {
      constructor: tc,
      get x() {
        return this.F;
      },
      set x(a) {
        this.F = a;
      },
      get y() {
        return this.G;
      },
      set y(a) {
        this.G = a;
      },
      get z() {
        return this.H;
      },
      set z(a) {
        this.H = a;
      },
      get w() {
        return this.T;
      },
      set w(a) {
        this.T = a;
      },
      set: function (a, b, d, f) {
        this.F = a;
        this.G = b;
        this.H = d;
        this.T = f;
        return this;
      },
      clone: function () {
        return new this.constructor(this.F, this.G, this.H, this.T);
      },
      N: function (a) {
        this.F = a.x;
        this.G = a.y;
        this.H = a.z;
        this.T = a.w;
        return this;
      },
      inverse: function () {
        this.F *= -1;
        this.G *= -1;
        this.H *= -1;
        this.normalize();
        return this;
      },
      sd: function (a) {
        return this.F * a.F + this.G * a.G + this.H * a.H + this.T * a.T;
      },
      Kf: function () {
        return (
          this.F * this.F + this.G * this.G + this.H * this.H + this.T * this.T
        );
      },
      length: function () {
        return Math.sqrt(
          this.F * this.F + this.G * this.G + this.H * this.H + this.T * this.T
        );
      },
      normalize: function () {
        var a = this.length();
        0 === a
          ? ((this.H = this.G = this.F = 0), (this.T = 1))
          : ((a = 1 / a),
            (this.F *= a),
            (this.G *= a),
            (this.H *= a),
            (this.T *= a));
        return this;
      },
      multiply: function (a, b) {
        return void 0 !== b
          ? (console.warn(
              "JETHREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."
            ),
            Vc(this, a, b))
          : Vc(this, this, a);
      },
      rb: function (a, b) {
        void 0 === b && (b = 0);
        this.F = a[b];
        this.G = a[b + 1];
        this.H = a[b + 2];
        this.T = a[b + 3];
        return this;
      },
    };
    Yb.prototype = {
      constructor: Yb,
      get width() {
        return this.x;
      },
      set width(a) {
        this.x = a;
      },
      get height() {
        return this.y;
      },
      set height(a) {
        this.y = a;
      },
      set: function (a, b) {
        this.x = a;
        this.y = b;
        return this;
      },
      lj: function (a) {
        this.x = a;
        return this;
      },
      mj: function (a) {
        this.y = a;
        return this;
      },
      clone: function () {
        return new this.constructor(this.x, this.y);
      },
      N: function (a) {
        this.x = a.x;
        this.y = a.y;
        return this;
      },
      add: function (a, b) {
        if (void 0 !== b)
          return (
            console.warn(
              "JETHREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."
            ),
            this.fd(a, b)
          );
        this.x += a.x;
        this.y += a.y;
        return this;
      },
      fd: function (a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this;
      },
      sub: function (a, b) {
        if (void 0 !== b)
          return (
            console.warn(
              "JETHREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
            ),
            this.gb(a, b)
          );
        this.x -= a.x;
        this.y -= a.y;
        return this;
      },
      gb: function (a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this;
      },
      multiply: function (a) {
        this.x *= a.x;
        this.y *= a.y;
        return this;
      },
      Ea: function (a) {
        isFinite(a) ? ((this.x *= a), (this.y *= a)) : (this.y = this.x = 0);
        return this;
      },
      bf: function (a) {
        return this.Ea(1 / a);
      },
      min: function (a) {
        this.x = Math.min(this.x, a.x);
        this.y = Math.min(this.y, a.y);
        return this;
      },
      max: function (a) {
        this.x = Math.max(this.x, a.x);
        this.y = Math.max(this.y, a.y);
        return this;
      },
      Qe: function (a, b) {
        this.x = Math.max(a.x, Math.min(b.x, this.x));
        this.y = Math.max(a.y, Math.min(b.y, this.y));
        return this;
      },
      floor: function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
      },
      ceil: function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
      },
      round: function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
      },
      sd: function (a) {
        return this.x * a.x + this.y * a.y;
      },
      Kf: function () {
        return this.x * this.x + this.y * this.y;
      },
      length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      },
      normalize: function () {
        return this.bf(this.length());
      },
      rb: function (a, b) {
        void 0 === b && (b = 0);
        this.x = a[b];
        this.y = a[b + 1];
        return this;
      },
    };
    Ua.prototype = {
      constructor: Ua,
      set: function (a, b, d) {
        this.x = a;
        this.y = b;
        this.z = d;
        return this;
      },
      lj: function (a) {
        this.x = a;
        return this;
      },
      mj: function (a) {
        this.y = a;
        return this;
      },
      clone: function () {
        return new this.constructor(this.x, this.y, this.z);
      },
      N: function (a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        return this;
      },
      add: function (a, b) {
        if (void 0 !== b)
          return (
            console.warn(
              "JETHREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."
            ),
            this.fd(a, b)
          );
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        return this;
      },
      fd: function (a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        return this;
      },
      sub: function (a, b) {
        if (void 0 !== b)
          return (
            console.warn(
              "JETHREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
            ),
            this.gb(a, b)
          );
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        return this;
      },
      gb: function (a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this;
      },
      multiply: function (a, b) {
        if (void 0 !== b)
          return (
            console.warn(
              "JETHREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."
            ),
            (this.x = a.x * b.x),
            (this.y = a.y * b.y),
            (this.z = a.z * b.z),
            this
          );
        this.x *= a.x;
        this.y *= a.y;
        this.z *= a.z;
        return this;
      },
      Ea: function (a) {
        isFinite(a)
          ? ((this.x *= a), (this.y *= a), (this.z *= a))
          : (this.z = this.y = this.x = 0);
        return this;
      },
      bf: function (a) {
        return this.Ea(1 / a);
      },
      min: function (a) {
        this.x = Math.min(this.x, a.x);
        this.y = Math.min(this.y, a.y);
        this.z = Math.min(this.z, a.z);
        return this;
      },
      max: function (a) {
        this.x = Math.max(this.x, a.x);
        this.y = Math.max(this.y, a.y);
        this.z = Math.max(this.z, a.z);
        return this;
      },
      Qe: function (a, b) {
        this.x = Math.max(a.x, Math.min(b.x, this.x));
        this.y = Math.max(a.y, Math.min(b.y, this.y));
        this.z = Math.max(a.z, Math.min(b.z, this.z));
        return this;
      },
      floor: function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
      },
      ceil: function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
      },
      round: function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
      },
      sd: function (a) {
        return this.x * a.x + this.y * a.y + this.z * a.z;
      },
      Kf: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z;
      },
      length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      },
      normalize: function () {
        return this.bf(this.length());
      },
      rb: function (a, b) {
        void 0 === b && (b = 0);
        this.x = a[b];
        this.y = a[b + 1];
        this.z = a[b + 2];
        return this;
      },
    };
    Zb.ck = "XYZ";
    Zb.prototype = {
      constructor: Zb,
      get x() {
        return this.F;
      },
      set x(a) {
        this.F = a;
      },
      get y() {
        return this.G;
      },
      set y(a) {
        this.G = a;
      },
      get z() {
        return this.H;
      },
      set z(a) {
        this.H = a;
      },
      get order() {
        return this.Sa;
      },
      set order(a) {
        this.Sa = a;
      },
      set: function (a, b, d, f) {
        this.F = a;
        this.G = b;
        this.H = d;
        this.Sa = f || this.Sa;
        return this;
      },
      clone: function () {
        return new this.constructor(this.F, this.G, this.H, this.Sa);
      },
      N: function (a) {
        this.F = a.F;
        this.G = a.G;
        this.H = a.H;
        this.Sa = a.Sa;
        return this;
      },
      rb: function (a) {
        this.F = a[0];
        this.G = a[1];
        this.H = a[2];
        void 0 !== a[3] && (this.Sa = a[3]);
        return this;
      },
    };
    Dc.prototype = {
      constructor: Dc,
      set: function (a, b) {
        this.min.N(a);
        this.max.N(b);
        return this;
      },
      clone: function () {
        return new this.constructor().N(this);
      },
      N: function (a) {
        this.min.N(a.min);
        this.max.N(a.max);
        return this;
      },
      empty: function () {
        return (
          this.max.x < this.min.x ||
          this.max.y < this.min.y ||
          this.max.z < this.min.z
        );
      },
      size: function (a) {
        return (a || new Ua()).gb(this.max, this.min);
      },
      getParameter: function (a, b) {
        return (b || new Ua()).set(
          (a.x - this.min.x) / (this.max.x - this.min.x),
          (a.y - this.min.y) / (this.max.y - this.min.y),
          (a.z - this.min.z) / (this.max.z - this.min.z)
        );
      },
      translate: function (a) {
        this.min.add(a);
        this.max.add(a);
        return this;
      },
    };
    $b.prototype = {
      constructor: $b,
      set: function (a, b, d, f, l, p, u, h, m, r, w, H, y, x, z, g) {
        var k = this.elements;
        k[0] = a;
        k[4] = b;
        k[8] = d;
        k[12] = f;
        k[1] = l;
        k[5] = p;
        k[9] = u;
        k[13] = h;
        k[2] = m;
        k[6] = r;
        k[10] = w;
        k[14] = H;
        k[3] = y;
        k[7] = x;
        k[11] = z;
        k[15] = g;
        return this;
      },
      clone: function () {
        return new $b().rb(this.elements);
      },
      N: function (a) {
        this.elements.set(a.elements);
        return this;
      },
      multiply: function (a, b) {
        return void 0 !== b
          ? (console.warn(
              "JETHREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."
            ),
            Xc(this, a, b))
          : Xc(this, this, a);
      },
      Ea: function (a) {
        var b = this.elements;
        b[0] *= a;
        b[4] *= a;
        b[8] *= a;
        b[12] *= a;
        b[1] *= a;
        b[5] *= a;
        b[9] *= a;
        b[13] *= a;
        b[2] *= a;
        b[6] *= a;
        b[10] *= a;
        b[14] *= a;
        b[3] *= a;
        b[7] *= a;
        b[11] *= a;
        b[15] *= a;
        return this;
      },
      setPosition: function (a) {
        var b = this.elements;
        b[12] = a.x;
        b[13] = a.y;
        b[14] = a.z;
        return this;
      },
      translate: function () {
        console.error("JETHREE.Matrix4: .translate() has been removed.");
      },
      scale: function (a) {
        var b = this.elements,
          d = a.x,
          f = a.y;
        a = a.z;
        b[0] *= d;
        b[4] *= f;
        b[8] *= a;
        b[1] *= d;
        b[5] *= f;
        b[9] *= a;
        b[2] *= d;
        b[6] *= f;
        b[10] *= a;
        b[3] *= d;
        b[7] *= f;
        b[11] *= a;
        return this;
      },
      rb: function (a) {
        this.elements.set(a);
        return this;
      },
    };
    Ec.prototype = {
      constructor: Ec,
      clone: function () {
        return new this.constructor().N(this);
      },
      N: function (a) {
        this.a = a.a;
        this.b = a.b;
        this.c = a.c;
        this.Fa.N(a.Fa);
        this.color.N(a.color);
        this.ac = a.ac;
        for (var b = 0, d = a.ye.length; b < d; b++)
          this.ye[b] = a.ye[b].clone();
        b = 0;
        for (d = a.Zg.length; b < d; b++) this.Zg[b] = a.Zg[b].clone();
        return this;
      },
    };
    var F = (function () {
        function a(n, e, v) {
          e = n.createShader(e);
          n.shaderSource(e, v);
          n.compileShader(e);
          return n.getShaderParameter(e, n.COMPILE_STATUS) ? e : !1;
        }
        function b(n, e) {
          ha.ma() && (e.g = e.g.replace(/gl_FragData\[([0-3])\]/g, "gbuf$1"));
          e.tf = a(n, n.VERTEX_SHADER, e.v, e.name + " VERTEX");
          e.sf = a(n, n.FRAGMENT_SHADER, e.g, e.name + " FRAGMENT");
          var v = n.createProgram();
          n.attachShader(v, e.tf);
          n.attachShader(v, e.sf);
          n.linkProgram(v);
          return v;
        }
        function d(n) {
          n.v = "#version 300 es\n" + n.v.replace(/varying/g, "out");
          n.g = "#version 300 es\n" + n.g.replace(/varying/g, "in");
          n.v = n.v.replace(/texture2D\(/g, "texture(");
          n.g = n.g.replace(/texture2D\(/g, "texture(");
          n.ea ||
            ((n.g = n.g.replace(
              /void main/g,
              "out vec4 FragColor;\nvoid main"
            )),
            (n.g = n.g.replace(/gl_FragColor/g, "FragColor")));
          var e = 0,
            v = [];
          n.v = n.v.replace(
            /attribute ([a-z]+[0-4]*) ([_a-zA-Z,0-9\s]+);/g,
            function (J, N, A) {
              var G = "";
              A.split(",").forEach(function (L) {
                L = L.trim();
                G += "layout(location = " + e + ") in " + N + " " + L + ";\n";
                v.push(L);
                ++e;
              });
              return G;
            }
          );
          n.hk = v;
        }
        function f(n) {
          return ["float", "sampler2D", "int"]
            .map(function (e) {
              return "precision " + n + " " + e + ";\n";
            })
            .join("");
        }
        function l(n, e) {
          if (e.ki) return !1;
          var v = ha.ma();
          V.cq || v || n.enableVertexAttribArray(0);
          void 0 === e.ea && (e.ea = !1);
          e.ea && (e.cd = v ? 3 : 2);
          e.id = M++;
          void 0 === e.cd && (e.cd = 2);
          void 0 === e.precision && (e.precision = "highp");
          e.ea &&
            (e.g =
              (ha.ma()
                ? "precision highp float;\n          layout(location = 0) out vec4 gbuf0;\n          layout(location = 1) out vec4 gbuf1;\n          layout(location = 2) out vec4 gbuf2;\n          layout(location = 3) out vec4 gbuf3;\n"
                : "#extension GL_EXT_draw_buffers : require\n") + e.g);
          void 0 === e.v &&
            (e.v =
              "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}");
          var J = f(e.precision);
          e.g = J + e.g;
          e.v = J + e.v;
          v && 3 <= e.cd && d(e);
          e.Ha &&
            e.Ha.forEach(function (N) {
              e.v = e.v.replace(N.search, N.replace);
              e.g = e.g.replace(N.search, N.replace);
            });
          e.pa = b(n, e);
          e.B = {};
          e.i.forEach(function (N) {
            e.B[N] = n.getUniformLocation(e.pa, N);
          });
          e.attributes = {};
          e.wa = [];
          e.Yg = 0;
          void 0 === e.J && (e.J = ["a0"]);
          void 0 === e.S && (e.S = [2]);
          e.J.forEach(function (N, A) {
            var G =
              v && 3 <= e.cd ? e.hk.indexOf(N) : n.getAttribLocation(e.pa, N);
            e.attributes[N] = G;
            e.wa.push(G);
            e.Yg += 4 * e.S[A];
          });
          e.set = function () {
            k !== e.id &&
              (-1 !== k && D.M(),
              (k = e.id),
              (D = e),
              n.useProgram(e.pa),
              e.wa.forEach(function (N) {
                0 !== N && n.enableVertexAttribArray(N);
              }));
          };
          e.M = function () {
            k = -1;
            e.wa.forEach(function (N) {
              0 !== N && n.disableVertexAttribArray(N);
            });
          };
          e.ki = !0;
        }
        function p(n, e) {
          l(n, e);
          e.set();
          k = -1;
          return e;
        }
        function u() {
          return {
            name: "_",
            g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
            i: ["u1"],
            precision: "highp",
          };
        }
        function h() {
          C.j("s105", [{ type: "1i", name: "u1", value: 0 }]);
          C.j("s106", [{ type: "1i", name: "u154", value: 0 }]);
          C.j("s107", [{ type: "1i", name: "u74", value: 0 }]);
        }
        function m() {
          var n = "u41 u144 u145 u146 u147 u42 u79".split(" ").concat(x, z);
          g.s108 = {
            name: "_",
            g: "varying vec3 vv0;varying float vv1;void main(){gl_FragColor=vec4(vv0,vv1);}",
            v: "attribute vec3 a0;uniform sampler2D u41;uniform vec3 u144;uniform vec2 u42,u152;uniform float u145,u150,u151,u146,u147,u153;varying vec3 vv0;varying float vv1;const vec2 e=vec2(1.);const vec3 o=vec3(1.);const vec2 D=vec2(-1.,1.),p=vec2(.16,.5),q=vec2(.5,.5),r=vec2(.84,.5);uniform mat4 u76;uniform vec3 u79,u83,u84,u85;uniform float u77,u78,u86,u87,u80,u81,u82,u88;mat3 s(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u41,p);vec2 f=u86*e;vec3 c=u86*o;vec2 t=mix(d.a*u42,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u41,q).rgb+vec3(u80,0.,0.),u83,c);float u=mix(texture2D(u41,r).r,0.,u86);a.z+=u;mat3 v=s(a);vec3 w=mix(u144,u84,c);float x=mix(u145,u87,u86);vec3 b=mix(u79,u85,c);b.x+=u77*sin(a.y),b.y+=u78*sin(a.x)*step(0.,a.x);float h=cos(a.z),i=sin(a.z);mat2 y=mat2(h,i,-i,h);b.xy=y*b.xy;float z=mix(u82,1.,u86);vec2 j=u81/t;vec3 k=a0;float A=max(0.,-a0.z-u146)*u147;k.x+=A*sign(a0.x)*(1.-u86);vec3 l=v*(k+w)*x+b;vec2 B=j*z;vec3 C=vec3(g*B,-j)+l*vec3(1.,-1.,-1.);gl_Position=u76*(vec4(u88*e,e)*vec4(C,1.)),vv0=l,vv1=smoothstep(u150,u151,a0.z);}",
            i: ["u150", "u151"].concat(n),
            J: ["a0"],
            precision: "highp",
          };
          g.s109 = {
            name: "_",
            g: "uniform sampler2D u1;uniform vec3 u148;uniform float u73;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);vec3 b=mix(u148,a.rgb,a.a);vec4 c=vec4(mix(a.rgb*u148,b,u73),a.a);gl_FragColor=c;}",
            v: "attribute vec3 a0;attribute vec2 a1;uniform sampler2D u41;uniform vec3 u144;uniform vec2 u42,u152;uniform float u145,u146,u147,u153;varying vec2 vv0;const vec2 e=vec2(1.);const vec3 m=vec3(1.);const vec2 C=vec2(-1.,1.),n=vec2(.16,.5),o=vec2(.5,.5),p=vec2(.84,.5);uniform mat4 u76;uniform vec3 u79,u83,u84,u85;uniform float u77,u78,u86,u87,u80,u81,u82,u88;mat3 q(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u41,n);vec2 f=u86*e;vec3 c=u86*m;vec2 r=mix(d.a*u42,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u41,o).rgb+vec3(u80,0.,0.),u83,c);float s=mix(texture2D(u41,p).r,0.,u86);a.z+=s;mat3 t=q(a);vec3 u=mix(u144,u84,c);float v=mix(u145,u87,u86);vec3 b=mix(u79,u85,c);b.x+=u77*sin(a.y),b.y+=u78*sin(a.x)*step(0.,a.x);float h=cos(a.z),i=sin(a.z);mat2 w=mat2(h,i,-i,h);b.xy=w*b.xy;float x=mix(u82,1.,u86);vec2 j=u81/r;vec3 k=a0;float y=max(0.,-a0.z-u146)*u147;k.x+=y*sign(a0.x)*(1.-u86);vec3 z=t*(k+u)*v+b;vec2 A=j*x;vec3 B=vec3(g*A,-j)+z*vec3(1.,-1.,-1.);gl_Position=u76*(vec4(u88*e,e)*vec4(B,1.)),vv0=a1;}",
            i: ["u148"].concat(H, n),
            J: ["a0", "a1"],
            S: [3, 2],
            precision: "lowp",
          };
          g.s110 = {
            name: "_",
            g: "uniform vec3 u148;void main(){gl_FragColor=vec4(u148,0.);}",
            v: "attribute vec3 a0;uniform sampler2D u41;uniform vec3 u144;uniform vec2 u42,u152;uniform float u145,u146,u147,u153;const vec2 e=vec2(1.);const vec3 l=vec3(1.);const vec2 B=vec2(-1.,1.),m=vec2(.16,.5),n=vec2(.5,.5),o=vec2(.84,.5);uniform mat4 u76;uniform vec3 u79,u83,u84,u85;uniform float u77,u78,u86,u87,u80,u81,u82,u88;mat3 p(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u41,m);vec2 f=u86*e;vec3 c=u86*l;vec2 q=mix(d.a*u42,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u41,n).rgb+vec3(u80,0.,0.),u83,c);float r=mix(texture2D(u41,o).r,0.,u86);a.z+=r;mat3 s=p(a);vec3 t=mix(u144,u84,c);float u=mix(u145,u87,u86);vec3 b=mix(u79,u85,c);b.x+=u77*sin(a.y),b.y+=u78*sin(a.x)*step(0.,a.x);float h=cos(a.z),i=sin(a.z);mat2 v=mat2(h,i,-i,h);b.xy=v*b.xy;float w=mix(u82,1.,u86);vec2 j=u81/q;vec3 k=a0;float x=max(0.,-a0.z-u146)*u147;k.x+=x*sign(a0.x)*(1.-u86);vec3 y=s*(k+t)*u+b;vec2 z=j*w;vec3 A=vec3(g*z,-j)+y*vec3(1.,-1.,-1.);gl_Position=u76*(vec4(u88*e,e)*vec4(A,1.));}",
            i: ["u148"].concat(n),
            S: [3],
            precision: "lowp",
          };
          g.s111 = {
            name: "_",
            g: "uniform vec4 u13;varying vec3 vv0;varying float vv1;void main(){float a=u13.x+u13.y*smoothstep(-u13.w,-u13.z,vv1);gl_FragColor=vec4(normalize(vv0),a);}",
            v: "attribute vec3 a0,a2;uniform sampler2D u41;uniform vec3 u144;uniform vec2 u42,u152;uniform float u145,u146,u147,u153;varying vec3 vv0;varying float vv1;const vec2 e=vec2(1.);const vec3 o=vec3(1.);const vec2 D=vec2(-1.,1.),p=vec2(.16,.5),q=vec2(.5,.5),r=vec2(.84,.5);uniform mat4 u76;uniform vec3 u79,u83,u84,u85;uniform float u77,u78,u86,u87,u80,u81,u82,u88;mat3 s(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u41,p);vec2 f=u86*e;vec3 c=u86*o;vec2 t=mix(d.a*u42,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u41,q).rgb+vec3(u80,0.,0.),u83,c);float u=mix(texture2D(u41,r).r,0.,u86);a.z+=u;mat3 h=s(a);vec3 v=mix(u144,u84,c);float w=mix(u145,u87,u86);vec3 b=mix(u79,u85,c);b.x+=u77*sin(a.y),b.y+=u78*sin(a.x)*step(0.,a.x);float i=cos(a.z),j=sin(a.z);mat2 x=mat2(i,j,-j,i);b.xy=x*b.xy;float y=mix(u82,1.,u86);vec2 k=u81/t;vec3 l=a0;float z=max(0.,-a0.z-u146)*u147;l.x+=z*sign(a0.x)*(1.-u86);vec3 A=h*(l+v)*w+b;vec2 B=k*y;vec3 C=vec3(g*B,-k)+A*vec3(1.,-1.,-1.);gl_Position=u76*(vec4(u88*e,e)*vec4(C,1.)),vv0=h*a2*vec3(1.,-1.,-1.),vv1=a0.y;}",
            i: ["u13", "u79"].concat(n),
            J: ["a0", "a2"],
            precision: "highp",
          };
          g.s112 = {
            name: "_",
            g: "uniform sampler2D u154;uniform vec4 u13;varying vec4 vv0;varying vec3 vv1;varying vec2 vv2;varying float vv3;const vec3 i=vec3(1.,1.,1.);void main(){vec3 j=vec3(0.,0.,-1.),c=normalize(vv1),b=texture2D(u154,vv2).xyz;b=normalize(b*255./127.-1.007874*i);vec3 d=vv0.xyz,k=cross(c,d)*vv0.w;mat3 l=mat3(d,k,c);vec3 a=l*b;a=dot(a,j)>0.?vv1:a;float m=u13.x+u13.y*smoothstep(-u13.w,-u13.z,vv3);gl_FragColor=vec4(a,m);}",
            v: "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u41;uniform vec3 u144;uniform vec2 u42,u152;uniform float u145,u146,u147,u153;varying vec4 vv0;varying vec3 vv1;varying vec2 vv2;varying float vv3;const vec2 e=vec2(1.);const vec3 q=vec3(1.);const vec2 F=vec2(-1.,1.),r=vec2(.16,.5),s=vec2(.5,.5),t=vec2(.84,.5);uniform mat4 u76;uniform vec3 u79,u83,u84,u85;uniform float u77,u78,u86,u87,u80,u81,u82,u88;mat3 u(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u41,r);vec2 f=u86*e;vec3 c=u86*q;vec2 v=mix(d.a*u42,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u41,s).rgb+vec3(u80,0.,0.),u83,c);float w=mix(texture2D(u41,t).r,0.,u86);a.z+=w;mat3 h=u(a);vec3 x=mix(u144,u84,c);float y=mix(u145,u87,u86);vec3 b=mix(u79,u85,c);b.x+=u77*sin(a.y),b.y+=u78*sin(a.x)*step(0.,a.x);float i=cos(a.z),j=sin(a.z);mat2 z=mat2(i,j,-j,i);b.xy=z*b.xy;float A=mix(u82,1.,u86);vec2 k=u81/v;vec3 l=a0;float B=max(0.,-a0.z-u146)*u147;l.x+=B*sign(a0.x)*(1.-u86);vec3 C=h*(l+x)*y+b;vec2 D=k*A;vec3 E=vec3(g*D,-k)+C*vec3(1.,-1.,-1.);gl_Position=u76*(vec4(u88*e,e)*vec4(E,1.)),vv1=h*a2*vec3(1.,-1.,-1.),vv0=a3,vv2=a1,vv3=a0.y;}",
            i: ["u13", "u79", "u154"].concat(n),
            J: ["a3", "a0", "a2", "a1"],
            S: [4, 3, 3, 2],
            precision: "highp",
          };
          g.s113 = {
            name: "_",
            g: "uniform vec4 u112;uniform float u149;void main(){float b=u149;vec4 a=u112;float c=floor(15.99*b),d=floor(15.99*a.b);a.b=(c+16.*d)/255.,gl_FragColor=a;}",
            v: "attribute vec3 a0;uniform sampler2D u41;uniform vec3 u144;uniform vec2 u42,u152;uniform float u145,u146,u147,u153;const vec2 e=vec2(1.);const vec3 l=vec3(1.);const vec2 B=vec2(-1.,1.),m=vec2(.16,.5),n=vec2(.5,.5),o=vec2(.84,.5);uniform mat4 u76;uniform vec3 u79,u83,u84,u85;uniform float u77,u78,u86,u87,u80,u81,u82,u88;mat3 p(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u41,m);vec2 f=u86*e;vec3 c=u86*l;vec2 q=mix(d.a*u42,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u41,n).rgb+vec3(u80,0.,0.),u83,c);float r=mix(texture2D(u41,o).r,0.,u86);a.z+=r;mat3 s=p(a);vec3 t=mix(u144,u84,c);float u=mix(u145,u87,u86);vec3 b=mix(u79,u85,c);b.x+=u77*sin(a.y),b.y+=u78*sin(a.x)*step(0.,a.x);float h=cos(a.z),i=sin(a.z);mat2 v=mat2(h,i,-i,h);b.xy=v*b.xy;float w=mix(u82,1.,u86);vec2 j=u81/q;vec3 k=a0;float x=max(0.,-a0.z-u146)*u147;k.x+=x*sign(a0.x)*(1.-u86);vec3 y=s*(k+t)*u+b;vec2 z=j*w;vec3 A=vec3(g*z,-j)+y*vec3(1.,-1.,-1.);gl_Position=u76*(vec4(u88*e,e)*vec4(A,1.));}",
            i: ["u112", "u149"].concat(n),
            precision: "lowp",
          };
          g.s114 = {
            name: "_",
            g: "uniform sampler2D u74;uniform vec4 u112,u75;uniform float u149;varying vec2 vv0;vec2 i(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float c=u149;vec4 a=u112,d=texture2D(u74,vv0);vec2 b=i(d.b,4.);float f=1.-b.x,g=b.y;b=i(d.a,1.);float h=b.x,e=b.y;vec4 k=vec4(d.rg,g,h);float l=f;a=mix(a,k,u75*e),c=mix(c,l,u75.b*e);float m=floor(15.99*c),n=floor(15.99*a.b);a.b=(m+16.*n)/255.,gl_FragColor=a;}",
            v: "attribute vec3 a0;attribute vec2 a1;uniform sampler2D u41;uniform vec3 u144;uniform vec2 u42,u152;uniform float u145,u146,u147,u153;varying vec2 vv0;const vec2 e=vec2(1.);const vec3 m=vec3(1.);const vec2 C=vec2(-1.,1.),n=vec2(.16,.5),o=vec2(.5,.5),p=vec2(.84,.5);uniform mat4 u76;uniform vec3 u79,u83,u84,u85;uniform float u77,u78,u86,u87,u80,u81,u82,u88;mat3 q(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u41,n);vec2 f=u86*e;vec3 c=u86*m;vec2 r=mix(d.a*u42,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u41,o).rgb+vec3(u80,0.,0.),u83,c);float s=mix(texture2D(u41,p).r,0.,u86);a.z+=s;mat3 t=q(a);vec3 u=mix(u144,u84,c);float v=mix(u145,u87,u86);vec3 b=mix(u79,u85,c);b.x+=u77*sin(a.y),b.y+=u78*sin(a.x)*step(0.,a.x);float h=cos(a.z),i=sin(a.z);mat2 w=mat2(h,i,-i,h);b.xy=w*b.xy;float x=mix(u82,1.,u86);vec2 j=u81/r;vec3 k=a0;float y=max(0.,-a0.z-u146)*u147;k.x+=y*sign(a0.x)*(1.-u86);vec3 z=t*(k+u)*v+b;vec2 A=j*x;vec3 B=vec3(g*A,-j)+z*vec3(1.,-1.,-1.);gl_Position=u76*(vec4(u88*e,e)*vec4(B,1.)),vv0=a1;}",
            i: ["u112", "u149"].concat(y, n),
            J: ["a0", "a1"],
            S: [3, 2],
            precision: "lowp",
          };
          n = ["u137", "u125", "u138"];
          g.s115 = {
            name: "_",
            g: "varying vec3 vv0;varying float vv1;void main(){gl_FragColor=vec4(vv0,vv1);}",
            v: "attribute vec3 a0;uniform mat4 u137,u125,u138;varying vec3 vv0;varying float vv1;void main(){vec4 a=u138*vec4(a0,1.);gl_Position=u137*u125*a,vv0=a.xyz,vv1=1.;}",
            i: n,
            precision: "highp",
          };
          g.s116 = {
            name: "_",
            g: "varying vec3 vv0;void main(){gl_FragColor=vec4(normalize(vv0),1.);}",
            v: "attribute vec3 a0,a2;uniform mat4 u137,u125,u138;varying vec3 vv0;varying float vv1;void main(){vec4 a=u138*vec4(a2,0.);gl_Position=u137*u125*u138*vec4(a0,1.),vv0=a.xyz,vv1=a0.y;}",
            i: n,
            J: ["a0", "a2"],
            precision: "highp",
          };
          g.s106 = {
            name: "_",
            g: "uniform sampler2D u154;uniform vec3 u155;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;const vec3 i=vec3(1.,1.,1.);void main(){vec3 j=normalize(vv1+u155),c=normalize(vv2),b=texture2D(u154,vv3).xyz;b=normalize(b*255./127.-1.007874*i);vec3 d=vv0.xyz,k=cross(c,d)*vv0.w;mat3 l=mat3(d,k,c);vec3 a=l*b;a=dot(a,j)>0.?vv2:a,gl_FragColor=vec4(a,1.);}",
            v: "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u137,u125,u138;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;void main(){vec4 b=u138*vec4(a2,0.),a=u138*vec4(a0,1.);gl_Position=u137*u125*a,vv0=a3,vv2=b.xyz,vv3=a1,vv1=a.xyz;}",
            i: ["u154", "u155"].concat(n),
            J: ["a0", "a2", "a1", "a3"],
            precision: "highp",
          };
          g.s105 = {
            name: "_",
            g: "uniform sampler2D u1;uniform vec3 u148;uniform float u73;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);vec3 b=mix(u148,a.rgb,a.a);vec4 c=vec4(mix(a.rgb*u148,b,u73),a.a);gl_FragColor=c;}",
            v: "attribute vec3 a0;attribute vec2 a1;uniform mat4 u137,u125,u138;varying vec2 vv0;const vec4 f=vec4(0.,0.,5e-4,0.);void main(){gl_Position=u137*u125*u138*vec4(a0,1.)+f,vv0=a1;}",
            i: ["u148"].concat(H, n),
            J: ["a0", "a1"],
            Ha: [{ search: "0.0005", replace: Fa.ha() ? "0.0005" : "0.0" }],
            precision: "lowp",
          };
          g.s117 = {
            name: "_",
            g: "uniform vec4 u112;uniform float u149;void main(){float b=u149;vec4 a=u112;float c=floor(15.99*b),d=floor(15.99*a.b);a.b=(c+16.*d)/255.,gl_FragColor=a;}",
            v: "attribute vec3 a0;uniform mat4 u137,u125,u138;void main(){gl_Position=u137*u125*u138*vec4(a0,1.);}",
            i: ["u112"].concat(n),
            precision: "highp",
          };
          g.s107 = {
            name: "_",
            g: "uniform sampler2D u74;uniform vec4 u112,u75;uniform float u149;varying vec2 vv0;vec2 i(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float c=u149;vec4 a=u112,d=texture2D(u74,vv0);vec2 b=i(d.b,4.);float f=1.-b.x,g=b.y;b=i(d.a,1.);float h=b.x,e=b.y;vec4 k=vec4(d.rg,g,h);float l=f;a=mix(a,k,u75*e),c=mix(c,l,u75.b*e);float m=floor(15.99*c),n=floor(15.99*a.b);a.b=(m+16.*n)/255.,gl_FragColor=a;}",
            v: "attribute vec3 a0;attribute vec2 a1;uniform mat4 u137,u125,u138;varying vec2 vv0;void main(){gl_Position=u137*u125*u138*vec4(a0,1.),vv0=a1;}",
            i: ["u112"].concat(y, n),
            J: ["a0", "a1"],
            S: [3, 2],
            precision: "highp",
          };
        }
        function r() {
          for (var n in g) l(c, g[n]);
        }
        var w = !1,
          H = ["u1", "u73"],
          y = ["u74", "u75"],
          x = "u76 u77 u78 u79 u80 u81 u82".split(" "),
          z = "u83 u84 u85 u86 u87 u88".split(" "),
          g = {},
          k = -1,
          D = null,
          M = 0,
          C = {
            na: function (n, e) {
              g[n] = e;
              w && l(c, g[n]);
            },
            sq: function (n, e) {
              g[n] = e;
              e.ki = !1;
              l(c, g[n]);
            },
            Zb: function () {
              return w;
            },
            m: function () {
              g.s0 = u();
              g.s1 = {
                name: "_",
                g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                i: ["u1"],
                precision: "lowp",
              };
              g.s75 = {
                name: "_",
                g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(-1.,1.)*vv0+vec2(1.,0.));}",
                i: ["u1"],
                precision: "lowp",
              };
              g.s76 = {
                name: "_",
                g: "uniform sampler2D u1,u12;uniform float u13;varying vec2 vv0;const vec3 f=vec3(1.,1.,1.);void main(){gl_FragColor=vec4(mix(texture2D(u12,vv0).rgb,texture2D(u1,vv0).rgb,u13*f),1.);}",
                i: ["u1", "u12", "u13"],
                precision: "highp",
              };
              g.s77 = {
                name: "_",
                g: "uniform sampler2D u1,u12;uniform float u13;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){gl_FragColor=mix(texture2D(u12,vv0),texture2D(u1,vv0),u13*f);}",
                i: ["u1", "u12", "u13"],
                precision: "highp",
              };
              g.s12 = {
                name: "_",
                g: "uniform sampler2D u1,u89;uniform vec2 u90;uniform float u91,u92;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 b=texture2D(u89,vv0*u90),c=texture2D(u1,vv0*u90);float a=smoothstep(u91,0.,vv0.y);a+=smoothstep(1.-u91,1.,vv0.y),gl_FragColor=pow(mix(c,b,a*f),u92*f);}",
                i: ["u1", "u90", "u89", "u91", "u92"],
              };
              g.s78 = {
                name: "_",
                g: "uniform sampler2D u1,u89;uniform vec2 u90;uniform float u91,u92;varying vec2 vv0;const vec3 h=vec3(1.,1.,1.);vec4 i(vec3 d){vec3 b=d/65536.,a=clamp(ceil(log2(b)),-128.,127.);float c=max(max(a.r,a.g),a.b),f=exp2(c);vec3 g=clamp(b/f,0.,1.);return vec4(g,(c+128.)/256.);}void main(){vec2 a=vv0*u90;float c=floor(a.x),d=mod(c,2.);a.x=mod(a.x,1.),a.x=mix(a.x,1.-a.x,d);vec3 f=texture2D(u89,a).rgb,g=texture2D(u1,a).rgb;float b=smoothstep(u91,0.,vv0.y);b+=smoothstep(1.-u91,1.,vv0.y);vec3 j=mix(g,f,b*h);vec4 k=i(pow(j,u92*h));gl_FragColor=k;}",
                i: ["u1", "u90", "u89", "u91", "u92"],
                precision: "highp",
              };
              g.s79 = {
                name: "_",
                g: "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);if(a.a<.5)discard;gl_FragColor=a;}",
                i: ["u1"],
                precision: "lowp",
              };
              g.s80 = {
                name: "_",
                g: "uniform sampler2D u1,u93;uniform vec2 u14;varying vec2 vv0;const vec2 f=vec2(-.9,.4),g=vec2(.4,.9),h=vec2(-.4,-.9),i=vec2(.9,-.4);void main(){vec2 a=vv0;vec3 b=texture2D(u1,a).rgb+texture2D(u1,a+u14*f).rgb+texture2D(u1,a+u14*g).rgb+texture2D(u1,a+u14*h).rgb+texture2D(u1,a+u14*i).rgb;gl_FragColor=vec4(b/5.,1.);}",
                i: ["u1", "u14"],
                precision: "lowp",
              };
              g.s81 = {
                name: "_",
                g: "uniform sampler2D u1,u93,u41;uniform vec2 u14,u94;varying vec2 vv0;const vec3 k=vec3(1.,1.,1.);const vec2 f=vec2(-.9,.4),g=vec2(.4,.9),h=vec2(-.4,-.9),i=vec2(.9,-.4);void main(){vec2 a=vv0;vec3 b=texture2D(u1,a).rgb+texture2D(u1,a+u14*f).rgb+texture2D(u1,a+u14*g).rgb+texture2D(u1,a+u14*h).rgb+texture2D(u1,a+u14*i).rgb;float c=texture2D(u41,vec2(.5,.5)).a,d=u94.x+pow(c,2.)*(u94.y-u94.x);vec3 j=mix(b/5.,texture2D(u93,a).rgb,d);gl_FragColor=vec4(j,1.);}",
                i: ["u1", "u93", "u14", "u41", "u94"],
                precision: "lowp",
              };
              g.s82 = {
                name: "_",
                g: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;const vec3 f=vec3(.299,.587,.114);const float m=.007813,n=.125,h=8.;void main(){vec2 x=vv0;vec3 o=texture2D(u1,vv0+vec2(-1.,-1.)*u14).xyz,p=texture2D(u1,vv0+vec2(1.,-1.)*u14).xyz,q=texture2D(u1,vv0+vec2(-1.,1.)*u14).xyz,r=texture2D(u1,vv0+vec2(1.,1.)*u14).xyz,s=texture2D(u1,vv0).xyz;float b=dot(o,f),c=dot(p,f),e=dot(q,f),g=dot(r,f),i=dot(s,f),t=min(i,min(min(b,c),min(e,g))),u=max(i,max(max(b,c),max(e,g)));vec2 a;a.x=-(b+c-(e+g)),a.y=b+e-(c+g);float v=max((b+c+e+g)*(.25*n),m),w=1./(min(abs(a.x),abs(a.y))+v);a=min(vec2(h,h),max(vec2(-h,-h),a*w))*u14;vec3 j=.5*(texture2D(u1,vv0+a*-.166667).rgb+texture2D(u1,vv0+a*.166667).rgb),k=j*.5+.25*(texture2D(u1,vv0+a*-.5).rgb+texture2D(u1,vv0+a*.5).rgb);float l=dot(k,f);gl_FragColor=l<t||l>u?vec4(j,1.):vec4(k,1.);}",
                i: ["u1", "u14"],
                precision: "lowp",
              };
              g.s83 = {
                name: "_",
                g: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;const vec2 f=vec2(-.9,.4),g=vec2(.4,.9),h=vec2(-.4,-.9),i=vec2(.9,-.4);void main(){vec2 a=vv0;vec4 b=texture2D(u1,a)+texture2D(u1,a+u14*f)+texture2D(u1,a+u14*g)+texture2D(u1,a+u14*h)+texture2D(u1,a+u14*i);gl_FragColor=b/5.;}",
                i: ["u1", "u14"],
                precision: "lowp",
              };
              g.RGBEtoRGB = {
                name: "_",
                g: "uniform sampler2D u1;varying vec2 vv0;vec3 f(vec4 a){float b=a.a*256.-128.;vec3 c=a.rgb;return exp2(b)*c*65536.;}void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=vec4(f(a),1.);}",
                i: ["u1"],
                precision: "highp",
              };
              g.s13 = {
                name: "_",
                g: "uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(0.,0.,0.);vec4 g(vec3 d){vec3 b=d/65536.,a=clamp(ceil(log2(b)),-128.,127.);float c=max(max(a.r,a.g),a.b),h=exp2(c);vec3 i=clamp(b/h,0.,1.);return vec4(i,(c+128.)/256.);}void main(){vec3 a=texture2D(u1,vv0).rgb;gl_FragColor=g(max(a,f));}",
                i: ["u1"],
                precision: "highp",
              };
              g.s84 = {
                name: "_",
                g: "uniform sampler2D u95,u96;uniform float u97,u98;varying vec2 vv0;void main(){vec3 a=texture2D(u96,vv0).rgb,b=texture2D(u95,vv0).rgb;gl_FragColor=vec4(b*u98+u97*a,1.);}",
                i: ["u95", "u96", "u97", "u98"],
                precision: "highp",
              };
              g.s85 = {
                name: "_",
                g: "uniform sampler2D u99,u100;uniform float u92;varying vec2 vv0;const int j=8888;const float e=3.141592;const vec2 k=vec2(0.,0.);const vec3 n=vec3(1.,1.,1.),o=vec3(0.,0.,0.);void main(){float p=e*(vv0.x*2.-1.),q=e/2.*(vv0.y*2.-1.),b,c,r,l,m;vec4 d;vec3 f=o;vec2 g=k,a=k;for(int h=0;h<j;h+=1)a.x=float(h),a.y=floor(a.x/64.),d=texture2D(u100,a/64.),b=e*d.r,c=2.*asin(sqrt(.25+d.g*.25)),l=p+c*cos(b),m=q+c*sin(b),g.x=.5+.5*l/e,g.y=.5+m/e,f+=pow(texture2D(u99,g).rgb,u92*n);f/=float(j),gl_FragColor=vec4(f,1.);}",
                i: ["u99", "u100", "u92"],
                precision: "lowp",
                Ha: [{ search: "8888", replace: V.zm[ha.W()] }],
              };
              g.s86 = {
                name: "_",
                g: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);float b=.031496*texture2D(u1,vv0-3.*u14).a+.110236*texture2D(u1,vv0-2.*u14).a+.220472*texture2D(u1,vv0-u14).a+.275591*a.a+.220472*texture2D(u1,vv0+u14).a+.110236*texture2D(u1,vv0+2.*u14).a+.031496*texture2D(u1,vv0+3.*u14).a;gl_FragColor=vec4(a.rgb,4.*b);}",
                i: ["u1", "u14"],
                precision: "lowp",
              };
              g.s87 = {
                name: "_",
                g: "uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);float b=.3*pow(a.a,2.);gl_FragColor=vec4(a.rgb+b*f,1.);}",
                i: ["u1"],
                precision: "lowp",
              };
              g.s88 = {
                name: "_",
                g: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;void main(){vec4 a=.031496*texture2D(u1,vv0-3.*u14)+.110236*texture2D(u1,vv0-2.*u14)+.220472*texture2D(u1,vv0-u14)+.275591*texture2D(u1,vv0)+.220472*texture2D(u1,vv0+u14)+.110236*texture2D(u1,vv0+2.*u14)+.031496*texture2D(u1,vv0+3.*u14);gl_FragColor=a;}",
                i: ["u1", "u14"],
                precision: "lowp",
              };
              g.s89 = {
                name: "_",
                g: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0-3.*u14)+texture2D(u1,vv0-2.*u14)+texture2D(u1,vv0-u14)+texture2D(u1,vv0)+texture2D(u1,vv0+u14)+texture2D(u1,vv0+2.*u14)+texture2D(u1,vv0+3.*u14);gl_FragColor=a/7.;}",
                i: ["u1", "u14"],
                precision: "lowp",
              };
              g.s90 = {
                name: "_",
                g: "uniform sampler2D u1;varying vec2 vv0;const vec4 g=vec4(0.,0.,0.,0.);const float e=256.;void main(){vec4 b=g;float c=0.;vec2 d;for(float a=0.;a<e;a+=1.)d=vec2((a+.5)/e,vv0.y),b+=texture2D(u1,d),c+=1.;gl_FragColor=b/c;}",
                i: ["u1"],
                precision: "highp",
              };
              g.s91 = {
                name: "_",
                g: "uniform sampler2D u1,u89;varying vec2 vv0;const vec4 h=vec4(1.,1.,1.,1.);const float f=0.,g=.3;void main(){vec4 b=texture2D(u89,vv0),c=texture2D(u1,vv0);float a=smoothstep(g,f,vv0.y);a+=smoothstep(1.-g,1.-f,vv0.y),gl_FragColor=mix(c,b,a*h);}",
                i: ["u1", "u89"],
                precision: "highp",
              };
              g.s92 = {
                name: "_",
                g: "uniform sampler2D u1,u89;varying vec2 vv0;const vec3 h=vec3(1.,1.,1.);const float f=0.,g=.3;vec4 i(vec3 d){vec3 b=d/65536.,a=clamp(ceil(log2(b)),-128.,127.);float c=max(max(a.r,a.g),a.b),j=exp2(c);vec3 k=clamp(b/j,0.,1.);return vec4(k,(c+128.)/256.);}void main(){vec3 b=texture2D(u89,vv0).rgb,c=texture2D(u1,vv0).rgb;float a=smoothstep(g,f,vv0.y);a+=smoothstep(1.-g,1.-f,vv0.y),gl_FragColor=i(mix(c,b,a*h));}",
                i: ["u1", "u89"],
                precision: "highp",
              };
              g.s93 = {
                name: "_",
                g: "uniform sampler2D u1,u101,u2,u102;uniform vec4 u103;uniform vec2 u104;uniform float u105,u106,u107,u108;varying vec2 vv0;const vec2 g=vec2(1.,1.),h=vec2(.5,.5);const float e=3.141592;void main(){vec4 d=texture2D(u1,vv0),i=texture2D(u101,vec2(1.-vv0.x,vv0.y));float j=step(texture2D(u102,vec2(.25,.5)).r,1.);vec2 a=vv0*2.-g;float k=texture2D(u2,a*u104*.5+h).r,l=atan(a.x,a.y),m=-(mod(u105,2.*e)-e),b=mod(l-m+e,2.*e)-e,n=smoothstep(0.,u106,b),c=.5+u108*(.5-n);c*=(sign(b)+1.)/2.;vec4 o=i+c*u103*k;gl_FragColor=mix(d,o,j*u107);}",
                i: "u1 u2 u102 u101 u103 u105 u106 u107 u104 u108".split(" "),
                precision: "lowp",
              };
              var n =
                "u109 u110 u111 u112 u99 u113 u3 u114 u101 u115 u116 u117 u118 u119 u14".split(
                  " "
                );
              V.ga_ &&
                (g.s94 = {
                  name: "_",
                  g: "uniform sampler2D u109,u110,u111,u112,u99,u113,u120,u101;uniform vec3 u114,u117;uniform vec2 u14;uniform float u3,u121,u116,u118,u115;varying vec2 vv0;const float j=3.141592;const vec3 u=vec3(0.,0.,0.),v=vec3(.299,.587,.114);const float w=2.;vec3 l(vec4 a){float b=a.a*256.-128.;vec3 c=a.rgb;return exp2(b)*c*65536.;}vec2 x(vec3 a){float b=atan(a.x,a.z),c=acos(-a.y);return vec2(.5-.5*b/j,1.-c/j);}vec2 y(vec3 a,float b){vec2 d=vec2(1.,.5)/pow(2.,b),f=vec2(0.,1.-pow(.5,b));float g=atan(a.x,a.z),h=acos(-a.y),c=.5+.5*g/j,i=h/j,k=pow(2.,b)/u115;c=(1.-k)*c;return f+vec2(c,i)*d;}void main(){vec4 c=texture2D(u109,vv0);vec3 k=texture2D(u101,vec2(1.-vv0.x,vv0.y)).rgb;if(c.a<.01){gl_FragColor=vec4(k,0.);return;}float z=c.a;vec3 A=c.rgb,B=A+u114;vec4 b=texture2D(u112,vv0),m=texture2D(u110,vv0);vec3 d=m.rgb;float f=m.a;vec4 n=texture2D(u111,vv0);vec3 C=n.rgb;float o=b.r,D=b.g,p=floor(b.b*255.),g=floor(p/16.),E=(p-16.*g)/16.;g/=16.;float F=b.a;f=1.-(1.-f)*(1.-n.a);vec2 G=x(-d);vec3 q=(1.-F)*l(texture2D(u113,G)),r=normalize(B),h=u,s=reflect(-r,d);vec2 H=y(s,floor(D*u3));float I=acos(-s.z),J=smoothstep(u116-u118,u116+u118,I);h=mix(l(texture2D(u99,H)),u117,J);float a=o+(E-o)*pow(1.-dot(d,-r),g*16.);a=clamp(a,0.,1.);float t=1.-u121*texture2D(u120,vv0).r;h*=pow(t,2.),q*=t;vec3 i=C*mix(q,h,a),M=mix(k,i,z*(f*(1.-a)+a));float K=dot(i,v),L=max(0.,(K-1.)/(w-1.));gl_FragColor=vec4(i,L);}",
                  i: n.concat(["u120", "u121"]),
                  precision: "highp",
                });
              g.s95 = {
                name: "_",
                g: "uniform sampler2D u109,u110,u111,u112,u99,u113,u101;uniform vec3 u114,u117;uniform vec2 u14;uniform float u3,u116,u118,u119,u122,u123,u115,u124;varying vec2 vv0;const float g=3.141592;const vec3 G=vec3(0.),m=vec3(1.),H=vec3(.299,.587,.114);const float I=2.;vec3 r(vec4 a){float b=a.a*256.-128.;vec3 c=a.rgb;return exp2(b)*c*65536.;}vec2 J(vec3 a){float b=atan(a.x,-a.z),c=acos(-a.y);return vec2(.5-.5*b/g,1.-c/g);}vec2 K(vec3 a,float e){float b=pow(2.,e);vec2 f=vec2(1.,.5)/b,h=vec2(0.,1.-1./b);float i=atan(a.x,a.z),j=acos(-a.y),c=.5+.5*i/g,k=j/g,l=.5*b/u115;c=(1.-l)*c;return h+vec2(c,k)*f;}float n(vec3 a,vec3 b){return abs(acos(dot(a,b)));}float o(vec2 a){float b=texture2D(u109,a).a;return step(.01,b);}vec3 p(vec2 a){return texture2D(u101,vec2(1.-a.x,a.y)).rgb;}void main(){vec4 h=texture2D(u109,vv0);if(h.a<.01)gl_FragColor=vec4(p(vv0),0.);float i=h.a;vec3 L=h.rgb,M=L+u114;vec4 c=texture2D(u112,vv0),s=texture2D(u110,vv0);vec3 a=s.rgb;float j=s.a;vec4 k=texture2D(u111,vv0);vec3 e=k.rgb;if(i>1.){gl_FragColor=vec4(mix(p(vv0),e,k.a),1.);return;}e=pow(e,u122*m);float t=c.r,N=c.g,O=c.a,u=floor(c.b*255.),l=floor(u/16.),P=(u-16.*l)/16.;l/=16.,j=1.-(1.-j)*(1.-k.a);vec2 v=vv0+vec2(-1.,0.)*u14,w=vv0+vec2(1.,0.)*u14,x=vv0+vec2(0.,1.)*u14,y=vv0+vec2(0.,-1.)*u14;vec3 Q=texture2D(u110,v).rgb,R=texture2D(u110,w).rgb,S=texture2D(u110,x).rgb,T=texture2D(u110,y).rgb;float U=n(a,Q)*o(v),V=n(a,R)*o(w),W=n(a,S)*o(x),X=n(a,T)*o(y),Y=2.*max(max(U,V),max(W,X)),Z=1.2*clamp(Y/g,0.,1.),_=max(N,Z);vec2 aa=J(a);vec3 ba=r(texture2D(u113,aa)),ca=(1.-O)*ba,z=normalize(M),A=G,B=reflect(-z,a);float da=floor(_*u3);vec2 ea=K(B,da);float fa=acos(-B.z),ga_=smoothstep(u116-u118,u116+u118,fa);vec3 ha=r(texture2D(u99,ea));A=mix(ha,u117,ga_*u119);float b=t+(P-t)*pow(1.+dot(a,z),l*15.);b=clamp(b,0.,1.);vec2 C=vv0;vec3 D=refract(vec3(0.,0.,-1.),a,.666667);float ia=smoothstep(.1,.3,length(D.xy)),E=sqrt(u14.y/u14.x),ja=smoothstep(.3,.8,i);C+=ja*D.xy*vec2(1./E,E)*ia*.03;vec3 ka=e*mix(ca,A,b);float q=i*(j*(1.-b)+b);vec3 f=mix(p(C),pow(ka,m/u122),q);float F=dot(f,H),la=max(0.,(F-1.)/(I-1.));f=mix(F*m,f,mix(1.,u123,q)*m);float ma=mix(la,q,u124);gl_FragColor=vec4(f,ma);}",
                i: n.concat(["u124", "u122", "u123"]),
                precision: "highp",
              };
              V.ga_ &&
                ((g.s96 = {
                  name: "_",
                  g: "uniform sampler2D u109,u110;uniform mat4 u125;uniform vec2 u126,u14,u127;uniform float u128,u129,u130,u131,u132,u133,u134,u135,u121;varying vec2 vv0;const float PI=3.141593,HALFPI=1.570796,N=8888.8;void main(){vec2 uvt=vv0+u127;vec4 pos=texture2D(u109,uvt);if(pos.a<.01){gl_FragColor=vec4(0.,0.,0.,1.);return;}vec3 co0=pos.rgb;float c=cos(u128),s=sin(u128);vec3 no0=texture2D(u110,uvt).rgb;float zv=(u125*vec4(co0,1.)).z;vec3 co;vec2 scale=u126/abs(zv),uv,duv=u14*vec2(c,s)*scale;vec3 dp,dpn;float dzMax=0.,angleMin=0.,angle;for(float i=0.;i<N;i+=1.)uv=uvt+i*duv,co=texture2D(u109,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u134,u135,length(dp)),angleMin=max(angleMin,angle),dzMax=max(dzMax,sin(angle)*length(dp));float angleMinInv=0.;for(float i=0.;i<N;i+=1.)uv=uvt-i*duv,co=texture2D(u109,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u134,u135,length(dp)),dzMax=max(dzMax,sin(angle)*length(dp)),angleMinInv=max(angleMinInv,angle);duv=u14*vec2(s,c)*scale;float angleMin2=0.;for(float i=0.;i<N;i+=1.)uv=uvt+i*duv,co=texture2D(u109,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u134,u135,length(dp)),dzMax=max(dzMax,sin(angle)*length(dp)),angleMin2=max(angleMin2,angle);float angleMin2Inv=0.;for(float i=0.;i<N;i+=1.)uv=uvt-i*duv,co=texture2D(u109,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u134,u135,length(dp)),dzMax=max(dzMax,sin(angle)*length(dp)),angleMin2Inv=max(angleMin2Inv,angle);float omegaMin=PI/4.*(angleMin+angleMinInv)*(angleMin2+angleMin2Inv),dzFactor=clamp(dzMax/u131,u132,1.),ao=dzFactor*clamp(u130*omegaMin*u133,0.,u121);gl_FragColor=vec4(ao,ao,ao,u129);}",
                  i: "u109 u110 u130 u129 u128 u14 u136 u131 u132 u133 u134 u135 u125 u126 u121".split(
                    " "
                  ),
                  Ha: [{ search: "8888.8", replace: V.Ck[ha.W()].toFixed(1) }],
                  precision: "lowp",
                }),
                (g.s97 = {
                  name: "_",
                  g: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;const vec2 f=vec2(-.9,.4),g=vec2(.4,.9),h=vec2(-.4,-.9),i=vec2(.9,-.4),j=vec2(-1.9,.9),k=vec2(.9,1.9),l=vec2(-.9,-1.9),m=vec2(1.9,-.9);void main(){vec2 a=vv0;vec4 b=texture2D(u1,a)+texture2D(u1,a+u14*f)+texture2D(u1,a+u14*g)+texture2D(u1,a+u14*h)+texture2D(u1,a+u14*i);b+=texture2D(u1,a+u14*j)+texture2D(u1,a+u14*k)+texture2D(u1,a+u14*l)+texture2D(u1,a+u14*m),gl_FragColor=b/9.;}",
                  i: ["u1", "u14"],
                  precision: "lowp",
                }));
              g.s98 = {
                name: "_",
                g: "varying vec3 vv0;void main(){gl_FragColor=vec4(vv0,1.);}",
                v: "attribute vec3 a0;uniform mat4 u137,u125,u138;varying vec3 vv0;void main(){vec4 a=u137*u125*u138*vec4(a0,1.);gl_Position=a,vv0=a.xyz/a.w;}",
                i: ["u137", "u125", "u138"],
                precision: "lowp",
              };
              g.s99 = {
                name: "_",
                g: "uniform sampler2D u139,u113,u100;uniform mat4 u137,u140;uniform vec2 u141;uniform float u142;varying vec2 vv0;const float n=8888.8,o=9999.9,p=25.,v=50.,w=1.2,e=3.141592;const vec4 x=vec4(0.,0.,0.,0.),A=vec4(1.,1.,1.,1.);const vec2 f=vec2(.5,.5);vec2 y(vec3 a){float b=atan(a.x,a.z),c=acos(a.y);return vec2(.5-.5*b/e,1.-c/e);}void main(){float d,a,q;vec2 z=vec2(vv0.x,1.-vv0.y),b;vec3 r=vec3(u141*(z-f),0.),B=vec3(u140*vec4(r,1.)),g,s;vec4 t=x,h,c,u;vec3 i;int j;for(float k=0.;k<n;k+=1.){b.x=k,b.y=floor(b.x/64.),c=texture2D(u100,b/64.),d=e*c.r,a=2.*asin(sqrt(.25+c.g*.25)),g=vec3(cos(d)*sin(a),sin(d)*sin(a),-cos(a)),q=p+(.5+.5*c.b)*(v-p),j=0;for(float l=0.;l<=o;l+=1.){u=vec4(r+g*q*pow(l/o,w),1.),h=u137*u,i=h.xyz/h.w;if(texture2D(u139,f+f*i.xy).z<i.z){j=1;break;}}if(j==1)continue;s=vec3(u140*vec4(g,0.)),t+=texture2D(u113,y(s));}gl_FragColor=vec4(u142*t.rgb/n,1.);}",
                i: "u139 u113 u100 u137 u140 u141 u142".split(" "),
                Ha: [
                  { search: "8888.8", replace: V.xo[ha.W()].toFixed(1) },
                  { search: "9999.9", replace: V.yo[ha.W()].toFixed(1) },
                ],
                precision: "lowp",
              };
              g.s100 = {
                name: "_",
                g: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;void main(){vec4 a=.285714*texture2D(u1,vv0-u14)+.428571*texture2D(u1,vv0)+.285714*texture2D(u1,vv0+u14);gl_FragColor=a;}",
                i: ["u1", "u14"],
                precision: "lowp",
              };
              g.s101 = {
                name: "_",
                g: "uniform sampler2D u1,u143;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                v: "attribute vec3 a0;attribute vec2 a1;uniform mat4 u137,u125;varying vec2 vv0;void main(){vec4 a=u137*u125*vec4(a0,1.);gl_Position=a,vv0=a1;}",
                i: ["u137", "u125", "u1"],
                J: ["a0", "a1"],
                precision: "lowp",
              };
              if (ha.ca()) {
                n =
                  "u41 u144 u145 u146 u147 u42 u112 u148 u149 u13 u150 u151 u79"
                    .split(" ")
                    .concat(x, z);
                ha.xi() ||
                  (g.s102 = {
                    name: "_",
                    v: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                    g: "void main(){gl_FragData[0]=vec4(0.,0.,0.,0.),gl_FragData[1]=vec4(0.,0.,0.,0.),gl_FragData[2]=vec4(0.,0.,0.,0.),gl_FragData[3]=vec4(0.,0.,0.,0.);}",
                    i: [],
                    precision: "lowp",
                    ea: !0,
                  });
                g.s103 = {
                  name: "_",
                  v: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                  g: "uniform vec4 color;void main(){gl_FragData[0]=color,gl_FragData[1]=color,gl_FragData[2]=color,gl_FragData[3]=color;}",
                  i: ["color"],
                  ea: !0,
                };
                g.s104NNGLcolor = {
                  name: "_",
                  g: "uniform vec4 u112,u13;uniform vec3 u148;uniform float u149;varying vec3 vv0,vv1;varying float vv2,vv3;void main(){float b=u13.x+u13.y*smoothstep(-u13.w,-u13.z,vv3),c=u149;vec4 a=u112;float d=floor(15.99*c),i=floor(15.99*a.b);a.b=(d+16.*i)/255.,gl_FragData[0]=vec4(vv0,vv2),gl_FragData[1]=vec4(normalize(vv1),b),gl_FragData[2]=vec4(u148,0.),gl_FragData[3]=a;}",
                  v: "attribute vec3 a0,a2;uniform sampler2D u41;uniform vec3 u144;uniform vec2 u42,u152;uniform float u145,u150,u151,u146,u147,u153;varying vec3 vv0,vv1;varying float vv2,vv3;const vec2 e=vec2(1.);const vec3 r=vec3(1.);const vec2 F=vec2(-1.,1.),s=vec2(.16,.5),t=vec2(.5,.5),u=vec2(.84,.5);uniform mat4 u76;uniform vec3 u79,u83,u84,u85;uniform float u77,u78,u86,u87,u80,u81,u82,u88;mat3 v(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u41,s);vec2 f=u86*e;vec3 c=u86*r;vec2 w=mix(d.a*u42,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u41,t).rgb+vec3(u80,0.,0.),u83,c);float x=mix(texture2D(u41,u).r,0.,u86);a.z+=x;mat3 h=v(a);vec3 y=mix(u144,u84,c);float z=mix(u145,u87,u86);vec3 b=mix(u79,u85,c);b.x+=u77*sin(a.y),b.y+=u78*sin(a.x)*step(0.,a.x);float i=cos(a.z),j=sin(a.z);mat2 A=mat2(i,j,-j,i);b.xy=A*b.xy;float B=mix(u82,1.,u86);vec2 k=u81/w;vec3 l=a0;float C=max(0.,-a0.z-u146)*u147;l.x+=C*sign(a0.x)*(1.-u86);vec3 m=h*(l+y)*z+b;vec2 D=k*B;vec3 E=vec3(g*D,-k)+m*vec3(1.,-1.,-1.);gl_Position=u76*(vec4(u88*e,e)*vec4(E,1.)),vv1=h*a2*vec3(1.,-1.,-1.),vv2=smoothstep(u150,u151,a0.z),vv0=m,vv3=a0.y;}",
                  i: n,
                  J: ["a0", "a2"],
                  S: [3, 3],
                  ea: !0,
                };
                g.s104NNGLtexture = {
                  name: "_",
                  g: "uniform sampler2D u1;uniform vec4 u112,u13;uniform vec3 u148;uniform float u149,u73;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){float c=u13.x+u13.y*smoothstep(-u13.w,-u13.z,vv4),d=u149;vec4 b=u112;float j=floor(15.99*d),k=floor(15.99*b.b);b.b=(j+16.*k)/255.;vec4 a=texture2D(u1,vv2);vec3 l=mix(u148,a.rgb,a.a);vec4 m=vec4(mix(a.rgb*u148,l,u73),a.a);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),c),gl_FragData[2]=m,gl_FragData[3]=b;}",
                  v: "attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u41;uniform vec3 u144;uniform vec2 u42,u152;uniform float u145,u150,u151,u146,u147,u153;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;const vec2 e=vec2(1.);const vec3 s=vec3(1.);const vec2 G=vec2(-1.,1.),t=vec2(.16,.5),u=vec2(.5,.5),v=vec2(.84,.5);uniform mat4 u76;uniform vec3 u79,u83,u84,u85;uniform float u77,u78,u86,u87,u80,u81,u82,u88;mat3 w(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u41,t);vec2 f=u86*e;vec3 c=u86*s;vec2 x=mix(d.a*u42,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u41,u).rgb+vec3(u80,0.,0.),u83,c);float y=mix(texture2D(u41,v).r,0.,u86);a.z+=y;mat3 h=w(a);vec3 z=mix(u144,u84,c);float A=mix(u145,u87,u86);vec3 b=mix(u79,u85,c);b.x+=u77*sin(a.y),b.y+=u78*sin(a.x)*step(0.,a.x);float i=cos(a.z),j=sin(a.z);mat2 B=mat2(i,j,-j,i);b.xy=B*b.xy;float C=mix(u82,1.,u86);vec2 k=u81/x;vec3 l=a0;float D=max(0.,-a0.z-u146)*u147;l.x+=D*sign(a0.x)*(1.-u86);vec3 m=h*(l+z)*A+b;vec2 E=k*C;vec3 F=vec3(g*E,-k)+m*vec3(1.,-1.,-1.);gl_Position=u76*(vec4(u88*e,e)*vec4(F,1.)),vv1=h*a2*vec3(1.,-1.,-1.),vv3=smoothstep(u150,u151,a0.z),vv2=a1,vv0=m,vv4=a0.y;}",
                  i: n.concat(H),
                  J: ["a0", "a2", "a1"],
                  S: [3, 3, 2],
                  ea: !0,
                };
                g.s104NNGLtextureNormalMap = {
                  name: "_",
                  g: "uniform vec4 u112,u13;uniform vec3 u148;uniform sampler2D u1,u154;uniform float u149,u73;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 l=vec3(1.,1.,1.);void main(){float m=u13.x+u13.y*smoothstep(-u13.w,-u13.z,vv5);vec3 v=vec3(0.,0.,-1.),d=normalize(vv2),b=texture2D(u154,vv3).xyz;b=normalize(b*255./127.-1.007874*l);vec3 g=vv0.xyz,n=cross(d,g)*vv0.w;mat3 o=mat3(g,n,d);vec3 p=o*b;float q=u149;vec4 c=u112;float r=floor(15.99*q),s=floor(15.99*c.b);c.b=(r+16.*s)/255.;vec4 a=texture2D(u1,vv3);vec3 t=mix(u148,a.rgb,a.a);vec4 u=vec4(mix(a.rgb*u148,t,u73),a.a);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(p,m),gl_FragData[2]=u,gl_FragData[3]=c;}",
                  v: "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u41;uniform vec3 u144;uniform vec2 u42,u152;uniform float u145,u150,u151,u146,u147,u153;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec2 e=vec2(1.);const vec3 t=vec3(1.);const vec2 H=vec2(-1.,1.),u=vec2(.16,.5),v=vec2(.5,.5),w=vec2(.84,.5);uniform mat4 u76;uniform vec3 u79,u83,u84,u85;uniform float u77,u78,u86,u87,u80,u81,u82,u88;mat3 x(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u41,u);vec2 f=u86*e;vec3 c=u86*t;vec2 y=mix(d.a*u42,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u41,v).rgb+vec3(u80,0.,0.),u83,c);float z=mix(texture2D(u41,w).r,0.,u86);a.z+=z;mat3 h=x(a);vec3 A=mix(u144,u84,c);float B=mix(u145,u87,u86);vec3 b=mix(u79,u85,c);b.x+=u77*sin(a.y),b.y+=u78*sin(a.x)*step(0.,a.x);float i=cos(a.z),j=sin(a.z);mat2 C=mat2(i,j,-j,i);b.xy=C*b.xy;float D=mix(u82,1.,u86);vec2 k=u81/y;vec3 l=a0;float E=max(0.,-a0.z-u146)*u147;l.x+=E*sign(a0.x)*(1.-u86);vec3 m=h*(l+A)*B+b;vec2 F=k*D;vec3 G=vec3(g*F,-k)+m*vec3(1.,-1.,-1.);gl_Position=u76*(vec4(u88*e,e)*vec4(G,1.)),vv2=h*a2*vec3(1.,-1.,-1.),vv4=smoothstep(u150,u151,a0.z),vv0=a3,vv3=a1,vv1=m,vv5=a0.y;}",
                  i: n.concat(H, ["u154"]),
                  J: ["a3", "a0", "a2", "a1"],
                  S: [4, 3, 3, 2],
                  ea: !0,
                };
                g.s104NNGLtextureParamsMap = {
                  name: "_",
                  g: "uniform sampler2D u1,u74;uniform vec4 u112,u13,u75;uniform vec3 u148;uniform float u149,u73;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;vec2 j(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float g=u13.x+u13.y*smoothstep(-u13.w,-u13.z,vv4),d=u149;vec4 a=u112,e=texture2D(u74,vv2);vec2 b=j(e.b,4.);float h=1.-b.x,o=b.y;b=j(e.a,1.);float p=b.x,f=b.y;vec4 q=vec4(e.rg,o,p);float r=h;a=mix(a,q,u75*f),d=mix(d,r,u75.b*f);float s=floor(15.99*d),t=floor(15.99*a.b);a.b=(s+16.*t)/255.;vec4 c=texture2D(u1,vv2);vec3 u=mix(u148,c.rgb,c.a);vec4 v=vec4(mix(c.rgb*u148,u,u73),c.a);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),g),gl_FragData[2]=v,gl_FragData[3]=a;}",
                  v: "attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u41;uniform vec3 u144;uniform vec2 u42,u152;uniform float u145,u150,u151,u146,u147,u153;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;const vec2 e=vec2(1.);const vec3 s=vec3(1.);const vec2 G=vec2(-1.,1.),t=vec2(.16,.5),u=vec2(.5,.5),v=vec2(.84,.5);uniform mat4 u76;uniform vec3 u79,u83,u84,u85;uniform float u77,u78,u86,u87,u80,u81,u82,u88;mat3 w(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u41,t);vec2 f=u86*e;vec3 c=u86*s;vec2 x=mix(d.a*u42,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u41,u).rgb+vec3(u80,0.,0.),u83,c);float y=mix(texture2D(u41,v).r,0.,u86);a.z+=y;mat3 h=w(a);vec3 z=mix(u144,u84,c);float A=mix(u145,u87,u86);vec3 b=mix(u79,u85,c);b.x+=u77*sin(a.y),b.y+=u78*sin(a.x)*step(0.,a.x);float i=cos(a.z),j=sin(a.z);mat2 B=mat2(i,j,-j,i);b.xy=B*b.xy;float C=mix(u82,1.,u86);vec2 k=u81/x;vec3 l=a0;float D=max(0.,-a0.z-u146)*u147;l.x+=D*sign(a0.x)*(1.-u86);vec3 m=h*(l+z)*A+b;vec2 E=k*C;vec3 F=vec3(g*E,-k)+m*vec3(1.,-1.,-1.);gl_Position=u76*(vec4(u88*e,e)*vec4(F,1.)),vv1=h*a2*vec3(1.,-1.,-1.),vv3=smoothstep(u150,u151,a0.z),vv2=a1,vv0=m,vv4=a0.y;}",
                  i: n.concat(H, y),
                  J: ["a0", "a2", "a1"],
                  S: [3, 3, 2],
                  ea: !0,
                };
                g.s104NNGLtextureNormalParamsMap = {
                  name: "_",
                  g: "uniform sampler2D u1,u154,u74;uniform vec4 u112,u13,u75;uniform vec3 u148;uniform float u149,u73;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 q=vec3(1.,1.,1.);vec2 k(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float r=u13.x+u13.y*smoothstep(-u13.w,-u13.z,vv5);vec3 E=vec3(0.,0.,-1.),g=normalize(vv2),d=texture2D(u154,vv3).xyz;d=normalize(d*255./127.-1.007874*q);vec3 h=vv0.xyz,s=cross(g,h)*vv0.w;mat3 t=mat3(h,s,g);vec3 u=t*d;float e=u149;vec4 a=u112,f=texture2D(u74,vv3);vec2 b=k(f.b,4.);float v=1.-b.x,w=b.y;b=k(f.a,1.);float x=b.x,l=b.y;vec4 y=vec4(f.rg,w,x);float z=v;a=mix(a,y,u75*l),e=mix(e,z,u75.b*l);float A=floor(15.99*e),B=floor(15.99*a.b);a.b=(A+16.*B)/255.;vec4 c=texture2D(u1,vv3);vec3 C=mix(u148,c.rgb,c.a);vec4 D=vec4(mix(c.rgb*u148,C,u73),c.a);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(u,r),gl_FragData[2]=D,gl_FragData[3]=a;}",
                  v: "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u41;uniform vec3 u144;uniform vec2 u42,u152;uniform float u145,u150,u151,u146,u147,u153;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec2 e=vec2(1.);const vec3 t=vec3(1.);const vec2 H=vec2(-1.,1.),u=vec2(.16,.5),v=vec2(.5,.5),w=vec2(.84,.5);uniform mat4 u76;uniform vec3 u79,u83,u84,u85;uniform float u77,u78,u86,u87,u80,u81,u82,u88;mat3 x(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u41,u);vec2 f=u86*e;vec3 c=u86*t;vec2 y=mix(d.a*u42,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u41,v).rgb+vec3(u80,0.,0.),u83,c);float z=mix(texture2D(u41,w).r,0.,u86);a.z+=z;mat3 h=x(a);vec3 A=mix(u144,u84,c);float B=mix(u145,u87,u86);vec3 b=mix(u79,u85,c);b.x+=u77*sin(a.y),b.y+=u78*sin(a.x)*step(0.,a.x);float i=cos(a.z),j=sin(a.z);mat2 C=mat2(i,j,-j,i);b.xy=C*b.xy;float D=mix(u82,1.,u86);vec2 k=u81/y;vec3 l=a0;float E=max(0.,-a0.z-u146)*u147;l.x+=E*sign(a0.x)*(1.-u86);vec3 m=h*(l+A)*B+b;vec2 F=k*D;vec3 G=vec3(g*F,-k)+m*vec3(1.,-1.,-1.);gl_Position=u76*(vec4(u88*e,e)*vec4(G,1.)),vv2=h*a2*vec3(1.,-1.,-1.),vv4=smoothstep(u150,u151,a0.z),vv0=a3,vv3=a1,vv1=m,vv5=a0.y;}",
                  i: n.concat(H, ["u154"], y),
                  J: ["a3", "a0", "a2", "a1"],
                  S: [4, 3, 3, 2],
                  ea: !0,
                };
                n = "u137 u125 u138 u112 u148 u149 u13".split(" ");
                g.s104color = {
                  name: "_",
                  g: "uniform vec4 u112,u13;uniform vec3 u148;uniform float u149;varying vec3 vv0,vv1;varying float vv2,vv3;void main(){float b=u13.x+u13.y*smoothstep(-u13.w,-u13.z,vv3),c=u149;vec4 a=u112;float d=floor(15.99*c),i=floor(15.99*a.b);a.b=(d+16.*i)/255.,gl_FragData[0]=vec4(vv0,vv2),gl_FragData[1]=vec4(normalize(vv1),b),gl_FragData[2]=vec4(u148,0.),gl_FragData[3]=a;}",
                  v: "attribute vec3 a0,a2;uniform mat4 u137,u125,u138;varying vec3 vv0,vv1;varying float vv2,vv3;void main(){vec4 a=u138*vec4(a0,1.),b=u138*vec4(a2,0.);gl_Position=u137*u125*a,vv0=a.xyz,vv1=b.xyz,vv2=1.,vv3=a0.y;}",
                  i: n,
                  J: ["a0", "a2"],
                  ea: !0,
                };
                g.s104 = {
                  name: "_",
                  g: "uniform sampler2D u1;uniform vec4 u112,u13;uniform vec3 u148;uniform float u149,u73;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){float c=u13.x+u13.y*smoothstep(-u13.w,-u13.z,vv4),d=u149;vec4 b=u112;float j=floor(15.99*d),k=floor(15.99*b.b);b.b=(j+16.*k)/255.;vec4 a=texture2D(u1,vv2);vec3 l=mix(u148,a.rgb,a.a);vec4 m=vec4(mix(a.rgb*u148,l,u73),a.a);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),c),gl_FragData[2]=m,gl_FragData[3]=b;}",
                  v: "attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u137,u125,u138;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){vec4 a=u138*vec4(a0,1.),b=u138*vec4(a2,0.);gl_Position=u137*u125*a,vv2=a1,vv0=a.xyz,vv1=b.xyz,vv3=1.,vv4=a0.y;}",
                  i: n.concat(H),
                  J: ["a0", "a2", "a1"],
                  ea: !0,
                };
                var e = ["u154", "u155"];
                g.s104NormalMap = {
                  name: "_",
                  g: "uniform sampler2D u1,u154;uniform vec4 u112,u13;uniform vec3 u155,u148;uniform float u149,u73;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 l=vec3(1.,1.,1.);void main(){float m=u13.x+u13.y*smoothstep(-u13.w,-u13.z,vv5);vec3 v=vec3(0.,0.,-1.),d=normalize(vv2),b=texture2D(u154,vv3).xyz;b=normalize(b*255./127.-1.007874*l);vec3 g=vv0.xyz,n=cross(d,g)*vv0.w;mat3 o=mat3(g,n,d);vec3 p=o*b;float q=u149;vec4 c=u112;float r=floor(15.99*q),s=floor(15.99*c.b);c.b=(r+16.*s)/255.;vec4 a=texture2D(u1,vv3);vec3 t=mix(u148,a.rgb,a.a);vec4 u=vec4(mix(a.rgb*u148,t,u73),a.a);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(p,m),gl_FragData[2]=u,gl_FragData[3]=c;}",
                  v: "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u137,u125,u138;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;void main(){vec4 a=u138*vec4(a0,1.),b=u138*vec4(a2,0.);gl_Position=u137*u125*a,vv0=a3,vv3=a1,vv1=a.xyz,vv2=b.xyz,vv4=1.,vv5=a0.y;}",
                  i: n.concat(H, e),
                  J: ["a0", "a2", "a1", "a3"],
                  ea: !0,
                };
                g.s104ParamsMap = {
                  name: "_",
                  g: "uniform sampler2D u1,u74;uniform vec4 u112,u13,u75;uniform vec3 u148;uniform float u149,u73;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;vec2 j(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float g=u13.x+u13.y*smoothstep(-u13.w,-u13.z,vv4),d=u149;vec4 a=u112,e=texture2D(u74,vv2);vec2 b=j(e.b,4.);float h=1.-b.x,o=b.y;b=j(e.a,1.);float p=b.x,f=b.y;vec4 q=vec4(e.rg,o,p);float r=h;a=mix(a,q,u75*f),d=mix(d,r,u75.b*f);float s=floor(15.99*d),t=floor(15.99*a.b);a.b=(s+16.*t)/255.;vec4 c=texture2D(u1,vv2);vec3 u=mix(u148,c.rgb,c.a);vec4 v=vec4(mix(c.rgb*u148,u,u73),c.a);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),g),gl_FragData[2]=v,gl_FragData[3]=a;}",
                  v: "attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u137,u125,u138;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){vec4 a=u138*vec4(a0,1.),b=u138*vec4(a2,0.);gl_Position=u137*u125*a,vv2=a1,vv0=a.xyz,vv1=b.xyz,vv3=1.,vv4=a0.y;}",
                  i: n.concat(H, y),
                  J: ["a0", "a2", "a1"],
                  ea: !0,
                };
                g.s104NormalParamsMap = {
                  name: "_",
                  g: "uniform sampler2D u1,u154,u74;uniform vec4 u112,u13,u75;uniform vec3 u155,u148;uniform float u149,u73;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 q=vec3(1.,1.,1.);vec2 k(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float r=u13.x+u13.y*smoothstep(-u13.w,-u13.z,vv5);vec3 E=vec3(0.,0.,-1.),g=normalize(vv2),d=texture2D(u154,vv3).xyz;d=normalize(d*255./127.-1.007874*q);vec3 h=vv0.xyz,s=cross(g,h)*vv0.w;mat3 t=mat3(h,s,g);vec3 u=t*d;float e=u149;vec4 a=u112,f=texture2D(u74,vv3);vec2 b=k(f.b,4.);float v=1.-b.x,w=b.y;b=k(f.a,1.);float x=b.x,l=b.y;vec4 y=vec4(f.rg,w,x);float z=v;a=mix(a,y,u75*l),e=mix(e,z,u75.b*l);float A=floor(15.99*e),B=floor(15.99*a.b);a.b=(A+16.*B)/255.;vec4 c=texture2D(u1,vv3);vec3 C=mix(u148,c.rgb,c.a);vec4 D=vec4(mix(c.rgb*u148,C,u73),c.a);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(u,r),gl_FragData[2]=D,gl_FragData[3]=a;}",
                  v: "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u137,u125,u138;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;void main(){vec4 a=u138*vec4(a0,1.),b=u138*vec4(a2,0.);gl_Position=u137*u125*a,vv0=a3,vv3=a1,vv1=a.xyz,vv2=b.xyz,vv4=1.,vv5=a0.y;}",
                  i: n.concat(H, e, y),
                  J: ["a0", "a2", "a1", "a3"],
                  ea: !0,
                };
              } else m();
              r();
              n = [{ type: "1i", name: "u1", value: 0 }];
              C.j("s0", n);
              C.j("s1", n);
              C.j("s76", [{ type: "1i", name: "u12", value: 1 }].concat(n));
              C.j("s77", [{ type: "1i", name: "u12", value: 1 }].concat(n));
              C.j("s12", [{ type: "1i", name: "u89", value: 1 }].concat(n));
              C.j("s78", [{ type: "1i", name: "u89", value: 1 }].concat(n));
              C.j("s79", n);
              C.j("s80", n);
              C.j(
                "s81",
                [
                  { type: "1i", name: "u93", value: 1 },
                  { type: "1i", name: "u41", value: 2 },
                ].concat(n)
              );
              C.j("s82", n);
              C.j("s83", n);
              C.j("s13", n);
              C.j("s84", [
                { type: "1i", name: "u95", value: 0 },
                { type: "1i", name: "u96", value: 1 },
              ]);
              C.j("s85", [
                { type: "1i", name: "u99", value: 0 },
                { type: "1i", name: "u100", value: 1 },
              ]);
              C.j("s86", n);
              C.j("s87", n);
              C.j("s88", n);
              C.j("s89", n);
              C.j("s90", n);
              C.j("s91", [{ type: "1i", name: "u89", value: 1 }].concat(n));
              C.j("s92", [{ type: "1i", name: "u89", value: 1 }].concat(n));
              V.ga_ &&
                (C.j("s96", [
                  { type: "1i", name: "u109", value: 0 },
                  { type: "1i", name: "u110", value: 1 },
                  { type: "1f", name: "u131", value: V.qk },
                  { type: "1f", name: "u132", value: V.rk },
                  { type: "1f", name: "u133", value: V.Dk },
                  { type: "1f", name: "u134", value: V.uk },
                  { type: "1f", name: "u135", value: V.vk },
                  { type: "1f", name: "u130", value: 1 },
                  { type: "1f", name: "u121", value: 1 },
                ]),
                C.j("s97", n));
              e = [
                { type: "1i", name: "u109", value: 0 },
                { type: "1i", name: "u110", value: 1 },
                { type: "1i", name: "u111", value: 2 },
                { type: "1i", name: "u99", value: 3 },
                { type: "1i", name: "u113", value: 4 },
                { type: "1i", name: "u112", value: 6 },
                { type: "1i", name: "u101", value: 7 },
                { type: "1f", name: "u119", value: 0 },
                { type: "1f", name: "u116", value: 0 },
                { type: "1f", name: "u118", value: 0 },
              ];
              V.ga_ &&
                C.j(
                  "s94",
                  e.concat([
                    { type: "1f", name: "u121", value: V.tk[ha.W()] },
                    { type: "1i", name: "u120", value: 5 },
                  ])
                );
              C.j(
                "s95",
                e.concat([
                  { type: "1f", name: "u122", value: V.Rc },
                  { type: "1f", name: "u123", value: V.ig },
                  { type: "1f", name: "u124", value: 0 },
                ])
              );
              C.j("s99", [
                { type: "1i", name: "u139", value: 0 },
                { type: "1i", name: "u113", value: 1 },
                { type: "1i", name: "u100", value: 2 },
                { type: "1f", name: "u142", value: V.wo },
              ]);
              C.j("s100", n);
              C.j("s101", n);
              C.j(
                "s93",
                [
                  { type: "1i", name: "u2", value: 1 },
                  { type: "1i", name: "u102", value: 2 },
                  { type: "1i", name: "u101", value: 3 },
                  { type: "1f", name: "u107", value: 1 },
                  { type: "2f", name: "u104", value: [0, 0] },
                ].concat(n)
              );
              ha.ca()
                ? (C.j("s104", n),
                  C.j(
                    "s104NormalMap",
                    [{ type: "1i", name: "u154", value: 1 }].concat(n)
                  ),
                  C.j(
                    "s104ParamsMap",
                    [{ type: "1i", name: "u74", value: 1 }].concat(n)
                  ),
                  C.j(
                    "s104NormalParamsMap",
                    [
                      { type: "1i", name: "u154", value: 1 },
                      { type: "1i", name: "u74", value: 2 },
                    ].concat(n)
                  ))
                : h();
              w = !0;
            },
            jo: function () {
              m();
              r();
              h();
            },
            Cd: function () {
              return D.id;
            },
            Ed: function () {
              return x;
            },
            Fd: function () {
              return z;
            },
            set: function (n) {
              xb.Aj(C);
              g[n].set();
            },
            Bb: function (n) {
              return p(n, u());
            },
            ge: function (n) {
              return p(n, {
                name: "_",
                g: "void main(){gl_FragColor=vec4(.5,.5,.5,.5);}",
                i: [],
                precision: "highp",
              });
            },
            mo: function (n) {
              return p(n, {
                name: "_",
                g: "const vec4 d=vec4(.5,.5,.5,.5);void main(){gl_FragData[0]=d,gl_FragData[1]=d,gl_FragData[2]=d,gl_FragData[3]=d;}",
                i: [],
                precision: "highp",
                ea: !0,
              });
            },
            M: function () {
              -1 !== k && D.M();
            },
            ie: function () {
              var n = 0;
              D.wa.forEach(function (e, v) {
                v = D.S[v];
                c.vertexAttribPointer(e, v, c.FLOAT, !1, D.Yg, n);
                n += 4 * v;
              });
            },
            fc: function () {
              C.hc(c);
            },
            hc: function (n) {
              n.vertexAttribPointer(D.wa[0], 2, n.FLOAT, !1, 8, 0);
            },
            xq: function () {
              c.vertexAttribPointer(D.attributes.a0, 3, c.FLOAT, !1, 12, 0);
            },
            Ra: function () {
              c.vertexAttribPointer(D.attributes.a0, 3, c.FLOAT, !1, 32, 0);
            },
            bb: function () {
              c.vertexAttribPointer(D.attributes.a0, 3, c.FLOAT, !1, 24, 0);
            },
            sj: function () {
              c.vertexAttribPointer(D.attributes.a2, 3, c.FLOAT, !1, 32, 12);
            },
            tj: function () {
              c.vertexAttribPointer(D.attributes.a2, 3, c.FLOAT, !1, 24, 12);
            },
            Uc: function () {
              c.vertexAttribPointer(D.attributes.a1, 2, c.FLOAT, !1, 32, 24);
            },
            yq: function () {
              c.vertexAttribPointer(D.attributes.a0, 3, c.FLOAT, !1, 20, 0);
              c.vertexAttribPointer(D.attributes.a1, 2, c.FLOAT, !1, 20, 12);
            },
            Yn: function () {
              c.vertexAttribPointer(D.attributes.a0, 3, c.FLOAT, !1, 32, 0);
              c.vertexAttribPointer(D.attributes.a2, 3, c.FLOAT, !1, 32, 12);
              c.vertexAttribPointer(D.attributes.a1, 2, c.FLOAT, !1, 32, 24);
            },
            Zn: function () {
              c.vertexAttribPointer(D.attributes.a0, 3, c.FLOAT, !1, 32, 0);
              c.vertexAttribPointer(D.attributes.a2, 3, c.FLOAT, !1, 32, 12);
            },
            $n: function () {
              c.vertexAttribPointer(D.attributes.a0, 3, c.FLOAT, !1, 24, 0);
              c.vertexAttribPointer(D.attributes.a2, 3, c.FLOAT, !1, 24, 12);
            },
            ee: function () {
              c.vertexAttribPointer(D.attributes.a3, 4, c.FLOAT, !1, 16, 0);
            },
            he: function (n, e) {
              c.uniform1i(D.B[n], e);
            },
            D: function (n, e) {
              c.uniform1f(D.B[n], e);
            },
            O: function (n, e, v) {
              c.uniform2f(D.B[n], e, v);
            },
            Ag: function (n, e) {
              c.uniform2fv(D.B[n], e);
            },
            Bg: function (n, e, v, J) {
              c.uniform3f(D.B[n], e, v, J);
            },
            Cg: function (n, e) {
              c.uniform3fv(D.B[n], e);
            },
            za: function (n, e) {
              c.uniform4fv(D.B[n], e);
            },
            qo: function (n, e) {
              c.uniformMatrix2fv(D.B[n], !1, e);
            },
            ro: function (n, e) {
              c.uniformMatrix3fv(D.B[n], !1, e);
            },
            Vc: function (n, e) {
              c.uniformMatrix4fv(D.B[n], !1, e);
            },
            j: function (n, e) {
              C.set(n);
              e.forEach(function (v) {
                switch (v.type) {
                  case "4f":
                    c.uniform4fv(D.B[v.name], v.value);
                    break;
                  case "3f":
                    c.uniform3fv(D.B[v.name], v.value);
                    break;
                  case "2f":
                    c.uniform2fv(D.B[v.name], v.value);
                    break;
                  case "1f":
                    c.uniform1f(D.B[v.name], v.value);
                    break;
                  case "1i":
                    c.uniform1i(D.B[v.name], v.value);
                    break;
                  case "mat2":
                    c.uniformMatrix2fv(D.B[v.name], !1, v.value);
                    break;
                  case "mat4":
                    c.uniformMatrix4fv(D.B[v.name], !1, v.value);
                }
              });
            },
            I: function () {
              for (var n in g) {
                var e = g[n];
                c.detachShader(e.pa, e.tf);
                c.detachShader(e.pa, e.sf);
                c.deleteShader(e.tf);
                c.deleteShader(e.sf);
                c.deleteProgram(e.pa);
              }
            },
            A: function () {
              c.disableVertexAttribArray(0);
              C.M();
              C.I();
              M = 0;
              w = !1;
              D = null;
              k = -1;
            },
          };
        return C;
      })(),
      Va = (function () {
        var a = {},
          b = [],
          d = !1,
          f = 0,
          l = 0,
          p = -1,
          u = -1,
          h = 1,
          m = null,
          r = !1,
          w = null,
          H = !1,
          y = !1,
          x = !1,
          z = !1,
          g = !1,
          k = !1,
          D = -1,
          M = -1,
          C = !1,
          n = !1,
          e = null,
          v = null,
          J = -1,
          N = -1,
          A = null,
          G = -1,
          L,
          q = null,
          t = null,
          R = null,
          O = null,
          ia = null,
          Y = null,
          Q = null,
          fa = [
            { type: "1f", name: "u86", value: 0 },
            { type: "1f", name: "u150", value: 0 },
            { type: "1f", name: "u151", value: 0 },
            { type: "1f", name: "u81", value: 1 },
            { type: "1f", name: "u77", value: 0 },
            { type: "1f", name: "u78", value: 0 },
            { type: "1f", name: "u88", value: 1 },
          ],
          P = {
            m: function (E, B) {
              a.Eg = E;
              ha.Ug();
              Ic.ff();
              Rb.ff(E.Ae);
              p = E.jf;
              u = E.cp;
              h = E.ze;
              D = E.Zf;
              M = E.$f;
              var U = [
                { type: "1f", name: "u81", value: p },
                { type: "1f", name: "u77", value: D },
                { type: "1f", name: "u78", value: M },
                { type: "1f", name: "u82", value: E.Qn },
                { type: "mat4", name: "u76", value: E.un },
                { type: "2f", name: "u42", value: E.bk },
              ];
              E.Sg = U;
              var ca = [
                { type: "3f", name: "u83", value: [0, 0, 0] },
                { type: "3f", name: "u84", value: E.bh },
                { type: "3f", name: "u85", value: E.ah },
                { type: "1f", name: "u86", value: 0 },
                { type: "1f", name: "u87", value: E.Ae },
                { type: "1f", name: "u88", value: 1 },
              ];
              E.Tj = ca;
              P.vm(E, B);
              d || void 0 !== E.Ga || (E.Ga = [0, 0, 120]);
              n = C = I.uf;
              if (!d && C) {
                B = 1 * ha.vb();
                var na = 1 * ha.ub(),
                  za = { isLinear: !0, isPot: !1, width: B, height: na };
                e = aa.instance(za);
                v = aa.instance(za);
                J = 1 / B;
                N = 1 / na;
              }
              U = [
                { type: "1i", name: "u41", value: 1 },
                { type: "3f", name: "u79", value: E.Ga },
                { type: "1f", name: "u146", value: E.jd },
                { type: "1f", name: "u147", value: E.Mb },
              ].concat(U, ca);
              m = E.Nc;
              ca = [
                { type: "1f", name: "u150", value: m[0] },
                { type: "1f", name: "u151", value: m[1] },
              ];
              ha.ca()
                ? ((B = [{ type: "1i", name: "u1", value: 0 }]),
                  (na = [{ type: "1i", name: "u154", value: 2 }]),
                  F.j("s104NNGLcolor", U.concat(ca)),
                  F.j("s104NNGLtexture", [].concat(B, U, ca)),
                  F.j("s104NNGLtextureNormalMap", [].concat(B, na, U, ca)),
                  F.j(
                    "s104NNGLtextureParamsMap",
                    [{ type: "1i", name: "u74", value: 2 }].concat(B, U, ca)
                  ),
                  F.j(
                    "s104NNGLtextureNormalParamsMap",
                    [{ type: "1i", name: "u74", value: 3 }].concat(B, na, U, ca)
                  ))
                : (F.j("s108", U.concat(ca)),
                  F.j("s109", [{ type: "1i", name: "u1", value: 0 }].concat(U)),
                  F.j("s110", U),
                  F.j("s111", U),
                  F.j(
                    "s112",
                    U.concat([{ type: "1i", name: "u154", value: 0 }])
                  ),
                  F.j("s113", U),
                  F.j(
                    "s114",
                    U.concat([{ type: "1i", name: "u74", value: 0 }])
                  ));
              F.j("s81", [{ type: "2f", name: "u94", value: E.Lg }]);
              F.j(V.ga_ ? "s94" : "s95", [
                { type: "1f", name: "u116", value: E.Je },
                { type: "3f", name: "u117", value: E.og },
                { type: "1f", name: "u118", value: E.We },
                { type: "1f", name: "u119", value: 1 },
                { type: "3f", name: "u114", value: E.fk },
              ]);
              if ((L = E.Rd))
                (A = E.Vm),
                  (G = E.Sd),
                  F.j("s93", [
                    { type: "4f", name: "u103", value: E.Qd },
                    { type: "1f", name: "u106", value: E.Pf },
                    { type: "2f", name: "u104", value: E.Um },
                    { type: "1f", name: "u108", value: Math.sign(G) },
                  ]);
              b.forEach(function (Ea) {
                Ea.nj(E);
              });
              d = !0;
            },
            dc: function (E) {
              y && xa.ja.dc(E);
              z && xa.ta.dc(E);
            },
            vm: function (E, B) {
              void 0 !== xa.ja &&
                E.jc &&
                ha.ca() &&
                (xa.ja.m(E),
                (H = !0),
                B.push(function (U) {
                  xa.ja.dc(U);
                  y = !x;
                }));
              void 0 !== xa.ta &&
                E.qd &&
                (xa.ta.m(E),
                B.push(function (U) {
                  xa.ta.dc(U);
                  z = !0;
                }));
              void 0 !== xa.qc && E.Me && (xa.qc.m(E), (k = g = !0));
              void 0 !== xa.mb &&
                (xa.mb.m(E),
                (w = xa.mb.xm({
                  width: E.Fc,
                  height: 2 * E.Fc,
                  depth: 1.5 * E.Fc,
                  Dl: -E.yf,
                  Va: E.wf,
                  hl: E.xf,
                })),
                (r = !0));
            },
            oo: function (E, B, U, ca) {
              E &&
                ((Q = E),
                H && xa.ja.ec(E),
                z && xa.ta.ec(E),
                g && xa.qc.ec(E),
                b.forEach(function (na) {
                  na.ec(E);
                }));
              U && (O = U);
              ca && (ia = ca);
            },
            Cb: function (E) {
              ha.ca()
                ? (F.j("s104NNGLcolor", E),
                  F.j("s104NNGLtexture", E),
                  F.j("s104NNGLtextureNormalMap", E),
                  F.j("s104NNGLtextureParamsMap", E),
                  F.j("s104NNGLtextureNormalParamsMap", E))
                : (F.j("s108", E),
                  F.j("s109", E),
                  F.j("s110", E),
                  F.j("s111", E),
                  F.j("s112", E),
                  F.j("s113", E),
                  F.j("s114", E));
            },
            eb: function (E, B, U) {
              var ca = [E[0] + B[0], E[1] + B[1], E[2] + B[2]];
              ca = [ca[0] + U[0], ca[1] + U[1], ca[2] + U[2]];
              a.be = ca;
              a.cn = B;
              a.Ro = U;
              P.Cb([{ type: "3f", name: "u144", value: ca }]);
              ha.ca() && (H && xa.ja.eb(E, B, U), z && xa.ta.eb(ca));
              r && xa.mb.eb(E, U);
            },
            fb: function (E, B, U) {
              var ca = E * B * U;
              a.dn = B;
              a.So = U;
              a.pm = E;
              P.Cb([{ type: "1f", name: "u145", value: ca }]);
              ha.ca() && (H && xa.ja.fb(E * B, U), z && xa.ta.fb(ca));
              r && xa.mb.fb(E, U);
            },
            hj: function () {
              P.eb(a.be, a.cn, a.Ro);
              P.fb(a.pm, a.dn, a.So);
              P.yj(a.rx);
              P.m(a.Eg);
              P.uj(a.Lk, a.Mb);
            },
            yj: function (E) {
              a.rx = E;
              P.Cb([{ type: "1f", name: "u80", value: E }]);
              ha.ca() && (H && xa.ja.yg(E), z && xa.ta.yg(E));
            },
            uj: function (E, B) {
              a.Lk = E;
              a.Mb = B;
              P.Cb([
                { type: "1f", name: "u146", value: E },
                { type: "1f", name: "u147", value: B },
              ]);
            },
            ho: function (E) {
              m = E;
              0 === f &&
                P.Cb([
                  { type: "1f", name: "u150", value: m[0] },
                  { type: "1f", name: "u151", value: m[1] },
                ]);
            },
            cb: function (E) {
              function B() {
                r && xa.mb.toggle(!1);
                L && F.j("s93", [{ type: "1f", name: "u107", value: 0 }]);
              }
              0 >= E
                ? ((l = 0),
                  0 !== f &&
                    ((f = 0),
                    Rb.Kn(),
                    r && xa.mb.toggle(!0),
                    L && F.j("s93", [{ type: "1f", name: "u107", value: 1 }])))
                : 1 <= E
                ? ((l = 1), 1 !== f && ((f = 1), Rb.Gj(!0)), B())
                : ((l = E), 2 !== f && (Rb.Gj(!1), (f = 2), B()));
              F.j("s95", [{ type: "1f", name: "u119", value: 1 - E }]);
              var U = 1 - E;
              fa[0].value = l;
              fa[1].value = m[0] * U + -300 * E;
              fa[2].value = m[1] * U + -300 * E;
              fa[3].value = p * U + E * u;
              fa[4].value = D * U;
              fa[5].value = M * U;
              fa[6].value = U + E * h;
              y && xa.ja.zg(l, fa);
              z && xa.ta.zg(l, fa);
              P.Cb(fa);
            },
            Al: function (E) {
              Q.h(1);
              E.forEach(function (B) {
                B.vl();
              });
              r && w.V();
            },
            Om: function () {
              return 1 === f;
            },
            Ke: function (E) {
              Q.xa(E);
            },
            jk: function (E) {
              b.push(E);
            },
            Jg: function (E) {
              x = !E;
              y = E && H;
            },
            Ig: function (E) {
              k = E && g;
            },
            ug: function (E) {
              z && ha.ca() && xa.ta.so(E);
            },
            Db: function (E) {
              ha.ca() && (H && xa.ja.Db(E), z && xa.ta.Db(E));
            },
            xl: function (E, B) {
              if (!n) return !1;
              e.L();
              E.h(0);
              F.set("s86");
              F.O("u14", 0, N);
              W.l(!1, !1);
              v.o();
              e.h(0);
              F.O("u14", J, 0);
              W.l(!1, !1);
              F.set("s87");
              B.L();
              v.h(0);
              W.l(!1, !1);
              return !0;
            },
            Fj: function (E) {
              n = E && C;
            },
            resize: function (E, B, U) {
              C &&
                ((E *= U),
                (B *= U),
                e.resize(E, B),
                v.resize(E, B),
                (J = 1 / E),
                (N = 1 / B));
            },
            sg: function (E, B) {
              var U = E.P(),
                ca = E.Z(),
                na = { width: U, height: ca, isPot: !1 };
              H && (R && R.remove(), (R = aa.instance(na)));
              q && q.remove();
              q = Ca.instance({ width: U, height: ca });
              g || z
                ? (xa.qc.tg(U, ca), t && t.remove(), (t = aa.instance(na)))
                : (t = E);
              H && xa.ja.tg(U, ca);
              B && (Y && Y.remove(), (Y = aa.instance(na)));
            },
            tl: function (E) {
              var B = null;
              switch (f) {
                case 0:
                  B = E;
                  break;
                case 2:
                  q.bind(!1, !0);
                  Y.o();
                  F.set("s76");
                  F.D("u13", l);
                  E.h(1);
                  ia.h(0);
                  W.l(!0, !0);
                  B = Y;
                  break;
                case 1:
                  B = ia;
              }
              if (!y || 1 === f || !ha.ca()) return B;
              B.xa(0);
              k && xa.qc.V(B, t);
              q.bind(!1, !k);
              z && (k ? B.h(0) : (t.o(), F.set("s1"), W.l(!0, !0)), xa.ta.V());
              t.h(0);
              O.xa(2);
              xa.ja.V();
              R.o();
              F.set("s1");
              k || z ? t.h(0) : B.h(0);
              W.l(!0, !V.ga_);
              xa.ja.add();
              return R;
            },
            kk: function (E, B) {
              if (!y) return E;
              O.xa(2);
              xa.ja.V();
              Ca.ba();
              F.set("s75");
              B.L();
              xa.ja.jm().h(0);
              W.l(!0, !0);
              F.set("s1");
              c.enable(c.BLEND);
              c.blendFunc(c.ONE, c.ONE_MINUS_SRC_ALPHA);
              E.h(0);
              W.l(!1, !1);
              c.disable(c.BLEND);
              return B;
            },
            yl: function (E, B) {
              if (!L) return !1;
              F.set("s93");
              F.D("u105", E * G);
              A.h(1);
              Va.Ke(2);
              t ? t.h(3) : B.h(3);
              return !0;
            },
            A: function () {
              d = !1;
              l = f = 0;
              u = p = -1;
              h = 1;
              m = null;
              M = D = -1;
              r = !1;
              w = null;
              k = g = z = x = y = H = !1;
              xa.ja.A();
              xa.Ka.A();
            },
          };
        return P;
      })(),
      ya = (function () {
        function a() {
          h.forEach(function (B) {
            B.Bl(t);
          });
        }
        function b() {
          h.forEach(function (B) {
            B.ud(t);
          });
        }
        function d() {
          h.forEach(function (B) {
            B.zl(t);
          });
        }
        function f() {
          h.forEach(function (B) {
            B.vd(t);
          });
        }
        function l() {
          t
            ? Va.Al(h)
            : h.forEach(function (B) {
                B.wl();
              });
        }
        function p() {
          G && clearTimeout(G);
          G = setTimeout(function () {
            e = !1;
            G = null;
          }, 16);
        }
        function u(B) {
          B();
        }
        var h = [],
          m = [],
          r = { ia: !1, position: !1, yb: !1 },
          w = [],
          H = [],
          y = null,
          x = 0,
          z = null,
          g = null,
          k = null,
          D = null,
          M = !1,
          C = !1,
          n = !1,
          e = !1,
          v = !1,
          J = !1,
          N = null,
          A = null,
          G = null,
          L = null,
          q = !1,
          t = !1,
          R = !1,
          O = !1,
          ia = !0,
          Y = !1,
          Q = !1,
          fa = null,
          P = null,
          E = {
            m: function () {
              c.enable(c.DEPTH_TEST);
              c.depthFunc(c.LEQUAL);
              c.clearDepth(1);
              V.fl
                ? (c.enable(c.CULL_FACE),
                  c.frontFace("CCW" === V.gl ? c.CCW : c.CW),
                  c.cullFace(c.BACK))
                : c.disable(c.CULL_FACE);
              E.uh();
              var B = {
                isPot: !1,
                isLinear: !1,
                width: ha.vb(),
                height: ha.ub(),
                K: 4,
                isFloat: !1,
              };
              z = aa.instance(B);
              B = Object.assign({}, B, {
                isLinear: !0,
                width: ha.P(),
                height: ha.Z(),
              });
              g = aa.instance(B);
              k = aa.instance(B);
              V.Qa &&
                ((B = Object.assign({}, B, { isLinear: !1 })),
                (D = aa.instance(B)));
              J = Fa.ha();
              V.Qa ||
                (y = gc.instance({ Lb: V.Lb, wc: V.wc, xc: V.xc, vc: V.vc }));
              M = !0;
            },
            uh: function () {
              ha.ca()
                ? (r = vc.instance({}))
                : ((r.ia = Kb.instance({
                    ic: V.Qa ? !1 : "s105",
                    isFloat: !1,
                    Vb: !0,
                    clearColor: [0, 0, 0, 0],
                    K: 4,
                  })),
                  (r.position = Kb.instance({
                    ic: V.Qa ? !1 : "s115",
                    isFloat: !0,
                    Vb: !0,
                    clearColor: [0, 0, 0, 0],
                    K: 4,
                  })),
                  (r.yb = Kb.instance({
                    ic: !1,
                    isFloat: !0,
                    Vb: !0,
                    clearColor: [0, 0, 0, 0],
                    K: 4,
                  })),
                  (r.Oc = Kb.instance({
                    ic: !1,
                    isFloat: !1,
                    Vb: !0,
                    clearColor: [0, 0, 0, 0],
                    K: 4,
                  })));
            },
            Zl: function () {
              return y;
            },
            qa: function (B) {
              y = B;
            },
            Pq: function () {},
            Db: function (B) {
              Va.Db(B);
            },
            nj: function (B) {
              Va.m(B, w);
              ha.ca() || (r.ia.zj(!1), r.position.zj("s108"));
              t = O = !0;
            },
            uq: function () {
              Va.hj();
            },
            lp: function (B) {
              Va.jk(B);
            },
            Vn: function (B, U, ca) {
              Va.eb(B, U, ca);
            },
            Wn: function (B, U, ca) {
              Va.fb(B, U, ca);
            },
            Tn: function (B, U) {
              Va.uj(B, U);
            },
            Un: function (B) {
              Va.ho(B);
            },
            Xn: function (B) {
              Va.yj(B);
            },
            cb: function (B) {
              Va.cb(B);
            },
            oj: function (B, U, ca, na) {
              Va.oo(B, U, ca, na);
              U && E.sg(U, na ? !0 : !1);
              R = !0;
            },
            Jg: function (B) {
              Va.Jg(B);
            },
            ug: function (B) {
              Va.ug(B);
            },
            Ig: function (B) {
              Va.Ig(B);
            },
            Fj: function (B) {
              Va.Fj(B);
            },
            mp: function (B) {
              q &&
                ((Q = !0),
                fa && fa.remove(),
                (fa = aa.instance({ width: L.P(), height: L.Z(), isPot: !1 })),
                (P = B));
            },
            sg: function (B, U) {
              L =
                "string" === typeof B
                  ? aa.instance({ url: B, isFloat: !1 })
                  : B;
              t && Va.sg(L, U);
              q = !0;
            },
            ik: function (B) {
              h.push(B);
              0 !== w.length &&
                (w.forEach(function (U) {
                  U(B);
                }),
                w.splice(0, w.length));
            },
            Fn: function (B) {
              B = h.indexOf(B);
              -1 !== B && h.splice(B, 1);
            },
            np: function (B) {
              m.push(B);
            },
            rq: function (B) {
              B = m.indexOf(B);
              -1 !== B && m.splice(B, 1);
            },
            me: function (B) {
              t && (C = B);
            },
            animate: function (B) {
              !V.Qa || (t && R)
                ? C &&
                  (e || (x > V.en && v)
                    ? (N && clearTimeout(N),
                      ++x,
                      window.cancelAnimationFrame(E.animate),
                      (N = setTimeout(function () {
                        window.requestAnimationFrame(E.animate);
                      }, 16)))
                    : (E.cj(B),
                      ++x,
                      t || (C && window.requestAnimationFrame(E.animate))))
                : setTimeout(E.animate, 100);
            },
            pp: function (B) {
              H.push(B);
            },
            cj: function (B) {
              if ((!V.Qa || (t && R)) && M) {
                H.forEach(u);
                ha.ca()
                  ? r.set() || ha.ma()
                    ? (t || Ac.Hn(), l(), r.M(), J && c.depthMask(!1))
                    : (ha.Go(),
                      E.uh(),
                      Kb.gd(),
                      F.jo(),
                      V.Qa && Va.hj(),
                      c.flush(),
                      window.requestAnimationFrame(E.animate))
                  : (t && Va.Ke(1),
                    r.ia.set(!0, !0, !0),
                    b(),
                    r.ia.M(),
                    J && c.depthMask(!1),
                    r.Oc.set(!1, !J, !1),
                    d(),
                    r.Oc.M(),
                    r.position.set(!0, !J, !1),
                    tb.V(),
                    a(),
                    r.position.M(),
                    r.yb.set(!1, !J, !1),
                    f(),
                    r.yb.M());
                c.disable(c.DEPTH_TEST);
                J || c.depthMask(!1);
                V.ga_ && Eb.V();
                var U = E.Qh();
                if (null !== U) {
                  U.h(7);
                  F.set(V.ga_ ? "s94" : "s95");
                  F.O("u14", 1 / ha.vb(), 1 / ha.ub());
                  Kb.Mk();
                  z.L();
                  Y
                    ? (c.enable(c.BLEND),
                      c.clearColor(0, 0, 0, 0),
                      c.clear(c.COLOR_BUFFER_BIT),
                      c.blendFunc(c.ONE, c.ONE_MINUS_SRC_ALPHA),
                      F.D("u124", 1))
                    : c.disable(c.BLEND);
                  t || tb.ef();
                  r.position.h(0);
                  r.yb.h(1);
                  r.ia.h(2);
                  y.kd(3);
                  r.Oc.h(6);
                  y.ld(4);
                  y.yh();
                  V.ga_ && Eb.h(5);
                  W.l(!0, !0);
                  Y && F.D("u124", 0);
                  Ca.ba();
                  if (Y) {
                    c.disable(c.BLEND);
                    var ca = Va.kk(z, g);
                    F.set("s83");
                    k.L();
                    ca.h(0);
                    W.l(!1, !1);
                    g.o();
                    k.h(0);
                    W.l(!1, !1);
                    g.h(0);
                  } else
                    Va.xl(z, g) || (F.set("s1"), g.L(), z.h(0), W.l(!1, !1)),
                      ia
                        ? (F.set("s82"),
                          k.L(),
                          g.h(0),
                          W.l(!1, !1),
                          g.o(),
                          k.h(0),
                          O && t
                            ? (F.set("s81"),
                              D.h(1),
                              Va.Ke(2),
                              W.l(!1, !1),
                              F.set("s1"),
                              D.L(),
                              g.h(0),
                              W.l(!1, !1))
                            : (F.set("s80"), W.l(!1, !1), g.h(0)))
                        : g.h(0);
                  Ca.aa();
                  c.viewport(0, 0, ha.P(), ha.Z());
                  (!Y && t && Va.yl(B, U)) || F.set("s1");
                  W.l(!1, !1);
                  c.enable(c.DEPTH_TEST);
                  c.depthMask(!0);
                  c.flush();
                }
              }
            },
            Qh: function () {
              if (!q || Y) return aa.di();
              if (!t) return L;
              if (Q && !Va.Om()) {
                F.set(P);
                Ca.ba();
                fa.Wc();
                fa.o();
                L.h(0);
                var B = fa;
                W.l(!0, !0);
              } else B = L;
              return Va.tl(B);
            },
            Lq: function () {
              V.kl ||
                C ||
                ((C = !0),
                E.animate(Date.now()),
                n || wc.Bo(),
                n || Rb.ib(!1),
                A && clearTimeout(A),
                V.ga_ && Eb.fe(),
                (A = setTimeout(E.ua, V.Ik)),
                n || ha.rm(),
                (n = !0));
            },
            Mq: function () {
              C && ((v = C = !1), cancelAnimationFrame(E.animate));
            },
            ua: function () {
              v ||
                !n ||
                e ||
                V.wh ||
                ((v = e = !0),
                A && clearTimeout(A),
                G && clearTimeout(G),
                tb.lf().ej(),
                (A = setTimeout(function () {
                  ha.Wg(V.ln);
                  V.ga_ && Eb.Uj();
                  x = 0;
                  p();
                }, 24)));
            },
            wake: function () {
              v &&
                n &&
                !e &&
                ((e = !0),
                (v = !1),
                (x = 0),
                tb.lf().ej(),
                A && clearTimeout(A),
                G && clearTimeout(G),
                (A = setTimeout(function () {
                  ha.Wg(1);
                  V.ga_ && Eb.fe();
                  p();
                }, 16)));
            },
            Zp: function () {},
            Fp: function () {},
            le: function (B) {
              O = B;
            },
            Oq: function (B) {
              ia = B;
            },
            Hj: function (B) {
              Y = B;
            },
            Tq: function () {
              F.j("s95", [
                { type: "1f", name: "u122", value: V.Rc },
                { type: "1f", name: "u123", value: V.ig },
              ]);
            },
            resize: function (B, U, ca) {
              z.resize(B * ca, U * ca);
              g.resize(B, U);
              k.resize(B, U);
              V.Qa && D.resize(B, U);
              Va.resize(B, U, ca);
              B = [{ type: "2f", name: "u14", value: [1 / B, 1 / U] }];
              F.j("s82", B);
              F.j("s80", B);
              F.j("s83", B);
            },
            I: function () {
              N && clearTimeout(N);
              A && clearTimeout(A);
              G && clearTimeout(G);
              h.concat(m).forEach(function (B) {
                B.I();
              });
              h.splice(0, h.length);
              m.splice(0, m.length);
              r.ia.remove();
              r.yb.remove();
              r.Oc.remove();
              r.position.remove();
              z.remove();
              g.remove();
              k.remove();
              D && D.remove();
              e = !0;
            },
            A: function () {
              E.I();
              J = v = e = n = C = t = R = e = !1;
            },
          };
        return E;
      })(),
      xa = {},
      ha = (function () {
        function a() {
          Kb.resize(d * m, f * m);
          z.ca() && vc.resize(d * m, f * m);
          ya.resize(d, f, m);
          V.ga_ && Eb.resize(d * m, f * m, m);
          z.Ug();
        }
        var b = null,
          d = 0,
          f = 0,
          l = -1,
          p = !1,
          u = {
            pe: !1,
            Mg: !1,
            Rj: !1,
            Fg: !1,
            drawBuffers: !1,
            Im: !1,
            ui: !1,
            Km: !1,
            Gf: !1,
            Za: !1,
          },
          h = Object.assign({}, u),
          m = 1,
          r = !1,
          w = !1,
          H = !1,
          y = !1,
          x = !1,
          z = {
            m: function (g) {
              void 0 !== g.onload && g.onload && (w = g.onload);
              void 0 === g.expand && (g.expand = !1);
              void 0 === g.Kd && (g.Kd = !1);
              void 0 === g.ra && (g.ra = !1);
              void 0 === g.Sb && (g.Sb = !1);
              void 0 === g.alpha && (g.alpha = !1);
              void 0 === g.preserveDrawingBuffer &&
                (g.preserveDrawingBuffer = !1);
              g.Kd && (p = !0);
              b = g.ra ? g.ra : document.getElementById(g.$k);
              g.expand && z.expand();
              try {
                window.ip = g.Sb
                  ? g.Sb.Ll()
                  : b.getContext("webgl", {
                      antialias: !1,
                      alpha: g.alpha,
                      depth: !0,
                      premultipliedAlpha: !1,
                      stencil: !1,
                      preserveDrawingBuffer: g.preserveDrawingBuffer,
                    });
                y = g.Sb ? g.Sb.ma() : !1;
                H = !y;
                8 > c.getParameter(c.MAX_TEXTURE_IMAGE_UNITS) &&
                  z.rd("too few texture image units");
                if (!Fa.m()) return z.rd("invalid config");
                V.Oo &&
                  ((h.Mg = c.getExtension("EXT_texture_filter_anisotropic")),
                  h.Mg && (h.ui = !0));
                V.Po &&
                  ((h.pe = c.getExtension("WEBGL_compressed_texture_s3tc")),
                  h.pe &&
                    void 0 !== h.pe.COMPRESSED_RGBA_S3TC_DXT5_EXT &&
                    h.pe.COMPRESSED_RGBA_S3TC_DXT5_EXT &&
                    (h.Im = !0));
                H &&
                  ((h.Rj =
                    c.getExtension("OES_element_index_uint") ||
                    c.getExtension("MOZ_OES_element_index_uint") ||
                    c.getExtension("WEBKIT_OES_element_index_uint")),
                  h.Rj && (h.Km = !0));
                !y &&
                  V.Qo &&
                  ((h.Fg = c.getExtension("EXT_sRGB")), h.Fg && (h.Gf = !0));
                H
                  ? ((h.drawBuffers = c.getExtension("WEBGL_draw_buffers")),
                    h.drawBuffers && !V.vh && (h.Za = !0))
                  : (h.Za = 4 <= c.getParameter(c.MAX_DRAW_BUFFERS));
                if (h.Za) {
                  var k = z.ml();
                  h.Za = h.Za && k;
                }
              } catch (D) {
                return z.rd(D);
              }
              if (null === c || !c) return z.rd("NO_GL");
              g.expand && window.addEventListener("resize", z.expand, !1);
              b.addEventListener(
                "contextmenu",
                function (D) {
                  D.preventDefault();
                  return !1;
                },
                !1
              );
              d = b.width;
              f = b.height;
              z.Cf();
              return !0;
            },
            Cf: function () {
              l = p ? 3 : 2;
              Fa.ha() || (l = Math.min(l, 1));
              Fa.Wk() || (l = Math.min(l, 0));
              Ic.m();
              Kb.m();
              for (var g in xa) xa[g].Sc();
              F.m();
              tb.m();
              Rb.m();
              ya.m();
              wc.m();
              V.ga_ && Eb.m();
              "undefined" !== typeof FPSCounter && FPSCounter.m();
              z.Ug();
              z.ol();
              r = !0;
              w && w();
              return !0;
            },
            ol: function () {
              if (h.Za) {
                var g = vc.instance({ width: 256, height: 1 });
                g.bind();
                c.viewport(0, 0, 256, 1);
                F.set("s103");
                F.za("color", [1, 0, 0, 1]);
                W.l(!0, !0);
                c.clearColor(0, 0, 0, 0);
                c.clear(c.COLOR_BUFFER_BIT || c.DEPTH_BUFFER_BIT);
                Ca.aa();
                F.set("s1");
                g.yb.h(0);
                W.l(!1, !1);
                g = new Uint8Array(1024);
                c.readPixels(0, 0, 256, 1, c.RGBA, c.UNSIGNED_BYTE, g);
                x = 1 >= g[1020];
              }
            },
            ml: function () {
              var g = vc.instance({ width: 1, height: 1 });
              if (!g.set()) return g.remove(), !1;
              F.mo(c);
              W.Qb(c);
              c.bindFramebuffer(c.FRAMEBUFFER, null);
              F.Bb(c);
              g.ia.xa(0);
              W.Qb(c);
              var k = new Uint8Array(4);
              c.readPixels(0, 0, 1, 1, c.RGBA, c.UNSIGNED_BYTE, k);
              g.remove();
              return 3 < Math.abs(k[0] - 127) ? !1 : !0;
            },
            ma: function () {
              return y;
            },
            P: function () {
              return d;
            },
            Z: function () {
              return f;
            },
            vb: function () {
              return m * z.P();
            },
            ub: function () {
              return m * z.Z();
            },
            Ml: function () {
              return d / f;
            },
            W: function () {
              return l;
            },
            gq: function () {
              return 3 === l;
            },
            xi: function () {
              return x;
            },
            ca: function () {
              return h.Za;
            },
            Go: function () {
              h.Za = !1;
            },
            jq: function () {
              return !1;
            },
            Yk: function () {
              return 0 < z.W();
            },
            vp: function () {
              return z.ca() && 0 < z.W();
            },
            kf: function (g) {
              var k = c,
                D = "";
              y || ((k = h.drawBuffers), (D = "_WEBGL"));
              return [
                k["COLOR_ATTACHMENT0" + D],
                k["COLOR_ATTACHMENT1" + D],
                k["COLOR_ATTACHMENT2" + D],
                k["COLOR_ATTACHMENT3" + D],
              ].splice(0, g);
            },
            Bd: function (g) {
              return z.kf(4)[g];
            },
            mm: function () {
              return y
                ? c.SRGB
                  ? c.SRGB
                  : c.RGBA
                : h.Gf
                ? h.Fg.SRGB_ALPHA_EXT
                : c.RGBA;
            },
            Lm: function () {
              return h.ui;
            },
            Rl: function () {
              return h.Mg;
            },
            Ym: function (g) {
              z.ma()
                ? c.drawBuffers(z.kf(g))
                : h.drawBuffers.drawBuffersWEBGL(z.kf(g));
            },
            expand: function () {
              ya.wake();
              z.resize(window.innerWidth, window.innerHeight);
              ya.ua();
            },
            resize: function (g, k) {
              !b ||
                (g === d && k === f) ||
                ((d = g),
                (f = k),
                (b.width = d),
                (b.height = f),
                r && (tb.resize(), a()));
            },
            Ug: function () {
              var g = [
                { type: "2f", name: "u14", value: [1 / ha.vb(), 1 / ha.ub()] },
              ];
              F.j("s82", g);
              F.j("s80", g);
            },
            Wg: function (g) {
              m = g;
              a();
            },
            La: function (g, k) {
              b.addEventListener(g, k, !1);
            },
            rd: function () {
              l = -1;
              return !1;
            },
            ph: function () {
              return 0 <= l;
            },
            mq: function () {},
            vq: function () {},
            Jq: function () {
              var g = document.getElementById("loading");
              g && (g.style.display = "block");
            },
            rm: function () {
              var g = document.getElementById("loading");
              g && (g.style.display = "none");
            },
            I: function () {
              z.ph() &&
                (aa.Sj(),
                ya.I(),
                W.I(),
                Kb.I(),
                V.ga_ && Eb.I(),
                gc.I(),
                wc.I(),
                F.I(),
                aa.I(),
                c.flush(),
                (c = null));
            },
            A: function () {
              ya.A();
              Va.A();
              F.A();
              Object.assign(h, u);
              r = !1;
            },
          };
        return z;
      })(),
      tb = (function () {
        var a = !1,
          b = !1,
          d = [];
        return {
          m: function () {},
          instance: function (f) {
            void 0 === f.fj && (f.fj = !0);
            void 0 === f.De && (f.De = 0.1);
            void 0 === f.Ce && (f.Ce = 100);
            void 0 === f.direction && (f.direction = [0, 0, -1]);
            void 0 === f.Rb && (f.Rb = 45);
            var l = new $b(),
              p = new Ua(50, -50, -400),
              u = null;
            l.setPosition(p);
            var h = new Int8Array(20),
              m = new Int8Array(20),
              r = 0,
              w = 0,
              H = 0,
              y = 0,
              x = {
                V: function () {
                  m[F.Cd()] || (F.Vc("u125", l.elements), (m[F.Cd()] = 1));
                  h[F.Cd()] || (F.Vc("u137", u), (h[F.Cd()] = 1));
                },
                df: function () {
                  w || (F.Vc("u125", l.elements), (w = 1));
                  r || (F.O("u126", u[0], u[5]), (r = 1));
                },
                ef: function () {
                  H || (F.Bg("u114", p.x, p.y, p.z), (H = 1));
                },
                Nb: function () {
                  y || (F.Bg("u155", p.x, p.y, p.z), (y = 1));
                },
                rh: function () {
                  var z = f.De,
                    g = f.Ce,
                    k = Math.tan((0.5 * f.Rb * Math.PI) / 180);
                  u = [
                    0.5 / k,
                    0,
                    0,
                    0,
                    0,
                    (0.5 * ha.Ml()) / k,
                    0,
                    0,
                    0,
                    0,
                    -(g + z) / (g - z),
                    -1,
                    0,
                    0,
                    (-2 * g * z) / (g - z),
                    0,
                  ];
                  for (z = 0; 20 > z; ++z) h[z] = 0;
                  r = 0;
                },
                io: function (z, g) {
                  p.lj(g[0]).mj(g[1]).z = g[2];
                  l.elements.set(z);
                  for (z = 0; 20 > z; ++z) m[z] = 0;
                  y = H = w = 0;
                },
                ej: function () {
                  for (var z = (y = H = 0); 20 > z; ++z) m[z] = 0;
                },
              };
            x.rh();
            a = x;
            b = !0;
            f.fj && d.push(x);
            return x;
          },
          V: function () {
            b && a.V();
          },
          df: function () {
            b && a.df();
          },
          ef: function () {
            b && a.ef();
          },
          Nb: function () {
            b && a.Nb();
          },
          resize: function () {
            d.forEach(function (f) {
              f.rh();
            });
          },
          lf: function () {
            return a;
          },
        };
      })(),
      Kb = (function () {
        var a = [],
          b = null;
        return {
          m: function () {
            b = Ca.instance({ width: ha.vb(), height: ha.ub(), Gc: !ha.ca() });
          },
          instance: function (d) {
            void 0 === d.width && (d.width = ha.vb());
            void 0 === d.height && (d.height = ha.ub());
            void 0 === d.isFloat && (d.isFloat = !1);
            void 0 === d.Vb && (d.Vb = !1);
            void 0 === d.clearColor && (d.clearColor = [0, 0, 0, 0]);
            void 0 === d.K && (d.K = 4);
            var f = aa.instance({
                isFloat: d.isFloat && Fa.ha(),
                U: d.isFloat,
                width: d.width,
                height: d.height,
                isPot: !1,
                isLinear: !1,
                K: d.K,
              }),
              l = void 0 !== d.ic && d.ic ? !0 : !1,
              p = d.ic,
              u = {
                set: function (h, m, r) {
                  r && b.bind(!1, r);
                  f.o();
                  h &&
                    (c.clearColor(
                      d.clearColor[0],
                      d.clearColor[1],
                      d.clearColor[2],
                      d.clearColor[3]
                    ),
                    b.Re());
                  m && b.qh();
                  l && F.set(p);
                },
                zj: function (h) {
                  l = (p = h) ? !0 : !1;
                },
                M: function () {
                  f.re();
                },
                h: function (h) {
                  f.h(h);
                },
                resize: function (h, m) {
                  f.resize(h, m);
                },
                debug: function () {
                  f.debug();
                },
                remove: function () {
                  f.remove();
                },
              };
            d.Vb && a.push(u);
            return u;
          },
          resize: function (d, f) {
            b.resize(d, f);
            a.forEach(function (l) {
              l.resize(d, f);
            });
          },
          Mk: function () {
            b.jh();
          },
          gd: function () {
            b.gd();
          },
          Wc: function () {
            b.Wc();
          },
          yp: function () {
            b.qh();
          },
          xp: function () {
            b.Re();
          },
          wp: function () {
            b.clear();
          },
          I: function () {
            b.remove();
          },
        };
      })(),
      vc = (function () {
        var a = [];
        return {
          instance: function (b) {
            void 0 === b.width && (b.width = ha.vb());
            void 0 === b.height && (b.height = ha.ub());
            var d = c.createFramebuffer(),
              f = b.width,
              l = b.height,
              p = !0;
            b = {
              isFloat: Fa.ha(),
              U: !0,
              width: f,
              height: l,
              isPot: !1,
              isLinear: !1,
              K: 4,
            };
            var u = aa.instance(b),
              h = aa.instance(b),
              m = aa.instance(b),
              r = aa.instance(b),
              w = Ca.Sl(),
              H = Ca.Vh();
            c.bindFramebuffer(w, d);
            var y = c.createRenderbuffer();
            c.bindRenderbuffer(c.RENDERBUFFER, y);
            c.renderbufferStorage(c.RENDERBUFFER, c.DEPTH_COMPONENT16, f, l);
            c.framebufferRenderbuffer(w, c.DEPTH_ATTACHMENT, c.RENDERBUFFER, y);
            c.clearDepth(1);
            c.framebufferTexture2D(w, ha.Bd(0), c.TEXTURE_2D, u.get(), 0);
            c.framebufferTexture2D(w, ha.Bd(1), c.TEXTURE_2D, h.get(), 0);
            c.framebufferTexture2D(w, ha.Bd(2), c.TEXTURE_2D, r.get(), 0);
            c.framebufferTexture2D(w, ha.Bd(3), c.TEXTURE_2D, m.get(), 0);
            ha.Ym(4);
            c.bindFramebuffer(w, null);
            Ca.reset();
            var x = {
              position: u,
              yb: h,
              Oc: m,
              ia: r,
              bind: function () {
                c.bindFramebuffer(w, d);
                Ca.reset();
              },
              set: function () {
                p && c.checkFramebufferStatus(H);
                c.bindFramebuffer(w, d);
                Ca.reset();
                if (p) {
                  if (c.checkFramebufferStatus(H) !== c.FRAMEBUFFER_COMPLETE)
                    return !1;
                  p = !1;
                }
                c.viewport(0, 0, f, l);
                c.clearColor(0, 0, 0, 0);
                F.Zb() && !ha.xi() && (F.set("s102"), W.l(!1, !1));
                c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
                return !0;
              },
              M: function () {},
              resize: function (z, g) {
                f = z;
                l = g;
                u.resize(z, g);
                h.resize(z, g);
                r.resize(z, g);
                m.resize(z, g);
                c.bindRenderbuffer(c.RENDERBUFFER, y);
                c.renderbufferStorage(
                  c.RENDERBUFFER,
                  c.DEPTH_COMPONENT16,
                  f,
                  l
                );
                c.bindRenderbuffer(c.RENDERBUFFER, null);
              },
              remove: function () {
                u.remove();
                h.remove();
                r.remove();
                m.remove();
                c.deleteRenderbuffer(y);
                c.deleteFramebuffer(d);
                var z = a.indexOf(x);
                -1 !== z && a.splice(z, 1);
              },
            };
            a.push(x);
            return x;
          },
          resize: function (b, d) {
            a.forEach(function (f) {
              f.resize(b, d);
            });
          },
        };
      })(),
      gc = (function () {
        var a = [],
          b = V.ih;
        return {
          instance: function (d) {
            function f() {
              m
                ? l()
                : ((k = Ad.instance({ $: H, Hm: b })),
                  (h = V.Jk[ha.W()]),
                  (y = aa.instance({
                    isFloat: Fa.ha(),
                    U: !0,
                    isPot: !0,
                    isLinear: !1,
                    isMirrorY: !0,
                    width: h,
                    height: h / 2,
                    K: 3,
                  })),
                  (x = aa.instance({
                    isFloat: Fa.ha(),
                    U: !0,
                    isPot: !0,
                    isLinear: !1,
                    isMirrorY: !0,
                    width: h,
                    height: h / 2,
                    K: 3,
                  })),
                  (z = aa.instance({
                    isFloat: Fa.ha(),
                    U: !0,
                    isPot: !0,
                    width: 1,
                    height: h / 2,
                    K: 3,
                  })),
                  (g = aa.instance({
                    isFloat: Fa.ha() && !b,
                    U: !b,
                    isPot: !1,
                    isLinear: !0,
                    isMirrorY: !0,
                    isMipmap: !1,
                    width: h,
                    height: h / 2,
                    K: b ? 4 : 3,
                  })),
                  (m = !0),
                  l(),
                  M.forEach(function (C) {
                    C();
                  }),
                  M.splice(0, M.length));
            }
            function l() {
              if (m) {
                Ca.ba();
                k.ao(H);
                k.Dn();
                y.L();
                F.set("s85");
                H.h(0);
                F.D("u92", V.Rc);
                aa.Rk(1);
                W.l(!0, !0);
                for (var C = V.ym[ha.W()], n = 0; n < C; ++n)
                  x.o(),
                    F.set("s88"),
                    F.O("u14", 1 / h, 0),
                    y.h(0),
                    W.l(!1, !1),
                    y.o(),
                    F.O("u14", 0, 2 / h),
                    x.h(0),
                    W.l(!1, !1);
                z.L();
                F.set("s90");
                y.h(0);
                W.l(!1, !1);
                F.set(b ? "s92" : "s91");
                g.L();
                y.h(0);
                z.h(1);
                W.l(!1, !1);
                aa.aa(0);
                aa.aa(1);
              }
            }
            var p = Object.assign({ Lb: null, wc: null, vc: 0, xc: 0 }, d),
              u = 0,
              h = 0,
              m = !1,
              r = null,
              w = null,
              H = null,
              y = null,
              x = null,
              z = null,
              g = null,
              k = null,
              D = 0,
              M = [];
            d = {
              m: function () {
                function C() {
                  2 === ++n &&
                    ((H = aa.instance({
                      isFloat: Fa.ha(),
                      U: !0,
                      isPot: !1,
                      isMipmap: !1,
                      isLinear: !1,
                      isMirrorY: !0,
                      width: u,
                      height: u / 2,
                      K: 3,
                    })),
                    Ca.ba(),
                    H.L(),
                    F.set("s84"),
                    F.D("u97", p.xc),
                    F.D("u98", p.vc),
                    r.h(0),
                    w.h(1),
                    W.l(!0, !0),
                    f());
                }
                var n = 0;
                u = V.Kk[ha.W()];
                D = Math.log2(u) - 1;
                p.Lb &&
                  ((r = aa.instance({
                    isPot: !1,
                    url: p.Lb,
                    C: C,
                    K: 3,
                    isFlipY: !1,
                  })),
                  (w = aa.instance({
                    isPot: !1,
                    url: p.wc,
                    C: C,
                    K: 3,
                    isFlipY: !1,
                  })));
              },
              vg: function (C) {
                H = C;
                f();
              },
              kd: function (C) {
                m && (k.h(C), F.D("u115", k.P()));
              },
              ld: function (C) {
                m && g.h(C);
              },
              yh: function () {
                F.D("u3", D);
              },
              Rh: function () {
                return D;
              },
              P: function () {
                return u;
              },
              nd: function (C) {
                m ? C() : M.push(C);
              },
              I: function () {
                r && r.remove();
                w && w.remove();
                y.remove();
                z.remove();
                x.remove();
                k.remove();
                g.remove();
                H.remove();
              },
            };
            a.push(d);
            d.m();
            return d;
          },
          I: function () {
            a.forEach(function (d) {
              d.I();
            });
          },
        };
      })(),
      hd = {
        instance: function (a) {
          var b = a.Sm,
            d = a.Qm,
            f = 0,
            l = b.P();
          a = V.ih;
          var p = aa.instance({
              isFloat: Fa.ha() && !a,
              U: !a,
              isLinear: !0,
              isMipmap: !1,
              isPot: !1,
              width: l,
              K: a ? 4 : 3,
              isFlipY: !1,
            }),
            u = aa.instance({
              isFloat: Fa.ha() && !a,
              U: !a,
              isPot: !1,
              isLinear: !0,
              bq: !0,
              isMipmap: !1,
              width: l,
              height: l / 2,
              K: a ? 4 : 3,
            }),
            h = Ca.instance({ width: l, height: l }),
            m = a ? "s77" : "s76";
          return {
            no: function (r) {
              f = r;
              F.set(m);
              c.viewport(0, 0, l, l);
              h.o();
              p.o();
              F.D("u13", f);
              b.kd(1);
              d.kd(0);
              W.l(!0, !0);
              c.viewport(0, 0, l, l / 2);
              u.o();
              b.ld(1);
              d.ld(0);
              W.l(!1, !1);
              c.flush();
            },
            kd: function (r) {
              p.h(r);
            },
            ld: function (r) {
              u.h(r);
            },
            yh: function () {
              F.D("u3", b.Rh() * (1 - f) + d.Rh() * f);
            },
          };
        },
      },
      Rb = (function () {
        function a(L) {
          var q = (e - V.Pe) / (V.mh - V.Pe);
          q = 1 - Math.pow(1 - q, V.gp);
          e += L * (1 + q * V.hp);
          e = Math.min(Math.max(e, V.Pe), V.mh);
          G.ib();
        }
        function b(L) {
          -1 !== h &&
            ((D = k = 0),
            u(),
            a((V.fp * L.deltaY) / window.innerHeight),
            L.preventDefault());
        }
        function d() {
          C += k;
          n += D;
          n = Math.min(Math.max(n, V.pn), V.on);
          G.ib();
        }
        function f(L) {
          if (0 === h || -1 === h) return !1;
          var q = void 0 !== L.touches && L.touches.length;
          L.preventDefault();
          if (2 === h) {
            var t = Yc(
              L.touches[0].pageX,
              L.touches[0].pageY,
              L.touches[1].pageX,
              L.touches[1].pageY
            );
            a(-(z - t) * V.qn);
            z = t;
          } else
            (t = q ? L.touches[0].clientX : L.clientX),
              (L = q ? L.touches[0].clientY : L.clientY),
              (k = (2 * (t - y) * Math.PI) / ha.P()),
              (D = (2 * (L - x) * Math.PI) / ha.Z()),
              4 === h
                ? ((A[0] += k * V.Si),
                  (A[1] -= D * V.Si),
                  (A[0] = Math.min(Math.max(A[0], -V.Vi), V.Vi)),
                  (A[1] = Math.min(Math.max(A[1], -V.Wi), V.Wi)),
                  G.ib())
                : d(),
              (y = t),
              (x = L);
        }
        function l() {
          0 !== h &&
            -1 !== h &&
            ((0 === k && 0 === D) || 1 !== h || !J
              ? ya.ua()
              : (u(), (g = Date.now()), (v = setInterval(G.Pm, M))),
            (h = 0));
        }
        function p(L) {
          if (2 !== h && -1 !== h) {
            D = k = 0;
            u();
            ya.wake();
            var q = void 0 !== L.changedTouches && L.touches.length;
            L.preventDefault();
            q && 2 === L.touches.length
              ? ((h = 2),
                (z = Yc(
                  L.touches[0].pageX,
                  L.touches[0].pageY,
                  L.touches[1].pageX,
                  L.touches[1].pageY
                )))
              : ((h = q || 2 !== L.button ? 1 : 4),
                (y = q ? L.touches[0].clientX : L.clientX),
                (x = q ? L.touches[0].clientY : L.clientY));
            return !1;
          }
        }
        function u() {
          v && (clearInterval(v), (v = !1));
        }
        var h = 0,
          m = !1,
          r = !1,
          w = !1,
          H = 1,
          y = 0,
          x = 0,
          z = 0,
          g = 0,
          k = 0,
          D = 0,
          M = 16,
          C = V.Mj,
          n = V.Ui,
          e = V.Oe,
          v = !1,
          J = 0,
          N = new Float32Array([0, 0, 0, 0, 0]),
          A = [V.Uk, V.Vk],
          G = {
            m: function () {
              J = V.mk[ha.W()];
              M = V.wd[ha.W()];
              ha.La("mousedown", p);
              ha.La("mouseup", l);
              ha.La("mouseout", l);
              ha.La("mousemove", f);
              ha.La("mousemove", f);
              ha.La("wheel", b);
              ha.La("touchstart", p);
              ha.La("touchend", l);
              ha.La("touchmove", f);
            },
            ib: function (L) {
              m
                ? ((r[0] = -n),
                  (r[1] = C),
                  (w[1].value = (H / V.Oe) * e),
                  Va.Cb(w))
                : ((N[0] = C),
                  (N[1] = n),
                  (N[2] = e),
                  (N[3] = A[0]),
                  (N[4] = A[1]),
                  wc.Rn(N, L));
            },
            Pm: function () {
              if ((1e-4 > k && 1e-4 > D) || -1 === h)
                u(), (D = k = 0), 0 === h && ya.ua();
              var L = Date.now(),
                q = L - g;
              g = L;
              L = Math.pow(J, q / M);
              k *= L;
              D *= L;
              d();
            },
            ff: function (L) {
              m ||
                ((m = !0),
                (h = -1),
                (r = [0, 0, 0]),
                (w = [
                  { name: "u83", type: "3f", value: r },
                  { name: "u87", type: "1f", value: 1 },
                ]),
                (H = L));
            },
            Gj: function (L) {
              -1 === h && L && (h = 0);
              L || (h = -1);
            },
            Kn: function () {
              D = k = 0;
              C = V.Mj;
              n = V.Ui;
              e = V.Oe;
              G.ib();
            },
            Aq: function (L) {
              e = L;
            },
            Bq: function (L) {
              A[0] = L[0];
              A[1] = L[1];
              V.nh = L[2];
            },
            zq: function (L, q) {
              C = L;
              n = q;
            },
          };
        return G;
      })(),
      Ac = (function () {
        var a = {
          s104: !1,
          s104color: !1,
          s104NormalMap: !1,
          s104ParamsMap: !1,
          s104NormalParamsMap: !1,
        };
        return {
          instance: function (b) {
            function d(P) {
              if (fa) {
                P.tweaker &&
                  window.JEELIZVTO &&
                  "undefined" !== typeof T &&
                  T.hh(P.tweaker);
                G = P.partsNames || [];
                A.splice(0);
                A.push({ n: 0, offset: 0 });
                v.min.set(Infinity, Infinity, Infinity);
                v.max.set(-Infinity, -Infinity, -Infinity);
                var E = P.uvs;
                E &&
                  (E = E.filter(function (ja) {
                    return ja;
                  }));
                Y = E && 0 < E.length && 0 < E[0].length ? !0 : !1;
                "undefined" !== typeof Cb &&
                  "string" === typeof P.faces &&
                  (P.faces = Cb(P.faces));
                "undefined" !== typeof Ob &&
                  ("string" === typeof P.vertices &&
                    (P.vertices = Ob(P.vertices)),
                  E &&
                    E.length &&
                    E.forEach(function (ja, ra) {
                      "string" === typeof ja && (E[ra] = Ob(ja));
                    }));
                var B = P.metadata.faces,
                  U = 1 + (Y ? 1 : 0);
                B = (P.faces.length - B) / (P.metadata.faces * U);
                (6 !== B && 8 !== B) || Y || (++U, (B /= 2));
                if (4 === B) {
                  B = 6 * U + 2;
                  for (
                    var ca = 4 * U + 1,
                      na = Array(P.metadata.faces * B),
                      za = 0;
                    za < P.metadata.faces;
                    ++za
                  )
                    for (var Ea = 0; Ea < U; ++Ea)
                      (na[za * B + 4 * Ea] = P.faces[za * ca + 5 * Ea]),
                        (na[za * B + 4 * Ea + 1] =
                          P.faces[za * ca + 5 * Ea + 1]),
                        (na[za * B + 4 * Ea + 2] =
                          P.faces[za * ca + 5 * Ea + 2]),
                        0 === Ea && (na[za * B + 3] = P.faces[za * ca + 4]),
                        (na[za * B + 4 * Ea + 3 * U + 1] =
                          P.faces[za * ca + 5 * Ea]),
                        (na[za * B + 4 * Ea + 3 * U + 2] =
                          P.faces[za * ca + 5 * Ea + 2]),
                        (na[za * B + 4 * Ea + 3 * U + 3] =
                          P.faces[za * ca + 5 * Ea + 3]),
                        0 === Ea &&
                          (na[za * B + 3 * U + 4] = P.faces[za * ca + 4]);
                  P.faces = na;
                  P.metadata.faces *= 2;
                }
                x = Array(P.metadata.vertices);
                for (B = 0; B < P.metadata.vertices; ++B)
                  (x[B] = new Ua(
                    P.vertices[3 * B],
                    P.vertices[3 * B + 1],
                    P.vertices[3 * B + 2]
                  )),
                    ld(v, x[B]);
                z = Array(P.metadata.faces);
                U = 3 * U + 1;
                for (B = 0; B < P.metadata.faces; ++B)
                  (z[B] = new Ec(
                    P.faces[U * B],
                    P.faces[U * B + 1],
                    P.faces[U * B + 2]
                  )),
                    (z[B].ac = P.faces[U * B + 3]);
                q = 3 < x.length;
                fa && (fa.visible = q);
                od(x, z);
                g = pd(x, z);
                if (Y) {
                  U = Array(x.length);
                  B = ["a", "b", "c"];
                  for (ca = 0; ca < P.metadata.faces; ++ca)
                    for (na = 0; 3 > na; ++na)
                      if (
                        ((za = P.faces[7 * ca + na]),
                        (Ea = P.faces[7 * ca + 1 + na + 3]),
                        "undefined" === typeof U[za])
                      )
                        U[za] = [[za, Ea]];
                      else if (U[za][0][1] !== Ea) {
                        for (var ma = -1, ua = 1; ua < U[za].length; ++ua)
                          if (U[za][ua][1] === Ea) {
                            ma = U[za][ua][0];
                            break;
                          }
                        ua = -1;
                        -1 === ma
                          ? ((ua = x.length),
                            x.push(x[za].clone()),
                            g.push(g[za].clone()),
                            U[za].push([ua, Ea]),
                            (U[ua] = [[ua, Ea]]))
                          : (ua = ma);
                        P.faces[7 * ca + na] = ua;
                        z[ca][B[na]] = ua;
                      }
                  k = Array(x.length);
                  for (P = 0; P < x.length; ++P)
                    (B = "undefined" === typeof U[P] ? P : U[P][0][1]),
                      (k[P] = new Yb(E[0][2 * B], E[0][2 * B + 1]));
                }
                var Ma = uc(v);
                b.Jb &&
                  (x.forEach(function (ja) {
                    ja.x -= Ma.x;
                    ja.z -= Ma.z;
                    ja.y -= v.min.y;
                  }),
                  (v.min.x -= Ma.x),
                  (v.max.x -= Ma.x),
                  (v.min.z -= Ma.z),
                  (v.max.z -= Ma.z),
                  (v.max.y -= v.min.y),
                  (v.min.y = 0));
                if (b.Kb) {
                  var X =
                    V.Hk /
                    Math.max(
                      v.max.x - v.min.x,
                      v.max.y - v.min.y,
                      v.max.z - v.min.z
                    );
                  x.forEach(function (ja) {
                    ja.Ea(X);
                  });
                  v.min.Ea(X);
                  v.max.Ea(X);
                }
                P = Y ? 8 : 6;
                U = new Float32Array(x.length * P);
                for (B = 0; B < x.length; ++B)
                  (U[P * B] = x[B].x),
                    (U[P * B + 1] = x[B].y),
                    (U[P * B + 2] = x[B].z),
                    (U[P * B + 3] = g[B].x),
                    (U[P * B + 4] = g[B].y),
                    (U[P * B + 5] = g[B].z),
                    Y && ((U[P * B + 6] = k[B].x), (U[P * B + 7] = k[B].y));
                z.sort(function (ja, ra) {
                  return ja.ac - ra.ac;
                });
                var sa = new (65536 > 3 * z.length ? Uint16Array : Uint32Array)(
                    3 * z.length
                  ),
                  Da = 0;
                z.forEach(function (ja, ra) {
                  ja.ac === Da
                    ? (A[Da].n += 3)
                    : (A.push({ n: 3, offset: 3 * ra }), ++Da);
                  sa[3 * ra] = ja.a;
                  sa[3 * ra + 1] = ja.b;
                  sa[3 * ra + 2] = ja.c;
                });
                D && D.remove();
                D = W.instance({ ka: U, indices: sa });
                n = C = !1;
                ia && fa.sh();
                t = !0;
                fa.cf();
                b.C && (b.C(fa), (b.C = null));
              }
            }
            function f(P) {
              D.Ma(P.n, P.offset);
            }
            function l(P, E) {
              O[E] &&
                (F.set(O[E].hm()),
                D.bind(!1),
                Y ? (F.Ra(), F.sj()) : (F.bb(), F.tj()),
                O[E].Lc() && (F.Uc(), C.yc(!1), F.ee(), tb.Nb()),
                O[E].rl(),
                O[E].vd(),
                D.Ma(P.n, P.offset));
            }
            function p(P, E) {
              O[E] &&
                (F.set(O[E].im()),
                D.bind(!1),
                Y ? (F.Ra(), F.sj()) : (F.bb(), F.tj()),
                O[E].Lc() && (F.Uc(), C.yc(!1), F.ee(), tb.Nb()),
                fa.Cc(),
                O[E].vd(),
                D.Ma(P.n, P.offset));
            }
            function u(P, E) {
              Q && O[E] && (O[E].sl(), D.Ma(P.n, P.offset));
            }
            function h(P, E) {
              Q && O[E] && (O[E].ul(Y), D.Ma(P.n, P.offset));
            }
            function m(P, E) {
              O[E] && (F.set(O[E].dm()), O[E].Dh(), D.Ma(P.n, P.offset));
            }
            function r(P, E) {
              O[E] &&
                (F.set(O[E].em()), fa.Cc(), O[E].Dh(), D.Ma(P.n, P.offset));
            }
            function w(P, E) {
              O[E] &&
                (F.set(O[E].fm()),
                O[E].Lc() && (C.yc(!1), F.ee(), tb.Nb()),
                D.bind(!1),
                O[E].Ah(Y),
                D.Ma(P.n, P.offset));
            }
            function H(P, E) {
              if (O[E]) {
                var B = O[E].gm();
                F.set(B);
                O[E].Lc() && (C.yc(!1), F.ee(), tb.Nb(), D.bind(!1));
                a[B] || (fa.Cc(), D.bind(!1), (a[B] = !0));
                O[E].Ah(Y);
                D.Ma(P.n, P.offset);
              }
            }
            function y(P, E) {
              return new Promise(function (B, U) {
                P
                  ? ((P.C = function (ca) {
                      ca
                        ? (O[E] && O[E].I(),
                          (O[E] = ca),
                          (ia = ia || ca.Lc()),
                          B())
                        : U();
                    }),
                    Ic.instance(P))
                  : U();
              });
            }
            if (!ha.ph()) return !1;
            void 0 === b.Jb && (b.Jb = !1);
            void 0 === b.Kb && (b.Kb = !1);
            void 0 === b.Ne && (b.Ne = !1);
            var x = null,
              z = null,
              g = null,
              k = null,
              D = null,
              M = null,
              C = null,
              n = !1,
              e = new $b(),
              v = new Dc(),
              J = [],
              N = null,
              A = [{ n: 0, offset: 0 }],
              G = [],
              L = [],
              q = !1,
              t = !1,
              R = [],
              O = [],
              ia = !1,
              Y = !1,
              Q = !1,
              fa = {
                visible: q,
                el: function () {
                  return A.length;
                },
                bi: function () {
                  return G;
                },
                sh: function () {
                  !n &&
                    Y &&
                    ((z = z.filter(function (P) {
                      return null !== P;
                    })),
                    (M = qd(x, g, k, z)),
                    (C = W.instance({ ka: M, indices: !1 })),
                    (k = g = z = x = M = null),
                    (n = !0));
                },
                Cc: function () {
                  tb.V();
                  fa.Ch();
                },
                Ch: function () {
                  F.Vc("u138", e.elements);
                },
                Gp: function () {
                  q && (fa.Ch(), D.bind(!1), Y ? F.Ra() : F.bb(), D.V());
                },
                Bl: function (P) {
                  q && (P || fa.Cc(), D.bind(!1), Y ? F.Ra() : F.bb(), D.V());
                },
                Cl: function () {
                  q && (D.bind(!1), Y ? F.Ra() : F.bb(), A.forEach(u));
                },
                zh: function () {
                  q && (D.bind(!1), Y ? F.Ra() : F.bb(), L.forEach(f));
                },
                zl: function (P) {
                  Q &&
                    q &&
                    (D.bind(!1),
                    Y ? F.Ra() : F.bb(),
                    P ? A.forEach(m) : A.forEach(r));
                },
                ud: function (P) {
                  q &&
                    (P || fa.Cc(),
                    D.bind(!1),
                    P || (F.Ra(), F.Uc()),
                    Q && A.forEach(h));
                },
                vd: function (P) {
                  Q && q && (P ? A.forEach(l) : A.forEach(p));
                },
                wl: function () {
                  Q && q && A.forEach(H);
                },
                vl: function () {
                  Q && q && A.forEach(w);
                },
                ai: function () {
                  return N;
                },
                Zh: function () {
                  return R;
                },
                No: function (P, E) {
                  O[P].update(E);
                  fa.Wj();
                },
                wg: function (P, E) {
                  R = P;
                  Q = !1;
                  O.forEach(function (B) {
                    B.I();
                  });
                  O = Array(P.length);
                  ia = !1;
                  P = P.map(function (B, U) {
                    return "string" === typeof B
                      ? nd(-1 === B.indexOf(".json") ? B + ".json" : B).then(
                          function (ca) {
                            ca.name = B;
                            return y(ca, U, B);
                          }
                        )
                      : y(B, U, !1);
                  });
                  Promise.all(P).then(function () {
                    Q = !0;
                    fa.nd(function () {
                      ia && fa.sh();
                      fa.Wj();
                      ya.Db(fa);
                      ya.me(!0);
                      E && E(fa);
                    }, 4);
                    fa.cf();
                  });
                },
                Wj: function () {
                  L.splice(0);
                  A.forEach(function (P, E) {
                    O[E] && O[E].Nm() && L.push(P);
                  });
                },
                nd: function (P, E) {
                  t && Q ? P(fa) : J.push({ sb: P, order: E ? E : 0 });
                },
                cf: function () {
                  t &&
                    Q &&
                    (J.sort(function (P, E) {
                      return 0 > P.order - E.order ? 1 : -1;
                    }),
                    J.forEach(function (P) {
                      P.sb(fa);
                    }),
                    J.splice(0));
                },
                remove: function () {
                  fa.I();
                  fa = null;
                },
                I: function () {
                  q = t = !1;
                  D && D.remove();
                  O.forEach(function (P) {
                    P.I();
                  });
                  n && C.remove();
                  A.splice(0);
                },
                km: function () {
                  return v.size().x;
                },
                lm: function () {
                  return v.size().y;
                },
                Xp: function () {
                  return v.size().z;
                },
                Ol: function () {
                  return uc(v).x;
                },
                Pl: function () {
                  return uc(v).y;
                },
                Mp: function () {
                  return uc(v).z;
                },
                Tp: function () {
                  return v.min.y;
                },
                replace: function (P, E, B) {
                  if (P === N) return E && fa && (fa.cf(), E(fa)), !1;
                  N = P;
                  ya.me(!1);
                  Fc(
                    P,
                    function (U) {
                      d(U);
                      E && E(fa);
                    },
                    B
                  );
                  return !0;
                },
              };
            b.Pc && fa.wg(b.Pc, b.Ne);
            N = b.url;
            Fc(b.url, d);
            return fa;
          },
          Hn: function () {
            a.s104 = !1;
            a.s104color = !1;
            a.s104NormalMap = !1;
            a.s104ParamsMap = !1;
            a.s104NormalParamsMap = !1;
          },
        };
      })(),
      wc = (function () {
        var a = null,
          b = !1,
          d = !1,
          f = null,
          l = new Float32Array(16),
          p = new Float32Array(3),
          u = { data: 0 },
          h = {
            m: function () {
              a = V.Ob
                ? new Worker("js/worker.php")
                : {
                    postMessage: function (m) {
                      u.data = m;
                      Jc.jn(u);
                    },
                    terminate: function () {},
                  };
              a.onmessage = function (m) {
                switch (m.data[0]) {
                  case 3:
                    for (var r = 0; 16 > r; ++r) l[r] = m.data[r + 1];
                    for (r = 0; 3 > r; ++r) p[r] = m.data[r + 17];
                    tb.lf().io(l, p);
                    break;
                  case 6:
                    h.bo(),
                      (b = !0),
                      Rb.ib(!1),
                      V.ga_ && (Eb.enable(), Eb.fe());
                }
              };
              f = new Float32Array(6);
              f[0] = 2;
              V.Ob || Jc.eo(a);
            },
            Bo: function () {
              V.xh || (d = !0);
            },
            Nq: function () {
              d = !1;
            },
            Rn: function (m, r) {
              if (r || (b && d))
                (f[1] = m[0]),
                  (f[2] = m[1]),
                  (f[3] = m[2]),
                  (f[4] = m[3]),
                  (f[5] = m[4]),
                  a.postMessage(f);
            },
            bo: function () {
              a.postMessage([5, V.nh]);
            },
            I: function () {
              V.Ob && a.terminate();
            },
          };
        return h;
      })(),
      Jc = (function () {
        var a = 0,
          b = 0,
          d = 0,
          f = [0, 0],
          l = new $b(),
          p = new tc(),
          u = new tc(),
          h = new Ua(),
          m = new Ua(),
          r = new Zb(),
          w = 0,
          H = new Float32Array(20);
        H[0] = 3;
        var y = null,
          x = { data: !1 },
          z = {
            m: function () {
              "undefined" === typeof V && (self.jp = { Ob: !0 });
              V.Ob && z.jg([6]);
            },
            jn: function (g) {
              switch (g.data[0]) {
                case 2:
                  z.xg(g.data);
                  break;
                case 5:
                  w = g.data[1];
              }
            },
            jg: function (g) {
              V.Ob ? postMessage(g) : ((x.data = g), y.onmessage(x));
            },
            xg: function (g) {
              a = g[1];
              b = g[2];
              d = g[3];
              f[0] = g[4];
              f[1] = g[5];
              h.set(f[0], f[1], -d);
              r.set(b, a, 0, "XYZ");
              if (!1 === r instanceof Zb)
                throw Error(
                  "JETHREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order."
                );
              g = Math.cos(r.F / 2);
              var k = Math.cos(r.G / 2),
                D = Math.cos(r.H / 2),
                M = Math.sin(r.F / 2),
                C = Math.sin(r.G / 2),
                n = Math.sin(r.H / 2),
                e = r.order;
              "XYZ" === e
                ? ((p.F = M * k * D + g * C * n),
                  (p.G = g * C * D - M * k * n),
                  (p.H = g * k * n + M * C * D),
                  (p.T = g * k * D - M * C * n))
                : "YXZ" === e
                ? ((p.F = M * k * D + g * C * n),
                  (p.G = g * C * D - M * k * n),
                  (p.H = g * k * n - M * C * D),
                  (p.T = g * k * D + M * C * n))
                : "ZXY" === e
                ? ((p.F = M * k * D - g * C * n),
                  (p.G = g * C * D + M * k * n),
                  (p.H = g * k * n + M * C * D),
                  (p.T = g * k * D - M * C * n))
                : "ZYX" === e
                ? ((p.F = M * k * D - g * C * n),
                  (p.G = g * C * D + M * k * n),
                  (p.H = g * k * n - M * C * D),
                  (p.T = g * k * D + M * C * n))
                : "YZX" === e
                ? ((p.F = M * k * D + g * C * n),
                  (p.G = g * C * D + M * k * n),
                  (p.H = g * k * n - M * C * D),
                  (p.T = g * k * D - M * C * n))
                : "XZY" === e &&
                  ((p.F = M * k * D - g * C * n),
                  (p.G = g * C * D - M * k * n),
                  (p.H = g * k * n + M * C * D),
                  (p.T = g * k * D + M * C * n));
              h.y -= w;
              g = l.elements;
              n = p.x;
              var v = p.y,
                J = p.z;
              M = p.w;
              var N = n + n,
                A = v + v;
              C = J + J;
              k = n * N;
              D = n * A;
              n *= C;
              e = v * A;
              v *= C;
              J *= C;
              N *= M;
              A *= M;
              M *= C;
              g[0] = 1 - (e + J);
              g[4] = D - M;
              g[8] = n + A;
              g[1] = D + M;
              g[5] = 1 - (k + J);
              g[9] = v - N;
              g[2] = n - A;
              g[6] = v + N;
              g[10] = 1 - (k + e);
              g[3] = 0;
              g[7] = 0;
              g[11] = 0;
              g[12] = 0;
              g[13] = 0;
              g[14] = 0;
              g[15] = 1;
              l.setPosition(h);
              u.N(p).inverse();
              g = m.N(h);
              v = g.x;
              N = g.y;
              J = g.z;
              k = u.x;
              D = u.y;
              M = u.z;
              C = u.w;
              n = C * v + D * J - M * N;
              e = C * N + M * v - k * J;
              A = C * J + k * N - D * v;
              v = -k * v - D * N - M * J;
              g.x = n * C + v * -k + e * -M - A * -D;
              g.y = e * C + v * -D + A * -k - n * -M;
              g.z = A * C + v * -M + n * -D - e * -k;
              for (g = 1; 17 > g; ++g) H[g] = l.elements[g - 1];
              H[17] = m.x;
              H[18] = m.y;
              H[19] = m.z;
              z.jg(H);
            },
            eo: function (g) {
              y = g;
              z.jg([6]);
            },
          };
        return z;
      })();
    Jc.m();
    var Ic = (function () {
        function a(u) {
          var h = u.split(":").shift();
          return "data" === h || "blob" === h
            ? u
            : ("undefined" !== typeof I && I.da ? I : V).da + V.Ki + u;
        }
        function b(u, h) {
          return Math.min(h + u + h * u, 1);
        }
        var d = !1,
          f = null,
          l = 1,
          p = {
            diffuseTexture: null,
            normalTexture: null,
            paramsTexture: null,
            colorTextureUsage: 0,
            metalness: 0.5,
            roughness: 0.5,
            fresnelMin: 0,
            fresnelMax: 1,
            fresnelPow: 5,
            alpha: 1,
            diffuseColor: [255, 255, 255],
            paramsMapMask: [0, 0, 0, 0],
            C: null,
          };
        return {
          m: function () {
            f = aa.instance({
              width: 1,
              height: 1,
              isMipmap: !1,
              K: 4,
              array: new Uint8Array([255, 255, 255, 255]),
              Gf: !1,
            });
          },
          ff: function () {
            d = !0;
            l = 2;
          },
          instance: function (u) {
            function h() {
              "number" === typeof k.alpha
                ? ((z[0] = k.alpha), (z[1] = 0), (z[2] = 0), (z[3] = 0))
                : ((z[0] = k.alpha[0]),
                  (z[1] = k.alpha[1] - k.alpha[0]),
                  (z[2] = k.alpha[2]),
                  (z[3] = k.alpha[3]));
              var t = 1 <= k.fresnelPow ? k.fresnelMin : k.fresnelMax;
              g[0] = b(z[0], t);
              g[1] = b(z[1], t);
              g[2] = z[2];
              g[3] = z[3];
              e = {
                Ti: k.fresnelMax,
                Gi: [k.fresnelMin, k.roughness, k.fresnelPow / 15, k.metalness],
                Ji: k.paramsMapMask,
              };
            }
            function m() {
              return new Promise(function (t) {
                (y = k.normalTexture && ha.Yk() ? !0 : !1) && !C.Fa
                  ? (C.Fa = aa.instance({
                      url: a(k.normalTexture),
                      isLinear: !0,
                      isMipmap: !0,
                      isAnisotropicFiltering: !1,
                      isPot: !0,
                      K: 3,
                      C: t,
                    }))
                  : t();
              });
            }
            function r() {
              return new Promise(function (t) {
                (x = k.diffuseTexture && "" !== k.diffuseTexture ? !0 : !1) &&
                !C.ia
                  ? ((C.ia = aa.instance({
                      url: a(k.diffuseTexture),
                      isMipmap: !0,
                      isLinear: !0,
                      isPot: !0,
                      isAnisotropicFiltering: !0,
                      isSrgb: !1,
                      isMirrorY: !1,
                      isMirrorX: !1,
                      K: 4,
                      C: t,
                    })),
                    (M = "s109"))
                  : (C.ia || ((M = "s110"), (C.ia = f)), t());
                D = [
                  k.diffuseColor[0] / 255,
                  k.diffuseColor[1] / 255,
                  k.diffuseColor[2] / 255,
                ];
              });
            }
            function w() {
              return new Promise(function (t) {
                (n = k.paramsTexture ? !0 : !1) && !C.$a
                  ? k.paramsTexture === k.diffuseTexture
                    ? ((C.$a = C.ia), t())
                    : (C.$a = aa.instance({
                        url: a(k.paramsTexture),
                        isMipmap: !0,
                        isLinear: !0,
                        isPot: !0,
                        isAnisotropicFiltering: !1,
                        isSrgb: !1,
                        isMirrorY: !1,
                        isMirrorX: !1,
                        K: 4,
                        C: t,
                      }))
                  : t();
              });
            }
            function H(t) {
              h();
              Promise.all([m(), r(), w()]).then(function () {
                y || n || x
                  ? y || n
                    ? y && !n
                      ? ((v = "s104NormalMap"),
                        (J = "s104NNGLtextureNormalMap"))
                      : !y && n
                      ? ((v = "s104ParamsMap"),
                        (J = "s104NNGLtextureParamsMap"))
                      : ((v = "s104NormalParamsMap"),
                        (J = "s104NNGLtextureNormalParamsMap"))
                    : ((v = "s104"), (J = "s104NNGLtexture"))
                  : ((v = "s104color"), (J = "s104NNGLcolor"));
                N = y ? "s112" : "s111";
                A = y ? "s106" : "s116";
                G = n ? "s114" : "s113";
                L = n ? "s107" : "s117";
                k.C && setTimeout(k.C.bind(null, t), 1);
              });
            }
            var y,
              x,
              z = [1, 0, 0, 0],
              g = [0, 0, 0, 0],
              k = Object.assign({}, p, u),
              D = null,
              M = null,
              C = { ia: null, Fa: null, $a: null },
              n = (y = x = !1),
              e = null,
              v = null,
              J = null,
              N = null,
              A = null,
              G = null,
              L = null,
              q = {
                update: function (t) {
                  q.I();
                  Object.assign(k, t);
                  H();
                },
                Lc: function () {
                  return y;
                },
                Nm: function () {
                  return 0.99 > z[0];
                },
                im: function () {
                  return A;
                },
                hm: function () {
                  return N;
                },
                em: function () {
                  return L;
                },
                dm: function () {
                  return G;
                },
                gm: function () {
                  return v;
                },
                fm: function () {
                  return J;
                },
                vd: function () {
                  y && C.Fa.h(0);
                },
                ul: function (t) {
                  d && F.set(M);
                  t ? F.Ra() : F.bb();
                  x && F.Uc();
                  q.ud();
                },
                ud: function () {
                  x && (F.D("u73", k.colorTextureUsage), C.ia.h(0));
                  F.Cg("u148", D);
                },
                Dh: function () {
                  n && (C.$a.h(0), F.za("u75", e.Ji), F.Uc());
                  F.za("u112", e.Gi);
                  F.D("u149", e.Ti);
                },
                Ah: function (t) {
                  n && !y
                    ? C.$a.h(l)
                    : y && (x || f.h(0), C.Fa.h(l), n && C.$a.h(l + 1));
                  n && F.za("u75", e.Ji);
                  x || y ? F.Yn() : t ? F.Zn() : F.$n();
                  q.ud();
                  F.za("u13", z);
                  F.za("u112", e.Gi);
                  F.D("u149", e.Ti);
                },
                rl: function () {
                  F.za("u13", z);
                },
                sl: function () {
                  F.za("u13", g);
                },
                I: function () {
                  x && C.ia.remove();
                  y && C.Fa.remove();
                  n && k.paramsTexture !== k.diffuseTexture && C.$a.remove();
                  Object.assign(C, { ia: null, Fa: null, $a: null });
                },
              };
            H(q);
            return q;
          },
        };
      })(),
      Eb = (function () {
        var a = 0,
          b = 0,
          d = 0,
          f = 0,
          l = 0,
          p = 0,
          u = V.Fk,
          h = V.Ek,
          m = V.Gk,
          r = 0,
          w = 0,
          H = null,
          y = null,
          x = 0,
          z = 0,
          g = 0,
          k = 0,
          D = 0,
          M = null,
          C = 0,
          n = 0,
          e = 0,
          v = Date.now(),
          J = null,
          N = !1,
          A = !1,
          G = !1,
          L = 1,
          q = !1,
          t = {
            m: function () {
              a = V.Ak[ha.W()];
              b = V.zk[ha.W()];
              d = V.yk[ha.W()];
              n = V.Bk[ha.W()];
              f = V.sk[ha.W()];
              l = V.wk[ha.W()];
              g = V.xk[ha.W()];
              k = ha.P();
              D = ha.Z();
              r = Math.round(k * a);
              w = Math.round(D * a);
              y = Ca.instance({ width: r, height: w, Gc: !1 });
              H = aa.instance({ width: r, height: w, isPot: !1, isLinear: !0 });
              M = aa.instance({
                width: r,
                height: w,
                isPot: !1,
                isLinear: !0,
                K: 1,
              });
              N = !0;
            },
            resize: function (R, O, ia) {
              L = ia;
              k = R;
              D = O;
              r = Math.round(R * a);
              w = Math.round(O * a);
              y.resize(r, w);
              A = !0;
            },
            V: function () {
              var R = Math.exp(-(Date.now() - v) / n);
              C = G ? e + (1 - R) * (1 - e) : e * R;
              x = b + C * (d - b);
              z = f + (1 - C) * (1 - f);
              p = l + (1 - C) * (1 - l);
              aa.aa(5);
              if (A && N)
                aa.aa(6),
                  M.resize(r, w),
                  F.set("s0"),
                  F.he("u1", 6),
                  y.bind(!1, !0),
                  M.o(),
                  y.Re(),
                  H.h(6),
                  W.l(!0, !0),
                  H.resize(r, w),
                  H.o(),
                  M.h(6),
                  W.l(!1, !1),
                  F.he("u1", 0),
                  (A = !1);
              else {
                c.enable(c.BLEND);
                c.blendFunc(c.CONSTANT_ALPHA, c.ONE_MINUS_SRC_ALPHA);
                R = x / g;
                c.blendColor(R, R, R, R);
                c.colorMask(!0, !1, !1, !0);
                F.set("s96");
                tb.df();
                F.D("u129", x);
                n && (F.D("u130", z), F.D("u121", p));
                var O = L * (u + Math.pow(Math.random(), m) * (h - u));
                F.O("u14", O / k, O / D);
                y.jh();
                y.Wc();
                H.o();
                O = 2 * Math.PI * Math.random();
                for (var ia = !0, Y = 0; Y < g; ++Y)
                  1 === Y && (c.blendFunc(c.SRC_ALPHA, c.ONE), F.D("u129", R)),
                    F.D("u128", O + (Y / g) * (Math.PI / 2)),
                    F.O(
                      "u127",
                      (Math.random() - 0.5) / k,
                      (Math.random() - 0.5) / D
                    ),
                    W.l(ia, ia),
                    (ia = !1);
                c.disable(c.BLEND);
                F.set("s97");
                F.O("u14", 1 / r, 1 / w);
                M.o();
                H.h(7);
                W.l(!1, !1);
                c.colorMask(!0, !0, !0, !0);
              }
            },
            h: function (R) {
              M.h(R);
            },
            enable: function () {
              q = !0;
            },
            sn: function () {
              if (G || !q) return !1;
              J && clearTimeout(J);
              t.fe();
              J = setTimeout(t.Uj, 400);
            },
            fe: function () {
              J && (clearTimeout(J), (J = !1));
              !G &&
                q &&
                (window.ek.disable(), (G = !0), (v = Date.now()), (e = C));
            },
            Uj: function () {
              G &&
                q &&
                (J && (clearTimeout(J), (J = null)),
                window.ek.enable(),
                (G = !1),
                (v = Date.now()),
                (e = C));
            },
            I: function () {
              H.remove();
              M.remove();
              y.remove();
            },
          };
        t.sn();
        return t;
      })(),
      Ad = {
        instance: function (a) {
          var b = a.$.P(),
            d = a.Hm ? !0 : !1,
            f = d ? "s78" : "s12",
            l = aa.instance({
              isFloat: a.$.yi() && Fa.ha() && !d,
              U: a.$.zi() && !d,
              isLinear: !0,
              isMipmap: !1,
              isPot: !1,
              width: b,
              height: b,
              K: d ? 4 : 3,
            }),
            p = aa.instance({
              isFloat: a.$.yi() && Fa.ha(),
              U: a.$.zi(),
              isPot: !0,
              width: 1,
              height: b / 2,
              K: 3,
            });
          p.o();
          F.set("s90");
          a.$.h(0);
          W.l(!0, !0);
          var u = Math.round(Math.log(b) / Math.log(2));
          l.ao = function (h) {
            a.$ = h;
          };
          l.Dn = function () {
            l.o();
            F.set(f);
            F.D("u92", V.Rc);
            a.$.h(0);
            p.h(1);
            for (var h = 0, m = 0; m <= u; ++m) {
              var r = Math.pow(2, u - m),
                w = r / 2;
              c.viewport(0, h, b, w);
              F.O("u90", b / r, 1);
              F.D("u91", Math.min(6 / w, 0.6));
              h += r / 2;
              W.l(0 === m, 0 === m);
            }
          };
          l.Gn = l.remove;
          l.remove = function () {
            l.Gn();
            p.remove();
          };
          return l;
        },
      };
    xa.Ka = (function () {
      var a = {
          Tc: 45,
          rg: 1,
          Ab: "../../images/debug/picsou.png",
          de: 0.8,
          Nf: 3.14 / 6,
          Of: 0.314,
          Pd: 4,
          Od: 0.5,
          Mf: -0.25,
          Rm: 1,
          fa: 256,
          Lf: 0.15,
        },
        b = { qb: null, Pb: null, screen: null },
        d = !1,
        f = !1,
        l = -1,
        p = null,
        u = null,
        h = null,
        m = Math.PI / 180,
        r = [1, 1],
        w = !1,
        H = {
          m: function (y) {
            l = y.width;
            y = {
              isFloat: Fa.ha(),
              U: !0,
              isPot: !1,
              isMipmap: !1,
              isLinear: !1,
              width: l,
              height: l / 2,
              K: 3,
            };
            b.qb && (b.qb.remove(), b.Pb.remove());
            b.Pb = aa.instance(y);
            b.qb = Cc.instance(y);
            F.j("s118", [{ type: "1i", name: "u156", value: 0 }]);
            F.j("s119", [
              { type: "1i", name: "u93", value: 0 },
              { type: "1i", name: "u101", value: 1 },
              { type: "1i", name: "u161", value: 2 },
            ]);
            H.Xj();
            w = !0;
          },
          Xj: function () {
            F.j("s119", [
              { type: "1f", name: "u162", value: a.Nf },
              { type: "1f", name: "u163", value: a.Of },
              { type: "1f", name: "u164", value: a.Pd },
              { type: "1f", name: "u165", value: a.Od },
              { type: "1f", name: "u166", value: a.Mf },
            ]);
          },
          kq: function () {
            return f;
          },
          qa: function (y) {
            p = y;
          },
          Sc: function () {
            u =
              "uniform sampler2D u156;uniform vec2 u157,u158,u10;uniform int u159;uniform float u160,u142;varying vec2 vv0;const float h=3.141593;const vec2 i=vec2(.5);const float e=1.2;const vec3 g=vec3(1.);void main(){vec2 c=vec2(vv0.x*2.,-vv0.y+.5)*h,a=i+u10*(c-u157)/u158;float b=1.;if(u159==0){if(a.x<0.||a.x>1.||a.y<0.||a.y>1.)discard;}else b*=smoothstep(-e,0.,a.x),b*=1.-smoothstep(1.,1.+e,a.x),b*=smoothstep(-e,0.,a.y),b*=1.-smoothstep(1.,1.+e,a.y);vec3 d=mix(u160*g,texture2D(u156,a).rgb*u142,b*g);gl_FragColor=vec4(d,1.);}";
            h =
              "uniform sampler2D u93,u101,u161;uniform float u162,u163,u164,u165,u166,u167;varying vec2 vv0;const float f=3.141593;const vec2 h=vec2(.5);const vec3 i=vec3(1.);void main(){float j=(vv0.x*2.-1.)*f,c=(-vv0.y+.5)*f;vec4 a=texture2D(u161,h);float d=a.r,k=u164*a.g,l=u165*(a.b+u166),b=a.a,g=asin(cos(b)*cos(d)),m=atan(cos(b)*sin(d),-sin(b)),n=acos(sin(c)*sin(g)+cos(c)*cos(g)*cos(j-m)),o=1.-smoothstep(u162-u163,u162+u163,n);vec3 p=i*(max(l,0.)+max(k,0.)*o),q=texture2D(u93,vv0).rgb,r=texture2D(u101,vv0).rgb;gl_FragColor=vec4(mix(p+r,q,u167),1.);}";
            F.na("s118", {
              name: "_",
              g: u,
              i: "u156 u157 u159 u158 u160 u142 u10".split(" "),
              precision: "highp",
            });
            F.na("s119", {
              name: "_",
              g: h,
              i: "u161 u162 u163 u164 u165 u166 u101 u93 u167".split(" "),
              precision: "highp",
            });
          },
          Hg: function (y, x, z, g, k, D, M, C) {
            F.O("u157", x, z);
            F.he("u159", g ? 1 : 0);
            F.O("u158", k, k / D);
            F.Ag("u10", M);
            y.h(0);
            W.l(C, C);
          },
          ci: function () {
            return b.qb.Xh();
          },
          lh: function (y) {
            H.m({ width: a.fa });
            H.Yj(y, !1, 1);
            f = !0;
          },
          kh: function () {
            (d && b.screen.nm() === a.Ab) ||
              ((d = !1),
              b.screen && b.screen.remove(),
              (b.screen = aa.instance({
                url: a.Ab,
                isFloat: !1,
                C: function () {
                  d = !0;
                },
              })));
          },
          xg: function (y) {
            Object.assign(a, y);
          },
          ib: function (y) {
            H.xg(y);
            w && (H.Xj(), H.kh());
          },
          Yj: function (y, x, z) {
            Ca.ba();
            b.Pb.L();
            F.set("s118");
            F.D("u160", a.Lf);
            F.D("u142", a.Rm);
            H.Hg(y, Math.PI, 0, !0, 90 * m, y.P() / y.Z(), r, !0);
            d &&
              ((y = a.fa),
              F.D("u142", a.de),
              c.viewport(0, 0, y / 2, y / 2),
              H.Hg(b.screen, 0, 0, !1, 2 * a.Tc * m, 2 * a.rg, r, !1),
              c.viewport(y / 2, 0, y / 2, y / 2),
              H.Hg(
                b.screen,
                2 * Math.PI,
                0,
                !1,
                2 * a.Tc * m,
                2 * a.rg,
                r,
                !1
              ));
            x
              ? (F.set("s119"),
                F.D("u167", 1 - z),
                b.qb.rj(0),
                b.Pb.h(1),
                x.h(2),
                W.l(!1, !1),
                p.vg(b.qb.Xh()))
              : p.vg(b.Pb);
          },
          A: function () {
            Object.assign(b, { qb: null, Pb: null, screen: null });
            f = d = !1;
            l = -1;
            p = null;
          },
        };
      return H;
    })();
    xa.mb = (function () {
      var a = !1,
        b = !0,
        d = null,
        f = null,
        l = 1,
        p = null,
        u = {
          Sc: function () {
            ha.ca() &&
              (F.na("s120", {
                name: "_",
                v: "attribute vec3 a0;uniform sampler2D u41;uniform float u145;uniform vec2 u42;uniform vec3 u144;const float l=0.,m=0.,D=1.;const vec2 e=vec2(1.);const vec3 n=vec3(1.);const vec2 E=vec2(-1.,1.),o=vec2(.16,.5),p=vec2(.5,.5),q=vec2(.84,.5);uniform mat4 u76;uniform vec3 u79,u83,u84,u85;uniform float u77,u78,u86,u87,u80,u81,u82,u88;mat3 r(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u41,o);vec2 f=u86*e;vec3 c=u86*n;vec2 s=mix(d.a*u42,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u41,p).rgb+vec3(u80,0.,0.),u83,c);float t=mix(texture2D(u41,q).r,0.,u86);a.z+=t;mat3 u=r(a);vec3 v=mix(u144,u84,c);float w=mix(u145,u87,u86);vec3 b=mix(u79,u85,c);b.x+=u77*sin(a.y),b.y+=u78*sin(a.x)*step(0.,a.x);float h=cos(a.z),i=sin(a.z);mat2 x=mat2(h,i,-i,h);b.xy=x*b.xy;float y=mix(u82,1.,u86);vec2 j=u81/s;vec3 k=a0;float z=max(0.,-a0.z-l)*m;k.x+=z*sign(a0.x)*(1.-u86);vec3 A=u*(k+v)*w+b;vec2 B=j*y;vec3 C=vec3(g*B,-j)+A*vec3(1.,-1.,-1.);gl_Position=u76*(vec4(u88*e,e)*vec4(C,1.));}",
                g: "void main(){gl_FragData[0]=vec4(0.,0.,0.,0.),gl_FragData[1]=vec4(0.,0.,1.,1.),gl_FragData[2]=vec4(1.,0.,0.,0.),gl_FragData[3]=vec4(0.,.5,1.,0.);}",
                i: ["u41", "u42", "u79", "u144", "u145"].concat(F.Ed(), F.Fd()),
                J: ["a0"],
                S: [3],
                ea: !0,
              }),
              (a = !0));
          },
          m: function (h) {
            a &&
              F.j(
                "s120",
                [
                  { type: "1i", name: "u41", value: 1 },
                  { type: "3f", name: "u79", value: h.Ga },
                  { type: "1f", name: "u145", value: 1 },
                  { type: "1f", name: "u80", value: 0 },
                  { type: "1f", name: "u88", value: 1 },
                ].concat(h.Sg)
              );
          },
          fb: function (h, m) {
            f = h;
            l = m;
            u.ii();
          },
          eb: function (h, m) {
            d = h;
            p = m;
            u.ii();
          },
          ii: function () {
            if (ha.ca() && f && d) {
              var h = [d[0] * f, d[1] * f, d[2] * f],
                m = p;
              h[0] += m[0];
              h[1] += m[1];
              h[2] += m[2];
              F.j("s120", [
                { type: "1f", name: "u145", value: l },
                { type: "3f", name: "u144", value: h },
              ]);
              F.M();
            }
          },
          xm: function (h) {
            for (
              var m = h.width / 2,
                r = h.height / 2,
                w = h.depth,
                H = h.Dl,
                y = h.height / 4,
                x = h.hl,
                z = 2 * x + 4,
                g = [],
                k = [],
                D = -m + h.Va,
                M = -H - h.Va,
                C = m - h.Va,
                n = -H - h.Va,
                e = 0;
              e < z;
              ++e
            ) {
              var v = 0,
                J = 0;
              0 === e
                ? ((v = -m), (J = -H - w))
                : 1 <= e && e <= 1 + x
                ? ((J = (((e - 1) / x) * Math.PI) / 2),
                  (v = D - Math.cos(J) * h.Va),
                  (J = M + Math.sin(J) * h.Va))
                : e >= 2 + x && e <= 2 + 2 * x
                ? ((J = (((e - 2 - x) / x) * Math.PI) / 2),
                  (v = C + Math.sin(J) * h.Va),
                  (J = n + Math.cos(J) * h.Va))
                : e === z - 1 && ((v = m), (J = -H - w));
              g.push(v, r + y, J, v, -r + y, J);
              0 !== e &&
                k.push(
                  2 * e,
                  2 * e - 2,
                  2 * e - 1,
                  2 * e,
                  2 * e - 1,
                  2 * e + 1
                );
            }
            return u.instance({ ka: g, indices: k });
          },
          toggle: function (h) {
            b = h;
          },
          instance: function (h) {
            var m = W.instance({ ka: h.ka, indices: h.indices });
            return {
              V: function () {
                a && b && (F.set("s120"), m.bind(!0), m.V());
              },
            };
          },
        };
      return u;
    })();
    xa.ja = (function () {
      function a(q) {
        F.j("s123", q);
        F.j("s124", q);
      }
      var b = {
        vf: -87,
        qm: [85, 95],
        hi: [90, 90],
        gi: [85, 70],
        od: 24,
        Ap: 12,
        il: 2,
        kg: [-80, 40],
        Pi: [0, -10],
        fn: 40,
        hn: 20,
        Qi: [70, 50],
        gn: 90,
        Jo: 2,
        je: [0, -15],
        Be: 1024,
        lb: 512,
        Wd: 4,
        zo: [6, 30],
        Oi: 1.2,
      };
      b.Zi = b.kg;
      var d = !1,
        f = !1,
        l = !1,
        p = null,
        u = null,
        h = null,
        m = null,
        r = null,
        w = null,
        H = !1,
        y = !1,
        x = null,
        z = null,
        g = null,
        k = null,
        D = 0.5,
        M = [{ type: "1f", name: "u169", value: 1 }],
        C = null,
        n = null,
        e = 0,
        v = ["u41", "u42", "u145", "u144"],
        J = null,
        N = null,
        A = null,
        G = null,
        L = {
          Sc: function () {
            F.na("s121", {
              name: "_",
              v: "attribute vec3 a0;uniform vec3 u144;uniform vec2 u170,u171;uniform float u145,u172,u173,u174;varying float vv0,vv1;void main(){vec3 a=(a0+u144)*u145;float b=atan(a.x,a.z-u172),d=2.*(a.y-u173)/(u174-u173)-1.;vv0=a0.y;float g=1.-u170.x*u170.x/(u170.y*u170.y),c=u170.x/sqrt(1.-g*pow(cos(b),2.));vec3 h=vec3(c*sin(b),a.y,c*cos(b)+u172);vv1=smoothstep(u171.x,u171.y,length(h-a)),gl_Position=vec4(b,d,0.,1.);}",
              g: "uniform float u175;uniform vec4 u13;varying float vv0,vv1;void main(){float a=u13.x+u13.y*smoothstep(-u13.w,-u13.z,vv0),b=min(a,1.)*u175;gl_FragColor=vec4(b,vv1,1.,1.);}",
              i: "u145 u144 u170 u171 u172 u173 u174 u13 u175".split(" "),
              J: ["a0"],
              S: [3],
              precision: "highp",
            });
            F.na("s122", {
              name: "_",
              g: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u1,vv0-3.*u14),c=texture2D(u1,vv0-2.*u14),d=texture2D(u1,vv0-u14),f=texture2D(u1,vv0+u14),g=texture2D(u1,vv0+2.*u14),h=texture2D(u1,vv0+3.*u14);float j=.031496*b.r+.110236*c.r+.220472*d.r+.275591*a.r+.220472*f.r+.110236*g.r+.031496*h.r;vec2 i=b.gb*b.b+c.gb*c.b+d.gb*d.b+a.gb*a.b+f.gb*f.b+g.gb*g.b+h.gb*h.b;i/=b.b+c.b+d.b+a.b+f.b+g.b+h.b,gl_FragColor=vec4(mix(j,a.r,1.-i.x),i,1);}",
              i: ["u1", "u14"],
              precision: "lowp",
            });
            F.na("s123", {
              name: "_",
              v: "attribute vec3 a0,a2;attribute vec2 a1;varying vec2 vv0;varying float vv1;uniform sampler2D u41;uniform vec2 u42;uniform float u145;uniform vec3 u144;const float o=0.,p=0.;const vec2 e=vec2(1.);const vec3 q=vec3(1.);const vec2 G=vec2(-1.,1.),r=vec2(.16,.5),s=vec2(.5,.5),t=vec2(.84,.5);uniform mat4 u76;uniform vec3 u79,u83,u84,u85;uniform float u77,u78,u86,u87,u80,u81,u82,u88;mat3 u(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u41,r);vec2 g=u86*e;vec3 c=u86*q;vec2 v=mix(d.a*u42,e,g),h=(2.*d.gb-e)*(1.-g);h.x*=-1.;vec3 a=mix(texture2D(u41,s).rgb+vec3(u80,0.,0.),u83,c);float w=mix(texture2D(u41,t).r,0.,u86);a.z+=w;mat3 i=u(a);vec3 x=mix(u144,u84,c);float y=mix(u145,u87,u86);vec3 b=mix(u79,u85,c);b.x+=u77*sin(a.y),b.y+=u78*sin(a.x)*step(0.,a.x);float j=cos(a.z),k=sin(a.z);mat2 z=mat2(j,k,-k,j);b.xy=z*b.xy;float A=mix(u82,1.,u86);vec2 l=u81/v;vec3 m=a0;float B=max(0.,-a0.z-o)*p;m.x+=B*sign(a0.x)*(1.-u86);vec3 C=i*(m+x)*y+b;vec2 D=l*A;vec3 E=vec3(h*D,-l)+C*vec3(1.,-1.,-1.);gl_Position=u76*(vec4(u88*e,e)*vec4(E,1.)),vv0=a1,gl_Position*=vec4(-1.,1.,1.,1.);vec3 F=i*a2;vv1=-F.z,vv1*=vv1*1e-5+smoothstep(5.,50.,abs(a0.x));}",
              g: "uniform sampler2D u176,u161;uniform vec2 u90,u177;uniform float u178,u169;varying vec2 vv0;varying float vv1;void main(){vec2 b=u177*u178+u90*vv0;vec4 a=u169*texture2D(u176,b);a.r*=step(0.,vv0.y),gl_FragColor=vec4(0.,0.,0.,a.r*vv1);}",
              i: "u176 u161 u79 u178 u177 u90 u169"
                .split(" ")
                .concat(F.Ed(), F.Fd(), v),
              J: ["a0", "a2", "a1"],
              S: [3, 3, 2],
              precision: "lowp",
            });
            F.na("s124", {
              name: "_",
              v: "attribute vec3 a0;uniform sampler2D u41;uniform vec2 u42;uniform float u145;uniform vec3 u144;const float l=0.,m=0.;const vec2 e=vec2(1.);const vec3 n=vec3(1.);const vec2 D=vec2(-1.,1.),o=vec2(.16,.5),p=vec2(.5,.5),q=vec2(.84,.5);uniform mat4 u76;uniform vec3 u79,u83,u84,u85;uniform float u77,u78,u86,u87,u80,u81,u82,u88;mat3 r(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u41,o);vec2 f=u86*e;vec3 c=u86*n;vec2 s=mix(d.a*u42,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u41,p).rgb+vec3(u80,0.,0.),u83,c);float t=mix(texture2D(u41,q).r,0.,u86);a.z+=t;mat3 u=r(a);vec3 v=mix(u144,u84,c);float w=mix(u145,u87,u86);vec3 b=mix(u79,u85,c);b.x+=u77*sin(a.y),b.y+=u78*sin(a.x)*step(0.,a.x);float h=cos(a.z),i=sin(a.z);mat2 x=mat2(h,i,-i,h);b.xy=x*b.xy;float y=mix(u82,1.,u86);vec2 j=u81/s;vec3 k=a0;float z=max(0.,-a0.z-l)*m;k.x+=z*sign(a0.x)*(1.-u86);vec3 A=u*(k+v)*w+b;vec2 B=j*y;vec3 C=vec3(g*B,-j)+A*vec3(1.,-1.,-1.);gl_Position=u76*(vec4(u88*e,e)*vec4(C,1.)),gl_Position*=vec4(-1.,1.,1.,1.);}",
              g: "void main(){gl_FragColor=vec4(0.);}",
              i: ["u79"].concat(F.Ed(), F.Fd(), v),
              J: ["a0"],
              S: [3],
              precision: "lowp",
            });
            d = !0;
          },
          m: function (q) {
            if (d) {
              if (void 0 === q.jc || !q.jc) return !1;
              if (f) L.pj(q);
              else {
                m = aa.instance({
                  isFloat: !1,
                  isPot: !1,
                  isMipmap: !1,
                  isLinear: !0,
                  width: b.Be,
                  height: b.Be / 4,
                });
                var t = b.lb / 4,
                  R = {
                    isFloat: !1,
                    isPot: !1,
                    isMipmap: !1,
                    isLinear: !1,
                    width: b.lb,
                    height: t,
                  };
                h = aa.instance(R);
                w = aa.instance(R);
                r = aa.instance({
                  isFloat: !1,
                  isPot: !1,
                  isMipmap: !1,
                  isLinear: !0,
                  width: b.lb,
                  height: t * b.Wd,
                });
                t = [];
                R = [];
                var O = b.Pi[0],
                  ia = b.Pi[1],
                  Y = b.fn,
                  Q = b.hn,
                  fa = -b.Qi[0] + O,
                  P = b.Qi[1] + ia,
                  E = b.gn;
                t.push(
                  0,
                  O,
                  ia,
                  0.5 * -Q,
                  fa,
                  P,
                  0.5 * Q,
                  fa,
                  P,
                  0.5 * -Y,
                  O - E,
                  ia,
                  0.5 * Y,
                  O - E,
                  ia
                );
                R.push(0, 2, 1, 0, 1, 3, 1, 4, 3, 1, 2, 4, 0, 4, 2);
                A = W.instance({
                  ka: new Float32Array(t),
                  indices: new Uint16Array(R),
                });
                t = 0.5 - 0.5 / q.kc[1];
                R = 0.5 + 0.5 / q.kc[1];
                O = new Float32Array(16 * b.od);
                ia = new Uint16Array(6 * (b.od - 1));
                for (Y = 0; Y < b.od; ++Y) {
                  Q = (2 * Y) / (b.od - 1) - 1;
                  Q = Math.sign(Q) * Math.pow(Math.abs(Q), b.il);
                  E = (Math.PI * (Q + 1)) / 2 - Math.PI / 2;
                  Q = Math.sin(E);
                  var B = Math.cos(E);
                  fa = Math.sin(E * b.Oi);
                  P = Math.cos(E * b.Oi);
                  var U = E / (Math.PI * q.kc[0]) + 0.5;
                  E = b.gi[0] * Q;
                  var ca = b.Zi[0],
                    na = b.gi[1] * B + b.vf,
                    za = U,
                    Ea = t,
                    ma = b.Zi[1];
                  B = b.hi[1] * B + b.vf;
                  var ua = R,
                    Ma = 16 * Y;
                  O[Ma] = b.hi[0] * Q;
                  O[Ma + 1] = ma;
                  O[Ma + 2] = B;
                  O[Ma + 3] = fa;
                  O[Ma + 4] = 0;
                  O[Ma + 5] = P;
                  O[Ma + 6] = U;
                  O[Ma + 7] = ua;
                  O[Ma + 8] = E;
                  O[Ma + 9] = ca;
                  O[Ma + 10] = na;
                  O[Ma + 11] = fa;
                  O[Ma + 12] = 0;
                  O[Ma + 13] = P;
                  O[Ma + 14] = za;
                  O[Ma + 15] = Ea;
                  0 !== Y &&
                    ((Q = 2 * Y),
                    (fa = 6 * (Y - 1)),
                    (ia[fa] = Q),
                    (ia[fa + 1] = Q - 1),
                    (ia[fa + 2] = Q - 2),
                    (ia[fa + 3] = Q),
                    (ia[fa + 4] = Q + 1),
                    (ia[fa + 5] = Q - 1));
                }
                G = W.instance({ ka: O, indices: ia });
                L.pj(q);
                F.j("s122", [{ type: "1i", name: "u1", value: 0 }]);
                f = !0;
              }
            }
          },
          pj: function (q) {
            D = q.uo;
            k = q.ke;
            var t = [
              { type: "1i", name: "u41", value: 1 },
              {
                type: "3f",
                name: "u79",
                value: [q.Ga[0], q.Ga[1] - b.je[0], q.Ga[2] + b.je[1]],
              },
            ].concat(q.Sg, q.Tj);
            C = [
              { type: "1i", name: "u176", value: 0 },
              { type: "1i", name: "u161", value: 2 },
              { type: "1f", name: "u178", value: q.vo },
              { type: "2f", name: "u90", value: [1, 1 / b.Wd] },
              { type: "2f", name: "u177", value: [0, 1 / b.Wd] },
              { type: "1f", name: "u169", value: 1 },
            ].concat(t);
            n = t;
            F.j("s123", C);
            F.j("s124", n);
          },
          ec: function (q) {
            p = q;
          },
          dc: function (q) {
            J = q;
            J.nd(L.zc);
          },
          Ai: function () {
            return l && null !== J && null !== N;
          },
          zc: function () {
            if (!(l || (y && H)) || null === J || null === N) return !1;
            e = 0;
            c.viewport(0, 0, b.Be, b.Be / 4);
            Ca.ba();
            m.o();
            c.clearColor(0, 0, 0, 0);
            c.clear(c.COLOR_BUFFER_BIT);
            F.j("s121", [
              { type: "1f", name: "u172", value: b.vf },
              { type: "1f", name: "u173", value: b.kg[0] },
              { type: "1f", name: "u174", value: b.kg[1] },
              {
                type: "3f",
                name: "u144",
                value: [x[0] + z[0], x[1] + z[1], x[2] + z[2]],
              },
              { type: "1f", name: "u175", value: D },
              { type: "2f", name: "u170", value: b.qm },
              { type: "2f", name: "u171", value: b.zo },
            ]);
            J.Cl();
            F.set("s1");
            var q = b.lb / 4;
            c.viewport(0, 0, b.lb, q);
            h.o();
            m.h(0);
            m.Dc();
            W.l(!0, !0);
            for (var t = 0; t < b.Wd; ++t)
              F.set("s122"),
                0 !== t && c.viewport(0, 0, b.lb, q),
                w.o(),
                h.h(0),
                F.O("u14", 1 / b.lb, 0),
                W.l(!1, !1),
                h.o(),
                w.h(0),
                F.O("u14", 0, 1 / q),
                W.l(!1, !1),
                b.jl && c.colorMask(0 === t, 1 === t, 2 === t, !0),
                F.set("s1"),
                r.o(),
                h.h(0),
                c.viewport(0, t * q, b.lb, q),
                W.l(!1, !1),
                b.jl && c.colorMask(!0, !0, !0, !0);
            return (l = !0);
          },
          V: function () {
            L.Ai() &&
              0 === e++ % b.Jo &&
              (N.bind(!1, !1),
              u.L(),
              c.clearColor(0, 0, 0, 0),
              c.enable(c.DEPTH_TEST),
              c.depthMask(!0),
              c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT),
              F.set("s124"),
              p.h(1),
              A.bind(!0),
              A.V(),
              F.set("s123"),
              r.h(0),
              G.bind(!0),
              G.V(),
              c.disable(c.DEPTH_TEST),
              c.depthMask(!1));
          },
          jm: function () {
            return u;
          },
          add: function () {
            L.Ai() &&
              (c.enable(c.BLEND),
              c.blendFunc(c.ONE, c.ONE_MINUS_SRC_ALPHA),
              u.h(0),
              W.l(!1, !1),
              c.disable(c.BLEND));
          },
          tg: function (q, t) {
            N && N.remove();
            N = Ca.instance({ width: q, height: t, Gc: !0 });
            u && u.remove();
            u = aa.instance({ width: q, height: t, isFloat: !1, isPot: !1 });
            L.zc();
          },
          eb: function (q, t, R) {
            q || ((q = x), (t = z), (R = g));
            a([
              {
                type: "3f",
                name: "u144",
                value: [
                  R[0] + k[0],
                  R[1] + k[1] - b.je[0],
                  R[2] + k[2] + b.je[1],
                ],
              },
            ]);
            x = q;
            z = t;
            g = R;
            y = !0;
            !l && H && L.zc();
            F.M();
          },
          fb: function (q, t) {
            F.j("s121", [{ type: "1f", name: "u145", value: q }]);
            a([{ type: "1f", name: "u145", value: t }]);
            H = !0;
            !l && y && L.zc();
            F.M();
          },
          yg: function (q) {
            a([{ type: "1f", name: "u80", value: q }]);
            F.M();
          },
          Db: function (q) {
            q && (J = q);
            L.zc();
          },
          zg: function (q, t) {
            M[0].value = 1 - q;
            a(M);
            a(t);
          },
          I: function () {},
          A: function () {
            l = f = d = !1;
            w = r = m = h = u = p = null;
          },
        };
      return L;
    })();
    xa.ta = (function () {
      var a = !1,
        b = null,
        d = 0,
        f = 0,
        l = 0,
        p = [{ type: "1f", name: "u169", value: 1 }],
        u = null,
        h = null,
        m = null,
        r = {
          Sc: function () {
            F.na("s125", {
              name: "_",
              v: "attribute vec3 a0;uniform vec2 u179,u180;varying vec2 vv0;void main(){vec2 a=2.*(a0.xy-u180)/u179;gl_Position=vec4(a,0.,1.),vv0=a0.xy;}",
              g: "uniform vec2 u181;uniform float u182,u183,u184;varying vec2 vv0;void main(){vec2 b=vec2(sign(vv0.x)*.5*u182,u183),a=vv0-b,c=u184*a,d=(c-a)*u181;gl_FragColor=vec4(d,0.,1.);}",
              i: "u179 u180 u182 u183 u184 u181".split(" "),
              J: ["a0"],
              S: [3],
              precision: "highp",
            });
            F.na("s126", {
              name: "_",
              v: "attribute vec3 a0;varying vec2 vv0,vv1;uniform sampler2D u41;uniform vec3 u144;uniform vec2 u42,u179,u180;uniform float u145;const float n=0.,o=0.;const vec2 e=vec2(1.);const vec3 p=vec3(1.);const vec2 F=vec2(-1.,1.),q=vec2(.16,.5),r=vec2(.5,.5),s=vec2(.84,.5);uniform mat4 u76;uniform vec3 u79,u83,u84,u85;uniform float u77,u78,u86,u87,u80,u81,u82,u88;mat3 t(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u41,q);vec2 f=u86*e;vec3 c=u86*p;vec2 u=mix(d.a*u42,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u41,r).rgb+vec3(u80,0.,0.),u83,c);float v=mix(texture2D(u41,s).r,0.,u86);a.z+=v;mat3 w=t(a);vec3 x=mix(u144,u84,c);float y=mix(u145,u87,u86);vec3 b=mix(u79,u85,c);b.x+=u77*sin(a.y),b.y+=u78*sin(a.x)*step(0.,a.x);float h=cos(a.z),i=sin(a.z);mat2 z=mat2(h,i,-i,h);b.xy=z*b.xy;float A=mix(u82,1.,u86);vec2 j=u81/u;vec3 k=a0;float B=max(0.,-a0.z-n)*o;k.x+=B*sign(a0.x)*(1.-u86);vec3 C=w*(k+x)*y+b;vec2 D=j*A;vec3 E=vec3(g*D,-j)+C*vec3(1.,-1.,-1.);gl_Position=u76*(vec4(u88*e,e)*vec4(E,1.)),gl_Position*=vec4(-1.,1.,1.,1.),vv0=vec2(.5,.5)+(a0.xy-u180)/u179,vv1=vec2(.5,.5)+.5*gl_Position.xy/gl_Position.w;}",
              g: "uniform sampler2D u185,u186;uniform float u169;varying vec2 vv0,vv1;void main(){vec2 a=u169*texture2D(u185,vv0).rg;gl_FragColor=texture2D(u186,a+vv1);}",
              i: "u169 u41 u185 u186 u179 u180 u42 u79 u145 u144"
                .split(" ")
                .concat(F.Ed(), F.Fd()),
              J: ["a0"],
              S: [3],
              precision: "lowp",
            });
            a = !0;
          },
          m: function (w) {
            if (a) {
              if (void 0 === w.jc || !w.qd) return !1;
              h = aa.instance({
                isFloat: !0,
                isPot: !1,
                isMipmap: !1,
                isLinear: !1,
                width: 256,
                height: 128,
                K: 4,
              });
              m = Ca.instance({ width: 256, height: 128 });
              F.j(
                "s126",
                [
                  { type: "1i", name: "u41", value: 1 },
                  { type: "1i", name: "u185", value: 2 },
                  { type: "1i", name: "u186", value: 0 },
                  { type: "3f", name: "u79", value: w.Ga },
                  { type: "1f", name: "u169", value: 1 },
                ].concat(w.Tj, w.Sg)
              );
              f = w.Ye;
              l = w.Xe;
              d = w.Ze;
            }
          },
          ec: function (w) {
            b = w;
          },
          dc: function (w) {
            u = w;
            u.nd(r.Ue);
          },
          Ue: function () {
            c.viewport(0, 0, 256, 128);
            m.o();
            h.o();
            var w = u.km(),
              H = u.lm(),
              y = [
                { type: "2f", name: "u179", value: [w, H] },
                { type: "2f", name: "u180", value: [u.Ol(), u.Pl()] },
              ];
            F.j(
              "s125",
              y.concat([
                { type: "1f", name: "u182", value: f },
                { type: "1f", name: "u183", value: l },
                { type: "1f", name: "u184", value: d },
                { type: "2f", name: "u181", value: [1 / w, -1 / H] },
              ])
            );
            u.zh();
            F.j("s126", y);
          },
          V: function () {
            F.set("s126");
            b.h(1);
            h.h(2);
            u.zh();
          },
          eb: function (w) {
            F.j("s126", [{ type: "3f", name: "u144", value: w }]);
            F.M();
          },
          fb: function (w) {
            F.j("s126", [{ type: "1f", name: "u145", value: w }]);
            F.M();
          },
          yg: function (w) {
            F.j("s126", [{ type: "1f", name: "u80", value: w }]);
            F.M();
          },
          so: function (w) {
            d = w;
            r.Ue();
            F.M();
            ya.animate(Date.now());
          },
          Db: function (w) {
            w && (u = w);
            r.Ue();
          },
          zg: function (w, H) {
            p.u169 = 1 - w;
            F.j("s126", p);
            F.j("s126", H);
          },
          I: function () {},
        };
      return r;
    })();
    xa.qc = (function () {
      var a = [0, -0.5],
        b = !1,
        d = !1,
        f = null,
        l = null,
        p = null,
        u = null,
        h = null,
        m = -1,
        r = -1;
      return {
        Sc: function () {
          F.na("s127", {
            name: "_",
            v: "attribute vec2 a0;uniform sampler2D u41;uniform vec2 u42,u11;uniform float u10;varying vec2 vv0;const vec2 f=vec2(1.,1.);void main(){vec4 a=texture2D(u41,vec2(.25,.5));vec2 b=a.a*u42,c=2.*a.gb-f,d=u11+a0*u10;gl_Position=vec4(c+b*d,0.,1.),vv0=vec2(.5,.5)+.5*a0;}",
            g: "uniform sampler2D u187;varying vec2 vv0;void main(){gl_FragColor=texture2D(u187,vv0);}",
            i: ["u41", "u187", "u42", "u11", "u10"],
            precision: "lowp",
          });
          F.na("s128", {
            name: "_",
            g: "uniform sampler2D u2,u188,u189;varying vec2 vv0;const vec3 f=vec3(1.,1.,1.);void main(){float a=texture2D(u2,vv0).r;vec3 b=texture2D(u189,vv0).rgb,c=texture2D(u188,vv0).rgb;gl_FragColor=vec4(mix(b,c,a*f),1.);}",
            i: ["u2", "u189", "u188"],
            precision: "lowp",
          });
          b = !0;
        },
        m: function (w) {
          b &&
            ((h = aa.instance({
              isFloat: !1,
              isPot: !0,
              url: w.Le,
              C: function () {
                d = !0;
              },
            })),
            F.j("s127", [
              { type: "1i", name: "u41", value: 1 },
              { type: "1i", name: "u187", value: 0 },
              { type: "2f", name: "u42", value: w.bk },
              { type: "2f", name: "u11", value: a },
              { type: "1f", name: "u10", value: 3.8 },
            ]),
            F.j("s128", [
              { type: "1i", name: "u188", value: 0 },
              { type: "1i", name: "u2", value: 1 },
              { type: "1i", name: "u189", value: 2 },
            ]));
        },
        ec: function (w) {
          l = w;
        },
        tg: function (w, H) {
          var y = {
            isFloat: !1,
            isPot: !1,
            isMipmap: !1,
            isLinear: !1,
            width: w,
            height: H,
            K: 4,
          };
          m = 2 / w;
          r = 2 / H;
          p = aa.instance(y);
          u = aa.instance(y);
          f = Ca.instance({ width: w, height: H });
        },
        V: function (w, H) {
          if (d) {
            f.bind(!1, !0);
            F.set("s89");
            for (var y = 0; 2 > y; ++y) {
              F.O("u14", m, 0);
              p.o();
              0 !== y && u.h(0);
              var x = 0 === y && !V.ga_;
              W.l(x, x);
              F.O("u14", 0, r);
              u.o();
              p.h(0);
              W.l(!1, !1);
            }
            F.set("s127");
            l.h(1);
            h.h(0);
            p.o();
            c.clearColor(1, 0, 0, 1);
            c.clear(c.COLOR_BUFFER_BIT);
            W.l(!1, !1);
            F.set("s128");
            H.o();
            u.h(0);
            p.h(1);
            w.h(2);
            W.l(!1, !1);
          }
        },
        I: function () {},
      };
    })();
    var Nc = (function () {
      var a = {
        instance: function (b) {
          var d = b.Yf,
            f = b.Tf,
            l = b.pd,
            p = b.background ? b.background : aa.di(),
            u = b.Pa,
            h = { scale: 1, offsetX: 0, offsetY: 0 },
            m = null;
          b.Sf && ((h.scale = b.Sf.scale), (h.offsetY = b.Sf.offsetY));
          return {
            Yh: function () {
              return u;
            },
            Qh: function () {
              return p;
            },
            set: function () {
              m = eb.$l();
              eb.wj(h);
              eb.te();
              eb.ue();
              ya.oj(l, p, !1, !1);
            },
            M: function () {
              eb.wj(m);
            },
            cc: function () {
              return {
                modelURL: d,
                materialsURLs: f,
                background: p.cc(!1),
                pd: l.cc(!1),
                Pa: u.cc(!0),
              };
            },
            cm: function () {
              return l.cc(!1);
            },
            op: function (r) {
              p.h(r);
            },
            I: function () {
              l.remove();
              u.remove();
              b.background && p.remove();
            },
          };
        },
        Zc: function (b, d, f) {
          function l() {
            if (3 === ++m && d) {
              var r = a.instance({
                Yf: b.modelURL,
                Tf: b.materialsURLs,
                background: p,
                pd: u,
                Pa: h,
              });
              d(r);
            }
          }
          var p = null,
            u = null,
            h = null,
            m = 0;
          aa.Zc(b.background, function (r) {
            !r && f ? f() : ((p = r), l());
          });
          aa.Zc(b.dataState, function (r) {
            !r && f ? f() : ((u = r), l());
          });
          aa.Zc(b.light, function (r) {
            !r && f ? f() : ((h = r), l());
          });
        },
      };
      return a;
    })();
    return Sa || window.JEELIZVTO;
  })();
  (function (da, la) {
    "function" === typeof define && define.amd
      ? define(la)
      : "object" === typeof exports
      ? (module.exports = la())
      : (da.ResizeSensor = la());
  })("undefined" !== typeof window ? window : this, function () {
    function da(Ka, $a) {
      var Ya = Object.prototype.toString.call(Ka),
        zb = 0,
        La = Ka.length;
      if (
        "[object Array]" === Ya ||
        "[object NodeList]" === Ya ||
        "[object HTMLCollection]" === Ya ||
        "[object Object]" === Ya ||
        ("undefined" !== typeof jQuery && Ka instanceof jQuery) ||
        ("undefined" !== typeof Elements && Ka instanceof Elements)
      )
        for (; zb < La; zb++) $a(Ka[zb]);
      else $a(Ka);
    }
    if ("undefined" === typeof window) return null;
    var la =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (Ka) {
          return window.setTimeout(Ka, 20);
        },
      Oa = function (Ka, $a) {
        function Ya() {
          var La = [];
          this.add = function (Lb) {
            La.push(Lb);
          };
          var kb, sb;
          this.call = function () {
            kb = 0;
            for (sb = La.length; kb < sb; kb++) La[kb].call();
          };
          this.remove = function (Lb) {
            var Cb = [];
            kb = 0;
            for (sb = La.length; kb < sb; kb++)
              La[kb] !== Lb && Cb.push(La[kb]);
            La = Cb;
          };
          this.length = function () {
            return La.length;
          };
        }
        function zb(La, kb) {
          if (La)
            if (La.resizedAttached) La.resizedAttached.add(kb);
            else {
              La.resizedAttached = new Ya();
              La.resizedAttached.add(kb);
              La.resizeSensor = document.createElement("div");
              La.resizeSensor.className = "resize-sensor";
              La.resizeSensor.style.cssText =
                "position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;";
              La.resizeSensor.innerHTML =
                '<div class="resize-sensor-expand" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;"><div style="position: absolute; left: 0; top: 0; transition: 0s;"></div></div><div class="resize-sensor-shrink" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;"><div style="position: absolute; left: 0; top: 0; transition: 0s; width: 200%; height: 200%"></div></div>';
              La.appendChild(La.resizeSensor);
              La.resizeSensor.offsetParent !== La &&
                (La.style.position = "relative");
              var sb = La.resizeSensor.childNodes[0],
                Lb = sb.childNodes[0],
                Cb = La.resizeSensor.childNodes[1],
                Ob,
                bc,
                Gb,
                cc,
                nc = La.offsetWidth,
                dc = La.offsetHeight,
                ec = function () {
                  Lb.style.width = "100000px";
                  Lb.style.height = "100000px";
                  sb.scrollLeft = 1e5;
                  sb.scrollTop = 1e5;
                  Cb.scrollLeft = 1e5;
                  Cb.scrollTop = 1e5;
                };
              ec();
              var oc = function () {
                bc = 0;
                Ob &&
                  ((nc = Gb),
                  (dc = cc),
                  La.resizedAttached && La.resizedAttached.call());
              };
              kb = function () {
                Gb = La.offsetWidth;
                cc = La.offsetHeight;
                (Ob = Gb != nc || cc != dc) && !bc && (bc = la(oc));
                ec();
              };
              var pc = function (Vb, qc, fc) {
                Vb.attachEvent
                  ? Vb.attachEvent("on" + qc, fc)
                  : Vb.addEventListener(qc, fc);
              };
              pc(sb, "scroll", kb);
              pc(Cb, "scroll", kb);
            }
        }
        da(Ka, function (La) {
          zb(La, $a);
        });
        this.detach = function (La) {
          Oa.detach(Ka, La);
        };
      };
    Oa.detach = function (Ka, $a) {
      da(Ka, function (Ya) {
        if (Ya) {
          if (
            Ya.resizedAttached &&
            "function" == typeof $a &&
            (Ya.resizedAttached.remove($a), Ya.resizedAttached.length())
          )
            return;
          Ya.resizeSensor &&
            (Ya.contains(Ya.resizeSensor) && Ya.removeChild(Ya.resizeSensor),
            delete Ya.resizeSensor,
            delete Ya.resizedAttached);
        }
      });
    };
    return Oa;
  });
  var mc = {
      glassesDBURL: "https://glassesdbcached.jeeliz.com/sku/",
      appstaticURL: "https://appstatic.jeeliz.com/",
    },
    ob = { notLoaded: -1, init: 0, realtime: 2, loadingModel: 3, paused: 4 },
    Qa = {
      isRT: !0,
      sku: void 0,
      materialsReplacements: "",
      mode: ob.notLoaded,
    },
    jb = { displayWidth: -1, displayHeight: -1, cvWidth: -1, cvHeight: -1 },
    ad = {
      cv: null,
      container: null,
      adjust: null,
      adjustNotice: null,
      adjustExit: null,
      loading: null,
      trackIframe: null,
    },
    Aa = Object.assign({}, ad),
    Bd = {
      ADJUST_START: null,
      ADJUST_END: null,
      LOADING_START: null,
      LOADING_END: null,
    },
    Kc = null,
    Ub = { enabled: !1, callback: null, interval: 1e3 },
    xc = { error: !1 },
    kc = null,
    ac = null,
    yc = "undef",
    yb = {
      start: function (da) {
        var la = Object.assign(
          {
            settings: null,
            NNCPath: null,
            assetsPath: mc.appstaticURL + "jeefit/",
            catalog: null,
            faceDetectionCallback: null,
            faceDetectionInterval: 1e3,
            placeHolder: null,
            canvas: null,
            onError: null,
            callbackReady: null,
            onWebcamGet: null,
            callbacks: {},
            searchImageMask: null,
            searchImageColor: null,
            searchImageRotationSpeed: null,
            isShadow: !0,
            isRequestCamera: !0,
            sku: null,
          },
          da
        );
        console.log("INFO in JeelizVTOWidget.js: start()");
        if (Qa.mode !== ob.notLoaded) yb.resume();
        else {
          oa();
          if (la.settings) for (var Oa in la.settings) mc[Oa] = la.settings[Oa];
          la.NNCPath && Sa.set_NNCPath(la.NNCPath);
          la.faceDetectionCallback &&
            ((Ub.enabled = !0),
            (Ub.callback = la.faceDetectionCallback),
            (Ub.interval = la.faceDetectionInterval));
          Kc = Object.assign({}, Bd, la.callbacks);
          Aa.container =
            la.placeHolder || document.getElementById("JeelizVTOWidget");
          if (!Aa.container)
            throw Error(
              "Cannot find a <div> element with id=JeelizVTOWidget to append the VTO widget."
            );
          Aa.cv = la.canvas || document.getElementById("JeelizVTOWidgetCanvas");
          Aa.cv ||
            ((Aa.cv = document.createElement("canvas")),
            Aa.container.appendChild(Aa.cv));
          Aa.cv.style.position = "absolute";
          Aa.loading = document.getElementById("JeelizVTOWidgetLoading");
          xc.error = la.onError;
          ac = la.callbackReady;
          Fb();
          da = pb(Aa.container);
          if (!da.width) return Promise.reject("PLACEHOLDER_NULL_WIDTH");
          if (!da.height) return Promise.reject("PLACEHOLDER_NULL_HEIGHT");
          nb(!0);
          new ResizeSensor(Aa.container, function (Ka) {
            nb(!1);
          });
          (la.searchImageMask ||
            la.searchImageColor ||
            la.searchImageRotationSpeed) &&
            Sa.set_loading(
              la.searchImageMask,
              la.searchImageColor,
              la.searchImageRotationSpeed
            );
          Qa.mode = ob.init;
          yc = la.assetsPath;
          kc = la.catalog;
          if (la.onWebcamGet) Sa.onWebcamGet(la.onWebcamGet);
          return new Promise(function (Ka, $a) {
            var Ya = {
              basePath: yc,
              cv: Aa.cv,
              isRequestCamera: la.isRequestCamera,
              callbackReady: ka,
            };
            nb(!0);
            Sa.init2(Ya).catch(function (zb) {
              Qa.isRT = !1;
              db(zb || "NO_ERROR_LABEL");
              $a();
            });
            Sa.onHalfLoad(function () {
              !1 === la.isShadow && Sa.switch_shadow(!1);
              yb.load(la.sku, Ka, la.materialsReplacements);
            });
          });
        }
      },
      destroy: function () {
        return Sa.destroy().then(function () {
          Qa.mode = ob.notLoaded;
          Qa.sku = void 0;
          Qa.materialsReplacements = "";
          ac = kc = null;
          Object.assign(Aa, ad);
        });
      },
      pause: function (da) {
        if (!Qa.isRT) return Promise.reject();
        Qa.mode = ob.paused;
        var la = Sa.switch_sleep(!0, da);
        return da ? la : Promise.resolve(la);
      },
      resume: function (da) {
        if (!Qa.isRT) return Promise.reject();
        Qa.mode = ob.realtime;
        var la = Sa.switch_sleep(!1, da);
        return da ? la : Promise.resolve(la);
      },
      set_videoRotation: function (da) {
        Qa.isRT && Sa.set_videoRotation(da);
      },
      set_videoSizes: function (da, la, Oa, Ka, $a, Ya) {
        Qa.isRT && Sa.set_videoSizes(da, la, Oa, Ka, $a, Ya);
      },
      resize: function () {
        nb(!0);
      },
      set_scale: function (da) {
        Sa.set_scale(da);
      },
      capture_image: function (da, la, Oa) {
        Sa && Sa.ready ? Sa.capture_image(da, la, Oa, !1) : la(!1);
      },
      toggle_loading: function (da) {
        da
          ? (qa(Aa.loading), lc("LOADING_START"))
          : (Na(Aa.loading), lc("LOADING_END"));
      },
      load_modelStandalone: function (da, la) {
        if (!Qa.isRT)
          throw Error("Loading standalone models is only available in RT mode");
        Qa.mode === ob.paused && yb.resume();
        Qa.mode = ob.loadingModel;
        if ("string" === typeof da) {
          var Oa = da;
          Ja(da, Oa).then(la).catch(Ra);
        } else {
          var Ka = (Oa = "RANDOM_SKU_" + Date.now().toString());
          Sa.set_modelStandalone(da, Nb.bind(null, Ka, la), Ka);
        }
        Qa.sku = Oa;
        Qa.materialsReplacements = "";
      },
      load: function (da, la, Oa) {
        yb.toggle_loading(!0);
        Qa.isRT && yb.load_RT(da, la, Oa);
      },
      load_RT: function (da, la, Oa) {
        var Ka = Oa ? JSON.stringify(Oa) : "";
        da === Qa.sku && Ka === Qa.materialsReplacements
          ? yb.toggle_loading(!1)
          : ((Qa.sku = da),
            (Qa.materialsReplacements = Ka),
            (Qa.mode = ob.loadingModel),
            Qa.mode === ob.paused && yb.resume(),
            da
              ? kc && kc[da]
                ? Sb(da, kc[da], la, Oa)
                : ta(mc.glassesDBURL + da)
                    .then(function ($a) {
                      if ($a.error) return Ra();
                      Sb(da, $a.intrinsic, la, Oa);
                    })
                    .catch(Ra)
              : ((Qa.mode = ob.realtime),
                yb.toggle_loading(!1),
                Sa.start_rendering(),
                la && la()));
      },
      enter_adjustMode: Tb,
      exit_adjustMode: ub,
      set_LUT: function (da) {
        return Sa && Sa.ready
          ? Sa.set_LUT(da || null)
          : Promise.reject("NOT_READY");
      },
    };
  return yb;
})();
window.JEELIZVTO = JEELIZVTO;
window.JEELIZVTOWIDGET = {
  VERSION: JEELIZVTO.VERSION,
  request_cameraVideoStream: JEELIZVTO.request_cameraVideoStream,
  start: JeelizVTOWidget.start,
  pause: JeelizVTOWidget.pause,
  resume: JeelizVTOWidget.resume,
  load: JeelizVTOWidget.load,
  load_modelStandalone: JeelizVTOWidget.load_modelStandalone,
  capture_image: JeelizVTOWidget.capture_image,
  set_videoRotation: JeelizVTOWidget.set_videoRotation,
  resize: JeelizVTOWidget.resize,
  set_scale: JeelizVTOWidget.set_scale,
  set_videoSizes: JeelizVTOWidget.set_videoSizes,
  destroy: JeelizVTOWidget.destroy,
  enter_adjustMode: JeelizVTOWidget.enter_adjustMode,
  exit_adjustMode: JeelizVTOWidget.exit_adjustMode,
  set_LUT: JeelizVTOWidget.set_LUT,
};
