// mapboxgl.accessToken = 'pk.eyJ1IjoicmFraGkyMjA3IiwiYSI6ImNsZWNvd2RzZDAwZ3QzcnBodXduMjI0Zm4ifQ.M8IVXBJ9TetScihLa7yXRA';
// let cl=document.location.href;
// let url=(new URL(cl)).searchParams;

// async function getCoordinates(area)
// {
//   const conversionAPI=await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${area}.json?access_token=pk.eyJ1IjoicmFraGkyMjA3IiwiYSI6ImNsZWNvd2RzZDAwZ3QzcnBodXduMjI0Zm4ifQ.M8IVXBJ9TetScihLa7yXRA`)

//   const obj=await conversionAPI.json()
//   let coordinates=obj.features[0].center
//   return coordinates;
// }

// async function addBlock(areaValue,dateValue)
// {
//     let data=await getData(areaValue,dateValue);    
//     if(data.State===null)
//     {
//         alert("Data Not Avaialble")
//         return ;
//     }
//     let mainDiv=document.getElementsByTagName('body')[0];

//     let addDiv=document.createElement('div');
//     addDiv.classList.add('addDiv')
//     let h3=document.createElement('h3')
//     h3.innerText=`${areaValue} Air Quality Index (AQI)`
//     addDiv.appendChild(h3);

//     let p=document.createElement('p');
//     p.innerText=`Real-time air pollution level ${areaValue}`
//     addDiv.appendChild(p);

//     let p2=document.createElement('p');
//     p2.innerText=`${data.AQI}`
//     addDiv.appendChild(p2);

//     let p3=document.createElement('p');
//     p3.innerText=`${data.Quality}`
//     addDiv.appendChild(p3);
//     mainDiv.appendChild(addDiv)
    
//     console.log(mainDiv)

//     console.log(data)
// }
// function addClassNameImage(el,Quality)
// {
//     if(Quality==='Moderate')
//     {
//         el.className='marker moderate';
//     }else if(Quality==='Poor')
//     {
        
//         el.className='marker poor';
//     }else if(Quality==='Very Poor')
//     {
//         el.className='marker vp';
//     }else if(Quality==='Satisfactory')
//     {
//         el.className='marker satisfactory';
//     }else if(Quality==='Severe')
//     {
//         el.className='marker Severe';
//     }
//     else
//     {
//         el.className='marker good';
//     }
// }
// async function plotMap(){
//     let areaValue='India';
//     let area=url.get('area');
//     areaValue=area?area:areaValue;
//     let dateValue='2019-12-24';
//     if(url.get('date')!=null)
//         dateValue=url.get('date');

//     addBlock(area,url.get('date'))
//     MapAddition(areaValue,dateValue)
// }


// plotMap();

// async function MapAddition(areaValue,dateValue)
// {
//     let centerCoordinates=await getCoordinates(areaValue);
//     const map = new mapboxgl.Map({
//         container: 'map', 
//         style: 'mapbox://styles/mapbox/streets-v11', 
//         center: centerCoordinates, 
//         zoom: 7
//         });

//     const value= await fetch(`https://OutstandingMoralFirm.rakhi2207.repl.co/v1/state/${dateValue}`);
//     const data=await value.json() 
//     data.map(async(items)=>
//     {
//         let coordinates= await getCoordinates(items.address);
//         const el = document.createElement('div');
//         addClassNameImage(el,items.Quality);
//             new mapboxgl.Marker(el).setLngLat(coordinates).setPopup(
//             new mapboxgl.Popup({ offset: 25 }) 
//                 .setHTML(
//                 `<h3>${items.AQI}</h3><p>${items.Quality}</p><br>`
//                 )
//             ).addTo(map);
//     })
// }

// async function getData(area,date)
// {
//     const value=await fetch(`https://OutstandingMoralFirm.rakhi2207.repl.co/v1/tasks/${area}/${date}`);
//     const data=await value.json();
//     console.log(data)
//     return data;
// }

// document.getElementById('submit').addEventListener(('click'),async (event)=>
// {
//     let dateValue=document.getElementById('date').value;
//     let areaValue=document.getElementById('city').value;
//     let mainDiv=document.getElementsByTagName('body')[0];
//     let previousDiv=document.getElementsByClassName('addDiv')[0];
//     if(previousDiv)mainDiv.removeChild(previousDiv)
//     addBlock(areaValue,dateValue);
//     MapAddition(areaValue,dateValue)
// })

mapboxgl.accessToken = 'pk.eyJ1IjoicmFraGkyMjA3IiwiYSI6ImNsZWNvd2RzZDAwZ3QzcnBodXduMjI0Zm4ifQ.M8IVXBJ9TetScihLa7yXRA';
let cl=document.location.href;
let url=(new URL(cl)).searchParams;

