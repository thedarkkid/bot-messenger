require("dotenv/config");

import Handler, { botBrain, dash } from "./lib/Handler";

Handler.run().catch(e => {
    dash.stop();
    console.log(e);
});

botBrain.launch();
