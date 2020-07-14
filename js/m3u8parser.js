var M3U8FileParser=function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(e,t,r){"use strict";var n=r(1),a=/\"/g,s=r(3),i={YES:!0,NO:!1};function o(e){return e in i?i[e]:e}e.exports=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r="",i="",u=arguments[2]||{},c=0;c<e.length;c++)switch(e[c].charCodeAt(0)){case n.SPACE:r="";continue;case n.EQUAL:i=r,r="";continue;case n.COMMA:(i=s(i))&&(u[i]=t?o(r):r),i="",r="";continue;case n.QUOTE:a.lastIndex=c+1;var E=a.exec(e),p=e.slice(c+1,E.index);i&&(u[s(i)]=p),c=E.index+1;continue;default:r+=e[c]}return r&&i&&(u[s(i)]=r),u}},function(e,t,r){"use strict";e.exports={SPACE:" ".charCodeAt(0),COLON:":".charCodeAt(0),COMMA:",".charCodeAt(0),EQUAL:"=".charCodeAt(0),QUOTE:'"'.charCodeAt(0),MINUS:"-".charCodeAt(0),PERIOD:".".charCodeAt(0),NEW_LINE_LF:"\n".charCodeAt(0),NEW_LINE_CR:"\r".charCodeAt(0),BACK_SLASH:"\\".charCodeAt(0),HASH:"#".charCodeAt(0),AT:"@".charCodeAt(0),NUMBER_START:"0".charCodeAt(0),NUMBER_STOP:"9".charCodeAt(0)}},function(e,t,r){"use strict";e.exports={BASIC:"BASIC",MEDIA_SEGMENT:"MEDIA_SEGMENT",MEDIA_PLAYLIST:"MEDIA_PLAYLIST",MASTER_PLAYLIST:"MASTER_PLAYLIST",TRALING_MEDIA_SEGMENT:"TRAILING_MEDIA_SEGMENT",URL_SEGMENT_ENDING:"URL_SEGMENT_ENDING",GROUPING:"GROUPING"}},function(e,t,r){"use strict";var n=r(1);e.exports=function(e){var t="";e=e.toLowerCase();for(var r=0;r<e.length;r++)e[r].charCodeAt(0)!==n.MINUS?t+=e[r]:t+=(e[++r]||"").toUpperCase();return t}},function(e,t,r){"use strict";e.exports=function(e){var t={length:0,offset:0};t.length=parseInt(e);var r=e.lastIndexOf("@");return~r&&(t.offset=parseInt(e.slice(r+1))),t}},function(e,t,r){"use strict";e.exports=function(e){var t=new Date(e.trim());return isNaN(t.getTime()),t}},function(e,t,r){"use strict";var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();var a=r(2),s=(r(1),r(7)),i=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.default={isExtendedM3U:!1,segments:[]},this.trailingData={},this.currentSegmentData={},this.result=Object.assign({},this.default)}return n(e,[{key:"read",value:function(e){var t=e.length;e=e.trim();for(var r="",n=!1,a=!1,s=0,i=0,o=0,u="",c=0;c<t;c++)s=(s=(i=e.indexOf("\n",c))>-1&&i||e.indexOf("\r",c))>-1&&s||t,u=e.slice(c,s).trim(),c=s,a="#"===u[0],o=(n="#EXT"===u.slice(0,4))&&u.indexOf(":")||-1,!(r=n&&~o&&u.slice(0,o))&&a&&(r=u),this.invokeParser(r,u.slice(o+1),a)}},{key:"invokeParser",value:function(e,t,r){if(e&&t){var n=s.get(e);return n?this.dataScope(n,n.parser(t,this.result)):void 0}if((!t||!r)&&t){var a=s.get("URL");this.dataScope(a,a.parser(t,this.result))}}},{key:"dataScope",value:function(e,t){switch(e.scope){case a.MASTER_PLAYLIST:this.currentSegmentData.isMasterPlaylist=!0;case a.MEDIA_SEGMENT:this.currentSegmentData[e.key]=t;break;case a.URL_SEGMENT_ENDING:this.currentSegmentData[e.key]=t,this.result.segments.push(this.currentSegmentData),this.currentSegmentData=Object.assign({},this.trailingData);break;case a.TRALING_MEDIA_SEGMENT:this.trailingData[e.key]=t,this.currentSegmentData=Object.assign(this.currentSegmentData,this.trailingData);break;case a.MEDIA_PLAYLIST:case a.BASIC:this.result[e.key]=t;break;case a.GROUPING:this.result[e.group.root]||(this.result[e.group.root]={});for(var r="",n=this.result[e.group.root],s=e.group.path.length,i=0;i<s-1;i++)n[t[r=e.group.path[i]]]||(n[t[r]]={}),n=n[t[r]];n[t[e.group.path[s-1]]]=t}}},{key:"getResult",value:function(){return this.result}},{key:"reset",value:function(){this.result=Object.assign({},this.default)}}]),e}();e.exports=i},function(e,t,r){"use strict";var n=r(8),a=r(9),s=r(4),i=r(10),o=r(11),u=r(12),c=r(13),E=r(14),p=r(15),f=r(16),d=r(17),A=r(18),l=r(19),I=r(20),T=r(21),S=r(22),M=r(23),h=r(2),N={"#EXTM3U":{key:"isExtendedM3U",parser:function(){return!0},scope:h.BASIC},"#EXT-X-VERSION":{key:"version",parser:a,scope:h.BASIC},"#EXTINF":{key:"inf",parser:n,scope:h.MEDIA_SEGMENT},"#EXT-X-BYTERANGE":{key:"byteRange",parser:s,scope:h.MEDIA_SEGMENT},"#EXT-X-DISCONTINUITY":{key:"discontinuity",parser:i,scope:h.MEDIA_SEGMENT},"#EXT-X-KEY":{key:"key",parser:o,scope:h.TRALING_MEDIA_SEGMENT},"#EXT-X-MAP":{key:"map",parser:u,scope:h.TRALING_MEDIA_SEGMENT},"#EXT-X-PROGRAM-DATE-TIME":{key:"programDateTime",parser:c,scope:h.MEDIA_SEGMENT},"#EXT-X-DATERANGE":{key:"dateRange",parser:E,scope:h.MEDIA_SEGMENT},"#EXT-X-TARGETDURATION":{key:"targetDuration",parser:p,scope:h.MEDIA_PLAYLIST},"#EXT-X-MEDIA-SEQUENCE":{key:"mediaSequence",parser:f,scope:h.MEDIA_PLAYLIST},"#EXT-X-DISCONTINUITY-SEQUENCE":{key:"discontinuitySequence",parser:d,scope:h.MEDIA_PLAYLIST},"#EXT-X-ENDLIST":{key:"endList",parser:A,scope:h.MEDIA_PLAYLIST},"#EXT-X-PLAYLIST-TYPE":{key:"playlistType",parser:l,scope:h.MEDIA_PLAYLIST},"#EXT-X-I-FRAMES-ONLY":{key:"iFramesOnly",parser:function(){return!0},scope:h.MEDIA_PLAYLIST},"#EXT-X-MEDIA":{key:"media",parser:I,scope:h.GROUPING,group:{root:"media",path:["type","groupId","name"]}},"#EXT-X-STREAM-INF":{key:"streamInf",parser:T,scope:h.MASTER_PLAYLIST},"#EXT-X-I-FRAME-STREAM-INF":{key:"iFrameStreamInf",parser:T,scope:h.MASTER_PLAYLIST},"#EXT-X-SESSION-DATA":{key:"sessionData",parser:S,scope:h.GROUPING,group:{root:"sessionData",path:["dataId","language"]}},"#EXT-X-SESSION-KEY":{key:"sessionKey",parser:o,scope:h.MASTER_PLAYLIST},"#EXT-X-INDEPENDENT-SEGMENTS":{key:"independentSegments",parser:function(){return!0},scope:h.MEDIA_PLAYLIST},"#EXT-X-START":{key:"start",parser:M,scope:h.MEDIA_PLAYLIST},URL:{key:"url",parser:function(e){return e},scope:h.URL_SEGMENT_ENDING}};e.exports={get:function(e){return N[e]||null},set:function(e,t){N[e]=t},add:function(e,t){N[e]=t}}},function(e,t,r){"use strict";var n=/\"/g,a=/\W/g,s=r(1),i=r(3);e.exports=function(e){var t="",r="",o={duration:"",title:""};n.lastIndex=0,a.lastIndex=0;for(var u=0,c=e[u].charCodeAt(0);c>=s.NUMBER_START&&c<=s.NUMBER_STOP||c===s.MINUS||c===s.PERIOD;)o.duration+=e[u],c=++u>e.length-1?"":e[u].charCodeAt(0);o.duration=o.duration&&parseFloat(o.duration)||-1;for(var E=u;E<e.length;E++){switch(e[E].charCodeAt(0)){case s.SPACE:r="";continue;case s.QUOTE:n.lastIndex=E+1;var p=n.exec(e);r=e.slice(E+1,p.index),E=p&&p.index||E,t&&(o[i(t)]=r),r="",t="";continue;case s.EQUAL:if(t=r,r="",e[E+1].charCodeAt(0)===s.QUOTE)continue;a.lastIndex=E+1;var f=a.exec(e);r=e.slice(E+1,f.index),E=e[f.index].charCodeAt(0)===s.COMMA&&f.index-1||f&&f.index||E,t&&(o[i(t)]=r),r="",t="";continue;case s.COMMA:o.title=e.slice(E+1,e.length).trimLeft(),E=e.length;continue;default:r+=e[E]}}return o}},function(e,t,r){"use strict";e.exports=function(e){return parseInt(e.trim())||0}},function(e,t,r){"use strict";e.exports=function(){return!0}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e){return n(e)}},function(e,t,r){"use strict";var n=r(4),a=r(0);e.exports=function(e){var t=a(e);return t.byterange&&(t.byterange=n(t.byterange)),t}},function(e,t,r){"use strict";var n=r(5);e.exports=function(e){return n(e)}},function(e,t,r){"use strict";var n=r(0),a=r(5);e.exports=function(e){var t=n(e);return t.startDate&&(t.startDate=a(t.startDate)),t.endDate&&(t.endDate=a(t.endDate)),t.duration&&(t.duration=parseFloat(t.duration)),t.plannedDuration&&(t.plannedDuration=parseFloat(t.plannedDuration)),t}},function(e,t,r){"use strict";e.exports=function(e){return parseInt(e)||-1}},function(e,t,r){"use strict";e.exports=function(e){return parseInt(e)||0}},function(e,t,r){"use strict";e.exports=function(e){return parseInt(e)||0}},function(e,t,r){"use strict";e.exports=function(e,t){return t.segments.length+1}},function(e,t,r){"use strict";e.exports=function(e){return e.trim()}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e){var t={groupId:"default"};return n(e,!0,t),t}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e){var t=n(e);return"bandwidth"in t&&(t.bandwidth=parseInt(t.bandwidth)),"averageBandwidth"in t&&(t.averageBandwidth=parseInt(t.averageBandwidth)),"resolution"in t&&(t.resolution=parseInt(t.resolution)),"frameRate"in t&&(t.frameRate=parseFloat(t.frameRate)),"codecs"in t&&(t.codecs=t.codecs.split(";")),t}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e){return n(e)}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e){var t=n(e,!0);return"timeOffset"in t&&(t.timeOffset=parseFloat(t.timeOffset)),t}}]);