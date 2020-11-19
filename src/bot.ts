require("dotenv/config");

import Echo from "./core/helpers/Echo";
import Handler, { botBrain, dash } from "./lib/Handler";

Handler.run().then(() => {
    botBrain.launch();
}).catch(e => {
    dash.stop();
    Echo.error(e);
});

