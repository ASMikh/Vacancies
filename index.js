function getdata()
{
	var url='https://api.hh.ru/vacancies?per_page=50&page=1';
  $(function()
   {
	$('.list').html('');
    $.getJSON(url, function(data) 
       {
         console.log("load");
         //console.log(xhr.responseText); 
         var name,description,companyname,minsalary,maxsalary;
         for(var n=0; n<data.items.length; n++) 
          { 
           if (data.items[n].salary != null ) 
            { 
	         if (data.items[n].salary["from"]!= null ) minsalary=data.items[n].salary["from"]; else  minsalary='Не указана';
	         if (data.items[n].salary["to"]!= null ) maxsalary=data.items[n].salary["to"]; else  maxsalary='Не указана';
	        } 
	       else
	        {
	         minsalary='Не указана';
	         maxsalary='Не указана';
	        }
	       if (data.items[n].employer != null )
	        {
		     if (data.items[n].employer["name"] != null) companyname=data.items[n].employer["name"]; else companyname='Не указана';
	        }
	       else companyname='Не указана';
	       if (data.items[n].name != null) name=data.items[n].name ; else name='Не указана';
	       if (data.items[n].snippet != null)
	        {
	   	     if (data.items[n].snippet["responsibility"] != null ) description=data.items[n].snippet["responsibility"] ; else description=null;
			}
            $('.list').append('<div class="vacancies" id="vacancy'+n+'"></div>');
            $('#vacancy'+n).append('<div id="Name"><span class="horiz-flag noise"><h4>'+name+'</span></h4></div>');
            $('#vacancy'+n).append('<div id="Descriptions"><div id="Salary">Зарплата: <b id=SalaryMin>'+minsalary+'</b>-<b id=SalaryMax>'+maxsalary+'</b><div><div id="Company">Компания: '+companyname+'</div><div id="Description">Обязанности: '+description+'</div></div>');
           }
        });
    });

}
function FindbyWords()
{
$(function()
{
 console.log("start found");
//$('div.vacancies ').css('display', 'none');
//console.log($('#keywords').val());
//$('div.vacancies:contains("' + $('#keywords').val() + '")').css('display', 'block');
//console.log($( "div.vacancies" ).find("#SalaryMin").html());
//$( "div.vacancies" )
//    .hide()
//    .filter(function(elem){
//		//console.log("start");
//		console.log($(this).find("#SalaryMin").html());
//      return parseInt($(this).find("#SalaryMin").html())>= $('#minsalary').val()  && parseInt($(this).find("#SalaryMax").html())<= $('#maxsalary').val();
//    })
//    .show();
	$('div.vacancies ').hide()
	$('div.vacancies:contains("' + $('#keywords').val() + '")')
    .filter(function(elem){
		//console.log("start");
		console.log($(this).find("#SalaryMin").html());
        return parseInt($(this).find("#SalaryMin").html())>= $('#minsalary').val()  && parseInt($(this).find("#SalaryMax").html())<= $('#maxsalary').val();
    })
    .show();

});
}