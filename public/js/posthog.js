// PostHog product analytics + session replay, trialled side by side with
// FullStory and Hotjar (Jim, 2026-11-03). One ZINC organization in PostHog,
// one project per site. The project token is public (it ships in the page
// source), same as the FullStory org id.
//
// Loaded on every page: the ported static pages and blog templates include it
// next to zinc-analytics.js, and React pages through SiteAnalytics. Production
// hostname only, so previews and local development never record.
//
// Events go through our own /ingest rewrite (next.config.ts) so content
// blockers don't drop them. Recording rules (minimum session length,
// sampling) live in the PostHog project settings, not here.
(function () {
  "use strict";

  if (!/(^|\.)wearezinc\.com$/i.test(window.location.hostname)) return;
  if (window.posthog && window.posthog.__loaded) return;

  // Official PostHog loader snippet, verbatim: queues calls until
  // /ingest/static/array.js arrives, then replays them.
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog&&window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  window.posthog.init("phc_D8Jgs7BrikmJ8HxCrYn7RrGy2BEdZbXnAZSVbeHKEBd5", {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    // React pages navigate client-side; count each one as a pageview
    capture_pageview: "history_change",
    // anonymous visitors don't get a person profile
    person_profiles: "identified_only",
  });
})();
