(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{58:function(e,t,n){},91:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n(0),r=n.n(c),i=n(17),s=n.n(i),l=n(7),o=n(10),j=Object(o.a)(),d=(n(58),n(23)),u=n(14),b=n(46),h=n(6),p="HELLO_MESSAGE_SUCCESS",x="HELLO_MESSAGE_FAIL",O="SET_ALERT",m="REMOVE_ALERT",f={message:"",errors:null};var g=n(24),v=[];var y=Object(u.c)({init:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case p:return Object(h.a)(Object(h.a)({},e),{},{message:a});case x:return Object(h.a)(Object(h.a)({},e),{},{errors:a});default:return e}},alert:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case O:return[].concat(Object(g.a)(e),[a]);case m:return e.filter((function(e){return e.id!==a}));default:return e}}}),S=[b.a],w=Object(u.e)(y,{},Object(u.d)(u.a.apply(void 0,S))),A=n(50),C=n(100),z=n(99),k=Object(d.b)((function(e){return{alerts:e.alert}}))((function(e){var t=e.alerts;return null!==t&&t.length>0&&t.map((function(e){return Object(a.jsx)(C.a,{style:{position:"absolute",left:0,top:0,width:"100%"},color:e.alertType,children:e.msg},Object(z.a)())}))})),N=function(e){var t=e.children;return Object(a.jsx)("div",{id:"wrapper",children:Object(a.jsx)("div",{className:"container-fluid p-0 min-vh-100",style:{overflowX:"hidden"},children:Object(a.jsxs)("div",{style:{backgroundColor:"#B23CFD"},id:"page-wrapper",children:[Object(a.jsx)(k,{}),t]})})})},T=function(e){var t=e.component,n=Object(A.a)(e,["component"]);return Object(a.jsx)(l.a,Object(h.a)(Object(h.a)({},n),{},{render:function(e){return Object(a.jsx)(N,{children:Object(a.jsx)(t,Object(h.a)({},e))})}}))},E=n(15),R=function(){return Object(a.jsxs)("div",{style:{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[Object(a.jsxs)("h1",{className:"x-large text-primary display-2",children:[Object(a.jsx)("i",{className:"fa fa-exclamation-triangle",style:{color:"black"},"aria-hidden":"true"})," ",Object(a.jsx)("span",{style:{color:"black"},children:"Page Not Found"})]}),Object(a.jsx)(E.a,{to:"/",className:"display-4",style:{color:"white"},children:"Go Home"})]})},B=n(16),D=n(31),L=n.n(D),M=n(47),I=n(20),_=n(92),q=n(93),F=n(94),H=n(95),P=n(96),G=n(97),J=n(98),Y=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5e3;return function(a){var c=Object(z.a)();a({type:O,payload:{msg:e,alertType:t,id:c}}),setTimeout((function(){return a({type:m,payload:c})}),n)}},U=n(48),V=n.n(U),W=n(49),X=(n(90),function(e){var t=Object(c.useState)({name:"",slug:"",email:"",password:"",schema:[]}),n=Object(I.a)(t,2),r=n[0],i=n[1],s=Object(c.useState)(!1),l=Object(I.a)(s,2),o=l[0],j=l[1],d=Object(c.useState)(!1),u=Object(I.a)(d,2),b=u[0],p=u[1],x=Object(c.useState)(!1),O=Object(I.a)(x,2),m=O[0],f=O[1],v=function(){var e=Object(M.a)(L.a.mark((function e(){var t;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r,p(!0),t.schema.map((function(e){return e.name?(e.isAuth&&"isAuth"!==e.isAuth||(e.isAuth=!1),e.attributes.map((function(e){return e.name?(e.type&&"0"!==e.type||(e.type="String"),e.ref&&"0"!==e.ref||(e.ref=null),e.required&&"0"!==e.required||(e.required=!1),e):null})),e):null})),console.log(t),i(t),e.prev=5,e.next=8,V.a.post("/app",t);case 8:e.sent.data&&(p(!1),j(!0),window.scrollTo(0,0),f(!0),w.dispatch(Y("Your backend app has been created successfully. Click on the download button to get it now.","success"))),e.next=17;break;case 12:e.prev=12,e.t0=e.catch(5),p(!1),window.scrollTo(0,0),409===e.t0.response.status?w.dispatch(Y(e.t0.response.data.slug,"danger",4e3)):w.dispatch(Y("An error occurred. Please try again.","danger",4e3));case 17:case"end":return e.stop()}}),e,null,[[5,12]])})));return function(){return e.apply(this,arguments)}}(),y=function(e,t){e.preventDefault();var n=r.schema;n[t][e.target.name]=e.target.value,i(Object(h.a)(Object(h.a)({},r),{},{schema:n}))},S=function(e,t,n){e.preventDefault();var a=r.schema;a[t].attributes[n][e.target.name]=e.target.value,i(Object(h.a)(Object(h.a)({},r),{},{schema:a}))};return Object(a.jsxs)("div",{style:{backgroundColor:"#B23CFD",padding:"20px",minHeight:"100vh"},children:[Object(a.jsx)("div",{className:"display-3",children:Object(a.jsxs)("center",{children:["Create your application...",o?Object(a.jsx)(_.a,{className:"float float-right",style:{backgroundColor:"#fff",fontSize:"20px"},children:Object(a.jsx)(E.a,{to:"zips/".concat(r.slug,".zip"),target:"_blank",style:{color:"black",textDecoration:"none",display:"inline-block"},download:!0,children:"Download App"})}):null]})}),Object(a.jsx)("div",{className:"container-fluid",style:{overflowY:"auto"},children:Object(a.jsx)("div",{className:"row",children:Object(a.jsx)("div",{className:"col-md-12",style:{borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px",padding:"20px"},children:Object(a.jsx)("div",{className:"signup-form",children:Object(a.jsxs)(q.a,{children:[Object(a.jsxs)(F.a,{form:!0,children:[Object(a.jsx)(H.a,{children:Object(a.jsxs)(P.a,{children:[Object(a.jsx)(G.a,{for:"name",style:{fontSize:"20px"},children:"App Name"}),Object(a.jsx)(J.a,{type:"text",name:"name",value:r.name,style:{fontSize:"20px"},onChange:function(e){return i(Object(h.a)(Object(h.a)({},r),{},Object(B.a)({},e.target.name,e.target.value)))}})]})}),Object(a.jsx)(H.a,{children:Object(a.jsxs)(P.a,{children:[Object(a.jsx)(G.a,{for:"slug",style:{fontSize:"20px"},children:"App Slug"}),Object(a.jsx)(J.a,{type:"text",name:"slug",value:r.slug,style:{fontSize:"20px"},onChange:function(e){return i(Object(h.a)(Object(h.a)({},r),{},Object(B.a)({},e.target.name,e.target.value)))}})]})}),Object(a.jsx)(H.a,{children:Object(a.jsxs)(P.a,{children:[Object(a.jsx)(G.a,{for:"email",style:{fontSize:"20px"},children:"Email"}),Object(a.jsx)(J.a,{type:"email",name:"email",value:r.email,style:{fontSize:"20px"},onChange:function(e){return i(Object(h.a)(Object(h.a)({},r),{},Object(B.a)({},e.target.name,e.target.value)))}})]})}),Object(a.jsx)(H.a,{children:Object(a.jsxs)(P.a,{children:[Object(a.jsx)(G.a,{for:"password",style:{fontSize:"20px"},children:"Password"}),Object(a.jsx)(J.a,{type:"password",name:"password",value:r.password,style:{fontSize:"20px"},onChange:function(e){return i(Object(h.a)(Object(h.a)({},r),{},Object(B.a)({},e.target.name,e.target.value)))}})]})})]}),Object(a.jsx)("center",{children:Object(a.jsx)("div",{style:{marginBottom:"20px"},children:Object(a.jsx)(_.a,{color:"info",onClick:function(e){e.preventDefault(),console.log(r),console.log(!r.password),r.name&&r.slug&&r.email&&r.password?i(Object(h.a)(Object(h.a)({},r),{},{schema:[].concat(Object(g.a)(r.schema),[{isAuth:!1,name:"",attributes:[]}])})):w.dispatch(Y("Please enter basic app credentials first","danger",3e3))},style:{fontSize:"20px",width:"50%",borderRadius:"20px"},children:"Add a new Model"})})}),Object(a.jsx)("div",{children:r.schema&&r.schema.map((function(e,t){return Object(a.jsxs)("div",{style:{backgroundColor:"#666699",padding:"10px",marginBottom:"10px",borderRadius:"10px"},children:[Object(a.jsxs)(F.a,{form:!0,style:{marginBottom:"10px"},children:[Object(a.jsx)(H.a,{md:3,children:Object(a.jsxs)("div",{style:{fontSize:"30px",display:"flex",color:"white",alignItems:"center",justifyContent:"center"},children:["Model #",t+1]})}),Object(a.jsx)(H.a,{md:2,children:Object(a.jsx)(_.a,{color:"danger",onClick:function(){return function(e){var t=r.schema;t.splice(e,1),i(Object(h.a)(Object(h.a)({},r),{},{schema:t}))}(t)},style:{fontSize:"20px",width:"100%"},children:"Delete Model"})}),Object(a.jsx)(H.a,{md:3,children:Object(a.jsx)(P.a,{children:Object(a.jsx)(J.a,{type:"text",name:"name",placeholder:"Model Name",value:e.name,onChange:function(e){return y(e,t)},style:{fontSize:"20px"}})})}),Object(a.jsx)(H.a,{md:2,children:Object(a.jsx)(P.a,{children:Object(a.jsxs)(J.a,{type:"select",name:"isAuth",id:"isAuth",style:{fontSize:"20px"},onChange:function(e){return y(e,t)},children:[Object(a.jsx)("option",{value:"isAuth",children:"Is Auth?"}),Object(a.jsx)("option",{value:!0,children:"True"}),Object(a.jsx)("option",{value:!1,children:"False"})]})})}),Object(a.jsx)(H.a,{md:2,children:Object(a.jsx)(_.a,{color:"warning",onClick:function(e){return function(e,t){e.preventDefault();var n=r.schema;n[t].name?(n[t].attributes||(n[t].attributes=[]),n[t].attributes.push({name:"",type:"",ref:"",required:""}),i(Object(h.a)(Object(h.a)({},r),{},{schema:n}))):(window.scroll(0,0),w.dispatch(Y("Please enter model name first","danger",3e3)))}(e,t)},style:{fontSize:"20px",width:"100%"},children:"Add Attribute"})})]}),Object(a.jsx)("div",{children:e.attributes&&e.attributes.map((function(e,n){return Object(a.jsxs)(F.a,{form:!0,style:{marginTop:"20px"},children:[Object(a.jsx)(H.a,{md:3,children:Object(a.jsx)(J.a,{type:"text",name:"name",value:e.name,onChange:function(e){return S(e,t,n)},placeholder:"Attribute Name",style:{fontSize:"20px"}})}),Object(a.jsx)(H.a,{md:3,children:Object(a.jsx)(P.a,{children:Object(a.jsxs)(J.a,{type:"select",name:"type",style:{fontSize:"20px"},onChange:function(e){return S(e,t,n)},children:[Object(a.jsx)("option",{value:"0",children:"Select Attribute Type"}),Object(a.jsx)("option",{value:"String",children:"String"}),Object(a.jsx)("option",{value:"Number",children:"Number"}),Object(a.jsx)("option",{value:"Date",children:"Date"}),Object(a.jsx)("option",{value:"Buffer",children:"Buffer"}),Object(a.jsx)("option",{value:"Boolean",children:"Boolean"}),Object(a.jsx)("option",{value:"Mixed",children:"Mixed"}),Object(a.jsx)("option",{value:"ObjectId",children:"ObjectId"}),Object(a.jsx)("option",{value:"Array",children:"Array"})]})})}),Object(a.jsx)(H.a,{md:3,children:Object(a.jsx)(P.a,{children:Object(a.jsxs)(J.a,{type:"select",name:"ref",style:{fontSize:"20px"},onChange:function(e){return S(e,t,n)},children:[Object(a.jsx)("option",{value:"0",children:"Select Attribute Ref (if exists)"}),r.schema.map((function(e,t){return e.name?Object(a.jsx)("option",{value:e.name,children:e.name},t):null}))]})})}),Object(a.jsx)(H.a,{md:2,children:Object(a.jsx)(P.a,{children:Object(a.jsxs)(J.a,{type:"select",name:"required",style:{fontSize:"20px"},onChange:function(e){return S(e,t,n)},children:[Object(a.jsx)("option",{value:"0",children:"Attribute Required"}),Object(a.jsx)("option",{value:!0,children:"True"}),Object(a.jsx)("option",{value:!1,children:"False"})]})})}),Object(a.jsx)(H.a,{md:1,children:Object(a.jsx)(_.a,{color:"danger",onClick:function(){return function(e,t){var n=r.schema;n[e].attributes.splice(t,1),i(Object(h.a)(Object(h.a)({},r),{},{schema:n}))}(t,n)},style:{fontSize:"20px",width:"100%"},children:"Remove"})})]},n)}))})]},t)}))}),Object(a.jsx)("div",{style:{marginTop:"10px"},className:"float float-right",children:Object(a.jsx)("span",{className:"float float-right",children:b?Object(a.jsx)(W.a,{ariaLabel:"loading-indicator",color:"yellow"}):Object(a.jsx)(_.a,{color:"success",onClick:v,style:{fontSize:"20px",padding:"10px",minWidth:"200px",borderTopRightRadius:"20px",borderBottomRightRadius:"20px"},disabled:m,children:m?"Saved":"Save"})})})]})})})})})]})}),K=function(){return Object(a.jsxs)(l.c,{children:[Object(a.jsx)(T,{exact:!0,path:"/",component:X}),Object(a.jsx)(T,{component:R})]})},Q=function(){return Object(a.jsx)(d.a,{store:w,children:Object(a.jsx)(l.b,{history:j,children:Object(a.jsx)(l.c,{children:Object(a.jsx)(l.a,{component:K})})})})};s.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(Q,{})}),document.getElementById("root"))}},[[91,1,2]]]);
//# sourceMappingURL=main.2f841bee.chunk.js.map