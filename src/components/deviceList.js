
export class DeviceStreamPageCtrl
{
    constructor($scope,$http,$location,$rootScope)
    {
        this.root=$rootScope;

        this.location=$location;
        this.http=$http;
        $scope.http=$http;
        this.selall=false;//全选标志
        this.checkedItems=[];
        $scope.URL=$rootScope.searchDeviceURL?$rootScope.searchDeviceURL
                        :'http://61.164.218.158:8080/AirServer/grafana/deivceListByPage';
        $scope.pageParams=$rootScope.deviceTip?$rootScope.deviceTip:{

        };
        $scope.monTypeMap = {
                        'AIR':'空气质量',
                        'WATER':'水环境',
                        'MULTI':'多功能'
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
    deleteDevice(item)
    {   //alert(item.id);
        if(confirm('确定删除此项?'))
        {
            $.ajax({
                type: 'POST',
                url: 'http://61.164.218.158:8080/AirServer/grafana/deleteDeviceByID',
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
    deleteSelDevices()
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
                url: 'http://61.164.218.158:8080/AirServer/grafana/deleteSelDevices',
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
DeviceStreamPageCtrl.templateUrl = 'components/deviceList.html';


