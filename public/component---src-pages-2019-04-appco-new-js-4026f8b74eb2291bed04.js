(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{179:function(e,n,a){"use strict";a.r(n),a.d(n,"query",function(){return o});a(17);var t=a(0),r=a.n(t),l=a(202),c=a(207),o="930150860";n.default=function(e){var n=e.data;return r.a.createElement(c.a,null,r.a.createElement("h1",null,"New Blockstack Apps (April 2019)"),r.a.createElement("ul",null,r.a.createElement("li",null,"Total number: ",n.thismonth.totalCount)),r.a.createElement("ul",null,n.thismonth.edges.map(function(e,a){var t=n.allApps.edges.filter(function(n){return n.node.appcoid===e.node.appcoid});console.log(t);var c=Object.assign({lifetimeEarnings:0,website:t.length>0?t[0].node.website:null},e.node);return console.log(c.website),r.a.createElement("li",{key:a},r.a.createElement(l.a,{data:c,hideRewards:!0}))})))}},202:function(e,n,a){"use strict";a.d(n,"b",function(){return l});a(35);var t=a(0),r=a.n(t),l=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}),c=new Intl.DateTimeFormat("en-US",{year:"numeric",month:"long"});n.a=function(e){var n=e.data,a=e.hideRewards,t=e.hideDetailsLink,o=l.format(n.lifetimeEarnings),u="";if(n.openSourceUrl){var i=Date.parse(n.fields.lastCommit);u=isNaN(i)?n.fields.lastCommit:c.format(i)}return r.a.createElement(r.a.Fragment,null,!t&&r.a.createElement("a",{href:"/appco/"+n.appcoid},n.name),t&&r.a.createElement(r.a.Fragment,null,n.name),n.openSourceUrl&&r.a.createElement(r.a.Fragment,null," ","(",r.a.createElement("a",{href:n.openSourceUrl},n.openSourceUrl),")"),!a&&r.a.createElement(r.a.Fragment,null,r.a.createElement("br",null),"rewards: ",o," "),n.openSourceUrl&&r.a.createElement(r.a.Fragment,null,r.a.createElement("br",null),"last update: ",u),r.a.createElement("br",null),n.website&&n.website.length>0&&r.a.createElement("a",{href:n.website},"Launch app"))}}}]);
//# sourceMappingURL=component---src-pages-2019-04-appco-new-js-4026f8b74eb2291bed04.js.map