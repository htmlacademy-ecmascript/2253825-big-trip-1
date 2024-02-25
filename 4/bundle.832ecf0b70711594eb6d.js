(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",l="week",o="month",p="quarter",c="year",u="date",v="Invalid Date",d=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,f=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,_={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},h=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},m={s:h,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+h(i,2,"0")+":"+h(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,o),r=n-s<0,a=t.clone().add(i+(r?-1:1),o);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:o,y:c,w:l,d:a,D:u,h:r,m:s,s:i,ms:n,Q:p}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",b={};b[y]=_;var g=function(e){return e instanceof S},$=function e(t,n,i){var s;if(!t)return y;if("string"==typeof t){var r=t.toLowerCase();b[r]&&(s=r),n&&(b[r]=n,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var l=t.name;b[l]=t,s=l}return!i&&s&&(y=s),s||!i&&y},M=function(e,t){if(g(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new S(n)},D=m;D.l=$,D.i=g,D.w=function(e,t){return M(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var S=function(){function _(e){this.$L=$(e.locale,null,!0),this.parse(e)}var h=_.prototype;return h.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(D.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(d);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},h.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},h.$utils=function(){return D},h.isValid=function(){return!(this.$d.toString()===v)},h.isSame=function(e,t){var n=M(e);return this.startOf(t)<=n&&n<=this.endOf(t)},h.isAfter=function(e,t){return M(e)<this.startOf(t)},h.isBefore=function(e,t){return this.endOf(t)<M(e)},h.$g=function(e,t,n){return D.u(e)?this[t]:this.set(n,e)},h.unix=function(){return Math.floor(this.valueOf()/1e3)},h.valueOf=function(){return this.$d.getTime()},h.startOf=function(e,t){var n=this,p=!!D.u(t)||t,v=D.p(e),d=function(e,t){var i=D.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return p?i:i.endOf(a)},f=function(e,t){return D.w(n.toDate()[e].apply(n.toDate("s"),(p?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},_=this.$W,h=this.$M,m=this.$D,y="set"+(this.$u?"UTC":"");switch(v){case c:return p?d(1,0):d(31,11);case o:return p?d(1,h):d(0,h+1);case l:var b=this.$locale().weekStart||0,g=(_<b?_+7:_)-b;return d(p?m-g:m+(6-g),h);case a:case u:return f(y+"Hours",0);case r:return f(y+"Minutes",1);case s:return f(y+"Seconds",2);case i:return f(y+"Milliseconds",3);default:return this.clone()}},h.endOf=function(e){return this.startOf(e,!1)},h.$set=function(e,t){var l,p=D.p(e),v="set"+(this.$u?"UTC":""),d=(l={},l[a]=v+"Date",l[u]=v+"Date",l[o]=v+"Month",l[c]=v+"FullYear",l[r]=v+"Hours",l[s]=v+"Minutes",l[i]=v+"Seconds",l[n]=v+"Milliseconds",l)[p],f=p===a?this.$D+(t-this.$W):t;if(p===o||p===c){var _=this.clone().set(u,1);_.$d[d](f),_.init(),this.$d=_.set(u,Math.min(this.$D,_.daysInMonth())).$d}else d&&this.$d[d](f);return this.init(),this},h.set=function(e,t){return this.clone().$set(e,t)},h.get=function(e){return this[D.p(e)]()},h.add=function(n,p){var u,v=this;n=Number(n);var d=D.p(p),f=function(e){var t=M(v);return D.w(t.date(t.date()+Math.round(e*n)),v)};if(d===o)return this.set(o,this.$M+n);if(d===c)return this.set(c,this.$y+n);if(d===a)return f(1);if(d===l)return f(7);var _=(u={},u[s]=e,u[r]=t,u[i]=1e3,u)[d]||1,h=this.$d.getTime()+n*_;return D.w(h,this)},h.subtract=function(e,t){return this.add(-1*e,t)},h.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||v;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=D.z(this),r=this.$H,a=this.$m,l=this.$M,o=n.weekdays,p=n.months,c=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},u=function(e){return D.s(r%12||12,e,"0")},d=n.meridiem||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i},_={YY:String(this.$y).slice(-2),YYYY:this.$y,M:l+1,MM:D.s(l+1,2,"0"),MMM:c(n.monthsShort,l,p,3),MMMM:c(p,l),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(n.weekdaysMin,this.$W,o,2),ddd:c(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(r),HH:D.s(r,2,"0"),h:u(1),hh:u(2),a:d(r,a,!0),A:d(r,a,!1),m:String(a),mm:D.s(a,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:s};return i.replace(f,(function(e,t){return t||_[e]||s.replace(":","")}))},h.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},h.diff=function(n,u,v){var d,f=D.p(u),_=M(n),h=(_.utcOffset()-this.utcOffset())*e,m=this-_,y=D.m(this,_);return y=(d={},d[c]=y/12,d[o]=y,d[p]=y/3,d[l]=(m-h)/6048e5,d[a]=(m-h)/864e5,d[r]=m/t,d[s]=m/e,d[i]=m/1e3,d)[f]||m,v?y:D.a(y)},h.daysInMonth=function(){return this.endOf(o).$D},h.$locale=function(){return b[this.$L]},h.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=$(e,t,!0);return i&&(n.$L=i),n},h.clone=function(){return D.w(this.$d,this)},h.toDate=function(){return new Date(this.valueOf())},h.toJSON=function(){return this.isValid()?this.toISOString():null},h.toISOString=function(){return this.$d.toISOString()},h.toString=function(){return this.$d.toUTCString()},_}(),w=S.prototype;return M.prototype=w,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",o],["$y",c],["$D",u]].forEach((function(e){w[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),M.extend=function(e,t){return e.$i||(e(t,S,M),e.$i=!0),M},M.locale=$,M.isDayjs=g,M.unix=function(e){return M(1e3*e)},M.en=b[y],M.Ls=b,M.p={},M}()}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e="afterbegin";function t(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function i(e,t,n="beforeend"){t.insertAdjacentElement(n,e.getElement())}class s{getTemplate(){return'<div class="trip-main__trip-controls  trip-controls">\n    <div class="trip-controls__filters">\n      <h2 class="visually-hidden">Filter events</h2>\n      <form class="trip-filters" action="#" method="get">\n        <div class="trip-filters__filter">\n          <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n        </div>\n\n        <div class="trip-filters__filter">\n          <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n          <label class="trip-filters__filter-label" for="filter-future">Future</label>\n        </div>\n\n        <div class="trip-filters__filter">\n          <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n          <label class="trip-filters__filter-label" for="filter-present">Present</label>\n        </div>\n\n        <div class="trip-filters__filter">\n          <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n          <label class="trip-filters__filter-label" for="filter-past">Past</label>\n        </div>\n\n        <button class="visually-hidden" type="submit">Accept filter</button>\n      </form>\n    </div>\n  </div>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class r{getTemplate(){return'<section class="trip-main__trip-info  trip-info">\n    <div class="trip-info__main">\n      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>\n    </div>\n    <p class="trip-info__cost">\n      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n    </p>\n  </section>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class a{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    <div class="trip-sort__item  trip-sort__item--day">\n      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n      <label class="trip-sort__btn" for="sort-day">Day</label>\n    </div>\n    <div class="trip-sort__item  trip-sort__item--event">\n      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n      <label class="trip-sort__btn" for="sort-event">Event</label>\n    </div>\n    <div class="trip-sort__item  trip-sort__item--time">\n      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n      <label class="trip-sort__btn" for="sort-time">Time</label>\n    </div>\n    <div class="trip-sort__item  trip-sort__item--price">\n      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n      <label class="trip-sort__btn" for="sort-price">Price</label>\n    </div>\n    <div class="trip-sort__item  trip-sort__item--offer">\n      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n      <label class="trip-sort__btn" for="sort-offer">Offers</label>\n    </div>\n  </form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class l{getTemplate(){return'\n  <ul class="trip-events__list">'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class o{getTemplate(){return'<li class="trip-events__item">\n    <form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n        <div class="event__type-wrapper">\n          <label class="event__type  event__type-btn" for="event-type-toggle-1">\n            <span class="visually-hidden">Choose event type</span>\n            <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">\n          </label>\n          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n          <div class="event__type-list">\n            <fieldset class="event__type-group">\n              <legend class="visually-hidden">Event type</legend>\n              <div class="event__type-item">\n                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">\n                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>\n              </div>\n              <div class="event__type-item">\n                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">\n                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>\n              </div>\n              <div class="event__type-item">\n                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">\n                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>\n              </div>\n              <div class="event__type-item">\n                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">\n                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>\n              </div>\n              <div class="event__type-item">\n                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">\n                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>\n              </div>\n              <div class="event__type-item">\n                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>\n                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>\n              </div>\n              <div class="event__type-item">\n                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">\n                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>\n              </div>\n              <div class="event__type-item">\n                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">\n                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>\n              </div>\n              <div class="event__type-item">\n                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">\n                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>\n              </div>\n            </fieldset>\n          </div>\n        </div>\n        <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-1">\n            Flight\n          </label>\n          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">\n          <datalist id="destination-list-1">\n            <option value="Amsterdam"></option>\n            <option value="Geneva"></option>\n            <option value="Chamonix"></option>\n          </datalist>\n        </div>\n        <div class="event__field-group  event__field-group--time">\n          <label class="visually-hidden" for="event-start-time-1">From</label>\n          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">\n          &mdash;\n          <label class="visually-hidden" for="event-end-time-1">To</label>\n          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">\n        </div>\n        <div class="event__field-group  event__field-group--price">\n          <label class="event__label" for="event-price-1">\n            <span class="visually-hidden">Price</span>\n            &euro;\n          </label>\n          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">\n        </div>\n        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n        <button class="event__reset-btn" type="reset">Cancel</button>\n      </header>\n      <section class="event__details">\n        <section class="event__section  event__section--offers">\n          <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n          <div class="event__available-offers">\n            <div class="event__offer-selector">\n              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>\n              <label class="event__offer-label" for="event-offer-luggage-1">\n                <span class="event__offer-title">Add luggage</span>\n                &plus;&euro;&nbsp;\n                <span class="event__offer-price">30</span>\n              </label>\n            </div>\n            <div class="event__offer-selector">\n              <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>\n              <label class="event__offer-label" for="event-offer-comfort-1">\n                <span class="event__offer-title">Switch to comfort class</span>\n                &plus;&euro;&nbsp;\n                <span class="event__offer-price">100</span>\n              </label>\n            </div>\n            <div class="event__offer-selector">\n              <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">\n              <label class="event__offer-label" for="event-offer-meal-1">\n                <span class="event__offer-title">Add meal</span>\n                &plus;&euro;&nbsp;\n                <span class="event__offer-price">15</span>\n              </label>\n            </div>\n            <div class="event__offer-selector">\n              <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">\n              <label class="event__offer-label" for="event-offer-seats-1">\n                <span class="event__offer-title">Choose seats</span>\n                &plus;&euro;&nbsp;\n                <span class="event__offer-price">5</span>\n              </label>\n            </div>\n            <div class="event__offer-selector">\n              <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">\n              <label class="event__offer-label" for="event-offer-train-1">\n                <span class="event__offer-title">Travel by train</span>\n                &plus;&euro;&nbsp;\n                <span class="event__offer-price">40</span>\n              </label>\n            </div>\n          </div>\n        </section>\n        <section class="event__section  event__section--destination">\n          <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n          <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>\n          <div class="event__photos-container">\n            <div class="event__photos-tape">\n              <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">\n              <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">\n              <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">\n              <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">\n              <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">\n            </div>\n          </div>\n        </section>\n      </section>\n    </form>\n  </li>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class p{getTemplate(){return'<li class="trip-events__item">\n    <div class="event">\n      <time class="event__date" datetime="2019-03-18">MAR 18</time>\n      <div class="event__type">\n        <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">\n      </div>\n      <h3 class="event__title">Taxi Amsterdam</h3>\n      <div class="event__schedule">\n        <p class="event__time">\n          <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>\n          &mdash;\n          <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>\n        </p>\n        <p class="event__duration">30M</p>\n      </div>\n      <p class="event__price">\n        &euro;&nbsp;<span class="event__price-value">20</span>\n      </p>\n      <h4 class="visually-hidden">Offers:</h4>\n      <ul class="event__selected-offers">\n        <li class="event__offer">\n          <span class="event__offer-title">Order Uber</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">20</span>\n        </li>\n      </ul>\n      <button class="event__favorite-btn event__favorite-btn--active" type="button">\n        <span class="visually-hidden">Add to favorite</span>\n        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n        </svg>\n      </button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </div>\n  </li>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}var c=n(484),u=n.n(c);function v(e=0,t=1){const n=Math.ceil(Math.min(e,t)),i=Math.floor(Math.max(e,t));return Math.floor(n+Math.random()*(i-n+1))}function d(e){return e[v(0,e.length-1)]}const f=["Amsterdam","Chamonix","Geneva","Kaunertal","Hinterstoder","Kaprun","Rome"],_=["Aliquam erat volutpat.","Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.","Aliquam id orci ut lectus varius viverra.","Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.","Lorem ipsum dolor sit amet, consectetur adipiscing elit."],h=7,m=24,y=59;let b=u()().subtract(v(0,h),"day").toDate();function g({next:e}){const t=v(0,h),n=v(1,m),i=v(0,y);return e&&(b=u()(b).add(t,"day").add(n,"hour").add(i,"minute").toDate()),b}const $=["Taxi","Bus","Train","Ship","Drive","Flight","Check-in","Sightseeing","Restaurant"];class M{constructor(e){this.service=e,this.points=this.service.getPoints()}get(){return this.points}}const D=document.querySelector(".page-header").querySelector(".trip-main"),S=document.querySelector(".page-main").querySelector(".trip-events"),w=new class{points=[];destinations=[];offers=[];constructor(){this.points=this.generatePoints(),this.destinations=this.generateDestinations(),this.offers=this.generateOffers()}getPoints(){return this.points}getDestinations(){return this.destinations}getOffers(){return this.offers}generateDestinations(){return Array.from({length:6},(()=>function(){const e=d(f);return{id:crypto.randomUUID(),description:_,name:e,pictures:[{src:`https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,description:`${e} description`}]}}()))}generateOffers(){return $.map((e=>({type:e,offers:Array.from({length:v(0,6)},(()=>function(e){return{id:crypto.randomUUID(),title:`Offer ${e}`,price:v(100,1e3)}}(e)))})))}generatePoints(){return Array.from({length:6},(()=>{const e=d($),t=d(this.destinations),n=v(0,1),i=this.offers.find((t=>t.type===e)),s=n?i.offers.slice(0,v(0,6)).map((e=>e.id)):[];return function(e,t,n){return{id:crypto.randomUUID(),basePrice:v(100,1e4),dateFrom:g({next:!1}),dateTo:g({next:!0}),destination:e,isFavorite:!!v(0,1),offers:t,type:n}}(t.id,s,e)}))}},x=new M(w),C=new M(w),T=new M(w),O=new class{tripInfoComponent=new r;tripFilterComponent=new s;constructor({tripFilterContainer:e}){this.tripFilterContainer=e}init(){i(this.tripInfoComponent,this.tripFilterContainer,e),i(this.tripFilterComponent,this.tripFilterContainer,e)}}({tripFilterContainer:D}),E=new class{tripSortComponent=new a;tripEventsComponent=new l;constructor({tripMainContainer:e,pointsModel:t,destinationsModel:n,offersModel:i}){this.tripMainContainer=e,this.pointsModel=t,this.destinationsModel=n,this.offersModel=i,this.points=[...t.get()]}init(){i(this.tripSortComponent,this.tripMainContainer),i(this.tripEventsComponent,this.tripMainContainer),i(new o({point:this.points[0],pointDestinations:this.destinationsModel.get(),pointOffers:this.offersModel.get()}),this.tripEventsComponent.getElement());for(let e=0;e<3;e++)i(new p,this.tripEventsComponent.getElement())}}({tripMainContainer:S,pointsModel:x,destinationsModel:C,offersModel:T});O.init(),E.init()})()})();
//# sourceMappingURL=bundle.832ecf0b70711594eb6d.js.map