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
  if (n1+5>=$("div.vacancies").length) 
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
  pagination((n)*5,(n+1)*5);
 }
function prevlist()
 {
  var n = parseInt($('#index2').html());
  $("#index2").html(n-1);
  pagination((n-2)*5,(n-1)*5);
 }