(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{180:function(e,n,t){"use strict";t.r(n),t.d(n,"query",function(){return u});var a=t(0),r=t.n(a),l=t(202),c=t(207),u="2000648408";n.default=function(e){var n=e.data,t=n.lastmonth.edges.filter(function(e){return 0===n.thismonth.edges.filter(function(n){return n.node.appcoid===e.node.appcoid}).length}).map(function(e,n){return r.a.createElement("li",{key:n},r.a.createElement(l.a,{data:e.node,hideRewards:!0,hideDetailsLink:!0}))});return r.a.createElement(c.a,null,r.a.createElement("h1",null,"Retired Blockstack Apps (April 2019)"),r.a.createElement("ul",null,r.a.createElement("li",null,"Total number: ",t.length)),r.a.createElement("ul",null,t))}},202:function(e,n,t){"use strict";t.d(n,"b",function(){return l});t(35);var a=t(0),r=t.n(a),l=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}),c=new Intl.DateTimeFormat("en-US",{year:"numeric",month:"long"});n.a=function(e){var n=e.data,t=e.hideRewards,a=e.hideDetailsLink,u=l.format(n.lifetimeEarnings),i="";if(n.openSourceUrl){var m=Date.parse(n.fields.lastCommit);i=isNaN(m)?n.fields.lastCommit:c.format(m)}return r.a.createElement(r.a.Fragment,null,!a&&r.a.createElement("a",{href:"/appco/"+n.appcoid},n.name),a&&r.a.createElement(r.a.Fragment,null,n.name),n.openSourceUrl&&r.a.createElement(r.a.Fragment,null," ","(",r.a.createElement("a",{href:n.openSourceUrl},n.openSourceUrl),")"),!t&&r.a.createElement(r.a.Fragment,null,r.a.createElement("br",null),"rewards: ",u," "),n.openSourceUrl&&r.a.createElement(r.a.Fragment,null,r.a.createElement("br",null),"last update: ",i),r.a.createElement("br",null),n.website&&n.website.length>0&&r.a.createElement("a",{href:n.website},"Launch app"))}}}]);
//# sourceMappingURL=component---src-pages-2019-04-appco-out-js-be40f70897d081e33ad2.js.map