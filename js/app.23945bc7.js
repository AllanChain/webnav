(function(e){function t(t){for(var o,n,s=t[0],c=t[1],l=t[2],u=0,d=[];u<s.length;u++)n=s[u],Object.prototype.hasOwnProperty.call(i,n)&&i[n]&&d.push(i[n][0]),i[n]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);m&&m(t);while(d.length)d.shift()();return a.push.apply(a,l||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],o=!0,n=1;n<r.length;n++){var s=r[n];0!==i[s]&&(o=!1)}o&&(a.splice(t--,1),e=c(c.s=r[0]))}return e}var o={},n={app:0},i={app:0},a=[];function s(e){return c.p+"js/"+({"config~edit~import~qrcode":"config~edit~import~qrcode","config~import":"config~import",config:"config",import:"import",edit:"edit",qrcode:"qrcode",reorder:"reorder"}[e]||e)+"."+{"config~edit~import~qrcode":"6c6f73b3","config~import":"6e6cc4e7",config:"4da72fbd",import:"8fa040c4",edit:"b962c64f",qrcode:"4ffac819",reorder:"f81a3af9"}[e]+".js"}function c(t){if(o[t])return o[t].exports;var r=o[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.e=function(e){var t=[],r={"config~edit~import~qrcode":1,"config~import":1,config:1,qrcode:1,reorder:1};n[e]?t.push(n[e]):0!==n[e]&&r[e]&&t.push(n[e]=new Promise((function(t,r){for(var o="css/"+({"config~edit~import~qrcode":"config~edit~import~qrcode","config~import":"config~import",config:"config",import:"import",edit:"edit",qrcode:"qrcode",reorder:"reorder"}[e]||e)+"."+{"config~edit~import~qrcode":"d30ccb8b","config~import":"09af3917",config:"17d4b7a5",import:"31d6cfe0",edit:"31d6cfe0",qrcode:"5bfe1575",reorder:"f4cd3df8"}[e]+".css",i=c.p+o,a=document.getElementsByTagName("link"),s=0;s<a.length;s++){var l=a[s],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===o||u===i))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){l=d[s],u=l.getAttribute("data-href");if(u===o||u===i)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var o=t&&t.target&&t.target.src||i,a=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=o,delete n[e],m.parentNode.removeChild(m),r(a)},m.href=i;var f=document.getElementsByTagName("head")[0];f.appendChild(m)})).then((function(){n[e]=0})));var o=i[e];if(0!==o)if(o)t.push(o[2]);else{var a=new Promise((function(t,r){o=i[e]=[t,r]}));t.push(o[2]=a);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=s(e);var d=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(m);var r=i[e];if(0!==r){if(r){var o=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+o+": "+n+")",d.name="ChunkLoadError",d.type=o,d.request=n,r[1](d)}i[e]=void 0}};var m=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},c.m=e,c.c=o,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)c.d(r,o,function(t){return e[t]}.bind(null,o));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/webnav/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var m=u;a.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";var o=r("8a23"),n=r.n(o);n.a},"03fd":function(e,t,r){"use strict";var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("img",e._b({on:{error:function(t){e.image.src="img/fallback.png"}}},"img",e.image,!1))},n=[],i=(r("2ca0"),r("5530")),a=r("0b16"),s=r.n(a),c={props:{bookmark:{type:Object,required:!0},size:{type:String,default:"2rem"}},data:function(){var e=this.$store.state.config.cors,t=e+s.a.resolve(this.bookmark.url,this.bookmark.icon||"/favicon.ico");t.startsWith("https://")||(t="img/fallback.png");var r={src:t,style:{width:this.size,height:this.size}};return e&&(r=Object(i["a"])({},r,{crossorigin:"anonymous"})),{image:r}}},l=c,u=r("2877"),d=Object(u["a"])(l,o,n,!1,null,null,null);t["a"]=d.exports},"11a9":function(e,t,r){"use strict";var o=r("773b"),n=r.n(o);n.a},3518:function(e,t,r){"use strict";var o=r("6c87"),n=r.n(o);n.a},"3fab":function(e){e.exports=JSON.parse('{"$id":"/config","type":"object","required":["bgImg","blackText","cors","barColor"],"additionalProperties":false,"properties":{"bgImg":{"type":"object","required":["url","filter"],"additionalProperties":false,"properties":{"url":{"type":"string"},"filter":{"type":"object","required":["blur","blurColor","contrast","grayscale"],"additionalProperties":false,"properties":{"blur":{"type":"integer","minimum":0,"maximum":10},"blurColor":{"type":"string","pattern":"^#([\\\\da-fA-F]{3}){1,2}$"},"contrast":{"type":"integer","minimum":0,"maximum":200},"grayscale":{"type":"integer","minimum":0,"maximum":100}}}}},"blackText":{"type":"boolean"},"cors":{"description":"CORS proxy","type":"string"},"barColor":{"type":"string","pattern":"^#([\\\\da-fA-F]{3}){1,2}$"}}}')},4360:function(e,t,r){"use strict";r("d81d"),r("2af1"),r("d3b7"),r("3ca3"),r("ddb0"),r("96cf");var o=r("1da1"),n=r("2b0e"),i=r("2f62"),a=r("3f4f"),s=r("ea45");n["a"].use(i["a"]);var c,l=function(e){return e.sort((function(e,t){return e.index-t.index}))};t["a"]=new i["a"].Store({state:{bookmarks:[],mode:"normal",modeData:void 0,swStatus:"",messages:[],config:{}},mutations:{switchMode:function(e,t){e.mode=t.mode||t,e.modeData=t.data},reorder:function(e,t){var r=t.from,o=t.to,n=Math.sign(r-o);e.bookmarks[r].index=o;for(var i=o;i!==r;i+=n)e.bookmarks[i].index+=n;e.bookmarks=l(e.bookmarks)},swUpdate:function(e,t){e.swStatus=t},updateConfig:function(e,t){e.config=t,localStorage.setItem("config",JSON.stringify(t))},alert:function(e,t){"string"===typeof t?e.messages.push({text:t,type:"warning"}):e.messages.push(t)}},actions:{init:function(e){return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.dispatch("initConfig"),t.next=3,Object(a["a"])("BookmarkDB",1,{upgrade:function(e){e.createObjectStore("bookmarks",{autoIncrement:!0,keyPath:"id"})}});case 3:c=t.sent,e.dispatch("refresh");case 5:case"end":return t.stop()}}),t)})))()},initConfig:function(e){var t=JSON.parse(localStorage.getItem("config"));if(null===t)t=r("468b"),localStorage.setItem("config",JSON.stringify(t)),e.commit("alert",{text:"Welcome to WebNav!",type:"success"});else if(!Object(s["a"])("/config",t,!0)){var o=r("468b");t=r("3c4e")(o,t),Object(s["a"])("/config",t,!0)?(localStorage.setItem("config",JSON.stringify(t)),e.commit("alert",{text:"Auto update config success",type:"success"})):(e.commit("alert",{text:"Auto update config failed. Falling back to default.\n            You can still download your previous config.\n            To discard your config changes, just apply default config.",type:"error",delay:12e3}),t=o)}e.state.config=t},add:function(e,t){return Object(o["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,c.add("bookmarks",t);case 2:e.dispatch("refresh");case 3:case"end":return r.stop()}}),r)})))()},addAll:function(e,t){return Object(o["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Promise.all(t.map((function(e){return c.add("bookmarks",e)})));case 2:e.dispatch("refresh");case 3:case"end":return r.stop()}}),r)})))()},put:function(e,t){return Object(o["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,c.put("bookmarks",t);case 2:e.dispatch("refresh");case 3:case"end":return r.stop()}}),r)})))()},putAll:function(e){return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Promise.all(e.state.bookmarks.map((function(e){return c.put("bookmarks",e)})));case 2:case"end":return t.stop()}}),t)})))()},delete:function(e,t){return Object(o["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,c.delete("bookmarks",t);case 2:e.dispatch("refresh");case 3:case"end":return r.stop()}}),r)})))()},clear:function(e){return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.clear("bookmarks");case 2:e.state.bookmarks=[];case 3:case"end":return t.stop()}}),t)})))()},refresh:function(e){return Object(o["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.getAll("bookmarks");case 2:r=t.sent,e.state.bookmarks=l(r);case 4:case"end":return t.stop()}}),t)})))()}},modules:{}})},"468b":function(e){e.exports=JSON.parse('{"bgImg":{"url":"back.jpg","filter":{"blur":0,"blurColor":"#4480fd","contrast":100,"grayscale":0}},"blackText":false,"cors":"","barColor":"#3949AB"}')},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var o=r("2b0e"),n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("v-app-bar",{attrs:{app:"",color:e.$store.state.config.barColor,dark:""}},[r("v-app-bar-nav-icon",{on:{click:function(t){e.drawer=!e.drawer}}}),r("v-text-field",{ref:"text",attrs:{value:e.query,"prepend-inner-icon":"mdi-magnify","hide-details":"",outlined:"","single-line":"",dense:"",clearable:""},on:{input:function(t){e.query=t||""},focus:function(t){e.textFocus=!0},blur:function(t){e.textFocus=!1}}}),r("v-spacer"),r("v-expand-x-transition",[r("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.showBtn,expression:"showBtn"}],attrs:{icon:""},on:{click:function(t){return e.$store.commit("switchMode","qrcode-dialog")}}},[r("v-icon",[e._v("mdi-qrcode-scan")])],1)],1),r("v-expand-x-transition",[r("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.showBtn,expression:"showBtn"}],attrs:{icon:"",color:"edit"===e.$store.state.mode?"green":void 0},on:{click:function(t){return e.$store.commit("switchMode","edit"===e.$store.state.mode?"normal":"edit")}}},[r("v-icon",[e._v("mdi-pencil")])],1)],1)],1),r("v-content",{style:{backgroundColor:e.$store.state.config.bgImg.filter.blurColor}},[r("div",{staticClass:"bg-image",style:{backgroundImage:"url("+e.$store.state.config.bgImg.url+")",backgroundSize:"cover",backgroundPosition:"center",filter:"blur("+e.$store.state.config.bgImg.filter.blur+"px)\n          contrast("+e.$store.state.config.bgImg.filter.contrast+"%)\n          grayscale("+e.$store.state.config.bgImg.filter.grayscale+"%)"}}),r("div",{staticClass:"mt-3 mx-2 alert-box"},e._l(e.$store.state.messages,(function(e,t){return r("DisAlert",{key:t,attrs:{message:e}})})),1),r("WebNav",{attrs:{query:e.query}}),"import-dialog"===e.$store.state.mode?r("ImportDialog",{on:{input:function(t){return e.$store.commit("switchMode","normal")}}}):e._e(),"edit-dialog"===e.$store.state.mode?r("EditDialog",{on:{input:function(t){return e.$store.commit("switchMode","normal")}}}):e._e(),"reorder-dialog"===e.$store.state.mode?r("ReorderDialog",{on:{input:function(t){return e.$store.commit("switchMode","normal")}}}):e._e(),"config-dialog"===e.$store.state.mode?r("ConfigDialog",{on:{input:function(t){return e.$store.commit("switchMode","normal")}}}):e._e(),"qrcode-dialog"===e.$store.state.mode?r("QRCodeDialog",{on:{input:function(t){return e.$store.commit("switchMode","normal")}}}):e._e()],1),r("v-navigation-drawer",{attrs:{app:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[r("v-list",{attrs:{dense:""}},[r("v-list-item",[r("v-list-item-content",[r("v-list-item-title",{staticClass:"title"},[e._v(" WebNav ")]),r("logo",{staticClass:"text-center",nativeOn:{click:function(t){return e.install.prompt()}}})],1)],1),r("v-divider"),r("v-list-item",{attrs:{link:""},on:{click:function(t){return e.$store.commit("switchMode","import-dialog")}}},[r("v-list-item-action",[r("v-icon",[e._v("mdi-application-import")])],1),r("v-list-item-content",[r("v-list-item-title",[e._v("Import")])],1)],1),r("v-list-item",{attrs:{link:""},on:{click:e.downloadJSON}},[r("v-list-item-action",[r("v-icon",[e._v("mdi-file-download-outline")])],1),r("v-list-item-content",[r("v-list-item-title",[e._v("Export and Download")]),r("a",{ref:"downloadLink",staticClass:"d-none"})],1)],1),r("v-list-item",{attrs:{link:""},on:{click:e.newBookmark}},[r("v-list-item-action",[r("v-icon",[e._v("mdi-bookmark-plus-outline")])],1),r("v-list-item-content",[r("v-list-item-title",[e._v("Add Bookmark")])],1)],1),r("v-list-item",{attrs:{link:""},on:{click:function(t){return e.$store.commit("switchMode","config-dialog")}}},[r("v-list-item-action",[r("v-icon",[e._v("mdi-cog")])],1),r("v-list-item-content",[r("v-list-item-title",[e._v("More Config")])],1)],1),r("v-list-item",{attrs:{link:""},on:{click:e.confirmClear}},[r("v-list-item-action",[r("v-icon",[e._v("mdi-alert")])],1),r("v-list-item-content",[r("v-list-item-title",[e._v("CLEAR ALL Bookmark")])],1)],1),r("v-list-item",{attrs:{link:"",href:"https://github.com/AllanChain/webnav"}},[r("v-list-item-action",[r("v-icon",[e._v("mdi-github")])],1),r("v-list-item-content",[r("v-list-item-title",[e._v("Fork me on GitHub")])],1)],1),r("v-divider"),r("v-list-item",[r("v-list-item-content",[r("span",[r("v-icon",{attrs:{small:""}},[e._v(" mdi-cogs ")]),e._v(" v"+e._s(e.version)+" - "+e._s(e.$store.state.swStatus)+" ")],1)])],1)],1)],1)],1)},i=[],a=(r("4160"),r("fb6a"),r("d3b7"),r("ac1f"),r("5319"),r("159b"),r("bf19"),r("96cf"),r("1da1")),s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"text-center pt-5"},[r("div",{staticStyle:{"max-width":"700px",margin:"auto"}},e._l(e.$store.state.bookmarks,(function(t){return r("div",{key:t.id,staticClass:"box"},[r("div",[r("v-overlay",{attrs:{absolute:"",opacity:"0.1","z-index":"2",value:"edit"===e.$store.state.mode}},[r("v-btn",{attrs:{color:"#2196f390",fab:"","x-small":""},on:{click:function(r){return e.$store.commit("switchMode",{mode:"edit-dialog",data:t})}}},[r("v-icon",{attrs:{color:"white"}},[e._v(" mdi-pencil ")])],1)],1),r("v-overlay",{attrs:{absolute:"",opacity:"0.1","z-index":"2",value:"normal"===e.$store.state.mode&&e.query&&!!t.search}},[r("v-btn",{attrs:{color:"#2196f390",fab:"","x-small":""},on:{click:function(r){return e.goSearch(t)}}},[r("v-icon",{attrs:{color:"white"}},[e._v(" mdi-magnify ")])],1)],1),r("WebsiteIcon",{attrs:{bookmark:t},nativeOn:{click:function(r){return e.goURL(t.url)}}})],1),r("div",{staticClass:"url",style:{color:e.$store.state.config.blackText?"#000":"#eee",textShadow:"1px 1px 3px\n          "+(e.$store.state.config.blackText?"#eee":"#000")}},[e._v(" "+e._s(t.title)+" ")])])})),0)])},c=[],l=(r("841c"),r("0b16")),u=r.n(l),d=r("03fd"),m={components:{WebsiteIcon:d["a"]},props:{query:{type:String,required:!0}},methods:{goSearch:function(e){this.goURL(u.a.resolve(e.url,e.search.replace("{}",this.query)))},goURL:function(e){window.location.href=e}}},f=m,p=(r("3518"),r("2877")),g=r("6544"),v=r.n(g),b=r("8336"),h=r("132d"),k=r("a797"),w=Object(p["a"])(f,s,c,!1,null,null,null),y=w.exports;v()(w,{VBtn:b["a"],VIcon:h["a"],VOverlay:k["a"]});var x=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},_=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"logo py-4"},[e._v(" 4 "),r("img",{attrs:{src:"img/icons/android-chrome-192x192.png",width:"50"}}),e._v(" 4 ")])}],O={},$=O,j=(r("11a9"),Object(p["a"])($,x,_,!1,null,null,null)),C=j.exports,S=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-alert",{style:e.style,attrs:{dense:"",dismissible:"",border:"left",type:e.message.type},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[e._v(" "+e._s(e.message.text)+" ")])},q=[],A={props:{message:{type:Object,required:!0}},data:function(){return{show:!0,style:this.message.break?{wordBreak:"break-all"}:{hypens:"auto"}}},created:function(){setTimeout(this.close.bind(this),this.message.delay||6e3)},methods:{close:function(){this.show=!1}}},N=A,R=r("0798"),E=Object(p["a"])(N,S,q,!1,null,null,null),I=E.exports;v()(E,{VAlert:R["a"]});var L={name:"App",components:{ImportDialog:function(){return Promise.all([r.e("config~edit~import~qrcode"),r.e("config~import"),r.e("import")]).then(r.bind(null,"e526"))},EditDialog:function(){return Promise.all([r.e("config~edit~import~qrcode"),r.e("edit")]).then(r.bind(null,"9052"))},ReorderDialog:function(){return r.e("reorder").then(r.bind(null,"d875"))},ConfigDialog:function(){return Promise.all([r.e("config~edit~import~qrcode"),r.e("config~import"),r.e("config")]).then(r.bind(null,"f7e1"))},QRCodeDialog:function(){return Promise.all([r.e("config~edit~import~qrcode"),r.e("qrcode")]).then(r.bind(null,"31fe"))},WebNav:y,Logo:C,DisAlert:I},data:function(){return{install:null,importDialog:!1,query:"",drawer:!1,version:"0.15.0",textFocus:!1}},computed:{showBtn:function(){return window.innerWidth>=550||!this.textFocus&&!this.query}},created:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return window.addEventListener("beforeinstallprompt",e.installPrompt),t.next=3,e.$store.dispatch("init");case 3:case"end":return t.stop()}}),t)})))()},destroyed:function(){window.removeEventListener("beforeinstallprompt",this.installPrompt)},methods:{installPrompt:function(e){this.install=e},newBookmark:function(){this.$store.commit({type:"switchMode",mode:"edit-dialog",data:{title:"",url:"",index:this.$store.state.bookmarks.length}})},downloadJSON:function(){var e=JSON.parse(JSON.stringify(this.$store.state.bookmarks));e.forEach((function(e){delete e.id,delete e.index}));var t=(new Date).toJSON().slice(0,-8).replace(/-|:/g,"");this.$refs.downloadLink.download="bookmarks-".concat(t,".json"),this.$refs.downloadLink.href="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e,null,4)),this.$refs.downloadLink.click()},confirmClear:function(){"CLEAR"===prompt("Type CLEAR to continue. Hope you have a backup.")&&this.$store.dispatch("clear")}}},P=L,B=(r("034f"),r("7496")),D=r("40dc"),V=r("5bc1"),M=r("a75b"),T=r("ce7e"),J=r("0789"),F=r("8860"),U=r("da13"),W=r("1800"),z=r("5d23"),H=r("f774"),G=r("2fa4"),Q=r("8654"),K=Object(p["a"])(P,n,i,!1,null,null,null),X=K.exports;v()(K,{VApp:B["a"],VAppBar:D["a"],VAppBarNavIcon:V["a"],VBtn:b["a"],VContent:M["a"],VDivider:T["a"],VExpandXTransition:J["b"],VIcon:h["a"],VList:F["a"],VListItem:U["a"],VListItemAction:W["a"],VListItemContent:z["a"],VListItemTitle:z["b"],VNavigationDrawer:H["a"],VSpacer:G["a"],VTextField:Q["a"]});var Y=r("9483"),Z=r("4360");Object(Y["a"])("".concat("/webnav/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){Z["a"].commit("swUpdate","registered"),console.log("Service worker has been registered.")},cached:function(){Z["a"].commit("swUpdate","cached"),console.log("Content has been cached for offline use.")},updatefound:function(){Z["a"].commit("swUpdate","updateFound"),console.log("New content is downloading.")},updated:function(){Z["a"].commit("swUpdate","updated"),console.log("New content is available; please refresh.")},offline:function(){Z["a"].commit("swUpdate","offline"),console.log("No internet connection found. App is running in offline mode.")},error:function(e){Z["a"].commit("swUpdate","error"),console.error("Error during service worker registration:",e)}});var ee=r("f309");o["a"].use(ee["a"]);var te=new ee["a"]({icons:{iconfont:"mdi"}});o["a"].config.productionTip=!1,new o["a"]({vuetify:te,store:Z["a"],render:function(e){return e(X)}}).$mount("#app")},"6c87":function(e,t,r){},"773b":function(e,t,r){},7971:function(e,t,r){"use strict";r.r(t),t["default"]=[r("bd48"),r("ce37"),r("3fab")]},"8a23":function(e,t,r){},bd48:function(e){e.exports=JSON.parse('{"$id":"/bookmark","type":"object","required":["title","url"],"properties":{"title":{"type":"string","minLength":1},"url":{"type":"string","pattern":"^http(s)*:\\\\/\\\\/.+$"},"search":{"type":"string"},"icon":{"type":"string"}},"errorMessage":{"properties":{"title":"Bookmark title is required","url":"Bookmark URL must begin with \\"http(s)://\\""}}}')},ce37:function(e){e.exports=JSON.parse('{"$id":"/bookmarks","type":"array","items":{"$ref":"/bookmark"}}')},ea45:function(e,t,r){"use strict";r("99af"),r("d81d");var o=r("53ca"),n=r("783b"),i=r.n(n),a=r("dc2d"),s=r.n(a),c=r("4360"),l=new i.a({schemas:r("7971"),allErrors:!0,jsonPointers:!0,verbose:!0});r("de71")(l,{singleError:!0}),t["a"]=function(e,t,r){var n=l.getSchema(e);return!!n(t)||(r||n.errors.map((function(e){var r=s.a.get(t,e.dataPath);"object"===Object(o["a"])(r)&&(r=JSON.stringify(r)),r='"'.concat(e.dataPath,'" ').concat(e.message,'. Got "').concat(r,'"'),c["a"].commit("alert",{text:r,type:"warning",break:!0})})),!1)}}});
//# sourceMappingURL=app.23945bc7.js.map