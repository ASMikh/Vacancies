var arr=[];//массив куда будем записывать данные при получении данных 
var positiveArr=[];//массив для хранения обработанных данных(например, отфильтрованных)
function FilterVacancies()
 {
  $("#index2").html(1);
  Filter();
  generateListVacancies();
  getChart();
  initMap();
  countVacancies();
  pagination(0,colVacancies);	 
 }
function Filter()
 {
  positiveArr = arr.filter(function(number) 
   {
     var bool=false,bool1=false,bool2=false,bool3=false,bool4=false;
     if (($('#keywords').val()=='Зарплата') ||($('#keywords').val()=='Компания') || ($('#keywords').val()=='Обязанности')|| $('#keywords').val().length==0) bool=true;
     if ($('#keywords').val().length>0)
	  {
	   var x=number.slice(0,1)[0].toString();
	   if (x.indexOf($('#keywords').val())>=0) bool=true;
	   if (number.slice(3,4)[0]!=null) x=number.slice(3,4)[0].toString();
	   if (x.indexOf($('#keywords').val())>=0) bool=true;
	   if (number.slice(4,5)[0]!=null) x=number.slice(4,5)[0].toString();
	   if (x.indexOf($('#keywords').val())>=0) bool=true;
	  }
	 else bool=true;
	 if($('#minsalary').val().length>0)
	  {
	   if (parseInt(number.slice(1,2))>= $('#minsalary').val()) bool1=true; else bool1=false;
	  }
	 else  bool1=true;
	 if($('#maxsalary').val().length>0)
	  {
	   if (parseInt(number.slice(2,3))<= $('#maxsalary').val()) bool2=true; else bool2=false;	
	  } 
	else  bool2=true;
	//
	 if ($('#Сompanylist').val().length>0)
	  {
	   if ($('#Сompanylist').val()=="All")bool3=true;
	   var x=number.slice(4,5)[0].toString();
	   if (x.indexOf($('#Сompanylist').val())>=0) bool3=true;
	  }
	 else bool3=true;
	 if (checkBox.checked)
      {
	   console.log("Yes");
       var bl=true,bl1=true;
	   if (number.slice(1,2)[0]) console.log("t1");else  bl=false;
	   if (number.slice(2,3)[0]) console.log("t1");else  bl1=false;
       bool4= bl || bl1;
      } else bool4=true;

    return bool && bool1 && bool2 && bool3 && bool4;
   });
}
function getData()//Функция получает Json данные и записывает в массив
{
 $.getJSON(getUrl(), function(data) 
  { 
   for(var n=0; n<data.items.length; n++) 
    {
     var name,description,companyname,minsalary,maxsalary,lat,lon;
	 if (data.items[n].address!= null) 
	  {
	   if (data.items[n].address["lat"]!= null) lat=data.items[n].address["lat"]; 
	   if (data.items[n].address["lng"]!= null) lon=data.items[n].address["lng"]; 
	  }
	 else
	  {
	   lat=null;
	   lon=null;
	  }
     if (data.items[n].salary != null ) 
      { 
	   if (data.items[n].salary["from"]!= null ) minsalary=data.items[n].salary["from"]; 
	   if (data.items[n].salary["to"]!= null ) maxsalary=data.items[n].salary["to"]; 
	  } 
	 else 
	  {
	   minsalary=null;
	   maxsalary=null
	  }
	 if (data.items[n].employer != null )
	  {
	   if (data.items[n].employer["name"] != null) companyname=data.items[n].employer["name"]; 
	  }
     else  companyname=null;
	 if (data.items[n].name != null) name=data.items[n].name ;
	 if (data.items[n].snippet != null)
	  {
	   if (data.items[n].snippet["responsibility"] != null ) description=data.items[n].snippet["responsibility"] ; 
	  }
	 else description=null;
	 //проверяем если в данных перепутаны minsalary и maxsalary
	 if (parseInt(minsalary)>parseInt(maxsalary)) arr.push([name,maxsalary,minsalary,description,companyname,lat,lon]);
	 else arr.push([name,minsalary,maxsalary,description,companyname,lat,lon]);
	
	} 
   $("#index2").html(1);
   positiveArr=arr;
   generateListVacancies();
   getChart();
   initMap();
   CompanyforSelect();
   countVacancies();
   pagination(0,colVacancies);
   DownloadData();   
  });
     
}
///////////////////////////////////////////////
function Plotchart1(type)
{
 var named=[],minrub=[]
 for(var i=0;i<positiveArr.length;i++)
  {
   if (positiveArr[i].slice(1,2)[0])
	{
	 named.push(positiveArr[i].slice(0,1));
	 minrub.push(positiveArr[i].slice(1,2));
	}
  } 
  Chart(named, minrub,type);	
}
function Plotchart2(type)
{
 var named=[],maxrub=[];  
 for(var i=0;i<positiveArr.length;i++)
  {
   if (positiveArr[i].slice(2,3)[0])
	{
	 named.push(positiveArr[i].slice(0,1));
	 maxrub.push(positiveArr[i].slice(2,3));
	}
  }
 Chart(named, maxrub,type);	 
}
function Plotchart3(type)
{
  var countvacancies=[];
  var companylist=getCompany();
   for (var j=0;j<companylist.length;j++)
	 {
      countvacancies[j]=0;
	  for(var i=0;i<positiveArr.length;i++)
	   { 
	    if ((positiveArr[i].slice(4,5))&&(positiveArr[i].slice(4,5)[0]==companylist[j]))
	     {		  
	      countvacancies[j]=countvacancies[j]+1;
	     }
       }
	 }
	Chart(companylist,countvacancies,type);	
}
function Plotchart4(type)
{
	 var countvacancies=[];
	 let sum;
	 var sumvacancies=[];
	 var companylist=getCompany();
	 for (var j=0;j<companylist.length;j++)
	 {
	  sumvacancies[j]=0;
      countvacancies[j]=0;
	  sum=0;
	  var x=0;
	  for(var i=0;i<positiveArr.length;i++)
	   { 
        if ((positiveArr[i].slice(1,2)[0])&&(positiveArr[i].slice(4,5)[0]==companylist[j]))
	     {
		  sum=sum+parseInt(positiveArr[i].slice(1,2)[0]);
          x++;
	     }
	    if ((positiveArr[i].slice(2,3)[0])&&(positiveArr[i].slice(4,5)[0]==companylist[j]))
	     {
		  sum=sum+parseInt(positiveArr[i].slice(2,3)[0]);
		  x++;
		 } 
       }
	  sumvacancies[j]=sum / x;
	  if (x!=0) sumvacancies.push(sum/x);
	  else sumvacancies.push(0);
	 }
	 var company1= [].concat(companylist);
	 Chart(company1,sumvacancies,type);	
}

