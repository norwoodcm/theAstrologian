let sign = "";

function getDate() {
    let date = new Date(document.getElementById("birthDate").value);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
    let day = date.getDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[date.getMonth()];
    zodiacSign(day, month);
}

//define horoscopes, the index number is used in get sign summary get request

function Horoscope(title, planet, index, description, planetURL) {
    this.title = title;
    this.planet = planet;
    this.index = index;
    this.description = description;
    this.planetURL = planetURL;
}

const pluto = `Pluto is a dwarf planet in the Kuiper Belt, a donut-shaped region of icy bodies beyond the orbit of Neptune. There may be millions of these icy objects, collectively referred to as Kuiper Belt objects (KBOs) or trans-Neptunian objects (TNOs), in this distant region of our solar system. \n
Pluto \– which is smaller than Earth\’s Moon \– has a heart-shaped glacier that\’s the size of Texas and Oklahoma. This fascinating world has blue skies, spinning moons, mountains as high as the Rockies, and it snows \– but the snow is red.`

const sun = `The Sun represents the Self, one's way of being in the world. It can represent, on different levels, both the ego and the higher Self or soul purpose. It rules Leo and is exalted in Aries. The Sun is the most important 'planet' in the chart and symbolizes one's will and sense of vitality.`

const moon = `The Moon is associated with the mother and with feminine energy in general. The Moon is both our inner child and our inner mother. It is responsive, receptive, and reflective. The Moon is our spontaneous and instinctual reactions. \n
Just as the Moon circles the Sun, in a symbolically protective manner, and reflects the Sun\’s light, the Moon in our chart shows how we protect ourselves, as well as make ourselves feel secure, comfortable, and safe.`

const Scorpio = new Horoscope("Scorpio", "Pluto", 9, pluto, "./imgs/pluto.png");
const Leo = new Horoscope ("Leo", "Sun", 10, sun, "./imgs/sun.png");
const Cancer = new Horoscope ("Cancer", "Moon", 11, moon, "./imgs/moon.png");
const Gemini = new Horoscope ("Gemini", "Mercury", 7)
const Virgo = new Horoscope ("Virgo", "Mercury", 7)
const Taurus = new Horoscope ("Taurus", "Venus", 4)
const Libra = new Horoscope ("Libra", "Venus", 4)
const Aries = new Horoscope ("Aries", "Mars", 6)
const Sagittarius = new Horoscope ("Sagittarius", "Jupiter", 1)
const Capricorn = new Horoscope ("Capricorn", "Saturn", 0)
const Aquarius = new Horoscope ("Aquarius", "Uranus", 2)
const Pisces = new Horoscope ("Pisces", "Neptune", 3)

const signs = [Scorpio, Leo, Cancer, Gemini, Virgo, Taurus, Libra, Aries, Sagittarius, Capricorn, Aquarius, Pisces];

document.getElementById("submit").addEventListener("click", getDate);
// document.getElementById("allSigns").addEventListener("click", allSigns(signs));
// document.getElementById("allPlanets").addEventListener("click", allPlanets);

//Fetch to get Horoscope summary information for today

function getSignSummary(sign) {
    const optionsSign = {
        method: 'POST',
        headers: {
            'X-RapidAPI-Key': '3bc8ca0bc6msh8ff31967dc8df1cp1ab330jsnf3415896fbcd',
            'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
        }
    };

    fetch(`https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=${sign.title}&day=today`, optionsSign)
        .then(response => response.json())
        .then(data => {
            headerTitle.innerText = sign.title;
            title1.innerText = "Your Fate:"
            summary1.innerHTML = data.description;
            let signTraits = document.createElement("p");
            summary1.appendChild(signTraits);
            signTraits.innerHTML = `<h3>${sign.title} Traits:</h3><ul style="background: white"><li>Color: ${data.color}</li><br><br><li>Compatibility: ${data.compatibility}</li><br><br><li>Lucky Number: ${data.lucky_number}</li></ul>`;
        })
        .catch(err => console.error(err));
        getPlanet(sign);
}

//Fetch to get the image and information for Horoscopes planet

function getPlanet(sign) {
    const optionsPlanet = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3bc8ca0bc6msh8ff31967dc8df1cp1ab330jsnf3415896fbcd',
            'X-RapidAPI-Host': 'planets-info-by-newbapi.p.rapidapi.com'
        }
    };
    
    fetch('https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planet/list', optionsPlanet)
        .then(response => response.json())
        .then(data => {
            if (sign.index <= 7) {
            title2.innerText = `${sign.title} Planet: ${data[sign.index].name}`
            summary2.innerHTML = data[sign.index].description;
            let planetImage = document.createElement("p");
            summary2.appendChild(planetImage);
            planetImage.innerHTML = `<img src="${data[sign.index].imgSrc[0].img}" id="plannetImage">`
            plannetImage.style = "width:300px"
            } else if (sign.index > 7) {
                title2.innerText = `${sign.title} Planet: ${sign.planet}`;
                summary2.innerText = sign.description;
                let planetImage = document.createElement("p");
                summary2.appendChild(planetImage);
                planetImage.innerHTML = `<img src="${sign.planetURL}" id="plannetImage">`
                plannetImage.style = "width:300px"
            }
        })
        .catch(err => console.error(err));
}

