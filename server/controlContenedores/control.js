import DIContainer, { object, get, factory } from "rsdi";
const container = new DIContainer();
//para llenar esto, hay que ver que se puede inyectar en el control del sql, por que eso es lo que va aca
//tambien hay que usar clases, mas que nada para las cosas que requieran persistencia
//acordate que no es necesario hacer todo junto, pero el contenedor si siene que tenr todos los selectores
//y tiene que ser ligero y facil de leer, 15/20 lineas max
//acordate que esto es una interfas/service casi, asi que, no tiene mucha logica,ni nada del ui
//asi que no metas cosas raras, solo un contenedor y un par de cosas,
container.addDefinitions({});
