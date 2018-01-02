webpackJsonp([1],{1301:function(e,t,n){var o,r;o=[n(1321),n(1350),n(1321),n(1348),n(1349),n(1347),n(1351),n(1352),n(1353),n(1354)],void 0!==(r=function(){}.apply(t,o))&&(e.exports=r)},1321:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"OrgUsersCtrl",function(){return a});var o=n(27),r=n(2),i=n(469),s=n.n(i),a=function(){function e(e,t,n,r){this.$scope=e,this.backendSrv=t,this.user={loginOrEmail:"",role:"Viewer"},this.navModel=n.getOrgNav(0),this.get(),this.editor={index:0},this.externalUserMngLinkUrl=o.default.externalUserMngLinkUrl,this.externalUserMngLinkName=o.default.externalUserMngLinkName,o.default.externalUserMngInfo&&(this.externalUserMngInfo=new s.a({linkTarget:"__blank"}).render(o.default.externalUserMngInfo)),this.addUsersBtnName=this.getAddUserBtnName()}return e.$inject=["$scope","backendSrv","navModelSrv","$sce"],e.prototype.getAddUserBtnName=function(){return this.externalUserMngLinkName?this.externalUserMngLinkName:o.default.disableLoginForm?"Add Users":"Add or Invite"},e.prototype.get=function(){var e=this;this.backendSrv.get("/api/org/users").then(function(t){e.users=t}),this.backendSrv.get("/api/org/invites").then(function(t){e.pendingInvites=t})},e.prototype.updateOrgUser=function(e){this.backendSrv.patch("/api/org/users/"+e.userId,e)},e.prototype.removeUser=function(e){var t=this;this.$scope.appEvent("confirm-modal",{title:"Delete",text:"Are you sure you want to delete user "+e.login+"?",yesText:"Delete",icon:"fa-warning",onConfirm:function(){t.removeUserConfirmed(e)}})},e.prototype.removeUserConfirmed=function(e){this.backendSrv.delete("/api/org/users/"+e.userId).then(this.get.bind(this))},e.prototype.revokeInvite=function(e,t){t.stopPropagation(),this.backendSrv.patch("/api/org/invites/"+e.code+"/revoke").then(this.get.bind(this))},e.prototype.copyInviteToClipboard=function(e){e.stopPropagation()},e.prototype.getInviteUrl=function(e){return e.url},e.prototype.openAddUsersView=function(){var e=this.$scope.$new();e.invitesSent=this.get.bind(this);var t=o.default.disableLoginForm?"public/app/features/org/partials/add_user.html":"public/app/features/org/partials/invite.html";this.$scope.appEvent("show-modal",{src:t,modalClass:"invite-modal",scope:e})},e}();r.default.controller("OrgUsersCtrl",a)},1347:function(e,t,n){(function(e){var o,r;o=[n(12),n(27)],void 0!==(r=function(e,t){"use strict";t=t.default,e.module("grafana.controllers").controller("NewOrgCtrl",["$scope","$http","backendSrv","navModelSrv",function(e,n,o,r){e.navModel=r.getOrgNav(0),e.newOrg={name:""},e.createOrg=function(){o.post("/api/orgs/",e.newOrg).then(function(e){o.post("/api/user/using/"+e.orgId).then(function(){window.location.href=t.appSubUrl+"/org"})})}}])}.apply(t,o))&&(e.exports=r)}).call(t,n(201)(e))},1348:function(e,t,n){(function(e){var o,r;o=[n(12),n(27)],void 0!==(r=function(e,t){"use strict";t=t.default,e.module("grafana.controllers").controller("SelectOrgCtrl",["$scope","backendSrv","contextSrv",function(e,n,o){o.sidemenu=!1,e.init=function(){e.getUserOrgs()},e.getUserOrgs=function(){n.get("/api/user/orgs").then(function(t){e.orgs=t})},e.setUsingOrg=function(e){n.post("/api/user/using/"+e.orgId).then(function(){window.location.href=t.appSubUrl+"/"})},e.init()}])}.apply(t,o))&&(e.exports=r)}).call(t,n(201)(e))},1349:function(e,t,n){(function(e){var o,r;o=[n(12),n(27)],void 0!==(r=function(e,t){"use strict";t=t.default,e.module("grafana.controllers").controller("ChangePasswordCtrl",["$scope","backendSrv","$location","navModelSrv",function(e,n,o,r){e.command={},e.authProxyEnabled=t.authProxyEnabled,e.ldapEnabled=t.ldapEnabled,e.navModel=r.getProfileNav(),e.changePassword=function(){if(e.userForm.$valid)return e.command.newPassword!==e.command.confirmNew?void e.appEvent("alert-warning",["New passwords do not match",""]):void n.put("/api/user/password",e.command).then(function(){o.path("profile")})}}])}.apply(t,o))&&(e.exports=r)}).call(t,n(201)(e))},1350:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"ProfileCtrl",function(){return i});var o=n(27),r=n(465),i=function(){function e(e,t,n,r){this.backendSrv=e,this.contextSrv=t,this.$location=n,this.orgs=[],this.showOrgsList=!1,this.readonlyLoginFields=o.default.disableLoginForm,this.getUser(),this.getUserOrgs(),this.navModel=r.getProfileNav()}return e.$inject=["backendSrv","contextSrv","$location","navModelSrv"],e.prototype.getUser=function(){var e=this;this.backendSrv.get("/api/user").then(function(t){e.user=t,e.user.theme=t.theme||"dark"})},e.prototype.getUserOrgs=function(){var e=this;this.backendSrv.get("/api/user/orgs").then(function(t){e.orgs=t,e.showOrgsList=t.length>1})},e.prototype.setUsingOrg=function(e){this.backendSrv.post("/api/user/using/"+e.orgId).then(function(){window.location.href=o.default.appSubUrl+"/profile"})},e.prototype.update=function(){var e=this;this.userForm.$valid&&this.backendSrv.put("/api/user/",this.user).then(function(){e.contextSrv.user.name=e.user.name||e.user.login,e.old_theme!==e.user.theme&&(window.location.href=o.default.appSubUrl+e.$location.path())})},e}();r.coreModule.controller("ProfileCtrl",i)},1351:function(e,t,n){(function(e){var o,r;o=[n(12),n(7)],void 0!==(r=function(e,t){"use strict";e.module("grafana.controllers").controller("UserInviteCtrl",["$scope","backendSrv",function(e,n){e.invites=[{name:"",email:"",role:"Editor"}],e.options={skipEmails:!1},e.init=function(){},e.addInvite=function(){e.invites.push({name:"",email:"",role:"Editor"})},e.removeInvite=function(n){e.invites=t.without(e.invites,n)},e.sendInvites=function(){e.inviteForm.$valid&&e.sendSingleInvite(0)},e.sendSingleInvite=function(t){var o=e.invites[t];return o.skipEmails=e.options.skipEmails,n.post("/api/org/invites",o).finally(function(){t+=1,t===e.invites.length?(e.invitesSent(),e.dismiss()):e.sendSingleInvite(t)})}}])}.apply(t,o))&&(e.exports=r)}).call(t,n(201)(e))},1352:function(e,t,n){(function(e){var o,r;o=[n(12)],void 0!==(r=function(e){"use strict";e.module("grafana.controllers").controller("OrgApiKeysCtrl",["$scope","$http","backendSrv","navModelSrv",function(e,t,n,o){e.navModel=o.getOrgNav(0),e.roleTypes=["Viewer","Editor","Admin"],e.token={role:"Viewer"},e.init=function(){e.getTokens()},e.getTokens=function(){n.get("/api/auth/keys").then(function(t){e.tokens=t})},e.removeToken=function(t){n.delete("/api/auth/keys/"+t).then(e.getTokens)},e.addToken=function(){n.post("/api/auth/keys",e.token).then(function(t){var n=e.$new(!0);n.key=t.key,n.rootPath=window.location.origin+e.$root.appSubUrl,e.appEvent("show-modal",{src:"public/app/features/org/partials/apikeyModal.html",scope:n}),e.getTokens()})},e.init()}])}.apply(t,o))&&(e.exports=r)}).call(t,n(201)(e))},1353:function(e,t,n){(function(e){var o,r;o=[n(12)],void 0!==(r=function(e){"use strict";e.module("grafana.controllers").controller("OrgDetailsCtrl",["$scope","$http","backendSrv","contextSrv","navModelSrv",function(e,t,n,o,r){e.init=function(){e.getOrgInfo(),e.navModel=r.getOrgNav(0)},e.getOrgInfo=function(){n.get("/api/org").then(function(t){e.org=t,e.address=t.address,o.user.orgName=t.name})},e.update=function(){if(e.orgForm.$valid){var t={name:e.org.name};n.put("/api/org",t).then(e.getOrgInfo)}},e.updateAddress=function(){e.addressForm.$valid&&n.put("/api/org/address",e.address).then(e.getOrgInfo)},e.init()}])}.apply(t,o))&&(e.exports=r)}).call(t,n(201)(e))},1354:function(e,t,n){"use strict";function o(){return{restrict:"E",controller:s,bindToController:!0,controllerAs:"ctrl",template:a,scope:{mode:"@"}}}Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"PrefsControlCtrl",function(){return s}),t.prefsControlDirective=o;var r=n(27),i=n(2),s=function(){function e(e,t){this.backendSrv=e,this.$location=t,this.timezones=[{value:"",text:"Default"},{value:"browser",text:"Local browser time"},{value:"utc",text:"UTC"}],this.themes=[{value:"",text:"Default"},{value:"dark",text:"Dark"},{value:"light",text:"Light"}]}return e.$inject=["backendSrv","$location"],e.prototype.$onInit=function(){var e=this;return this.backendSrv.get("/api/"+this.mode+"/preferences").then(function(t){e.prefs=t,e.oldTheme=t.theme})},e.prototype.updatePrefs=function(){var e=this;if(this.prefsForm.$valid){var t={theme:this.prefs.theme,timezone:this.prefs.timezone,homeDashboardId:this.prefs.homeDashboardId};this.backendSrv.put("/api/"+this.mode+"/preferences",t).then(function(){window.location.href=r.default.appSubUrl+e.$location.path()})}},e}(),a='\n<form name="ctrl.prefsForm" class="section gf-form-group">\n  <h3 class="page-heading">Preferences</h3>\n\n  <div class="gf-form">\n    <span class="gf-form-label width-11">UI Theme</span>\n    <div class="gf-form-select-wrapper max-width-20">\n      <select class="gf-form-input" ng-model="ctrl.prefs.theme" ng-options="f.value as f.text for f in ctrl.themes"></select>\n    </div>\n  </div>\n\n  <div class="gf-form">\n    <span class="gf-form-label width-11">\n      Home Dashboard\n      <info-popover mode="right-normal">\n        Not finding dashboard you want? Star it first, then it should appear in this select box.\n      </info-popover>\n    </span>\n    <dashboard-selector class="gf-form-select-wrapper max-width-20" model="ctrl.prefs.homeDashboardId">\n    </dashboard-selector>\n  </div>\n\n  <div class="gf-form">\n    <label class="gf-form-label width-11">Timezone</label>\n    <div class="gf-form-select-wrapper max-width-20">\n      <select class="gf-form-input" ng-model="ctrl.prefs.timezone" ng-options="f.value as f.text for f in ctrl.timezones"></select>\n    </div>\n  </div>\n\n  <div class="gf-form-button-row">\n    <button type="submit" class="btn btn-success" ng-click="ctrl.updatePrefs()">Update</button>\n  </div>\n</form>\n';i.default.directive("prefsControl",o)}});
//# sourceMappingURL=1.1db685339dd5beb71363.js.map