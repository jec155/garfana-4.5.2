
import {coreModule, appEvents} from  'app/core/core';
export class LogStreamPageCtrl
{
    constructor($scope,$http,$location,$rootScope,timeSrv)
    {
        this.root=$rootScope;

        this.location=$location;
        this.http=$http;
        this.selall=false;//全选标志
        this.checkedItems=[];
        //分页
        $scope.http=$http;
        $scope.URL=$rootScope.cityListUrl?$rootScope.cityListUrl:'http://61.164.218.158:8080/AirServer/grafanalogs/logListByPage';
        $scope.pageParams=$rootScope.cityTip?$rootScope.cityTip:{};
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
        console.info(moment(this.absolute.fromJs));
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
LogStreamPageCtrl.templateUrl = 'components/logList.html';



