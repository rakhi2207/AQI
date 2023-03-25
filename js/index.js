let city=document.getElementById('city');

city.addEventListener('keyup',async (e)=>
{
    const value= await fetch(`http://localhost:8080/v1/listState`);
    const data=await value.json();
    document.getElementsByClassName('list')[0].innerHTML=''
    for(let value of data)
    {
        if(value.toLowerCase().startsWith(city.value.toLowerCase())&&city.value!='')
        {
            console.log(value)
            let listitem=document.createElement('li');
            listitem.classList.add('listItems');
            listitem.style.cursor='pointer';
            listitem.addEventListener('click',()=>{displayName(value)});
            listitem.innerHTML=value;
            document.getElementsByClassName('list')[0].appendChild(listitem)
        }
    }
})

function displayName(value)
{
    city.value=value;
    document.getElementsByClassName('list')[0].innerHTML=''
}
async function getData(area,date)
{
    const value=await fetch(`http://localhost:8080/v1/tasks/${area}/${date}`);
    const data=await value.json();
    return data;
}

function applyButtonColor(Quality,button)
{
    if(Quality==='Moderate')
    {
        button.style.backgroundColor='orange'
    }else if(Quality==='Poor')
    {
        button.style.backgroundColor='gray'
    }else if(Quality==='Very Poor')
    {
        button.style.backgroundColor='pink'
    }else if(Quality==='Satisfactory')
    {
        button.style.backgroundColor='blue'
    }else if(Quality==='Severe')
    {
        button.style.backgroundColor='red'
    }
    else
    {
        button.style.backgroundColor='green'
    }
}

function addPollutants(data,area)
{
    let perfectArea=area.charAt(0).toUpperCase()+area.substring(1).toLowerCase();
    let pollutant=document.getElementById('pollutants');
    pollutant.style.display='block';
    pollutant.children[0].innerHTML=`Major Pollutants in ${perfectArea}`
    let co=document.getElementsByClassName('co')[0];
    co.children[1].innerText=data.CO;
    let o3=document.getElementsByClassName('o3')[0];
    o3.children[1].innerText=data.o3;
    let so2=document.getElementsByClassName('so2')[0];
    console.log(so2)
    so2.children[1].innerText=data.so2;
    let no2=document.getElementsByClassName('no2')[0];
    no2.children[1].innerText=data.No2;
    let pm2=document.getElementsByClassName('pm2')[0];
    pm2.children[1].innerText=data.PM2;
    let pm10=document.getElementsByClassName('pm10')[0];
    pm10.children[1].innerText=data.PM10;
}
document.getElementById('submit').addEventListener(('click'),async (event)=>
{
    console.log('hello')
    let dateValue=document.getElementById('date').value;
    let areaValue=document.getElementById('city').value;

    let data=await getData(areaValue,dateValue);   

    if(data.State===null)
    {
        alert("Data Not Avaialble")
        return ;
    }
    let mainDiv=document.getElementById('main');
    mainDiv.innerHTML='';
    let addDiv=document.createElement('div');
    addDiv.classList.add('addDiv')
    let h3=document.createElement('h3')
    let perfectArea=areaValue.charAt(0).toUpperCase()+areaValue.substring(1).toLowerCase();
    h3.innerText=`${perfectArea} Air Quality Index (AQI)`
    addDiv.appendChild(h3);

    let p=document.createElement('p');
    p.innerText=`Real-time PM2.5, PM10 air pollution level ${data.State}`
    addDiv.appendChild(p);

    let p2=document.createElement('p');
    p2.innerText=`${data.AQI}`
    addDiv.appendChild(p2);

    let button=document.createElement('button');
    button.innerHTML=`${data.Quality}`
    addDiv.appendChild(button);
    applyButtonColor(data.Quality,button);
    mainDiv.appendChild(addDiv);

    let addData=document.getElementById('newData')
    console.log(perfectArea)
    addData.innerText=perfectArea;
    addData.style.color='white';

    addPollutants(data,areaValue);
})

function getMap()
{    let dateValue=document.getElementById('date').value;
    let areaValue=document.getElementById('city').value;
    window.location.href= `./Map.html?area=${areaValue}&date=${dateValue}`;
}
