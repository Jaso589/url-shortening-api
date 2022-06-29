const $inputLink = document.querySelector('.user-link'),
    $inputLabel = document.querySelector('.user__link-label'),
    $submit = document.querySelector('.submit-btn'),
    $containerOutput = document.querySelector('.container-boxes'),
    $btnMenu = document.querySelector('.btn-menu'),
    $nav = document.querySelector('.navbar')


class URLShortener{
    #API_URL = "https://api.shrtco.de/v2/shorten?url="
    #flag = 0;

    constructor(){
        $submit.addEventListener('click', this.getShortenUrl.bind(this));
        $containerOutput.addEventListener('click', this.copyText.bind(this))
    }

    getShortenUrl(e){
        e.preventDefault();

        const inputURL = $inputLink.value;

        if(inputURL === ''){
            $inputLink.classList.add('input-invalid');
            $inputLabel.classList.add('block');
            this.#flag = 1;
        }
        if(inputURL !== ''){
            if(this.#flag === 1){
                $inputLink.classList.remove('input-invalid');
                $inputLabel.classList.remove('block');
                this.#flag = 0;
            }
            $inputLink.value = '';
            this.callAPI(inputURL)
        }
    }

    callAPI(inputURL){
        const request = fetch(`${this.#API_URL+inputURL}`);
        request.then((response)=> response.json()).then((data)=> this.renderOutput(inputURL, data.result.full_short_link))
    }

    renderOutput($inputLink, shortenUrl){
        const html =  `
            <div class="link-box">
                <p class="input__link">${$inputLink}</p>
                <p class="output__link">${shortenUrl}</p>
                <button class="btn-h btn data-btn--1 copy-btn">Copy</button>
            </div>
        `;
        $containerOutput.insertAdjacentHTML('afterbegin', html);
    }

    copyText(e){
        if(!e.target.classList.contains('copy-btn'))return;

        const text = e.target.closest('.link-box').querySelector('.output__link').innerText;

        const inputElement = document.createElement('input');

        inputElement.setAttribute('value', text);
        document.body.appendChild(inputElement);
        inputElement.select();
        document.execCommand('copy');
        inputElement.parentNode.removeChild(inputElement);

        e.target.innerText = 'Copied!';
        e.target.style.backgroundColor = "hsl(257, 27%, 26%)";
    }
}

const app = new URLShortener();

$btnMenu.addEventListener('click', () =>{
    $nav.classList.toggle('is-active')
}
)
