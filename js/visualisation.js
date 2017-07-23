function initMap() 
{
 var centerLatLng = new google.maps.LatLng(54.507014, 36.252277);
 var mapOptions = 
  {
   center: centerLatLng,
   zoom: 10
  };
 map = new google.maps.Map(document.getElementById("map"), mapOptions);
 // Создаем объект информационного окна и помещаем его в переменную infoWindow
 // Так как у каждого информационного окна свое содержимое, то создаем пустой объект, без передачи ему параметра content
 infoWindow = new google.maps.InfoWindow();
 // Отслеживаем клик в любом месте карты
 google.maps.event.addListener(map, "click", function() 
  {
   infoWindow.close();//- закрываем информационное окно.
  });
 // Перебираем в цикле все координата хранящиеся в positiveArr
 for (var i = 0; i < positiveArr.length; i++)
 {
  if (positiveArr[i].slice(5,6)[0]!=null && positiveArr[i].slice(6,7)[0]!=null)
   {
    var latLng = new google.maps.LatLng(positiveArr[i].slice(5,6)[0], positiveArr[i].slice(6,7)[0]);
    var name = positiveArr[i].slice(0,1)[0];
    var description =positiveArr[i].slice(3,4)[0];
    addMarker(latLng, name, description);// Добавляем маркер с информационным окном
   }
 } 
}
// Функция добавления маркера с информационным окном
function addMarker(latLng, name, description) 
 {
  var marker = new google.maps.Marker(
    {
        position: latLng,
        map: map,
        title: name
    });
  google.maps.event.addListener(marker, "click", function() 
   {
    var contentString = '<div class="infowindow">';
	for(var i=0;i<positiveArr.length;i++)
     {
      //для удобства используем массив description(в него загружаем данные из positiveArr (null заменяем на 'Не указано' )
	  var description=[];
	  for(var j=0;j<7;j++) if (positiveArr[i].slice(j,j+1)[0]) description.push(positiveArr[i].slice(j,j+1)[0]);else description.push('Не указано');
	  if (description[5]==latLng.lat().toFixed(6) && description[6]==latLng.lng().toFixed(6)) contentString+='<h3>'+description[0]+'</h3>'+'<div>Зарплата: <b id=SalaryMin>'+description[1]+'</b> - <b id=SalaryMax>'+description[2]+'</b><div><div id="Company">Компания: '+description[3]+'</div><div id="Description">Обязанности: '+description[4]+'</div></div>'
     }
    contentString+='</div>'
    // Меняем содержимое информационного окна
    infoWindow.setContent(contentString);
    // Показываем информационное окно
    infoWindow.open(map, marker);
   });
 }
 //функция построения графика
function Chart(named,minrub,maxrub)
 {
  Highcharts.chart('chart', { 
  title:{text: 'График зарплат по вакансиям'}, 
  subtitle : { text: 'Данные взяты с сайта hh.ru'},
  xAxis :{ categories: named,
   title:{ text: 'Список организаций'},},
  yAxis :{title: {text: 'Зарплата в рублях'},
   plotLines: [{value: 0,width: 1,color: '#808080' }]
  },  
  series:[{type: 'column',name: 'Минимальная зарплата',data: minrub},
	{type: 'column',name: 'Максимальная зарплата',data: maxrub }]
 });}