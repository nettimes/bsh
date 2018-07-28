var bs = {};
bs.project = {};
bs.estate = {};
bs.building = {};
bs.unit = {};
bs.house = {};
bs.assess = {};
bs.lease = {};
bs.auth = {};
bs.sign = {};
bs.estatetype={"1":"公寓", "2":"别墅", "3":"写字楼", "4":"住宅底商", "5":"商场"};
bs.propertyrighttype={"1":"商品房", "2":"已购公有住房", "3":"经济适用住房", "4":"限价商品住房", "5":"自住型商品住房", "6":"其他"};
bs.buildingtype = {"1":"高层", "2":"多层", "3":"低层"};
bs.buildingstructure = {"1":"钢混", "2":"混合", "3":"砖木"};
bs.housestructure = {"1":"平层", "2":"错层","3":"跃层", "4":"复式"};
bs.commercialstatus = {"1":"百货公司", "2":"超级市场", "3":"专业市场", "4":"大型娱乐设施", "5":"金融中介", "6":"餐饮", "7":"综合零售", "8":"休闲养生", "9":"生活服务", "10":"住宿"};
bs.housetype ={"1":"公寓", "2":"新公房", "3":"旧公房", "4":"商场", "5":"店铺", "6":"办公楼", "7":"工厂", "8":"简屋", "9":"搭建", "10":"车棚", "11":"泵房"};
bs.streetfrontage={"1":"内街", "2":"外街","3":"内部不临街"};
bs.ajaxfuncURL = function (url,restData,token,callback) {
	$.ajax({
		url: 'http://rms.shbrea.com:720/parkson/parkson/'+url,
		headers: {
			'token': token
		},
		type: 'post',
		data: restData,
		contentType: 'application/json',
		success: function (res) {
			callback(res);
		},
		error: function( jqXhr, textStatus, errorThrown ){
			if(jqXhr.status==400){
				bs.logout();
			}
			if(jqXhr.status==500){
				console.log(jqXhr.responseJSON.error);
				if(jqXhr.responseJSON.path=="/parkson/parkson/project/search"){
					location.href="sorry.html";
				}
			}
		}
	});
};
bs.logout = function () {
    localStorage.setItem("auth","");
    bs.ajaxfuncURL ('login/out',bs.sign, bs.auth.data.token, cb);
    function cb(res){
        //console.log(res);
    }
    location.href="index.html";
}
bs.checkAuth = function (){
	try {
        bs.auth = JSON.parse(localStorage.getItem("auth"));
    }catch(err){
        location.href="index.html";
    }
    $("#username").text(bs.auth.data.user.username);
    bs.sign = JSON.stringify({"token":bs.auth.data.token,"roleId":""});

}
bs.formatDate = function (d){
	//return d;
	d = new Date(d );
    return  d.getFullYear() + "-" + (d.getMonth() + 1) + "-"+d.getDate();
}
bs.loadProject =function (){
	bs.ajaxfuncURL ('project/show',bs.sign, bs.auth.data.token,cbpj);
	function cbest(res){
		//var list = res.data.estateList;
		var new_object = $.extend({}, res.data.estateList[0], res.data.estateAssessmentList[0]);
		var list = [new_object];
		$( "#est_item" ).tmpl( list ).appendTo( "#estate_list" );
		//console.log(list);
	}
	function cbpj(res){
		bs.project = res.data.pList;
		bs.project.map(bs.formatDate);
		$( "#pjtmpl_left" ).tmpl( bs.project ).appendTo( "#pjlist" );
		if($( "#pjinfo" ).length>0) $( "#pjinfo" ).tmpl( bs.project[0] ).appendTo( "#pjInfo" );
		if($( "#est_item" ).length>0) $( "#est_item" ).tmpl( res.data.assmentInfos ).appendTo( "#estate_list" );
		//req = JSON.stringify({"token":bs.auth.data.token,"roleId":bs.project[0].roleId,"pjId":bs.project[0].id});
		//bs.ajaxfuncURL ('estate/show',req,bs.auth.data.token,cbest);
		//cbest(res);
		var houseid = $.urlParam('id');
		if(houseid.length>0){
			var roleid = $(".pji:first").attr("data-role");
			req = JSON.stringify({"token":bs.auth.data.token,"roleId":roleid,"id":houseid});
			bs.ajaxfuncURL ('estate/show',req, bs.auth.data.token, cbestate);
		}
		function cbestate(res){
			var merged = $.extend({}, res.data.estate, res.data.zones);
			merged.estateType = (bs.estatetype[merged.estateType]);			
			$( "#estate_detail" ).tmpl( merged ).appendTo( "#tab_estate" );

			var building = res.data.building;
			building.propertyRightType = bs.propertyrighttype[building.propertyRightType];
			building.buildingType = bs.buildingtype[building.buildingType];
			building.buildingStructure = bs.buildingstructure[building.buildingStructure];
			$( "#building_detail" ).tmpl( building ).appendTo( "#tab_building" );
			$( "#unit_detail" ).tmpl( res.data.units ).appendTo( "#tab_unit" );

			var house= res.data.house;
			house.houseStructure=bs.housestructure[house.houseStructure];
			house.commercialStatus=bs.housestructure[house.commercialStatus];
			house.houseType=bs.housestructure[house.houseType];
			house.streetFrontage=bs.housestructure[house.streetFrontage];
			$( "#house_detail" ).tmpl( house ).appendTo( "#tab_house" );
			$( "#assess_detail" ).tmpl( res.data.houseAssessment ).appendTo( "#tab_assess" );
			$( "#lease_detail" ).tmpl( res.data.leases ).appendTo( "#tab_lease" );
		}
	}
}
/*get request params from url*/
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.search);
    return (results !== null) ? results[1] || 0 : false;
}
/*form validate*/ 
bsValidate = function (f,b) {	
	var empty = false;
	f.each(function() {
		if ($(this).val() == '') {
			empty = true;
		}
	});
	if (empty) {
		b.attr('disabled', true);
	} else {
		b.attr('disabled', false).css({"background":"#3f517d"});
	}	
}