(function(t){function e(e){for(var o,i,s=e[0],c=e[1],l=e[2],d=0,m=[];d<s.length;d++)i=s[d],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&m.push(n[i][0]),n[i]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);u&&u(e);while(m.length)m.shift()();return a.push.apply(a,l||[]),r()}function r(){for(var t,e=0;e<a.length;e++){for(var r=a[e],o=!0,s=1;s<r.length;s++){var c=r[s];0!==n[c]&&(o=!1)}o&&(a.splice(e--,1),t=i(i.s=r[0]))}return t}var o={},n={app:0},a=[];function i(e){if(o[e])return o[e].exports;var r=o[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=o,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(r,o,function(e){return t[e]}.bind(null,o));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/webnav/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var u=c;a.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"034f":function(t,e,r){"use strict";var o=r("8a23"),n=r.n(o);n.a},"11a9":function(t,e,r){"use strict";var o=r("773b"),n=r.n(o);n.a},"12c5":function(t,e,r){t.exports=r.p+"img/octocat.7b711a49.svg"},3518:function(t,e,r){"use strict";var o=r("6c87"),n=r.n(o);n.a},"3b07":function(t,e,r){},"3fab":function(t){t.exports=JSON.parse('{"$id":"/config","type":"object","required":["bgImg","blackText","cors","barColor"],"additionalProperties":false,"properties":{"bgImg":{"type":"object","required":["url","filter"],"additionalProperties":false,"properties":{"url":{"type":"string"},"filter":{"type":"object","required":["blur","blurColor","contrast","grayscale"],"additionalProperties":false,"properties":{"blur":{"type":"integer","minimum":0,"maximum":10},"blurColor":{"type":"string","pattern":"^#([\\\\da-fA-F]{3}){1,2}$"},"contrast":{"type":"integer","minimum":0,"maximum":200},"grayscale":{"type":"integer","minimum":0,"maximum":100}}}}},"blackText":{"type":"boolean"},"cors":{"description":"CORS proxy","type":"string"},"barColor":{"type":"string","pattern":"^#([\\\\da-fA-F]{3}){1,2}$"}}}')},"468b":function(t){t.exports=JSON.parse('{"bgImg":{"url":"back.jpg","filter":{"blur":0,"blurColor":"#4480fd","contrast":100,"grayscale":0}},"blackText":false,"cors":"","barColor":"#3949AB"}')},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var o=r("2b0e"),n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",[o("v-app-bar",{attrs:{app:"",color:t.$store.state.config.barColor,dark:""}},[o("v-app-bar-nav-icon",{on:{click:function(e){t.drawer=!t.drawer}}}),o("v-text-field",{ref:"text",attrs:{value:t.query,"prepend-inner-icon":"search","hide-details":"",outlined:"","single-line":"",dense:"",clearable:""},on:{input:function(e){t.query=e||""},focus:function(e){t.textFocus=!0},blur:function(e){t.textFocus=!1}}}),o("v-spacer"),o("v-expand-x-transition",[o("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.showBtn,expression:"showBtn"}],attrs:{icon:""},on:{click:function(e){return t.$store.commit("switchMode","qrcode-dialog")}}},[o("v-icon",[t._v("filter_center_focus")])],1)],1),o("v-expand-x-transition",[o("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.showBtn,expression:"showBtn"}],attrs:{icon:"",color:"edit"===t.$store.state.mode?"green":void 0},on:{click:function(e){return t.$store.commit("switchMode","edit"===t.$store.state.mode?"normal":"edit")}}},[o("v-icon",[t._v("edit")])],1)],1)],1),o("v-content",{style:{backgroundColor:t.$store.state.config.bgImg.filter.blurColor}},[o("div",{staticClass:"bg-image",style:{backgroundImage:"url("+t.$store.state.config.bgImg.url+")",backgroundSize:"cover",backgroundPosition:"center",filter:"blur("+t.$store.state.config.bgImg.filter.blur+"px)\n          contrast("+t.$store.state.config.bgImg.filter.contrast+"%)\n          grayscale("+t.$store.state.config.bgImg.filter.grayscale+"%)"}}),o("div",{staticClass:"mt-3 mx-2 alert-box"},t._l(t.$store.state.messages,(function(t,e){return o("DisAlert",{key:e,attrs:{message:t}})})),1),o("WebNav",{attrs:{query:t.query}}),o("ImportDialog",{attrs:{value:"import-dialog"===t.$store.state.mode},on:{input:function(e){return t.$store.commit("switchMode","normal")}}}),"edit-dialog"===t.$store.state.mode?o("EditDialog",{attrs:{value:"edit-dialog"===t.$store.state.mode},on:{input:function(e){return t.$store.commit("switchMode","normal")}}}):t._e(),"reorder-dialog"===t.$store.state.mode?o("ReorderDialog",{on:{input:function(e){return t.$store.commit("switchMode","normal")}}}):t._e(),"config-dialog"===t.$store.state.mode?o("ConfigDialog",{on:{input:function(e){return t.$store.commit("switchMode","normal")}}}):t._e(),"qrcode-dialog"===t.$store.state.mode?o("QRCodeDialog",{on:{input:function(e){return t.$store.commit("switchMode","normal")}}}):t._e()],1),o("v-navigation-drawer",{attrs:{app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[o("v-list",{attrs:{dense:""}},[o("v-list-item",[o("v-list-item-content",[o("v-list-item-title",{staticClass:"title"},[t._v(" WebNav ")]),o("logo",{staticClass:"text-center",nativeOn:{click:function(e){return t.install.prompt()}}})],1)],1),o("v-divider"),o("v-list-item",{attrs:{link:""},on:{click:function(e){return t.$store.commit("switchMode","import-dialog")}}},[o("v-list-item-action",[o("v-icon",[t._v("add_to_home_screen")])],1),o("v-list-item-content",[o("v-list-item-title",[t._v("Import")])],1)],1),o("v-list-item",{attrs:{link:""},on:{click:t.downloadJSON}},[o("v-list-item-action",[o("v-icon",[t._v("file_download")])],1),o("v-list-item-content",[o("v-list-item-title",[t._v("Export and Download")]),o("a",{ref:"downloadLink",staticClass:"d-none"})],1)],1),o("v-list-item",{attrs:{link:""},on:{click:t.newBookmark}},[o("v-list-item-action",[o("v-icon",[t._v("add")])],1),o("v-list-item-content",[o("v-list-item-title",[t._v("Add Bookmark")])],1)],1),o("v-list-item",{attrs:{link:""},on:{click:function(e){return t.$store.commit("switchMode","config-dialog")}}},[o("v-list-item-action",[o("v-icon",[t._v("settings")])],1),o("v-list-item-content",[o("v-list-item-title",[t._v("More Config")])],1)],1),o("v-list-item",{attrs:{link:""},on:{click:t.confirmClear}},[o("v-list-item-action",[o("v-icon",[t._v("warning")])],1),o("v-list-item-content",[o("v-list-item-title",[t._v("CLEAR ALL Bookmark")])],1)],1),o("v-list-item",{attrs:{link:"",href:"https://github.com/AllanChain/webnav"}},[o("v-list-item-action",[o("img",{staticClass:"grayscale",attrs:{src:r("12c5"),width:"24px",height:"24px"}})]),o("v-list-item-content",[o("v-list-item-title",[t._v("Fork me on GitHub")])],1)],1),o("v-divider"),o("v-list-item",[o("v-list-item-content",[o("span",[o("v-icon",{attrs:{small:""}},[t._v(" settings ")]),t._v(" v"+t._s(t.version)+" - "+t._s(t.$store.state.swStatus)+" ")],1)])],1)],1)],1)],1)},a=[],i=(r("4160"),r("fb6a"),r("ac1f"),r("5319"),r("159b"),r("bf19"),r("96cf"),r("1da1")),s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-dialog",{attrs:{value:t.value,"max-width":"350px"},on:{input:function(e){return t.$emit("input",!1)}}},[r("v-card",{staticClass:"elevation-12"},[r("v-card-text",{staticClass:"pa-1"},[r("v-container",[r("v-row",[r("v-text-field",{attrs:{"prepend-inner-icon":"link",color:"purple",label:"JSON URL",placeholder:"https://cors.net/bookmarks.json",dense:"",outlined:"","hide-details":""},model:{value:t.url,callback:function(e){t.url=e},expression:"url"}})],1),r("v-row",[r("v-col",{staticClass:"text-center",attrs:{cols:"4"}},[r("v-btn",{attrs:{fab:"",small:"",color:"indigo lighten-1"},on:{click:function(e){return t.$refs.file.click()}}},[r("v-icon",[t._v("upload_file")])],1),r("input",{ref:"file",attrs:{type:"file",accept:".json",hidden:""},on:{change:t.importFromFile}})],1),r("v-col",{staticClass:"text-center",attrs:{cols:"4"}},[r("v-btn",{attrs:{fab:"",small:"",color:"amber"},on:{click:function(e){return t.$emit("input",!1)}}},[r("v-icon",[t._v("cancel")])],1)],1),r("v-col",{staticClass:"text-center",attrs:{cols:"4"}},[r("v-btn",{attrs:{fab:"",small:"",color:"green"},on:{click:t.importFromCloud}},[r("v-icon",[t._v("done")])],1)],1)],1)],1)],1)],1)],1)},c=[],l=(r("4de4"),r("c740"),r("d3b7"),r("841c"),r("99af"),r("d81d"),r("53ca")),u=r("783b"),d=r.n(u),m=r("dc2d"),f=r.n(m),p=(r("2af1"),r("3ca3"),r("ddb0"),r("2f62")),g=r("3f4f");o["a"].use(p["a"]);var v,b=function(t){return t.sort((function(t,e){return t.index-e.index}))},h=new p["a"].Store({state:{bookmarks:[],mode:"normal",modeData:void 0,swStatus:"",messages:[],config:{}},mutations:{switchMode:function(t,e){t.mode=e.mode||e,t.modeData=e.data},reorder:function(t,e){var r=e.from,o=e.to,n=Math.sign(r-o);t.bookmarks[r].index=o;for(var a=o;a!==r;a+=n)t.bookmarks[a].index+=n;t.bookmarks=b(t.bookmarks)},swUpdate:function(t,e){t.swStatus=e},updateConfig:function(t,e){t.config=e,localStorage.setItem("config",JSON.stringify(e))},alert:function(t,e){"string"===typeof e?t.messages.push({text:e,type:"warning"}):t.messages.push(e)}},actions:{init:function(t){return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.dispatch("initConfig"),e.next=3,Object(g["a"])("BookmarkDB",1,{upgrade:function(t){t.createObjectStore("bookmarks",{autoIncrement:!0,keyPath:"id"})}});case 3:v=e.sent,t.dispatch("refresh");case 5:case"end":return e.stop()}}),e)})))()},initConfig:function(t){var e=JSON.parse(localStorage.getItem("config"));if(null===e)e=r("468b"),localStorage.setItem("config",JSON.stringify(e)),t.commit("alert",{text:"Welcome to WebNav!",type:"success"});else if(!x("/config",e,!0)){var o=r("468b");e=r("3c4e")(o,e),x("/config",e,!0)?(localStorage.setItem("config",JSON.stringify(e)),t.commit("alert",{text:"Auto update config success",type:"success"})):(t.commit("alert",{text:"Auto update config failed. Falling back to default.\n            You can still download your previous config.\n            To discard your config changes, just apply default config.",type:"error",delay:12e3}),e=o)}t.state.config=e},add:function(t,e){return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,v.add("bookmarks",e);case 2:t.dispatch("refresh");case 3:case"end":return r.stop()}}),r)})))()},addAll:function(t,e){return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Promise.all(e.map((function(t){return v.add("bookmarks",t)})));case 2:t.dispatch("refresh");case 3:case"end":return r.stop()}}),r)})))()},put:function(t,e){return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,v.put("bookmarks",e);case 2:t.dispatch("refresh");case 3:case"end":return r.stop()}}),r)})))()},putAll:function(t){return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(t.state.bookmarks.map((function(t){return v.put("bookmarks",t)})));case 2:case"end":return e.stop()}}),e)})))()},delete:function(t,e){return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,v.delete("bookmarks",e);case 2:t.dispatch("refresh");case 3:case"end":return r.stop()}}),r)})))()},clear:function(t){return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,v.clear("bookmarks");case 2:t.state.bookmarks=[];case 3:case"end":return e.stop()}}),e)})))()},refresh:function(t){return Object(i["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,v.getAll("bookmarks");case 2:r=e.sent,t.state.bookmarks=b(r);case 4:case"end":return e.stop()}}),e)})))()}},modules:{}}),k=new d.a({schemas:r("7971"),allErrors:!0,jsonPointers:!0,verbose:!0});r("de71")(k,{singleError:!0});var x=function(t,e,r){var o=k.getSchema(t);return!!o(e)||(r||o.errors.map((function(t){var r=f.a.get(e,t.dataPath);"object"===Object(l["a"])(r)&&(r=JSON.stringify(r)),r='"'.concat(t.dataPath,'" ').concat(t.message,'. Got "').concat(r,'"'),h.commit("alert",{text:r,type:"warning",break:!0})})),!1)},w=function(t,e){return t.url===e.url&&t.search===e.search},y={props:{value:{type:Boolean,default:!1}},data:function(){return{url:""}},methods:{importFromCloud:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(t.url);case 3:return r=e.sent,e.next=6,r.json();case 6:o=e.sent,t.importBookmarks(o),e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](0),t.$store.commit("alert",{text:e.t0,type:"error"});case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))()},importFromFile:function(t){var e=this,r=t.target.files[0];t.target.value=null;var o=new FileReader;o.onload=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(r){var o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return o=r.target.result,t.next=3,e.importBookmarks(JSON.parse(o));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),o.readAsText(r)},importBookmarks:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(x("/bookmarks",t)){r.next=3;break}return e.$emit("input",!1),r.abrupt("return");case 3:return t=t.filter((function(t,r,o){return o.findIndex((function(e){return w(e,t)}))===r&&-1===e.$store.state.bookmarks.findIndex((function(e){return w(e,t)}))})),t.forEach((function(t,r){return t.index=r+e.$store.state.bookmarks.length})),r.next=7,e.$store.dispatch("addAll",t);case 7:e.$store.commit("alert",{text:"Successfully added ".concat(t.length," bookmark(s)"),type:"success"}),e.$emit("input",!1);case 9:case"end":return r.stop()}}),r)})))()}}},_=y,$=r("2877"),C=r("6544"),O=r.n(C),V=r("8336"),I=r("b0af"),S=r("99d9"),j=r("62ad"),R=r("a523"),T=r("169a"),N=r("132d"),B=r("0fd9"),L=r("8654"),D=Object($["a"])(_,s,c,!1,null,null,null),A=D.exports;O()(D,{VBtn:V["a"],VCard:I["a"],VCardText:S["a"],VCol:j["a"],VContainer:R["a"],VDialog:T["a"],VIcon:N["a"],VRow:B["a"],VTextField:L["a"]});var E=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-dialog",{attrs:{value:!0,"max-width":"500",scrollable:""},on:{input:function(e){return t.$emit("input",!1)}}},[r("v-card",[r("v-card-title",{staticClass:"pa-0"},[r("v-toolbar",{attrs:{color:"indigo",dark:"",dense:""}},[r("v-toolbar-title",[r("WebsiteIcon",{attrs:{bookmark:t.bookmark,size:"1.2rem"}}),t._v(" "+t._s(t.bookmark.title)+" ")],1),r("v-spacer"),r("v-btn",{attrs:{icon:"",large:""},on:{click:t.done}},[r("v-icon",{attrs:{color:"green lighten-2"}},[t._v(" check ")])],1),t.bookmark.id?r("v-btn",{attrs:{icon:"",large:""},on:{click:t.deleteThis}},[r("v-icon",{attrs:{color:"red lighten-2"}},[t._v(" delete ")])],1):t._e(),t.bookmark.id?r("v-btn",{attrs:{icon:"",large:""},on:{click:function(e){return t.$store.commit("switchMode",{mode:"reorder-dialog",data:t.bookmark.index})}}},[r("v-icon",{attrs:{color:"yellow lighten-2"}},[t._v(" swap_horiz ")])],1):t._e()],1)],1),r("v-card-text",{staticClass:"mt-4"},[r("v-text-field",{attrs:{"prepend-inner-icon":"bookmark",label:"Bookmark Name",placeholder:"Example",outlined:"",dense:""},model:{value:t.bookmark.title,callback:function(e){t.$set(t.bookmark,"title",e)},expression:"bookmark.title"}}),r("v-text-field",{attrs:{"prepend-inner-icon":"language",label:"Website URL",placeholder:"https://example.com",outlined:"",dense:""},model:{value:t.bookmark.url,callback:function(e){t.$set(t.bookmark,"url",e)},expression:"bookmark.url"}}),r("v-text-field",{attrs:{"prepend-inner-icon":"search",label:"Search Template",placeholder:"/search?wd={}",outlined:"",dense:""},model:{value:t.bookmark.search,callback:function(e){t.$set(t.bookmark,"search",e)},expression:"bookmark.search"}}),r("v-text-field",{attrs:{"prepend-inner-icon":"adb",label:"Website Icon",placeholder:"/favicon.ico",outlined:"",dense:""},model:{value:t.bookmark.icon,callback:function(e){t.$set(t.bookmark,"icon",e)},expression:"bookmark.icon"}})],1)],1)],1)},F=[],J=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("img",t._b({on:{error:function(e){t.image.src="img/icons/favicon-32x32.png"}}},"img",t.image,!1))},q=[],M=r("5530"),P=r("0b16"),U=r.n(P),W={props:{bookmark:{type:Object,required:!0},size:{type:String,default:"2rem"}},data:function(){var t=this.$store.state.config.cors,e={src:t+U.a.resolve(this.bookmark.url,this.bookmark.icon||"/favicon.ico"),style:{width:this.size,height:this.size}};return t&&(e=Object(M["a"])({},e,{crossorigin:"anonymous"})),{image:e}}},z=W,Q=Object($["a"])(z,J,q,!1,null,null,null),G=Q.exports,H={components:{WebsiteIcon:G},props:{value:{type:Boolean,required:!0}},data:function(){return{bookmark:JSON.parse(JSON.stringify(this.$store.state.modeData))}},methods:{done:function(){x("/bookmark",this.bookmark)&&(this.bookmark.id?this.$store.dispatch("put",this.bookmark):this.$store.dispatch("add",this.bookmark),this.$store.commit("alert",{text:"Success!",type:"success"}),this.$emit("input",!1))},deleteThis:function(){this.$store.dispatch("delete",this.bookmark.id),this.$emit("input",!1)}}},X=H,Y=r("2fa4"),K=r("71d9"),Z=r("2a7f"),tt=Object($["a"])(X,E,F,!1,null,null,null),et=tt.exports;O()(tt,{VBtn:V["a"],VCard:I["a"],VCardText:S["a"],VCardTitle:S["b"],VDialog:T["a"],VIcon:N["a"],VSpacer:Y["a"],VTextField:L["a"],VToolbar:K["a"],VToolbarTitle:Z["a"]});var rt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-overlay",{attrs:{opacity:"0.7"},nativeOn:{click:function(e){return t.closeDialog(e)}}},[r("v-slider",{attrs:{value:t.index,color:"purple","track-color":"indigo","thumb-label":"always",min:0,max:t.$store.state.bookmarks.length-1},on:{input:t.reorder}}),r("div",{staticStyle:{width:"90vw"}})],1)},ot=[],nt={data:function(){return{index:this.$store.state.modeData}},methods:{reorder:function(t){this.$store.commit("reorder",{from:this.index,to:t}),this.index=t},closeDialog:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.$store.commit("switchMode","normal"),e.next=3,t.$store.dispatch("putAll");case 3:t.$store.commit("alert",{text:"Reordered!",type:"success"});case 4:case"end":return e.stop()}}),e)})))()}}},at=nt,it=r("a797"),st=r("ba0d"),ct=Object($["a"])(at,rt,ot,!1,null,null,null),lt=ct.exports;O()(ct,{VOverlay:it["a"],VSlider:st["a"]});var ut=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-dialog",{attrs:{value:"true",scrollable:"",fullscreen:""},on:{input:function(e){return t.$emit("input",!1)}}},[r("a",{ref:"downloadLink",staticClass:"d-none"}),r("input",{ref:"file",attrs:{type:"file",accept:".json",hidden:""},on:{change:t.importFromFile}}),r("v-card",[r("v-card-title",{staticClass:"pa-0"},[r("v-toolbar",{attrs:{color:"indigo",dark:"",dense:""}},[r("v-toolbar-title",[t._v("Config WebNav")]),r("v-spacer"),r("v-btn",{attrs:{icon:"",large:"",color:"blue lighten-2"},on:{click:function(e){return t.$refs.file.click()}}},[r("v-icon",[t._v("upload_file")])],1),r("v-btn",{attrs:{icon:"",large:""},on:{click:t.downloadJSON}},[r("v-icon",{attrs:{color:"amber"}},[t._v(" file_download ")])],1),r("v-btn",{attrs:{icon:"",large:""},on:{click:t.done}},[r("v-icon",{attrs:{color:"green lighten-2"}},[t._v(" check ")])],1),r("v-btn",{attrs:{icon:"",large:""},on:{click:function(e){return t.$emit("input",!1)}}},[r("v-icon",{attrs:{color:"yellow lighten-2"}},[t._v(" cancel ")])],1)],1),r("v-tabs",{attrs:{"background-color":"white"},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[r("v-tab",[t._v(" Background ")]),r("v-tab",[t._v(" other ")])],1)],1),r("v-card-text",{staticClass:"pt-4"},[r("v-tabs-items",{model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[r("v-tab-item",[r("div",{staticClass:"bg-preview-wrapper",style:{backgroundColor:t.config.bgImg.filter.blurColor}},[r("div",{staticClass:"bg-image bg-preview",style:{backgroundImage:"url("+t.config.bgImg.url+")",filter:"blur("+t.config.bgImg.filter.blur+"px)\n          contrast("+t.config.bgImg.filter.contrast+"%)\n          grayscale("+t.config.bgImg.filter.grayscale+"%)"}}),r("div",{staticClass:"pa-3",style:{position:"absolute",color:t.config.blackText?"#000":"#eee",textShadow:"1px 1px 3px\n          "+(t.config.blackText?"#eee":"#000")}},[t._v(" "+t._s("Example Text ".repeat(20))+" ")])]),r("v-divider",{staticClass:"my-2"}),r("v-text-field",{attrs:{value:t.config.bgImg.url,"prepend-inner-icon":"image",label:"Image URL",placeholder:"back.jpg",messages:"Leave it blank to use pure color background",outlined:"",dense:"",clearable:""},on:{input:function(e){t.config.bgImg.url=e||""}}}),""!==t.config.bgImg.url?r("v-container",[r("v-row",{attrs:{"no-gutters":""}},[r("v-col",{attrs:{cols:"3",sm:"2",md:"1"}},[r("v-label",[t._v("Blur")])],1),r("v-col",{attrs:{cols:"9",sm:"10",md:"11"}},[r("v-slider",{attrs:{min:"0",max:"10","thumb-label":"","hide-details":""},model:{value:t.config.bgImg.filter.blur,callback:function(e){t.$set(t.config.bgImg.filter,"blur",e)},expression:"config.bgImg.filter.blur"}})],1)],1),r("v-row",{attrs:{"no-gutters":""}},[r("v-col",{attrs:{cols:"3",sm:"2",md:"1"}},[r("v-label",[t._v("Contrast")])],1),r("v-col",{attrs:{cols:"9",sm:"10",md:"11"}},[r("v-slider",{attrs:{min:"0",max:"200","thumb-label":"","hide-details":""},model:{value:t.config.bgImg.filter.contrast,callback:function(e){t.$set(t.config.bgImg.filter,"contrast",e)},expression:"config.bgImg.filter.contrast"}})],1)],1),r("v-row",{attrs:{"no-gutters":""}},[r("v-col",{attrs:{cols:"3",sm:"2",md:"1"}},[r("v-label",[t._v("Gray")])],1),r("v-col",{attrs:{cols:"9",sm:"10",md:"11"}},[r("v-slider",{attrs:{min:"0",max:"100","thumb-label":"","hide-details":""},model:{value:t.config.bgImg.filter.grayscale,callback:function(e){t.$set(t.config.bgImg.filter,"grayscale",e)},expression:"config.bgImg.filter.grayscale"}})],1)],1)],1):t._e(),r("v-switch",{staticClass:"mt-0",attrs:{label:t.config.blackText?"Black text":"White text"},model:{value:t.config.blackText,callback:function(e){t.$set(t.config,"blackText",e)},expression:"config.blackText"}}),r("div",{directives:[{name:"show",rawName:"v-show",value:t.config.bgImg.filter.blur||!t.config.bgImg.url,expression:"config.bgImg.filter.blur || !config.bgImg.url"}]},[r("h2",{staticClass:"mb-2"},[t.config.bgImg.filter.blur?r("span",[t._v(" Blur padding color ")]):r("span",[t._v(" BG color ")])]),r("v-color-picker",{attrs:{"canvas-height":"100","hide-inputs":"",flat:""},model:{value:t.config.bgImg.filter.blurColor,callback:function(e){t.$set(t.config.bgImg.filter,"blurColor",e)},expression:"config.bgImg.filter.blurColor"}})],1)],1),r("v-tab-item",[r("p",[t._v(" Use CORS proxy to convert blocked "),r("code",[t._v("http")]),t._v(" requests to "),r("code",[t._v("https")]),t._v(". ")]),r("v-text-field",{attrs:{"prepend-inner-icon":"flight_takeoff",label:"CORS Proxy",placeholder:"https://netnr-proxy.cloudno.de/",outlined:"",dense:""},model:{value:t.config.cors,callback:function(e){t.$set(t.config,"cors",e)},expression:"config.cors"}}),r("h2",{staticClass:"mb-2"},[t._v(" Main app bar color ")]),r("v-color-picker",{attrs:{"canvas-height":"100",flat:"",mode:"hexa"},model:{value:t.config.barColor,callback:function(e){t.$set(t.config,"barColor",e)},expression:"config.barColor"}})],1)],1)],1)],1)],1)},dt=[],mt={data:function(){return{tab:0,config:JSON.parse(JSON.stringify(this.$store.state.config))}},methods:{done:function(){x("/config",this.config)&&(this.$store.commit("updateConfig",this.config),this.$emit("input",!1))},importFromFile:function(t){var e=this,r=t.target.files[0],o=new FileReader;o.onload=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(r){var o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:o=JSON.parse(r.target.result),x("/config",o)&&(e.config=o,e.$store.commit("alert",{text:"Success!",type:"success"}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),o.readAsText(r)},downloadJSON:function(){var t=(new Date).toJSON().slice(0,-8).replace(/-|:/g,"");this.$refs.downloadLink.download="config-".concat(t,".json"),this.$refs.downloadLink.href="data:text/json;charset=utf-8,"+encodeURIComponent(localStorage.getItem("config")),this.$refs.downloadLink.click()}}},ft=mt,pt=(r("f91e"),r("03a4")),gt=r("ce7e"),vt=r("24c9"),bt=r("b73d"),ht=r("71a3"),kt=r("c671"),xt=r("fe57"),wt=r("aac8"),yt=Object($["a"])(ft,ut,dt,!1,null,null,null),_t=yt.exports;O()(yt,{VBtn:V["a"],VCard:I["a"],VCardText:S["a"],VCardTitle:S["b"],VCol:j["a"],VColorPicker:pt["a"],VContainer:R["a"],VDialog:T["a"],VDivider:gt["a"],VIcon:N["a"],VLabel:vt["a"],VRow:B["a"],VSlider:st["a"],VSpacer:Y["a"],VSwitch:bt["a"],VTab:ht["a"],VTabItem:kt["a"],VTabs:xt["a"],VTabsItems:wt["a"],VTextField:L["a"],VToolbar:K["a"],VToolbarTitle:Z["a"]});var $t=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-dialog",{attrs:{value:!0,"max-width":"500",scrollable:""},on:{input:function(e){return t.$emit("input",!1)}}},[r("v-card",[r("v-card-title",{staticClass:"pa-0"},[r("v-toolbar",{attrs:{color:"indigo",dark:"",dense:""}},[r("v-toolbar-title",[t._v(" Scan QR Code ")]),r("v-spacer"),r("v-btn",{attrs:{icon:"",large:""},on:{click:t.rescan}},[r("v-icon",{attrs:{color:"teal lighten-2"}},[t._v(" replay ")])],1),r("v-btn",{attrs:{icon:"",large:""},on:{click:function(e){return t.$emit("input",!1)}}},[r("v-icon",{attrs:{color:"yellow lighten-2"}},[t._v(" cancel ")])],1)],1)],1),r("v-card-text",[r("h3",[t._v("Result:")]),r("p",{staticClass:"pt-2",staticStyle:{"word-break":"break-all"}},[t.isLink?r("a",{attrs:{href:t.result}},[t._v(t._s(t.result))]):r("b",[t._v(t._s(t.result))])]),r("v-divider",{staticClass:"my-2"}),r("qrcode-stream",{attrs:{camera:t.camera},on:{decode:t.onDecode,init:t.onInit}})],1)],1)],1)},Ct=[],Ot=(r("2ca0"),r("9a3e")),Vt={components:{QrcodeStream:Ot["QrcodeStream"]},data:function(){return{isLink:!1,camera:"auto",result:null}},methods:{onInit:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,t;case 3:r.next=8;break;case 5:r.prev=5,r.t0=r["catch"](0),e.$store.commit("alert",r.t0.message);case 8:case"end":return r.stop()}}),r,null,[[0,5]])})))()},rescan:function(){this.isLink=!1,this.result=null,this.camera="auto"},onDecode:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:e.result=t,e.camera="off",e.isLink=t.startsWith("http");case 3:case"end":return r.stop()}}),r)})))()}}},It=Vt,St=Object($["a"])(It,$t,Ct,!1,null,null,null),jt=St.exports;O()(St,{VBtn:V["a"],VCard:I["a"],VCardText:S["a"],VCardTitle:S["b"],VDialog:T["a"],VDivider:gt["a"],VIcon:N["a"],VSpacer:Y["a"],VToolbar:K["a"],VToolbarTitle:Z["a"]});var Rt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"text-center pt-5"},[r("div",{staticStyle:{"max-width":"700px",margin:"auto"}},t._l(t.$store.state.bookmarks,(function(e){return r("div",{key:e.id,staticClass:"box"},[r("div",[r("v-overlay",{attrs:{absolute:"",opacity:"0.1","z-index":"2",value:"edit"===t.$store.state.mode}},[r("v-btn",{attrs:{color:"#2196f390",fab:"","x-small":""},on:{click:function(r){return t.$store.commit("switchMode",{mode:"edit-dialog",data:e})}}},[r("v-icon",{attrs:{color:"white"}},[t._v(" edit ")])],1)],1),r("v-overlay",{attrs:{absolute:"",opacity:"0.1","z-index":"2",value:"normal"===t.$store.state.mode&&t.query&&!!e.search}},[r("v-btn",{attrs:{color:"#2196f390",fab:"","x-small":""},on:{click:function(r){return t.goSearch(e)}}},[r("v-icon",{attrs:{color:"white"}},[t._v(" search ")])],1)],1),r("WebsiteIcon",{attrs:{bookmark:e},nativeOn:{click:function(r){return t.goURL(e.url)}}})],1),r("div",{staticClass:"url",style:{color:t.$store.state.config.blackText?"#000":"#eee",textShadow:"1px 1px 3px\n          "+(t.$store.state.config.blackText?"#eee":"#000")}},[t._v(" "+t._s(e.title)+" ")])])})),0)])},Tt=[],Nt={components:{WebsiteIcon:G},props:{query:{type:String,required:!0}},methods:{goSearch:function(t){this.goURL(U.a.resolve(t.url,t.search.replace("{}",this.query)))},goURL:function(t){window.location.href=t}}},Bt=Nt,Lt=(r("3518"),Object($["a"])(Bt,Rt,Tt,!1,null,null,null)),Dt=Lt.exports;O()(Lt,{VBtn:V["a"],VIcon:N["a"],VOverlay:it["a"]});var At=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},Et=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"logo py-4"},[t._v(" 4 "),o("img",{attrs:{src:r("12c5"),width:"50"}}),t._v(" 4 ")])}],Ft={},Jt=Ft,qt=(r("11a9"),Object($["a"])(Jt,At,Et,!1,null,null,null)),Mt=qt.exports,Pt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-alert",{style:t.style,attrs:{dense:"",dismissible:"",border:"left",type:t.message.type},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[t._v(" "+t._s(t.message.text)+" ")])},Ut=[],Wt={props:{message:{type:Object,required:!0}},data:function(){return{show:!0,style:this.message.break?{wordBreak:"break-all"}:{hypens:"auto"}}},created:function(){setTimeout(this.close.bind(this),this.message.delay||6e3)},methods:{close:function(){this.show=!1}}},zt=Wt,Qt=r("0798"),Gt=Object($["a"])(zt,Pt,Ut,!1,null,null,null),Ht=Gt.exports;O()(Gt,{VAlert:Qt["a"]});var Xt={name:"App",components:{ImportDialog:A,EditDialog:et,ReorderDialog:lt,ConfigDialog:_t,QRCodeDialog:jt,WebNav:Dt,Logo:Mt,DisAlert:Ht},data:function(){return{install:null,importDialog:!1,query:"",drawer:!1,version:"0.13.0",textFocus:!1}},computed:{showBtn:function(){return window.innerWidth>=550||!this.textFocus&&!this.query}},created:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return window.addEventListener("beforeinstallprompt",t.installPrompt),e.next=3,t.$store.dispatch("init");case 3:case"end":return e.stop()}}),e)})))()},destroyed:function(){window.removeEventListener("beforeinstallprompt",this.installPrompt)},methods:{installPrompt:function(t){this.install=t},newBookmark:function(){this.$store.commit({type:"switchMode",mode:"edit-dialog",data:{title:"",url:"",index:this.$store.state.bookmarks.length}})},downloadJSON:function(){var t=JSON.parse(JSON.stringify(this.$store.state.bookmarks));t.forEach((function(t){delete t.id,delete t.index}));var e=(new Date).toJSON().slice(0,-8).replace(/-|:/g,"");this.$refs.downloadLink.download="bookmarks-".concat(e,".json"),this.$refs.downloadLink.href="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(t,null,4)),this.$refs.downloadLink.click()},confirmClear:function(){"CLEAR"===prompt("Type CLEAR to continue. Hope you have a backup.")&&this.$store.dispatch("clear")}}},Yt=Xt,Kt=(r("034f"),r("7496")),Zt=r("40dc"),te=r("5bc1"),ee=r("a75b"),re=r("0789"),oe=r("8860"),ne=r("da13"),ae=r("1800"),ie=r("5d23"),se=r("f774"),ce=Object($["a"])(Yt,n,a,!1,null,null,null),le=ce.exports;O()(ce,{VApp:Kt["a"],VAppBar:Zt["a"],VAppBarNavIcon:te["a"],VBtn:V["a"],VContent:ee["a"],VDivider:gt["a"],VExpandXTransition:re["b"],VIcon:N["a"],VList:oe["a"],VListItem:ne["a"],VListItemAction:ae["a"],VListItemContent:ie["a"],VListItemTitle:ie["b"],VNavigationDrawer:se["a"],VSpacer:Y["a"],VTextField:L["a"]});var ue=r("9483");Object(ue["a"])("".concat("/webnav/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){h.commit("swUpdate","registered"),console.log("Service worker has been registered.")},cached:function(){h.commit("swUpdate","cached"),console.log("Content has been cached for offline use.")},updatefound:function(){h.commit("swUpdate","updateFound"),console.log("New content is downloading.")},updated:function(){h.commit("swUpdate","updated"),console.log("New content is available; please refresh.")},offline:function(){h.commit("swUpdate","offline"),console.log("No internet connection found. App is running in offline mode.")},error:function(t){h.commit("swUpdate","error"),console.error("Error during service worker registration:",t)}});var de=r("f309");r("d1e78");o["a"].use(de["a"]);var me=new de["a"]({icons:{iconfont:"md"}});o["a"].config.productionTip=!1,new o["a"]({vuetify:me,store:h,render:function(t){return t(le)}}).$mount("#app")},"6c87":function(t,e,r){},"773b":function(t,e,r){},7971:function(t,e,r){"use strict";r.r(e),e["default"]=[r("bd48"),r("ce37"),r("3fab")]},"8a23":function(t,e,r){},bd48:function(t){t.exports=JSON.parse('{"$id":"/bookmark","type":"object","required":["title","url"],"properties":{"title":{"type":"string","minLength":1},"url":{"type":"string","pattern":"^http(s)*:\\\\/\\\\/.+$"},"search":{"type":"string"},"icon":{"type":"string"}},"errorMessage":{"properties":{"title":"Bookmark title is required","url":"Bookmark URL must begin with \\"http(s)://\\""}}}')},ce37:function(t){t.exports=JSON.parse('{"$id":"/bookmarks","type":"array","items":{"$ref":"/bookmark"}}')},f91e:function(t,e,r){"use strict";var o=r("3b07"),n=r.n(o);n.a}});
//# sourceMappingURL=app.88c5c44b.js.map