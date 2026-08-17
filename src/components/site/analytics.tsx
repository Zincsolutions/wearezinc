import Script from "next/script";

// Same analytics stack as the ported static pages: GA4 everywhere,
// FullStory + Hotjar gated to the production hostname (dev sessions must
// never record — see the Phase B quick-wins commit).
export function SiteAnalytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-H4WRSH6E2G"
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-H4WRSH6E2G');`}
      </Script>
      <Script id="fullstory" strategy="afterInteractive">
        {`if(/(^|\\.)wearezinc\\.com$/.test(location.hostname)){window['_fs_host']='fullstory.com';window['_fs_script']='edge.fullstory.com/s/fs.js';window['_fs_org']='97GDT';window['_fs_namespace']='FS';!function(m,n,e,t,l,o,g,y){var s,f,a=function(h){return!(h in m)||(m.console&&m.console.log&&m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].'),!1)}(e);function p(b){var h,d=[];function j(){h&&(d.forEach((function(b){var d;try{d=b[h[0]]&&b[h[0]](h[1])}catch(h){return void(b[3]&&b[3](h))}d&&d.then?d.then(b[2],b[3]):b[2]&&b[2](d)})),d.length=0)}function r(b){return function(d){h||(h=[b,d],j())}}return b(r(0),r(1)),{then:function(b,h){return p((function(r,i){d.push([b,h,r,i]),j()}))}}}a&&(g=m[e]=function(){var b=function(b,d,j,r){function i(i,c){h(b,d,j,r,i,c)}function c(i,c){h(b,d,j,r,i,c,!0)}return{then:i,catch:c}},h=function(b,d,j,r,i,c,u){g._api?g._api(b,d,j,r,i,c,u):g.q&&g.q.push([b,d,j,r,i,c,u])};return b}(),y=function(b){function d(d){"function"==typeof d[4]&&d[4](new Error(b))}var h=g.q;if(h){for(var j=0;j<h.length;j++)d(h[j]);h.length=0,h.push=d}},function(){(o=n.createElement(t)).async=!0,o.crossOrigin="anonymous",o.src="https://"+l,o.onerror=function(){y("Error loading "+l)};var b=n.getElementsByTagName(t)[0];b&&b.parentNode?b.parentNode.insertBefore(o,b):n.head.appendChild(o)}(),function(){function b(){}function d(b,d,j){g(b,d,j)}function h(b,d,j,r){g(b,d,j,r,!0)}function j(){}g.identify=d.bind(null,"user"),g.setUserVars=d.bind(null,"user"),g.identifyAccount=b,g.clearUserCookie=j,g.setVars=d,g.event=function(b,d,j){g("event",{n:b,p:d},j)},g.anonymize=function(){g.identify(!1)},g.shutdown=function(){g("rec",!1)},g.restart=function(){g("rec",!0)},g.log=function(b,d){g("log",[b,d])},g.consent=function(b){g("consent",!arguments.length||b)}}()),m._fs_ready=function(b){m.addEventListener?m.addEventListener("fullstory/ready",b):m.attachEvent("onfullstory/ready",b)}}(window,document,window._fs_namespace,"script",window._fs_script);}`}
      </Script>
      <Script id="hotjar" strategy="afterInteractive">
        {`if(/(^|\\.)wearezinc\\.com$/.test(location.hostname)){(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:250039,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');}`}
      </Script>
    </>
  );
}
