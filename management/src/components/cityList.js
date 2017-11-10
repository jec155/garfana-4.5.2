import {baseURL} from "./common/constVal";
export class CityListCtrl
{
    constructor($scope,$http,$location,$rootScope)
    {
        this.root=$rootScope;
        this.location=$location;
        this.http=$http;
        $scope.http=$http;
        this.selall=false;//全选标志
        this.checkedItems=[];
        $scope.URL=$rootScope.cityListUrl?$rootScope.cityListUrl:baseURL+'cityListByPage';
        $scope.pageParams=$rootScope.cityTip?$rootScope.cityTip:{
            cityName:'',cityPingyin:'',
            province:'',country:''
        };
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
    absoluteFromChanged()
    {
        this.from=moment().utc(this.absolute.fromJs);
    }
    deleteCity(item)
    {
        if(confirm('确定删除此项?'))
        {
            $.ajax({
                type: 'POST',
                url: baseURL+'deleteCityByID',
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
                url: baseURL+'deleteSelCities',
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
CityListCtrl.templateUrl = 'components/cityList.html';



