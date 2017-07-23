var colVacancies;
 function pagination(n1,n2)
 {

  //скрываем все вакансии
  $("div.vacancies").hide();
  //отображаем выбранные вакансии
  $("div.vacancies").slice(n1,n2).show();
  //если пользователь на первой странице то необходимо заблокировать кнопку предыдущая страница
  if (parseInt($('#index2').html())==1) 
   {
    $("#prev").prop("disabled", true);
    $('#prev').css("visibility", "hidden");
   }
  else 
   {
    if ($("#prev").prop("disabled", true)) 
	 {
      $("#prev").prop("disabled", false);
      $('#prev').css("visibility", "visible");
	 }
   }
  //если пользователь на последней странице то необходимо заблокировать кнопку следующая страница
  if (n1+parseInt(colVacancies)>=$("div.vacancies").length) 
   {
    $("#next").prop("disabled", true);
	$('#next').css("visibility", "hidden");
   }
  else 
   {
    if ($("#next").prop("disabled", true))
	 {		
      $("#next").prop("disabled", false);
      $('#next').css("visibility", "visible");
	 }
   }
   //если результата запроса нет, то необходимо заблокировать дву кнопки
   if(positiveArr.length<1)
   {
	$("#next").prop("disabled", true);
	$('#next').css("visibility", "hidden");
	$("#prev").prop("disabled", true);
    $('#prev').css("visibility", "hidden");
   }
 }
function nextlist()
 {
  var n = parseInt($('#index2').html());
  $("#index2").html(n+1);
  pagination((n)*colVacancies,(n+1)*colVacancies);
 }
function prevlist()
 {
  var n = parseInt($('#index2').html());
  $("#index2").html(n-1);
  pagination((n-2)*colVacancies,(n-1)* colVacancies);
 }
 function countVacancies()
 {
  $("#index2").html(1);
  var sel = document.getElementById("blacklist"); // Получаем наш список
  console.log(sel.options[sel.selectedIndex].value);
  if (sel.options[sel.selectedIndex].value=="All")
  {
	 console.log();
	 colVacancies=positiveArr.length
  }
  else
  colVacancies = sel.options[sel.selectedIndex].value; // Получаем значение выделенного элемента (в нашем случае fruit2).
  //colVacancies = document.getElementById("blacklist").options.selectedIndex;
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
  var options = $.map(unique(company), function(item) 
  {
   return new Option(item);
  });
  console.log("Company");
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


 