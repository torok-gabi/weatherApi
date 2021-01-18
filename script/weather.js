document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const place = document.querySelector("input").value;
    fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${place}&lang=hu&units=metric&APPID=4e339cc4c5dd4ad9fef1004f6918c562`
        )
        .then((result) => result.json())
        .then((data) => {
            if (
                typeof data !== "object" ||
                typeof data.weather !== "object" ||
                typeof data.weather.length !== "number" ||
                data.weather.length <= 0
            ) {
                alert("Nem létező város! Kérjük adjon meg egy másikat!");
                return;
            }
            const img = data.weather[0].icon;
            const imgURL = `https://api.openweathermap.org/img/w/${img}.png`;
            const { temp } = data.main;
            const { description } = data.weather[0];
            const { speed } = data.wind;
            const city = data.name;
            let ital = ["Jégkása", "Fanta narancs", "Forró csoki", "Citromos tea"];
            let ajándék = "A mai napi ajándék: ";
            if (data.main.temp >= 25) {
                ajándék += ital[0];
            } else if (data.main.temp >= 15) {
                ajándék += ital[1];
            } else if (data.main.temp >= 5) {
                ajándék += ital[2];
            } else {
                ajándék += ital[3];
            }
            const markup = `
                <div class="temp">
                    <div><img class="api-img" src="${imgURL}" alt="weather icon" </div>
                    <div>Település: ${city}</div>   
                    <div>Hőmérséklet: ${temp}°C</div>
                    <div>Időjárás: ${description}</div>
                    <div>Szél erősség: ${speed}</div>
                    <div>${ajándék}</div>
                </div>           
            `;
            document.querySelector(".js-display").innerHTML = markup;
        });
});