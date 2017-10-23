
export class SiteStreamPageCtrl
{
    constructor($scope,$http,$location,$rootScope)
    {
        this.root=$rootScope;

        this.location=$location;
        this.http=$http;
        $scope.http=$http;
        this.selall=false;//全选标志
        this.checkedItems=[];
        $scope.URL=$rootScope.cityListUrl?$rootScope.cityListUrl:'http://61.164.218.158:8080/AirServer/grafana/siteListByPage';
        $scope.pageParams=$rootScope.siteTip?$rootScope.siteTip:{

        };
        $scope.siteMonTypeMap = {
            "1" : "空气质量",
            "2" : "空气污染重点企业",
            "3" : "饮用水水质",
            "4" : "污水水质",
            "5" : "水污染重点企业",
            "6" : "主要流域重点断面水质"
        };
        $scope.siteTypeMap = {
            "PUBLIC" : "公有站点",
            "PRIVATE" : "私有站点"
        };
        $scope.statusMap = {
            "SITE_NORMAL" : "正常",
            "SITE_DISABLE" : "停用",
            "SITE_ERROR" : "异常"
        }
    }
    selectAll(all,names)
    {
        all? Object.assign(this.checkedItems, names):this.checkedItems.splice(0,this.checkedItems.length);
        //console.info(this.checkedItems);
    }
    updateSelection(event,x,ctrl)
    {
        var item=event.target;

        item.checked?ctrl.checkedItems.push(x):ctrl.checkedItems.splice(x,1);

    }
    deleteCity(item)
    {
        if(confirm('确定删除此项?'))
        {
            $.ajax({
                type: 'POST',
                url: 'http://61.164.218.158:8080/AirServer/grafana/deleteCityByID',
                //'http://127.0.0.1:8080/grafana/addCity',
                data: {id:item.id},
                dataType:'json',
                success:function (da)
                {
                    location.reload();
                    alert('删除成功');
                },
                error:function (re) {
                    console.info(re);
                }
            });
        }

    }
    deleteSelCities()
    {
        if(confirm('确定删除选中项目?'))
        {
            var ids=[];
            for(let i=0;i<this.checkedItems.length;i++)
            {
                ids.push(this.checkedItems[i].id);
            }

            $.ajax({
                type: 'POST',
                traditional: true,
                url: 'http://61.164.218.158:8080/AirServer/grafana/deleteSelCities',
               // 'http://127.0.0.1:8080/grafana/deleteSelCities',
                data: {ids:ids},
                success:function (da)
                {
                    location.reload();
                    alert('删除成功');
                },
                error:function (re) {
                    console.info(re.responseText);
                }
            });
        }
    }
    setModel(item)
    {
        this.root.cityModel=item;
    }

    link(scope, elem, attrs, ctrl)
    {

    }
}
SiteStreamPageCtrl.templateUrl = 'components/siteList.html';


