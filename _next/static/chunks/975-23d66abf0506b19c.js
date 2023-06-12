(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[975],{1632:function(){},6681:function(){},7141:function(n,e,t){"use strict";t.d(e,{e:function(){return T}});var o,i=t(4126),r=t(4173),a=t(5812),u=t(1393),l=t(5022),c=t(4214),s=t(4302),d=t(2857),h=t(8334),v=t(8194),f=t(1899),m=t(8033),p=t(4585),x=t(5381);function g(){return(g=(0,m._)(function(n,e,t){var o;return(0,p.Jh)(this,function(i){switch(i.label){case 0:return[4,(0,x.FP)({langs:[t],theme:e})];case 1:return o=i.sent().codeToThemedTokens(n,t,e,{includeExplanation:!1}),[2,(0,x.I6)(o,{bg:"transparent"})]}})})).apply(this,arguments)}var k=t(9473),j={ts:"TypeScript",js:"JavaScript",bash:"Bash"},b=(o=(0,m._)(function(n){var e,t,o,r;return(0,p.Jh)(this,function(a){switch(a.label){case 0:return e=n.filepath,[4,function(n,e,t){return g.apply(this,arguments)}(t=n.code,n.theme,o=n.language)];case 1:return r=a.sent(),[2,(0,i.jsx)(k.ShikiCodeBlockClient,{filepath:e,languageText:j[o],html:r,code:t})]}})}),function(n){return o.apply(this,arguments)}),w=t(1069);function _(n){var e=n.children,t=n.shiki,o=n.theme,r=n.filepath;return(0,i.jsx)(v.D,{components:{code:function(n){var e,a=n.node,u=n.className,l=(n.inline,n.children),c=(0,h._)(n,["node","className","inline","children"]),v=/language-(\w+)/.exec(u||""),m=null==a?void 0:null===(e=a.data)||void 0===e?void 0:e.meta,p=(0,w.h)(l);return v?t?(0,i.jsx)(b,{filepath:r,theme:o,language:v[1],code:p}):(0,i.jsx)(f.CodeBlock,{filepath:r,language:v[1],wrapLines:!!m,children:l}):(0,i.jsx)("code",(0,d._)((0,s._)({className:u},c),{children:l}))}},children:e})}function N(n){var e=n.content,t=n.hookName,o=(0,c.useMemo)(function(){return e.map(function(n){return n.text}).join("")},[e]);return(0,i.jsx)(_,{filepath:"app/hooks/".concat(t,"/page.tsx"),children:o})}var T={Summary:function(n){var e,t,o,r,a=n.hook,u=null!==(r=(null==a?void 0:a.signatures)&&(null==a?void 0:null===(e=a.signatures)||void 0===e?void 0:null===(t=e[0])||void 0===t?void 0:null===(o=t.comment)||void 0===o?void 0:o.summary))&&void 0!==r?r:[];return(0,i.jsx)(N,{content:u})},Remarks:function(n){var e=n.hook,t=(0,c.useMemo)(function(){var n,t,o,i=null==e?void 0:null===(n=e.signatures)||void 0===n?void 0:null===(t=n[0])||void 0===t?void 0:null===(o=t.comment)||void 0===o?void 0:o.blockTags;if(i)return i.find(function(n){return"@remarks"===n.tag})},[e]);return t?(0,i.jsx)(N,{content:t.content}):(0,i.jsx)(i.Fragment,{})},Example:function(n){var e=n.hook,t=(0,c.useMemo)(function(){var n,t,o,i=null==e?void 0:null===(n=e.signatures)||void 0===n?void 0:null===(t=n[0])||void 0===t?void 0:null===(o=t.comment)||void 0===o?void 0:o.blockTags;return i?i.filter(function(n){return"@example"===n.tag}):[]},[e]);return(0,i.jsx)(i.Fragment,{children:t.map(function(n,t){return(0,i.jsx)(N,{hookName:e.name,content:n.content},t)})})},Deprecation:function(n){var e=n.hook,t=(0,c.useMemo)(function(){var n=function(n){var e,t,o,i=null==n?void 0:null===(e=n.signatures)||void 0===e?void 0:null===(t=e[0])||void 0===t?void 0:null===(o=t.comment)||void 0===o?void 0:o.blockTags;if(i)return i.find(function(n){return"@deprecated"===n.tag})}(e);if(n)return n.content.map(function(n){return"inline-tag"===n.kind?"[".concat(n.text,"](/hooks/").concat(n.text,")"):n.text}).join("")},[e]);return t?(0,i.jsxs)(r.b,{mt:"10px",maxW:"30rem",mx:"auto",status:"warning",variant:"subtle",flexDir:"column",background:"#fab387",rounded:"10px",boxShadow:"xl",color:"#1e1e2e",padding:"10px",children:[(0,i.jsx)(a.z,{color:"#f97316",height:30,width:30}),(0,i.jsx)(u.C,{mt:4,mb:1,fontWeight:"bold",fontSize:"lg",children:"Deprecation Notice"}),(0,i.jsx)(l.X,{children:(0,i.jsx)(_,{children:t})})]}):(0,i.jsx)(i.Fragment,{})}}}}]);