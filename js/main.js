
function AJAX_NAV(){
    'use strict';
    
// MENU DONA

    document.querySelector('#menu').addEventListener('click',mostrarMenu);
    document.getElementById('navInv').addEventListener('click',ocultarMenu);
    let cont=1
    let menu=document.querySelector('.accesosFlotantes');
    let boton=document.getElementById('navInv');
    function mostrarMenu(){
        cont+=1;
        menu.classList.remove('js-ocultar');// menu
        menu.classList.add('js-mostrar');
        boton.classList.remove('js-ocultar');// boton invisible
        boton.classList.add('js-mostrar');
        if(cont%2==0){
            menu.classList.remove('js-mostrar');// menu
            menu.classList.add('js-ocultar');
            boton.classList.remove('js-mostrar');// boton invisible
            boton.classList.add('js-ocultar');
        }
    }
    function ocultarMenu(){
        cont+=1;
        menu.classList.remove('js-mostrar');// menu
        menu.classList.add('js-ocultar');
        boton.classList.remove('js-mostrar');// boton invisible
        boton.classList.add('js-ocultar');
    }

// NAVEGADOR

    document.getElementById('btnHome').addEventListener('click',cargarHome);
    document.getElementById('btnHomePC').addEventListener('click',cargarHome);
    document.getElementById('btnMirar').addEventListener('click',cargarMirar);
    document.getElementById('btnMirarPC').addEventListener('click',cargarMirar);
    document.getElementById('btnTienda').addEventListener('click',cargarTienda);
    document.getElementById('btnTiendaPC').addEventListener('click',cargarTienda);
    document.getElementById('btnSobre').addEventListener('click',cargarSobre);
    document.getElementById('btnSobrePC').addEventListener('click',cargarSobre);
    function cargarHome(){
        cargarBody('html/home.html');
        ocultarMenu();
    }
    function cargarMirar(){
        cargarBody('html/mirar.html');
        ocultarMenu();
    }
    function cargarTienda(){
        cargarBody('html/tienda.html');
        ocultarMenu();
    }
    function cargarSobre(){
        cargarBody('html/quienessomos.html');
        ocultarMenu();
    }
    cargarHome();
    let body=document.getElementById('ajax-Home');
    
// CARGAR HOME

    let intervalo = null;
    function reiniciarIntervalo(){
        let tablaBody = document.getElementById('tablaBody');
        intervalo = setInterval(()=>{
                        llenarTabla(tablaBody)
                    }, 2000);
    }
    function cargarBody(url){
        fetch(url)
            .then(resp=>{
                return resp.text();
            })
            .then(bodyhtml=>{
                body.innerHTML=bodyhtml;
                if(url==='html/home.html'){
                    document.getElementById('verPrincipal').addEventListener('click',cargarMirar);
                    document.querySelector('.tiendaPP').addEventListener('click',cargarTienda);
                    document.getElementById('entrarTienda').addEventListener('click',cargarTienda);
                }else if(url==='html/mirar.html'){
                    document.getElementById('crearPlay').addEventListener('click',mostrarPlaylist);
                    document.getElementById('js-btn-agregarCap').addEventListener('click', agregar_capitulo);
                    document.getElementById('borrarTodos').addEventListener('click',limpiarTabla);
                    document.getElementById('js-selecTemp').addEventListener('click',cambiarTemporadas);
                    ocultarSelects();
                    document.getElementById('js-selectEpi1').classList.remove('js-ocultar');
                    document.getElementById('btnFiltrar').addEventListener('click',filtrar);
                    reiniciarIntervalo()
                }else if(url==='html/tienda.html'){
                    document.querySelector("#enviar").addEventListener('click', mostrarCaptcha);
                    obtenerNumAleatorio()
                    document.querySelector("#verificar").addEventListener('click', verificar);
                }else if(url==='html/quienessomos.html'){
                }
            })
            .catch(error=>{
                console.log(error);
                body.innerHTML=error;
            })
    }

// PLAYLIST ///////////////////////////////////////////////////////////////////

    const urlWeb = 'https://web-unicen.herokuapp.com/api/groups/'
    const groupID = '069-Lara'
    const collectionID = 'episodios'

    function mostrarPlaylist(){
        let inNombre=document.getElementById('in_nombre_play').value;
        document.getElementById('elNombrePlay').innerHTML=inNombre;
        if(inNombre.length===0){
            document.getElementById('adverNombre').innerHTML='Ingresá un nombre!';
        }else{
            document.querySelector('.creaTuPlay').classList.add('js-mostrar-Play');
            document.querySelector('.formPlay').classList.remove('js-mostrar-Play');
            document.querySelector('.cajaPlay').classList.remove('js-mostrar-Play');
        }
    }  

    function ocultarSelects(){
        document.getElementById('js-selectEpi1').classList.add('js-ocultar');
        document.getElementById('js-selectEpi2').classList.add('js-ocultar');
        document.getElementById('js-selectEpi3').classList.add('js-ocultar');
        document.getElementById('js-selectEpi4').classList.add('js-ocultar');
        document.getElementById('js-selectEpi5').classList.add('js-ocultar');
        document.getElementById('js-selectEpi6').classList.add('js-ocultar');
        document.getElementById('js-selectEpi7').classList.add('js-ocultar');
        document.getElementById('js-selectEpi8').classList.add('js-ocultar');
    }

    function cambiarTemporadas(){
        let Temp1 = document.getElementById('js-selectEpi1');
        let Temp2 = document.getElementById('js-selectEpi2');
        let Temp3 = document.getElementById('js-selectEpi3');
        let Temp4 = document.getElementById('js-selectEpi4');
        let Temp5 = document.getElementById('js-selectEpi5');
        let Temp6 = document.getElementById('js-selectEpi6');
        let Temp7 = document.getElementById('js-selectEpi7');
        let Temp8 = document.getElementById('js-selectEpi8');
        if(this.value==='T1'){
            ocultarSelects()
            Temp1.classList.remove('js-ocultar');
        }else if(this.value==='T2'){
            ocultarSelects()
            Temp2.classList.remove('js-ocultar');
        }else if(this.value==='T3'){
            ocultarSelects()
            Temp3.classList.remove('js-ocultar');
        }else if(this.value==='T4'){
            ocultarSelects()
            Temp4.classList.remove('js-ocultar');
        }else if(this.value==='T5'){
            ocultarSelects()
            Temp5.classList.remove('js-ocultar');
        }else if(this.value==='T6'){
            ocultarSelects()
            Temp6.classList.remove('js-ocultar');
        }else if(this.value==='T7'){
            ocultarSelects()
            Temp7.classList.remove('js-ocultar');
        }else if(this.value==='T8'){
            ocultarSelects()
            Temp8.classList.remove('js-ocultar');
        }
    }

    function agregar_capitulo(event) {
        event.preventDefault();
        let capSelec = document.getElementById('js-selectEpi1').value;
        let nombreCap;
        let fechaCap;
        let sinopCap;
        let iframe;
        switch (capSelec) {
            case 'T1E1': {
                nombreCap = 'Sin blanca Navidad';
                fechaCap = "17 dic '89"
                iframe = `<iframe src="https://simpsonizados.club/player-1x1/"></iframe>`              
                sinopCap = "Durante las compras de Navidad, Bart se escabulle y obtiene un tatuaje. Marge pronto descubre ésto y usa el dinero familiar destinado para los presentes navideños en removérselo. Mientras tanto, Homer descubre que no va a recibir el bono navideño por el Sr. Burns y en secreto obtiene un trabajo como parte del departamento de Santa Claus, pero más tarde descubre que en ese trabajo no se paga lo suficiente.";
            }; break
            case 'T1E2': {
                nombreCap = 'Bart, el genio';
                fechaCap = "14 ene '90";
                iframe = `<iframe src="https://simpsonizados.club/player-1x2/"></iframe>`              
                sinopCap = "Bart tiene problemas en una prueba de inteligencia y en secreto intercambia su examen con el de Martin Prince, el genio de la clase. Después de que los resultados son tabulados, el psiquiatra de la escuela etiqueta a Bart como un genio y lo envía al Centro de Aprendizaje Enriquecido para niños superdotados.";
            }; break
            case 'T1E3': {
                nombreCap = 'La odisea de Homero';
                fechaCap = "21 ene '90";
                iframe = `<iframe src="https://simpsonizados.club/player-1x3/"></iframe>`              
                sinopCap = "La clase de Bart visita la planta de energía nuclear de Springfield y Homer, ansioso porque lo vean trabajando, accidentalmente bloquea su carrito en una tubería radioactiva, provocando de inmediato un incendio. Deprimido e incapaz de encontrar un nuevo puesto de trabajo, decide saltar de un puente.";
            }; break
            case 'T1E4': {
                nombreCap = 'Hogar, agridulce hogar';
                fechaCap = "28 ene '90";
                iframe = `<iframe src="https://simpsonizados.club/player-1x4/"></iframe>`              
                sinopCap = "Homer tiene que ir al picnic de la empresa organizado en la mansión del Sr. Burns junto a su familia. Marge, Bart y Lisa avergüenzan a Homer y él señala que el Sr. Burns parece favorecer a la familia que exprese más amor y respeto entre ellos.";
            }; break
            case 'T1E5': {
                nombreCap = 'Bart, el general';
                fechaCap = "04 feb '90";
                iframe = `<iframe src="https://simpsonizados.club/player-1x5/"></iframe>`              
                sinopCap = "Bart tiene peleas con Nelson Muntz, el matón de la escuela, quien comienza a atacarlo todos los días después de la escuela. Homer sugiere que lo agreda también, pero no funciona. Desesperado de una solución, Bart visita su abuelo para un asesoramiento. Bart y el abuelo van a buscar a Herman, que sugiere que Bart organice a todos los niños en edad escolar y le declaren la guerra a Nelson.";
            }; break
            case 'T1E6': {
                nombreCap = 'El blues de la Mona Lisa';
                fechaCap = "11 feb '90";
                iframe = `<iframe src="https://simpsonizados.club/player-1x6/"></iframe>`              
                sinopCap = "Lisa se deprime, esto comienza a afectar a su rendimiento en la escuela. Ni Marge ni Homer son capaces de hacer feliz a Lisa. Una noche, ella escucha la música de jazz a la distancia y a escondidas sale fuera de su habitación a seguirla. Ella se reúne con Encías Sangrantes Murphy, quién le enseña su manera de expresar su música a través del saxofón.";
            }; break
            case 'T1E7': {
                nombreCap = 'El abominable hombre del bosque';
                fechaCap = "18 feb '90";
                iframe = `<iframe src="https://simpsonizados.club/player-1x7/"></iframe>`              
                sinopCap = "La nueva casa rodante de Ned Flanders se convierte en la envidia de Homer y esto le motiva a comprarse una propia. Homer inicia su campamento con una casa rodante en estado ruinoso, él lleva a la familia de acampada y en el recorrido destruye la casa rodante.";
            }; break
            case 'T1E8': {
                nombreCap = 'La cabeza chiflada';
                fechaCap = "25 feb '90";
                iframe = `<iframe src="https://simpsonizados.club/player-1x8/"></iframe>`              
                sinopCap = "Bart se convierte en amigo de Dolph, Jimbo y Kearney, un grupo de alborotadores locales. Tratando de impresionarlos, Bart decide cortar y robar la cabeza de la estatua de Jebediah Springfield. Al día siguiente, toda la ciudad llora por la estatua en objeto de actos de vandalismo y Bart descubre que sus nuevos amigos quieren atacar al vándalo.";
            }; break
            case 'T1E9': {
                nombreCap = 'Jacques, el rompecorazones';
                fechaCap = "18 mar '90";
                iframe = `<iframe src="https://simpsonizados.club/player-1x9/"></iframe>`              
                sinopCap = "Después de haber olvidado el cumpleaños de Marge, Homer se apresura al centro comerical de Springfield e impulsivamente compra una bola de boliche para ella. Marge no está impresionada con el regalo y después de descubrir que Homer tiene la intención de usarlo, decide ir ella misma al bowling para fastidiarlo.";
            }; break
            case 'T1E10': {
                nombreCap = 'Homer se va de juerga';
                fechaCap = "25 mar '90";
                iframe = `<iframe src="https://simpsonizados.club/player-1x10/"></iframe>`              
                sinopCap = "Bart compra una mini cámara espía y consigue sacarle una foto a Homer bailando con una bailarina llamada Princesa Kashmir en la despedida de soltero de un compañero de trabajo. Da copias de la foto a sus amigos, y, finalmente, la imagen comienza a circular hasta que llega a Marge. Ella inicialmente expulsa a Homer de la casa, pero al día siguiente explica que ella no está molesta sobre Homer y el baile, sino que Bart lo haya visto.";
            }; break
            case 'T1E11': {
                nombreCap = 'Viva la vendimia';
                fechaCap = "15 abr '90";
                iframe = `<iframe src="https://simpsonizados.club/player-1x11/"></iframe>`              
                sinopCap = "El director Skinner finalmente se harta de las travesuras de Bart y propone que Bart sea enviado a Francia como parte del programa de intercambio de estudiantes. La familia está acuerdo y es enviado a un «hermoso viñedo», que es en realidad una ruinoso establecimiento productor de vinos.";
            }; break
            case 'T1E12': {
                nombreCap = 'Krusty entra en chirona';
                fechaCap = "29 abr '90";
                iframe = `<iframe src="https://simpsonizados.club/player-1x12/"></iframe>`              
                sinopCap = "Cuando compraba un helado en el Kwik-E-Mart, Homer es testigo de un robo perpetrado por un hombre que se cree que es Krusty el Payaso, anfitrión del “El show de Krusty”, el programa favorito de Bart. Krusty es enviado a la cárcel y la dirección del espectáculo es asumida por su ayudante, Sideshow Bob.";
            }; break
            case 'T1E13': {
                nombreCap = 'La babysitter ataca de nuevo';
                fechaCap = "13 may '90";
                iframe = `<iframe src="https://simpsonizados.club/player-1x13/"></iframe>`              
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break


/////////////////////////////////////////////////////////


            case 'T2E1': {
                nombreCap = 'Bart en suspenso';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E2': {
                nombreCap = 'Simpson y Dalila';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E3': {
                nombreCap = 'La casa-árbol del terror';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E4': {
                nombreCap = 'Dos coches en cada garaje y tres ojos en cada pez';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E5': {
                nombreCap = 'Homer, el bailón';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E6': {
                nombreCap = 'El club de los';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E7': {
                nombreCap = 'Bart en el día de acción de gracias';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E8': {
                nombreCap = 'Bart el temerario';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E9': {
                nombreCap = 'Rasca, Pica y Marge';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E10': {
                nombreCap = 'Un coche atropella a Bart';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E11': {
                nombreCap = 'Un pez, dos peces, pez globo, pez azul';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E12': {
                nombreCap = 'Así como eramos';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E13': {
                nombreCap = 'Homer contra Lisa y el octavo mandamiento';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E14': {
                nombreCap = 'Director encantador';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E15': {
                nombreCap = 'Tiene derecho a permanecer muerto';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E16': {
                nombreCap = 'El suspenso del perro de Bart';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E17': {
                nombreCap = 'Viejo dinero';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E18': {
                nombreCap = 'Pinta con grandeza';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E19': {
                nombreCap = 'El sustituto de Lisa';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E20': {
                nombreCap = 'La Guerra de Los Simpson';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E21': {
                nombreCap = 'Tres hombres y un cómic';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
            case 'T2E22': {
                nombreCap = 'Sangrienta enemistad';
                fechaCap = "13 may '90";
                sinopCap = "Marge se siente poco apreciada por parte de Homer, lo cual la motiva a hacer una llamada a una emisora de radio terapeuta, la cual Homer escucha con desilución. Homer, buscando llegar al corazón de Marge, decide darle una cena en un restaurante de lujo y contrata a una niñera para cuidar de Bart y Lisa. Le envían a la Sra. Botz, la cual Bart y Lisa pronto descubrirán que es en realidad una ladrona apodada “la niñera Bandit”.";
            }; break
        }
        let cant = parseInt(document.getElementById('js-cantiCap').value)
        let califSelec=parseInt(document.getElementById('js-califCap').value)
        let data = {
            "thing": {
                "numero": capSelec,
                "nombre": nombreCap,
                "calificacion": califSelec,
                "duracion": 1500,
                "fecha": fechaCap,
                "sinopsis": sinopCap,
                "iframe": iframe
            }
        };
        let arregloPromesas = [];
        for (let i = 0; i < cant; i++) {
            let promesa = fetch(urlWeb + groupID + "/" + collectionID, {
                "method": "POST",
                "mode": 'cors',
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(data)
            })
            arregloPromesas.push(promesa);
        }
        Promise.all(arregloPromesas).then(respAll => {
            let tablaBody = document.getElementById('tablaBody');
            llenarTabla(tablaBody);
        })
    }

    function crear_celdas(elem){
        let tr=document.createElement('tr');
        let btnPlay=document.createElement('button');
        let play=document.createElement('i');
        let td1=document.createElement('td'); // num cap
        let td2=document.createElement('td'); // nombre
        let td3=document.createElement('td'); // tiempo
        let td4=document.createElement('td'); // calif
        let td5=document.createElement('td'); // borrar
        let td6=document.createElement('td'); // editar
        let txt1=document.createTextNode(elem.thing.numero);
        let txt2=document.createTextNode(elem.thing.nombre);
        let txt3=document.createTextNode('25 m');
        let txt4=document.createTextNode('⭐'+elem.thing.calificacion)
        let button1=document.createElement('button');
        let button2=document.createElement('button');
        let iborrar=document.createElement('i');
        let ieditar=document.createElement('i');
        tablaBody.appendChild(tr);
        tr.appendChild(btnPlay);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        btnPlay.appendChild(play);
        btnPlay.className='btn-play';
        btnPlay.setAttribute('data-id',elem._id);
        play.className='fas fa-play';
        td1.appendChild(txt1);
        td2.appendChild(txt2);
        td3.appendChild(txt3);
        td4.appendChild(txt4);
        td4.id=elem._id;
        if(elem.thing.calificacion==5){
            tr.classList.add('js-pintarCelda');
        }
        td5.appendChild(button1);
        td6.appendChild(button2);
        button1.appendChild(iborrar);
        button2.appendChild(ieditar);
        button1.setAttribute('data-id',elem._id);
        button2.setAttribute('data-id',elem._id);
        button1.className='btn-borrar-id';
        button2.className='btn-editar-id';
        iborrar.className='fas fa-trash';
        ieditar.className='fas fa-edit';
    }

    function llenarTabla(tablaBody) {
            fetch(urlWeb + groupID + "/" + collectionID, {
                "method": "GET",
                "mode": 'cors',
            })
                .then(resp => {
                    if (!resp.ok) console.log("error")
                    return resp.json()
                })
                .then(json => {
                    tablaBody.innerHTML = '';
                    resultadoCantidad(json.episodios.length);
                    resultadoTiempo(json.episodios);
                    promedioCalif(json.episodios)
                    for (let elem of json.episodios){
                        crear_celdas(elem);
                        let botonesEditar = document.querySelectorAll(".btn-editar-id");
                        for (let btnEdit of botonesEditar) {
                            btnEdit.addEventListener('click', function () {
                                habilitarEdicion(btnEdit, elem);
                            });
                        }
                        let botonesPlay = document.querySelectorAll(".btn-play");
                        for (let btnPlay of botonesPlay) {
                            btnPlay.addEventListener('click', function () {
                                mostrarVideo(btnPlay, elem);
                            });
                        }
                    }
                    let botonesBorrar = document.querySelectorAll(".btn-borrar-id");
                    for (let btnSupr of botonesBorrar) {
                        btnSupr.addEventListener('click', function () {
                            borrarSelecid(btnSupr);
                        });
                    }
                })
                .catch(exc => {
                    console.log(exc)
                })
    }

    function habilitarEdicion(btnEdit,epi) {
        clearInterval(intervalo);
        let id = btnEdit.dataset.id;
        let celda_calif = document.getElementById(`${id}`);
        let inp = document.createElement('input');
        let but = document.createElement('button');
        let oka = document.createElement('i');
        celda_calif.innerHTML=''
        celda_calif.appendChild(inp);
        celda_calif.appendChild(but);
        inp.id = `${id}_input`;
        inp.type = "number";
        inp.max = 5;
        inp.min = 1;
        but.className = 'js-btn-editar-calificacion'
        but.setAttribute('data-id',`${id}`);
        but.appendChild(oka);
        oka.className = 'fas fa-check';

        let califInput = document.getElementById(`${id}_input`);
        let editores = document.querySelectorAll('.js-btn-editar-calificacion');
        for (let btnE of editores) {
            btnE.addEventListener('click', function () {
                editarCalif(btnE, califInput, epi)
            });
        }
    }

    function editarCalif(btnE, calif, epi) {
        reiniciarIntervalo()
        let id = btnE.dataset.id;
        
        let numero = epi.thing.numero;
        let nombre = epi.thing.nombre;
        let calificacion = parseInt(calif.value);
        let duracion = epi.thing.duracion;
        let fecha = epi.thing.fecha;
        let sinopsis = epi.thing.sinopsis;
        let iframe = epi.thing.iframe;

        let data = {
            "thing": {
                "numero": numero,
                "nombre": nombre,
                "calificacion": calificacion,
                "duracion": duracion,
                "fecha": fecha,
                "sinopsis": sinopsis,
                "iframe": iframe
            }
        };
        fetch(urlWeb + groupID + "/" + collectionID + "/" + id, {
            "method": "PUT",
            "mode": 'cors',
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify(data)
        })
            .then(resp => {
                if (!resp.ok) console.log("error")
                return resp.json()
            })
            .then(json => {
                console.log(json)
                let tablaBody = document.getElementById('tablaBody');
                llenarTabla(tablaBody);
            })
            .catch(exc => {
                console.log(exc)
            })
    }

    function borrarSelecid(boton) {
        let id = boton.dataset.id;
        let tablaBody = document.getElementById('tablaBody');
        fetch(urlWeb + groupID + "/" + collectionID + "/" + id, {
            "method": "DELETE",
            "mode": 'cors',
        })
            .then(resp => {
                if (!resp.ok) console.log("error")
                return resp.json()
            })
            .then(json => {
                console.log(json)
                tablaBody.innerHTML = ''
                llenarTabla(tablaBody);
            })
            .catch(exc => {
                console.log(exc)
            })
    }

    function limpiarTabla() {
        fetch(urlWeb + groupID + "/" + collectionID, {
            "method": "GET",
            "mode": 'cors',
        })
            .then(resp => {
                if (!resp.ok) console.log("error")
                return resp.json()
            })
            .then(json => {
                for(let elem of json.episodios){
                    borrarTodos(elem._id);
                }
            })
            .catch(exc => {
                console.log(exc)
            })
    }

    function borrarTodos(id) {
        let tablaBody = document.getElementById('tablaBody');
        fetch(urlWeb + groupID + "/" + collectionID + "/" + id, {
            "method": "DELETE",
            "mode": 'cors',
        })
            .then(resp => {
                if (!resp.ok) console.log("error")
                return resp.json()
            })
            .then(json => {
                console.log(json)
                tablaBody.innerHTML = ''
                llenarTabla(tablaBody);
            })
            .catch(exc => {
                console.log(exc)
            })
    }

    let contFiltrar=0;
    function filtrar() {
        contFiltrar++;
        if(contFiltrar%2===0){
            reiniciarIntervalo()
            llenarTabla(tablaBody);
            document.getElementById('btnFiltrar').innerHTML='FAVORITOS'
        }else{
            clearInterval(intervalo);
            document.getElementById('btnFiltrar').innerHTML='TODOS'
            fetch(urlWeb + groupID + "/" + collectionID, {
                "method": "GET",
                "mode": 'cors',
            })
                .then(resp => {
                    if (!resp.ok) console.log("error")
                    return resp.json()
                })
                .then(json => {
                    tablaBody.innerHTML = '';
                    let cant=0;
                    let tiempo=0;
                    for (let elem of json.episodios){
                        if(elem.thing.calificacion===5){
                            cant++;
                            tiempo+=elem.thing.duracion;
                            document.getElementById('minutosTotal').innerHTML=formatearTiempo(tiempo);
                            document.getElementById('promCalif').innerHTML=5;
                            resultadoCantidad(cant);
                            crear_celdas(elem);
                            let botonesEditar = document.querySelectorAll(".btn-editar-id");
                            for (let btnEdit of botonesEditar) {
                                btnEdit.addEventListener('click', function () {
                                    habilitarEdicion(btnEdit, elem);
                                });
                            }
                            let botonesPlay = document.querySelectorAll(".btn-play");
                            for (let btnPlay of botonesPlay) {
                                btnPlay.addEventListener('click', function () {
                                    mostrarVideo(btnPlay, elem);
                                });
                            }
                        }
                    }
                    let botonesBorrar = document.querySelectorAll(".btn-borrar-id");
                    for (let btnSupr of botonesBorrar) {
                        btnSupr.addEventListener('click', function () {
                            borrarSelecid(btnSupr);
                        });
                    }
                })
                .catch(exc => {
                    console.log(exc)
                })
        }
    }

    function resultadoCantidad(cant){
        document.getElementById('cantTotal').innerHTML=cant;
    }

    function resultadoTiempo(capis){
        let tiempoTotal=0;
        for(let elem of capis){
            tiempoTotal+=elem.thing.duracion;
        }
        document.getElementById('minutosTotal').innerHTML=formatearTiempo(tiempoTotal);
        return formatearTiempo(tiempoTotal);
    }

    function formatearTiempo(segundos){
        let hora=Math.floor(segundos/3600);
        hora=(hora<10)?'0'+hora:hora;
        let minuto=Math.floor((segundos/60)%60);
        minuto=(minuto<10)?'0'+minuto:minuto;
        let segundo=segundos%60;
        segundo=(segundo<10)?'0'+segundo:segundo;
        return hora+'hr'+minuto+'\''+segundo+'\'\'';
    }

    function promedioCalif(stars){
        let starsTotal=0;
        for(let elem of stars){
            starsTotal+=elem.thing.calificacion;
        }
        let promedioCalif=Math.floor((starsTotal/stars.length)*10)/10;
        document.getElementById('promCalif').innerHTML=promedioCalif;
    }

    function mostrarVideo(btn, epi) {
        let id = btn.dataset.id;
        let cajaVideo = document.querySelector('.verVideo');
        let textoSinopsis = document.querySelector('.sinopsis');
        let tituloVideo = document.querySelector('.tituloVideo');
        fetch(urlWeb + groupID + "/" + collectionID+"/"+id, {
            "method": "GET",
            "mode": 'cors',
        })
            .then(resp => {
                if (!resp.ok) console.log("error")
                return resp.json()
            })
            .then(json => {
                cajaVideo.innerHTML = epi.thing.iframe;
                textoSinopsis.innerHTML = epi.thing.sinopsis;
                tituloVideo.innerHTML = epi.thing.nombre;
            })
            .catch(exc => {
                console.log(exc)
            })
    }


// CAPTCHA

    function mostrarCaptcha(){
        let nombre=document.getElementById('nombre').value;
        let email=document.getElementById('email').value;
        if(nombre===''||email===''){
            document.getElementById('advertencia').innerHTML='Completá el formulario!'
        }else{
            document.querySelector(".captcha").classList.remove('js-ocultarCaptcha');
        }
    }
            let codigoValido;
            let numA=Math.floor((Math.random()*6)+1)
            if(numA===1) codigoValido='SDVA5468TUD'
            else if(numA===2) codigoValido='2543EEX45LU'
            else if(numA===3) codigoValido='546FRMARCH6'
            else if(numA===4) codigoValido='54V6GFS46FF'
            else if(numA===5) codigoValido='H87NF32GGDS'
            else if(numA===6) codigoValido='AVGB799SF7B'
    function obtenerNumAleatorio(){
        document.querySelector("#imgCodigo").src="img/captcha/codigo"+codigoValido+".png"
    }
    let intentos=6;
    function verificar(){
        let introducido=document.getElementById("introducir").value;
        let nombreU=document.getElementById('nombre').value;
        if(introducido.toUpperCase()===codigoValido){
            let gracias=document.querySelector(".gracias");
            gracias.classList.add('mostrarCaptcha');
            document.getElementById('nombreU').innerHTML=nombreU.toUpperCase();
            window.setTimeout(function(){
                window.location.href = "index.html";
            }, 2000);
        }else{
            intentos-=1;
            document.getElementById("intentos").innerHTML="Te quedan "+intentos+" intentos.";
            if(intentos===0){
                document.querySelector(".error").classList.add('mostrarCaptcha');
                window.setTimeout(function(){
                    window.location.href = "index.html";
                }, 2000);
            }
        }
    }

}
document.addEventListener('DOMContentLoaded',AJAX_NAV);