///<reference path="../../../headers/common.d.ts" />

import config from 'app/core/config';
import $ from 'jquery';
import coreModule from '../../core_module';

export class SideMenuCtrl {
  isSignedIn: boolean;
  showSignout: boolean;
  user: any;
  mainLinks: any;
  orgMenu: any;
  appSubUrl: string;
  loginUrl: string;
  orgFilter: string;
  orgItems: any;
  orgs: any;
  maxShownOrgs: number;
  menus: any;

  /** @ngInject */
  constructor(private $scope, private $location, private contextSrv, private backendSrv) {
    this.isSignedIn = contextSrv.isSignedIn;
    this.user = contextSrv.user;
    this.appSubUrl = config.appSubUrl;
    this.showSignout = this.contextSrv.isSignedIn && !config['disableSignoutMenu'];
    this.maxShownOrgs = 10;

    this.mainLinks = config.bootData.mainNavLinks;
    console.log(this.user);
    console.log(this.mainLinks);
    this.openUserDropdown();
    this.loginUrl = 'login?redirect=' + encodeURIComponent(this.$location.path());

    this.$scope.$on('$routeChangeSuccess', () => {
      if (!this.contextSrv.pinned) {
        this.contextSrv.sidemenu = false;
      }
      this.loginUrl = 'login?redirect=' + encodeURIComponent(this.$location.path());
    });

    this.orgFilter = '';

    this.customLink();
  }


  customLink() {
    this.customLinks=[{text:'综合监视',url:'/dashboard/db/zong-he-jian-shi'
            ,img:'/public/img/zonghejianshi.svg',},
      {text:'综合统计分析',url:'/',img:'/public/img/zonghetongjifenxi.svg',
      children:[{text:'数据回放',url:'/dashboard/db/shu-ju-hui-fang'},
      {text:'单站对比分析',url:'/dashboard/db/dan-zhan-dian-dui-bi-fen-xi'},
      {text:'多站对比分析',url:'/dashboard/db/duo-zhan-dian-dui-bi-fen-xi'},
      {text:'区域分析',url:'/dashboard/db/qu-yu-fen-xi'},
      {text:'数据排名',url:'/dashboard/db/shu-ju-pai-ming'},
      {text:'用电统计',url:'/dashboard/db/yong-dian-tong-ji'}]},
    {text:'预警预报',url:'/',img:'/public/img/yujingbaobiao.svg',
      children:[{text:'趋势预报',url:'/dashboard/db/qu-shi-yu-bao'}]},
    {text:'综合报表',url:'/',img:'/public/img/zonghebaobiao.svg',
      children:[{text:'日报',url:'/dashboard/db/ri-bao'},
        {text:'周报',url:'/dashboard/db/zhou-bao'},
        {text:'月报',url:'/dashboard/db/yue-bao'},
        {text:'季报',url:'/dashboard/db/ji-bao'},
        {text:'半年报',url:'/dashboard/db/ban-nian-bao'},
        {text:'年报',url:'/dashboard/db/nian-bao'}]},
    {text:'用户权限管理',url:'/',img:'/public/img/Users.svg',
      children:[{text:'用户管理',url:'/admin/users'},{text:'用户设置',url:'/profile'},
        {text:'权限管理',url:'/org/users'}]}];

    this.menus=new Array();
    for(var i=0;i<this.mainLinks.length;i++){
      if(this.mainLinks[i].text=='平台管理')
        this.menus.push(this.mainLinks[i]);


      if(this.contextSrv.hasRole('Admin')&&this.user.name!='beichen') {
        if(this.mainLinks[i].text=='Dashboards'||this.mainLinks[i].text=='Data Sources')
          this.menus.push(this.mainLinks[i]);
      }
    }
    if (this.showSignout) {
      this.menus.push(
        {text: "退出系统", url: this.getUrl("/logout"),img:'/public/img/signout.svg' ,target: "_self"}
      );
    }
  }


 getUrl(url) {
   return config.appSubUrl + url;
 }

 openUserDropdown() {
   this.orgMenu = [
     {section: 'You', cssClass: 'dropdown-menu-title'},
     {text: 'Profile', url: this.getUrl('/profile')},
   ];

   if (this.showSignout) {
     this.orgMenu.push({text: "Sign out", url: this.getUrl("/logout"), target: "_self"});
   }

   if (this.contextSrv.hasRole('Admin')) {
     this.orgMenu.push({section: this.user.orgName, cssClass: 'dropdown-menu-title'});
     this.orgMenu.push({
       text: "Preferences",
       url: this.getUrl("/org")
     });
     this.orgMenu.push({
       text: "Users",
       url: this.getUrl("/org/users")
     });
     this.orgMenu.push({
       text: "API Keys",
       url: this.getUrl("/org/apikeys")
     });
   }

   this.orgMenu.push({cssClass: "divider"});
   this.backendSrv.get('/api/user/orgs').then(orgs => {
     this.orgs = orgs;
     this.loadOrgsItems();
   });
 }

 loadOrgsItems() {
   this.orgItems = [];
   this.orgs.forEach(org => {
     if (org.orgId === this.contextSrv.user.orgId) {
       return;
     }

     if (this.orgItems.length === this.maxShownOrgs) {
       return;
     }

     if (this.orgFilter === '' || (org.name.toLowerCase().indexOf(this.orgFilter.toLowerCase()) !== -1)) {
       this.orgItems.push({
         text: "Switch to " + org.name,
         icon: "fa fa-fw fa-random",
         url: this.getUrl('/profile/switch-org/' + org.orgId),
         target: '_self'
       });
     }
   });
   if (config.allowOrgCreate) {
     this.orgItems.push({text: "New organization", icon: "fa fa-fw fa-plus", url: this.getUrl('/org/new')});
   }
 }
}

export function sideMenuDirective() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/core/components/sidemenu/sidemenu.html',
    controller: SideMenuCtrl,
    bindToController: true,
    controllerAs: 'ctrl',
    scope: {},
    link: function(scope, elem) {
      // hack to hide dropdown menu
      elem.on('click.dropdown', '.dropdown-menu a', function(evt) {
        var menu = $(evt.target).parents('.dropdown-menu');
        var parent = menu.parent();
        menu.detach();

        setTimeout(function() {
          parent.append(menu);
        }, 100);
      });

      scope.$on("$destory", function() {
        elem.off('click.dropdown');
      });
    }
  };
}

coreModule.directive('sidemenu', sideMenuDirective);
