var getUrl = window.location;
var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

$(document).ready(function(){
	function saveMysql(){
		var deffered = $.Deferred();
        $.ajax({
            url: getUrl + "/../../tangkapan-data/saveMysql",
            method: "POST",
            dataType: "JSON",
            data: {_csrf: yii.getCsrfToken()}

        }).done(deffered.resolve).fail(deffered.reject);
        return deffered.promise();
	}

	function saveES(){
		var deffered = $.Deferred();
        $.ajax({
            url: getUrl + "/../../tangkapan-data/saveES",
            method: "POST",
            dataType: "JSON",
            data: {_csrf: yii.getCsrfToken()}

        }).done(deffered.resolve).fail(deffered.reject);
        return deffered.promise();
	}

	$("#btnSave").on('click',function(){
		//kalau nk return data dari saveMysql ke saveES guna d
		var d = null;
		saveMysql()
			.then(function(data){
				//data dari ajax done saveMysql
				d=data;
			},function(){
				//cni untuk fail
			})
			.then(function(){
				saveEs(d).then(function(data){
					alert(data);
				})
			},function(){
				//cni untuk fail
			})
			/*example then, func1 = done, func2 = fail, func 3 = progress .
			fail & progress is optional
			example: 
			.then(function(){},function(){},function(){});*/
	});
});