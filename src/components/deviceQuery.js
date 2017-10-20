import angular from 'angular';
import moment from 'moment';
export class DeviceQueryCtrl
{
  constructor($scope,$http,$rootScope)
  {
      this.http = $http;
      this.scope = $scope;
      this.root=$rootScope;

      $scope.deviceTip={
          siteName:'',siteId:'',name:'',monType:'',seqno:'',firmware:'',status:'',productDate1:'',productDate2:'',
          useDate1:'',useDate2:'',lastCheckDate1:'',lastCheckDate2:''
      };//参数
      //选择站点
      $scope.dismiss=function () {
          $scope.siteShow=!$scope.siteShow;

      };
      $scope.choose=function (item) {
          //console.info(item);
          $scope.deviceTip.siteId=item.id;
          $scope.deviceTip.siteName=item.siteName;
          $scope.siteShow=!$scope.siteShow;
      };
      //选择日期
      $scope.absoluteFromChangedproductDate1=function absoluteFromChangedproductDate1(time)
      {
          $scope.deviceTip.productDate1=moment(time);
          $scope.productDate1=!$scope.productDate1;
      }
      $scope.absoluteFromChangedproductDate2=function absoluteFromChangedproductDate2(time)
      {
          $scope.deviceTip.productDate2=moment(time);
          $scope.productDate2=!$scope.productDate2;
      }
      $scope.absoluteFromChangeduseDate1=function absoluteFromChangeduseDate1(time)
      {
          $scope.deviceTip.useDate1=moment(time);
          $scope.useDate1=!$scope.useDate1;
      }
      $scope.absoluteFromChangeduseDate2=function absoluteFromChangeduseDate2(time)
      {
          $scope.deviceTip.useDate2=moment(time);
          $scope.useDate2=!$scope.useDate2;
      }
      $scope.absoluteFromChangedlastCheckDate1=function absoluteFromChangedlastCheckDate1(time)
      {
          $scope.deviceTip.lastCheckDate1=moment(time);
          $scope.lastCheckDate1=!$scope.lastCheckDate1;
      }
      $scope.absoluteFromChangedlastCheckDate2=function absoluteFromChangedlastCheckDate2(time)
      {
          $scope.deviceTip.lastCheckDate2=moment(time);
          $scope.lastCheckDate2=!$scope.lastCheckDate2;
      }


      var scope=$scope;
      $scope.siteListURL='http://61.164.218.158:8080/AirServer/grafana/siteListByPage';
      //分页
      $scope.myPage={
          currentPage:1,//访问第几页数据，从1开始
          totalItems:0,//数据库中总共有多少条数据
          itemsPerPage: 10,//默认每页展示多少条数据，可更改
          pagesLength: 15,
          perPageOptions: [10,15,25]//可选择的每页展示多少条数据
      };
      var myPage={};
      myPage.pageNub=1;
      myPage.getPageNub=function () {
          return myPage.pageNub;
      };
      myPage.setPageNub=function (n) {
          myPage.pageNub=n;
      };
      $scope.myPage.currentPage=myPage.pageNub;
      // 定义分页的长度必须为奇数 (default:9)
      $scope.myPage.pagesLength = parseInt(scope.myPage.pagesLength) ? parseInt(scope.myPage.pagesLength) : 9 ;
      if($scope.myPage.pagesLength % 2 === 0){
          // 如果不是奇数的时候处理一下
          scope.myPage.pagesLength = scope.myPage.pagesLength -1;
      }
      if(!scope.myPage.perPageOptions){
          scope.myPage.perPageOptions = [10, 15, 20];
      }
      scope.changeCurrentPage = function(p){
          if(p == '...'){
              return;
          }else{
              scope.myPage.currentPage = p;
              myPage.setPageNub(scope.myPage.currentPage);
          }
          getPagination(scope.siteListURL);
      };
      scope.prevPage = function(){
          if(scope.myPage.currentPage > 1){
              scope.myPage.currentPage -= 1;
          }else {
              scope.myPage.currentPage=1;
          }
          myPage.setPageNub(scope.myPage.currentPage);
          getPagination(scope.siteListURL);
      };
      // nextPage
      scope.nextPage = function(){
          if(scope.myPage.currentPage < scope.myPage.numberOfPages){
              scope.myPage.currentPage += 1;
          }else {
              scope.myPage.currentPage=scope.myPage.numberOfPages;
          }
          myPage.setPageNub(scope.myPage.currentPage);
          getPagination(scope.siteListURL)
      };

      // 跳转页
      scope.jumpToPage = function(){
          if(scope.myPage.jumpPageNum>0 || scope.myPage.jumpPageNum<=scope.myPage.numberOfPages){
              scope.myPage.currentPage=scope.myPage.jumpPageNum;
              myPage.setPageNub(scope.myPage.currentPage);
              getPagination(scope.siteListURL);
              //scope.myPage.jumpPageNum='';
          }else {
              scope.myPage.showError=true;
          }
      };
      // 修改每页显示的条数
      scope.changeItemsPerPage = function(){
          getPagination(scope.siteListURL);
      };
      getPagination(scope.siteListURL);

      function getPagination(url){
          $http.get(url
              ,{params:{"page":1,"limit":20}}).then(
              function (response)
              {
                  scope.names=response.data.data;

                  scope.myPage.totalItems=response.data.totalItems;//当获取总数据后，修改默认值
                  scope.myPage.currentPage = parseInt(myPage.pageNub);
                  // pg.totalItems
                  scope.myPage.totalItems = parseInt(scope.myPage.totalItems);

                  // numberOfPages,总共分多少页
                  scope.myPage.numberOfPages = Math.ceil(scope.myPage.totalItems/scope.myPage.itemsPerPage);
                  //console.info(scope.myPage.totalItems);
                  // judge currentPage > scope.numberOfPages
                  if(scope.myPage.currentPage < 1){
                      scope.myPage.currentPage = 1;
                  }

                  if(scope.myPage.currentPage > scope.myPage.numberOfPages){
                      scope.myPage.currentPage = scope.myPage.numberOfPages;
                  }

                  scope.pageList = [];
                  var i;
                  if(scope.myPage.numberOfPages <= scope.myPage.pagesLength){
                      // 判断总页数如果小于等于分页的长度，若小于则直接显示
                      for(i =1; i <= scope.myPage.numberOfPages; i++){
                          scope.pageList.push(i);
                      }
                  }else{
                      // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                      // 计算中心偏移量
                      var offset = (scope.myPage.pagesLength - 1)/2;
                      if(scope.myPage.currentPage <= offset){
                          // 左边没有...
                          for(i =1; i <= offset +1; i++){
                              scope.pageList.push(i);
                          }
                          scope.pageList.push('...');
                          scope.pageList.push(scope.myPage.numberOfPages);
                          //    >实际总页数-每页的一半
                      }else if(scope.myPage.currentPage > scope.myPage.numberOfPages - offset){
                          scope.pageList.push(1);
                          scope.pageList.push('...');
                          for(i = offset + 1; i >= 1; i--){
                              scope.pageList.push(scope.myPage.numberOfPages - i);
                          }
                          scope.pageList.push(scope.myPage.numberOfPages);
                      }else{
                          // 最后一种情况，两边都有...
                          scope.pageList.push(1);
                          scope.pageList.push('...');

                          for(i = Math.ceil(offset/2) ; i >= 1; i--){
                              scope.pageList.push(scope.myPage.currentPage - i);
                          }
                          scope.pageList.push(scope.myPage.currentPage);
                          for(i = 1; i <= offset/2; i++){
                              scope.pageList.push(scope.myPage.currentPage + i);
                          }

                          scope.pageList.push('...');
                          scope.pageList.push(scope.myPage.numberOfPages);
                      }
                  }
              }
          )
      }

  }

  query()
  {
      this.scope.deviceTip.productDate1 = document.getElementById("i1").value;
      this.scope.deviceTip.productDate2 = document.getElementById("i2").value;
      this.scope.deviceTip.useDate1= document.getElementById("i3").value;
      this.scope.deviceTip.useDate2= document.getElementById("i4").value;
      this.scope.deviceTip.lastCheckDate1= document.getElementById("i5").value;
      this.scope.deviceTip.lastCheckDate2= document.getElementById("i6").value;
      this.root.deviceTip=this.scope.deviceTip;
      this.root.searchDeviceURL='http://61.164.218.158:8080/AirServer/grafana/searchDevices';

      history.go(-1);
  }
}
DeviceQueryCtrl.templateUrl = 'public/plugins/grafana-example-app/components/deviceQuery.html';
import {inputDateDirective} from './input_date';
angular.module("grafana.directives").directive('inputDatetime', inputDateDirective);


