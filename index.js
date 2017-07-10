var arr=[];
var positiveArr=[];
function getdata()
{
	var url='https://api.hh.ru/vacancies?per_page=50&page=1&order_by=publication_time&area=43';
  $(function()
   {
	
	$('.list').html('');
    $.getJSON(url, function(data) 
       { 
         var name,description,companyname,minsalary,maxsalary,lat,lon;
         for(var n=0; n<data.items.length; n++) 
          { 
	       if (data.items[n].address!= null) 
		    {
				if (data.items[n].address["lat"]!= null) lat=data.items[n].address["lat"]; else lat=null;
				if (data.items[n].address["lng"]!= null) lon=data.items[n].address["lng"]; else lon=null;
		    }
			else {lat=null;lon=null;}
           if (data.items[n].salary != null ) 
            { 
	         if (data.items[n].salary["from"]!= null ) minsalary=data.items[n].salary["from"]; else  minsalary=null;
	         if (data.items[n].salary["to"]!= null ) maxsalary=data.items[n].salary["to"]; else  maxsalary=null;
	        } 
	       else
	        {
	         minsalary=null;
	         maxsalary=null;
	        }
	       if (data.items[n].employer != null )
	        {
		     if (data.items[n].employer["name"] != null) companyname=data.items[n].employer["name"]; else companyname=null;
	        }
	       else companyname=null;
	       if (data.items[n].name != null) name=data.items[n].name ; else name=null;
	       if (data.items[n].snippet != null)
	        {
	   	     if (data.items[n].snippet["responsibility"] != null ) description=data.items[n].snippet["responsibility"] ; else description=null;
			}
			
			if (minsalary!=null || maxsalary!=null )
			{
			var x=[name,minsalary,maxsalary,description,companyname,lat,lon]
			arr.push(x);
			}
			if  (minsalary==null)   minsalary='не указано';
			if  (maxsalary==null)   maxsalary='не указано';
			if  (companyname==null) companyname='не указано';
			if  (description==null) description='не указано';
			if  (name==null)        name='не указано';
            $('.list').append('<div class="vacancies" id="vacancy'+n+'"></div>');
            $('#vacancy'+n).append('<div id="Name"><span class="horiz-flag noise"><h4>'+name+'</span></h4></div>');
            $('#vacancy'+n).append('<div id="Descriptions"><div id="Salary">Зарплата: <b id=SalaryMin>'+minsalary+'</b>-<b id=SalaryMax>'+maxsalary+'</b><div><div id="Company">Компания: '+companyname+'</div><div id="Description">Обязанности: '+description+'</div></div>');
           }
		   var named=[];
           var minrub=[];
           var maxrub=[];
			for(var i=0;i<arr.length;i++){
				named.push(arr[i].slice(0,1));
				minrub.push(arr[i].slice(1,2));
				maxrub.push(arr[i].slice(2,3));
				//console.log(i+"-"+arr[i].slice(0,1));
			}
		 positiveArr=arr;
		 pagination(0,5);
//////////////////////////
Highcharts.chart('chart', {   
  subtitle : {
  text: 'Данные взяты с сайта hh.ru'
  },
  xAxis :{
   categories: named,
   title: {
      text: 'Список организаций'
   },
},
yAxis : {
   title: {
      text: 'Зарплата в рублях'
   },
   plotLines: [{
      value: 0,
      width: 1,
      color: '#808080'
   }]
},  
  series: [{
            type: 'column',
            name: 'Минимальная зарплата',
            data: minrub
        },{
            type: 'column',
            name: 'Максимальная зарплата',
            data: maxrub
        }]
  
  }	);
//////////////////////////////////////////////////
//Google Map Function]
initMap();
/////////////////////////////////////////////////
        });
   });
}

function FindbyWords()
{
$(function()
{
    console.log("start found");
	$('div.vacancies ').hide()
	$('div.vacancies:contains("' + $('#keywords').val() + '")')
    .filter(function(elem){
		var bool3=false;
		if($('#minsalary').val().length>0)
		{
		if (parseInt($(this).find("#SalaryMin").html())>= $('#minsalary').val()) bool3=true; else bool3=false;
		}
		else  bool3=true;
		var bool4=false;
		if($('#maxsalary').val().length>0)
		{
		if (parseInt($(this).find("#SalaryMax").html())<= $('#maxsalary').val()) bool4=true; else bool4=false;	
		} 
		else  bool4=true;
        return bool3 && bool4;
    })
    .show();
	positiveArr = arr.filter(function(number) {
		var bool=false;
		if (($('#keywords').val()=='Зарплата') ||($('#keywords').val()=='Компания') || ($('#keywords').val()=='Обязанности')|| $('#keywords').val().length==0) bool=true;
		if ($('#keywords').val().length>0)
		{
			var x=number.slice(0,1)[0].toString();
		    if (x.indexOf($('#keywords').val())>=0) bool=true;
			//
			if (number.slice(3,4)[0]!=null) x=number.slice(3,4)[0].toString();
		    if (x.indexOf($('#keywords').val())>=0) bool=true;
			//
			if (number.slice(4,5)[0]!=null) x=number.slice(4,5)[0].toString();
		    if (x.indexOf($('#keywords').val())>=0) bool=true;
		}
		else bool=true;
		var bool1=false;
		if($('#minsalary').val().length>0)
		{
		if (parseInt(number.slice(1,2))>= $('#minsalary').val()) bool1=true; else bool1=false;
		}
		else  bool1=true;
		var bool2=false;
		if($('#maxsalary').val().length>0)
		{
		if (parseInt(number.slice(2,3))<= $('#maxsalary').val()) bool2=true; else bool2=false;	
		} 
		else  bool2=true;
    return bool && bool1 && bool2;
   });
    var named=[];
    var minrub=[];
    var maxrub=[];
    for(var i=0;i<positiveArr.length;i++)
	{
		console.log(positiveArr.length);
	named.push(positiveArr[i].slice(0,1));
	minrub.push(positiveArr[i].slice(1,2));
	maxrub.push(positiveArr[i].slice(2,3));
	//console.log(i+"-"+arr[i].slice(0,1));
    }
//////////////////////////
Highcharts.chart('chart', {   
  subtitle : {
  text: 'Данные взяты с сайта hh.ru'
  },
  xAxis :{
   categories: named,
   title: {
      text: 'Список организаций'
   },
},
yAxis : {
   title: {
      text: 'Зарплата в рублях'
   },
   plotLines: [{
      value: 0,
      width: 1,
      color: '#808080'
   }]
},  
  series: [{
            type: 'column',
            name: 'Минимальная зарплата',
            data: minrub
        },{
            type: 'column',
            name: 'Максимальная зарплата',
            data: maxrub
        }]
  
  }	);

//////////////////////////////////////////////////
//Google Map Function]
initMap();
/////////////////////////////////////////////////
});
}