async function getCoordinates(area)
{
  const conversionAPI=await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${area}.json?country=in&access_token=pk.eyJ1IjoicmFraGkyMjA3IiwiYSI6ImNsZWNvd2RzZDAwZ3QzcnBodXduMjI0Zm4ifQ.M8IVXBJ9TetScihLa7yXRA`)
  const obj=await conversionAPI.json()
  if(obj.features[0]){
    let coordinates=obj.features[0].center
    return coordinates;
  }
}

async function addBlock(areaValue,dateValue)
{
    // console.log(areaValue,dateValue)
    let data=await getData(areaValue,dateValue);    
    if(data.State===null)
    {
        alert("Data Not Avaialble")
        return ;
    }
    let mainDiv=document.getElementsByTagName('body')[0];
    let perfectArea=areaValue.charAt(0).toUpperCase()+areaValue.substring(1).toLowerCase();
    let addDiv=document.createElement('div');
    addDiv.classList.add('addDiv')
    let h3=document.createElement('h3')
    h3.innerText=`${perfectArea} Air Quality Index (AQI)`
    addDiv.appendChild(h3);

    let p=document.createElement('p');
    p.innerText=`Real-time air pollution level ${perfectArea}`
    addDiv.appendChild(p);

    let p2=document.createElement('p');
    p2.innerText=`${data.AQI}`
    addDiv.appendChild(p2);

    let p3=document.createElement('p');
    p3.innerText=`${data.Quality}`
    addDiv.appendChild(p3);
    mainDiv.appendChild(addDiv)
}

async function getLatLong(data,sl,el,slon,elon)
{
    let returnArray=[];
    for(let value of data)
    {
        let coordinates=await getCoordinates(value.address);
        if(coordinates&&coordinates[0]>el&&coordinates[0]<sl&&coordinates[1]>elon&&coordinates[1]<slon)
        {
            returnArray.push({"Quality":value.Quality,"AQI":value.AQI,"address":coordinates,"value":value.address});
        }
    }
    return returnArray;
}
function addClassNameImage(el,Quality)
{
    if(Quality==='Moderate')
    {
        el.className='marker moderate';
    }else if(Quality==='Poor')
    {
        
        el.className='marker poor';
    }else if(Quality==='Very Poor')
    {
        el.className='marker vp';
    }else if(Quality==='Satisfactory')
    {
        el.className='marker satisfactory';
    }else if(Quality==='Severe')
    {
        el.className='marker Severe';
    }
    else if(Quality==='Good')
    {
        el.className='marker good';
    }
}
async function plotMap(){
    console.log('plotMap')
    let areaValue='India';
    let area=url.get('area');
    areaValue=area?area:areaValue;
    let dateValue='2019-12-24';
    if(url.get('date')!=null)
        dateValue=url.get('date');

    addBlock(area,url.get('date'))
    MapAddition(areaValue,dateValue)
}



plotMap();

async function MapAddition(areaValue,dateValue)
{
    console.log('map addition')
    let centerCoordinates=await getCoordinates(areaValue);
    const map = new mapboxgl.Map({
        container: 'map', 
        style: 'mapbox://styles/mapbox/streets-v11', 
        center: centerCoordinates, 
        zoom: 7,
        maxZoom:12,
        minZoom:4
        })
        let marker=[];
        let timeoutId = null;


        map.on('move',function() {
            console.log('map moving')
            // Cancel any previously scheduled timeouts
            clearTimeout(timeoutId);
          
            for(let x of marker)
            {
              x.remove();
            }
          
            // Schedule a new timeout to show the boundaries after 5 seconds
            timeoutId = setTimeout(async function() {
              var bounds = map.getBounds();
              let ne=bounds._ne;
              let sw=bounds._sw;
                   

              const value= await fetch(`http://localhost:8080/v1/state/${dateValue}`);
              const data=await value.json() 

              const filteredData=await getLatLong(data,ne.lng,sw.lng,ne.lat,sw.lat)
                console.log(filteredData)
              filteredData.map((items)=>
              {
                  let coordinates=items.address;
                  const el = document.createElement('div');
                  addClassNameImage(el,items.Quality);
                     let value= new mapboxgl.Marker(el).setLngLat(coordinates).setPopup(
                      new mapboxgl.Popup({ offset: 25 }) 
                        .setHTML(
                            `<h3>${items.AQI}</h3><p>${items.Quality}</p><br><p>${items.value}</p><br>`
                        )
                    ).addTo(map);
                    marker.push(value);
              })
          
            },500);
          });

          map.on('load',function() {
            console.log('map moving')
            // Cancel any previously scheduled timeouts
            clearTimeout(timeoutId);
            for(let x of marker)
            {
              x.remove();
            }
            
          
            // Schedule a new timeout to show the boundaries after 5 seconds
            timeoutId = setTimeout(async function() {
              var bounds = map.getBounds();
              let ne=bounds._ne;
              let sw=bounds._sw;
                   

              const value= await fetch(`http://localhost:8080/v1/state/${dateValue}`);
              const data=await value.json() 

              const filteredData=await getLatLong(data,ne.lng,sw.lng,ne.lat,sw.lat)
                console.log(filteredData)
              filteredData.map((items)=>
              {
                  let coordinates=items.address;
                  const el = document.createElement('div');
                  addClassNameImage(el,items.Quality);
                     let value= new mapboxgl.Marker(el).setLngLat(coordinates).setPopup(
                      new mapboxgl.Popup({ offset: 25 }) 
                        .setHTML(
                    `<h3>${items.AQI}</h3><p>${items.Quality}</p><br><p>${items.value}</p><br>`
                        )
                    ).addTo(map);
                    marker.push(value);
              })
          
            },500);
          });
    map.addControl(new mapboxgl.NavigationControl());
}

async function getData(area,date)
{
    const value=await fetch(`http://localhost:8080/v1/tasks/${area}/${date}`);
    const data=await value.json();
    // console.log(data)
    return data;
}

document.getElementById('submit').addEventListener(('click'),async (event)=>
{
    let dateValue=document.getElementById('date').value;
    let areaValue=document.getElementById('city').value;
    let mainDiv=document.getElementsByTagName('body')[0];
    let previousDiv=document.getElementsByClassName('addDiv')[0];
    if(previousDiv)mainDiv.removeChild(previousDiv)
    addBlock(areaValue,dateValue);
    MapAddition(areaValue,dateValue)
})



