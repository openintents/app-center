(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{187:function(e,a,n){"use strict";n.r(a),n.d(a,"query",function(){return c});var t=n(0),l=n.n(t),r=n(202),u=n(208),c="505966276";a.default=function(e){var a=e.data;return l.a.createElement(u.a,null,l.a.createElement("h1",null,"All Closed Source Blockstack Apps"),l.a.createElement("ul",null,l.a.createElement("li",null,"Total number: ",a.allApps.totalCount),l.a.createElement("li",null,"Total rewards: ",r.b.format(a.allApps.edges.reduce(function(e,a){return e+a.node.lifetimeEarnings},0)))),l.a.createElement("ul",null,a.allApps.edges.map(function(e,a){return l.a.createElement("li",{key:a},l.a.createElement(r.a,{data:e.node}))})))}},202:function(e,a,n){"use strict";n.d(a,"b",function(){return r});n(35);var t=n(0),l=n.n(t),r=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}),u=new Intl.DateTimeFormat("en-US",{year:"numeric",month:"long"});a.a=function(e){var a=e.data,n=e.hideRewards,t=e.hideDetailsLink,c=r.format(a.lifetimeEarnings),m="";if(a.openSourceUrl){var o=Date.parse(a.fields.lastCommit);m=isNaN(o)?a.fields.lastCommit:u.format(o)}return l.a.createElement(l.a.Fragment,null,!t&&l.a.createElement("a",{href:"/appco/"+a.appcoid},a.name),t&&l.a.createElement(l.a.Fragment,null,a.name),a.openSourceUrl&&l.a.createElement(l.a.Fragment,null," ","(",l.a.createElement("a",{href:a.openSourceUrl},a.openSourceUrl),")"),!n&&l.a.createElement(l.a.Fragment,null,l.a.createElement("br",null),"rewards: ",c," "),a.openSourceUrl&&l.a.createElement(l.a.Fragment,null,l.a.createElement("br",null),"last update: ",m),l.a.createElement("br",null),a.website&&a.website.length>0&&l.a.createElement("a",{href:a.website},"Launch app"))}}}]);
//# sourceMappingURL=component---src-pages-appco-noss-js-52d5ed7c8de7064de034.js.map