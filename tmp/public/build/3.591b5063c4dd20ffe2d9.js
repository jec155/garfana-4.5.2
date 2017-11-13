webpackJsonp([3],{1303:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"AdminStatsCtrl",function(){return g});var r=n(1355),i=n(1356),s=(n.n(i),n(1357)),o=(n.n(s),n(1358)),a=(n.n(o),n(2)),u=function(){function e(e,t,n){this.navModel=n.getAdminNav(),t.get("/api/admin/settings").then(function(t){e.settings=t})}return e.$inject=["$scope","backendSrv","navModelSrv"],e}(),c=function(){function e(e){this.navModel=e.getAdminNav()}return e.$inject=["navModelSrv"],e}(),g=function(){function e(e,t){var n=this;this.navModel=t.getAdminNav(),e.get("/api/admin/stats").then(function(e){n.stats=e})}return e.$inject=["backendSrv","navModelSrv"],e}();a.default.controller("AdminSettingsCtrl",u),a.default.controller("AdminHomeCtrl",c),a.default.controller("AdminStatsCtrl",g),a.default.controller("AdminListUsersCtrl",r.a)},1355:function(e,t,n){"use strict";var r=function(){function e(e,t,n){this.$scope=e,this.backendSrv=t,this.pages=[],this.perPage=50,this.page=1,this.showPaging=!1,this.navModel=n.getAdminNav(),this.query="",this.getUsers()}return e.$inject=["$scope","backendSrv","navModelSrv"],e.prototype.getUsers=function(){var e=this;this.backendSrv.get("/api/users/search?perpage="+this.perPage+"&page="+this.page+"&query="+this.query).then(function(t){e.users=t.users,e.page=t.page,e.perPage=t.perPage,e.totalPages=Math.ceil(t.totalCount/t.perPage),e.showPaging=e.totalPages>1,e.pages=[];for(var n=1;n<e.totalPages+1;n++)e.pages.push({page:n,current:n===e.page})})},e.prototype.navigateToPage=function(e){this.page=e.page,this.getUsers()},e.prototype.deleteUser=function(e){var t=this;this.$scope.appEvent("confirm-modal",{title:"Delete",text:"Do you want to delete "+e.login+"?",icon:"fa-trash",yesText:"Delete",onConfirm:function(){t.backendSrv.delete("/api/admin/users/"+e.id).then(function(){t.getUsers()})}})},e}();t.a=r},1356:function(e,t,n){(function(e){var r,i;r=[n(12)],void 0!==(i=function(e){"use strict";e.module("grafana.controllers").controller("AdminListOrgsCtrl",["$scope","backendSrv","navModelSrv",function(e,t,n){e.init=function(){e.navModel=n.getAdminNav(),e.getOrgs()},e.getOrgs=function(){t.get("/api/orgs").then(function(t){e.orgs=t})},e.deleteOrg=function(n){e.appEvent("confirm-modal",{title:"Delete",text:"Do you want to delete organization "+n.name+"?",text2:"All dashboards for this organization will be removed!",icon:"fa-trash",yesText:"Delete",onConfirm:function(){t.delete("/api/orgs/"+n.id).then(function(){e.getOrgs()})}})},e.init()}])}.apply(t,r))&&(e.exports=i)}).call(t,n(201)(e))},1357:function(e,t,n){(function(e){var r,i;r=[n(12)],void 0!==(i=function(e){"use strict";e.module("grafana.controllers").controller("AdminEditOrgCtrl",["$scope","$routeParams","backendSrv","$location","navModelSrv",function(e,t,n,r,i){e.init=function(){e.navModel=i.getAdminNav(),t.id&&(e.getOrg(t.id),e.getOrgUsers(t.id))},e.getOrg=function(t){n.get("/api/orgs/"+t).then(function(t){e.org=t})},e.getOrgUsers=function(t){n.get("/api/orgs/"+t+"/users").then(function(t){e.orgUsers=t})},e.update=function(){e.orgDetailsForm.$valid&&n.put("/api/orgs/"+e.org.id,e.org).then(function(){r.path("/admin/orgs")})},e.updateOrgUser=function(e){n.patch("/api/orgs/"+e.orgId+"/users/"+e.userId,e)},e.removeOrgUser=function(t){n.delete("/api/orgs/"+t.orgId+"/users/"+t.userId).then(function(){e.getOrgUsers(e.org.id)})},e.init()}])}.apply(t,r))&&(e.exports=i)}).call(t,n(201)(e))},1358:function(e,t,n){(function(e){var r,i;r=[n(12),n(7)],void 0!==(i=function(e,t){"use strict";e.module("grafana.controllers").controller("AdminEditUserCtrl",["$scope","$routeParams","backendSrv","$location","navModelSrv",function(e,n,r,i,s){e.user={},e.newOrg={name:"",role:"Editor"},e.permissions={},e.navModel=s.getAdminNav(),e.init=function(){n.id&&(e.getUser(n.id),e.getUserOrgs(n.id))},e.getUser=function(t){r.get("/api/users/"+t).then(function(n){e.user=n,e.user_id=t,e.permissions.isGrafanaAdmin=n.isGrafanaAdmin})},e.setPassword=function(){if(e.passwordForm.$valid){var t={password:e.password};r.put("/api/admin/users/"+e.user_id+"/password",t).then(function(){i.path("/admin/users")})}},e.updatePermissions=function(){var t=e.permissions;r.put("/api/admin/users/"+e.user_id+"/permissions",t).then(function(){i.path("/admin/users")})},e.create=function(){e.userForm.$valid&&r.post("/api/admin/users",e.user).then(function(){i.path("/admin/users")})},e.getUserOrgs=function(t){r.get("/api/users/"+t+"/orgs").then(function(t){e.orgs=t})},e.update=function(){e.userForm.$valid&&r.put("/api/users/"+e.user_id,e.user).then(function(){i.path("/admin/users")})},e.updateOrgUser=function(t){r.patch("/api/orgs/"+t.orgId+"/users/"+e.user_id,t).then(function(){})},e.removeOrgUser=function(t){r.delete("/api/orgs/"+t.orgId+"/users/"+e.user_id).then(function(){e.getUserOrgs(e.user_id)})},e.orgsSearchCache=[],e.searchOrgs=function(n,i){if(e.orgsSearchCache.length>0)return void i(t.map(e.orgsSearchCache,"name"));r.get("/api/orgs",{query:""}).then(function(n){e.orgsSearchCache=n,i(t.map(n,"name"))})},e.addOrgUser=function(){if(e.addOrgForm.$valid){var n=t.find(e.orgsSearchCache,{name:e.newOrg.name});n&&(e.newOrg.loginOrEmail=e.user.login,r.post("/api/orgs/"+n.id+"/users/",e.newOrg).then(function(){e.getUserOrgs(e.user_id)}))}},e.init()}])}.apply(t,r))&&(e.exports=i)}).call(t,n(201)(e))}});
//# sourceMappingURL=3.591b5063c4dd20ffe2d9.js.map