// function to assign zodiacsign

function zodiacSign(day, month) {
    document.getElementById('search').style.visibility='hidden';
    const bannerImage = document.getElementById("bannerImage");
    let lowercaseMonth = new String (`${month}`.toLowerCase())
    if (lowercaseMonth == "january") {
        if (day < 20) {
        sign = Capricorn;
        bannerImage.src = "./imgs/capricorn.png"
        bannerImage.style.height = '300px';
        } else if (day >= 20) {
            sign = Aquarius;
            bannerImage.src = "./imgs/aquarius.png"
            bannerImage.style.height = '300px';
            }
    } else if (lowercaseMonth == "february") {
        if (day < 19) {
        sign = Aquarius;
        bannerImage.src = "./imgs/aquarius.png"
        bannerImage.style.height = '300px';
        } else if (day >=19) {
            sign = Pisces;
            bannerImage.src = "./imgs/pisces.png"
            bannerImage.style.height = '300px';
            }
    } else if (lowercaseMonth == "march") {
        if (day < 21) {
        sign = Pisces;
        bannerImage.src = "./imgs/pisces.png"
        bannerImage.style.height = '300px';
        } else if (day >= 21) {
            sign = Aries;
            bannerImage.src = "./imgs/aries.png"
            bannerImage.style.height = '300px';
            }
    } else if (lowercaseMonth == "april") {
        if (day < 20) {
        sign = Aries;
        bannerImage.src = "./imgs/aries.png"
        bannerImage.style.height = '300px';
        } else if (day >= 20) {
            sign = Taurus;
            bannerImage.src = "./imgs/taurus.png"
            bannerImage.style.height = '300px';
            }
    } else if (lowercaseMonth == "may") {
        if (day < 22) {
        sign = Taurus;
        bannerImage.src = "./imgs/taurus.png"
        bannerImage.style.height = '300px';
        } else if (day >= 22) {
            sign = Gemini;
            bannerImage.src = "./imgs/gemini.png";
            bannerImage.style.height = '300px';
            }
    } else if (lowercaseMonth == "june") {
        if (day < 21) {
        sign = Gemini;
        bannerImage.src = "./imgs/gemini.png";
        bannerImage.style.height = '300px';
        } else if (day >= 21) {
            sign = Cancer;
            bannerImage.src = "./imgs/cancer.png";
            bannerImage.style.height = '300px';
            }
    } else if (lowercaseMonth == "july") {
        if (day < 23) {
        sign = Cancer;
        bannerImage.src = "./imgs/cancer.png";
        bannerImage.style.height = '300px';
        } else if (day >= 23) {
            sign = Leo;
            bannerImage.src = "./imgs/leo.png";
            bannerImage.style.height = '300px';
        }
    } else if (lowercaseMonth == "august") {
        if (day < 23) {
        sign = Leo;
        bannerImage.src = "./imgs/leo.png";
        bannerImage.style.height = '300px';
        } else if (day >= 23) {
            sign = Virgo;
            bannerImage.src = "./imgs/virgo.png";
            bannerImage.style.height = '300px';
        }
    } else if (lowercaseMonth == "september") {
        if (day < 23) {
        sign = Virgo;
        bannerImage.src = "./imgs/virgo.png";
        bannerImage.style.height = '300px';
        } else if (day >=23) {
            sign = Libra;
            bannerImage.src = "./imgs/libra.png";
            bannerImage.style.height = '300px';
        }
    } else if (lowercaseMonth == "october") {
        if (day < 23) {
        sign = Libra;
        bannerImage.src = "./imgs/libra.png";
        bannerImage.style.height = '300px';
        } else if (day >=23) {
            sign = Scorpio;
            bannerImage.src = "./imgs/scorpio.png";
            bannerImage.style.height = '300px';
        }
    } else if (lowercaseMonth == "november") {
        if (day < 23) {
        sign = Scorpio;
        bannerImage.src = "./imgs/scorpio.png";
        bannerImage.style.height = '300px';
        } else if (day >= 23) {
            sign = Sagittarius;
            bannerImage.src = "./imgs/sagittarius.png";
            bannerImage.style.height = '300px';
        }
    } else if (lowercaseMonth == "december") {
        if (day < 22) {
        sign = Sagittarius;
        bannerImage.src = "./imgs/sagittarius.png";
        bannerImage.style.height = '300px';
        } else if (day >=22) {
            sign = Capricorn;
            bannerImage.src = "./imgs/capricorn.png"
            bannerImage.style.height = '300px';
        }
    }
    getSignSummary(sign);
}
