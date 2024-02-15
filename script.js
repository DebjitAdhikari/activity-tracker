const theMap = document.querySelector("#map");
const emptyNote=document.querySelector(".empty");
const form = document.querySelector(".form");
const formContainer = document.querySelector(".form-class")
const allacts=document.querySelector(".allacts")
const activityInput = document.querySelector("#activity-id");
const daysInput = document.querySelector("#days");
const submitbtn = document.querySelector("#submit");
const crosshair = document.querySelector(".crosshair");

let anyTask=false;
class App {
    #map;
    #position;
    #latitude;
    #longitude;
    constructor() {
        this._getLocation();
        theMap.addEventListener("click",this._activeForm.bind(this))
        submitbtn.addEventListener("click", this._showMarker.bind(this))
        crosshair.addEventListener("click",this._goToMyOwnLocation.bind(this));
    }
    _getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._loadMapLocation.bind(this), function () {
                alert("Some error happened !");
            })
        }
    }
    _loadMapLocation(position) {
        //Destructing
        //const{ latitude, longitude } = position.coords;
        this.#latitude=position.coords.latitude;
        this.#longitude=position.coords.longitude;
        this.#map = L.map('map').setView([this.#latitude,this.#longitude], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        this.#map.on("click",this._tapLocationFromMap.bind(this))
    }
    _tapLocationFromMap(ev){
        this.#position = ev;
    }
    _activeForm() {
        if(!anyTask){
            emptyNote.textContent=""
            anyTask=true;
        }
        form.classList.remove("hidden")
        activityInput.value = daysInput.value = "";
        activityInput.focus();
    }
    _showMarker(ev) {
        ev.preventDefault();
        form.classList.add("hidden");
        //adding acivity
        const str=`<div class="activity">
            <div class="activity-name">🎯 ${activityInput.value}</div>
            <div class="days-count">🌥️ ${daysInput.value} days</div>
            </div>`
        allacts.insertAdjacentHTML("afterbegin",str)
            
        //showing maker
        const act=activityInput.value;
        const { lat, lng } = this.#position.latlng;
        L.marker([lat, lng]).
            addTo(this.#map)
            .bindPopup(L.popup({
                minWidth: 50,
                autoClose: false,
                closeOnClick: false,
                className: "marker-activity"
            })
            ).setPopupContent(act)
            .openPopup();
    }
    _goToMyOwnLocation() {
        this.#map.setView([this.#latitude,this.#longitude], 13);
    }
    
}

const ap=new App()


