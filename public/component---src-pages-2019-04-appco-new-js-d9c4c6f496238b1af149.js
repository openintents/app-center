(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{150:function(e,t,a){"use strict";a.r(t),a.d(t,"query",function(){return c});a(34);var n=a(0),r=a.n(n),l=a(173),i=a(171),c="930150860";t.default=function(e){var t=e.data;return r.a.createElement(i.a,null,r.a.createElement("h1",null,"New Blockstack Apps (April 2019)"),r.a.createElement("ul",null,r.a.createElement("li",null,"Total number: ",t.thismonth.totalCount)),r.a.createElement("ul",null,t.thismonth.edges.map(function(e,a){var n=t.allApps.edges.filter(function(t){return t.node.appcoid===e.node.appcoid});console.log(n);var i=Object.assign({lifetimeEarnings:0,website:n.length>0?n[0].node.website:null},e.node);return console.log(i.website),r.a.createElement("li",{key:a},r.a.createElement(l.a,{data:i,hideRewards:!0}))})))}},164:function(e,t,a){"use strict";a.d(t,"b",function(){return s});var n=a(0),r=a.n(n),l=a(4),i=a.n(l),c=a(33),o=a.n(c);a.d(t,"a",function(){return o.a}),a.d(t,"c",function(){return c.navigate});a(165);var u=r.a.createContext({}),s=function(e){return r.a.createElement(u.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};s.propTypes={data:i.a.object,query:i.a.string.isRequired,render:i.a.func,children:i.a.func}},165:function(e,t,a){var n;e.exports=(n=a(170))&&n.default||n},169:function(e){e.exports={data:{site:{siteMetadata:{title:"OI App Center"}}}}},170:function(e,t,a){"use strict";a.r(t);a(34);var n=a(0),r=a.n(n),l=a(4),i=a.n(l),c=a(55),o=a(2),u=function(e){var t=e.location,a=o.default.getResourcesForPathnameSync(t.pathname);return a?r.a.createElement(c.a,Object.assign({location:t,pageResources:a},a.json)):null};u.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},t.default=u},171:function(e,t,a){"use strict";var n=a(169),r=a(0),l=a.n(r),i=a(4),c=a.n(i),o=a(164),u=function(e){var t=e.siteTitle;return l.a.createElement("div",{style:{background:"#5DBCD2",marginBottom:"1.45rem"}},l.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"1.45rem 1.0875rem"}},l.a.createElement("h1",{style:{margin:0}},l.a.createElement(o.a,{to:"/",style:{color:"white",textDecoration:"none"}},t))))};u.propTypes={siteTitle:c.a.string},u.defaultProps={siteTitle:""};var s=u,m=(a(177),function(e){var t=e.children;return l.a.createElement(o.b,{query:"755544856",render:function(e){return l.a.createElement(l.a.Fragment,null,l.a.createElement(s,{siteTitle:e.site.siteMetadata.title}),l.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"0px 1.0875rem 1.45rem",paddingTop:0}},t,l.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built with"," ",l.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby")," and"," ",l.a.createElement("a",{href:"https://blockstack.org"},"Blockstack"),"."," ","You can"," ",l.a.createElement("a",{href:"https://gitlab.com/friedger/app-center"},"view the source here"))))},data:n})});m.propTypes={children:c.a.node.isRequired};t.a=m},172:function(e,t,a){var n=a(25).f,r=Function.prototype,l=/^\s*function ([^ (]*)/;"name"in r||a(18)&&n(r,"name",{configurable:!0,get:function(){try{return(""+this).match(l)[1]}catch(e){return""}}})},173:function(e,t,a){"use strict";a.d(t,"b",function(){return l});a(172);var n=a(0),r=a.n(n),l=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}),i=new Intl.DateTimeFormat("en-US",{year:"numeric",month:"long"});t.a=function(e){var t=e.data,a=e.hideRewards,n=e.hideDetailsLink,c=l.format(t.lifetimeEarnings),o="";if(t.openSourceUrl){var u=Date.parse(t.fields.lastCommit);o=isNaN(u)?t.fields.lastCommit:i.format(u)}return r.a.createElement(r.a.Fragment,null,!n&&r.a.createElement("a",{href:"/appco/"+t.appcoid},t.name),n&&r.a.createElement(r.a.Fragment,null,t.name),t.openSourceUrl&&r.a.createElement(r.a.Fragment,null," ","(",r.a.createElement("a",{href:t.openSourceUrl},t.openSourceUrl),")"),!a&&r.a.createElement(r.a.Fragment,null,r.a.createElement("br",null),"rewards: ",c," "),t.openSourceUrl&&r.a.createElement(r.a.Fragment,null,r.a.createElement("br",null),"last update: ",o),r.a.createElement("br",null),t.website&&t.website.length>0&&r.a.createElement("a",{href:t.website},"Launch app"))}}}]);
//# sourceMappingURL=component---src-pages-2019-04-appco-new-js-d9c4c6f496238b1af149.js.map