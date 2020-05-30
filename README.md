# 💉 Shingeki no Kyojin (AoT)

Shingeki no Kyojin es un bot desarrollado para la comunidad hispanohablante del anime, su objetivo es proveer un mini-juego tipo rol donde los jugadores podrán de algún modo poseer un personaje real de la serie y así cumplir misiones, ganar dinero y demás cosas importantes. El objetivo del juego es acumular recuerdos los cuales son utilizados para mejorar el perfil de los jugadores y evitar perder sus personajes con el paso del tiempo.

## 🔬 ¿Como se juega?

Al principio los jugadores deben utilizar el comando `!iniciar` el cual les hará reencarnar en el cuerpo de algún personaje al azar, donde se tiene la posibilidad de que se trate de un personaje real de la serie o de uno generado aleatoria-mente (las probabilidades dependerán de los recuerdos).

Una vez los jugadores reencarnan en estos personajes deben esperar una edad de adolescentes ya que durante la niñez solo pueden hacer tareas básicas que no les dan beneficio alguno, este proceso tarda al principio 30 minutos pero luego puede ser acelerado con objetos y demás (véase el apartado de recuerdos). Cuando el jugador alcanza la edad de adolescente tendrá acceso a mas comandos y dispondrá de energía, la cual define la cantidad de acciones que puede realizar durante un periodo de tiempo, si tiene energía suficiente podrá ejecutar comandos que la requieran a cambio de gastarla, dicha energía se regenerará con el paso del tiempo.

> También hay que destacar que el jugador podrá suicidarse una vez llega a la edad de adolescente por si prefiere renacer nuevamente en otro personaje diferente.

Todos los jugadores tendrán un "lugar", es así como ciertos comandos solo pueden ser ejecutados en ciertos lugares, por ende se deben mover y para ello se utiliza el comando `!ir`. De tal manera que si un jugador quiere talar arboles en un bosque deberá primero utilizar `!ir bosque` y posteriormente `!trabajar` o `!talar`, de esta manera perderá energía pero recibirá dinero. Durante el paso del tiempo el jugador irá envejeciendo hasta alcanzar una edad razonable donde tendrá que decidir si integrar alguna división militar (lo cual implicaría iniciar como recluta y tendrás que entrenar `!entrenar`) o continuar una vida normal (en teoría ambas opciones son posibles y es importante mantener un equilibrio).

A continuación pueden suceder dos cosas: 

👨‍✈️ `1` - **Decisión de División Militar:** El bot tiene un aspecto muy realista en el sentido de como funcionará el sistema, mientras un jugador decida ir a una división militar tendrá que entrenar siendo un recluta gastando así energía hasta conseguir graduarse donde luego decidirá si quiere pertenecer a las tropas de guarnición, cuerpo de exploración o la policía militar, los 3 serán distintos en cuanto al funcionamiento del trabajo y al pertenecer a alguno de estos el jugador no podrá utilizar los trabajos cotidianos viéndose obligado a únicamente utilizar los que dispone dicha división militar.

Todos los jugadores que tomen esta decisión podrán seguir moviéndose y acceder a todos los comandos exceptuando los de los trabajos cotidianos como ya se mencionó, sin embargo, tendrán la oportunidad de ingresar a misiones, para ello basta con esperar a que se inicie una misión (lo cual suele ser al azar) y asistir a ella, cuando se asiste, se debe saber que en las misiones se pierde vida y energía, por tanto si una persona va con bajas estadísticas a una misión podría morir en el intento. Las misiones aparecen espontáneamente, aunque las misiones reales son designados por el rey/reina, cuando una misión aparece tendrá un limite de entre 8 a 15 integrantes, entre mas hayan habrá mas probabilidades de éxito, los sobrevivientes de cada misión ganarán dinero y recuerdos que se dividirán de la siguiente manera:

| Tropas de Guarnición |Policía Militar|Cuerpo de Exploración|
|--|--|--|
|**70%** dinero - **30%** recuerdos|**50%** dinero - **50%** recuerdos|**80%** recuerdos - **20%** dinero|

> El dinero y recuerdos será un numero generado al azar constante (no importa la división), pero se dividirá y se **ajustará** su porcentaje en base a la tabla dada anteriormente.

👨‍🔬 *&* 👑 `2` - **Decisión de Vida Cotidiana:** Si el jugador toma esta decisión y posee un personaje con sangre real podrá aspirar a ser rey o reina (solo un jugador podrá ocupar este cargo hasta que muera), en caso de no ser así puede ser un simple trabajador aunque todavía siendo un mortal, si decides esta otra opción tendrás que estudiar utilizando `!estudiar` y luego podrás elegir un trabajo de los 3 disponibles:

 - **Medico** (Curar personas a cambio de dinero). `!curar`
 - **Biólogo** (Durante toda tu vida investigarás hasta conseguir una única jeringa la cual podrás vender o inyectarte a ti mismo). `!investigar`
 - **Mercader** (Obtendrás mucho dinero cada cierto tiempo y lo podrás invertir en un médico o un biólogo para mejorar sus estadísticas, así como también en el rey/reina o también puede invertirlos en las tropas para que así puedan realizarse las misiones).

En caso de que el jugador tenga sangre real y decida ser rey/reina y la vacante esté disponible tan solo deberá escribir `!ascender` lo que le permitirá automáticamente tomar posesión de la corona. Una vez la tenga podrá encargar misiones reales (1 cada 8 horas) `!misionreal`, y exclusivamente a una sola división, estas misiones son mas difíciles de lo habitual y generalmente se asegura que al menos 1 persona morirá inevitablemente, sin embargo los sobrevivientes tendrán grandes recompensas y quien sea rey/reina obtendrá muchos recuerdos a cambio, también quien sea rey/reina podrá conocer la fecha de muerte de una persona asumiendo que la muerte sería por causas naturales siendo titan o por envejecimiento.

> **Importante:** En caso de tener sangre real y obtener el poder del titan fundador podrás eliminar los recuerdos de una persona en especifico pero al hacerlo morirás.

Finalmente todos los jugadores morirán luego de cierta edad, ya sea porque fallecieron durante una misión o murieron de viejos o por alguna otra causa como suicidio, al pasar esto, los jugadores perderán todos sus stats exceptuando los recuerdos, respetos y recuerdos de titán (si alguna vez fueron titanes).

## 🌀 Comandos

> Nomenclatura: [] = Parametro Opcional, () = Parametro Requerido, λ = Cualquier Jugador, * = Requerimiento Previo.

- `!iniciar` *λ* - Comando fundamental, antes de iniciar los jugadores son almas y solo tienen recuerdos, respetos y recuerdos de titan, si desean reencarnar deberán ejecutar este comando.
- `!ir` *λ* - Con este comando te podrás desplazar, solo se restringirá si perteneces a una división militar y estás en medio de una misión.
- `!profile` *λ* - Podrás ver tu perfil, nombre, recuerdos, dinero y stats específicos de tus decisiones.
	- `!recuerdos` *λ* - Con este comando podrás ver la cantidad de recuerdos que posees.
- `!dinero` *  Se debe ser adolescente para ejecutar este comando - Revisa tu dinero, comandos derivados:
	- `!dar` * El mercader no puede usar este comando - Permite darle dinero a las demás personas.
- `!trabajar` * Si perteneces a una división militar no podrás utilizar este comando - Trabaja en base al lugar en el que estás, si te encuentras en una granja al trabajar obtendrás dinero y recuerdos a cambio.

## 📋 Tareas

- [ ] Agregar hasta 100 personajes
- [ ] Agregar persistencia
- [ ] Agregar más comandos