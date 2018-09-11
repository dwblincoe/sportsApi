let baseURL = 'https://www.thesportsdb.com/api/v1/json/4012913/searchplayers.php'


let box = document.querySelector('.box');
let box2 = document.querySelector('.box2');
let teamCity = document.getElementById('teamCity')
let teamName = document.getElementById('teamName');
let playerFirstName = document.getElementById('playerFirstName');
let playerLastName = document.getElementById('playerLastName');
let intro = document.getElementById('overlay')
let playerCard = document.querySelector('.playerCard');
let name = document.querySelector('.name');
let bio1 = document.querySelector('.bio1');
let descript = document.querySelector('.description');
let sports = document.getElementById('sport');
let teams = document.getElementById('team');
let positions = document.getElementById('position');
let heights = document.getElementById('height');
let weights = document.getElementById('weight');
let birthDates = document.getElementById('birthDate');
let birthCities = document.getElementById('birthPlace');

intro.addEventListener('click', overlay);
box.addEventListener('submit', fetchResults1);

playerCard.style.display = 'none';
box2.style.display = 'none';

function overlay (e){
    e.preventDefault();
    intro.style.display ='none'
}

function fetchResults1(event){
    event.preventDefault();

    if(teamCity.value !== '' || teamName.value !== ''){
        url = baseURL + '?t=' + teamCity.value + '_' + teamName.value;
        box2.style.display = 'block';
        box.style.display = 'none';

        box2.addEventListener('submit', fetchResults2);

        function fetchResults2(event){
            event.preventDefault();
            url += '&p=' + playerFirstName.value + '_' + playerLastName.value;

            fetch(url)
            .then(function(response){
                return response.json()
            })
            .then(function(json){
                console.log(json);
                displayResults(json)
            })
            .catch(function(err){
                return err;
            })

        }
    }else{
        alert('Please enter ALL fields!');
    }
}

function displayResults(json){
    playerCard.style.display = 'flex'
    box2.style.display = 'none';
    box.style.display = 'block';
    let playerImg = json.player[0].strCutout;
    let playerName = json.player[0].strPlayer;
    let playerPos = json.player[0].strPosition;
    let team = json.player[0].strTeam;
    let sport = json.player[0].strSport;
    let dateBorn = json.player[0].dateBorn;
    let birthLoc = json.player[0].strBirthLocation;
    let college = json.player[0].strCollege;
    let height = json.player[0].strHeight;
    let weight = json.player[0].strWeight;
    let description = json.player[0].strDescriptionEN;

    // while(playerCard.child){
    //     playerCard.removeChild(playerCard.child)
    // }

    if(college == null){
        let college = 'N/A';
    }
    let titleName = document.createElement('h1')
    let img = document.createElement('img');
    let para = document.createElement('p');
    let para2 = document.createElement('p');
    let para3 = document.createElement('p');
    let para4 = document.createElement('p');
    let para5 = document.createElement('p');
    let para6 = document.createElement('p');
    let para7 = document.createElement('p');
    let para8 = document.createElement('p');
    
    img.src = playerImg;
    titleName.innerText = playerName;
    para.innerText = description;
    para2.innerText = playerPos;
    para3.innerText = sport;
    para4.innerText = team;
    para5.innerText = height;
    para6.innerText = weight;
    para7.innerText = dateBorn;
    para8.innerText = birthLoc;

    name.appendChild(titleName);
    bio1.appendChild(img);
    descript.appendChild(para);
    positions.appendChild(para2);
    sports.appendChild(para3);
    teams.appendChild(para4);
    heights.appendChild(para5);
    weights.appendChild(para6);
    birthDates.appendChild(para7);
    birthCities.appendChild(para8);
}