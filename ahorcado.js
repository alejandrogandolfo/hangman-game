let palabras= ["arbol","casa","piterin","abrilina"];
const palabra_buscada = document.getElementById('palabra_buscada');
const errores = document.getElementById('errores');
const keyboard = document.getElementById('keyboard');
const perdiste = document.querySelector('#perdiste');

let letraCorrecta = [];
let intentos = 0;
const maximosIntentos = 4;
const abecedario = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];


let random = palabras[Math.floor(Math.random()*palabras.length)].toUpperCase();
console.log(random);

const palabraAAdivinar =()=>{
	const palabraAArray = random.split("").map //con .map creo en el html un span con cada letra de la palabra a buscar
		(letra =>`
			<span class="letra">
					${letraCorrecta.includes(letra) ? letra : '__'} 
					</span>`).join('');//aqui digo que si el array de letras incluye ese letra que presiono la introduzca, y sino que me escriba un espacio en blanco

		palabra_buscada.innerHTML = palabraAArray; //copio cada letra de esa palabra en la pagina web
		
	if(palabraAArray.indexOf('__')<0){
		document.querySelector('.ganador').style.display = 'flex';
		
	}



}; //tranformo mi string de la palabra random a un array para que me la separe por letra
	

const tecladoEscrito=()=>{
	const fragmento = document.createDocumentFragment();
	abecedario.map(letra => {
		const span = document.createElement('SPAN')
		span.classList.add('keyboard')
		span.textContent = letra;
		fragmento.appendChild(span);
	})


	keyboard.appendChild(fragmento);
}




const actualizarIntentosFallidos=()=>{

	/*errores.innerHTML = intentos + " " + "intento/s";*/
	if(intentos < maximosIntentos){
		intentos+=1;
		errores.innerHTML = intentos + " " + "intento/s";
		document.querySelector('#ahorcado').style.backgroundPosition = (-205*intentos) + 'px 0';
	}else{
		document.querySelector('.perdedor').style.display = 'flex';
		perdiste.innerHTML = "PERDISTE" + '<br>'+"La palabra era:" + " " + random;

		$('#ahorcado').addClass(`colorJuegoPerdido`);


	}
}

const ContieneLetra= letra=>{
	if(random.includes(letra)){ //pregunto si la palabra a buscar contiene la letra que presione
		
		if(!letraCorrecta.includes(letra)){ //si el array nuevo de letras, no contiene la misma letra que presione la agrega, si no NO, es para que no halla letras repetidas

		letraCorrecta.push(letra); //si la contiene con push que la agregue a la cadena vacia que cree al principio
		}
	}else{
		actualizarIntentosFallidos();


	}
	palabraAAdivinar();
}


keyboard.addEventListener('click', e=>{ 
	if(e.target.classList.contains('keyboard')){
		ContieneLetra(e.target.textContent); //(ver bien la funcion)al hacer click en el abecedario si contiene la letra nos mostrara y sino sumara intentos fallidos
	}

})


palabraAAdivinar();
tecladoEscrito();