///////////////////////////////////////////////
//Функция подготавливает данные и строит график
function getChart()
 {
  var named=[],minrub=[],maxrub=[];
  var type=$('#charts2').val();
  if ($('#charts').val().length>0)
   {
    if ($('#charts').val()=="0") Plotchart1(type);
    if ($('#charts').val()=="1") Plotchart2(type);
    if ($('#charts').val()=="2") Plotchart3(type);
    if ($('#charts').val()=="3") Plotchart4(type); 
   }
  }
//Функция формирует список вакансий на экране
function generateListVacancies()
 {
  $("div.list").empty() ;//очищаем список вакансий на экране
  if (positiveArr.length<1)  $('.list').append('<div class="message" id="notfound">По вашему запросу ничего не найдено</div>');
  else
   { //формируем список на основе данных из массива positiveArr
    var x=positiveArr.length;
    for(var i=0;i<x;i++)
	{ //для удобства используем массив description(в него загружаем данные из positiveArr (null заменяем на 'Не указано' )
	 var description=[];
	 for(var j=0;j<5;j++) if (positiveArr[i].slice(j,j+1)[0]) description.push(positiveArr[i].slice(j,j+1)[0]);else description.push('Не указано');
	 var title=description[0];
	 if (description[0].length>47) description[0]=description[0].substring(0,47)+"..."; //если длина названия вакансии слишком большая,то ее обрезаем..
	 $('.list').append('<div class="vacancies" id="vacancy'+i+'"></div>');
     $('#vacancy'+i).append('<div id="Name"><span class="horiz-flag noise"><h4 title="'+title+'">'+description[0]+'</span></h4></div>');
     $('#vacancy'+i).append('<div id="Descriptions"><div id="Salary">Зарплата: <b id=SalaryMin>'+description[1]+'</b> - <b id=SalaryMax>'+description[2]+'</b><div><div id="Company">Компания: '+description[4]+'</div><div id="Description">Обязанности: '+description[3]+'</div></div>');
	}
   }
 }
//функция отправляет get запрос и возвращает url ссылку
//данные  из внешнего файла connect.json
function getUrl()
 {
  var url=[];
  var url1,url2="";
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'connect.json', true);
  xhr.send();
  //если мы не получили ссылку из json по какой-то причине, то будем возвращать ссылку на сервис hh.ru
  if (xhr.status != 200) return 'https://api.hh.ru/vacancies?per_page=50&page=1&order_by=publication_time&area=43'; 
  else 
  {
   url=JSON.parse(xhr.responseText) ;
   for(var i in url) 
   {
	if(i=="url") url1=url[i]+'?';
	else url2+=i+'='+url[i]+'&';		
   }		
  }	  
  return url1+url2.substring(0,url2.length-1);
}
 function countVacancies()
 {
  $("#index2").html(1);
  var sel = document.getElementById("blacklist"); // Получаем наш список
  console.log(sel.options[sel.selectedIndex].value);
  if (sel.options[sel.selectedIndex].value=="All")
   {
	colVacancies=positiveArr.length
   }
  else
  colVacancies = sel.options[sel.selectedIndex].value; // Получаем значение выделенного элемента (в нашем случае fruit2).
  pagination(0,colVacancies);	
 }
function getCompany()
 {
  var company=[];
  for(var i=0;i<positiveArr.length;i++)
   {//проверяем есть ли у вакансии минимальная или максимальная зарплата(иначе нет смысла выводить на график!)
    if ((positiveArr[i].slice(4,5)[0]))
     {
	  company.push(positiveArr[i].slice(4,5));
     }
   }
  return unique(company);
}
function CompanyforSelect()
 {
  var company=getCompany()
  var options = $.map(company, function(item) 
   {
    return new Option(item);
   });
  $("#Сompanylist").append(options);
}
function unique(arr) 
{
 var obj = {};
 for (var i = 0; i < arr.length; i++) 
  {
   var str = arr[i];
   obj[str] = true; // запомнить строку в виде свойства объекта
  }
  return Object.keys(obj); // или собрать ключи перебором для IE8-
}
function DownloadData()
{ var type = 'data:application/json;';
  console.log(JSON.stringify(positiveArr));
  var text = JSON.stringify(positiveArr);
  var base = text;
  var res = type + base;
   console.log(res);
  document.getElementById('test').href = res;
}


 